<template>
  <div class="min-h-full">
    <div class="container mx-auto flex flex-col flex-1">
      <div
        class="relative z-10 flex-shrink-0 flex h-16 bg-accent border-b border-gray-200 lg:border-none"
      >
        <!-- Search bar -->
        <div class="flex justify-between items-center w-full px-6">
          <div class="flex-1 flex">
            <p class="text-2xl font-semibold">Settings for your profile</p>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                >
                  <span
                    class="hidden ml-3 text-gray-700 text-sm font-medium lg:block"
                  >
                    {{
                      authData
                        ? authData.firstName + " " + authData.lastName
                        : ""
                    }}
                  </span>
                  <ChevronDownIcon
                    class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                  <MenuIcon
                    class="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:hidden"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <router-link
                      to="/profile"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Your Profile
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link
                      to="/"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Home</router-link
                    >
                  </MenuItem>
                  <MenuItem @click.prevent="confirmLogout" v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Logout</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="relative mt-4">
        <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div class="bg-accent rounded-lg shadow overflow-hidden">
            <div
              class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x"
            >
              <form
                class="divide-y divide-gray-200 lg:col-span-9"
                action="#"
                method="POST"
              >
                <!-- Profile section -->
                <div class="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 class="text-lg leading-6 font-medium text-gray-900">
                      Profile
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>

                  <div class="mt-6 flex flex-col lg:flex-row">
                    <div class="flex-grow space-y-6">
                      <div class="col-span-12 sm:col-span-6">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Email</label
                        >
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autocomplete="given-name"
                          :placeholder="authData.email"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            for="first-name"
                            class="block text-sm font-medium text-gray-700"
                            >First name</label
                          >
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autocomplete="given-name"
                            :placeholder="authData.firstName"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            for="last-name"
                            class="block text-sm font-medium text-gray-700"
                            >Last name</label
                          >
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autocomplete="family-name"
                            :placeholder="authData.lastName"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0"
                    >
                      <p
                        class="text-sm font-medium text-gray-700"
                        aria-hidden="true"
                      >
                        Photo
                      </p>
                      <div class="mt-1 lg:hidden">
                        <div class="flex items-center">
                          <div
                            class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                            aria-hidden="true"
                          >
                            <img class="rounded-full h-full w-full" alt="" />
                          </div>
                          <div class="ml-5 rounded-md shadow-sm">
                            <div
                              class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                            >
                              <label
                                for="mobile-user-photo"
                                class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                              >
                                <span>Change</span>
                                <span class="sr-only"> user photo</span>
                              </label>
                              <input
                                id="mobile-user-photo"
                                name="user-photo"
                                type="file"
                                class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="hidden relative rounded-full overflow-hidden lg:block"
                      >
                        <img class="relative rounded-full w-40 h-40" alt="" />
                        <label
                          for="desktop-user-photo"
                          class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                        >
                          <span>Change</span>
                          <span class="sr-only"> user photo</span>
                          <input
                            type="file"
                            id="desktop-user-photo"
                            name="user-photo"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import { computed, ref } from "vue";
import { useAuth } from "../store/auth";
import FooterComponent from "../components/FooterComponent.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon, MenuIcon } from "@heroicons/vue/solid";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
    MenuIcon,
    FooterComponent,
  },
  setup() {
    const auth = useAuth();

    const isOpen = ref(false);
    const confirmMessage = ref("");
    const selectedItem = ref(null);

    function closeModal() {
      isOpen.value = false;
    }
    function openModal() {
      isOpen.value = true;
    }

    const authData = computed(() => auth.getAuthData);

    const confirmLogout = async () => {
      auth.logout();
    };

    return {
      authData,
      isOpen,
      closeModal,
      openModal,
      confirmMessage,
      selectedItem,
      confirmLogout,
    };
  },
};
</script>
