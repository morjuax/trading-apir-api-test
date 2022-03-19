import { Injectable } from '@nestjs/common';
import { HttpBaseService } from '../../services/http-base/http-base.service';
import { CurrencyPair, Precision } from '../../enums/currency-pair.enum';
import { ConfigUrlService } from '../../interfaces/config.interface';
import { MethodHttp } from '../../enums/config.enums';

@Injectable()
export class MarketService {
  constructor(private httpBase: HttpBaseService) {
  }

  async getPrice(pair: CurrencyPair): Promise<any> {
    const precision = Precision.R0;
    const url = `https://api-pub.bitfinex.com/v2/book/${pair}/${precision}?len=25`;

    const uri: ConfigUrlService = {
      url,
      method: MethodHttp.GET,
    };
    const resp = await this.httpBase.createRequest<any>(uri, {});
    return this.mapData(resp);
  }

  mapData(data) {
    return data;
  }
}
