<?php

namespace App\Http\Controllers;

use App\Models\TrashPrediction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

        if ($predictionsToday === 3) {
            $user->increment('points', 10);
            return true;
        }

        return false;
    }

    public function predict(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            $image = $request->file('image');

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

            if ($user = $request->user()) {
                // Record the prediction
                TrashPrediction::create([
                    'user_id' => $user->id,
                    'trash_type' => $type
                ]);

                // Add regular point
                $user->increment('points', 1);
                $pointsAdded = 1;

                // Check TrashQuest completion
                if ($this->checkTrashQuest($user)) {
                    $questCompleted = true;
                    $pointsAdded += 10;
                }
            }

            return response()->json([
                'type' => "Sampah " . $type,
                'recommendations' => $recommendations,
                'points_added' => $pointsAdded,
                'total_points' => $user ? $user->points : 0,
                'quest_completed' => $questCompleted,
                'quest_message' => $questCompleted ? 'Congratulations! You\'ve completed today\'s TrashQuest! (+10 points)' : null
            ]);
        } catch (\Exception $e) {
            Log::error('Prediction error:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error getting prediction',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
