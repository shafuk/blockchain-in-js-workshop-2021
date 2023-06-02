import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos=utxos
  }

  addUTXO(publicKey, amount) {
    if (this.utxos[publicKey]){
      this.utxos[publicKey].amount+=amount
    }else{
      const utxo = new UTXO(publicKey,amount)
      this.utxos[publicKey]=utxo
    }
  }

  clone() {
    return new UTXOPool(clone(this.utxos))
  }

  // 处理交易函数
  handleTransaction() {}

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool 
   */
  isValidTransaction() {}
}

export default UTXOPool
