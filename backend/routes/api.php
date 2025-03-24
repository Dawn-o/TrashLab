<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\LeaderboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/predict', [PredictionController::class, 'predict']);
    Route::get('/quest/status', [QuestController::class, 'getStatus']);
    Route::get('/leaderboard', [LeaderboardController::class, 'index']);
});