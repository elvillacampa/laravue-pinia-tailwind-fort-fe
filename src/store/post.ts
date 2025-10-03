import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Post, LaravelResponseCollection, postForm } from "@/types";

import axiosInstance from "@/lib/axios";
import router from "@/router";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

export const PostStore = defineStore("post", () => {
  // 🧠 State (all as refs)
  const post = ref<Post | null>(null);
  const posts = ref<LaravelResponseCollection<Post> | null>(null);
  const isLoading = ref<boolean>(false);

  // 🛠 Actions
  const getPosts = async(page: number) => {
    posts.value = null
    isLoading.value = true;
    try{
      const { data } = await axiosInstance.get(`/dashboard/posts?page=${page}`);
      posts.value = data;
    }catch(e){
      console.log(e)
    } finally {
      isLoading.value = false;
    }
  }

  const getPost= async(slug: string) => {
    post.value = null
    isLoading.value = true;
    try{
      const { data } = await axiosInstance.get(`/dashboard/posts/${slug}`);
      post.value = data.data;
    }catch(e){
      console.log(e)
    } finally {
      isLoading.value = false;
    }
  }

  const createPost = async(payload: postForm,  node?: FormKitNode) => {
    try{
      await axiosInstance.post('/dashboard/posts', payload);
      router.push('/dashboard/posts');
    }catch(e){
      if(e instanceof AxiosError && e.response?.status === 422) {
          node?.setErrors(e.response.data.errors);
      }  
    }
  }

  const updatePost = async(slug: string, payload: postForm,  node?: FormKitNode) => {
    try{
      await axiosInstance.put(`/dashboard/posts/${slug}`, payload);
      router.push('/dashboard/posts');
    }catch(e){
      if(e instanceof AxiosError && e.response?.status === 422) {
          node?.setErrors(e.response.data.errors);
      }  
    } 
  }

  const deletePost = async(page:number, slug:string) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return; // ✅ Stop if user cancels
    isLoading.value =true;
    try{
      await axiosInstance.delete(`/dashboard/posts/${slug}`);
      await getPosts(page)
    // 👇 Check if the current page is now empty
      if (posts?.value?.data?.length === 0 && page > 1) {
        // Go back one page
        await getPosts(page - 1);
        router.push(`/dashboard/posts?page=${page - 1}`);
      } else {
        router.push(`/dashboard/posts?page=${page}`);
      }
    }catch(e){
      console.log(e)
    } finally{
      isLoading.value = false;
    }
  }

  // 🪄 Getters as computed properties
  const loading = computed(() => isLoading.value);
  const postsList = computed(() => posts.value);
  const postData = computed(() => post.value);

  // Return everything
  return {
    loading,
    postsList,
    postData,
    post,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
  };
},
{
  persist: {
    storage: sessionStorage,
    pick: ["user", "token", "isLoggedIn"],
  },
});
