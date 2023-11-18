<template>
    <div class="min-h-full">
        <div class="container mx-auto flex flex-col flex-1">
            <div class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
                <!-- Search bar -->
                <div class="flex-1 px-4 flex justify-between sm:px-6 lg: lg:mx-auto lg:px-8">
                    <div class="flex-1 flex">
                        <p>
                            Settings for your profile
                        </p>
                    </div>
                    <div class="ml-4 flex items-center md:ml-6">

                        <!-- Profile dropdown -->
                        <Menu as="div" class="ml-3 relative">
                            <div>
                                <MenuButton
                                    class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                                    <span class="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                        {{ authData ? authData.firstName + ' ' + authData.lastName : '' }}
                                    </span>
                                    <ChevronDownIcon class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                        aria-hidden="true" />
                                    <MenuIcon class="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:hidden"
                                        aria-hidden="true" />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-slot="{ active }">
                                    <router-link to="/profile"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your
                                        Profile
                                    </router-link>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                    <router-link to="/"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Home</router-link>
                                    </MenuItem>
                                    <MenuItem @click.prevent="confirmLogout" v-slot="{ active }">
                                    <a href="#"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Logout</a>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>
            <TransitionRoot appear :show="isOpen" as="template">
                <Dialog as="div" @close="closeModal" class="relative z-10">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-black/25" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel
                                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div class="mt-2">
                                        <ExpenseForm @add-expense-action="addExpenseActionUtil" @close-modal="closeModal" />
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>

            <TransitionRoot appear :show="isDeleteModalOpened" as="template">
                <Dialog as="div" @close="closeDeleteModal" class="relative z-10">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-black/25" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel
                                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div class="mt-2">
                                        <Confirm @confirm-action="confirmDelete" :message="confirmMessage"
                                            @close-modal="closeDeleteModal" />
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
            <main class="relative">
                <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">

                            <form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                                <!-- Profile section -->
                                <div class="py-6 px-4 sm:p-6 lg:pb-8">
                                    <div>
                                        <h2 class="text-lg leading-6 font-medium text-gray-900">Profile</h2>
                                        <p class="mt-1 text-sm text-gray-500">
                                            This information will be displayed publicly so be careful what you share.
                                        </p>
                                    </div>

                                    <div class="mt-6 flex flex-col lg:flex-row">
                                        <div class="flex-grow space-y-6">
                                            <div class="col-span-12 sm:col-span-6">
                                                <label for="first-name"
                                                    class="block text-sm font-medium text-gray-700">Username</label>
                                                <input type="text" name="first-name" id="first-name"
                                                    autocomplete="given-name"
                                                    :placeholder="authData.username"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                                            </div>

                                            <div class="col-span-12 sm:col-span-6">
                                                <label for="first-name"
                                                    class="block text-sm font-medium text-gray-700">
                                                    Email</label>
                                                <input type="text" name="first-name" id="first-name"
                                                    autocomplete="given-name"
                                                    :placeholder="authData.email"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                                            </div>
                                        </div>

                                        <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                            <p class="text-sm font-medium text-gray-700" aria-hidden="true">
                                                Photo
                                            </p>
                                            <div class="mt-1 lg:hidden">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                                        aria-hidden="true">
                                                        <img class="rounded-full h-full w-full" alt="" />
                                                    </div>
                                                    <div class="ml-5 rounded-md shadow-sm">
                                                        <div
                                                            class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                                            <label for="mobile-user-photo"
                                                                class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                                                                <span>Change</span>
                                                                <span class="sr-only"> user photo</span>
                                                            </label>
                                                            <input id="mobile-user-photo" name="user-photo" type="file"
                                                                class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="hidden relative rounded-full overflow-hidden lg:block">
                                                <img class="relative rounded-full w-40 h-40" alt="" />
                                                <label for="desktop-user-photo"
                                                    class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
                                                    <span>Change</span>
                                                    <span class="sr-only"> user photo</span>
                                                    <input type="file" id="desktop-user-photo" name="user-photo"
                                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-6 grid grid-cols-12 gap-6">
                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">First
                                                name</label>
                                            <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                                :placeholder="authData.firstName"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Last
                                                name</label>
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                                :placeholder="authData.lastName"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <FooterComponent />
</template>
    
<script>
import { onMounted, computed, ref } from 'vue'
import { useAuth } from '../store/auth'
import { useExpense } from '../store/expense';
import dayjs from 'dayjs';
import ExpenseForm from '../components/ExpenseForm.vue'
import FooterComponent from '../components/FooterComponent.vue';
import Confirm from '../components/Confirm.vue';
import AOS from "aos";
import {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    DialogTitle,
    DialogPanel
} from '@headlessui/vue'
import {
    BellIcon,
    MenuAlt1Icon,
    XIcon,
} from '@heroicons/vue/outline'
import {
    CashIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    OfficeBuildingIcon,
    SearchIcon,
    TrashIcon,
    PlusIcon,
    MinusIcon,
    MenuIcon
} from '@heroicons/vue/solid'

export default {
    components: {
        ExpenseForm,
        Confirm,
        Dialog,
        DialogOverlay,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        BellIcon,
        CashIcon,
        MenuIcon,
        PlusIcon,
        MinusIcon,
        CheckCircleIcon,
        ChevronDownIcon,
        ChevronRightIcon,
        MenuAlt1Icon,
        OfficeBuildingIcon,
        SearchIcon,
        TrashIcon,
        XIcon,
        DialogTitle,
        DialogPanel,
        FooterComponent
    },
    setup() {

        const expense = useExpense()
        const auth = useAuth()

        AOS.init();
        const isOpen = ref(false)
        const isDeleteModalOpened = ref(false)
        const confirmMessage = ref('')
        const selectedItem = ref(null)
        const currentPage = ref(1)
        const searchText = ref('')
        const numberOfItemsPerPage = 5

        function closeModal() {
            isOpen.value = false
        }
        function openModal() {
            isOpen.value = true
        }
        function closeDeleteModal() {
            isDeleteModalOpened.value = false
        }

        const allExpenses = computed(() => expense.getExpenses)
        const authData = computed(() => auth.getAuthData)

        onMounted(async () => {
            await expense.getExpensesAction()
        })

        const addExpenseActionUtil = async (payload) => {
            await expense.addExpense(payload)
            closeModal()
            expense.getExpensesAction()
        }

        const confirmLogout = async () => {
            await auth.logout()
        }

        const totalAmount = computed(() => {
            let total = 0
            allExpenses.value &&
                allExpenses.value.data &&
                allExpenses.value.data.forEach((expense) => {
                    if (expense.type === 'credit') {
                        total += expense.amount
                    } else {
                        total -= expense.amount
                    }
                })
            return total
        })


        const showFormattedDate = (date) => {
            return dayjs(date).format('MMMM DD, YYYY')
        }

        const openDeleteModal = (item) => {
            isDeleteModalOpened.value = true
            confirmMessage.value = `Are you sure you want to delete ${item.description} expense?`
            selectedItem.value = item
        }

        const confirmDelete = async () => {
            await expense.deleteExpense(selectedItem.value._id)
            isDeleteModalOpened.value = false
            expense.getExpensesAction()
        }

        const goToNextPage = async () => {
            if (currentPage.value <= allExpenses.value.lastPage) {
                currentPage.value += 1
                await expense.getExpensesAction(currentPage.value)
            }
        }

        const goToPreviousPage = async () => {
            if (currentPage.value > 0) {
                currentPage.value -= 1
                await expense.getExpensesAction(currentPage.value)
            }
        }

        const showCurrentIndex = computed(() => {
            if (currentPage.value === 1) {
                return 1;
            } else {
                return currentPage.value * numberOfItemsPerPage - numberOfItemsPerPage + 1
            }
        })

        return {
            allExpenses,
            authData,
            isOpen,
            closeModal,
            openModal,
            addExpenseActionUtil,
            expense,
            totalAmount,
            showFormattedDate,
            openDeleteModal,
            confirmDelete,
            closeDeleteModal,
            isDeleteModalOpened,
            confirmMessage,
            selectedItem,
            confirmLogout,
            goToNextPage,
            goToPreviousPage,
            searchText,
            numberOfItemsPerPage,
            currentPage,
            showCurrentIndex
        }
    },
}
</script>
  
  