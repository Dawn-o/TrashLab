<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TrashPrediction;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        // Get user's rank
        $rank = User::where('points', '>', $user->points)->count() + 1;

        // Get base query
        $predictionsQuery = TrashPrediction::where('user_id', $user->id);

        // Get stats using cloned queries to prevent query modification
        $stats = [
            'total_predictions' => (clone $predictionsQuery)->count(),
            'organic_predictions' => (clone $predictionsQuery)->where('trash_type', 'Organik')->count(),
            'inorganic_predictions' => (clone $predictionsQuery)->where('trash_type', 'Anorganik')->count(),
            'predictions_today' => (clone $predictionsQuery)->whereDate('created_at', now()->startOfDay())->count()
        ];

        return response()->json([
            'profile' => [
                'name' => $user->name,
                'email' => $user->email,
                'points' => $user->points,
                'rank' => $rank,
                'stats' => $stats,
                'quest_progress' => app(QuestController::class)->getQuestProgress($user)
            ]
        ]);
    }

    public function history(Request $request)
    {
        $predictions = TrashPrediction::where('user_id', $request->user()->id)
            ->select('trash_type', 'created_at', 'image_path')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'predictions' => $predictions->map(fn($prediction) => [
                'type' => "Sampah {$prediction->trash_type}",
                'date' => $prediction->created_at->format('Y-m-d H:i:s'),
                'image_url' => $prediction->image_path ? asset("storage/{$prediction->image_path}") : null
            ]),
            'pagination' => [
                'current_page' => $predictions->currentPage(),
                'total_pages' => $predictions->lastPage(),
                'total_items' => $predictions->total()
            ]
        ]);
    }
}
