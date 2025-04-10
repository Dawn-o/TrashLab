import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://trashlab.rushel.my.id/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        console.log("Bearer Token diinterceptor:", token); // DEBUG DI SINI 👀
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;