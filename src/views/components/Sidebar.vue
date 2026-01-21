<script setup lang="ts">
import { AuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import  { MenuConfig } from "@/types/MenuConfig";
import { onBeforeMount,ref } from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const store = AuthStore()
const { menuAccess } = storeToRefs(store)
const { getLoggedUserPermissions, getLoggedUser } = store
const menus = ref<typeof MenuConfig>([])

const isActiveRoute = (pageName: string) => {
  return route.name === pageName
}
const skeletonMenus = [
  {
    heading: '████████',
    pages: [
      { name: '███████' },
      { name: '██████████' }
    ]
  },
  {
    pages: [
      { name: '███████' },
      { name: '██████████' }
    ]
  }
]


onBeforeMount(async () => {
   // Fetch user and permissions
   await getLoggedUserPermissions();
   const access = new Set(menuAccess.value || []);
   menus.value = MenuConfig
      .map(menu => {
         const m = { ...menu };
         if (m.pages?.length) {
            // Keep only pages the user has permission for (or pages without a permission key)
            m.pages = m.pages.filter(page => {
               if (!page.permission) return true;
               return access.has(page.permission);
            });
         }
         return m;
      })
      // Keep menus that either have allowed pages or the menu itself is allowed (or has no permission)
      .filter(menu => {
         if (menu.pages?.length) return true;

         return false;
      });
});

</script>
<template>
  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
      <div v-if="menus.length" class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
         <ul class="space-y-2 font-medium">
            <li v-for="menu in menus">
               <template v-if="menu?.heading">
                  <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <inline-svg :src="menu.svgIcon" />                  
                     <span class="flex-1 ms-3 whitespace-nowrap">{{ menu.heading }}</span>
                  </a>
                  <RouterLink v-for="page in menu.pages" 
                     :class="[ route.name === page.name ? 'text-fg-brand bg-gray-100 dark:bg-gray-700 font-semibold' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700']"
                      class="flex items-center p-2 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" 
                      :to="{ name: page.name }">
                     <inline-svg :src="page.svgIcon" />
                     <span class="flex-1 ms-3 whitespace-nowrap">{{ page.name }}</span>
                  </RouterLink>
               </template>
               <template v-else>
                  <RouterLink v-for="page in menu.pages"
                  :class="[ route.name === page.name ? 'text-fg-brand bg-gray-100 dark:bg-gray-700 font-semibold' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700']"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" 
                  :to="{ name: page.name }">
                     <inline-svg :src="page.svgIcon" />                  
                     <span class="flex-1 ms-3 whitespace-nowrap">{{ page.name }}</span>
                  </RouterLink>
               </template>
            </li>
         </ul>
      </div>
      <!-- SKELETON LOADING -->
      <div v-else class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 animate-pulse">
         <ul class="space-y-2 font-medium">

            <li v-for="menu in skeletonMenus" :key="menu.heading" class="opacity-50">

               <template v-if="menu.heading">
                  <!-- Heading skeleton -->
                  <div class="flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                     <div class="w-5 h-5 rounded bg-gray-300 dark:bg-gray-600"></div>
                     <div class="flex-1 ms-3 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>

                  <!-- Page skeletons under heading -->
                  <div v-for="page in menu.pages" :key="page.name" class="flex items-center p-2 pl-10 rounded-lg bg-gray-200 dark:bg-gray-700 mt-2">
                     <div class="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600"></div>
                     <div class="flex-1 ms-3 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
               </template>

               <template v-else>
                  <!-- Page-only skeleton -->
                  <div v-for="page in menu.pages" :key="page.name" class="flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                     <div class="w-5 h-5 rounded bg-gray-300 dark:bg-gray-600"></div>
                     <div class="flex-1 ms-3 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
               </template>

            </li>
         </ul>
   <!-- Loading text at bottom -->
   <div class="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
      Loading menus…
   </div>
      </div>
</aside>
</template>