<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RewardController;
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
    Route::get('/quest/status', [QuestController::class, 'getQuestStatus']);
    Route::get('/leaderboard', [LeaderboardController::class, 'index']);
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/profile/history', [ProfileController::class, 'history']);
    Route::get('/rewards', [RewardController::class, 'index']);
    Route::post('/rewards/{reward}/redeem', [RewardController::class, 'redeem']);
});