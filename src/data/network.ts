const NETWORK: any = {
  137: {
    chainId: "0x89",
    rpcUrls: ["https://polygon-rpc.com/"],
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  80001: {
    chainId: "0x13881",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  43113: {
    chainId: "0xa869",
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    chainName: "Avalanche Fuji Testnet",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.snowtrace.io/"],
  },
  5: {
    chainId: "0x5",
    rpcUrls: ["https://goerli.blockpi.network/v1/rpc/public"],
    chainName: "Goerli testnet",
    nativeCurrency: {
      name: "GoerliETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  1: {
    chainId: "0x1",
    rpcUrls: [`https://mainnet.infura.io/v3/${import.meta.env.VITE_ETH_API}`],
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://etherscan.io"],
  },
  56: {
    chainId: "0x38",
    rpcUrls: ["https://bsc-dataseed2.binance.org"],
    chainName: "BSC Mainnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

export default NETWORK;
