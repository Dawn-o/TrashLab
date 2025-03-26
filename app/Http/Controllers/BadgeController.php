<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class BadgeController extends Controller
{
    protected const DEFAULT_BADGE = [
        'id' => 'default_badge',
        'name' => 'Default Badge',
        'description' => 'The default user badge',
        'image_path' => 'badges/default.png'
    ];

    public function getAvailableBadges(Request $request)
    {
        try {
            $user = $request->user();

            // Get user's badge rewards
            $badges = $user->rewards()
                ->where('category', 'BADGE')
                ->orderBy('points_cost')
                ->get()
                ->map(fn($badge) => [
                    'id' => $badge->id,
                    'name' => $badge->name,
                    'description' => $badge->description,
                    'image_url' => $badge->image_path ? asset('storage/' . $badge->image_path) : null,
                    'is_active' => $user->active_badge == $badge->id,
                    'acquired_at' => \Carbon\Carbon::parse($badge->pivot->redeemed_at)->format('Y-m-d H:i:s'),
                    'points_cost' => $badge->points_cost
                ]);

            // Format response with default badge
            return response()->json([
                'current_badge' => [
                    'id' => $user->active_badge,
                    'url' => $user->badge_url
                ],
                'badges' => $badges,
                'default_badge' => array_merge(self::DEFAULT_BADGE, [
                    'image_url' => asset('storage/' . self::DEFAULT_BADGE['image_path']),
                    'is_active' => $user->active_badge === 'default_badge'
                ])
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching badges:', [
                'user_id' => $user->id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to fetch badges',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function setActiveBadge(Request $request)
    {
        try {
            // Validate request
            $validated = $request->validate([
                'badge_id' => 'required|string'
            ]);

            $user = $request->user();
            $badgeId = $validated['badge_id'];

            // Check if badge is already active
            if ($user->active_badge === $badgeId) {
                return response()->json([
                    'message' => 'This badge is already active'
                ], 400);
            }

            // Handle default badge
            if ($badgeId === 'default_badge') {
                $user->active_badge = 'default_badge';
                $user->save();

                return response()->json([
                    'message' => 'Default badge activated successfully',
                    'badge' => array_merge(self::DEFAULT_BADGE, [
                        'image_url' => asset('storage/' . self::DEFAULT_BADGE['image_path'])
                    ])
                ]);
            }

            // Check if badge exists and is owned by user
            $badge = $user->rewards()
                ->where('rewards.id', $badgeId)
                ->where('category', 'BADGE')
                ->first();

            if (!$badge) {
                throw ValidationException::withMessages([
                    'badge_id' => ['Badge not found or not owned by user']
                ]);
            }

            // Set active badge
            $user->active_badge = $badgeId;
            $user->save();

            return response()->json([
                'message' => 'Badge activated successfully',
                'badge' => [
                    'id' => $badge->id,
                    'name' => $badge->name,
                    'description' => $badge->description,
                    'image_url' => asset('storage/' . $badge->image_path)
                ]
            ]);
            
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            Log::error('Error setting badge:', [
                'user_id' => $user->id ?? null,
                'badge_id' => $badgeId ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to set badge',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}
