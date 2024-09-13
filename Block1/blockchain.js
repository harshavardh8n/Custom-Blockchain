const { json } = require("express");
const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data,
        })

        this.chain.push(newBlock);
    }

    static isvalid(chain){
        console.log(JSON.stringify(chain[0]));
        console.log(JSON.stringify(Block.genesis()));
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){
            return false;
        }

        for(let i=1;i<chain.length;i++){
            const {timestamp,prevHash,hash,data}=chain[i];
            const realPrevHash = chain[i-1].hash;  
            if(realPrevHash!==prevHash){
                return false;
            }
            const validatedHash = cryptoHash(timestamp,prevHash,data);
            if(validatedHash!==hash){
                return false;
            }
        }
        return true;
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({data:'Block1 '});
console.log(blockchain);
result = Blockchain.isvalid(blockchain.chain);
console.log(result);

module.exports = Blockchain;