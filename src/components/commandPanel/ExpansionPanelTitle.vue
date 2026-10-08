<template>
  <v-expansion-panel-title>
    <template #default="{}">
      <div class="line_item">
        <div class="network-logo">
          <img :src="getNetworkLogoLink(chainId)" />
          <p class="storage-name">{{ name }}</p>
        </div>
        <div class="strorage-address" @click="copyAddress">
          <p>{{ address }}</p>
        </div>
      </div>
    </template>
  </v-expansion-panel-title>
</template>

<script lang="ts">
import { toast } from "vue3-toastify";
export default {
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
  setup(props) {
    const getNetworkLogoLink = (chainId: number) => {
      switch (chainId) {
        case 137:
          return "/assets/matic-logo.png";
        case 56:
          return "/assets/bnb-logo.png";
        case 5:
          return "/assets/eth-logo.png";
        case 1:
          return "/assets/eth-logo.png";
        default:
          return "";
      }
    };

    const copyAddress = async (e: Event) => {
      e.stopPropagation();
      await navigator.clipboard.writeText(props.address);
      toast.success("Address copied to clipboard");
    };

    return {
      getNetworkLogoLink,
      copyAddress,
    };
  },
};
</script>
<style scoped>
.line_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin: 0;
  padding: 8px;
  width: 100%;
}

.storage-name {
  margin-left: 1rem;
}

.storage-tv1 {
  margin-left: 1rem;
}

.strorage-address {
  width: 350px;
}

p {
  font-size: 14px;
}

.network-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.network-logo img {
  width: 32px;
  height: 32px;
}

::v-deep .v-expansion-panel-title__overlay {
  display: none !important;
}
</style>
