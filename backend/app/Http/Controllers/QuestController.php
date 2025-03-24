<?php

namespace App\Http\Controllers;

use App\Models\TrashPrediction;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    protected function checkTrashQuest($user)
    {
        $today = now()->startOfDay();
        $predictionsToday = TrashPrediction::where('user_id', $user->id)
            ->whereDate('created_at', $today)
            ->count();

        // Only award bonus points exactly at 3 predictions
        if ($predictionsToday === 3) {
            $user->increment('points', 10);
            return true;
        }

        return false;
    }

    protected function getQuestProgress($user)
    {
        $today = now()->startOfDay();
        $predictionsToday = TrashPrediction::where('user_id', $user->id)
            ->whereDate('created_at', $today)
            ->count();

        return [
            'current' => min($predictionsToday, 3),
            'required' => 3,
            'completed' => $predictionsToday >= 3,
            'progress_text' => "$predictionsToday/3"
        ];
    }

    public function getStatus(Request $request)
    {
        if ($user = $request->user()) {
            return response()->json([
                'quest_progress' => $this->getQuestProgress($user)
            ]);
        }

        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }
}