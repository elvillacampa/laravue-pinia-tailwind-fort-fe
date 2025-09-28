<script setup lang="ts">
  import { PostStore } from '@/store/post.ts';
  const { createPost } = PostStore();
</script>
<template>
  <div class="p-4">

      <FormKit 
        type="form" 
        submit-label="Create" 
        @submit="createPost" 
        class="w-full"
      >
        <h1 class="text-center p-2 text-3xl text-slate-200">Create Post</h1>
        <p class="text-sm text-white text-center mb-3">
          Please enter the details of your post!
        </p>

        <FormKit
          name="title"
          label="Title"
          placeholder="Enter post title"
          validation="required"
          outer-class="custom-wrapper"
          class="mb-5"
          help="The title that appears at the top of your post."
        />
        
        <FormKit
          name="content"
          type="textarea"
          label="Content of the Post"
          placeholder="Enter the content of your post"
          validation="required"
          class="mb-5"
          outer-class="custom-wrapper"
          help="The actual post."
        />
      </FormKit>
  </div>
</template>