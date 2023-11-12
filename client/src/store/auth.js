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
        console.log(error);
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
        console.log(error);
        return error;
      }
    },

    async getProfileData() {
      try {
        const headers = {
          Authorization: `Bearer ${this.authData.token}`,
        };
        const response = await httpClient.get("auth/profile", { headers });
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    logout() {
      this.authData = null;
      localStorage.removeItem("user");
      router.push("/login");
      toast.success("Logout successful!");
    },

    resetAuth() {
      this.authData = {};
    },
  },
});
