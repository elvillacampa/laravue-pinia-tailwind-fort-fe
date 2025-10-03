<script setup lang="ts">
import { onMounted } from 'vue'
import { AuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

const store = AuthStore()
const { getUser } = storeToRefs(store)
const { logout, getLoggedUser } = store

onMounted(() => {
  getLoggedUser()
})
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
    <!-- Heading -->
    <h1 class="text-4xl font-bold mb-6 text-center tracking-tight drop-shadow-sm">
      Dashboard
    </h1>

    <!-- Card -->
    <div
      class="bg-slate-800/70 backdrop-blur-md border border-slate-700 shadow-xl rounded-2xl p-8 w-full max-w-md text-center transition transform hover:scale-[1.02] hover:shadow-2xl"
    >
      <p class="text-lg mb-3">
        Welcome back,
        <span class="font-semibold text-sky-400">{{ getUser?.name }}</span><br />
        <span class="text-sm text-slate-400">{{ getUser?.email }}</span>
      </p>

      <!-- Roles Section -->
      <div v-if="getUser?.roles?.length" class="mb-6">
        <h2 class="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
          Your Roles
        </h2>
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="role in getUser.roles"
            :key="role"
            class="capitalize bg-sky-600/20 text-sky-400 border border-sky-500/40 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
          >
            {{ role }}
          </span>
        </div>
      </div>

      <!-- Logout Button -->
      <button
        @click="logout"
        type="button"
        class="cursor-pointer w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
          />
        </svg>
        Logout
      </button>
    </div>
  </section>
</template>
