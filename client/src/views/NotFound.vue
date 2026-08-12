<template>
  <div class="relative min-h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
    
    <!-- Warm Ambient Background Glows -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-tr from-red-600/20 via-orange-500/15 to-amber-400/10 blur-3xl pointer-events-none rounded-full" />

    <div class="relative z-10 sm:mx-auto sm:w-full sm:max-w-md my-auto text-center">
      
      <!-- 404 Badge with Gradient Text -->
      <div class="inline-flex items-center justify-center mb-6">
        <span class="text-7xl sm:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 drop-shadow-sm">
          404
        </span>
      </div>

      <!-- Main Glassmorphic Card -->
      <div class="bg-slate-900/80 border border-orange-900/40 shadow-2xl backdrop-blur-md rounded-3xl p-8 shadow-orange-950/50 space-y-4">
        
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>

        <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <!-- Navigation Action Buttons -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <router-link
            to="/"
            class="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 active:scale-[0.99] text-white font-bold text-xs shadow-lg shadow-orange-950/60 transition-all flex items-center justify-center space-x-2"
          >
            <span>Back to Homepage</span>
          </router-link>

          <router-link
            to="/expense"
            class="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 font-semibold text-xs transition-all flex items-center justify-center"
          >
            <span>My Expenses</span>
          </router-link>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
// Using Vue 3 <script setup> for cleaner code structure
</script>