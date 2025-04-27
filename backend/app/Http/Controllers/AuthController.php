<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $messages = [
                'email.required' => 'Email wajib diisi',
                'email.email' => 'Format email tidak valid',
                'email.max' => 'Email maksimal 255 karakter',
                'password.required' => 'Password wajib diisi',
                'password.string' => 'Password harus berupa teks'
            ];

            $request->validate([
                'email' => 'required|email|max:255',
                'password' => 'required|string'
            ], $messages);

            $key = Str::lower($request->email) . '|' . request()->ip();

            if (RateLimiter::tooManyAttempts($key, 3)) {
                return response()->json([
                    'message' => 'Terlalu banyak percobaan login. Silakan coba lagi dalam ' . RateLimiter::availableIn($key) . ' detik.'
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                RateLimiter::hit($key);
                return response()->json([
                    'message' => 'Email atau password salah'
                ], 422);
            }

            RateLimiter::clear($key);

            $userData = $user->only(['name', 'email', 'points']);

            return response()->json([
                'user' => $userData,
                'token' => $user->createToken('auth_token')->plainTextToken
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->errors()[array_key_first($e->errors())][0]
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server'
            ], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $messages = [
                'name.required' => 'Nama wajib diisi',
                'name.string' => 'Nama harus berupa teks',
                'name.max' => 'Nama maksimal 255 karakter',
                'email.required' => 'Email wajib diisi',
                'email.email' => 'Format email tidak valid',
                'email.max' => 'Email maksimal 255 karakter',
                'email.unique' => 'Email sudah terdaftar',
                'password.required' => 'Password wajib diisi',
                'password.string' => 'Password harus berupa teks',
                'password.min' => 'Password minimal 8 karakter',
                'password.confirmed' => 'Konfirmasi password tidak cocok'
            ];

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'confirmed'
                ],
            ], $messages);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $userData = $user->only(['id', 'name', 'email', 'created_at']);

            return response()->json([
                'user' => $userData,
                'token' => $user->createToken('auth_token')->plainTextToken
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->errors()[array_key_first($e->errors())][0]
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during logout'
            ], 500);
        }
    }
}
