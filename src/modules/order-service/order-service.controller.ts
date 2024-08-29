import { Controller } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';

@Controller('order-service')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}
}
