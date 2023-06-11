import sha256 from '../crypto-js/sha256.js'
import {sign} from "../crypto.js"
import {verifySignature} from "../crypto.js"
class Transaction {
  constructor(inputPublicKey, outputPublicKey, amount) {
    this.inputPublicKey = inputPublicKey
    this.outputPublicKey = outputPublicKey
    this.amount = amount
    this._setHash()
    this.signature=null
  }
  _setHash() {
    this.hash = this._calculateHash()
  }

  _calculateHash() {
    return sha256(this.inputPublicKey + this.outputPublicKey + this.amount).toString()
  }
  sign(){
    this.signature=sign(this.amount,this.inputPublicKey)
  }
  hasValidSignature(){
    if (!this.signature || this.signature.length === 0) {
      throw new Error("Transaction signature is missing");
    }
    return verifySignature(this.amount,this.signature,this.inputPublicKey)
  }
}

export default Transaction
