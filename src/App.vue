<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { AuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia'
const store = AuthStore();
const { isLoggedIn } = storeToRefs(AuthStore())
const { getLoggedUser } = store
onMounted(() => {
  getLoggedUser();
});
</script>
<template>
  <header>
    <div class="dark:bg-slate-950 bg-slate-700">

      <nav class="container mx-auto flex items-center justify-between p-4">
        <div class="flex space x-2">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Side Quest</span>
        </a>
        </div>
        <div class="flex space-x-2" >
          <div v-if="isLoggedIn">
            <RouterLink class="text-slate-200 p-2 px-3" to="/" exact>Home</RouterLink>
            <RouterLink class="text-slate-200 p-2 px-3" to="/dashboard/posts">Posts</RouterLink>
            <RouterLink class="text-slate-200 p-2 px-3" to="/dashboard">Dashboard</RouterLink>
          </div>
          <div v-else>
            <RouterLink class="text-slate-200 p-2 px-3" to="/login">Login</RouterLink>
            <RouterLink class="text-slate-200 p-2 px-3" to="/register">Register</RouterLink>
          </div>
        </div>
      </nav>
      
    </div>
  </header>
  <main class="container mx-auto bg-slate-100 dark:bg-slate-900 min-h-screen">
    <div class="">
      <RouterView/>
    </div>
  </main>
</template>
<style>
.custom-wrapper {
  max-width: none;
}
</style>
