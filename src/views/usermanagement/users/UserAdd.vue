<script setup lang="ts">
    import { UserStore } from '@/store/user';
    const { addUser } = UserStore(); 
</script>
<template>
  <div class="py-2 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div class="w-full px-6 py-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <FormKit 
        type="form" 
        submit-label="Register" 
        @submit="addUser" 
        class="w-full"
      >
        <h1 class="text-start text-2xl text-slate-200 mb-3 font-semibold"> New User </h1>
        <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <FormKit
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            help="User's working email address"
            validation="required|email"
            outer-class="custom-wrapper md:w-1/3" class=""
            />
            <FormKit
            name="email_verify"
            type="email"
            label="Email Address Verification"
            help="Leave blank to let the user verify email address."
            placeholder="Re-enter email to auto verify"
            validation="confirm:email"
            outer-class="custom-wrapper md:w-1/3" class=""
            />
            <FormKit
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            validation="required|length:8|matches:/[^a-zA-Z]/"
            :validation-messages="{
            matches: 'Please include at least one symbol',
            }"
            outer-class="custom-wrapper md:w-1/3"
            />

            <FormKit
            name="password_confirmation"
            type="password"
            label="Password Confirmation"
            placeholder="Enter your password again."
            validation="required|confirm:password"
            outer-class="custom-wrapper md:w-1/3"
            />
        </div>
        <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <FormKit
            name="salutation"
            type="text"
            label="Salutation"
            placeholder="Enter Salutation"
            help="Your preferred salutation."
            validation="required"
            outer-class="custom-wrapper w-full md:w-1/3"
            />
            <FormKit
            name="first_name"
            type="text"
            label="First Name"
            placeholder="Enter your First Name"
            validation="required"
            outer-class="custom-wrapper w-full md:w-1/3"
            />
            <FormKit
            name="middle_name"
            type="text"
            label="Middle Name"
            placeholder="Enter your Middle Name"
            validation=""
            help=""
            outer-class="custom-wrapper w-full  md:w-1/3"
            />
            <FormKit
            name="last_name"
            type="text"
            label="Last Name"
            placeholder="Enter your Last Name"
            validation="required"
            outer-class="custom-wrapper w-full  md:w-1/3"
            />
        </div>
        <template #submit>
          <div class="flex justify-end pb-6">
            <button 
              type="submit" 
              class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </template>
        </FormKit>
    </div>
  </div>
</template>
<style scoped>
.custom-wrapper {
  max-width: none;
}
</style>