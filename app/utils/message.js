var msgCode = require('../config/message_code.json');
var lodash = require('lodash');

class MessageCode {
    constructor() { }

    getMessage(code, value) {
        return msgCode[code].replace(/{data}/g, value);
    };
    getMessage(code, value1, value2, value3, value4) {
        return msgCode[code].replace(/{data}/g, value1).replace(/{data2}/g, value2).replace(/{data3}/g, value3).replace(/{data4}/g, value4);
    };

}

module.exports = MessageCode;