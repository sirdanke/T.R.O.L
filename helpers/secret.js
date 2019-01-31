
const crypto = require('crypto')
let secret = crypto.randomBytes(10);

module.exports = secret