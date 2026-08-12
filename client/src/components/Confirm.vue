<template>
  <div class="relative text-slate-300 font-sans">
    
    <!-- Brand Logo & Header -->
    <div class="text-center space-y-3 mb-6">
      <div class="inline-flex items-center justify-center bg-slate-100 p-2 rounded-2xl border border-amber-500/30 shadow-lg shadow-orange-950/40">
        <img class="h-10 w-auto object-contain" src="../assets/1.png" alt="Futura Logo" />
      </div>
      
      <h2 class="text-2xl font-extrabold text-white tracking-tight">
        Confirm Action
      </h2>
      <p class="text-xs text-amber-200/70">
        Please review before proceeding.
      </p>
    </div>

    <!-- Confirmation Body -->
    <form class="space-y-6" @submit="handleSubmit">
      
      <div class="p-4 rounded-2xl bg-red-950/30 border border-red-800/40 text-center">
        <p class="text-sm font-semibold text-red-300 leading-relaxed">
          {{ message }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end space-x-3 pt-2">
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
          Confirm
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['confirmAction', 'closeModal', 'cancelAction']);

const handleSubmit = async (e) => {
  e.preventDefault();
  emits('confirmAction');
};

const closeModalUtil = () => {
  emits('cancelAction');
  emits('closeModal');
};
</script>