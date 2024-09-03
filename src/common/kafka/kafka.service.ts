import { Injectable } from '@nestjs/common';
import { producer } from '../../app.service';

@Injectable()
export class KafkaService {
  async emit(topic: string, messages: any) {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(messages) }],
    });
    console.log('Message sent to topic', topic);
  }
}
