<template>
  <div class="min-h-screen bg-slate-950 text-slate-300 font-sans relative overflow-x-hidden flex flex-col justify-between">
    
    <!-- Background Ambient Glows -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[30rem] bg-gradient-to-tr from-red-600/10 via-orange-500/10 to-amber-400/10 blur-3xl pointer-events-none rounded-full" />

    <!-- Included Header Component -->
    <header-component />

    <div class="container mx-auto flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-6 relative z-10">
      
      <!-- TOP CONTROL / TITLE & PROFILE BAR -->
      <div class="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-orange-900/30 shadow-xl backdrop-blur-md rounded-2xl p-4 sm:px-6">
        
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-orange-950/50">
            ⚙️
          </div>
          <h1 class="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Settings for your profile
          </h1>
        </div>

        <!-- Profile Dropdown -->
        <div class="flex items-center justify-end w-full sm:w-auto">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="inline-flex items-center space-x-2 px-3 py-2 bg-slate-950/80 border border-slate-800 hover:border-orange-500/50 rounded-xl text-xs font-semibold text-slate-200 hover:text-white transition-all focus:outline-none cursor-pointer"
              >
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                  {{ authData?.firstName ? authData.firstName.charAt(0) : 'U' }}
                </div>
                <span class="hidden sm:inline-block max-w-[140px] truncate">
                  {{ authData ? authData.firstName + ' ' + authData.lastName : 'User' }}
                </span>
                <ChevronDownIcon class="h-4 w-4 text-slate-400" aria-hidden="true" />
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
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 focus:outline-none z-50">
                <MenuItem v-slot="{ active }">
                  <router-link 
                    to="/profile" 
                    :class="[active ? 'bg-slate-800 text-amber-300' : 'text-slate-300', 'block px-3 py-2 rounded-xl text-xs font-medium transition-colors']"
                  >
                    Your Profile
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link 
                    to="/"
                    :class="[active ? 'bg-slate-800 text-amber-300' : 'text-slate-300', 'block px-3 py-2 rounded-xl text-xs font-medium transition-colors']"
                  >
                    Home
                  </router-link>
                </MenuItem>
                <MenuItem @click.prevent="confirmLogout" v-slot="{ active }">
                  <button 
                    type="button" 
                    :class="[active ? 'bg-red-950/40 text-red-300' : 'text-red-400', 'w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer']"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

      </div>

      <!-- MAIN PROFILE SETTINGS SECTION -->
      <main class="mt-6 flex-1">
        <div class="bg-slate-900/80 border border-orange-900/40 shadow-2xl backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-orange-950/40">
          
          <form @submit.prevent class="space-y-8">
            
            <!-- Section Title -->
            <div class="border-b border-slate-800 pb-4">
              <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Personal Information
              </h2>
              <p class="mt-1 text-xs text-amber-200/70">
                Manage your account credentials and personal information.
              </p>
            </div>

            <div class="flex flex-col-reverse lg:flex-row gap-8 items-start">
              
              <!-- Left Column: Form Fields -->
              <div class="flex-grow space-y-5 w-full">
                
                <!-- Email Field -->
                <div>
                  <label for="email" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    :value="authData?.email || ''"
                    disabled
                    placeholder="name@example.com"
                    class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-400 text-sm focus:outline-none cursor-not-allowed opacity-80"
                  />
                  <p class="mt-1 text-[11px] text-slate-500">Email address cannot be changed directly.</p>
                </div>

                <!-- First and Last Name Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="first-name" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      :placeholder="authData?.firstName || 'First Name'"
                      class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label for="last-name" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      :placeholder="authData?.lastName || 'Last Name'"
                      class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500"
                    />
                  </div>
                </div>

                <!-- Action Submit Button -->
                <div class="pt-4 flex justify-end">
                  <button 
                    type="submit"
                    class="py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 active:scale-[0.99] text-white font-bold text-xs shadow-lg shadow-orange-950/60 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>

              </div>

              <!-- Right Column: Avatar/Photo Upload -->
              <div class="flex flex-col items-center justify-center space-y-3 w-full lg:w-auto lg:px-6">
                <span class="block text-xs font-bold uppercase tracking-wider text-amber-400">
                  Profile Photo
                </span>

                <div class="relative group w-32 h-32 rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 hover:border-orange-500 transition-all shadow-xl flex items-center justify-center">
                  <!-- Fallback Avatar Initials -->
                  <span class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-300">
                    {{ authData?.firstName ? authData.firstName.charAt(0) : 'U' }}
                  </span>

                  <!-- Hover Overlay for Photo Change -->
                  <label
                    for="desktop-user-photo"
                    class="absolute inset-0 w-full h-full bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-xs font-bold text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <span>Change</span>
                    <input
                      type="file"
                      id="desktop-user-photo"
                      name="user-photo"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

            </div>

          </form>

        </div>
      </main>

    </div>

    <!-- Included Footer Component -->
    <FooterComponent class="relative z-10" />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useAuth } from "../store/auth";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon, MenuIcon } from "@heroicons/vue/solid";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
    MenuIcon,
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