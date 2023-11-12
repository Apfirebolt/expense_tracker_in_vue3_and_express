import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";
import { useAuth } from "./auth";

const auth = useAuth();

export const useExpense = defineStore("expense", {
  state: () => ({
    expense: ref({}),
    expenses: ref([]),
    loading: ref(false),
  }),

  getters: {
    getExpense() {
      return this.expense;
    },
    getExpenses() {
      return this.expenses;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async addExpense(expenseData) {
      try {
        const response = await httpClient.post("expense", expenseData);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async getExpense(expenseId) {
      try {
        const response = await httpClient.get("expense/" + expenseId);
        console.log(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async getExpenses() {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.get("expense", { headers });
        console.log(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async updateExpense(expenseData) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.put(
          "expense/" + expenseData.id,
          expenseData,
          { headers }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async deleteExpense(expenseId) {
        try {
          const headers = {
            Authorization: `Bearer ${auth.authData.token}`,
          };
          const response = await httpClient.delete(
            "expense/" + expenseId,
            { headers }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
          return error;
        }
      },

    resetExpenseData() {
      this.expense = {};
      this.expenses = [];
    },
  },
});
