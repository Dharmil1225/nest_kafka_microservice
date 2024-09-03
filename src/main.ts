import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kafka microservice setup for consumer
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
      },
      consumer: {
        groupId: 'my-consumer-group', // Unique consumer group ID
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
