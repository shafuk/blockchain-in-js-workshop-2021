import sha256 from 'crypto-js/sha256.js'
import UTXOPool from './UTXOPool.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含*/

  
  constructor(blockchain,previousHash,height,hash,coinbaseBeneficiary) {
    this.blockchain=blockchain
    this.previousHash=previousHash
    this.height=height
    this.hash=hash
    this.nonce=hash
    this.coinbaseBeneficiary=coinbaseBeneficiary
    this.utxoPool=new UTXOPool()
  }
  setNonce(nonce){
    return this.nonce
  }
  isValid() {
    return this.parentHash === 'root' ||
      (this.hash.substr(-DIFFICULTY) === "0".repeat(DIFFICULTY) &&
      this.hash === this._calculateHash())
  }

  _calculateHash() {
    return sha256(this.nonce + this.parentHash + this.coinbaseBeneficiary).toString()
  }

}

export default Block
