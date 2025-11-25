<script setup lang="ts">
import {  RouterView } from 'vue-router'
</script>
<template>
  <main class="bg-slate-100 dark:bg-slate-900 min-h-screen">
      <RouterView/>
  </main>
</template>
<style>
.custom-wrapper {
  max-width: none;
}
</style>
