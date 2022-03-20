import { IsNumber, IsString } from 'class-validator';
import { CurrencyPair } from '../enums/currency-pair.enum';
import { TypeOperation } from '../enums/market.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetPriceDepth {
  @ApiProperty({
    example: 'BTCUSD || ETHUSD',
    required: true,
    description: 'Pair name',
  })
  @IsString()
  pair: CurrencyPair;

  @ApiProperty({
    example: 'buy || sell',
    required: true,
    description: 'Type Operation',
  })
  @IsString()
  typeOperation: TypeOperation;

  @ApiProperty({
    example: '3',
    required: true,
    description: 'Size operation',
  })
  @IsNumber()
  size: number; // cantidad de acciones o tokens
}
