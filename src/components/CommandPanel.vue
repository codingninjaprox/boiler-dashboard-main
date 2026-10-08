<template>
  <v-expansion-panel @click="onExpansionPanelClick" elevation="0">
    <ExpansionPanelTitle
      :name="name"
      :address="address"
      :chainId="chainId"
      :class="{ 'active-bg': mounted }"
    />
    <v-expansion-panel-text>
      <ExpansionPanelTextField
        :mounted="mounted"
        :name="name"
        :address="address"
        :chainId="chainId"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import ExpansionPanelTitle from "./commandPanel/ExpansionPanelTitle.vue";
import ExpansionPanelTextField from "./commandPanel/ExpansionPanelTextField.vue";

export default defineComponent({
  components: {
    ExpansionPanelTitle,
    ExpansionPanelTextField,
  },
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
    address: {
      type: String,
      required: true,
      default: "",
    },
    chainId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup() {
    const mounted = ref(false);

    const onExpansionPanelClick = (event: Event) => {
      const currentTarget = event.currentTarget as HTMLElement;
      if (currentTarget.classList.contains("v-expansion-panel--active")) {
        if (mounted.value == false) {
          // Open the expand panel
          mounted.value = true;
        }
      } else {
        mounted.value = false;
      }
    };

    return {
      mounted,
      onExpansionPanelClick,
    };
  },
});
</script>

<style scoped>
p {
  font-size: 14px;
}
.v-expansion-panel-title {
  padding: 0px !important;
  border-radius: 5px;
  border: 1px solid #cfd0d3;
}

.v-expansion-panel {
  margin-bottom: 0.5rem;
}

::after,
::before {
  display: none !important;
}

.v-expansion-panel::before {
  box-shadow: none !important;
}

.v-expansion-panel--active > .v-expansion-panel-title {
  min-height: 48px !important;
}

.active-bg {
  background: #eaeaea;
}
</style>
