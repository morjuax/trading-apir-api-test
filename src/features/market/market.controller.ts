import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetOrder } from '../../dto/order.dto';
import { MarketService } from './market.service';
import { GetPriceDepth } from '../../dto/market.dto';

@Controller('market')
export class MarketController {
  constructor(protected readonly marketService: MarketService) {
  }

  @Post('/list-price-depth')
  @HttpCode(HttpStatus.OK)
  async getPrice(@Body() req: GetPriceDepth) {
    return await this.marketService.getPriceDepht(req);
  }
}
