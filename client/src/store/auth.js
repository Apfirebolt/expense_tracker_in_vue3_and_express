import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../routes";
import httpClient from "../plugins/interceptor";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuth = defineStore("auth", {
  state: () => ({
    authData: JSON.parse(localStorage.getItem("user")) || null,
    loading: ref(false),
  }),

  getters: {
    getAuthData() {
      return this.authData;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async loginAction(loginData) {
      try {
        const response = await httpClient.post("auth/login", loginData);
        if (response.data) {
          this.authData = response.data;
          toast.success("Login successful!");
          localStorage.setItem("user", JSON.stringify(response.data));
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        return error;
      }
    },

    async registerAction(registerData) {
      try {
        const response = await httpClient.post("auth/register", registerData);
        if (response.data) {
          this.authData = response.data;
          toast.success("Registration successful!");
          localStorage.setItem("user", JSON.stringify(response.data));
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
        return error;
      }
    },

    async getProfileData() {
      try {
        const headers = { Authorization: `Bearer ${this.authData.token}` };
        const response = await httpClient.get("auth/profile", { headers });
        if (response.data) {
          this.authData = { ...this.authData, ...response.data };
          localStorage.setItem("user", JSON.stringify(this.authData));
        }
      } catch (error) {
        console.error(error);
      }
    },

    async updateProfileData(profileData) {
      try {
        const headers = { Authorization: `Bearer ${this.authData.token}` };
        const response = await httpClient.put("auth/profile", profileData, { headers });
        if (response.data) {
          this.authData = { ...this.authData, ...response.data };
          localStorage.setItem("user", JSON.stringify(this.authData));
          toast.success("Profile updated successfully!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update profile");
        return error;
      }
    },

    async updateProfilePicture(file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const headers = {
          Authorization: `Bearer ${this.authData.token}`,
          "Content-Type": "multipart/form-data",
        };

        const response = await httpClient.put("auth/profile/pic", formData, { headers });
        if (response.data) {
          this.authData = { ...this.authData, profilePic: response.data.profilePic };
          localStorage.setItem("user", JSON.stringify(this.authData));
          toast.success("Profile picture updated successfully!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to upload image");
        return error;
      }
    },

    async changePassword(passwordData) {
      try {
        const headers = { Authorization: `Bearer ${this.authData.token}` };
        const response = await httpClient.put("auth/profile/password", passwordData, { headers });
        if (response.data) {
          toast.success("Password changed successfully!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to change password");
        return error;
      }
    },

    logout() {
      this.authData = null;
      localStorage.removeItem("user");
      router.push("/login");
      toast.success("Logout successful!");
    },
  },
});