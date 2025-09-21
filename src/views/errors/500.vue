<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <svg class="w-16 h-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <h1 class="text-4xl font-bold text-gray-800 mb-2">500</h1>
            <p class="text-lg text-gray-600 mb-4">Internal Server Error</p>
            <p class="text-gray-500 mb-6">Sorry, something went wrong on our end. Please try again later.</p>
            <router-link to="/" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Go Home
            </router-link>
        </div>
    </div>
</template>

