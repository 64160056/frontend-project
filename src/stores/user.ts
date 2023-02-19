import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type User from "@/types/User";
import userService from "@/services/user";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useUserStore = defineStore("User", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const users = ref<User[]>([]);
  const editedUser = ref<User>({ name: "", email: "", password: "" });

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      editedUser.value = { name: "", email: "", password: "" };
    }
  });
  async function getUsers() {
    loadingStore.isLoading = true;
    try {
      const res = await userService.getUsers();
      users.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล User ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveUser() {
    loadingStore.isLoading = true;
    try {
      if (editedUser.value.id) {
        const res = await userService.updateUser(
          editedUser.value.id,
          editedUser.value
        );
      } else {
        const res = await userService.saveUser(editedUser.value);
      }

      dialog.value = false;
      await getUsers();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก User ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function deleteUser(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await userService.deleteUser(id);
      await getUsers();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ User ได้");
    }
    loadingStore.isLoading = false;
  }
  function editUser(user: User) {
    editedUser.value = JSON.parse(JSON.stringify(user));
    dialog.value = true;
  }
  return {
    users,
    getUsers,
    dialog,
    editedUser,
    saveUser,
    editUser,
    deleteUser,
  };
});
