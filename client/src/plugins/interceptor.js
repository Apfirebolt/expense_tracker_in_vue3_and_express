import axios from 'axios';
import router from '../routes/index';
import { useAuth } from '../store/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();
let baseURL = '/api/';

const httpClient = axios.create({ baseURL, withCredentials: true }); // Crucial: allows sending cookies

// Request interceptor to attach the current access token
httpClient.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refreshing and errors
httpClient.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        // Prevent infinite loops if the refresh endpoint itself returns 401/403
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('auth/refresh')) {
            originalRequest._retry = true;

            try {
                // Call your backend refresh token endpoint (sends httpOnly cookie automatically)
                const response = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
                const newAccessToken = response.data.token;

                // Update local storage / user store with the new access token
                const user = JSON.parse(localStorage.getItem('user')) || {};
                user.token = newAccessToken;
                localStorage.setItem('user', JSON.stringify(user));

                // Update authorization header for the original request and retry it
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return httpClient(originalRequest);

            } catch (refreshError) {
                // If refresh token is also expired or invalid, force logout
                localStorage.removeItem("user");
                router.push("/login");
                toast.error("Session expired. Please log in again.");
                return Promise.reject(refreshError);
            }
        }

        // Handle other standard HTTP errors
        if (error.response?.status === 403) {
            let message = error.response.data?.message || 'You are not authorized to access this resource';
            toast.error(message);
        }
        else if (error.response?.status === 404) {
            toast.error('Resource not found');
            router.push('/not-found');
        }
        else if (error.response?.status === 500) {
            toast.error('Internal server error');
            router.push('/server-error');
        }
        else if (error.response?.status === 400) {
            let message = error.response.data?.message || 'Bad request';
            toast.error(message);
        }
        else if (error.response?.status !== 401) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }

        return Promise.reject(error);
    }
);

export default httpClient;