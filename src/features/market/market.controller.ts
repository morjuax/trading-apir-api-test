import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MarketService } from './market.service';
import { GetPriceDepth } from '../../dto/market.dto';

@Controller('market')
export class MarketController {
  constructor(protected readonly marketService: MarketService) {
  }

  @Post('/get-price-orderbook')
  @HttpCode(HttpStatus.OK)
  async getPrice(@Body() req: GetPriceDepth) {
    return await this.marketService.getPriceDepth(req);
  }
}
