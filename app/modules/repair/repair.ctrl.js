var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where,QueryTypes, Sequelize} = require('sequelize');
const { response } = require('express');
exports.listrepair = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.repair.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    } 
}
exports.createRepair = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.repair.create({
                "_id":req.body._id,
                "state":req.body.state,
                "boi":req.body.boi,
                "assetCode":req.body.assetCode,
                "pricerepair":req.body.pricerepair,
                "pricerepairvat":req.body.pricerepairvat,
                "insuranceDt":req.body.insuranceDt,
                "repairDt":req.body.repairDt,
                "purchaserepair":req.body.purchaserepair,
                "remarkrepair":req.body.remarkrepair,
                "repairAt":req.body.repairAt,
                "totalpricerepair":req.body.totalpricerepair,
                "createDt":now,
                "createBy":req.firstname,
                "updateDt":now,
                "updateBy":req.firstname,
        }).then(createrepair => {		  
            res.json(createrepair);
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
            const result = {
                data: responseDetail,
            }
            ret.response(req, res, result, '', now);
        } catch (err) {
            ret.responseError(req, res, err, '', now);
        }
}
exports.repairasset = async (req, res) => {
    const now = Date.now();
    try{
        const sql = `SELECT 
        "repair"."_id",
        "repair"."assetCode",
        "repair"."repairDt",
        "repair"."purchaserepair",
        "repair"."remarkrepair",
        "repair"."insuranceDt",
        "repair"."state",
        repair."updateBy"
        FROM repair
        WHERE repair."assetCode" = '${req.body.assetCode}'
        ORDER BY repair."updateDt" DESC`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(repairasset => {		  
            res.json(repairasset);
            return responseList;
        })     
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }
    }
exports.updateRepair =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
	const responseDetail = await models.repair.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
                console.log('------------------');
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};
exports.deleteRepair =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
	const responseDetail = await models.repair.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};
