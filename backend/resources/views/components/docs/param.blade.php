@props([
    'name',
    'type',
    'description',
    'required' => true
])

<div class="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 mb-3 items-start sm:items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <div class="sm:col-span-3">
        <span class="font-mono text-sm font-medium text-gray-900">{{ $name }}</span>
        @if($required)
            <span class="ml-1 text-red-500 text-xs">*</span>
        @endif
    </div>
    <div class="sm:col-span-2">
        <span class="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded">{{ $type }}</span>
    </div>
    <div class="sm:col-span-7 text-sm text-gray-600">{{ $description }}</div>
</div>