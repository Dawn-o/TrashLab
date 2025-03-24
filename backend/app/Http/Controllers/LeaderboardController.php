<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        $leaderboard = User::select('id', 'name', 'points')
            ->orderBy('points', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user, $index) {
                return [
                    'rank' => $index + 1,
                    'name' => $user->name,
                    'points' => $user->points
                ];
            });

        return response()->json([
            'leaderboard' => $leaderboard
        ]);
    }
}