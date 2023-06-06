import UTXOPool from './UTXOPool.js'


class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name=name;
    this.genesis=null;
    this.blocks={};
  }
  

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
 longestChain() {let longestChain = [this.genesis]
  
      for (let hash in this.blocks) {
        let block = this.blocks[hash]
        //如果当前区块高度大于最长链最后的区块高度
        if (block.height > longestChain[longestChain.length - 1].height) {
          //设置数组容纳新的最长链
          let tempChain = [block]
          //当前区块的前一个区块
          let prevBlock = this.blocks[block.previousHash]
          //校准区块高度
          while (prevBlock) {
            if (prevBlock.height === tempChain[0].height - 1) {
              tempChain.unshift(prevBlock)
              prevBlock = this.blocks[prevBlock.previousHash]
            } else {
              break
            }
          }
          //如果新链长度高于旧链
          if (tempChain.length > longestChain.length) {
            longestChain = tempChain
          }
        }
      }
      //输出
      return longestChain
    }


  // 获得区块高度最高的区块
  maxHeightBlock() {
    return longestChain[longestChain.length-1]
  }
  containsBlock(block){
    return false
  }
  // 添加区块
  /*

  */
  _addBlock(block) {
    if (!block.isValid()) 
      return
    if (this.containsBlock(block)) 
      return
    // 添加 UTXO 快照与更新的相关逻辑
    const parent =block[block.previousHash];
    if(parent === undefined && parent.height+1 !==block.height)
    return
    const newUtxoPool = parent.utxoPool.clone();
    newUtxoPool.addUTXO(block.coinbaseBeneficiary, 12.5)
    block.utxoPool = newUtxoPool;
    this.blocks[block.hash] = block;
    rerender()
  }
}

export default Blockchain
