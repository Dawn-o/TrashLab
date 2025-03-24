<?php

namespace App\Http\Controllers;

use App\Models\TrashPrediction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PredictionController extends Controller
{
    protected $mlServiceUrl;
    protected $questController;

    public function __construct(QuestController $questController)
    {
        $this->mlServiceUrl = env('ML_SERVICE_URL', 'http://localhost:8000');
        $this->questController = $questController;
    }

    public function predict(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            $image = $request->file('image');
            $imagePath = $image->store('trash-images', 'public');

            $response = Http::attach(
                'file',
                file_get_contents($image),
                $image->getClientOriginalName()
            )->post("{$this->mlServiceUrl}/predict");

            if (!$response->successful()) {
                throw new \Exception('Failed to get prediction from ML service');
            }

            $responseData = $response->json();
            Log::info('ML Service Response:', ['response' => $responseData]);

            if (!isset($responseData['label'])) {
                throw new \Exception('Invalid response format from ML service');
            }

            $type = $responseData['label'];
            $recommendations = $this->recommendations[$type] ?? [];
            $questCompleted = false;
            $pointsAdded = 0;
            $bonusPoints = 0;
            $questProgress = null;

            if ($user = $request->user()) {
                // Get count before creating new prediction
                $previousCount = TrashPrediction::where('user_id', $user->id)
                    ->whereDate('created_at', now()->startOfDay())
                    ->count();

                // Record prediction
                TrashPrediction::create([
                    'user_id' => $user->id,
                    'trash_type' => $type,
                    'image_path' => $imagePath
                ]);

                // Add regular point
                $user->increment('points', 1);
                $pointsAdded = 1;

                // Check quest completion
                if ($previousCount === 2) {
                    $questCompleted = true;
                    $bonusPoints = 10;
                    $user->increment('points', $bonusPoints);
                }

                $questProgress = $this->questController->getQuestProgress($user);
            }

            return response()->json([
                'type' => "Sampah " . $type,
                'recommendations' => $recommendations,
                'points_added' => $pointsAdded,
                'bonus_points' => $bonusPoints,
                'total_points' => $user ? $user->points : 0,
                'quest_progress' => $questProgress,
                'quest_message' => $questCompleted ? 'Congratulations! You\'ve completed today\'s TrashQuest! (+10 bonus points)' : null,
                'image_url' => asset('storage/' . $imagePath)
            ]);

        } catch (\Exception $e) {
            if (isset($imagePath) && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            Log::error('Prediction error:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error getting prediction',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getQuestStatus(Request $request)
    {
        if ($user = $request->user()) {
            return response()->json([
                'quest_progress' => $this->questController->getQuestProgress($user)
            ]);
        }

        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }
}
