import { Injectable } from '@nestjs/common';
import { HttpBaseService } from '../../services/http-base/http-base.service';
import { GetPriceDepth } from '../../dto/market.dto';
import { OrderService } from '../order/order.service';
import { OrderBookResponse } from '../../interfaces/book.interface';
import { TypeOperation, TypePrice } from '../../enums/market.enum';

@Injectable()
export class MarketService {
  constructor(
    private httpBase: HttpBaseService,
    private orderService: OrderService,
  ) {}

  async getPriceDepth(req: GetPriceDepth): Promise<any> {
    const orders = await this.orderService.getOrders(req.pair);

    if (req.typeOperation === TypeOperation.buy) {
      const bidOrders = this.getBidOrders(orders);
      const ordersBySize = bidOrders.filter((item) => item.count >= req.size);
      return this.getMinPrice(ordersBySize);
    }

    if (req.typeOperation === TypeOperation.sell) {
      const askOrders = this.getAskOrders(orders);
      const ordersBySize = askOrders.filter((item) => item.count >= req.size);
      return this.getMaxPrice(ordersBySize);
    }
  }

  getBidOrders(orders: OrderBookResponse[]) {
    return orders.filter((order) => order.typePrice === TypePrice.bid);
  }

  getAskOrders(orders: OrderBookResponse[]) {
    return orders.filter((order) => order.typePrice === TypePrice.ask);
  }

  getMinPrice(orders: OrderBookResponse[]): number {
    const prices = orders.map((item) => item.price);
    return Math.min(...prices);
  }

  getMaxPrice(orders: OrderBookResponse[]): number {
    const prices = orders.map((item) => item.price);
    return Math.max(...prices);
  }
}
