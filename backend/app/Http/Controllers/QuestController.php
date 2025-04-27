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
    protected const ORGANIC_QUEST_TARGET = 5;
    protected const INORGANIC_QUEST_TARGET = 5;
    protected const QUEST_BONUS_POINTS = 25;

    public function checkTrashQuest(User $user)
    {
        try {
            $today = now()->startOfDay();
            $predictions = TrashPrediction::where('user_id', $user->id)
                ->whereDate('created_at', $today)
                ->get();

            $totalPredictions = $predictions->count();
            $organicPredictions = $predictions->where('trash_type', 'Organik')->count();
            $inorganicPredictions = $predictions->where('trash_type', 'Anorganik')->count();

            $completedQuests = [];

            // Check daily total quest
            if ($totalPredictions === self::DAILY_QUEST_TARGET) {
                $completedQuests['total'] = [
                    'name' => 'Scan 10 Sampah',
                    'completed' => true,
                    'bonus_points' => self::QUEST_BONUS_POINTS
                ];
            }

            // Check organic quest
            if ($organicPredictions === self::ORGANIC_QUEST_TARGET) {
                $completedQuests['organic'] = [
                    'name' => 'Scan 5 Sampah Organik',
                    'completed' => true,
                    'bonus_points' => self::QUEST_BONUS_POINTS
                ];
            }

            // Check inorganic quest
            if ($inorganicPredictions === self::INORGANIC_QUEST_TARGET) {
                $completedQuests['inorganic'] = [
                    'name' => 'Scan 5 Sampah Anorganik',
                    'completed' => true,
                    'bonus_points' => self::QUEST_BONUS_POINTS
                ];
            }

            // Award points for completed quests
            foreach ($completedQuests as $quest) {
                $user->increment('points', $quest['bonus_points']);
            }

            Log::info('Daily quests progress', [
                'user_id' => $user->id,
                'completed_quests' => $completedQuests,
                'total_predictions' => $totalPredictions,
                'organic_predictions' => $organicPredictions,
                'inorganic_predictions' => $inorganicPredictions
            ]);

            return $completedQuests;
        } catch (Exception $e) {
            Log::error('Error checking trash quest:', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return [];
        }
    }

    public function getQuestProgress(User $user)
    {
        try {
            $today = now()->startOfDay();
            $predictions = TrashPrediction::where('user_id', $user->id)
                ->whereDate('created_at', $today)
                ->get();

            $totalPredictions = $predictions->count();
            $organicPredictions = $predictions->where('trash_type', 'Organik')->count();
            $inorganicPredictions = $predictions->where('trash_type', 'Anorganik')->count();

            return [
                'quests' => [
                    'total' => [
                        'name' => 'Scan 10 Sampah',
                        'current' => min($totalPredictions, self::DAILY_QUEST_TARGET),
                        'required' => self::DAILY_QUEST_TARGET,
                        'completed' => $totalPredictions >= self::DAILY_QUEST_TARGET,
                        'progress_text' => "{$totalPredictions}/" . self::DAILY_QUEST_TARGET,
                        'remaining' => max(0, self::DAILY_QUEST_TARGET - $totalPredictions),
                        'bonus_points' => self::QUEST_BONUS_POINTS
                    ],
                    'organic' => [
                        'name' => 'Scan 5 Sampah Organik',
                        'current' => min($organicPredictions, self::ORGANIC_QUEST_TARGET),
                        'required' => self::ORGANIC_QUEST_TARGET,
                        'completed' => $organicPredictions >= self::ORGANIC_QUEST_TARGET,
                        'progress_text' => "{$organicPredictions}/" . self::ORGANIC_QUEST_TARGET,
                        'remaining' => max(0, self::ORGANIC_QUEST_TARGET - $organicPredictions),
                        'bonus_points' => self::QUEST_BONUS_POINTS
                    ],
                    'inorganic' => [
                        'name' => 'Scan 5 Sampah Anorganik',
                        'current' => min($inorganicPredictions, self::INORGANIC_QUEST_TARGET),
                        'required' => self::INORGANIC_QUEST_TARGET,
                        'completed' => $inorganicPredictions >= self::INORGANIC_QUEST_TARGET,
                        'progress_text' => "{$inorganicPredictions}/" . self::INORGANIC_QUEST_TARGET,
                        'remaining' => max(0, self::INORGANIC_QUEST_TARGET - $inorganicPredictions),
                        'bonus_points' => self::QUEST_BONUS_POINTS
                    ]
                ]
            ];
        } catch (Exception $e) {
            Log::error('Error getting quest progress:', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return [
                'quests' => [
                    'total' => [
                        'error' => 'Failed to fetch quest progress'
                    ]
                ]
            ];
        }
    }

    public function getQuestStatus(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            $today = now()->startOfDay();
            $predictions = TrashPrediction::where('user_id', $user->id)
                ->whereDate('created_at', $today)
                ->get();

            $totalPredictions = $predictions->count();
            $organicPredictions = $predictions->where('trash_type', 'Organik')->count();
            $inorganicPredictions = $predictions->where('trash_type', 'Anorganik')->count();

            return response()->json([
                'quests' => [
                    'total' => [
                        'name' => 'Scan 10 Sampah',
                        'current' => min($totalPredictions, self::DAILY_QUEST_TARGET),
                        'required' => self::DAILY_QUEST_TARGET,
                        'completed' => $totalPredictions >= self::DAILY_QUEST_TARGET,
                        'progress_text' => "{$totalPredictions}/" . self::DAILY_QUEST_TARGET,
                        'remaining' => max(0, self::DAILY_QUEST_TARGET - $totalPredictions),
                        'bonus_points' => self::QUEST_BONUS_POINTS
                    ],
                    'organic' => [
                        'name' => 'Scan 5 Sampah Organik',
                        'current' => min($organicPredictions, self::ORGANIC_QUEST_TARGET),
                        'required' => self::ORGANIC_QUEST_TARGET,
                        'completed' => $organicPredictions >= self::ORGANIC_QUEST_TARGET,
                        'progress_text' => "{$organicPredictions}/" . self::ORGANIC_QUEST_TARGET,
                        'remaining' => max(0, self::ORGANIC_QUEST_TARGET - $organicPredictions),
                        'bonus_points' => self::QUEST_BONUS_POINTS
                    ],
                    'inorganic' => [
                        'name' => 'Scan 5 Sampah Anorganik',
                        'current' => min($inorganicPredictions, self::INORGANIC_QUEST_TARGET),
                        'required' => self::INORGANIC_QUEST_TARGET,
                        'completed' => $inorganicPredictions >= self::INORGANIC_QUEST_TARGET,
                        'progress_text' => "{$inorganicPredictions}/" . self::INORGANIC_QUEST_TARGET,
                        'remaining' => max(0, self::INORGANIC_QUEST_TARGET - $inorganicPredictions),
                        'bonus_points' => self::QUEST_BONUS_POINTS
                    ]
                ]
            ]);
        } catch (Exception $e) {
            Log::error('Error getting quest status:', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Error fetching quest status'
            ], 500);
        }
    }
}
