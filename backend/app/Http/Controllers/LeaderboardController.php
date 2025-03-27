<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get top 10 users
            $leaderboard = User::select('id', 'name', 'points', 'active_badge')
                ->orderBy('points', 'desc')
                ->limit(10)
                ->get();

            $response = [
                'leaderboard' => $leaderboard->map(function ($user) {
                    return [
                        'rank' => User::where('points', '>', $user->points)->count() + 1,
                        'name' => $user->name,
                        'points' => $user->points,
                        'badge_url' => $this->getBadgeUrl($user)
                    ];
                })
            ];

            // Get authenticated user if token exists
            if ($request->bearerToken()) {
                // Use Laravel's built-in auth check and ensure User type
                $authUser = auth('sanctum')->user();
                if ($authUser instanceof User) {
                    $response['current_user'] = [
                        'rank' => User::where('points', '>', $authUser->points)->count() + 1,
                        'name' => $authUser->name,
                        'points' => $authUser->points,
                        'badge_url' => $this->getBadgeUrl($authUser)
                    ];
                }
            }

            return response()->json($response);

        } catch (\Exception $e) {
            Log::error('Error fetching leaderboard:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to fetch leaderboard',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    protected function getBadgeUrl(User $user)
    {
        if ($user->active_badge === 'default_badge') {
            return asset('storage/badges/default.png');
        }

        $badge = $user->rewards()
            ->where('rewards.id', $user->active_badge)
            ->where('category', 'BADGE')
            ->first();

        return $badge 
            ? asset('storage/' . $badge->image_path)
            : asset('storage/badges/default.png');
    }
}
