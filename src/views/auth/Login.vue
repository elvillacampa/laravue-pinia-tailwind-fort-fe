<script setup lang="ts">
  import { AuthStore } from '@/store/auth';
  const {login} = AuthStore();

</script>
<template>
  <div class="min-h-screen mx-2 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">

      <FormKit 
        type="form" 
        submit-label="Login" 
        @submit="login" 
        class="w-full"
        :submit-attrs="{ inputClass: 'cursor-pointer' }"
      >
        <h1 class="text-center p-2 text-3xl text-slate-200">Login</h1>
        <p class="text-sm text-white text-center mb-3">
          Welcome back! Please enter your details.
        </p>

        <FormKit
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          validation="required|email"
          outer-class="custom-wrapper"
          class="mb-5"
          help="The email you registered."
        />
        
        <FormKit
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          validation="required|length:8"
          class="mb-5"
          outer-class="custom-wrapper"
          help="The password is at least 8 characters."
        />
      </FormKit>
    </div>
  </div>
</template>
