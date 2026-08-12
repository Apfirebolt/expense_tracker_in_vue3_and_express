<template>
  <div class="relative text-slate-300 font-sans">
    
    <!-- Brand Logo & Header -->
    <div class="text-center space-y-3 mb-6">
      <div class="inline-flex items-center justify-center bg-slate-100 p-2 rounded-2xl border border-amber-500/30 shadow-lg shadow-orange-950/40">
        <img class="h-10 w-auto object-contain" src="../assets/1.png" alt="Futura Logo" />
      </div>
      
      <h2 class="text-2xl font-extrabold text-white tracking-tight">
        Add New Expense
      </h2>
      <p class="text-xs text-amber-200/70">
        Enter the details to record your transaction.
      </p>
    </div>

    <!-- Form Container -->
    <form class="space-y-4" @submit="handleSubmit">
      
      <!-- Expense Amount -->
      <div>
        <label for="amount" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          Expense Amount
        </label>
        <div class="relative">
          <input 
            id="amount" 
            name="expense" 
            v-model="amount" 
            type="text" 
            required
            placeholder="e.g. 2500"
            class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
          />
        </div>
      </div>

      <!-- Expense Description -->
      <div>
        <label for="description" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          Expense Description
        </label>
        <div class="relative">
          <input 
            id="description" 
            name="description" 
            v-model="description" 
            type="text" 
            required
            placeholder="e.g. Grocery Shopping"
            class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
          />
        </div>
      </div>

      <!-- Expense Type -->
      <div>
        <label for="type" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          Expense Type
        </label>
        <div class="relative">
          <select 
            id="type" 
            name="type" 
            v-model="type" 
            required
            class="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all cursor-pointer"
          >
            <option value="" disabled class="bg-slate-900 text-slate-500">Select Type</option>
            <option v-for="option in typeOptions" :key="option.value" :value="option.value" class="bg-slate-900 text-slate-200">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-xs text-red-400 font-medium pt-1">
        {{ errorMessage }}
      </p>

      <!-- Modal Action Buttons -->
      <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800/80">
        <button
          type="button"
          @click="closeModalUtil"
          class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-900 border border-slate-800 transition-all cursor-pointer"
        >
          Cancel
        </button>

        <button 
          type="submit"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-orange-950/60 transition-all cursor-pointer"
        >
          Add Expense
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  errorMessage: {
    type: String,
    required: true
  }
});

const amount = ref('');
const description = ref('');
const type = ref('');
const emits = defineEmits(['addExpenseAction', 'closeModal']);

const typeOptions = [
  { name: 'Credit', value: 'credit' },
  { name: 'Debit', value: 'debit' }
];

const handleSubmit = async (e) => {
  e.preventDefault();
  let payload = {
    amount: amount.value,
    description: description.value,
    type: type.value
  };
  emits('addExpenseAction', payload);
};  

const closeModalUtil = () => {
  amount.value = '';
  description.value = '';
  type.value = '';
  emits('closeModal');
};
</script>