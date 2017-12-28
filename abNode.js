const AbelothBlockChain = require('./abBlockChain')
const WebSocket = require('ws')

class AbelothNode {

  constructor (port) {
    this.chain = new AbelothBlockChain()
    this.sockets = []
    this.abelothServer = new WebSocket.Server({port: port})
    console.log('Node running on port ' + port)
    this.abelothServer.on('connection', function (peer) {
      console.log('New peer connected')
      this.initConnection(peer)
    })
  }

  broadcastMessage(message) {
    console.log('Sending message to all peers: '+ message)
    this.sockets.forEach(peer => peer.send(JSON.stringify({request: message})))
  }

  messageHandler(peer) {
      peer.on('message', function (data) {
        console.log('Got message from peer:')
        const msg = JSON.parse(data)
        console.log(msg.request)
      })
  }

  disconnectPeer(peer) {
    console.log('Disconnecting peer');
    this.sockets.splice(sockets.indexOf(peer), 1)
  }

  initConnection(peer) {
    console.log('Initializing new peer');
    this.messageHandler(peer)
    this.sockets.push(peer)
    peer.on('error', function () { this.disconnectPeer(peer) })
    peer.on('close', function () { this.disconnectPeer(peer) })
  }

  getStats() {
    return {
      totalBlocks: this.chain.getChainLength()
    }
  }

  createBlock(data) {
    this.chain.createBlock(data)
  }

  connectToPeer(host, port) {
    let peer = new WebSocket(`ws://${host}:${port}`)
    peer.on('error', function (error) {
      console.log(error);
    })

    peer.on('open', function (msg) {
      this.initConnection(peer)
    })
  }
}

module.exports = AbelothNode
