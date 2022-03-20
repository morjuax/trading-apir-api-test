import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { HttpBaseService } from '../../services/http-base/http-base.service';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from '../order/order.service';

@Module({
  imports: [HttpModule],
  providers: [MarketService, HttpBaseService, OrderService],
  controllers: [MarketController],
})
export class MarketModule {}
