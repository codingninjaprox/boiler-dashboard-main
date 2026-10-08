# essentials

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Environment

Node v16.16.0

### Project details

# Admin Dashboard. Init.

The development of a web admin panel for smart contract management. Building a user interface to interact with and manage deployed smart contracts on a given blockchain.

Connect wallet

- via Metamask

List of Storages

- get vaults addresses from https://bolide.fi/api/v1/vaults/list (except `USDT-BLID Farming` and `BLID Staking`)
- all storages are proxy (Transparent and UUPS), so get ABI for interaction from proxy implementation

Show Boosting params from the each Storage contract. Convert it from wei to human-readable format:

- blidPerBlock
- maxActiveBLID
- maxBlidPerUSD

Show oracle deviation limit. Convert it to percentages.

- get `oracleDeviationLimit` from the contract
- convert it to percentages = `oracleDeviationLimit` _ seconds per day (86400) _ 1 ether (10\*_18) _ 100

Modify Boosting params:

- enter the value and get the owner of contract
- switch the network, if need it
- use that params to send **multisig** Safe transaction (because owner of the contract is a Safe multisig wallet). After that other owners can sign that tx in the Safe wallet

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9c47e12d-c5b4-419c-bd4c-068b438fddff/Untitled.png)

Recommended Technical Requirements:

- Typescript
- Vue.js, vue cli
- Vuetify lib for admin panel
- Pinia state
- Ethers.js v6

Testing

Please add test vaults in get vaults response:

```json
"vaults":[
...
    {
        "name": "Test Polygon Storage",
        "address": "0xE3A580aeb89E49fB4D650F46223Df34e10fe419F",
        "chainId": 137
    },
    {
        "name": "Test BSC Storage",
        "address": "0x32233d2a4C48e5cfe527821501e948eF4A3FF1b1",
        "chainId": 56
    },
		{
        "name": "Test Goerli Storage",
        "address": "0xCC0BC94c74FA3fC35d2cA550dD6cAeCe32A01f99",
        "chainId": 5
    }
]
```

There are two test vaults on Polygon and BSC mainnets and one test vault on Goerli testnet. Owner is multisig:

- on Polygon - https://app.safe.global/home?safe=matic:0xC561E6D59343df154CAB692b1631047fD471B187
- on BSC - https://app.safe.global/home?safe=bnb:0xC561E6D59343df154CAB692b1631047fD471B187
- on Goerli - https://app.safe.global/home?safe=gor:0xC561E6D59343df154CAB692b1631047fD471B187
