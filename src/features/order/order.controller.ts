import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetOrder } from '../../dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(protected readonly orderService: OrderService) {
  }

  @Post('/list-by-pair')
  @HttpCode(HttpStatus.OK)
  async getOrderByPair(@Body() req: GetOrder) {
    return await this.orderService.getOrdersRaw(req.pair);
  }


}
