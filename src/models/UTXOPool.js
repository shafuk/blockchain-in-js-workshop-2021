import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos= {}) {
    this.utxos=utxos

  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(publickey,amount) {
    if (this.utxos[publickey]){
      this.utxos[publickey].amount += amount

    }else {
      const utxo = new UTXO(publickey,amount)
      this.utxos[publickey] = utxo
    }

  }

  // 将当前 UXTO 的副本克隆
  clone() {
    return new UTXOPool(this.clone(this.utxos))
  }
}

export default UTXOPool
