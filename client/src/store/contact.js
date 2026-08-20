import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";
import { useAuth } from "./auth";
import { useToast } from "vue-toastification";

export const useContact = defineStore("contact", {
  state: () => ({
    contact: ref({}),
    contacts: ref([]),
    pagination: ref({
      total: 0,
      itemsPerPage: 20,
      startPage: 1,
      lastPage: 1,
    }),
    loading: ref(false),
  }),

  getters: {
    getContact() {
      return this.contact;
    },
    getContacts() {
      return this.contacts;
    },
    getPagination() {
      return this.pagination;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    // Helper to grab token safely at action execution time
    getAuthHeader() {
      const auth = useAuth();
      return auth.authData?.token
        ? { Authorization: `Bearer ${auth.authData.token}` }
        : {};
    },

    async submitContact(contactData) {
      const toast = useToast();
      try {
        this.loading = true;
        const headers = this.getAuthHeader();

        const response = await httpClient.post("contact", contactData, {
          headers,
        });

        toast.success("Message sent successfully!");
        return response.data;
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to send message");
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getContactAction(contactId) {
      const toast = useToast();
      try {
        this.loading = true;
        const headers = this.getAuthHeader();

        const response = await httpClient.get(`contact/${contactId}`, {
          headers,
        });

        this.contact = response.data.data;
        return response.data;
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load message");
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getContactsAction(page = 1, limit = 20) {
      const toast = useToast();
      try {
        this.loading = true;
        const headers = this.getAuthHeader();

        const response = await httpClient.get(`contact?page=${page}&limit=${limit}`, {
          headers,
        });

        this.contacts = response.data.data;
        this.pagination = {
          total: response.data.total,
          itemsPerPage: response.data.itemsPerPage,
          startPage: response.data.startPage,
          lastPage: response.data.lastPage,
        };

        return response.data;
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch contact submissions");
        return error;
      } finally {
        this.loading = false;
      }
    },

    async deleteContactAction(contactId) {
      const toast = useToast();
      try {
        const headers = this.getAuthHeader();

        await httpClient.delete(`contact/${contactId}`, {
          headers,
        });

        if (Array.isArray(this.contacts)) {
          this.contacts = this.contacts.filter((item) => item._id !== contactId);
        }

        toast.success("Contact message removed!");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to delete message");
        return error;
      }
    },

    resetContactData() {
      this.contact = {};
      this.contacts = [];
      this.pagination = {
        total: 0,
        itemsPerPage: 20,
        startPage: 1,
        lastPage: 1,
      };
      this.loading = false;
    },
  },
});