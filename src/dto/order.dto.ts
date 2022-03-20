import { IsOptional, IsString } from 'class-validator';
import { CurrencyPair } from '../enums/currency-pair.enum';
import { Precision } from '../enums/common.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrder {
  @ApiProperty({
    example: 'BTCUSD || ETHUSD',
    required: true,
    description: 'Pair name',
  })
  @IsString()
  pair: CurrencyPair;

  @IsOptional()
  @IsString()
  precision: Precision;
}
