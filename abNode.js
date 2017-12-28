const AbelothBlockChain = require('./abBlockChain')
const WebSocket = require('ws')

class AbelothNode {

  constructor (port) {
    this.chain = new AbelothBlockChain()
    this.sockets = []
    this.abelothServer = new WebSocket.Server({port: port})
    this.init = true
    console.log('Node running on port ' + port)
  }

  initWS() {
    this.abelothServer.on('connection', function (peer) {
      console.log('New peer connected')
      this.initConnection(peer)
    })
  }

  broadcastMessage(request, content) {
    console.log('Sending message to all peers: '+ content)
    console.log(request);
    console.log(content);
    this.sockets.forEach(peer => peer.send(JSON.stringify({request, content})))
  }

  messageHandler(peer) {
      peer.on('message', function (data) {
        console.log('Got message from peer:')
        const msg = JSON.parse(data)
        switch (msg.request) {
          case "block":
            console.log('Block recieved');
            console.log(msg.content);
            break;
          default:

        }
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
    this.broadcastMessage('block', this.chain.getLatestBlock())
  }

  connectToPeer(host, port) {
    let peer = new WebSocket(`ws://${host}:${port}`)
    peer.on('error', function (error) {
      console.log(error);
    })

    peer.on('open', function (msg) {
      if (this.init) {
        this.initConnection(peer)
      }
    })
  }
}

module.exports = AbelothNode
