import { ref, computed } from "vue";
import { defineStore } from "pinia";
export enum DialogType {
  info,
  error,
  confirm,
}
export const useMessageStore = defineStore("message", () => {
  const isShow = ref(false);
  const message = ref("");
  const type = ref<DialogType>(DialogType.info);

  function showError(text: string) {
    type.value = DialogType.error;
    message.value = text;
    isShow.value = true;
  }

  function showInfo(text: string) {
    type.value = DialogType.info;
    message.value = text;
    isShow.value = true;
  }
  function showConfirm(text: string) {
    type.value = DialogType.confirm;
    message.value = text;
    isShow.value = true;
  }
  return { isShow, message, showError, showInfo };
});
