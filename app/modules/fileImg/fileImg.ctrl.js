const { v4: uuidv4 } = require('uuid');
var ret = require('../../utils/response/index');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];
var models = require('../../models');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var Sequelize = require('sequelize');
const nJwt = require('njwt');
const Op = Sequelize.Op;
const { where, QueryTypes } = require('sequelize');

exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.file_img.findAll({
        }
        );
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        console.log(err);
        ret.responseError(req, res, err, '', now);
    }
}

exports.createFileImg = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.file_img.create({
                "file_id":req.body.file_id,
                "userAccount_id":req.body.userAccount_id,
                "file_name":req.body.file_name,
                "file_path":req.body.file_path,
                "file_type":req.body.file_type,
                "file_size":req.body.file_size
            })
            const result = {
                data: responseDetail,
            }
            ret.response(req, res, result, '', now);
            
        } catch (err) {
            console.log("err");
            console.log(err);
            ret.responseError(req, res, err, '', now);
        }
    }