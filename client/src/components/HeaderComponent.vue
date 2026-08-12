<template>
  <Disclosure as="nav" class="sticky top-0 z-50 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md text-slate-200" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        {/* Brand Logo & Desktop Nav Links */}
        <div className="flex items-center space-x-8">
          <router-link to="/" class="flex items-center space-x-2.5 group">
            <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-indigo-950/50 group-hover:bg-indigo-500 transition-colors">
              F
            </div>
            <span class="text-xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Futura
            </span>
          </router-link>

          <div class="hidden sm:flex items-center space-x-2">
            <router-link 
              to="/expense" 
              class="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              active-class="bg-indigo-600 text-white shadow-md shadow-indigo-950/40"
              inactive-class="text-slate-300 hover:text-white hover:bg-slate-900"
            >
              Expense
            </router-link>

            <router-link 
              to="/" 
              class="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              exact-active-class="bg-indigo-600 text-white shadow-md shadow-indigo-950/40"
              inactive-class="text-slate-300 hover:text-white hover:bg-slate-900"
            >
              Home
            </router-link>

            <a 
              href="#about" 
              class="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-all"
              v-smooth-scroll
            >
              About
            </a>

            <a 
              href="#contact" 
              class="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-all"
              v-smooth-scroll
            >
              Contact
            </a>
          </div>
        </div>

        {/* Right Desktop Auth Actions */}
        <div class="hidden sm:flex items-center space-x-3">
          <template v-if="authData">
            <span class="text-xs text-slate-400 font-medium mr-1">
              Logged in
            </span>
            <button 
              @click="logOutUtil" 
              class="px-4 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-950/30 hover:bg-red-950/60 border border-red-800/40 transition-all cursor-pointer"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link 
              to="/login" 
              class="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Login
            </router-link>

            <router-link 
              to="/register" 
              class="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all"
            >
              Register
            </router-link>
          </template>
        </div>

        {/* Mobile Menu Button */}
        <div class="flex sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

      </div>
    </div>

    {/* Mobile Navigation Drawer */}
    <DisclosurePanel class="sm:hidden border-t border-slate-800/80 bg-slate-950/95">
      <div class="px-3 pt-2 pb-4 space-y-1">
        <router-link 
          to="/expense"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-all"
          active-class="bg-indigo-600 text-white"
          inactive-class="text-slate-300 hover:bg-slate-900 hover:text-white"
        >
          Expense
        </router-link>

        <router-link 
          to="/"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-all"
          exact-active-class="bg-indigo-600 text-white"
          inactive-class="text-slate-300 hover:bg-slate-900 hover:text-white"
        >
          Home
        </router-link>

        <a href="#about" class="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition-all">About</a>
        <a href="#contact" class="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition-all">Contact</a>

        <div class="pt-3 border-t border-slate-800 space-y-2">
          <template v-if="authData">
            <button 
              @click="logOutUtil" 
              class="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-950/30 transition-colors"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link 
              to="/login"
              class="block w-full text-center px-4 py-2 text-sm font-semibold text-slate-200 bg-slate-900 rounded-xl"
            >
              Login
            </router-link>
            <router-link 
              to="/register"
              class="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl"
            >
              Register
            </router-link>
          </template>
        </div>
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

const authData = computed(() => auth.getAuthData);

const logOutUtil = () => {
  auth.logout();
};
</script>