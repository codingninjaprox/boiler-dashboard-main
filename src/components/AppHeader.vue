<template>
  <div class="AppHeader">
    <v-btn
      v-if="walletAddress !== ''"
      variant="outlined"
      class="connect-btn text-none"
    >
      {{ getConnectWallet() }}
    </v-btn>
    <v-btn
      v-if="walletAddress === ''"
      variant="outlined"
      class="connect-btn text-none"
      @click="funcLoadWallet"
    >
      Connect Wallet
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

declare var window: any;

export default defineComponent({
  components: {},
  data() {
    return { loading: false, walletAddress: "" };
  },
  async mounted() {
    try {
      this.funcLoadWallet();
    } catch (e) {
      if (e instanceof Error && e.toString() === "Error: Network Error") {
        alert("Please check your network status.");
      }
    }
  },
  methods: {
    async funcLoadWallet() {
      this.loading = true;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      this.walletAddress = accounts[0];

      this.loading = false;
    },
    getConnectWallet() {
      return (
        this.walletAddress.substr(0, 5) +
        "..." +
        this.walletAddress.substr(this.walletAddress.length - 3)
      );
    },
  },
});
</script>

<style scoped>
.AppHeader {
  padding: 24px 0;
  text-align: right;
  border-bottom: 1px solid #727477;
}

.connect-btn {
  margin-right: 20px;
}
</style>
