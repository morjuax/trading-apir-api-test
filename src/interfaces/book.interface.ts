import { TypePrice } from '../enums/market.enum';

export interface OrderBookResponse {
  price: number;
  count: number;
  amount: string;
  typePrice: TypePrice;
}
