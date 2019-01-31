const crypto = require('crypto')

    function cryptoCript (password, secret) {
        return crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');
                   
    }


    module.exports = cryptoCript
    