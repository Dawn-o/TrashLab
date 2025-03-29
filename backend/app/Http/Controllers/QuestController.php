<?php

namespace App\Http\Controllers;

use App\Models\TrashPrediction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

class QuestController extends Controller
{
    protected const DAILY_QUEST_TARGET = 10;
    protected const QUEST_BONUS_POINTS = 25;

    public function checkTrashQuest(User $user)
    {
        try {
            $today = now()->startOfDay();
            $predictionsToday = TrashPrediction::where('user_id', $user->id)
                ->whereDate('created_at', $today)
                ->count();

            // Only award bonus points exactly at target predictions
            if ($predictionsToday === self::DAILY_QUEST_TARGET) {
                $user->increment('points', self::QUEST_BONUS_POINTS);

                Log::info('Daily quest completed', [
                    'user_id' => $user->id,
                    'points_awarded' => self::QUEST_BONUS_POINTS,
                    'predictions_count' => $predictionsToday
                ]);

                return [
                    'completed' => true,
                    'bonus_points' => self::QUEST_BONUS_POINTS
                ];
            }

            return [
                'completed' => false,
                'bonus_points' => 0
            ];
        } catch (Exception $e) {
            Log::error('Error checking trash quest:', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return [
                'completed' => false,
                'bonus_points' => 0,
                'error' => $e->getMessage()
            ];
        }
    }

    public function getQuestProgress(User $user)
    {
        try {
            $today = now()->startOfDay();
            $predictionsToday = TrashPrediction::where('user_id', $user->id)
                ->whereDate('created_at', $today)
                ->count();

            return [
                'current' => min($predictionsToday, self::DAILY_QUEST_TARGET),
                'required' => self::DAILY_QUEST_TARGET,
                'completed' => $predictionsToday >= self::DAILY_QUEST_TARGET,
                'progress_text' => "{$predictionsToday}/" . self::DAILY_QUEST_TARGET,
                'remaining' => max(0, self::DAILY_QUEST_TARGET - $predictionsToday),
                'bonus_points' => self::QUEST_BONUS_POINTS
            ];
        } catch (Exception $e) {
            Log::error('Error getting quest progress:', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return [
                'current' => 0,
                'required' => self::DAILY_QUEST_TARGET,
                'completed' => false,
                'progress_text' => "0/" . self::DAILY_QUEST_TARGET,
                'remaining' => self::DAILY_QUEST_TARGET,
                'bonus_points' => self::QUEST_BONUS_POINTS,
                'error' => 'Failed to fetch quest progress'
            ];
        }
    }

    public function getQuestStatus(Request $request)
    {
        try {
            if (!$user = $request->user()) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            $progress = $this->getQuestProgress($user);
            $nextReset = now()->endOfDay()->format('Y-m-d H:i:s');

            return response()->json([
                'quest_progress' => $progress,
                'next_reset' => $nextReset,
                'time_remaining' => now()->endOfDay()->diffForHumans()
            ]);
        } catch (Exception $e) {
            Log::error('Error getting quest status:', [
                'user_id' => $user->id ?? null,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Error fetching quest status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
