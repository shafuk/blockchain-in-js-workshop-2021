import sha256 from '../crypto-js/sha256.js'
import UTXO from "./UTXO.js";
import UTXOPool from "./UTXOPool.js";

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(chain,previousHash,index,hash,miner,amount) {
    this.chain=chain
    this.previousHash=previousHash
    this.index=index
    this.hash=hash
    this.nonce=0
    this.utxoPool = new UTXOPool(new UTXO(miner,amount))
  }

  isValid(){
    var temp = this.nonce.toString()
    var str = "00"
    if (temp.substring(0,DIFFICULTY)==str){
      return true
    }else {
      return false
    }
  }

  setNonce(nonce) {
    this.nonce=nonce
  }
}

export default Block
