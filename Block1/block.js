const{GENESIS_DATA}=require('./config');
const cryptoHash = require('./crypto-hash');
class Block{

    constructor({timestamp,prevHash,hash,data}){
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;

    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock,data}){
        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        const hash=cryptoHash(timestamp,prevHash,data);
        return new this({
            timestamp,
            prevHash,
            data,
            hash,
        })
    }
};

// const b1 = new Block({timestamp:433,prevHash:'ghebgkje',hash:'ffvdfbfd',data:'dsvsdvs'});


// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result= Block.mineBlock({prevBlock:genesisBlock,data:'jndknf'})
// console.log(result);

// result = cryptoHash("sdfds","sffd","fdfd");
// console.log(result);

module.exports = Block;