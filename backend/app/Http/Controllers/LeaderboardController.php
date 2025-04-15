<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $leaderboard = User::select('name', 'points', 'badge_url', 'created_at')
            ->orderBy('points', 'desc')
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get()
            ->map(function ($user, $index) {
                return [
                    'rank' => $index + 1,
                    'name' => $user->name,
                    'points' => $user->points,
                    'badge_url' => $user->badge_url
                ];
            });

        $currentUser = $request->user();
        $userRank = app(ProfileController::class)->calculateUserRank($currentUser);

        return response()->json([
            'leaderboard' => $leaderboard,
            'current_user' => [
                'rank' => $userRank,
                'name' => $currentUser->name,
                'points' => $currentUser->points,
                'badge_url' => $currentUser->badge_url
            ]
        ]);
    }
}
