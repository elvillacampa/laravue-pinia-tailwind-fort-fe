<script setup lang="ts">
  import { watch } from 'vue';
  import type { FormKitNode } from "@formkit/core";
  import { useRouter } from 'vue-router';
  import { PostStore } from '@/store/post';
  import { storeToRefs } from 'pinia'
  import type { postForm } from '@/types';

  const router = useRouter();
  const store = PostStore();
  const { postData,loading } = storeToRefs(store);
  const { getPost, updatePost } = store
  const handleUpdate = async (payload: postForm, node?: FormKitNode) => {
    await updatePost(String(router.currentRoute.value.params.slug), payload, node)
  }
  watch(
      () => router.currentRoute.value.params.slug,
      (slug) => getPost(slug as string),
      { immediate: true }
  );
</script>
<template>
  <div class="p-4">
    
    <section v-if="postData && !loading">
      <FormKit 
        type="form" 
        submit-label="Update" 
        @submit="handleUpdate" 
        class="w-full"
      >
        <h1 class="text-center p-2 text-3xl text-slate-200">Update Post</h1>
        <p class="text-sm text-white text-center mb-3">
          Please enter the details of your post!
        </p>

        <FormKit
          name="title"
          label="Title"
          :value="postData?.title"
          placeholder="Enter post title"
          validation="required"
          outer-class="custom-wrapper"
          class="mb-5"
          help="The title that appears at the top of your post."
        />
        
        <FormKit
          name="content"
          type="textarea"
          :value="postData?.content"
          label="Content of the Post"
          placeholder="Enter the content of your post"
          validation="required"
          class="mb-5"
          outer-class="custom-wrapper"
          help="The actual post."
        />
      </FormKit>
    </section>
    <section v-else class="text-center p-4 text-white">
        Loading post...
    </section>
  </div>


</template>