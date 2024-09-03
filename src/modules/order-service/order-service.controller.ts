import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { CreateOrderDto, UpdateOrderDto } from './dtos/order.dto';

@Controller('order-service')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderServiceService.createOrder(createOrderDto);
  }

  @Get()
  async findAll() {
    return this.orderServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderServiceService.findOne(id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderServiceService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    await this.orderServiceService.deleteOrder(id);
  }
}
