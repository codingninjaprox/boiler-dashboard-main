import EthersAdapter from "@safe-global/safe-ethers-lib";
import Safe from "@safe-global/protocol-kit";
import SafeServiceClient from "@safe-global/api-kit";
import { ethers, providers } from "ethers";
import { Signer } from "@ethersproject/abstract-signer";
import axios from "axios";
import NETWORK from "../data/network";
import { IResponse } from "@/entities";

declare var window: any;

export const formatEther = (value: number) => {
  return parseFloat(ethers.utils.formatEther(value)).toFixed(11);
};

export const changeNetwork = async (chainId: number) => {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [NETWORK[chainId] as string],
  });
};

export const getRpcUrl = (chainId: number) => {
  switch (chainId) {
    case 137:
      return "https://polygon.blockpi.network/v1/rpc/public";
    case 56:
      return "https://bsc-dataseed2.binance.org";
    case 5:
      return "https://goerli.blockpi.network/v1/rpc/public";
    case 1:
      return "https://ethereum.publicnode.com";
    default:
      return "";
  }
};

export const getGnosisUrl = (chainId: number) => {
  if (chainId == 137) {
    return "https://safe-transaction-polygon.safe.global";
  } else if (chainId == 56) {
    return "https://safe-transaction-bsc.safe.global";
  } else if (chainId == 5) {
    return "https://safe-transaction-goerli.safe.global";
  } else if (chainId == 1) {
    return "https://safe-transaction-mainnet.safe.global";
  } else {
    return "";
  }
};

export const getContract = async (
  chainId: number,
  address: string,
  abi: []
) => {
  const provider = new ethers.providers.JsonRpcProvider(getRpcUrl(chainId));

  return new ethers.Contract(address, abi, provider);
};

export const runTransaction = async (
  contractAddr: string,
  methodName: string,
  param: readonly string[],
  signer: Signer,
  chainId: number,
  abi: []
) => {
  const gnosisRpcUrl = getGnosisUrl(chainId);

  const safeAddress = import.meta.env.VITE_SAFE_ADDRESS!;
  const ethAdapter: any = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safe = await Safe.create({ ethAdapter, safeAddress });
  const safeServiceClient = new SafeServiceClient({
    txServiceUrl: gnosisRpcUrl,
    ethAdapter,
  });

  const moduleInterface = new ethers.utils.Interface(JSON.stringify(abi));
  const data = moduleInterface.encodeFunctionData(methodName, param);
  const allTransactions = await safeServiceClient.getMultisigTransactions(
    safe.getAddress()
  );

  const num =
    allTransactions.count === 0 ? 1 : allTransactions.results[0].nonce + 1;
  const transaction = {
    to: contractAddr,
    data: data,
    value: "0",
    operation: 0,
    safeTxGas: 0,
    baseGas: 0,
    gasPrice: 0,
    gasToken: "0x0000000000000000000000000000000000000000",
    refundReceiver: "0x0000000000000000000000000000000000000000",
    nonce: num,
  };

  const safeTransaction = await safe.createTransaction({
    safeTransactionData: transaction,
  });

  const safeTransactionHash = await safe.getTransactionHash(safeTransaction);

  const safeTxHash = await safe.signTransactionHash(safeTransactionHash);

  const address = await signer.getAddress();
  const result = await safeServiceClient.proposeTransaction({
    safeAddress: safe.getAddress(),
    safeTransactionData: safeTransaction.data as any,
    safeTxHash: safeTransactionHash,
    senderAddress: address,
    senderSignature: safeTxHash.data,
  });

  return result;
};

export const getCurrentProvider = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  return provider;
};

export const getNetworkScanLink = (chainId: number) => {
  switch (chainId) {
    case 137:
      return "https://api.polygonscan.com";
    case 56:
      return "https://api.bscscan.com";
    case 5:
      return "https://api.goerli.etherscan.io";
    case 1:
      return "https://api.etherscan.io";
    default:
      return "";
  }
};

export const getNetworkApiKey = (chainId: number) => {
  switch (chainId) {
    case 137:
      return import.meta.env.VITE_POL_API as string;
    case 56:
      return import.meta.env.VITE_BSC_API as string;
    case 1:
      return import.meta.env.VITE_ETH_API as string;
    default:
      return "";
  }
};

const getJsonRpcProvider = (chainId: number) => {
  switch (chainId) {
    case 137:
      return "https://polygon.blockpi.network/v1/rpc/public";
    case 56:
      return "https://bsc-dataseed2.binance.org";
    case 5:
      return "https://goerli.blockpi.network/v1/rpc/public";
    case 1:
      return "https://ethereum.publicnode.com";
    default:
      return "";
  }
};

const getImplementationAddress = async (
  provider: providers.Provider,
  proxyAddress: string
) => {
  // EIP-1967 storage slot
  const IMPLEMENTATION_SLOT =
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

  const slotData = await provider.getStorageAt(
    proxyAddress,
    IMPLEMENTATION_SLOT
  );

  // Parse the result and return the implementation address
  const implementationAddress = ethers.utils.getAddress(
    "0x" + slotData.slice(-40)
  );

  return implementationAddress;
};

export const getABI = async (chainId: number, address: string) => {
  const chainLink: string = getNetworkScanLink(chainId);
  const apikey: string = getNetworkApiKey(chainId);
  const jsonRpcProvider: string = getJsonRpcProvider(chainId);

  // Replace these with your provider, and the address of the proxy contract
  const provider = new ethers.providers.JsonRpcProvider(jsonRpcProvider);

  const implementationAddress = await getImplementationAddress(
    provider,
    address
  );

  if (apikey != "") {
    const response: IResponse = await axios.get(
      `${chainLink}/api?module=contract&action=getabi&address=${implementationAddress}&apikey=${apikey}`
    );

    if (response?.data?.status == "1") {
      return JSON.parse(response?.data?.result);
    } else {
      return [];
    }
  } else {
    return [];
  }
};
