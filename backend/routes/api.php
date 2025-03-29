<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RewardController;
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

// Auth Routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Prediction Routes
    Route::post('/predict', [PredictionController::class, 'predict']);

    // Quest Routes
    Route::get('/quest/status', [QuestController::class, 'getQuestStatus']);

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/profile/history', [ProfileController::class, 'history']);

    // Reward Routes
    Route::get('/rewards', [RewardController::class, 'index']);
    Route::post('/rewards/redeem', [RewardController::class, 'redeem'])->middleware('auth:sanctum');
    Route::get('/rewards/history', [RewardController::class, 'history']);

    // Badge Routes
    Route::get('/badges', [BadgeController::class, 'getAvailableBadges']);
    Route::post('/badges/set-active', [BadgeController::class, 'setActiveBadge']);
});

// Leaderboard Routes
Route::get('/leaderboard', [LeaderboardController::class, 'index']);
