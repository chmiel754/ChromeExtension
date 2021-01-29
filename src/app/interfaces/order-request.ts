export interface OrderRequest {
  quantity: number;
  campaignIdentifier: string;
  configSku: string;
  simpleSku: string;
  additional: {
    reco: number
  };
  ignoreExceptionCodes: number[];
}
