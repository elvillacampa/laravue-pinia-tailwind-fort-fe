<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="dark:bg-slate-950 bg-slate-700">

      <nav class="container mx-auto flex items-center justify-between p-4">
        <div class="flex space x-2">
          <RouterLink class="text-slate-200 p-2 px-3" to="/" exact>Home</RouterLink>
          <RouterLink class="text-slate-200 p-2 px-3" to="/dashboard/posts">Posts</RouterLink>
          <RouterLink class="text-slate-200 p-2 px-3" to="/dashboard">Dashboard</RouterLink>
        </div>
        <div class="flex space-x-2">
          <RouterLink class="text-slate-200 p-2 px-3" to="/login">Login</RouterLink>
          <RouterLink class="text-slate-200 p-2 px-3" to="/register">Register</RouterLink>
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
