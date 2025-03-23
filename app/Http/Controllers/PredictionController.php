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

    public function __construct()
    {
        $this->mlServiceUrl = env('ML_SERVICE_URL', 'http://localhost:8000');
    }

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

    public function predict(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            $image = $request->file('image');

            // Store the image
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

                // Record the prediction with image path
                TrashPrediction::create([
                    'user_id' => $user->id,
                    'trash_type' => $type,
                    'image_path' => $imagePath
                ]);

                // Add regular point
                $user->increment('points', 1);
                $pointsAdded = 1;

                // Check if this prediction exactly completes the quest
                if ($previousCount === 2) {
                    $user->increment('points', 10);
                    $bonusPoints = 10;
                    $questCompleted = true;
                }

                $questProgress = $this->getQuestProgress($user);
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
            // If there was an error, delete the uploaded image if it exists
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
                'quest_progress' => $this->getQuestProgress($user)
            ]);
        }

        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }
}
