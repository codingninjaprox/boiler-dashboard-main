export interface IToken {
  address: string;
  name: string;
  tvl: number;
}

export interface IStorage {
  name: string;
  address: string;
  chainId: number;
  tvl: number;
  baseApy: number;
  boostingApy: number;
  tokens: IToken[];
}

export interface IResponse {
  data: {
    vaults: IStorage[];
    result: string;
    status: string;
  };
}
