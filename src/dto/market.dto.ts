import { IsNumber, IsString } from 'class-validator';
import { CurrencyPair } from '../enums/currency-pair.enum';
import { TypeOperation } from '../enums/market.enum';

export class GetPriceDepth {
  @IsString()
  pair: CurrencyPair;

  @IsString()
  typeOperation: TypeOperation;

  @IsNumber()
  size: number;
}
