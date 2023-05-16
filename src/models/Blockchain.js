// Blockchain
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
}

export default Blockchain
