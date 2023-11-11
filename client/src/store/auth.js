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
      async loginAction() {
        try {
          console.log('Inside login action');
        } catch (error) {
          console.log(error)
          return error
        }
      },

      async registerAction() {
        try {
          console.log('Inside register action');
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