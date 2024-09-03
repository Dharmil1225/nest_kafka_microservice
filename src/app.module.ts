import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { UserServiceModule } from './modules/user-service/user-service.module';
import { OrderServiceModule } from './modules/order-service/order-service.module';
import { BillingServiceModule } from './modules/billing-service/billing-service.module';
import { KafkaController } from './common/kafka/kafka.controller';
import { KafkaService } from './common/kafka/kafka.service';
import { OrderServiceService } from './modules/order-service/order-service.service';

@Module({
  imports: [
    DatabaseModule,
    UserServiceModule,
    OrderServiceModule,
    BillingServiceModule,
  ],
  controllers: [AppController, KafkaController],
  providers: [AppService, KafkaService, OrderServiceService],
})
export class AppModule {}
