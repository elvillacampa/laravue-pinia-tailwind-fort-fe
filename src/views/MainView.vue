<script setup lang="ts">
import {  RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { AuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia'
import Navbar from '@/views/components/Navbar.vue';
import Sidebar from '@/views/components/Sidebar.vue';
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
    <Navbar v-if="isLoggedIn"/>
    <Sidebar v-if="isLoggedIn"/>
    <div :class="isLoggedIn?'sm:ml-64':''">
      <main class=" mx-auto bg-slate-100 dark:bg-slate-900 min-h-screen p-5">
          <RouterView/>
      </main>

    </div>

    </div>
  </header>
</template>
<style>
.custom-wrapper {
  max-width: none;
}
</style>
