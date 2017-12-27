const Blocks = require( "blockchain-lite" )

let Block = Blocks.basic

let b0 = Block.first( 'Genesis' )
let b1 = Block.next( b0, 'Some json' )
let b2 = Block.next( b1, 'Some json......' )
let b3 = Block.next( b2, 'Even more json...' )

let blockchain = [b0, b1, b2, b3]

console.log( blockchain )
