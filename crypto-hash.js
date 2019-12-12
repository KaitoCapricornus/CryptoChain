const crypto = require('crypto');
const hexToBinary = require('hex-to-binary');

/**
 * Hashing function using SHA-256
 * @param  {...any} inputs 
 */
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(' '));

    //return hexToBinary(hash.digest('hex'));
    return hash.digest('hex');
};

module.exports = cryptoHash;