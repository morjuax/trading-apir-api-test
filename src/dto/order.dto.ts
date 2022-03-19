import { IsString } from 'class-validator';
import { CurrencyPair } from '../enums/currency-pair.enum';

export class GetOrder {
  @IsString()
  pair: CurrencyPair;
}
