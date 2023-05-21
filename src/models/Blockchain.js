import UTXOPool from './UTXOPool.js'
import Block from "./Block.js";
import UTXO from "./UTXO.js";


class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(chainname) {
    this.chainname=chainname
    this.genesis=null
    this.blocks=[]
  }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    var max = 1
    var highest = null
    for (let i = 0;i<this.blocks.length;i++){
      if (this.blocks[i].index>max){
        max=this.blocks[i].index
        highest = this.blocks[i]
      }
    }
    var temp = []
    temp[0]=highest
    while (true){
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i].hash==temp[0].previousHash){
          temp.unshift(this.blocks[i])
        }
      }
      if (temp[0]==this.blocks[0]){
        break
      }
    }
    return temp


  }

  // 判断当前区块链是否包含
  containsBlock(block) {
    // 添加判断方法
    for (let i = 0; i < this.blocks.length;i++) {
      if (this.blocks[i]==block){
        return true
      }
    }

    return false
  }

  // 获得区块高度最高的区块
  maxHeightBlock() {
    // return Block
  }

  // 添加区块
  /*

  */
  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    // 添加 UTXO 快照与更新的相关逻辑
    this.blocks.push(block)
  }
}

export default Blockchain
