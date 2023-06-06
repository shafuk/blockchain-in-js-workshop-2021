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

  createChild(coinbaseBeneficiary) {
    return new Block({
      blockchain: this.blockchain,
      parentHash: this.hash,
      height: this.height + 1,
      coinbaseBeneficiary
    })
  }
  _calculateHash() {
    return sha256(this.nonce + this.parentHash + this.coinbaseBeneficiary).toString()
  }
  _setHash() {
    this.hash = sha256(this.nonce + this.parentHash).toString()
  }

  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  merkleTree(transactions) {
    if (transactions.length === 1) {
      return transactions[0];
    }
    const newTransactions = [];
    for (let i = 0; i < transactions.length; i += 2) {
      const left = transactions[i];
      const right = i + 1 === transactions.length ? left : transactions[i + 1];
      const combinedHash = hash(left + right);
      newTransactions.push(combinedHash);
    }
    return merkleTree(newTransactions);
  }
  
  combinedTransactionsHash(transactions) {
    const merkleRoot = merkleTree(transactions);
    return hash(merkleRoot);
  }
  
  addTransaction(inputPublicKey, outputPublicKey, amount, fee) {
    if (!this.isValidTransaction(inputPublicKey, amount, fee))
      return
    const transaction = new Transaction(inputPublicKey, outputPublicKey, amount, fee)
    this.transactions[transaction.hash] = transaction
    this.utxoPool.handleTransaction(transaction, this.coinbaseBeneficiary)
    this._setHash();
  }


}

export default Block
