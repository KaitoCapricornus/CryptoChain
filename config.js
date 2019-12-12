/**
 * This controls mine block rate
 */
const MINE_RATE = 1000;

/**
 * This controls the difficulty of genarating hash
 * This stands for leading 0 of hash
 */
const INITIAL_DIFFICULTY = 3;

/**
 * Base data for genesis block
 */
const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '-----',
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

module.exports = { GENESIS_DATA, MINE_RATE };