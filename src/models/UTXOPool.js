import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos=utxos
  }
  addUTXO(PublicKey,amount) {
    if(this.utxos[PublicKey]){
      this.utxos[PublicKey].amount+=amount
    }else{
      const utxo =new UTXO(PublicKey,amount)
      this.utxos[PublicKey]=utxo
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
    return new UTXOPool(clone(this.utxos))
  }
  // 处理交易函数
  handleTransaction(transaction) {
    if (!this.isValidTransaction(transaction.inputPublicKey, transaction.amount,transaction.fee))
      return
    const inputUTXO = this.utxos[transaction.inputPublicKey];
    inputUTXO.amount -= (transaction.amount+transaction.fee)
    if (inputUTXO.amount === 0)
      delete this.utxos[transaction.inputPublicKey]
    this.addUTXO(transaction.outputPublicKey, transaction.amount)
  }

  isValidTransaction(inputPublicKey, amount, fee) {
    const utxo = this.utxos[inputPublicKey]
    return utxo !== undefined && utxo.amount-utxo.fee >= amount && amount > 0
  }

}

export default UTXOPool

