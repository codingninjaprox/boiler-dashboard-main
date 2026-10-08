// Utilities
import { defineStore } from "pinia";
import { getABI } from "@/services/web3Services";

export const useAppStore = defineStore("app", {
  state: () => ({
    alertShow: false,
    alertTitle: "",
    alertContent: "",
    alertType: undefined as
      | "error"
      | "success"
      | "warning"
      | "info"
      | undefined,
  }),
  actions: {
    runAlert(
      title: string,
      content: string,
      type: "error" | "success" | "warning" | "info" | undefined
    ) {
      this.alertShow = true;
      this.alertTitle = title;
      this.alertContent = content;
      this.alertType = type;
    },
    offAlert() {
      this.alertShow = false;
    },
  },
});
