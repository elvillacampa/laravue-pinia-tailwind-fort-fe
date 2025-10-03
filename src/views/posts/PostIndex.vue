<template>

<div class="flex p-4 justify-end">
        <RouterLink class="text-slate-200 p-2 px-3 btn" :to="{name: 'PostCreate'}">Create Post</RouterLink>
    </div>
    <section class="p-4">
        <template v-if="loading">
            <Loading/>
        </template>
        <template v-else>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Post ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Slug
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Published
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Created
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="postsList?.data?.length" >
                            <tr v-for="(post, index) in postsList.data" :key="post.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ index + 1 }}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ post.id }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ post.title }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ post.slug }}
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="post.is_published" class="text-green-500">Yes</span>
                                    <span v-else class="text-red-500">No</span>
                                </td>
                                <td class="px-6 py-4">
                                    {{ post.created_at }}
                                </td>


                                <td class="px-6 py-4">
                                    <div class="flex space-x-4">
                                        <RouterLink :to="{ name: 'PostView', params: { slug: post.slug } }">
                                            <EyeIcon class="h-5 w-5 inline font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700"/>
                                        </RouterLink>
                                        <RouterLink :to="{ name: 'PostEdit', params: { slug: post.slug } }">
                                            <PencilSquareIcon class="h-5 w-5 inline font-medium text-green-600 dark:text-green-400 hover:text-green-700"/>
                                        </RouterLink>
                                        <TrashIcon @click="deletePost(page, String(post.slug))" class="cursor-pointer h-5 w-5 inline font-medium text-red-600 dark:text-red-400 hover:text-red-700"/>

                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7" class="text-center p-4 text-white">
                                    No posts found. <RouterLink class="text-slate-200" :to="{name: 'PostCreate'}">Create One?</RouterLink>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <template v-if="!loading && postsList">
                <div class="flex justify-center mt-4">
                    <TailwindPagination
                    :data="postsList"
                    @pagination-change-page="page = $event"
                    class="[&_*]:cursor-pointer 
                            [&_li]:mx-0.5 
                            [&_li]:text-xs 
                            [&_li]:px-0.5 
                            [&_li]:py-0.5 
                            [&_a]:px-1 
                            [&_a]:py-0.5 
                            [&_a]:text-xs"
                    />
                </div>
                </template>
            </div>
        </template>

    </section>
</template>

<style scoped>

</style>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue'
    import {TailwindPagination} from 'laravel-vue-pagination';
    import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
    import { PostStore } from '@/store/post';
    import { storeToRefs } from 'pinia'
    import { useRoute, useRouter } from 'vue-router';
    import Loading from '@/components/Loading.vue' 

    const store = PostStore();
    const router = useRouter();
    const route = useRoute();
    const { postsList,loading } = storeToRefs(store);
    const { getPosts,deletePost } = store
  
    const page = ref<number>(Number(route.query.page) || 1 );

    onMounted( async() => {
        await getPosts(page.value);
    });
    
  watch(
    page,
    async() => {
        await getPosts(page.value);
        await router.push({query:{page:page.value}});
    } 
  );

</script>