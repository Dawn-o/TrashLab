<?php

namespace App\Http\Controllers;

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

            $type = "Sampah " . $responseData['label'];

            if ($user = $request->user()) {
                $user->increment('points', 1);
                $user->save();
            }

            return response()->json([
                'type' => $type,
                'points_added' => $user ? 1 : 0,
                'total_points' => $user ? $user->points : 0
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
