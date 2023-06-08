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
  handleTransaction(transaction,feerReceiver) {
    if (!this.isValidTransaction(transaction.inputPublicKey, transaction.amount,transaction.fee))
      return
    const inputUTXO = this.utxos[transaction.inputPublicKey];
    inputUTXO.amount -= transaction.amount
    inputUTXO.amount -= transaction.fee
    if (inputUTXO.amount === 0)
      delete this.utxos[transaction.inputPublicKey]
    this.addUTXO(transaction.outputPublicKey, transaction.amount)
    this.addUTXO(feerReceiver,transaction.fee)
  }

  isValidTransaction(inputPublicKey, amount, fee) {
    const inpututxo = this.utxos[inputPublicKey]
    if(!inpututxo){
      return false
    }
    if (inpututxo.amount < amount+fee){
      return false
    }
    return false
  }

}

export default UTXOPool

