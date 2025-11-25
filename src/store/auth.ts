import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axiosInstance from "@/lib/axios";
import router from "@/router";
import type { User, RegisterForm, LoginForm } from "@/types";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

export const AuthStore = defineStore("auth", () => {
  // 🧠 State (all as refs)
  const user = ref<User | null>(null);
  const isLoggedIn = ref<boolean>(false);
  const error = ref<string | null>(null);
  const token = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const accessPermissions = ref<string[]>([]);  

  // 🛠 Actions
  const register = async (payload: RegisterForm, node?: FormKitNode) => {
    await axiosInstance.get('/sanctum/csrf-cookie', {
      // CSRF cookie endpoint lives at the app root, not under /api
      baseURL: import.meta.env.VITE_APP_URL ?? '',
      withCredentials: true,
    })

    try {
      payload.name = `${payload.firstname} ${payload.lastname}`
      await axiosInstance.post('/register', payload, {
        withCredentials: true,
      })
      await getLoggedUser()
      router.push('/dashboard')
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 422 && node) {
          node.setErrors([], e.response.data.errors)
        } else {
          console.error('Registration failed:', e.response?.data || e.message)
        }
      } else {
        console.error('Unexpected error:', e)
      }
    }
  }
  const login = async (payload: LoginForm, node?: FormKitNode) => {
    await axiosInstance.get("/sanctum/csrf-cookie", {
      // CSRF cookie endpoint lives at the app root, not under /api
      baseURL: import.meta.env.VITE_APP_URL ?? '',
      withCredentials: true,
    });

    try {
      await axiosInstance.post("/login", payload);
      await getLoggedUser();
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        node?.setErrors(e.response.data.errors);
      }
      resetUserState();
    }
  }
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } finally {
      resetUserState();
      router.push("/login");
    }
  }

  const getLoggedUser = async (reset:boolean = false) => {
    if (isLoggedIn.value && !reset) return;
    console.log("Fetching logged user...");
    try {
      const { data } = await axiosInstance.get("/user");
      user.value = data.data;
      isLoggedIn.value = true;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        resetUserState();
      }
    }
  }

  const getLoggedUserPermissions = async () => {
    const { data } = await axiosInstance.get("/user/permissions");
    accessPermissions.value = data.permissions;
  }

  function resetUserState() {
    user.value = null;
    token.value = null;
    isLoggedIn.value = false;
    loading.value = false;
    error.value = null;
    accessPermissions.value = [];
  }

    // 🪄 Getters as computed properties
    const getUser = computed(() => user.value);
    const getToken = computed(() => token.value);
    const getError = computed(() => error.value);
    const isLoading = computed(() => loading.value);
    const isAuthenticated = computed(() => !!token.value);
    const menuAccess = computed(() => accessPermissions.value);

  // Return everything
  return {
    user,
    token,
    error,
    isLoggedIn,
    loading,
    register,
    login,
    logout,
    getLoggedUser,
    resetUserState,
    getLoggedUserPermissions,
    isAuthenticated,
    getUser,
    getToken,
    isLoading,
    getError,
    menuAccess,
  };
},
{
  persist: {
    storage: sessionStorage,
    pick: ["user", "token", "isLoggedIn"],
  },
});
