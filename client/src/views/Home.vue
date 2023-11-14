<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h2 class="text-2xl text-white font-bold">Futura</h2>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                to="/expense"
                href="#"
                class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >Expense</router-link
              >
              <router-link
                to="/"
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Home</router-link
              >
              <router-link
                to="/login"
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Login</router-link
              >
              <router-link
                to="/register"
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Register</router-link
              >
              <a
                href="#about"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                v-smooth-scroll
                >About</a
              >
              <a
                href="#contact"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                v-smooth-scroll
                >Contact</a
              >
            </div>
          </div>
        </div>

        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
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
        <router-link
          to="/expense"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >Expense</router-link
        >
        <router-link
          to="/"
          class="text-white block px-3 py-2 rounded-md text-base font-medium"
          >Home</router-link
        >
        <router-link
          to="/login"
          class="text-white block px-3 py-2 rounded-md text-base font-medium"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="text-white block px-3 py-2 rounded-md text-base font-medium"
          >Register</router-link
        >
        <a
          href=""
          class="text-white block px-3 py-2 rounded-md text-base font-medium"
          >About</a
        >
        <a
          href=""
          class="text-white block px-3 py-2 rounded-md text-base font-medium"
          >Contact</a
        >
      </div>
    </DisclosurePanel>
  </Disclosure>

  <section class="bg-white shadow sm:rounded-lg" id="about">
    <div class="px-4 py-5 sm:p-6">
      <h2 class="text-3xl my-5 text-center text-red-800">ABOUT</h2>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your email
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Change the email address you want associated with your account.</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>

      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your Password
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Keep it more secured</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your email
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Change the email address you want associated with your account.</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>

      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your Password
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Keep it more secured</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>
    </div>
  </section>

  <section class="bg-white shadow sm:rounded-lg" id="contact">
    <div class="px-4 py-5 sm:p-6">
      <h2 class="text-3xl my-5 text-center text-red-800">CONTACT</h2>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your email
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Change the email address you want associated with your account.</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>

      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your Password
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Keep it more secured</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your email
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Change the email address you want associated with your account.</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>

      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Update your Password
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Keep it more secured</p>
      </div>
      <p class="text-gray-700 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
        placeat distinctio soluta eaque, sapiente officia at commodi iste
        quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
        commodi?
      </p>
    </div>
  </section>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
};
</script>
