import { IsOptional, IsString } from 'class-validator';
import { CurrencyPair } from '../enums/currency-pair.enum';
import { Precision } from '../enums/common.enum';

export class GetOrder {
  @IsString()
  pair: CurrencyPair;

  @IsOptional()
  @IsString()
  precision: Precision;
}
