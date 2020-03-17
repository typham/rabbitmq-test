var amqp = require('amqplib/callback_api');
const queueConfig = {
    url: 'amqp://guest:guest@18.217.147.158:5672/'
}
const connectQueue = async () => {
    return new Promise((resolve, reject) => {
        amqp.connect(queueConfig.url, function(error0, connection) {
            if (error0) {
              throw error0
              reject(error0)
            }

            console.log(`[Queue] Connected to ${queueConfig.url}`)

            connection.createChannel(function(error1, channel) {
              if (error1) {
                throw error1
                reject(error1)
              }

              channel.send = (queue, msg) => {
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
                console.log(` [x] Sent to ${queue} %s`, JSON.stringify(msg));
              }

              channel.subscribe = (queue, next) => {
                console.log(`[Queue] Subscribe to queue ${queue}`)
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.consume(queue, msg => {
                    console.log(` [x] Received from ${queue} %s`, msg.content);
                    next(JSON.parse(msg.content.toString('utf8')))
                  }, {
                      noAck: true
                    });
              }

              resolve(channel)
            });
          });
    })
}
module.exports.connectQueue = connectQueue