<template>
  <div v-if="expenses.length" class="space-y-6" data-aos="zoom-in-left">
    
    <!-- CALENDAR HEADER & MONTH CONTROLS -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-orange-900/40 shadow-2xl backdrop-blur-md rounded-3xl p-4 sm:px-6 shadow-orange-950/40">
      
      <button 
        type="button" 
        class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/50 text-slate-200 hover:text-amber-300 font-bold text-xs transition-all cursor-pointer flex items-center justify-center space-x-2" 
        @click="previousMonth"
      >
        <span>&larr; Previous Month</span>
      </button>

      <div class="text-center">
        <p class="font-extrabold text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">
          {{ currentMonthAndYear }}
        </p>
      </div>

      <button 
        type="button" 
        class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-orange-950/60 transition-all cursor-pointer flex items-center justify-center space-x-2" 
        @click="nextMonth"
      >
        <span>Next Month &rarr;</span>
      </button>

    </div>

    <!-- CALENDAR DAYS GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 items-start">
      <div 
        v-for="(item, index) in monthDays" 
        :key="index"
        class="bg-slate-900/80 border border-slate-800/80 hover:border-orange-900/50 rounded-2xl p-3.5 shadow-xl transition-all space-y-2 min-h-[120px]"
      >
        <!-- Day Number & Weekday Label -->
        <div class="flex items-center justify-between pb-2 border-b border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400">
            {{ item.dayOfWeek }}
          </span>
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-950 text-white font-extrabold text-xs border border-slate-800">
            {{ item.dayNumber }}
          </span>
        </div>

        <!-- Expenses List for the Day -->
        <div class="space-y-2 pt-1">
          <div 
            v-for="(expense, expIndex) in item.expenses" 
            :key="expIndex"
            class="rounded-xl p-2.5 bg-slate-950/90 border transition-colors space-y-1"
            :class="expense.type === 'credit' ? 'border-emerald-800/40' : 'border-slate-800/80'"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold truncate max-w-[100px] text-slate-200" :title="expense.description">
                {{ expense.description }}
              </span>
              <span 
                class="text-xs font-extrabold"
                :class="expense.type === 'credit' ? 'text-emerald-400' : 'text-amber-300'"
              >
                ₹ {{ expense.amount }}
              </span>
            </div>
          </div>

          <!-- Empty State Indicator -->
          <p v-if="!item.expenses.length" class="text-[11px] text-slate-600 italic py-1 text-center">
            No transactions
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AOS from "aos";
import dayjs from "dayjs";

const monthDays = ref([]);
const startDate = ref(dayjs().startOf("month"));

const props = defineProps({
  expenses: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  AOS.init();
  updateExpenseData(startDate.value);
});

const nextMonth = () => {
  let nextMonthValue = startDate.value.add(1, "month");
  startDate.value = nextMonthValue;
  updateExpenseData(nextMonthValue);
};

const previousMonth = () => {
  let previousMonthValue = startDate.value.add(-1, "month");
  startDate.value = previousMonthValue;
  updateExpenseData(previousMonthValue);
};

const currentMonthAndYear = computed(() => {
  return dayjs(startDate.value).format("MMMM YYYY");
});

const updateExpenseData = (month) => {
  let days = [];
  let daysInCurrentMonth = month.daysInMonth();
  
  for (let i = 0; i < daysInCurrentMonth; i += 1) {
    let currentDate = startDate.value.add(i, "day");
    let currentObject = {
      date: currentDate.format("MMMM D, YYYY"),
      dayNumber: currentDate.format("D"),
      dayOfWeek: currentDate.format("ddd"),
      expenses: [],
    };
    days.push(currentObject);
  }

  // Find the expenses for each day of the current month
  if (props.expenses.length) {
    props.expenses.forEach((item) => {
      let currentDate = dayjs(item["createdAt"]).format("MMMM D, YYYY");
      let dateObj = days.find((day) => day.date === currentDate);
      if (dateObj) {
        dateObj.expenses.push(item);
      }
    });
  }
  monthDays.value = days;
};
</script>