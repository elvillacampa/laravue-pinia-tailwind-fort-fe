<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { AuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

const store = AuthStore()
const { getUser, } = storeToRefs(store)
const {getLoggedUser, getLoggedUserPermissions } = store
const groupedPermissions = computed(() => {
  if (!getUser.value?.permissions) return {};

  const groups: Record<string, string[]> = {};

  getUser.value.permissions.forEach((perm: string) => {
    const parts = perm.split(' ');
    const module = parts.pop(); // last word is the module
    const action = parts.join(' '); // everything else is the action

    if (!groups[module!]) groups[module!] = [];
    groups[module!]!.push(action);
  });

  return groups;
});


onMounted(() => {
  getLoggedUser()
})
</script>

<template>
  <section class="p-1 mt-12">
    <!-- Card -->
    <div
      class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center"
    >
      <p class="text-lg mb-3 text-white">
        Welcome back,
        <span class="font-semibold text-sky-400">{{ getUser?.name }}</span> !<br />
        <span class="text-sm text-slate-400">{{ getUser?.email }}</span>
      </p>

      <!-- Roles Section -->
<div v-if="Object.keys(groupedPermissions).length" class="mb-6">
  <h2 class="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
    Your Permissions
  </h2>

  <!-- Grid for roles -->
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="(actions, module) in groupedPermissions"
      :key="module"
      class="bg-slate-800/40 p-4 rounded-lg border border-slate-700/40"
    >
      <h3 class="font-semibold capitalize text-slate-300 mb-2">
        {{ module }}
      </h3>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="action in actions"
          :key="action"
          class="capitalize bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
        >
          {{ action }}
        </span>
      </div>
    </div>
  </div>
</div>



      <!-- Logout Button -->

    </div>
  </section>
</template>
