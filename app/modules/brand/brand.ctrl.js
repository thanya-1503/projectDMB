var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where, QueryTypes, Sequelize } = require('sequelize');
const { response } = require('express');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.brand.findAll({
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
exports.createBrand = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.brand.create({
            "_id":req.body._id,
            "brandType":req.body.brandType,
            "brandName":req.body.brandName,
            "createDt":now,
            "createBy":req.firstname,
            "updateDt":now,
            "updateBy":req.firstname,
    }).then(createbrand => {		  
        res.json(createbrand);
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
exports.updateBrand =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
	const responseDetail = await models.brand.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};
exports.deleteBrand =  async(req, res) => {
    const now = Date.now();
    const _id = req.params._id;
	const responseDetail = await models.brand.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};

exports.listBrand = async function (req, res) {
    const now = Date.now();
    try {
        const sql = `SELECT 
        brand."_id",
        brand."brandName",
        brand."createDt",
        brand."createBy",
        brand."updateDt",
        brand."updateBy", 
        brand."brandType",
        type."_id" as typeId,
        type."typeName"
        FROM brand
       LEFT JOIN type on brand."brandType" = type."_id"
       ORDER BY brand."updateDt" DESC`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listBrand => {		  
        res.json(listBrand);
        return responseList;
    })     
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}



