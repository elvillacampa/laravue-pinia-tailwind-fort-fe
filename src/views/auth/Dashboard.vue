<script setup lang="ts">
  import { onMounted } from 'vue';
  import { AuthStore } from '@/store/auth';
  import { storeToRefs } from 'pinia'
  const store = AuthStore();
  const { getUser } = storeToRefs(AuthStore())
  const { logout, getLoggedUser } = store
  onMounted(() => {
    getLoggedUser();
  });
</script>
<template>
    <h1 class="text-center p-3 text-3xl text-slate-200">Dashboard</h1>
    <div class="flex items-center container p-4 justify-center" >
      <div class="text-center">
        <p class="text-lg text-slate-200 ">Welcome back {{ getUser?.name }} ({{ getUser?.email }}) !</p>
        <button @click="logout()" type="button" class="mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
      </div>
    </div>
</template>
