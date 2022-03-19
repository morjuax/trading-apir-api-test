import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetOrder } from '../../dto/order.dto';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(protected readonly marketService: MarketService) {
  }

  @Post('/list-price')
  @HttpCode(HttpStatus.OK)
  async getPrice(@Body() req: GetOrder) {
    return await this.marketService.getPrice(req.pair);
  }
}
