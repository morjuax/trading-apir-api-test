import { MethodHttp } from '../enums/config.enums';

export interface ConfigUrlService {
  host: string;
  endpoint: string;
  method: MethodHttp;
  headerToken?: string;
  hash?: boolean;
}

export interface ConfigEnv {
  env: string;
  requireEncrypted: boolean;
  publicKey: string;
  privateKey: string;
  secretKey: string;
  hostBlockchain: string;
  tokens: {
    pht: string;
  };
  whitelistOrigin: string[];
  walletDevs?: string[];
}
