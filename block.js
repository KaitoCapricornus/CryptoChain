const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');

/**
 * Block class
 * Blueprint of a block
 */
class Block {
    /**
     * Constructor
     * @param { timestamp, lastHash, hash, data, nonce, difficulty } param0 
     */
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    /**
     * Generating Genesis Block
     */
    static genesis() {
        return new Block(GENESIS_DATA);
    }

    /**
     * Mining function to create new block
     * @param { lastBlock, data } param0 
     * @return new block
     */
    static mineBlock({ lastBlock, data }) {
        const lastHash = lastBlock.hash;
        let hash, timestamp;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({ timestamp, lastHash, data, difficulty, nonce, hash });
    }

    /**
     * Adjust difficulty to raises or lowers mining speed
     * @param { originalBlock, timestamp } param0 
     * @return new difficulty
     */
    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;

        //extremely fast
        if (difficulty < 1) return 1;

        //too slow
        if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;

        //too fast
        return difficulty + 1;
    }
}

module.exports = Block;