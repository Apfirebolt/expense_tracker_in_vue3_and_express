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
import SwiperClass, { Pagination } from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
import 'swiper/css/pagination'


// Use swiper modules
SwiperClass.use([Pagination])

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueSmoothScroll)
app.use(VueAwesomeSwiper)
app.component('header-component', HeaderComponent)
app.mount('#app');

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
};

app.use(Toast, options);