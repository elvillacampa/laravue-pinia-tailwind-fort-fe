<template v-if="loading">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 animate-pulse">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">#</th>
        <th scope="col" class="px-6 py-3">Post ID</th>
        <th scope="col" class="px-6 py-3">Title</th>
        <th scope="col" class="px-6 py-3">Slug</th>
        <th scope="col" class="px-6 py-3">Published</th>
        <th scope="col" class="px-6 py-3">Created</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="n in 5" :key="n" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py-4">
          <div class="h-4 w-4 rounded bg-gray-300 dark:bg-gray-600"></div>
        </td>
        <td class="px-6 py-4">
          <div class="h-4 w-12 rounded bg-gray-300 dark:bg-gray-600"></div>
        </td>
        <td class="px-6 py-4">
          <div class="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600"></div>
        </td>
        <td class="px-6 py-4">
          <div class="h-4 w-40 rounded bg-gray-300 dark:bg-gray-600"></div>
        </td>
        <td class="px-6 py-4">
          <div class="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
        </td>
        <td class="px-6 py-4">
          <div class="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
        </td>
        <td class="px-6 py-4">
          <div class="flex space-x-4">
            <div class="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div class="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div class="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
    <div class="mt-4 flex justify-center space-x-2 animate-pulse">
        <div v-for="n in 5" :key="n" class="h-6 w-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
    </div>
</template>