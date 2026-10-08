<template>
  <v-container>
    <div class="box">
      <app-header />
      <v-row class="wrap">
        <v-col md="2" class="border-right"> <left-panel /></v-col>
        <v-col md="10"><right-panel /></v-col>
      </v-row>
    </div>
    <v-alert
      v-model="appStore.alertShow"
      :type="appStore.alertType as 'error' | 'success' | 'warning' | 'info' | undefined"
      :title="appStore.alertTitle"
      :text="appStore.alertContent"
      closable
    ></v-alert>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppHeader from "@/components/AppHeader.vue";
import LeftPanel from "@/components/LeftPanel.vue";
import RightPanel from "@/components/RightPanel.vue";

import { useAppStore } from "@/store/app";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    LeftPanel,
    RightPanel,
  },
  setup() {
    const appStore = useAppStore();
    return { appStore };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.box {
  border: 1px solid #727477;
}

.wrap {
  margin: 0px;
  height: calc(100vh - 32px - 85px);
}

.border-right {
  border-right: 1px solid #727477;
}

.v-alert {
  position: absolute !important;
  top: 30px;
  right: 30px;
  width: 500px;
  z-index: 99;
}
.v-alert__content {
  text-align: left;
}
</style>
