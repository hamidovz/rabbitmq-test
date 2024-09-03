require('dotenv').config();

const amqp = require('amqplib');

async function sendToQueue(videos) {
  const conn = await amqp.connect(process.env.RABBITMQ_HOST);
  const channel = await conn.createChannel();
  
  const queue480p = process.env.QUEUE_NAME_480P;

  await channel.assertQueue(queue480p, { durable: true });

  videos.forEach(videoDetails => {
    const message = JSON.stringify(videoDetails);
    channel.sendToQueue(queue480p, Buffer.from(message), { persistent: true });
    console.log('Sent video to 480p processing queue:', videoDetails);
  });

  await channel.close();
  await conn.close();
  
}

// Array of sample video details
const videoDetailsList = [
  { videoId: 101, path: '/path/to/video1.mp4' },
  { videoId: 102, path: '/path/to/video2.mp4' },
  { videoId: 103, path: '/path/to/video3.mp4' }
];

sendToQueue(videoDetailsList);