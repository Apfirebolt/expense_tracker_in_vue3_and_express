import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { useAuth } from '../store/auth';
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: defineAsyncComponent(() => import('../views/Login.vue'))
    },
    {
        path: '/register',
        name: 'Register',
        component: defineAsyncComponent(() => import('../views/Register.vue'))
    },
    {
        path: '/expense',
        name: 'Expense',
        component: defineAsyncComponent(() => import('../views/Expense.vue'))
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuth();

    if (authRequired && !auth.authData) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});

export default router