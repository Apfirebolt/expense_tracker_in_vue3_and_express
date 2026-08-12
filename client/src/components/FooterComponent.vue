<template>
  <footer class="relative z-10 bg-slate-700/90 border-t border-orange-950/40 backdrop-blur-md text-slate-300 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        
        <!-- Brand & Copyright -->
        <div class="space-y-1">
          <div class="flex items-center justify-center md:justify-start space-x-2">
            <div class="w-6 h-6 rounded-lg bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-orange-950/50">
              F
            </div>
            <span class="text-lg font-extrabold tracking-tight text-white">
              Futura
            </span>
          </div>
          <p class="text-xs text-slate-400">
            &copy; {{ currentYear }} Futura Expense Tracker. All rights reserved.
          </p>
        </div>

        <!-- Feature Highlight 1 -->
        <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1">
          <p class="text-amber-400 font-semibold flex items-center justify-center md:justify-start space-x-1">
            <span>💳 Smart Tracking</span>
          </p>
          <p class="text-slate-400 leading-relaxed">
            Track your expenses seamlessly by managing credits, debits, and custom categories in real-time.
          </p>
        </div>

        <!-- Feature Highlight 2 -->
        <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1">
          <p class="text-amber-400 font-semibold flex items-center justify-center md:justify-start space-x-1">
            <span>⚙️ Profile & Budgets</span>
          </p>
          <p class="text-slate-400 leading-relaxed">
            Update your profile preferences and manage monthly limits to keep your finances in check.
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>