<template>
    <div class="bg-gray-100">
        <div class="container mx-auto px-4 py-12">
            <div class="flex flex-wrap -mx-4">
                <div class="w-full md:w-1/2 px-4">
                    <h1 class="text-4xl font-bold leading-tight mb-4">Welcome to our Expense Tracker App</h1>
                    <p class="text-gray-700 mb-8">Track your expenses and manage your budget with ease.</p>
                    <router-link to="/login" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </router-link>
                    <router-link to="/register" class="bg-gray-500 mx-2 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </router-link>
                    <router-link to="/expense" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Get Started
                    </router-link>
                </div>
                <div class="w-full md:w-1/2 px-4">
                    <img src="../assets/vue.svg" alt="Hero Image" class="w-full">
                </div>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<script setup>
import FooterComponent from '../components/FooterComponent.vue';
</script>