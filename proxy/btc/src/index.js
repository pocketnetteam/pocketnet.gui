const script = require('./script')

module.exports = {
  Block: require('./block'),
  ECPair: require('./ecpair'),
  Transaction: require('./transaction'),
  TransactionBuilder: require('./transaction_builder'),

  address: require('./address'),
  bip32: require('./bip32'),
  bip39: require('bip39'),
  crypto: require('./crypto'),
  networks: require('./networks'),
  opcodes: require('./bitcoin_ops.json'),
  payments: require('./payments'),
  script: script
}
