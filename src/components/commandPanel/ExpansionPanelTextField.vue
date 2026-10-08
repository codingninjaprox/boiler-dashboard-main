<template>
  <div class="command-wrap">
    <div class="flex-start">
      <v-col md="3">
        <p>_blidPerBlock (uint256)</p>
      </v-col>
      <v-col md="3">
        <p>
          Wei: <b>{{ blidPerBlock }}</b>
        </p></v-col
      >
      <v-col md="3">
        <p>
          Gwei: <b>{{ (blidPerBlock / 10 ** 9).toFixed(2) }}</b>
        </p>
      </v-col>
      <v-col md="3">
        <p>
          Ether: <b>{{ parseBlidPerBlock }}</b>
        </p>
      </v-col>
    </div>
    <v-text-field
      label=""
      placeholder="blidPerBlock (uint256)"
      variant="solo"
      density="compact"
      v-model="blidPerBlock"
    />
    <div class="flex-start">
      <v-col md="3">
        <p>_maxActiveBLID (uint256)</p>
      </v-col>
      <v-col md="3">
        <p>
          Wei: <b>{{ maxActiveBLID }}</b>
        </p></v-col
      >
      <v-col md="3">
        <p>
          Gwei: <b>{{ (maxActiveBLID / 10 ** 9).toFixed(0) }}</b>
        </p>
      </v-col>
      <v-col md="3">
        <p>
          Ether: <b>{{ parseMaxActiveBLID }}</b>
        </p>
      </v-col>
    </div>
    <v-text-field
      label=""
      placeholder="_maxActiveBLID (uint256)"
      variant="solo"
      density="compact"
      v-model="maxActiveBLID"
    />
    <div class="flex-start">
      <v-col md="3">
        <p>_maxBlidPerUSD (uint256)</p>
      </v-col>
      <v-col md="3">
        <p>
          Wei: <b>{{ maxBlidPerUSD }}</b>
        </p></v-col
      >
      <v-col md="3">
        <p>
          Gwei: <b>{{ (maxBlidPerUSD / 10 ** 9).toFixed(0) }}</b>
        </p>
      </v-col>
      <v-col md="3">
        <p>
          Ether: <b>{{ parseMaxBlidPerUSD }}</b>
        </p>
      </v-col>
    </div>
    <v-text-field
      label=""
      placeholder="_maxBlidPerUSD (uint256)"
      variant="solo"
      density="compact"
      v-model="maxBlidPerUSD"
    />
    <v-btn color="primary" :loading="loadingBtn1" @click="onSubmit1">
      Submit
    </v-btn>
  </div>
  <div class="command-wrap">
    <div class="flex-between">
      <p>_oracleDeviationLimit (uint256)</p>
      <p>
        <b>{{ parseOracleDeviationLimit }}</b> (% within 1 day)
      </p>
    </div>
    <v-text-field
      label=""
      placeholder="_oracleDeviationLimit (uint256)"
      variant="solo"
      density="compact"
      v-model="oracleDeviationLimit"
    />
    <v-btn color="primary" :loading="loadingBtn2" @click="onSubmit2">
      Submit
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from "vue";
import {
  getABI,
  formatEther,
  changeNetwork,
  getContract,
  runTransaction,
  getCurrentProvider,
} from "@/services/web3Services";
import { useAppStore } from "@/store/app";
import defaultAbi from "@/data/abi";

export default defineComponent({
  props: {
    mounted: {
      type: Boolean,
      required: true,
      default: false,
    },
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
    const loadingBtn1 = ref(false);
    const loadingBtn2 = ref(false);
    const oracleDeviationLimit = ref(0);
    const maxBlidPerUSD = ref(0);
    const maxActiveBLID = ref(0);
    const blidPerBlock = ref(0);
    const parseOracleDeviationLimit = ref("0");
    const parseMaxBlidPerUSD = ref("0");
    const parseMaxActiveBLID = ref("0");
    const parseBlidPerBlock = ref("0");
    const abiArr = ref<[]>([]);

    const appStore = useAppStore();

    watchEffect(() => {
      if (props.mounted == true) {
        getRefresh();
      }
    });

    watchEffect(() => {
      parseOracleDeviationLimit.value = (
        parseFloat(formatEther(oracleDeviationLimit.value) as string) *
        86400 *
        100
      ).toFixed(3);
    });

    watchEffect(() => {
      parseMaxBlidPerUSD.value = formatEther(maxBlidPerUSD.value);
    });

    watchEffect(() => {
      parseMaxActiveBLID.value = formatEther(maxActiveBLID.value);
    });

    watchEffect(() => {
      parseBlidPerBlock.value = formatEther(blidPerBlock.value);
    });

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

    const runAlert = (
      type: "error" | "success" | "warning" | "info" | undefined,
      title: string,
      content: string
    ) => {
      const appStore = useAppStore();
      appStore.runAlert(title, content, type);
    };

    const getRefresh = async () => {
      loadingBtn1.value = true;
      loadingBtn2.value = true;

      let abi = defaultAbi;
      if (props.chainId !== 5) {
        // The network is not Goerli network.
        abi = await getABI(props.chainId, props.address);
      }

      abiArr.value = abi;

      const contract = await getContract(props.chainId, props.address, abi);

      const oracleDeviationLimitValue = await contract.oracleDeviationLimit();
      oracleDeviationLimit.value = oracleDeviationLimitValue.toString();

      const blidPerBlockValue = await contract.blidPerBlock();
      blidPerBlock.value = blidPerBlockValue.toString();

      const maxBlidPerUSDValue = await contract.maxBlidPerUSD();
      maxBlidPerUSD.value = maxBlidPerUSDValue.toString();

      const maxActiveBLIDValue = await contract.maxActiveBLID();
      maxActiveBLID.value = maxActiveBLIDValue.toString();

      loadingBtn1.value = false;
      loadingBtn2.value = false;
    };

    const onSubmit1 = async () => {
      try {
        loadingBtn1.value = true;
        loadingBtn2.value = true;
        const appStore = useAppStore();
        //Switch network
        await changeNetwork(props.chainId);

        const provider = await getCurrentProvider();

        const { chainId } = await provider.getNetwork();
        if (props.chainId == chainId) {
          await runTransaction(
            props.address,
            "setBoostingInfo",
            [
              maxBlidPerUSD.value.toString(),
              blidPerBlock.value.toString(),
              maxActiveBLID.value.toString(),
            ],
            provider.getSigner(),
            props.chainId,
            abiArr.value
          );
        }
        runAlert(
          "success",
          "Success!",
          "The request for updating this parameter has been submitted successfully."
        );
        loadingBtn1.value = false;
        loadingBtn2.value = false;
      } catch (e) {
        loadingBtn1.value = false;
        loadingBtn2.value = false;
        runAlert(
          "error",
          "Error!",
          "The request for updating this parameter has been failed unfortunetely."
        );
      }
    };

    const onSubmit2 = async () => {
      try {
        loadingBtn2.value = true;
        // Switch network
        await changeNetwork(props.chainId);

        const provider = await getCurrentProvider();

        const { chainId } = await provider.getNetwork();

        if (props.chainId == chainId) {
          await runTransaction(
            props.address,
            "setOracleDeviationLimit",
            [oracleDeviationLimit.value.toString()],
            provider.getSigner(),
            props.chainId,
            abiArr.value
          );
        }
        runAlert(
          "success",
          "Success!",
          "The request for updating this parameter has been submitted successfully."
        );
        loadingBtn2.value = false;
      } catch (e) {
        console.log("e", e);
        loadingBtn2.value = false;
        runAlert(
          "error",
          "Error!",
          "The request for updating this parameter has been failed unfortunetely."
        );
      }
    };

    return {
      loadingBtn1,
      loadingBtn2,
      oracleDeviationLimit,
      maxBlidPerUSD,
      maxActiveBLID,
      blidPerBlock,
      parseOracleDeviationLimit,
      parseMaxBlidPerUSD,
      parseMaxActiveBLID,
      parseBlidPerBlock,
      getNetworkLogoLink,
      changeNetwork,
      onSubmit1,
      runAlert,
      onSubmit2,
      runTransaction,
      getRefresh,
      appStore,
      abiArr,
    };
  },
});
</script>

<style scoped>
p {
  font-size: 14px;
}

.command-wrap {
  padding: 1rem;
  border: 1px solid #727477;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.command-wrap p {
  text-align: left;
  margin: 8px 0;
}

.command-wrap button {
  display: flex;
}

.flex-start {
  display: flex;
  justify-content: start;
  align-items: center;
}

.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}

.v-field__input {
  min-height: 0px !important;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
