<script setup lang="ts">
  import { PostStore } from '@/store/post.ts';
  const { addPost } = PostStore();
</script>
<template>
  <section class="py-2">
    <div class="w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <FormKit 
        type="form" 
        submit-label="Add" 
        @submit="addPost" 
        :submit-attrs="{ inputClass: 'cursor-pointer' }"
        class="w-full"
      >
        <h1 class="text-center p-2 text-3xl text-slate-200">Add Post</h1>
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
  </section>
</template>