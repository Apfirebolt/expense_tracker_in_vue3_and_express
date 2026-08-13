<template>
  <div class="min-h-screen bg-slate-950 text-slate-300 font-sans relative overflow-x-hidden flex flex-col justify-between">
    
    <!-- Ambient Background Glows -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[30rem] bg-gradient-to-tr from-red-600/10 via-orange-500/10 to-amber-400/10 blur-3xl pointer-events-none rounded-full" />

    <div class="container mx-auto flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-6 relative z-10">
      
      <!-- TOP CONTROL / SEARCH BAR -->
      <div class="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-orange-900/30 shadow-xl backdrop-blur-md rounded-2xl p-3 sm:px-6">
        
        <!-- Search bar -->
        <div class="w-full sm:w-80">
          <form class="w-full" @submit.prevent>
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative w-full text-slate-400 focus-within:text-amber-400">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon class="h-4 w-4 text-slate-500" aria-hidden="true" />
              </div>
              <input 
                id="search-field" 
                name="search-field" 
                v-model="searchText"
                class="block w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 transition-all"
                placeholder="Search expenses..." 
                type="search" 
              />
            </div>
          </form>
        </div>

        <!-- Profile & Account Dropdown -->
        <div class="flex items-center justify-end w-full sm:w-auto">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="inline-flex items-center space-x-2 px-3 py-2 bg-slate-950/80 border border-slate-800 hover:border-orange-500/50 rounded-xl text-xs font-semibold text-slate-200 hover:text-white transition-all focus:outline-none"
              >
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                  {{ authData?.firstName ? authData.firstName.charAt(0) : 'U' }}
                </div>
                <span class="hidden sm:inline-block max-w-[140px] truncate">
                  {{ authData ? authData.firstName + ' ' + authData.lastName : 'User' }}
                </span>
                <ChevronDownIcon class="h-4 w-4 text-slate-400" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition 
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" 
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" 
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 focus:outline-none z-50">
                <MenuItem v-slot="{ active }">
                  <router-link 
                    to="/profile" 
                    :class="[active ? 'bg-slate-800 text-amber-300' : 'text-slate-300', 'block px-3 py-2 rounded-xl text-xs font-medium transition-colors']"
                  >
                    Your Profile
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link 
                    to="/"
                    :class="[active ? 'bg-slate-800 text-amber-300' : 'text-slate-300', 'block px-3 py-2 rounded-xl text-xs font-medium transition-colors']"
                  >
                    Home
                  </router-link>
                </MenuItem>
                <MenuItem @click.prevent="confirmLogout" v-slot="{ active }">
                  <button 
                    type="button" 
                    :class="[active ? 'bg-red-950/40 text-red-300' : 'text-red-400', 'w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors']"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

      </div>

      <!-- ADD EXPENSE MODAL -->
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-3xl bg-slate-900 border border-orange-900/50 p-6 text-left align-middle shadow-2xl backdrop-blur-xl transition-all">
                  <ExpenseForm @add-expense-action="addExpenseActionUtil" @close-modal="closeModal" :errorMessage="errorMessage" />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- DELETE CONFIRMATION MODAL -->
      <TransitionRoot appear :show="isDeleteModalOpened" as="template">
        <Dialog as="div" @close="closeDeleteModal" class="relative z-50">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-3xl bg-slate-900 border border-orange-900/50 p-6 text-left align-middle shadow-2xl backdrop-blur-xl transition-all">
                  <Confirm @confirm-action="confirmDelete" :message="confirmMessage" @close-modal="closeDeleteModal" />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- MAIN CONTENT SECTION -->
      <main class="flex-1 mt-6 space-y-6">
        
        <!-- PAGE HEADER / BALANCE SUMMARY CARD -->
        <div class="bg-slate-900/80 border border-orange-900/40 shadow-2xl backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-orange-950/40" data-aos="zoom-in-left">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div class="space-y-2">
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Good morning, <span class="text-amber-400">{{ authData ? authData.firstName : 'Friend' }}</span>
              </h1>
              <p class="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                <span>Current Total Balance:</span>
                <span class="inline-flex items-center px-3 py-1 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 font-extrabold text-sm sm:text-base">
                  ₹ {{ allExpenses.totalExpense || 0 }}
                </span>
              </p>
            </div>

            <!-- Action Controls -->
            <div class="flex items-center space-x-3">
              <button 
                type="button" 
                @click="switchViewMode('calendar')"
                class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all cursor-pointer"
              >
                View Calendar
              </button>

              <button 
                type="button" 
                @click="switchViewMode('chart')"
                class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all cursor-pointer"
              >
                View Analytics
              </button>
              
              <button 
                type="button" 
                @click="openModal"
                class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-orange-950/60 transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <PlusIcon class="w-4 h-4" />
                <span>Add Expense</span>
              </button>
            </div>

          </div>
        </div>

        <!-- CALENDAR / LIST VIEWS -->
        <ExpenseCalendar v-if="viewMode === 'calendar'" :expenses="allExpenses.data" />
        <ExpenseChart v-else-if="viewMode === 'chart'" :expenses="allExpenses.data" />

        <div v-else class="space-y-4" data-aos="fade-up-right">
          
          <div class="flex items-center justify-between px-2">
            <h2 class="text-lg font-bold text-white tracking-tight">
              Recent Activity
            </h2>
            <span class="text-xs text-amber-400 font-semibold">
              Total Logs: {{ allExpenses.total || 0 }}
            </span>
          </div>

          <!-- Mobile Activity list (smallest breakpoint) -->
          <div class="sm:hidden bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <ul role="list" class="divide-y divide-slate-800">
              <li v-for="expense in filteredExpenses" :key="expense._id" class="p-4 hover:bg-slate-800/40 transition-colors">
                <div class="flex items-center justify-between space-x-4">
                  <div class="flex items-center space-x-3 min-w-0">
                    <div class="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <PlusIcon v-if="expense.type === 'credit'" class="h-5 w-5 text-emerald-400" />
                      <MinusIcon v-else class="h-5 w-5 text-orange-400" />
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-white truncate">{{ expense.description }}</p>
                      <time class="text-[11px] text-slate-500 block" :datetime="expense.createdAt">{{ showFormattedDate(expense.createdAt) }}</time>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <span class="text-sm font-bold text-amber-300">₹ {{ expense.amount }}</span>
                    <button @click="openDeleteModal(expense)" class="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors">
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>

            <!-- Mobile Pagination -->
            <div class="bg-slate-950/80 px-4 py-3 flex items-center justify-between border-t border-slate-800">
              <button 
                @click="goToPreviousPage"
                :disabled="currentPage === 1"
                class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="text-xs text-slate-400 font-medium">Page {{ currentPage }}</span>
              <button 
                @click="goToNextPage"
                class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300"
              >
                Next
              </button>
            </div>
          </div>

          <!-- Desktop Activity Table -->
          <div class="hidden sm:block bg-slate-900/80 border border-slate-800/80 shadow-2xl backdrop-blur-md rounded-3xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th class="px-6 py-4">Description</th>
                    <th class="px-6 py-4 text-right">Amount</th>
                    <th class="px-6 py-4 text-center">Type</th>
                    <th class="px-6 py-4 text-right">Date</th>
                    <th class="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-xs">
                  <tr v-for="expense in filteredExpenses" :key="expense._id" class="hover:bg-slate-800/40 transition-colors group">
                    <td class="px-6 py-4 font-semibold text-slate-100">
                      <div class="flex items-center space-x-3">
                        <div class="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                          <PlusIcon v-if="expense.type === 'credit'" class="h-4 w-4 text-emerald-400" aria-hidden="true" />
                          <MinusIcon v-else class="h-4 w-4 text-orange-400" aria-hidden="true" />
                        </div>
                        <span class="truncate max-w-xs">{{ expense.description }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right font-bold text-amber-300">
                      ₹ {{ expense.amount }}
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                        :class="expense.type === 'credit' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-orange-950/60 text-amber-400 border border-orange-800/40'"
                      >
                        {{ expense.type }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right text-slate-400">
                      <time :datetime="expense.createdAt">{{ showFormattedDate(expense.createdAt) }}</time>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <button 
                        @click="openDeleteModal(expense)" 
                        class="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/40 transition-all cursor-pointer"
                        title="Delete expense"
                      >
                        <TrashIcon class="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Table Pagination Footer -->
            <div class="bg-slate-950/80 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
              <p class="text-xs text-slate-400">
                Showing <span class="font-bold text-white">{{ showCurrentIndex }}</span> to 
                <span class="font-bold text-white">{{ currentPage * numberOfItemsPerPage < filteredExpenses.length ? currentPage * numberOfItemsPerPage : filteredExpenses.length }}</span> of 
                <span class="font-bold text-white">{{ filteredExpenses.length }}</span> results
              </p>

              <div class="flex items-center space-x-2">
                <button
                  @click="goToPreviousPage"
                  :disabled="currentPage === 1"
                  class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <button 
                  @click="goToNextPage"
                  class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all"
                >
                  Next
                </button>
              </div>
            </div>

          </div>

        </div>
        
      </main>
    </div>

    <FooterComponent class="relative z-10" />
  </div>
</template>

<script>
import { onMounted, computed, ref, watch } from 'vue'
import { useAuth } from '../store/auth'
import { useExpense } from '../store/expense';
import dayjs from 'dayjs';
import ExpenseForm from '../components/ExpenseForm.vue'
import FooterComponent from '../components/FooterComponent.vue';
import Confirm from '../components/Confirm.vue';
import ExpenseCalendar from '../components/ExpenseCalendar.vue';
import ExpenseChart from '../components/ExpenseChart.vue';
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
    ExpenseCalendar,
    ExpenseChart,
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
    const viewMode = ref('normal')
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

    const allExpenses = computed(() => expense.getExpenses || {})
    const authData = computed(() => auth.getAuthData)

    // Filter expenses safely with fallback empty array
    const filteredExpenses = computed(() => {
      const expensesList = allExpenses.value?.data || []
      
      if (!searchText.value.trim()) {
        return expensesList
      }
      
      const query = searchText.value.toLowerCase().trim()
      return expensesList.filter(item =>
        item.description && item.description.toLowerCase().includes(query)
      )
    })

    // Reset pagination to page 1 when user types in search bar
    watch(searchText, () => {
      currentPage.value = 1
    })

    onMounted(async () => {
      AOS.init();
      await expense.getExpensesAction(currentPage.value)
    })

    const addExpenseActionUtil = async (payload) => {
      if (isNaN(payload.amount)) {
        errorMessage.value = 'Amount should be a number'
        return
      } else {
        errorMessage.value = ''
      }
      await expense.addExpense(payload)
      closeModal()
      expense.getExpensesAction(currentPage.value)
    }

    const confirmLogout = async () => {
      await auth.logout()
    }

    const showFormattedDate = (date) => {
      return dayjs(date).format('MMMM DD, YYYY')
    }

    const openDeleteModal = (item) => {
      isDeleteModalOpened.value = true
      confirmMessage.value = `Are you sure you want to delete "${item.description}" expense?`
      selectedItem.value = item
    }

    const confirmDelete = async () => {
      if (selectedItem.value?._id) {
        await expense.deleteExpense(selectedItem.value._id)
        isDeleteModalOpened.value = false
        expense.getExpensesAction(currentPage.value)
      }
    }

    // FIXED: Corrected lastPage reference from API response metadata
    const goToNextPage = async () => {
      const maxPages = allExpenses.value?.lastPage || 1
      if (currentPage.value < maxPages) {
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
      if (filteredExpenses.value.length === 0) return 0
      return (currentPage.value - 1) * numberOfItemsPerPage + 1
    })

    const switchViewMode = (mode) => {
      viewMode.value = mode;
    }

    return {
      allExpenses,
      filteredExpenses,
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
      switchViewMode,
      viewMode
    }
  },
}
</script>