<template>
  <div class="min-h-screen bg-slate-700 text-slate-300 font-sans relative overflow-hidden">
    
    <!-- Background Ambient Glows -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-tr from-red-600/10 via-orange-500/10 to-amber-400/10 blur-3xl pointer-events-none rounded-full" />

    <header-component />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 relative z-10">
      
      <!-- ABOUT SECTION -->
      <section class="bg-slate-900/80 border border-orange-900/40 shadow-2xl backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-orange-950/50" id="about">
        
        <div class="text-center space-y-3 mb-8">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">
            ABOUT FUTURA
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
        </div>

        <div class="max-w-3xl mx-auto text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed text-center sm:text-left">
          <p>
            <strong class="text-amber-400 font-semibold">Futura</strong> is an intuitive expense tracking platform designed to give you total control over your personal finances. Manage daily spending, edit logs, categorize transactions, and visualize monthly trends seamlessly.
          </p>
          <p class="text-slate-400">
            Engineered as a modern Single Page Application (SPA), Futura leverages <span class="text-orange-400 font-medium">Vue.js</span>, <span class="text-orange-400 font-medium">Tailwind CSS</span>, an <span class="text-orange-400 font-medium">Express</span> REST backend, and <span class="text-orange-400 font-medium">MongoDB</span> storage—delivering a fast, secure, and fully responsive experience across all desktop, tablet, and mobile browsers.
          </p>
        </div>

        <!-- Swiper Carousel -->
        <div class="mt-10">
          <swiper 
            class="rounded-2xl overflow-hidden border border-slate-800 shadow-xl" 
            :modules="modules" 
            :pagination="{ clickable: true }"
          >
            <swiper-slide>
              <div class="relative h-72 sm:h-96 w-full bg-slate-950 flex items-center justify-center">
                <img 
                  src="https://media.istockphoto.com/id/1486626509/photo/woman-use-ai-to-help-work-or-use-ai-everyday-life-at-home-ai-learning-and-artificial.jpg?s=1024x1024&w=is&k=20&c=GdZtXvKObS4z87L6zwi7fgmWlynJx4dRitwYJUtClLo="
                  class="w-full h-full object-cover" 
                  alt="Futura Analytics Feature"
                />
              </div>
            </swiper-slide>

            <swiper-slide>
              <div class="relative h-72 sm:h-96 w-full bg-slate-950 flex items-center justify-center">
                <img 
                  src="https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_1280.jpg"
                  class="w-full h-full object-cover" 
                  alt="Expense Tracking"
                />
              </div>
            </swiper-slide>

            <swiper-slide>
              <div class="relative h-72 sm:h-96 w-full bg-slate-950 flex items-center justify-center">
                <img 
                  src="https://cdn.pixabay.com/photo/2020/04/08/08/08/spring-5016266_1280.jpg"
                  class="w-full h-full object-cover" 
                  alt="Budget Management"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>

      </section>

      <!-- CONTACT SECTION -->
      <section class="bg-slate-900/80 border border-orange-900/40 shadow-2xl backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-orange-950/50" id="contact">
        
        <div class="text-center space-y-3 mb-10">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">
            CONTACT US
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <!-- Contact Info -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-white tracking-tight">
              Feel free to reach out to us!
            </h3>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Have questions, feedback, or feature suggestions for Futura? Send us a message and our team will get back to you promptly.
            </p>
            <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
              <p class="text-amber-400 font-semibold">📍 Fast & Support</p>
              <p class="text-slate-400">We typically respond to inquiries within 24 hours.</p>
            </div>
          </div>

          <!-- Contact Form -->
          <form class="space-y-4 p-6 bg-slate-950/80 border border-slate-800 rounded-2xl shadow-inner" @submit.prevent>
            <div>
              <label for="name" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                Name
              </label>
              <input 
                type="text" 
                name="name" 
                id="name"
                placeholder="John Doe"
                class="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
                required
              />
            </div>

            <div>
              <label for="email" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="name@example.com"
                class="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500" 
                required
              />
            </div>

            <div>
              <label for="message" class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                Message
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows="4"
                placeholder="How can we help you?"
                class="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-amber-400/40 rounded-xl text-slate-100 text-sm focus:outline-none transition-all placeholder-slate-500 resize-none"
                required
              ></textarea>
            </div>

            <div>
              <button 
                type="submit"
                class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:via-orange-400 hover:to-amber-400 active:scale-[0.99] text-white font-bold text-xs shadow-lg shadow-orange-950/60 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Send Message</span>
              </button>
            </div>
          </form>

        </div>

      </section>

    </main>
  </div>
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Pagination];
</script>