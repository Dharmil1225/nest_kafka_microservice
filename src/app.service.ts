import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

export let producer: Producer;
@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
    });

    producer = kafka.producer();
    await producer.connect();
    console.log('Kafka Producer connected');
  }
}
