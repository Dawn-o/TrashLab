<?php

use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api', function () {
    return view('documentation');
});

Route::get('/settings', [SettingsController::class, 'showSettingsForm'])->name('settings');
Route::post('/settings', [SettingsController::class, 'updateMlServiceUrl'])->name('settings.update');
