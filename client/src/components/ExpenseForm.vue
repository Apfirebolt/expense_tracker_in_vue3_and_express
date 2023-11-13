<template>
    <div>
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-36 w-48" src="../assets/1.png"
                alt="Workflow" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Add Expense
            </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit="handleSubmit">
                    <div>
                        <label for="amount" class="block text-sm font-medium text-gray-700">
                            Expense Amount
                        </label>
                        <div class="mt-1">
                            <input id="expense" name="expense" v-model="amount" type="text" required=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">
                            Expense Description
                        </label>
                        <div class="mt-1">
                            <input id="description" name="description" v-model="description" type="text" required=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="type" class="block text-sm font-medium text-gray-700">
                            Expense Type
                        </label>
                        <div class="mt-1">
                            <select id="type" name="type" v-model="type" required=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select Type</option>
                                <option v-for="option in typeOptions" :value="option.value">{{ option.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <button type="submit"
                            class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Expense
                        </button>

                        <button
                            @click="closeModalUtil"
                            class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const amount = ref('');
const description = ref('');
const type = ref('');
const emits = defineEmits(['addExpenseAction']);
const typeOptions = [
    {
        name: 'Credit',
        value: 'credit'
    },
    {
        name: 'Debit',
        value: 'debit'
    }
]

const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
        amount: amount.value,
        description: description.value,
        type: type.value
    }
    emits('addExpenseAction', payload);
};  

const closeModalUtil = () => {
    amount.value = '';
    description.value = '';
    type.value = '';

    emits('closeModal')
}
</script>