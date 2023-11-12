<template>
  <footer class="bg-gray-800 py-4">
    <div class="container mx-auto px-4">
      <p class="text-center text-gray-400 text-sm">
        &copy; {{ currentYear }} Expense Management Application
      </p>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear,
    }
  },
})
</script>

<style>
/* Add any custom styles here */
</style>
