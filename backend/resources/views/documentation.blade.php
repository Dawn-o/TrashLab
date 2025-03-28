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
    <!-- Documentation Header -->

    <body class="font-sans text-gray-800 leading-relaxed max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50">
        <!-- Documentation Header -->
        <header class="mb-6 sm:mb-8 mt-8 sm:mt-16">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">TrashLab API Documentation</h1>
            <p class="text-gray-600 mb-6">RESTful API documentation for TrashLab waste management system</p>

            <!-- Base URL Section -->
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
                            <code class="font-mono text-sm text-gray-800 break-all"><a
                                    class="text-blue-600 underline"
                                    href="https://trashlab.rushel.my.id/api">https://trashlab.rushel.my.id/api</a></code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Toast Notification -->
            <div id="toast"
                class="fixed bottom-4 right-4 flex items-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300 max-w-[90vw] sm:max-w-md">
                <svg class="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="truncate">Copied to clipboard!</span>
            </div>
        </header>

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
            @php
                $faker = \Faker\Factory::create();
                $responseData = [
                    'user' => [
                        'id' => $faker->unique()->randomNumber(4),
                        'name' => $faker->name(),
                        'email' => $faker->safeEmail(),
                        'created_at' => $faker->dateTimeThisYear()->format('Y-m-d\TH:i:s.u\Z'),
                    ],
                    'token' => $faker->regexify('[0-9]|[A-Za-z0-9]{40}'),
                ];
            @endphp
            <x-docs.response :data="$responseData" />
        </x-docs.endpoint>

        <x-docs.endpoint method="POST" path="/login" description="Login with existing account credentials.">
            <x-docs.request-body>
                <x-docs.param name="email" type="string" description="Valid email address (max: 255 characters)" />
                <x-docs.param name="password" type="string" description="Account password" />
            </x-docs.request-body>
            @php
                $faker = \Faker\Factory::create();
                $responseData = [
                    'user' => [
                        'name' => $faker->name(),
                        'email' => $faker->safeEmail(),
                        'points' => $faker->unique()->randomNumber(3),
                    ],
                    'token' => $faker->regexify('[0-9]\|[A-Za-z0-9]{40}[0-9]{5}'),
                ];
            @endphp
            <x-docs.response :data="$responseData" />
        </x-docs.endpoint>

        <x-docs.endpoint method="POST" path="/logout" description="Logout and invalidate the current access token."
            :requiresAuth="true">
            <x-docs.response :data="[
                'message' => 'Successfully logged out',
            ]" />
        </x-docs.endpoint>

    </body>

</html>
