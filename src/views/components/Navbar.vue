<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { AuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { createPopper } from '@popperjs/core'
import { useRoute, RouterLink } from 'vue-router'
import Breadcrumbs from './Breadcrumbs.vue'

const store = AuthStore()
const { getUser } = storeToRefs(store)
const { logout, getLoggedUser } = store
const route = useRoute()

let popperInstance: any = null
let toggle: HTMLElement | null = null
let menu: HTMLElement | null = null

function closeDropdown() {
  if (menu) {
    menu.classList.add('hidden')
    toggle?.setAttribute('aria-expanded', 'false')
  }
  if (popperInstance) {
    popperInstance.destroy()
    popperInstance = null
  }
}


onMounted(async () => {
  getLoggedUser()
  await nextTick()
  initDropdown()
})

function initDropdown() {
  toggle = document.querySelector('[data-dropdown-toggle="dropdown-user"]')
  menu = document.getElementById('dropdown-user')
  if (!toggle || !menu) return

  const open = () => {
    menu!.classList.remove('hidden')
    toggle!.setAttribute('aria-expanded', 'true')

    // Move dropdown to body to fix positioning
    if (!menu!.dataset.moved) {
      document.body.appendChild(menu!)
      menu!.dataset.moved = 'true'
    }

    popperInstance = createPopper(toggle!, menu!, {
      placement: 'bottom-start',
      strategy: 'fixed',
      modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
    })
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation()
    menu!.classList.contains('hidden') ? open() : closeDropdown()
  })

  document.addEventListener('click', (e) => {
    if (!menu!.contains(e.target as Node) && !toggle!.contains(e.target as Node)) {
      closeDropdown()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown()
  })
}

</script>
<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end ">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span class="sr-only">Open sidebar</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
          </button>
          <RouterLink
            :to="{ name: 'Home' }"
            class="flex ms-2 md:me-24"
          >
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
          </RouterLink>
          <Breadcrumbs v-if="route.name !== 'Home'" class="ms-4 hidden md:block"/>
        </div>
        <div class="flex items-center">
            <div class="flex items-center ms-3">
              <div>
                <button type="button" class="cursor-pointer flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span class="sr-only">Open user menu</span>
                  <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
                </button>
              </div>
              <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div class="px-4 py-3" role="none">
                  <p class="text-sm text-gray-900 dark:text-white" role="none">
                    {{ getUser?.name }}
                  </p>
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {{ getUser?.email }}
                  </p>
                </div>
                <ul class="py-1" role="none">
                  <li>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                  </li>
                  <li>
                    <a @click="() => { closeDropdown(); logout(); }" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
  </nav>
</template>