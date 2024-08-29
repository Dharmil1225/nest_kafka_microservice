import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';

@Controller('user-service')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}
}
