<template>
  <div class="flex flex-col justify-center items-center py-12 space-y-4">
    <!-- Fiery Gradient Ring Spinner -->
    <div class="relative w-16 h-16 flex items-center justify-center">
      <!-- Ambient Glow Behind Spinner -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 blur-md opacity-40 animate-pulse"></div>
      
      <!-- Rotating Gradient Border -->
      <div class="w-16 h-16 rounded-full border-4 border-transparent border-t-red-500 border-r-orange-500 border-b-amber-400 animate-spin"></div>
    </div>

    <!-- Loading Text -->
    <p class="text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">
      Loading...
    </p>
  </div>
</template>

<script setup>
// Using Vue 3 <script setup> for cleaner syntax
</script>