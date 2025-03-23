<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PredictionController extends Controller
{
    public function predict(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            $image = $request->file('image');

            // Create multipart form data
            $response = Http::attach(
                'file',
                file_get_contents($image),
                $image->getClientOriginalName()
            )->post('https://9d5e-34-73-140-215.ngrok-free.app/predict');

            if (!$response->successful()) {
                throw new \Exception('Failed to get prediction from ML service');
            }

            return response()->json([
                'prediction' => $response->json()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error getting prediction',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
