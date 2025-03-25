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
}