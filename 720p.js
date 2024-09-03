require('dotenv').config();

const amqp = require('amqplib');

async function process720p() {
  const conn = await amqp.connect(process.env.RABBITMQ_HOST);
  const channel = await conn.createChannel();
  
  const queue720p = process.env.QUEUE_NAME_720P;
  
  await channel.assertQueue(queue720p, { durable: true });

  channel.consume(queue720p, (msg) => {
    if (msg !== null) {
      const videoDetails = JSON.parse(msg.content.toString());
      console.log('Processing 720p for video:', videoDetails.videoId);

      // Simulate video processing
      setTimeout(() => {
        console.log('Processed 720p for video:', videoDetails.videoId);
        channel.ack(msg);
      }, 1000); // 1 second processing time
    }
  });
}

process720p();