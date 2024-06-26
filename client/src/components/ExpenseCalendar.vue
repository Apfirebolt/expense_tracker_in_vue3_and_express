<template>
    <div v-if="expenses.length" class="container bg-gray-100 mx-auto" data-aos="zoom-in-left">
        <div class="flex items-center justify-between bg-gray-200 shadow-md py-3">
            <button className="bg-indigo-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-3" @click="previousMonth">
                Previous Month
            </button>
            <p className="font-bold text-2xl text-blue-700">
                {{ currentMonthAndYear }}
            </p>
            <button className="bg-indigo-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-3" @click="nextMonth">
                Next Month
            </button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols:4 lg:grid-cols-7 gap-4 my-4 items-start">
            <div v-for="(item, index) in monthDays" :key="index"
                class="shadow-lg rounded-md px-4 py-2 bg-orange-800 text-gray-200 text-semibold text-lg">
                <p>
                    {{ item.date }}
                </p>

                <div v-for="(expense, index) in item.expenses" :key="index"
                    class="max-w-sm rounded overflow-hidden shadow-lg text-gray-700 bg-gray-100 my-2">
                    <div class="px-2 py-1">
                        <div class="mb-1">{{ expense.amount }}</div>
                        <p class="text-base">
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

// Array stores current month days
const monthDays = ref([]);
// Start date of current month
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

    // Find the expenses for each day of the current month
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