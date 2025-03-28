<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>API Documentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Poppins', 'sans-serif'],
                    },
                },
            },
        }
    </script>
</head>

<body class="font-sans text-gray-800 leading-relaxed max-w-6xl mx-auto p-6 bg-gray-50">

    <body class="font-sans text-gray-800 leading-relaxed max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50">
        <header class="mb-6 sm:mb-8 mt-8 sm:mt-16">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">TrashLab API Documentation</h1>
            <p class="text-gray-600 mb-6">RESTful API documentation for TrashLab waste management system</p>

            <div class="py-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-blue-50 rounded-lg shrink-0">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div class="min-w-0">
                            <span class="block text-sm font-medium text-gray-700">Base URL</span>
                            <code class="font-mono text-sm text-gray-800 break-all"><a class="text-blue-600 underline"
                                    href="https://trashlab.rushel.my.id/api">https://trashlab.rushel.my.id/api</a></code>
                        </div>
                    </div>
                </div>
            </div>

            <div id="toast"
                class="fixed bottom-4 right-4 flex items-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300 max-w-[90vw] sm:max-w-md">
                <svg class="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="truncate">Copied to clipboard!</span>
            </div>
        </header>

        {{-- Auth Section --}}
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-4">Authentication Endpoints</h2>

            <x-docs.endpoint method="POST" path="/register" description="Register a new user account.">
                <x-docs.request-body>
                    <x-docs.param name="name" type="string" description="User's full name (max: 255 characters)" />
                    <x-docs.param name="email" type="string"
                        description="Valid email address (max: 255 characters, must be unique)" />
                    <x-docs.param name="password" type="string"
                        description="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*#?&)" />
                    <x-docs.param name="password_confirmation" type="string" description="Must match password field" />
                </x-docs.request-body>
                <x-docs.response :data="[
                    'user' => [
                        'id' => 1,
                        'name' => 'user',
                        'email' => 'user@example.com',
                        'created_at' => '2025-03-28T08:20:19.000000Z',
                    ],
                    'token' => '1|zS6N1eIqHNyVY3ATXNZLEVYW1kbgSf3saVuhVHsy',
                ]" />
            </x-docs.endpoint>

            <x-docs.endpoint method="POST" path="/login" description="Login with existing account credentials.">
                <x-docs.request-body>
                    <x-docs.param name="email" type="string"
                        description="Valid email address (max: 255 characters)" />
                    <x-docs.param name="password" type="string" description="Account password" />
                </x-docs.request-body>
                <x-docs.response :data="[
                    'user' => [
                        'name' => 'user',
                        'email' => 'user@example.com',
                        'points' => 100,
                    ],
                    'token' => '1|zS6N1eIqHNyVY3ATXNZLEVYW1kbgSf3saVuhVHsy',
                ]" />
            </x-docs.endpoint>

            <x-docs.endpoint method="POST" path="/logout" description="Logout and invalidate the current access token."
                :requiresAuth="true">
                <x-docs.response :data="[
                    'message' => 'Successfully logged out',
                ]" />
            </x-docs.endpoint>
        </section>

        {{-- Prediction Section --}}
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Prediction Endpoint</h2>

            <x-docs.endpoint method="POST" path="/predict" description="Get waste type prediction from image."
                :requiresAuth="true">
                <x-docs.request-body>
                    <x-docs.param name="image" type="file"
                        description="Image file (max: 2MB, allowed types: jpg, jpeg, png)" />
                </x-docs.request-body>
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Prediction successful',
                    'data' => [
                        'type' => 'Sampah Anorganik',
                        'points_added' => 1,
                        'bonus_points' => 0,
                        'total_points' => 100,
                        'quest_progress' => [
                            'current' => 1,
                            'required' => 3,
                            'completed' => false,
                            'progress_text' => '1/3',
                            'remaining' => 2,
                            'bonus_points' => 10,
                        ],
                        'quest_message' => null,
                        'image_url' => '/storage/trash-images/8ir7np6mqiZG4WHx9N9A9HKj0habxf6zWYwTvjPF.png',
                    ],
                ]" />
            </x-docs.endpoint>
        </section>

        {{-- Quest Section --}}
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Quest Endpoint</h2>

            <x-docs.endpoint method="GET" path="/quest/status" description="Get current quest status and progress."
                :requiresAuth="true">
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Quest status retrieved successfully',
                    'data' => [
                        'quest_progress' => [
                            'current' => 1,
                            'required' => 3,
                            'completed' => false,
                            'progress_text' => '1/3',
                            'remaining' => 2,
                            'bonus_points' => 10,
                        ],
                        'next_reset' => '2025-03-28 23:59:59',
                        'time_remaining' => '13 hours from now',
                    ],
                ]" />
            </x-docs.endpoint>
        </section>

        {{-- Profile Section --}}
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Profile Endpoints</h2>

            <x-docs.endpoint method="GET" path="/profile" description="Get authenticated user's profile information."
                :requiresAuth="true">
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Profile retrieved successfully',
                    'data' => [
                        'profile' => [
                            'name' => 'user',
                            'email' => 'user@example.com',
                            'points' => 100,
                            'rank' => 1,
                            'stats' => [
                                'total_predictions' => 1,
                                'organic_predictions' => 0,
                                'inorganic_predictions' => 1,
                                'predictions_today' => 1,
                            ],
                            'quest_progress' => [
                                'current' => 1,
                                'required' => 3,
                                'completed' => false,
                                'progress_text' => '1/3',
                                'remaining' => 2,
                                'bonus_points' => 10,
                            ],
                            'badge_url' => '/storage/badges/default.png',
                        ],
                    ],
                ]" />
            </x-docs.endpoint>

            <x-docs.endpoint method="GET" path="/profile/history"
                description="Get user's prediction history with pagination." :requiresAuth="true">
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Prediction history retrieved successfully',
                    'data' => [
                        'predictions' => [
                            [
                                'type' => 'Sampah Anorganik',
                                'date' => '2025-03-28 10:01:21',
                                'image_url' => '/storage/trash-images/8ir7np6mqiZG4WHx9N9A9HKj0habxf6zWYwTvjPF.png',
                            ],
                        ],
                        'pagination' => [
                            'current_page' => 1,
                            'total_pages' => 1,
                            'total_items' => 1,
                        ],
                    ],
                ]" />
            </x-docs.endpoint>
        </section>

        {{-- Reward Section --}}
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Rewards Endpoints</h2>

            <x-docs.endpoint method="GET" path="/rewards" description="Get available rewards grouped by category."
                :requiresAuth="true">
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Rewards retrieved successfully',
                    'data' => [
                        'rewards' => [
                            'BADGE' => [
                                [
                                    'id' => 1,
                                    'name' => 'Master Recycler Badge',
                                    'description' => 'Show off your recycling expertise with this exclusive badge',
                                    'category' => 'BADGE',
                                    'points_cost' => 100,
                                    'image_path' => 'rewards/badges/master-recycler.png',
                                    'is_available' => true,
                                    'one_time' => true,
                                    'created_at' => '2025-03-27T09:20:40.000000Z',
                                    'updated_at' => '2025-03-27T09:20:40.000000Z',
                                    'can_redeem' => false,
                                    'image_url' => '/storage/rewards/badges/master-recycler.png',
                                ],
                            ],
                        ],
                    ],
                ]" />
            </x-docs.endpoint>

            <x-docs.endpoint method="POST" path="/rewards/redeem" description="Redeem a reward using points."
                :requiresAuth="true">
                <x-docs.request-body>
                    <x-docs.param name="reward_id" type="integer" description="ID of the reward to redeem" />
                </x-docs.request-body>
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Reward redeemed successfully',
                    'data' => [
                        'reward' => [
                            'name' => 'Master Recycler Badge',
                            'points_cost' => 100,
                        ],
                        'remaining_points' => 9999899,
                    ],
                ]" />
            </x-docs.endpoint>

            <x-docs.endpoint method="GET" path="/rewards/history" description="Get user's reward redemption history."
                :requiresAuth="true">
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Reward history retrieved successfully',
                    'data' => [
                        'history' => [
                            [
                                'id' => 1,
                                'name' => 'Master Recycler Badge',
                                'category' => 'BADGE',
                                'points_cost' => 100,
                                'image_url' => '/storage/rewards/badges/master-recycler.png',
                                'redeemed_at' => [
                                    'formatted' => '2025-03-27 17:01:36',
                                    'human_readable' => '17 hours ago',
                                ],
                            ],
                        ],
                        'pagination' => [
                            'current_page' => 1,
                            'last_page' => 1,
                            'per_page' => 10,
                            'total' => 1,
                        ],
                    ],
                ]" />
            </x-docs.endpoint>
        </section>

        {{-- Badge Section --}}
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Badge Endpoints</h2>

            <x-docs.endpoint method="GET" path="/badges"
                description="Get available badges and current active badge." :requiresAuth="true">
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Badges retrieved successfully',
                    'data' => [
                        'current_badge' => [
                            'id' => 'default_badge',
                            'url' => '/storage/badges/default.png',
                        ],
                        'badges' => [
                            [
                                'id' => 1,
                                'name' => 'Master Recycler Badge',
                                'description' => 'Show off your recycling expertise with this exclusive badge',
                                'image_url' => '/storage/rewards/badges/master-recycler.png',
                                'is_active' => false,
                                'acquired_at' => '2025-03-27 17:01:36',
                                'points_cost' => 100,
                            ],
                        ],
                        'default_badge' => [
                            'id' => 'default_badge',
                            'name' => 'Default Badge',
                            'description' => 'The default user badge',
                            'image_path' => 'badges/default.png',
                            'image_url' => '/storage/badges/default.png',
                            'is_active' => true,
                        ],
                    ],
                ]" />
            </x-docs.endpoint>

            <x-docs.endpoint method="POST" path="/badges/set-active" description="Set a badge as active."
                :requiresAuth="true">
                <x-docs.request-body>
                    <x-docs.param name="badge_id" type="integer" description="ID of the badge to set as active" />
                </x-docs.request-body>
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Badge activated successfully',
                    'data' => [
                        'badge' => [
                            'id' => 1,
                            'name' => 'Master Recycler Badge',
                            'description' => 'Show off your recycling expertise with this exclusive badge',
                            'image_url' => '/storage/rewards/badges/master-recycler.png',
                        ],
                    ],
                ]" />
            </x-docs.endpoint>
        </section>

        {{-- Leaderboard Section --}}
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Leaderboard Endpoint</h2>

            <x-docs.endpoint method="GET" path="/leaderboard" description="Get global leaderboard rankings."
                :requiresAuth="true">
                <x-docs.response :data="[
                    'status' => 'success',
                    'message' => 'Leaderboard retrieved successfully',
                    'data' => [
                        'leaderboard' => [
                            [
                                'rank' => 1,
                                'name' => 'user 1',
                                'points' => 500,
                                'badge_url' => '/storage/rewards/badges/master-recycler.png',
                            ],
                            [
                                'rank' => 2,
                                'name' => 'user 2',
                                'points' => 400,
                                'badge_url' => '/storage/rewards/badges/master-recycler.png',
                            ],
                            [
                                'rank' => 3,
                                'name' => 'user 3',
                                'points' => 300,
                                'badge_url' => '/storage/rewards/badges/master-recycler.png',
                            ],
                        ],
                        'current_user' => [
                            'rank' => 5,
                            'name' => 'user',
                            'points' => 100,
                            'badge_url' => '/storage/rewards/badges/master-recycler.png',
                        ],
                    ],
                ]" />
            </x-docs.endpoint>
        </section>
    </body>

</html>
