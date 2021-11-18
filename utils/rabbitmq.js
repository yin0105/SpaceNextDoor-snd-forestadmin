const Amqp = require('amqplib');

let channel;
let connection;

const rabbitMQUrl = process.env.RABBITMQ_URL;
const exchange = process.env.SND_EXCHANGE;

const connect = async () => {
  try {
    connection = await Amqp.connect(rabbitMQUrl);

    await connection.on('close', function (event) {
      console.log(`Rabbit mq connection close: ${event}`);
    });
    await connection.on('error', function (err) {
      console.error(`Rabbit mq connection error: ${err}`);
    });
    await connection.on('blocked', function (reason) {
      console.log(`Rabbit mq connection blocked: ${reason}`);
    });
    await connection.on('unblocked', function (reason) {
      console.log(`Rabbit mq connection unblocked: ${reason}`);
    });

    console.log(`Successfully connected to rabbit mq url ==> ${rabbitMQUrl}`);
    try {
      channel = await connection.createChannel();

      console.log('Successfully created rabbit mq channel');
    } catch (err) {
      console.err(
        `Failed to create a new channel for the rabbitmq connection with this url ==> ${rabbitMQUrl}`,
        err,
      );
    }
  } catch (err) {
    console.error(
      `Failed to connect with the rabbitmq url ==> ${rabbitMQUrl}`,
      err,
    );
    throw new Error(err);
  }
};

const pushToQueue = async (key, data) => {
  console.log(
    `Pushing to QUEUE on ${exchange}: ${key} => ${JSON.stringify(data)}`,
  );
  if (channel) {
    await channel.publish(exchange, key, Buffer.from(JSON.stringify(data)));
  }
};

module.exports = {
  connect: connect,
  pushToQueue: pushToQueue,
};
