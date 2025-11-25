<script setup lang="ts">
    import { AuthStore } from '@/store/auth';
    const { register } = AuthStore(); 
</script>
<template>
  <div class="min-h-screen mx-2 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div class="flex flex-col items-center space-y-3 mb-2">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="h-13 drop-shadow-md"
        alt="FlowBite Logo"
      />
      <span class="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
        Sidequest
      </span>
    </div>
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <FormKit 
        type="form" 
        submit-label="Register" 
        @submit="register" 
        class="w-full"
        :submit-attrs="{ inputClass: 'cursor-pointer' }"
      >
        <h1 class="text-center p-2 text-3xl text-slate-200">Register</h1>
        <p class="text-sm text-white text-center mb-3">
            Join us today! Please enter your details.   
        </p>
        
        <FormKit
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        validation="required|email"
        outer-class="custom-wrapper" class=""
        />
        <div class="flex space-x-4">
            <FormKit
            name="firstname"
            type="text"
            label="First Name"
            placeholder="Enter your First Name"
            help="What do people call you?"
            validation="required"
            outer-class="custom-wrapper w-1/2"
            />
            <FormKit
            name="lastname"
            type="text"
            label="Last Name"
            placeholder="Enter your Last Name"
            validation="required"
            outer-class="custom-wrapper  w-1/2"
            />
        </div>
        <div class="flex space-x-4">
            <FormKit
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            validation="required|length:8|matches:/[^a-zA-Z]/"
            :validation-messages="{
            matches: 'Please include at least one symbol',
            }"
            outer-class="custom-wrapper"
            />

            <FormKit
            name="password_confirmation"
            type="password"
            label="Password Confirmation"
            placeholder="Enter your password again."
            validation="required|confirm:password"
            outer-class="custom-wrapper"
            />
        </div>
        </FormKit>
      <p class="text-white text-right"> Already have an account? 
        <RouterLink :to="{ name: 'Login'}" class="text-sky-400 hover:underline">
          Login!
        </RouterLink>
      </p>
    </div>
  </div>
</template>
<style scoped>
.custom-wrapper {
  max-width: none;
}
</style>


