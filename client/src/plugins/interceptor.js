import axios from 'axios';
import router from '../routes/index';
import { useAuth } from '../store/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();
let baseURL = 'http://localhost:5000/api/';

const httpClient = axios.create({ baseURL });

// Create a request interceptor

const requestInterceptor = httpClient.interceptors.request.use(
    config => {
        // Do something before request is sent
        return config;
    },
    error => {
        // Do something with request error
        console.log('Error here')
        return Promise.reject(error);
    }
);

// Create a response interceptor
const responseInterceptor = httpClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            toast.error('You are not authorized to access this resource');
            router.push('/login');
            useAuth().logout();
        }
        else if (error.response.status === 404) {
            toast.error('Resource not found');
            router.push('/not-found');
        }
        else if (error.response.status === 500) {
            toast.error('Internal server error');
            router.push('/server-error');
        }
        else if (error.response.status === 400) {
            toast.error('Bad request');
        }
        // Do something with response error
        else {
            toast.error(error.response.data.message)
            return Promise.reject(error);
        }
    }
);

export default httpClient;