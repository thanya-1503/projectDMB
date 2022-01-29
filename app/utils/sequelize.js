// var env = process.env.NODE_ENV || 'development';
var Sequelize = require('sequelize');
var models = require('../models');
var ret = require('./response');
// var config = require('../config/config.json')[env];
var moment = require('moment');
exports.getOne = async function (table, where) {
    try {
        return await models[table].findOne({ where: where, raw: true })
    } catch (err) {
        throw err;
    }
};

exports.get = async function (table, where, options) {
    (options ? options : { raw: true })
    try {
        return await models[table].findAll({ where: where, raw: true, options })
    } catch (err) {
        throw err;
    }
};

exports.getCount = async function (table, where, options) {
    try {
        options ? options : undefined
        return await models[table].findAndCountAll({ where: where, raw: true, options })
    } catch (err) {
        throw err;
    }
};

exports.create = async function (tables, data, t) {
    try {
        return await models[tables].create(data, { transaction: t }, { raw: true });
    } catch (err) {
        throw (err);
    }
}

exports.updated = async function (tables, data, t, options) {
    try {
        options ? options : undefined
        // commonClass()
        // data.status = data.status ? data.status : 'Y';
        // data.updated_by = data.updated_by ? data.updated_by : '0';
        // data.updated_dt = data.updated_dt ? data.updated_dt : moment(new Date()).format(config.datetimeFormat);
        return await models[tables].update(data, options, { transaction: t });
    } catch (err) {
        throw (err);
    }
}

exports.generateHash = function (password) {
    return new Promise((resolve, reject) => {
        models.mt_account.options.instanceMethods.generateHash(password).then(function name(newPassword) {
            resolve(newPassword);
        }).catch(function (err) {
            reject(err);
        });
    }).catch(function (err) {
        throw new Error(err);
    });
}

exports.runCode = async function (table, field, condition, code, length, t = null) {
    try {
        var fields = models[table].rawAttributes[field].field;
        var response = await models[table].findAll({
            attributes: [
                [Sequelize.literal('max("' + fields + '")'), 'maxVal']
            ],
            where: condition,
            transaction: t
        });
        var str = 0;
        if (response && response[0] && response[0].dataValues.maxVal) {
            var d = response[0].dataValues.maxVal.split(code);
            var maxVal = parseInt(d[1]);
            str = parseInt(maxVal) ? parseInt(maxVal) + 1 : maxVal + 1;
        }
        if (str === NaN) str = 0;
        str = str.toString();
        var data = str.padStart(parseInt(length), '0');
        if (code) {
            data = code + data;
        }
        return data;
    } catch (error) {
        throw error;
    }
}

// function encodeBase64(str) {
//     var b = new Buffer.from(str);
//     return b.toString('base64');
// }

// function decodeBase64(str) {
//     var b = new Buffer.from(str, 'base64');
//     return b.toString();
// }
