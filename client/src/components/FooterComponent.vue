<template>
  <footer class="bg-base text-accent py-4">
    <div class="container mx-auto px-4">
      <div class="flex">
        <div class="w-4/12">
          <p class="text-center text-gray-400 text-lg">
            &copy; {{ currentYear }} Expense Management Application
          </p>
        </div>
        <div class="w-8/12 flex">
          <div class="w-6/12">
            <p class="text-center text-gray-400 text-sm">
              Track your expenses by managing amount credited or debited.
            </p>
          </div>
          <div class="w-6/12">
            <p class="text-center text-gray-400 text-sm">
              Update your profile settings, set expense limit of a Month
            </p>
          </div>
        </div>
      </div>
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
