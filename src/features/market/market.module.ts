import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { HttpBaseService } from '../../services/http-base/http-base.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [MarketService, HttpBaseService],
  controllers: [MarketController],
})
export class MarketModule {}
