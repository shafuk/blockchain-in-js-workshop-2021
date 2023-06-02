import sha256 from '../crypto-js/sha256.js'


class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs
    this.outputs = outputs
    this.hash = null
  }

  // 更新交易 hash
  _setHash() {
    this.hash=this._calculateHash()
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
   sha256(this.input,this.outputs)
  }
}

export default Transaction