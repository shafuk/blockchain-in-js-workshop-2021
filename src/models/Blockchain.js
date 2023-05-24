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
    this.blocks=new Map()
  }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let value_list = []
    for (let [key,value] of this.blocks) {
      value_list.push(value)
    }
    let temp = []
    for (let i = 0; i < value_list.length; i++) {
      for (let j = 0; j < value_list.length; j++) {
        if (value_list[j].previousHash==value_list[i].hash) {
          temp.push([value_list[i],value_list[j]])
        }
      }
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp.length; j++) {
        if (temp[i][1]==temp[j][0]  ) {
          let temp1 = temp[i]
          let temp2 =temp[j]
          temp1.pop()
          return temp1.concat(temp2)
        }
      }
    }
    return temp[1]
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
    var parent = new Object()
    // 添加 UTXO 快照与更新的相关逻辑
    for (let [key,value] of this.blocks) {
      if (value.hash==block.previousHash) {
        parent = value
      }
    }
    if (parent == undefined && (Number(parent.index)+1) != block.index){
      return
    }
    const newUtxoPool = parent.utxoPool.clone()
    block.utxoPool.addUTXO(newUtxoPool)
  }
}

export default Blockchain
