import { Module } from '@nestjs/common';
import { OrderModule } from './features/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { MarketModule } from './features/market/market.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    OrderModule,
    MarketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
