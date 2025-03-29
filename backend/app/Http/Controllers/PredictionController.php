<?php

namespace App\Http\Controllers;

use App\Models\TrashPrediction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Drivers\Gd\Encoders\JpegEncoder;
use Intervention\Image\Drivers\Gd\Encoders\PngEncoder;

class PredictionController extends Controller
{
    protected $mlServiceUrl;
    protected $questController;
    protected $imageManager;

    public function __construct(QuestController $questController)
    {
        $this->mlServiceUrl = env('ML_SERVICE_URL', 'http://localhost:8000');
        $this->questController = $questController;
        $this->imageManager = new ImageManager(new Driver());
    }

    public function predict(Request $request)
    {
        try {
            $request->validate([
                'images.*' => 'required|image|mimes:jpeg,png,jpg|max:10240',
                'images' => 'required|array|max:3'
            ]);
    
            $totalSize = 0;
            foreach ($request->file('images') as $file) {
                $totalSize += $file->getSize();
            }
    
            if ($totalSize > 20971520) { 
                return response()->json([
                    'message' => 'Total file size too large',
                    'error' => 'Combined file size must not exceed 20MB'
                ], 413);
            }

            $results = [];
            
            foreach ($request->file('images') as $upload) {
                $encoder = new JpegEncoder(85);

                $image = $this->imageManager->read($upload)
                    ->scale(width: 224)
                    ->sharpen(1.5)
                    ->encode($encoder);

                $filename = Str::random() . '.jpg';
                $imagePath = "trash-images/{$filename}";

                Storage::disk('public')->put(
                    $imagePath,
                    $image->toString()
                );

                $response = Http::attach(
                    'file',
                    Storage::disk('public')->get($imagePath),
                    $filename
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
                $questCompleted = false;
                $pointsAdded = 0;
                $bonusPoints = 0;
                $questProgress = null;

                if ($user = $request->user()) {
                    // Record prediction
                    TrashPrediction::create([
                        'user_id' => $user->id,
                        'trash_type' => $type,
                        'image_path' => $imagePath
                    ]);

                    // Add regular point
                    $user->increment('points', 1);
                    $pointsAdded = 1;

                    // Check quest completion using QuestController
                    $questCheck = $this->questController->checkTrashQuest($user);
                    $questCompleted = $questCheck['completed'];
                    $bonusPoints = $questCheck['bonus_points'];

                    $questProgress = $this->questController->getQuestProgress($user);
                }

                $results[] = [
                    'type' => "Sampah " . $type,
                    'points_added' => $pointsAdded,
                    'bonus_points' => $bonusPoints,
                    'image_url' => asset('storage/' . $imagePath)
                ];
            }

            return response()->json([
                'results' => $results,
                'total_points' => $user ? $user->points : 0,
                'quest_progress' => $questProgress,
                'quest_message' => $questCompleted ? 'Congratulations! You\'ve completed today\'s TrashQuest! (+10 bonus points)' : null,
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
