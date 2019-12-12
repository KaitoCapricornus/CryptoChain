const Block = require('./block');
const cryptoHash = require('./crypto-hash');

/**
 * Blockchain class
 * Blueprint of a blockchain
 */
class Blockchain {
    /**
     * Constructor
     * First block in chain is genesis block
     */
    constructor() {
        this.chain = [Block.genesis()];
    }

    /**
     * Add new block to the chain
     * @param { data } param0 
     */
    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });
        this.chain.push(newBlock);
    }

    /**
     * Validate the chain
     * - Check the first block is genesis block or not
     * - Check last hash and current hash is matched or not
     * - Check hash is true or fasle
     * - Check difficulty is valid or not (is difficulty too low???)
     * @param chain 
     */
    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const actualLastHash = chain[i - 1].hash;
            const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
            const lastDifficulty = chain[i-1].difficulty;

            if (lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
            if (hash !== validatedHash) return false;
            
            if(lastDifficulty - difficulty > 1) return false;
        }

        return true;
    }

    /**
     * Replace with longer chain
     * @param chain 
     */
    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error('The incoming chain must be longer');
            return;
        }
        if(!Blockchain.isValidChain(chain)){
            console.error('The incoming chain must be valid');
            return;
        }
        console.log('replacing with ', chain);
        this.chain = chain;
    }

}

module.exports = Blockchain;