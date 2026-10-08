<template>
  <section>
    <v-progress-circular
      v-if="loading === true"
      indeterminate
      color="grey"
      class="loading-bar"
    />
    <v-expansion-panels>
      <command-panel
        v-for="(storage, indx) in storages"
        :key="indx"
        :name="storage.name"
        :address="storage.address"
        :chainId="storage.chainId"
        :tvl="storage.tvl"
        :baseApy="storage.baseApy"
        :boostingApy="storage.boostingApy"
        :tokens="storage.tokens"
      />
    </v-expansion-panels>
  </section>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, onMounted } from "vue";
import CommandPanel from "@/components/CommandPanel.vue";
import { IResponse, IStorage } from "@/entities";

export default defineComponent({
  components: { CommandPanel },
  setup() {
    const storages = ref<IStorage[]>([]);
    const loading = ref(false);

    onMounted(async () => {
      try {
        loading.value = true;
        const response: IResponse = await axios.get(
          "https://bolide.fi/api/v1/vaults/list"
        );

        storages.value = response.data.vaults;

        // This is the test information
        storages.value.push({
          name: "Test Polygon Storage",
          address: "0xE3A580aeb89E49fB4D650F46223Df34e10fe419F",
          chainId: 137,
          tvl: 0,
          baseApy: 0,
          boostingApy: 0,
          tokens: [],
        });
        storages.value.push({
          name: "Test BSC Storage",
          address: "0x32233d2a4C48e5cfe527821501e948eF4A3FF1b1",
          chainId: 56,
          tvl: 0,
          baseApy: 0,
          boostingApy: 0,
          tokens: [],
        });
        storages.value.push({
          name: "Test Goerli Storage",
          address: "0xCC0BC94c74FA3fC35d2cA550dD6cAeCe32A01f99",
          chainId: 5,
          tvl: 0,
          baseApy: 0,
          boostingApy: 0,
          tokens: [],
        });
        // ******************* //

        loading.value = false;
      } catch (e) {
        if (e instanceof Error && e.toString() === "Error: Network Error") {
          alert("Please check your network status.");
        }
      }
    });

    return {
      storages,
      loading,
    };
  },
});
</script>

<style scoped>
section {
  height: calc(100vh - 32px - 85px - 32px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 10px;
  position: relative;
}

section::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

section::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

section::-webkit-scrollbar-thumb {
  background-color: #000000;
}

.loading-bar {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
