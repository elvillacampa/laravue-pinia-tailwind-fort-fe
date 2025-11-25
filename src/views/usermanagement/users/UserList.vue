
<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue'
    import {TailwindPagination} from 'laravel-vue-pagination';
    import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
    import { UserStore } from '@/store/user';
    import { storeToRefs } from 'pinia'
    import { useRoute, useRouter } from 'vue-router';
    import LoadingTable from '@/components/LoadingTable.vue' 

    const store = UserStore();
    const router = useRouter();
    const route = useRoute();
    const { usersList,loading } = storeToRefs(store);
    const { getUsers, deleteUser } = store
  
    const page = ref<number>(Number(route.query.page) || 1 );

    onMounted( async() => {
        await getUsers(page.value);
    });
    
  watch(
    page,
    async() => {
        await getUsers(page.value);
        await router.push({query:{page:page.value}});
    } 
  );

</script>
<template>
    <div class="flex p-3 justify-end">
        <RouterLink class="cursor-pointer inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg" :to="{name: 'PostAdd'}">Add</RouterLink>
    </div>
    <section class="">
        <template v-if="loading">
            <LoadingTable :columns="9"/>
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
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email (Verified At)
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Updated At
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Created At
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Deleted At
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Slug
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="usersList?.data?.length" >
                            <tr v-for="(user, index) in usersList.data" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ index + 1 }}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ user.id }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ user.name }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ user.email_verified_at ? user.email + ' (' + user.email_verified_at + ')' : user.email + ' (Unverified)' }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    {{ user.updated_at }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    {{ user.created_at }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    {{ user.deleted_at || 'N/A' }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    {{ user.id }}
                                </td>


                                <td class="px-6 py-4 text-center">
                                    <div class="flex space-x-4 justify-center">
                                        <RouterLink :to="{ name: 'PostView', params: { slug: user.name } }">
                                            <EyeIcon class="h-5 w-5 inline font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700"/>
                                        </RouterLink>
                                        <RouterLink :to="{ name: 'PostEdit', params: { slug: user.name } }">
                                            <PencilSquareIcon class="h-5 w-5 inline font-medium text-green-600 dark:text-green-400 hover:text-green-700"/>
                                        </RouterLink>
                                        <TrashIcon @click="deleteUser(page, String(user.id))" class="cursor-pointer h-5 w-5 inline font-medium text-red-600 dark:text-red-400 hover:text-red-700"/>

                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7" class="text-center p-4 text-white">
                                    No users found. <RouterLink class="text-slate-200" :to="{name: 'PostAdd'}">Create One?</RouterLink>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <template v-if="!loading && usersList">
                <div class="flex justify-center mt-4">
                    <TailwindPagination
                    :data="usersList"
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

