<script setup lang="ts">
import { ref } from 'vue'

const stack = ref([
  {
    name: 'Laravel',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/laravel.svg',
    bg: 'bg-red-600',
  },
  {
    name: 'Vue',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vuedotjs.svg',
    bg: 'bg-emerald-500',
  },
  {
    name: 'Pinia',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pinia.svg',
    bg: 'bg-indigo-600',
  },
  {
    name: 'Formkit',
    // if the CDN doesn't host this, drop a real logo at /src/assets/formkit.svg
    logo: '/src/assets/formkit.svg',
    bg: 'bg-pink-500',
  },
  {
    name: 'Tailwind',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
    bg: 'bg-sky-500',
  },
  {
    name: 'Breeze',
    // Breeze doesn't have a widely distributed public logo — add your own at /src/assets/breeze.svg
    logo: '/src/assets/breeze.svg',
    bg: 'bg-cyan-400',
  },
  {
    name: 'Sanctum',
    // add a logo at /src/assets/sanctum.svg (or point to a CDN you control)
    logo: '/src/assets/sanctum.svg',
    bg: 'bg-lime-600',
  },
  {
    name: 'Fortify',
    // add a logo at /src/assets/fortify.svg
    logo: '/src/assets/fortify.svg',
    bg: 'bg-gray-700',
  },
  {
    name: 'Laravel Vue Pagination',
    // add a logo at /src/assets/laravel-vue-pagination.svg or change to a CDN URL
    logo: '/src/assets/laravel-vue-pagination.svg',
    bg: 'bg-fuchsia-600',
  },
])

// track which items failed to load their image so we can show a letter fallback
const failed = ref(new Set<string>())

function onImgError(e: Event, name: string) {
  failed.value.add(name)
  const img = e.currentTarget as HTMLImageElement
  // hide the broken image so the letter fallback is visible
  img.style.display = 'none'
}

function onImgLoad(name: string) {
  if (failed.value.has(name)) failed.value.delete(name)
}

function firstLetter(name: string) {
  return name?.trim()?.charAt(0)?.toUpperCase() ?? ''
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-4xl w-full text-center">
      <h2 class="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">Stack Overview</h2>

      <ul class="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <li
          v-for="item in stack"
          :key="item.name"
          class="flex flex-col items-center"
        >
          <div
            class="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden"
            :class="item.bg"
            role="img"
            :aria-label="item.name"
          >
            <!-- show image unless it failed to load -->
            <img
              v-if="!failed.has(item.name) && item.logo"
              :src="item.logo"
              :alt="item.name + ' logo'"
              class="w-12 h-12 object-contain"
              @error="(e) => onImgError(e, item.name)"
              @load="() => onImgLoad(item.name)"
            />

            <!-- fallback: first letter of the package name -->
            <span v-else class="text-2xl leading-none select-none">
              {{ firstLetter(item.name) }}
            </span>
          </div>

          <span class="mt-3 text-sm text-gray-700 dark:text-gray-200">
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
/* small tweak so the circular marks stay sharp in dark mode */
div[role="img"] { image-rendering: crisp-edges; }

/* ensure letter fallback is vertically centered on smaller circles if needed */
div[role="img"] > span { line-height: 1; }
</style>
