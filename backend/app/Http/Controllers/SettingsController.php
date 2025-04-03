<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SettingsController extends Controller
{
    public function showSettingsForm()
    {
        return view('settings');
    }

    public function updateMlServiceUrl(Request $request)
    {
        $request->validate([
            'ml_service_url' => 'required|url',
            'admin_password' => 'required'
        ]);

        if ($request->admin_password !== env('ADMIN_PASSWORD')) {
            return back()->withErrors(['admin_password' => 'Invalid admin password']);
        }

        $envFile = base_path('.env');
        $content = File::get($envFile);

        $content = preg_replace(
            '/ML_SERVICE_URL=.*/',
            'ML_SERVICE_URL=' . $request->ml_service_url,
            $content
        );

        File::put($envFile, $content);

        return back()->with('success', 'ML Service URL updated successfully');
    }
}
