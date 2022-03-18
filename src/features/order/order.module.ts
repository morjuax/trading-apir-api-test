import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpBaseService } from '../../services/http-base-authenticated/http-base.service';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [OrderService, HttpBaseService],
  controllers: [OrderController],
})
export class OrderModule {}
