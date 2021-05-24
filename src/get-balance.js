const cardano = require('./cardano')

const sender = cardano.wallet("cardinomaster")

console.log(
    sender.balance()
)