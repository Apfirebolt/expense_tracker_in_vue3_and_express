<template>
    <div>
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Confirmation
            </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit="handleSubmit">
                    <p class="text-red-700 font-semibold">
                        {{ message }}
                    </p>
                    <div class="flex justify-between">
                        <button type="submit"
                            class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Confirm
                        </button>

                        <button @click="closeModalUtil"
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

const props = defineProps({
    message: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['confirmAction']);

const handleSubmit = async (e) => {
    e.preventDefault();
    emits('confirmAction');
};

const closeModalUtil = () => {
    emits('cancelAction')
}
</script>