<script setup lang="ts">
    import { watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { PostStore } from '@/store/post';
    import { storeToRefs } from 'pinia'
    const router = useRouter();
    const store = PostStore();
    const { postData,loading } = storeToRefs(store);
    const { getPost } = store;

    watch(
        () => router.currentRoute.value.params.slug,
        (slug) => getPost(slug as string),
        { immediate: true }
    );

</script>
<template>
    <section class="py-2">
        <div v-if="postData && !loading" class="bg-white p-6 dark:bg-gray-800 shadow-md rounded-lg text-center">
            <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ postData.title }}</h1>
            <p class="text-gray-700 dark:text-gray-300 mb-4">{{ postData.content }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Created at: {{ postData.created_at  }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Author: {{ postData.author?.name || '?'  }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Published: {{ postData.is_published ? 'Yes' : 'No' }}</p>
        </div>
        <div v-else class="text-center text-white">
            Loading post...
        </div>
    </section>


</template>
