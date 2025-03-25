<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TrashPrediction;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    protected $questController;

    public function __construct(QuestController $questController)
    {
        $this->questController = $questController;
    }

    public function show(Request $request)
    {
        $user = $request->user();

        // Get user's rank
        $rank = User::where('points', '>', $user->points)->count() + 1;

        // Get prediction stats
        $predictions = TrashPrediction::where('user_id', $user->id);
        $totalPredictions = $predictions->count();
        $organicCount = $predictions->where('trash_type', 'Organik')->count();
        $inorganicCount = $predictions->where('trash_type', 'Anorganik')->count();

        // Get today's predictions
        $todayPredictions = $predictions->whereDate('created_at', now()->startOfDay())->count();

        return response()->json([
            'profile' => [
                'name' => $user->name,
                'email' => $user->email,
                'points' => $user->points,
                'rank' => $rank,
                'stats' => [
                    'total_predictions' => $totalPredictions,
                    'organic_predictions' => $organicCount,
                    'inorganic_predictions' => $inorganicCount,
                    'predictions_today' => $todayPredictions
                ],
                'quest_progress' => $this->questController->getQuestProgress($user)
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
