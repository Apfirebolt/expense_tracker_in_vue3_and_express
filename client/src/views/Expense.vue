<template>
  <div class="min-h-full">
    <div class="container mx-auto flex flex-col flex-1">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
        <!-- Search bar -->
        <div class="flex-1 px-4 flex justify-between sm:px-6 lg: lg:mx-auto lg:px-8">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input id="search-field" name="search-field" v-model="searchText"
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search Expenses" type="search" />
              </div>
            </form>
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
                  <ChevronDownIcon class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block" aria-hidden="true" />
                  <MenuIcon class="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:hidden"
                    aria-hidden="true" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                  <router-link to="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your
                    Profile
                  </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <router-link to="/"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Home</router-link>
                  </MenuItem>
                  <MenuItem @click.prevent="confirmLogout" v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Logout</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div class="mt-2">
                    <ExpenseForm @add-expense-action="addExpenseActionUtil" @close-modal="closeModal" :errorMessage="errorMessage" />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <TransitionRoot appear :show="isDeleteModalOpened" as="template">
        <Dialog as="div" @close="closeDeleteModal" class="relative z-10">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div class="mt-2">
                    <Confirm @confirm-action="confirmDelete" :message="confirmMessage" @close-modal="closeDeleteModal" />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
      <main class="flex-1 pb-8">
        <!-- Page header -->
        <div class="bg-white shadow" data-aos="zoom-in-left">
          <div class="px-4 sm:px-6 lg: lg:mx-auto lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div class="flex-1 min-w-0">
                <!-- Profile -->
                <div class="flex items-center">
                  <div>
                    <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      Good morning, {{ authData ? authData.firstName + ' ' + authData.lastName : ''}}
                    </h1>
                    <h2 class="ml-3 text-xl leading-7 text-green-900 sm:leading-9 sm:truncate">
                      Your current balance is Rs 
                      <span class="font-semibold bg-gray-200 px-3 py-2">{{ allExpenses.totalExpense }}</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button type="button" @click="openModal"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8" data-aos="fade-up-right">
          <h2 class=" mx-auto my-4 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Recent activity
          </h2>

          <!-- Activity list (smallest breakpoint only) -->
          <div class="shadow sm:hidden">
            <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
              <li v-for="expense in allExpenses.data" :key="expense._id">
                <a class="block px-4 py-4 bg-white hover:bg-gray-50">
                  <span class="flex items-center space-x-4">
                    <span class="flex-1 flex space-x-2 truncate">
                      <CashIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span class="flex flex-col text-gray-500 text-sm truncate">
                        <span class="truncate">{{ expense.description }}</span>
                        <span class="text-gray-900 font-medium">{{ expense.amount }}</span>
                        <time :datetime="expense.createdAt">{{ showFormattedDate(expense.createdAt) }}</time>
                      </span>
                    </span>
                    <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </ul>

            <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
              aria-label="Pagination">
              <div class="flex-1 flex justify-between">
                <a href="#"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                  Previous
                </a>
                <a href="#"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                  Next
                </a>
              </div>
            </nav>
          </div>

          <!-- Activity table (small breakpoint and up) -->
          <div class="hidden sm:block">
            <div class="mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col mt-2">
                <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th
                          class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th
                          class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                          Type
                        </th>
                        <th
                          class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th
                          class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="expense in allExpenses.data" :key="expense._id" class="bg-white">
                        <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div class="flex">
                            <PlusIcon v-if="expense.type === 'credit'" class="flex-shrink-0 h-6 w-6 text-green-500"
                              aria-hidden="true" />
                            <MinusIcon v-else class="flex-shrink-0 h-6 w-6 text-red-500" aria-hidden="true" />
                            <p class="text-gray-500 truncate group-hover:text-gray-900 mx-3">
                              {{ expense.description }}
                            </p>
                          </div>
                        </td>
                        <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span class="text-gray-900 font-medium">{{ expense.amount }} </span>
                        </td>
                        <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span
                            class='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'>
                            {{ expense.type }}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <time :datetime="expense.createdAt">{{ showFormattedDate(expense.createdAt) }}</time>
                        </td>
                        <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <TrashIcon @click="openDeleteModal(expense)"
                            class="h-5 w-5 text-red-400 hover:text-gray-500 cursor-pointer" aria-hidden="true" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination">
                    <div class="hidden sm:block">
                      <p class="text-sm text-gray-700">
                        Showing
                        {{ ' ' }}
                        <span class="font-medium">{{ showCurrentIndex }}</span>
                        {{ ' ' }}
                        to
                        {{ ' ' }}
                        <span class="font-medium">
                          {{ currentPage * numberOfItemsPerPage < allExpenses.total ? currentPage * numberOfItemsPerPage : allExpenses.total }}
                        </span>
                        {{ ' ' }}
                        of
                        {{ ' ' }}
                        <span class="font-medium">{{ allExpenses.total }}</span>
                        {{ ' ' }}
                        results
                      </p>
                    </div>
                    <div class="flex-1 flex justify-between sm:justify-end">
                      <button
                        @click="goToPreviousPage"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </button>
                      <button 
                        @click="goToNextPage"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
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
    const isOpen = ref(false)
    const isDeleteModalOpened = ref(false)
    const confirmMessage = ref('')
    const errorMessage = ref('')
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
      AOS.init();
      await expense.getExpensesAction()
    })

    const addExpenseActionUtil = async (payload) => {
      // If payload.amount is string return error
      if (isNaN(payload.amount)) {
        errorMessage.value = 'Amount should be a number'
        return
      } else {
        errorMessage.value = ''
      }
      await expense.addExpense(payload)
      closeModal()
      expense.getExpensesAction()
    }

    const confirmLogout = async () => {
      await auth.logout()
    }

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
      if (currentPage.value < allExpenses.value.lastPage) {
        currentPage.value += 1
        await expense.getExpensesAction(currentPage.value)
      }
    }

    const goToPreviousPage = async () => {
      if (currentPage.value > 1) {
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
      showCurrentIndex,
      errorMessage
    }
  },
}
</script>

