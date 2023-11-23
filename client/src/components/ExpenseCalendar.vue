<template>
    <div v-if="expenses.length" class="container bg-gray-800 mx-auto text-gray-100 p-3" data-aos="zoom-in-left">
        <h1 class="text-red-400 text-3xl my-3 text-center">SCHEDULER</h1>
        <div class="flex items-center justify-between">
            <button className="bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" @click="previousMonth">
                Previous Month
            </button>
            <p className="font-bold text-2xl text-red-400">
                {{ currentMonthAndYear }}
            </p>
            <button className="bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" @click="nextMonth">
                Next Month
            </button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols:4 lg:grid-cols-7 px-2 gap-2 my-5">
            <div v-for="(item, index) in monthDays"
                class="shadow-lg rounded-md px-4 py-2 bg-violet-800 text-gray-200 text-semibold text-lg">
                <p>
                    {{ item.date }}
                </p>

                <div v-for="(expense, index) in item.expenses" :key="index"
                    class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 my-2">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{{ expense.amount }}</div>
                        <p class="text-gray-100 text-base">
                            {{ expense.description }}
                        </p>
                    </div>
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
    let days = [];
    let daysInCurrentMonth = startDate.value.daysInMonth();
    for (let i = 0; i < daysInCurrentMonth; i += 1) {
        let currentDate = startDate.value.add(i, "day");
        let currentObject = {
            date: currentDate.format("MMMM D, YYYY"),
            tasks: [],
        };
        days.push(currentObject);
    }
    monthDays.value = days;
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
    return (
        dayjs(startDate.value).format("MMMM") +
        " " +
        dayjs(startDate.value).format("YYYY")
    );
});

const updateExpenseData = (month) => {
    let days = [];
    let daysInCurrentMonth = month.daysInMonth();
    for (let i = 0; i < daysInCurrentMonth; i += 1) {
        let currentDate = startDate.value.add(i, "day");
        let currentObject = {
            date: currentDate.format("MMMM D, YYYY"),
            expenses: [],
        };
        days.push(currentObject);
    }

    if (props.expenses.length) {
        props.expenses.forEach((item) => {
            let currentDate = dayjs(item["createdAt"]).format("MMMM D, YYYY");
            let dateObj = days.find((item) => item.date === currentDate);
            if (dateObj) {
                dateObj.expenses.push(item);
            }
        });
    }
    monthDays.value = days;
};
</script>