var ret = require('../../utils/response/index');
var models = require('../../models');
const { where, QueryTypes } = require('sequelize');


exports.listLikeUser = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.likeUser.findAll({
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
exports.createLikeUser = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.likeUser.create({
            "id_likeuser":req.body.id_likeuser,
            "user1":req.body.user1,
            "user2":req.body.user2,
            "id_chat":req.body.id_chat,
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
        console.log("err");
        console.log(err);
        ret.responseError(req, res, err, '', now);
    }
}

    exports.whereListlike = async (req, res) => {
        const now = Date.now();
        try {
            const sql = `SELECT * FROM public."likeUser"
            WHERE "likeUser".user1 = '${req.body.user2}'`
            const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(historyUsedAsset => {		  
            return res.json(historyUsedAsset);
        })          
        } catch (err) {
            ret.responseError(req, res, err, '', now);
        }
    
}
exports.deleteLike =  async(req, res) => {
    const now = Date.now();
    const id_likeuser = req.params.id_likeuser;
    const responseDetail = await models.likeUser.destroy({
            where: { id_likeuser:id_likeuser }
        }).then(() => {
            ret.response(req, res, '', '', now);
        }).catch(err => {
            console.log(err);
            ret.responseError(req, res, err, '', now);
        });
};
