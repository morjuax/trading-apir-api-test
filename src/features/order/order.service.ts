import { Injectable } from '@nestjs/common';
import { HttpBaseService } from '../../services/http-base-authenticated/http-base.service';
import { MethodHttp } from '../../enums/config.enums';
import { ConfigUrlService } from '../../interfaces/config.interface';
import { CurrencyPair } from '../../enums/currency-pair.enum';

@Injectable()
export class OrderService {
  constructor(private httpBase: HttpBaseService) {
  }

  async getOrders(): Promise<any> {
    const host = 'https://api.bitfinex.com';
    const endpoint = `v2/auth/r/orders/t${CurrencyPair.BTCUSD}/hist`;

    const uri: ConfigUrlService = {
      host,
      endpoint,
      method: MethodHttp.POST,
    };
    const bodyRequest = {
      start: 1554002000000,
      end: 1554002216000,
      limit: 100,
    };
    const resp = await this.httpBase.createRequest<any>(uri, bodyRequest);
    return resp;
  }
}
