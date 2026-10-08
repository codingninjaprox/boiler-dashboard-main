<template>
  <v-btn color="primary" :loading="loadingBtn" @click="onSubmit">
    Submit
  </v-btn>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: ["submitFunction"],
  setup(props) {
    const loadingBtn = ref(false);
    const onSubmit = async () => {
      loadingBtn.value = true;
      try {
        await props.submitFunction();
        loadingBtn.value = false;
      } catch (e) {
        console.error(e);
        loadingBtn.value = false;
      }
    };
    return {
      loadingBtn,
      onSubmit,
    };
  },
};
</script>
