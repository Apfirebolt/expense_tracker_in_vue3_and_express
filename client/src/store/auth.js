import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../routes";
import httpClient from "../plugins/interceptor";

export const useAuth = defineStore("auth", {
  state: () => ({
    authData: JSON.parse(localStorage.getItem("user")) || {},
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
        console.log(response);
        this.authData = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async registerAction(registerData) {
      try {
        const response = await httpClient.post("auth/register", registerData);
        console.log(response);
        this.authData = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));
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
        console.log(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    logout() {
      this.authData = null;
      localStorage.removeItem("user");
      router.push("/login");
    },

    resetAuth() {
      this.authData = {};
    },
  },
});
