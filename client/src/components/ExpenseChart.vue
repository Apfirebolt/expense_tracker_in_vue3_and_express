<template>
  <div v-if="expenses.length" class="space-y-6" data-aos="zoom-in-left">
    
    <!-- MONTH CONTROLS HEADER -->
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
          {{ currentMonthAndYear }} Analytics
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

    <!-- CHARTS GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- MAIN DAILY BAR CHART (STRETCHES 2 COLUMNS) -->
      <div class="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-sm font-bold text-white tracking-tight">
            Daily Breakdown (Debits vs Credits)
          </h3>
          <span class="text-xs text-amber-400 font-semibold">
            {{ currentMonthAndYear }}
          </span>
        </div>
        <div class="h-72 relative">
          <Bar :data="dailyBarChartData" :options="barChartOptions" />
        </div>
      </div>

      <!-- DEBIT VS CREDIT DOUGHNUT CHART -->
      <div class="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 shadow-2xl space-y-4 flex flex-col justify-between">
        <div class="border-b border-slate-800 pb-3">
          <h3 class="text-sm font-bold text-white tracking-tight">
            Type Allocation Ratio
          </h3>
        </div>
        <div class="h-60 relative flex items-center justify-center">
          <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
        </div>
        <div class="flex justify-around pt-2 text-xs font-semibold border-t border-slate-800">
          <span class="text-emerald-400">Credits: ₹ {{ totalCredits }}</span>
          <span class="text-orange-400">Debits: ₹ {{ totalDebits }}</span>
        </div>
      </div>

      <!-- CUMULATIVE EXPENSE TREND (FULL WIDTH) -->
      <div class="lg:col-span-3 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 shadow-2xl space-y-4">
        <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
          <h3 class="text-sm font-bold text-white tracking-tight">
            Cumulative Spending Velocity
          </h3>
          <span class="text-xs text-slate-400">Track monthly expenditure accumulation</span>
        </div>
        <div class="h-64 relative">
          <Line :data="cumulativeLineChartData" :options="lineChartOptions" />
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import dayjs from "dayjs";
import AOS from "aos";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler
} from "chart.js";
import { Bar, Line, Doughnut } from "vue-chartjs";

// Register Chart.js Modules
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler
);

const props = defineProps({
  expenses: {
    type: Array,
    required: true,
  },
});

const startDate = ref(dayjs().startOf("month"));

onMounted(() => {
  AOS.init();
});

const nextMonth = () => {
  startDate.value = startDate.value.add(1, "month");
};

const previousMonth = () => {
  startDate.value = startDate.value.subtract(1, "month");
};

const currentMonthAndYear = computed(() => {
  return startDate.value.format("MMMM YYYY");
});

// Parse expenses into days of the selected month
const monthlyProcessedData = computed(() => {
  const daysInMonth = startDate.value.daysInMonth();
  const daysMap = [];

  for (let i = 0; i < daysInMonth; i++) {
    const currentDate = startDate.value.add(i, "day");
    daysMap.push({
      dateStr: currentDate.format("YYYY-MM-DD"),
      dayLabel: currentDate.format("D"),
      dayOfWeek: currentDate.format("ddd"),
      debit: 0,
      credit: 0,
    });
  }

  props.expenses.forEach((expense) => {
    const expenseDate = dayjs(expense.createdAt).format("YYYY-MM-DD");
    const dayObj = daysMap.find((d) => d.dateStr === expenseDate);
    if (dayObj) {
      const amount = Number(expense.amount) || 0;
      if (expense.type === "credit") {
        dayObj.credit += amount;
      } else {
        dayObj.debit += amount;
      }
    }
  });

  return daysMap;
});

// Calculations for Doughnut summary totals
const totalDebits = computed(() => {
  return monthlyProcessedData.value.reduce((acc, d) => acc + d.debit, 0);
});

const totalCredits = computed(() => {
  return monthlyProcessedData.value.reduce((acc, d) => acc + d.credit, 0);
});

// --- CHART DATA DEFINITIONS ---

// 1. Daily Bar Chart Data
const dailyBarChartData = computed(() => {
  const labels = monthlyProcessedData.value.map((d) => `${d.dayLabel} (${d.dayOfWeek})`);
  const debits = monthlyProcessedData.value.map((d) => d.debit);
  const credits = monthlyProcessedData.value.map((d) => d.credit);

  return {
    labels,
    datasets: [
      {
        label: "Debit (Expenses)",
        backgroundColor: "#f97316", // Tailwind orange-500
        borderRadius: 6,
        data: debits,
      },
      {
        label: "Credit (Income)",
        backgroundColor: "#10b981", // Tailwind emerald-500
        borderRadius: 6,
        data: credits,
      },
    ],
  };
});

// 2. Doughnut Chart Data
const doughnutChartData = computed(() => {
  return {
    labels: ["Debit", "Credit"],
    datasets: [
      {
        backgroundColor: ["#f97316", "#10b981"],
        hoverBackgroundColor: ["#ea580c", "#059669"],
        borderWidth: 0,
        data: [totalDebits.value, totalCredits.value],
      },
    ],
  };
});

// 3. Cumulative Line Chart Data
const cumulativeLineChartData = computed(() => {
  const labels = monthlyProcessedData.value.map((d) => d.dayLabel);
  
  let runningTotal = 0;
  const cumulativeData = monthlyProcessedData.value.map((d) => {
    runningTotal += d.debit;
    return runningTotal;
  });

  return {
    labels,
    datasets: [
      {
        label: "Cumulative Debit Total (₹)",
        borderColor: "#f59e0b", // Tailwind amber-500
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#f59e0b",
        data: cumulativeData,
      },
    ],
  };
});

// --- CHART OPTIONS (TAILWIND DARK THEME COMPATIBLE) ---

const baseGridColor = "rgba(51, 65, 85, 0.4)"; // Slate-700
const baseTextColor = "#94a3b8"; // Slate-400

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#e2e8f0", font: { family: "sans-serif", size: 11 } },
    },
  },
  scales: {
    x: {
      ticks: { color: baseTextColor, font: { size: 10 } },
      grid: { color: "transparent" },
    },
    y: {
      ticks: { color: baseTextColor, font: { size: 10 } },
      grid: { color: baseGridColor },
    },
  },
};

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: { color: "#e2e8f0", font: { family: "sans-serif", size: 11 } },
    },
  },
};

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#e2e8f0", font: { family: "sans-serif", size: 11 } },
    },
  },
  scales: {
    x: {
      ticks: { color: baseTextColor, font: { size: 10 } },
      grid: { color: "transparent" },
    },
    y: {
      ticks: { color: baseTextColor, font: { size: 10 } },
      grid: { color: baseGridColor },
    },
  },
};
</script>