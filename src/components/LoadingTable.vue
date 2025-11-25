<template>
  <div v-if="loading" class="w-full">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 animate-pulse">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th
            v-for="n in columns"
            :key="'h-' + n"
            class="px-6 py-3 text-center"
          >
            <div class="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in 5"
          :key="'r-' + row"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <!-- Normal columns -->
          <td
            v-for="col in columns - 1"
            :key="'c-' + row + '-' + col"
            class="px-6 py-4 text-center"
          >
            <div
              class="h-4 rounded bg-gray-300 dark:bg-gray-600"
              :class="colWidth(col)"
            ></div>
          </td>

          <!-- Constant Action column -->
          <td class="px-6 py-4 text-center">
            <div class="flex space-x-4">
              <div class="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div class="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div class="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- pagination loading -->
    <div class="mt-4 flex justify-center space-x-2 animate-pulse">
      <div
        v-for="n in 5"
        :key="'p-' + n"
        class="h-6 w-8 bg-gray-200 dark:bg-gray-600 rounded"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Number,
    required: true,
  },
});

// Define placeholder width per column number
const colWidth = (col: number) => {
  if (col === 1) return "w-6";
  if (col === 2) return "w-12";
  if (col === 3) return "w-24";
  if (col === 4) return "w-32";
  if (col === 5) return "w-40";
  if (col === 6) return "w-20";
  return "w-16";
};
</script>
