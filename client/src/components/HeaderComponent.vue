<template>
    <Disclosure as="nav" class="bg-base text-accent" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <h2 class="text-2xl text-white font-bold">Futura</h2>
                    </div>
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <router-link to="/expense" href="#"
                                class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Expense</router-link>
                            <router-link to="/" href="#"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
                            <a href="#about"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                v-smooth-scroll>About</a>
                            <a href="#contact"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                v-smooth-scroll>Contact</a>
                            <router-link v-if="authData" @click="logOutUtil" to="/" href="#"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</router-link>
                            <router-link v-else to="/login" href="#"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
                            <router-link v-else to="/register" href="#"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
                        </div>
                    </div>
                </div>

                <div class="-mr-2 flex sm:hidden">
                    <!-- Mobile menu button -->
                    <DisclosureButton
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
            </div>
        </div>
        <DisclosurePanel class="sm:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <router-link to="/expense"
                    class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Expense</router-link>
                <router-link to="/"
                    class="text-white block px-3 py-2 rounded-md text-base font-medium">Home</router-link>
                <a href="#about" class="text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
                <a href="#contact" class="text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
                <router-link v-if="authData" @click="logOutUtil" to="/"
                    class="text-white block px-3 py-2 rounded-md text-base font-medium">Logout</router-link>
                <router-link v-else to="/login"
                    class="text-white block px-3 py-2 rounded-md text-base font-medium">Login</router-link>
                <router-link v-else to="/register"
                    class="text-white block px-3 py-2 rounded-md text-base font-medium">Register</router-link>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../store/auth";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const auth = useAuth();

const authData = computed(() => auth.getAuthData)

const logOutUtil = () => {
    auth.logout();
}

</script>