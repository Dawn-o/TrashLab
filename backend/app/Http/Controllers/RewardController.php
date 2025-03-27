<?php

namespace App\Http\Controllers;

use App\Models\Reward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

class RewardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $rewards = Reward::where('is_available', true)
                ->orderBy('points_cost')
                ->get();

            if ($rewards->isEmpty()) {
                return response()->json([
                    'message' => 'No rewards available at the moment',
                    'rewards' => []
                ], 404);
            }

            $rewards = $rewards->map(function ($reward) use ($user) {
                $alreadyRedeemed = $reward->one_time && $user->rewards()
                    ->where('reward_id', $reward->id)
                    ->exists();
                
                return array_merge($reward->toArray(), [
                    'can_redeem' => !$alreadyRedeemed,
                    'image_url' => $reward->image_path ? asset('storage/' . $reward->image_path) : null
                ]);
            });

            return response()->json([
                'rewards' => $rewards->groupBy('category')
            ]);

        } catch (Exception $e) {
            Log::error('Error fetching rewards:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to fetch rewards',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function redeem(Request $request, $id)
    {
        try {
            $user = $request->user();
            
            // Find reward with explicit error handling
            $reward = Reward::find($id);
            
            if (!$reward) {
                return response()->json([
                    'message' => 'Reward not found',
                    'error' => 'The requested reward does not exist'
                ], 404);
            }

            if (!$reward->is_available) {
                return response()->json([
                    'message' => 'This reward is no longer available'
                ], 400);
            }

            if ($user->points < $reward->points_cost) {
                return response()->json([
                    'message' => 'Insufficient points',
                    'required_points' => $reward->points_cost,
                    'current_points' => $user->points,
                    'missing_points' => $reward->points_cost - $user->points
                ], 400);
            }

            if ($reward->one_time && $user->rewards()->where('reward_id', $reward->id)->exists()) {
                return response()->json([
                    'message' => 'You have already redeemed this reward'
                ], 400);
            }

            $user->rewards()->attach($reward->id, [
                'redeemed_at' => now()
            ]);

            $user->decrement('points', $reward->points_cost);

            return response()->json([
                'message' => 'Reward redeemed successfully',
                'reward' => [
                    'name' => $reward->name,
                    'points_cost' => $reward->points_cost
                ],
                'remaining_points' => $user->points
            ]);

        } catch (Exception $e) {
            Log::error('Error redeeming reward:', [
                'user_id' => $user->id,
                'reward_id' => $id,
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'message' => 'Failed to redeem reward',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function history(Request $request)
    {
        try {
            $user = $request->user();
            $perPage = $request->input('per_page', 10);
            
            $redeemedRewards = $user->rewards()
                ->withPivot('redeemed_at')
                ->orderBy('user_rewards.created_at', 'desc')
                ->paginate($perPage);

            if ($redeemedRewards->isEmpty()) {
                return response()->json([
                    'message' => 'No rewards have been redeemed yet',
                    'history' => [],
                    'pagination' => [
                        'current_page' => 1,
                        'last_page' => 1,
                        'per_page' => $perPage,
                        'total' => 0
                    ]
                ]);
            }

            $formattedRewards = $redeemedRewards->through(function ($reward) {
                $redeemedAt = \Carbon\Carbon::parse($reward->pivot->redeemed_at);
                
                return [
                    'id' => $reward->id,
                    'name' => $reward->name,
                    'category' => $reward->category,
                    'points_cost' => $reward->points_cost,
                    'image_url' => $reward->image_path ? asset('storage/' . $reward->image_path) : null,
                    'redeemed_at' => [
                        'formatted' => $redeemedAt->format('Y-m-d H:i:s'),
                        'human_readable' => $redeemedAt->diffForHumans()
                    ]
                ];
            });

            return response()->json([
                'history' => $formattedRewards->items(),
                'pagination' => [
                    'current_page' => $redeemedRewards->currentPage(),
                    'last_page' => $redeemedRewards->lastPage(),
                    'per_page' => $redeemedRewards->perPage(),
                    'total' => $redeemedRewards->total()
                ]
            ]);

        } catch (Exception $e) {
            Log::error('Error fetching reward history:', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'message' => 'Failed to fetch reward history',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}