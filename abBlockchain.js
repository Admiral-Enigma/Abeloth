const Blocks = require( "blockchain-lite" )
const Crypto = require('crypto');

let Block = Blocks.basic

class AbelothBlockChain {

  constructor (){
    this.chain = []
    this.currentBlock = {}
    this.genBlock = Block.first('She is ancient, and powerful, and dangerous. Very dangerous.')
    this.currentBlock = this.genBlock
    this.chain.push(this.genBlock)
  }

   createBlock(data) {
    let block = Block.next(this.currentBlock, data)
    this.addBlockToChain(block)
  }

  addBlockToChain(block) {
    if (this.validateBlock(block, this.currentBlock)) {
      this.chain.push(block)
      this.currentBlock = block
      return true
    }
    return false
  }

  validateBlock(newBlock, latestBlock) {
    if (latestBlock.index + 1 != newBlock.index) {
      return false
    } else if (latestBlock.hash != newBlock.previousHash ) {
      return false
    } else if (!this.validateHash(newBlock)) {
      return false
    }

    //TODO: Add more validation for data

    return true
  }

  validateHash(block) {
    return (this.createHash(block) == block.hash)
  }

  getLatestBlock() {
    return this.currentBlock
  }

  createHash(block) {
    return Crypto.createHash('SHA256').update(block.index.toString()+block.timestamp.toString()+block.data.toString()+block.previousHash).digest('hex');
  }

  getChainLength() {
    return this.chain.length
  }

  getChain() {
    return this.chain
  }
}
module.exports = AbelothBlockChain
