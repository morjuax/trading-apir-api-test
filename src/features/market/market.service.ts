import { Injectable } from '@nestjs/common';
import { HttpBaseService } from '../../services/http-base/http-base.service';
import { CurrencyPair, Precision } from '../../enums/currency-pair.enum';
import { ConfigUrlService } from '../../interfaces/config.interface';
import { MethodHttp } from '../../enums/config.enums';
import { GetPriceDepth } from '../../dto/market.dto';

@Injectable()
export class MarketService {
  constructor(private httpBase: HttpBaseService) {
  }

  async getPriceDepht(req: GetPriceDepth): Promise<any> {
    const precision = Precision.R0;
    const url = `https://api-pub.bitfinex.com/v2/book/${req.pair}/${precision}?len=25`;

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
