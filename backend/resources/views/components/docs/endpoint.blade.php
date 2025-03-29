@props([
    'method',
    'path',
    'description',
    'requiresAuth' => false
])

<div class="p-4 sm:p-6 mb-6">
    <div class="flex flex-col sm:flex-row sm:items-start gap-3">
        <span class="inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold
            {{ $method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }}">
            {{ $method }}
        </span>
        <div class="flex-1 min-w-0">
            <code class="font-mono text-sm sm:text-base text-gray-900">{{ $path }}</code>
            <p class="mt-2 text-sm text-gray-600">{{ $description }}</p>
            @if($requiresAuth)
                <div class="mt-2 inline-flex items-center gap-1.5 text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Requires Authentication
                </div>
            @endif
        </div>
    </div>
    {{ $slot }}
</div>