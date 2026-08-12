import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSmoothScroll from 'vue3-smooth-scroll'
import './style.css'
import router from './routes'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import HeaderComponent from './components/HeaderComponent.vue'

// Swiper imports
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
import 'swiper/css/pagination'

// AOS imports
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VueSmoothScroll)
app.use(VueAwesomeSwiper)
app.component('header-component', HeaderComponent)

// Custom Toast Options for Red, Orange & Yellow Glassmorphic Theme
const toastOptions = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    newestOnTop: true,
    position: "top-right",
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    // Custom Tailwind class overrides
    toastClassName: "futura-custom-toast",
    bodyClassName: "futura-custom-toast-body",
};

app.use(Toast, toastOptions);
app.mount('#app');