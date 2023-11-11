import axios from 'axios';

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
        return Promise.reject(error);
    }
);

// Create a response interceptor
const responseInterceptor = httpClient.interceptors.response.use(
    response => {
        console.log('Inside response interceptor');
        return response;
    },
    error => {
        // Do something with response error
        return Promise.reject(error);
    }
);

// Add request and response interceptors

httpClient.interceptors.request.eject(requestInterceptor);
httpClient.interceptors.response.eject(responseInterceptor);

export default httpClient;