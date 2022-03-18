import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetOrder } from '../../dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(protected readonly orderService: OrderService) {
  }

  @Post('/list')
  @HttpCode(HttpStatus.OK)
  async getPriceToPay(@Body() req: GetOrder) {
    const resp =  await this.orderService.getOrders();
    return resp;
  }
}
