import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { LaravelResponseCollection, User } from "@/types";

import axiosInstance from "@/lib/axios";
import router from "@/router";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

export const UserStore = defineStore("user", () => {
  // 🧠 State (all as refs)
  const user = ref<User | null>(null);
  const users = ref<LaravelResponseCollection<User> | null>(null);
  const isLoading = ref<boolean>(false);

  // 🛠 Actions
  const getUsers = async(page: number) => {
    users.value = null
    isLoading.value = true;
    try{
      const { data } = await axiosInstance.get(`/users?page=${page}`);
      users.value = data;
    }catch(e){
      console.log(e)
    } finally {
      isLoading.value = false;
    }
  }

  const deleteUser = async(page:number, slug:string) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return; // ✅ Stop if user cancels
    isLoading.value =true;
    try{
      await axiosInstance.delete(`/users/${slug}`);
      await getUsers(page)
    // 👇 Check if the current page is now empty
      if (users?.value?.data?.length === 0 && page > 1) {
        // Go back one page
        await getUsers(page - 1);
        router.push(`/admin/post?page=${page - 1}`);
      } else {
        router.push(`/admin/post?page=${page}`);
      }
    }catch(e){
      console.log(e)
    } finally{
      isLoading.value = false;
    }
  }

 
  // 🪄 Getters as computed properties
  const loading = computed(() => isLoading.value);
  const usersList = computed(() => users.value);
  const userData = computed(() => user.value);

  // Return everything
  return {
    loading,
    usersList,
    userData,
    user,
    getUsers,
    deleteUser
  };
});
