<template>
    <div class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
                    Create your account
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="proceedRegister">
                <div class="space-x-4 rounded-md shadow-sm">
                    <div>
                        <label for="email" class="sr-only">Email address</label>
                        <input id="email" v-model="user.email" type="email" required
                            class="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        >
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" v-model="user.password" type="password" required
                            class="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        >
                    </div>
                    <div>
                        <label for="password_confirmation" class="sr-only">Confirm Password</label>
                        <input id="password_confirmation" v-model="user.password_confirmation" type="password" required
                            class="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm Password"
                        >
                    </div>
                </div>
        
                <div>
                    <button :disabled="processing" type="submit" class="relative flex justify-center w-full px-4 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import apiRepository from "@/composables/apiRepository";
import CommonFunction from "@/composables/CommonFunction";

// Imported Variables and Functions
const { register } = apiRepository();
const { fireToaster } = CommonFunction();

// Data Variables
const processing = ref(false);
const user = ref({
    email: null,
    password: null,
    password_confirmation: null,
});

// Functions
const proceedRegister = () => {
    processing.value = true;

    register(user.value).then((response) => {
        fireToaster(response.data.message, 'success');
    }).catch((errors) => {
        console.log(errors);
    }).finally(() => {
        processing.value = false;
    })
}

</script>