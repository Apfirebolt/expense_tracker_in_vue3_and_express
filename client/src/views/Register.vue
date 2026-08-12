<template>
    <div class="relative min-h-screen bg-slate-800 text-slate-300 font-sans overflow-hidden flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
        
        <!-- Warm Ambient Glows (Red / Orange / Yellow) -->
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-red-600/20 via-orange-500/20 to-amber-400/20 blur-3xl pointer-events-none rounded-full" />

        <div class="relative z-10 sm:mx-auto sm:w-full sm:max-w-md my-auto">
            
            <!-- Brand Logo & Title -->
            <div class="text-center space-y-3 mb-8">
                <div class="inline-flex items-center justify-center bg-slate-100 p-2 rounded-2xl border border-amber-500/30 shadow-lg shadow-orange-950/40">
                    <img class="h-10 w-auto object-contain" src="../assets/1.png" alt="Futura Logo" />
                </div>
                
                <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Create your account
                </h2>
                <p class="text-xs text-amber-200/70">
                    Sign up to start tracking your expenses.
                </p>
            </div>

            <!-- Main Register Card -->
            <div class="bg-slate-900/80 border border-orange-900/40 shadow-2xl backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-orange-950/50">
                <form class="space-y-5" @submit="handleSubmit">
                    
                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                            Email address
                        </label>
                        <div class="relative">
                            <input 
                                id="email" 
                                name="email" 
                                v-model="email" 
                                type="email" 
                                required 
                                placeholder="name@example.com"
                                class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
                            />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                            Password
                        </label>
                        <div class="relative">
                            <input 
                                id="password" 
                                name="password" 
                                v-model="password" 
                                type="password" 
                                required 
                                placeholder="••••••••"
                                class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
                            />
                        </div>
                    </div>

                    <!-- First & Last Name Grid -->
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                                First Name
                            </label>
                            <div class="relative">
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    v-model="firstName" 
                                    type="text" 
                                    placeholder="John"
                                    class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
                                />
                            </div>
                        </div>

                        <div>
                            <label for="lastName" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                                Last Name
                            </label>
                            <div class="relative">
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    v-model="lastName" 
                                    type="text" 
                                    placeholder="Doe"
                                    class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Gradient Submit Button -->
                    <div>
                        <button 
                            type="submit"
                            :disabled="isSubmitting"
                            class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-orange-950/60 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                            <span>{{ isSubmitting ? 'Signing up...' : 'Sign Up' }}</span>
                        </button>
                    </div>

                    <!-- Login Link -->
                    <div class="pt-4 border-t border-slate-800/80 text-center">
                        <p class="text-xs text-slate-400">
                            Already have an account?
                            <router-link to="/login" class="font-semibold text-orange-400 hover:text-amber-300 transition-colors ml-1">
                                Login
                            </router-link>
                        </p>
                    </div>

                </form>
            </div>
        </div>

        <!-- Footer Component -->
        <FooterComponent class="relative z-10 mt-8" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../store/auth';
import router from '../routes/index';
import FooterComponent from '../components/FooterComponent.vue';

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const isSubmitting = ref(false);

const { registerAction } = useAuth();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        isSubmitting.value = true;
        let payload = {
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        };
        await registerAction(payload);
        router.push({ name: 'Expense' });
    } catch (error) {
        console.error('Registration failed:', error);
    } finally {
        isSubmitting.value = false;
    }
};  
</script>