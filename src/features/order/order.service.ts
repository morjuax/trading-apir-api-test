import { Injectable } from '@nestjs/common';
import { MethodHttp } from '../../enums/config.enums';
import { ConfigUrlService, ConfigUrlServiceAuth } from '../../interfaces/config.interface';
import { CurrencyPair } from '../../enums/currency-pair.enum';
// import { HttpBaseService } from '../../services/http-base/http-base.service';
import { HttpBaseAuthService } from '../../services/http-base-auth/http-base-auth.service';

@Injectable()
export class OrderService {
  constructor(private httpBase: HttpBaseAuthService) {
  }

  // async getOrders(pair: CurrencyPair): Promise<any> {
  //   const url = `https://api-pub.bitfinex.com/v2/book/${pair}/P0?len=100`;
  //
  //   const uri: ConfigUrlService = {
  //     url,
  //     method: MethodHttp.GET,
  //   };
  //   return await this.httpBase.createRequest<any>(uri, {});
  // }

  async getOrdersAuth(pair: CurrencyPair): Promise<any> {
    const host = `https://api-pub.bitfinex.com`;
    const endpoint = `v2/auth/r/orders/${pair}/hist`;

    const uri: ConfigUrlServiceAuth = {
      host,
      endpoint,
      method: MethodHttp.POST,
    };
    const bodyRequest = { type: 'MARKET', all: 1 };
    return await this.httpBase.createRequest<any>(uri, bodyRequest);
  }
}
