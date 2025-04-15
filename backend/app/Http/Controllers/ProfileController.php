<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TrashPrediction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    private function calculateUserRank(User $user)
    {
        return DB::table('users')
            ->where('points', '>', $user->points)
            ->orWhere(function ($query) use ($user) {
                $query->where('points', '=', $user->points)
                    ->where('created_at', '<', $user->created_at);
            })
            ->count() + 1;
    }

    public function show(Request $request)
    {
        $user = $request->user();

        // Get user's rank using the new method
        $rank = $this->calculateUserRank($user);

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
                'quest_progress' => app(QuestController::class)->getQuestProgress($user),
                'badge_url' => $user->badge_url
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
