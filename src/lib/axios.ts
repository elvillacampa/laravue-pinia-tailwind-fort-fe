import router from '@/router';
import axsios from 'axios';
import { AuthStore } from '@/store/auth';

const axiosInstance = axsios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    withXSRFToken: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { resetUserState } = AuthStore();
        switch (error.response?.status) {
            case 401:
                resetUserState();
                router.push('/login');
                break;
            case 404:
                router.push('/not-found');
                break;
            case 419:
                resetUserState();
                router.push('/login');
                break;
            case 500:
                router.push('/server-error');
                break;
        }
        return Promise.reject(error);
    }   
);

export default axiosInstance;   