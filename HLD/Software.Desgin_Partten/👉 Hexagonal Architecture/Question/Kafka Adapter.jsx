export class KafkaProducerAdapter extends EventPublisher {
  constructor(producer) {
    super();
    this.producer = producer;
  }

  async publish(topic, event) {
    await this.producer.send({
      topic,
      messages: [
        { value: JSON.stringify(event) }
      ]
    });
  }
}
