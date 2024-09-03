require('dotenv').config();

const amqp = require('amqplib');

async function process480p() {
  const conn = await amqp.connect(process.env.RABBITMQ_HOST);
  const channel = await conn.createChannel();
  
  const queue480p = process.env.QUEUE_NAME_480P;
  const queue720p = process.env.QUEUE_NAME_720P;
  
  await channel.assertQueue(queue480p, { durable: true });
  await channel.assertQueue(queue720p, { durable: true });
  await channel.prefetch(1,false)
  
  channel.consume(queue480p, async (msg) => {
    if (msg !== null) {

      const videoDetails = JSON.parse(msg.content.toString());
      console.log('Processing 480p for video:', videoDetails.videoId);

      // Simulate video processing
      await new Promise(resolve => setTimeout(resolve, 2000)); // 1 second processing time

      console.log('Processed 480p for video:', videoDetails.videoId);
      channel.ack(msg);

      // Check if the 480p queue is empty
      const { messageCount } = await channel.checkQueue(queue480p);
      if (messageCount === 0) {
        console.log('480p queue empty, enqueueing for 720p processing:', videoDetails.videoId);
        channel.sendToQueue(queue720p, Buffer.from(JSON.stringify(videoDetails)), { persistent: true });
      }
    }
  });
}

process480p();