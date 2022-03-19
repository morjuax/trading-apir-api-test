import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpBaseService } from '../../services/http-base/http-base.service';
import { HttpBaseAuthService } from '../../services/http-base-auth/http-base-auth.service';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [OrderService, HttpBaseService, HttpBaseAuthService],
  controllers: [OrderController],
})
export class OrderModule {}
