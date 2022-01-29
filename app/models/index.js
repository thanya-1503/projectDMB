'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
const CONFIG = require('../config/index') // Load config (environment)

var db = {};
var sequelize = new Sequelize(
    CONFIG.DATA_BASE.database,
    CONFIG.DATA_BASE.username,
    CONFIG.DATA_BASE.password,
    CONFIG.DATA_BASE
);

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    var data = null;
    if (date) {
        data = this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
    }
    return data;
};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
        db[model.name]._findAll = function (opt) {
            opt.attributes = [];
            let _model = db[model.name].attributes
            Object.keys(_model).forEach(keys => {
                if (_model[keys].type.toString() == 'DATETIMEOFFSET') {
                    opt.attributes.push([sequelize.fn('FORMAT', sequelize.col(_model[keys].field), 'yyyy-MM-dd HH:mm:ss'), _model[keys].fieldName])
                } else {
                    opt.attributes.push(_model[keys].fieldName)
                }
            })

            return db[model.name].findAll(opt).then(res => {
                return res;
            }).catch(err => {
                return err;
            })
        }
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;