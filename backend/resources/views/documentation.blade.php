<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

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

<body class="font-sans text-gray-800 leading-relaxed bg-gray-50">
    <!-- Add this button right after body tag -->
    <button id="sidebar-toggle" 
        class="fixed top-4 right-4 lg:hidden z-50 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
        <svg class="w-6 h-6" id="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg class="w-6 h-6 hidden" id="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </button>

    <!-- Sidebar Navigation -->
    <aside id="sidebar" 
        class="fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 w-64 bg-white shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out lg:bg-transparent z-40">
        <div class="h-full overflow-y-auto p-4">
            <nav class="space-y-1 py-4">
                <a href="#trashlab-api-documentation"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    TrashLab API Documentation
                </a>
                <a href="#authentication"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Authentication
                </a>
                <a href="#prediction"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Prediction
                </a>
                <a href="#quest"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Quest
                </a>
                <a href="#profile"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Profile
                </a>
                <a href="#reward"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Rewards
                </a>
                <a href="#badge"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Badges
                </a>
                <a href="#leaderboard"
                    class="nav-link block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Leaderboard
                </a>
            </nav>
        </div>
    </aside>

    <!-- Add overlay for mobile -->
    <div id="sidebar-overlay" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 hidden transition-opacity duration-300 ease-in-out">
    </div>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto p-4 sm:p-6 lg:ml-72">
        <header class="mb-6 sm:mb-8 mt-8 sm:mt-16">
            <h1 id="trashlab-api-documentation" class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                TrashLab API Documentation</h1>
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
        </header>

        {{-- Auth Section --}}
        <section>
            <h2 id="authentication" class="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-4">Authentication
                Endpoints</h2>

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
            <h2 id="prediction" class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Prediction Endpoint
            </h2>

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
            <h2 id="quest" class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Quest Endpoint</h2>

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
            <h2 id="profile" class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Profile Endpoints
            </h2>

            <x-docs.endpoint method="GET" path="/profile"
                description="Get authenticated user's profile information." :requiresAuth="true">
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
            <h2 id="reward" class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Rewards Endpoints
            </h2>

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

            <x-docs.endpoint method="GET" path="/rewards/history"
                description="Get user's reward redemption history." :requiresAuth="true">
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
            <h2 id="badge" class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Badge Endpoints</h2>

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
            <h2 id="leaderboard" class="text-xl sm:text-2xl font-semibold text-gray-800 mt-12 mb-4">Leaderboard
                Endpoint
            </h2>

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
    </main>

    <script>
        const scrollSpy = () => {
            const sections = document.querySelectorAll('section, header');
            const navLinks = document.querySelectorAll('.nav-link');

            let lastKnownScrollPosition = 0;
            let ticking = false;

            const activateNavBySection = () => {
                const scrollPosition = window.scrollY + 100;

                let activeSection = null;
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                        activeSection = section;
                    }
                });

                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (activeSection && href === '#' + activeSection.querySelector('h1, h2')?.id) {
                        link.classList.add('bg-gray-100', 'text-blue-600', 'border-l-2', 'border-blue-600');
                        link.classList.remove('text-gray-700');
                    } else {
                        link.classList.remove('bg-gray-100', 'text-blue-600', 'border-l-2',
                            'border-blue-600');
                        link.classList.add('text-gray-700');
                    }
                });
            };

            window.addEventListener('scroll', () => {
                lastKnownScrollPosition = window.scrollY;

                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        activateNavBySection();
                        ticking = false;
                    });

                    ticking = true;
                }
            });

            // Initialize on load
            activateNavBySection();

            // Smooth scroll
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    const target = document.querySelector(href);

                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        };

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', scrollSpy);

        function initSidebar() {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('sidebar-toggle');
            const menuIcon = document.getElementById('menu-icon');
            const closeIcon = document.getElementById('close-icon');
            const overlay = document.getElementById('sidebar-overlay');
            let isOpen = false;

            function toggleSidebar() {
                isOpen = !isOpen;
                
                if (isOpen) {
                    sidebar.classList.remove('-translate-x-full');
                    menuIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                    overlay.classList.remove('hidden');
                    document.body.classList.add('overflow-hidden');
                } else {
                    sidebar.classList.add('-translate-x-full');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                    overlay.classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                }
            }

            toggle.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);

            // Close sidebar on navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 1024) {
                        toggleSidebar();
                    }
                });
            });

            // Handle resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024) {
                    sidebar.classList.remove('-translate-x-full');
                    overlay.classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                } else if (!isOpen) {
                    sidebar.classList.add('-translate-x-full');
                }
            });
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', initSidebar);
    </script>
</body>

</html>
