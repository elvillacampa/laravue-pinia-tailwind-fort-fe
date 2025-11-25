<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 class="text-9xl font-extrabold text-gray-300">403</h1>
        <h2 class="mt-4 text-2xl font-semibold text-gray-700">Unauthorized</h2>
        <p class="mt-2 text-gray-500">Sorry, you are not authorized to access this page.</p>
        <router-link
            to="/"
            class="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            Go Home
        </router-link>
    </div>
</template>