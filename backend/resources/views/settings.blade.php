<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ML Service URL</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
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

<body class="font-sans text-gray-800 leading-relaxed bg-slate-100">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md space-y-6">
            <div class="bg-white shadow-lg rounded-lg p-8">
                <h1 class="text-2xl font-semibold text-gray-900 mb-8 text-center">ML Service URL</h1>

                @if (session('success'))
                    <div
                        class="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                        <svg class="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd" />
                        </svg>
                        <p>{{ session('success') }}</p>
                    </div>
                @endif

                @if ($errors->any())
                    <div
                        class="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                        <svg class="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                        <p class="font-medium">Unable to update ML Service URL</p>
                    </div>
                @endif

                <form action="{{ route('settings.update') }}" method="POST" class="space-y-6" autocomplete="off">
                    @csrf
                    <div class="space-y-5">
                        <div>
                            <label for="ml_service_url" class="block text-sm font-medium text-gray-700 mb-1">
                                ML Service URL
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <input type="url" id="ml_service_url" name="ml_service_url" required
                                    class="block w-full pl-10 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                                    value="{{ old('ml_service_url') }}">
                            </div>
                        </div>

                        <div>
                            <label for="admin_password" class="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input type="password" id="admin_password" name="admin_password" required
                                    class="block w-full pl-10 py-2 border border-gray-300 rounded-md bg-white text-gray-900">
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-md">
                        Update Configuration
                    </button>
                </form>
            </div>
            <p class="text-center text-sm text-gray-500">
                This URL will be used for machine learning service predictions.
            </p>
        </div>
    </div>
</body>

</html>
