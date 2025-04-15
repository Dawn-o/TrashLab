<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $leaderboard = User::select(
                'users.id',
                'users.name',
                'users.points',
                'users.active_badge',
                'users.created_at',
                DB::raw('(SELECT COUNT(*) FROM trash_predictions WHERE trash_predictions.user_id = users.id) as prediction_count'),
                DB::raw('(SELECT MIN(created_at) FROM trash_predictions WHERE trash_predictions.user_id = users.id) as first_prediction_date')
            )
                ->orderBy('points', 'desc')
                ->orderBy('first_prediction_date', 'asc')
                ->orderBy('created_at', 'asc')
                ->limit(5)
                ->get();

            $response = [
                'leaderboard' => $leaderboard->values()->map(function ($user, $index) {
                    return [
                        'rank' => $index + 1,
                        'name' => $user->name,
                        'points' => $user->points,
                        'badge_url' => $this->getBadgeUrl($user)
                    ];
                })
            ];

            if ($request->bearerToken()) {
                $authUser = auth('sanctum')->user();
                if ($authUser instanceof User) {
                    $higherRankedUsers = User::where('points', '>', $authUser->points)
                        ->orWhere(function ($query) use ($authUser) {
                            $query->where('points', '=', $authUser->points)
                                ->where(function ($q) use ($authUser) {
                                    $q->whereExists(function ($subquery) use ($authUser) {
                                        $subquery->select(DB::raw(1))
                                            ->from('trash_predictions as tp1')
                                            ->whereColumn('tp1.user_id', 'users.id')
                                            ->whereNotExists(function ($sq) use ($authUser) {
                                                $sq->select(DB::raw(1))
                                                    ->from('trash_predictions as tp2')
                                                    ->where('tp2.user_id', $authUser->id);
                                            });
                                    })
                                        ->orWhere(function ($q) use ($authUser) {
                                            $q->whereExists(function ($subquery) use ($authUser) {
                                                $subquery->select(DB::raw(1))
                                                    ->from('trash_predictions as tp1')
                                                    ->whereColumn('tp1.user_id', 'users.id')
                                                    ->whereExists(function ($sq) use ($authUser) {
                                                        $sq->select(DB::raw(1))
                                                            ->from('trash_predictions as tp2')
                                                            ->where('tp2.user_id', $authUser->id)
                                                            ->whereColumn('tp1.created_at', '<', 'tp2.created_at');
                                                    });
                                            });
                                        });
                                })
                                ->orWhere(function ($q) use ($authUser) {
                                    $q->whereNotExists(function ($subquery) {
                                        $subquery->select(DB::raw(1))
                                            ->from('trash_predictions')
                                            ->whereColumn('trash_predictions.user_id', 'users.id');
                                    })
                                        ->where('created_at', '<', $authUser->created_at);
                                });
                        })
                        ->count();

                    $response['current_user'] = [
                        'rank' => $higherRankedUsers,
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
            : asset('storage/badges/default.svg');
    }
}
