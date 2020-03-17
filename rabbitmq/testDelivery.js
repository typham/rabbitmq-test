const {connectQueue} = require('./queue')

const startTest = async () => {
    const queue = await connectQueue()
    queue.send('delivery', {products: [{name: 'product 1'}, {name: 'product 2'}]})
}

startTest()
