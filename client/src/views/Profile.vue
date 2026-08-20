<template>
  <div class="min-h-screen bg-slate-950 text-slate-300 font-sans relative overflow-x-hidden flex flex-col justify-between">
    
    <!-- Background Ambient Glow -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[30rem] bg-gradient-to-tr from-red-600/10 via-orange-500/10 to-amber-400/10 blur-3xl pointer-events-none rounded-full" />

    <header-component />

    <div class="container mx-auto flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-6 relative z-10 max-w-4xl">
      
      <!-- Top Title & Navigation Bar -->
      <div class="flex items-center justify-between bg-slate-900/80 border border-orange-900/30 shadow-xl backdrop-blur-md rounded-2xl p-4 sm:px-6 mb-6">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            ⚙️
          </div>
          <h1 class="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Account Settings
          </h1>
        </div>

        <Menu as="div" class="relative inline-block text-left">
          <MenuButton class="inline-flex items-center space-x-2 px-3 py-2 bg-slate-950/80 border border-slate-800 hover:border-orange-500/50 rounded-xl text-xs font-semibold text-slate-200 hover:text-white transition-all focus:outline-none cursor-pointer">
            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-bold text-[10px] overflow-hidden">
              <img v-if="authData?.profilePic?.url" :src="authData.profilePic.url" alt="avatar" class="w-full h-full object-cover" />
              <span v-else>{{ authData?.firstName?.charAt(0) || 'U' }}</span>
            </div>
            <span class="hidden sm:inline-block max-w-[140px] truncate">
              {{ authData ? authData.firstName + ' ' + authData.lastName : 'User' }}
            </span>
            <ChevronDownIcon class="h-4 w-4 text-slate-400" aria-hidden="true" />
          </MenuButton>

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
                <router-link to="/" :class="[active ? 'bg-slate-800 text-amber-300' : 'text-slate-300', 'block px-3 py-2 rounded-xl text-xs font-medium transition-colors']">
                  Home
                </router-link>
              </MenuItem>
              <MenuItem @click.prevent="auth.logout()" v-slot="{ active }">
                <button type="button" :class="[active ? 'bg-red-950/40 text-red-300' : 'text-red-400', 'w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer']">
                  Logout
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>

      <div class="space-y-6">

        <!-- SECTION 1: Profile Photo -->
        <section class="bg-slate-900/80 border border-orange-900/40 shadow-xl backdrop-blur-md rounded-3xl p-6 sm:p-8">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <h2 class="text-lg font-bold text-white">Profile Photo</h2>
            <p class="text-xs text-amber-200/70">Update your public display avatar.</p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="relative group w-28 h-28 rounded-full overflow-hidden bg-slate-950 border-2 border-orange-500/40 hover:border-orange-500 transition-all shadow-xl flex items-center justify-center">
              <img 
                v-if="imagePreview || authData?.profilePic?.url" 
                :src="imagePreview || authData?.profilePic?.url" 
                alt="Profile Preview" 
                class="w-full h-full object-cover"
              />
              <span v-else class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-300">
                {{ authData?.firstName?.charAt(0) || 'U' }}
              </span>

              <label for="profile-photo-input" class="absolute inset-0 w-full h-full bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-xs font-bold text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span>Change</span>
                <input id="profile-photo-input" type="file" accept="image/*" class="hidden" @change="onImageSelected" />
              </label>
            </div>

            <div class="space-y-2 text-center sm:text-left">
              <div class="flex gap-3 justify-center sm:justify-start">
                <label for="profile-photo-input" class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-all border border-slate-700">
                  Select New Image
                </label>
                <button 
                  v-if="selectedFile" 
                  @click="handleImageUpload" 
                  :disabled="uploading"
                  class="py-2.5 px-5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {{ uploading ? 'Uploading...' : 'Save Photo' }}
                </button>
              </div>
              <p class="text-[11px] text-slate-500">JPG, PNG, or WEBP up to 5MB.</p>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Account Info (Names & Email) -->
        <section class="bg-slate-900/80 border border-orange-900/40 shadow-xl backdrop-blur-md rounded-3xl p-6 sm:p-8">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <h2 class="text-lg font-bold text-white">Personal Information</h2>
            <p class="text-xs text-amber-200/70">Update your name and review account email.</p>
          </div>

          <form @submit.prevent="handleUpdateProfile" class="space-y-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Email Address</label>
              <input
                type="email"
                :value="authData?.email || ''"
                disabled
                class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-500 text-sm cursor-not-allowed opacity-80"
              />
              <p class="mt-1 text-[11px] text-slate-500">Email address cannot be changed.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="first-name" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">First Name</label>
                <input
                  v-model="profileForm.firstName"
                  id="first-name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 rounded-xl text-slate-100 text-sm focus:outline-none transition-all"
                />
              </div>

              <div>
                <label for="last-name" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Last Name</label>
                <input
                  v-model="profileForm.lastName"
                  id="last-name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 rounded-xl text-slate-100 text-sm focus:outline-none transition-all"
                />
              </div>
            </div>

            <div class="pt-2 flex justify-end">
              <button 
                type="submit"
                class="py-2.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Save Details
              </button>
            </div>
          </form>
        </section>

        <!-- SECTION 3: Change Password -->
        <section class="bg-slate-900/80 border border-orange-900/40 shadow-xl backdrop-blur-md rounded-3xl p-6 sm:p-8">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <h2 class="text-lg font-bold text-white">Change Password</h2>
            <p class="text-xs text-amber-200/70">Ensure your account is using a secure password.</p>
          </div>

          <form @submit.prevent="handleChangePassword" class="space-y-4">
            <div>
              <label for="current-password" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                id="current-password"
                type="password"
                required
                class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 rounded-xl text-slate-100 text-sm focus:outline-none transition-all"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="new-password" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">New Password</label>
                <input
                  v-model="passwordForm.newPassword"
                  id="new-password"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 rounded-xl text-slate-100 text-sm focus:outline-none transition-all"
                />
              </div>

              <div>
                <label for="confirm-password" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Confirm Password</label>
                <input
                  v-model="passwordForm.confirmPassword"
                  id="confirm-password"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 rounded-xl text-slate-100 text-sm focus:outline-none transition-all"
                />
              </div>
            </div>

            <div class="pt-2 flex justify-end">
              <button 
                type="submit"
                class="py-2.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </section>

      </div>
    </div>

    <FooterComponent class="relative z-10" />
  </div>
</template>

<script>
import { computed, ref, reactive, watchEffect } from "vue";
import { useAuth } from "../store/auth";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { useToast } from "vue-toastification";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  setup() {
    const auth = useAuth();
    const toast = useToast();

    const authData = computed(() => auth.getAuthData);

    const selectedFile = ref(null);
    const imagePreview = ref(null);
    const uploading = ref(false);

    const profileForm = reactive({
      firstName: "",
      lastName: "",
    });

    const passwordForm = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    watchEffect(() => {
      if (authData.value) {
        profileForm.firstName = authData.value.firstName || "";
        profileForm.lastName = authData.value.lastName || "";
      }
    });

    const onImageSelected = (e) => {
      const file = e.target.files[0];
      if (file) {
        selectedFile.value = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };

    const handleImageUpload = async () => {
      if (!selectedFile.value) return;
      uploading.value = true;
      await auth.updateProfilePicture(selectedFile.value);
      uploading.value = false;
      selectedFile.value = null;
    };

    const handleUpdateProfile = async () => {
      await auth.updateProfileData(profileForm);
    };

    const handleChangePassword = async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        return toast.error("Passwords do not match");
      }
      await auth.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      passwordForm.currentPassword = "";
      passwordForm.newPassword = "";
      passwordForm.confirmPassword = "";
    };

    return {
      auth,
      authData,
      selectedFile,
      imagePreview,
      uploading,
      profileForm,
      passwordForm,
      onImageSelected,
      handleImageUpload,
      handleUpdateProfile,
      handleChangePassword,
    };
  },
};
</script>