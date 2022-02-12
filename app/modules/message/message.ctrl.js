var ret = require('../../utils/response/index');
var models = require('../../models');
const { where, QueryTypes } = require('sequelize');


exports.listMessage = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.message.findAll({
            order: [
                ['updateDt', 'DESC'],
            ],
        });
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createMessage = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.message.create({
            "id_message":req.body.id_message,
            "id_chat":req.body.id_chat,
            "id_receivet":req.body.id_receivet,
            "id_sender":req.body.id_sender,
            "message":req.body.message,
            "time":req.body.time,
            "status":req.body.status,
            "createDt":now,
            "createBy":req.firstname,
            "updateDt":now,
            "updateBy":req.firstname,
        })
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now); 
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
