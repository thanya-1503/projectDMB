var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');

exports.listsale = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.sale.findAll({
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
exports.createsale = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.sale.create({
                "_id":req.body._id,
                "state":req.body.state,
                "remark":req.body.remark,
                "assetCode":req.body.assetCode,
                "saleAt":req.body.saleAt,
                "salePrice":req.body.salePrice,
                "salePricevat":req.body.salePricevat,
                "salePricetotal":req.body.salePricetotal,
                "createDt":now,
                "createBy":req.firstname,
                "updateDt":now,
                "updateBy":req.firstname,
        }).then(createsale => {		  
            res.json(createsale);
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
// exports.saleasset = async (req, res) => {
//     const now = Date.now();
//     try{
//         const sql = `SELECT 
//         asset."_id",
//         asset."assetCode",
//         asset."createDt",
//         asset."createBy",
//         asset."updateDt",
//         asset."updateBy",
//         asset."remark",       
//         asset."state",
//         asset."saleAt",
//         asset."salePrice",
//         asset."salePricevat",
//         asset."salePricetotal"
//         FROM "asset"
// 		LEFT JOIN sale on asset."state" = sale."state"
//         ORDER BY asset."updateDt" DESC `
//         const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listsale => {		  
//             res.json(listsale);
//             return responseList;
//         })     
//         } catch (err) {
//             // console.log(err)
//             ret.responseError(req, res, err, '', now);
//         }
//     }
exports.updatesale =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
	const responseDetail = await models.sale.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};
exports.deletesale =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
	const responseDetail = await models.sale.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};
