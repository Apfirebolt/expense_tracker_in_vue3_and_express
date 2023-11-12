import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";
import { useAuth } from "./auth";
import { useToast } from "vue-toastification";

const toast = useToast();
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
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.post("expense", expenseData, {
          headers,
        });
        toast.success("Expense added!");
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async getExpenseAction(expenseId) {
      try {
        const response = await httpClient.get("expense/" + expenseId);
        console.log(response);
      } catch (error) {
        console.log(error);
        
      }
    },

    async getExpensesAction(page = 1) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.get("expense?page=" + page, {
          headers,
        });
        this.expenses = response.data;
      } catch (error) {
        console.log(error);
        return error
      }
    },

    async deleteExpense(expenseId) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.delete("expense/" + expenseId, {
          headers,
        });
        toast.success("Expense deleted!");
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
