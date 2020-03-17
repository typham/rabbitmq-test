const {connectQueue} = require('./queue')

const startDelivery = async () => {
    const queue = await connectQueue()
    queue.subscribe('delivery', queueReceive)
}

const queueReceive = msg => {
    console.log(`[Queue] Received: `, msg)
}



startDelivery()
