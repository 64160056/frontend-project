import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const authName = ref("");
  const isAuth = computed(() => {
    // authName is not empty
    return authName.value !== "";
  });
  const login = (username: string, password: string): void => {
    //localStorage.setItem("token", userName);
  };
  const logout = () => {
    //authName.value = "";
    //localStorage.removeItem("authName");
  };

  return { login, logout };
});
