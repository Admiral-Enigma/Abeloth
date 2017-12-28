const express = require('express');
const bodyParser = require('body-parser');
const AbelothNode = require('./abNode')
let testNode = new AbelothNode(1338)

let node1 = new AbelothNode(1337)
const app = new express()
app.use(bodyParser.json())
app.get('/broadcast', (req, res)=>{
    console.log('broadcasting '+req.query.message)
    node1.broadcastMessage(req.query.message)
    res.send();
})

app.get('/addNode/:port', (req, res)=>{
    console.log('adding localhost host: '+req.params.port)
    node1.connectToPeer('localhost', req.params.port)

    res.send();
})

app.get('/createBlock/:data', (req, res)=>{
    let newBlock = node1.createBlock(req.params.data);

    console.log('block created');

    console.log(node1.getStats())

    res.send();
})

app.listen(3000, () => {
    console.log("http server up.. 3000");
})
