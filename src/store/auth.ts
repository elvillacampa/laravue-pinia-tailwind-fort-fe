import type { User } from "@/types";
import { defineStore } from "pinia";
import axiosInstance from "@/lib/axios";
import router from "@/router";
import type { RegisterForm, LoginForm } from "@/types";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios"; 

export const AuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as null | string,
    loading: false,
    error: null as null | string,
    isloggedIn: false,
  }),
  persist: {
    storage:sessionStorage,
    pick:["user","token","isloggedIn"],
  },
  actions: {
    async register(payload:RegisterForm, node?: FormKitNode) {
        await axiosInstance.get('/sanctum/csrf-cookie',{
            baseURL: "http://localhost:8000"
        });
        try {
            payload.name = payload.firstname + " " + payload.lastname
            await axiosInstance.post('/register', payload);
            await this.getLoggedUser();
            router.push('/dashboard');
        } catch (e) { 
            if(e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors(e.response.data.errors);
            }    
        }
    },
    async login (payload:LoginForm, node?: FormKitNode ) {
        await axiosInstance.get('/sanctum/csrf-cookie',{
            baseURL: "http://localhost:8000"
        });

        try {
            await axiosInstance.post('/login', payload);
            await this.getLoggedUser();
            router.push('/dashboard');
        } catch (e) { 
            if(e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors(e.response.data.errors);
            }
            this.resetUserState();
        }
    },
    async logout(){
        try {
            await axiosInstance.post('/logout');
            this.resetUserState();
            router.push('/login');
        } catch (error) {
        }
    },
    async getLoggedUser(){
        try {
            const response = axiosInstance.get('/user');
            this.user = (await response).data
            this.isloggedIn = true;
        } catch (e) { 
            if(e instanceof AxiosError && e.response?.status === 401) {
                this.resetUserState();
            }
        }
    },
    resetUserState() {
        this.user = null;
        this.token = null;
        this.isloggedIn = false;
        this.loading = false;
        this.error = null;
    },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
});