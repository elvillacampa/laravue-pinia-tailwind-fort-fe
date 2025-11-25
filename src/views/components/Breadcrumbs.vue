<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter

const breadcrumbs = computed(() => {
  const crumbs = route.matched
    .filter(r => r.path !== '/')                // ⬅ FIX empty breadcrumb
    .filter(r => (r.meta as any)?.breadcrumb !== false)
    .map(r => ({
      label: r.meta?.breadcrumb || r.name,
      to: r.path.replace(/\/:.*$/, '')
    }))
  // If there's a dynamic param like :id, add it to the breadcrumbs
  return crumbs
})


</script>
<template>
<nav class="flex text-white ms-2 italic" aria-label="Breadcrumb">
  <div class="inline-flex shadow-xs -space-x-px ml-1 me-2.5" role="group">
    <button @click="$router.back()" type="button" class="cursor-pointer inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg">
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
    </button>
    <button @click="$router.forward()" type="button" class="cursor-pointer ml-1 inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg">
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
    </button>
  </div>
  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">

    <!-- Home link -->
    <li class="inline-flex items-center">
      <RouterLink
        to="/"
        class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
      >
        <svg class="w-4 h-4 me-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
        </svg>
        Home
      </RouterLink>
    </li>

    <!-- Dynamic breadcrumbs -->
    <li v-for="(item, index) in breadcrumbs" :key="item.to">
      <div class="flex items-center space-x-1.5">
        <svg class="w-3.5 h-3.5 rtl:rotate-180 text-body" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m9 5 7 7-7 7" />
        </svg>

        <RouterLink
          v-if="index < breadcrumbs.length - 1"
          :to="item.to"
          class="inline-flex items-center text-sm text-body hover:text-fg-brand"
        >
          {{ item.label }}
        </RouterLink>

        <span
          v-else
          class="inline-flex items-center text-sm text-body-subtle"
        >
          {{ item.label }}
        </span>
      </div>
    </li>

  </ol>
</nav>
</template>