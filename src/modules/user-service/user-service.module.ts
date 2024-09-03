import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserServiceController } from './user-service.controller';
import { KafkaService } from '../../common/kafka/kafka.service';

@Module({
  providers: [UserServiceService, KafkaService],
  controllers: [UserServiceController],
})
export class UserServiceModule {}
