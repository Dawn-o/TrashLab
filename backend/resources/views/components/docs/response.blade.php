@props(['data'])

<div class="mt-6">
    <h3 class="text-sm font-semibold text-gray-900 mb-3">Response</h3>
    <div class="bg-gray-100 rounded-lg p-4 overflow-x-auto">
        <pre class="font-mono text-sm whitespace-pre-wrap">@json($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)</pre>
    </div>
</div>