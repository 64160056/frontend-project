import { ref, computed } from "vue";
import { defineStore } from "pinia";
import auth from "@/services/auth";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const authName = ref("");
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();

  const isAuth = computed(() => {
    // authName is not empty
    return authName.value !== "";
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    }
    return false;
  });

  //localStorage.setItem("token", userName);
  const login = async (username: string, password: string): Promise<void> => {
    loadingStore.isLoading = true;
    try {
      const res = await auth.login(username, password);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.access_token);
      router.push("/");
    } catch (e) {
      messageStore.showError("Username หรือ Password ไม่ถูกต้อง");
    }
    loadingStore.isLoading = false;
  };
  const logout = () => {
    //authName.value = "";
    //localStorage.removeItem("authName");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.replace("/login");
  };
  return { login, logout };
});
