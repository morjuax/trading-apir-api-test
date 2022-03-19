import { IsString } from 'class-validator';
import { CurrencyPair } from '../enums/currency-pair.enum';

export class GetPrice {
  @IsString()
  pair: CurrencyPair;
}
