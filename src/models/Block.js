import sha256 from '../crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(chain,previousHash,index,hash) {
    this.chain=chain
    this.previousHash=previousHash
    this.index=index
    this.hash=hash
  }

  isValid() {
    if () {
      
    }
    else{
      return false
    }
  }

  setNonce(nonce) {}
  
}

export default Block

