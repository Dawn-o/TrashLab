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

class PredictionController extends Controller
{
    private const MAX_FILE_SIZE = 10240; // 10MB
    private const MAX_TOTAL_SIZE = 20971520; // 20MB
    private const MAX_FILES = 3;
    private const IMAGE_WIDTH = 224;
    private const JPEG_QUALITY = 85;

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
            $this->validateRequest($request);
            $results = $this->processImages($request);

            $user = $request->user();
            $questProgress = null;
            $questCompleted = false;

            if ($user) {
                $questProgress = $this->questController->getQuestProgress($user);
            }

            return response()->json([
                'results' => $results,
                'total_points' => $user ? $user->points : 0,
                'quest_progress' => $questProgress,
                'quest_message' => $questCompleted ? 'Congratulations! You\'ve completed today\'s TrashQuest! (+10 bonus points)' : null,
            ]);
        } catch (\Exception $e) {
            Log::error('Prediction error:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error getting prediction',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function validateRequest(Request $request)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:' . self::MAX_FILE_SIZE,
            'images' => 'required|array|max:' . self::MAX_FILES
        ]);

        $totalSize = collect($request->file('images'))->sum(fn($file) => $file->getSize());

        if ($totalSize > self::MAX_TOTAL_SIZE) {
            throw new \Exception('Combined file size must not exceed 20MB');
        }
    }

    private function processImages(Request $request)
    {
        $results = [];
        $encoder = new JpegEncoder(self::JPEG_QUALITY);

        foreach ($request->file('images') as $upload) {
            $processedImage = $this->processImage($upload, $encoder);
            $prediction = $this->getPrediction($processedImage['path']);
            $results[] = $this->handlePredictionResult($prediction, $processedImage['path'], $request->user());
        }

        return $results;
    }

    private function processImage($upload, JpegEncoder $encoder)
    {
        $image = $this->imageManager->read($upload)
            ->scale(width: self::IMAGE_WIDTH)
            ->sharpen(1.5)
            ->encode($encoder);

        $filename = Str::random() . '.jpg';
        $imagePath = "trash-images/{$filename}";

        Storage::disk('public')->put(
            $imagePath,
            $image->toString()
        );

        return ['path' => $imagePath, 'filename' => $filename];
    }

    private function getPrediction(string $imagePath)
    {
        $response = Http::attach(
            'file',
            Storage::disk('public')->get($imagePath),
            basename($imagePath)
        )->post("{$this->mlServiceUrl}/predict");

        if (!$response->successful()) {
            Storage::disk('public')->delete($imagePath);
            throw new \Exception('Failed to get prediction from ML service');
        }

        $responseData = $response->json();

        if (!isset($responseData['label'])) {
            Storage::disk('public')->delete($imagePath);
            throw new \Exception('Invalid response format from ML service');
        }

        return $responseData;
    }

    private function handlePredictionResult(array $prediction, string $imagePath, $user)
    {
        $type = $prediction['label'];
        $pointsAdded = 0;
        $bonusPoints = 0;
        $questCompleted = false;

        if ($user) {
            TrashPrediction::create([
                'user_id' => $user->id,
                'trash_type' => $type,
                'image_path' => $imagePath
            ]);

            $user->increment('points', 1);
            $pointsAdded = 1;

            $questCheck = $this->questController->checkTrashQuest($user);
            $questCompleted = $questCheck['completed'];
            $bonusPoints = $questCheck['bonus_points'];
        }

        return [
            'type' => "Sampah " . $type,
            'points_added' => $pointsAdded,
            'bonus_points' => $bonusPoints,
            'image_url' => asset("storage/{$imagePath}")
        ];
    }

    public function getQuestStatus(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json([
            'quest_progress' => $this->questController->getQuestProgress($user)
        ]);
    }
}
