import { Injectable } from '@nestjs/common';
import { MethodHttp } from '../../enums/config.enums';
import { ConfigUrlService } from '../../interfaces/config.interface';
import { CurrencyPair, Precision } from '../../enums/currency-pair.enum';
import { HttpBaseService } from '../../services/http-base/http-base.service';

@Injectable()
export class OrderService {
  constructor(private httpBase: HttpBaseService) {
  }

  async getOrdersRaw(
    pair: CurrencyPair,
    precision: Precision = Precision.P0,
  ): Promise<any> {
    const url = `https://api-pub.bitfinex.com/v2/book/${pair}/${precision}?len=25`;

    const uri: ConfigUrlService = {
      url,
      method: MethodHttp.GET,
    };
    const resp = await this.httpBase.createRequest<any>(uri, {});
    return this.mapOrders(resp);
  }

  mapOrders(data) {
    return this.filterData(data);
  }

  filterData(dataParsed) {
    return dataParsed.map((item) => {
      const type = item[2] > 0 ? 'bid' : 'ask';
      return { id: item[0], price: item[1], [type]: item[2] };
    });
  }
}
