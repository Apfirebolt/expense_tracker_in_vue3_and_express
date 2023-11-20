<script setup>
import FooterComponent from '../components/FooterComponent.vue';
import { useForm } from 'vee-validate';

// Validation, or use `yup` or `zod`
function required(value) {
  return value ? true : 'This field is required';
}

// Create the form
const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    username: required,
    password: required
  },
});

// Define fields
const username = defineInputBinds('username');
const password = defineInputBinds('password');

// Submit handler
const onSubmit = handleSubmit(values => {
  // Submit to API
  console.log(values);
});
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit="onSubmit">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div class="mt-1">
                            <input v-bind="username" id="email" name="email" type="text" placeholder="Enter Email"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <span>{{ errors.username }}</span>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input v-bind="password" id="password" name="password" v-model="password" type="password" placeholder="Enter Password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <span>{{ errors.password }}</span>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>

                    <div>
                        <p class="mt-2 text-center text-sm text-gray-600">
                            Don't have an account?
                            <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                                Register
                            </router-link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>