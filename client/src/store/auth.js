import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useAuth = defineStore('auth', {
    state: () => ({
      authData: ref({}),
      loading: ref(false),
    }),

    getters: {
        getAuthData() {
            return this.authData;
        },
        isLoading() {
            return this.loading;
        }
    },
  
    actions: {
      async loginAction(loginData) {
        try {
          console.log('Inside login action', loginData);
          const response = await httpClient.post('auth/login', loginData);
          console.log(response);

        } catch (error) {
          console.log(error)
          return error
        }
      },

      async registerAction(registerData) {
        try {
          console.log('Inside register action', registerData);
          const response = await httpClient.post('auth/register', registerData);
          console.log(response);
        } catch (error) {
          console.log(error)
          return error
        }
      },

      async getProfileData() {
        try {
          console.log('Inside profile data action');
        } catch (error) {
          console.log(error)
          return error
        }
      },

      resetAuth() {
        this.authData = {};
      }
    },
  })