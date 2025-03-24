<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $leaderboard = User::select('id', 'name', 'points')
            ->orderBy('points', 'desc')
            ->limit(10)
            ->get();

        $response = [
            'leaderboard' => $leaderboard->map(function ($user, $index) {
                return [
                    'rank' => $index + 1,
                    'name' => $user->name,
                    'points' => $user->points
                ];
            })
        ];

        if ($user = $request->user()) {
            $userRank = User::where('points', '>', $user->points)->count() + 1;
            $response['current_user'] = [
                'rank' => $userRank,
                'name' => $user->name,
                'points' => $user->points
            ];
        }

        return response()->json($response);
    }
}
