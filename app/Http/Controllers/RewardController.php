<?php

namespace App\Http\Controllers;

use App\Models\Reward;
use Illuminate\Http\Request;

class RewardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $rewards = Reward::where('is_available', true)
            ->orderBy('points_cost')
            ->get()
            ->map(function ($reward) use ($user) {
                $alreadyRedeemed = $reward->one_time && $user->rewards()
                    ->where('reward_id', $reward->id)
                    ->exists();
                
                return array_merge($reward->toArray(), [
                    'can_redeem' => !$alreadyRedeemed
                ]);
            });

        return response()->json([
            'rewards' => $rewards->groupBy('category')
        ]);
    }

    public function redeem(Request $request, Reward $reward)
    {
        $user = $request->user();

        // Check if user has enough points
        if ($user->points < $reward->points_cost) {
            return response()->json([
                'message' => 'Insufficient points'
            ], 400);
        }

        // Check if one-time reward is already redeemed
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
            'remaining_points' => $user->points
        ]);
    }

    public function history(Request $request)
    {
        $user = $request->user();
        
        $redeemedRewards = $user->rewards()
            ->withPivot('redeemed_at')
            ->orderBy('user_rewards.created_at', 'desc')
            ->paginate(10)
            ->through(function ($reward) {
                return [
                    'id' => $reward->id,
                    'name' => $reward->name,
                    'category' => $reward->category,
                    'points_cost' => $reward->points_cost,
                    'image_path' => $reward->image_path ? asset('storage/' . $reward->image_path) : null,
                    'redeemed_at' => $reward->pivot->redeemed_at,
                ];
            });

        return response()->json([
            'history' => $redeemedRewards->items(),
            'pagination' => [
                'current_page' => $redeemedRewards->currentPage(),
                'last_page' => $redeemedRewards->lastPage(),
                'per_page' => $redeemedRewards->perPage(),
                'total' => $redeemedRewards->total()
            ]
        ]);
    }
}