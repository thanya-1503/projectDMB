var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where, QueryTypes } = require('sequelize');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.employeeAsset.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createEmpAsset = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.employeeAsset.create({
            "_id":req.body._id,
            "employeeId":req.body.employeeId,
            "assetId":req.body.assetId,
            "createDt":now,
            "createBy":req.firstname,
            "updateDt":now,
            "updateBy":req.firstname,
            "receivedDt":req.body.receivedDt,
            "returnDt":req.body.returnDt,
            "status":req.body.status
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
exports.updateEmpAsset =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
	const responseDetail = await models.employeeAsset.update(req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});                
};
exports.deleteEmpAsset =  async(req, res) => {
    const now = Date.now();
    const _id = req.params._id;
	const responseDetail = await models.employeeAsset.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};

exports.listEmpAsset = async function (req, res) {
    const now = Date.now();
    try {
        const sql = `SELECT 	
        "employeeAsset"."_id",
        "employeeAsset"."employeeId",
        "employeeAsset"."assetId",
        "employeeAsset"."createDt",
        "employeeAsset"."createBy",
        "employeeAsset"."updateDt",
        "employeeAsset"."updateBy",
		asset."_id" as id_asset,
        asset."assetCode",
        employee."_id" as id_employee,
        employee."employeeCode",
        employee."prefix",
        employee."firstname",
        employee."lastname",
        employee."nickname"
       FROM "employeeAsset"
       INNER JOIN asset on asset."assetCode" = "employeeAsset"."assetId"
	   INNER JOIN employee on employee."employeeCode" = "employeeAsset"."employeeId"`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listEmpAsset => {		  
        res.json(listEmpAsset);
        return responseList;
    })     
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.listEmpUseAsset = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT 	
        "employeeAsset"."_id",
        "employeeAsset"."employeeId",
        "employeeAsset"."assetId",
        "employeeAsset"."receivedDt",
        "employeeAsset"."returnDt",
        "employeeAsset"."status",
		asset."_id" as id_asset,
        asset."assetCode",
        employee."employeeCode",
		asset."color",
        asset."serialNumber",
        asset."purchaseDt",
        asset."insuranceDt",
        asset."type",
        asset."brand",
        asset."model",
        asset."remark",
        asset."state",
        brand."_id"as brandId,
        brand."brandType",
        brand."brandName",
        model."_id"as modelId,
        model."modelType",
        type."_id" as typeId,
        type."typeName", 
        status."_id"as statusId,
        status."StatusName"
       FROM "employeeAsset"
       LEFT JOIN asset on asset."_id" = "employeeAsset"."assetId"
	   LEFT JOIN brand on asset."brand" = brand."_id"
		LEFT JOIN type on asset.type = type."_id"	   
        LEFT JOIN model on asset."model" = model."_id"
        LEFT JOIN status on asset."state" = status."_id"
	   LEFT JOIN employee on employee."employeeCode" = "employeeAsset"."employeeId"
	   WHERE  employee."employeeCode" = '${req.body.employeeCode}' AND  "employeeAsset"."status" = 'Y'`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listAllEmpAsset => {		  
        return res.json(listAllEmpAsset);
        // return responseList;
    })          
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }

}

// find asset join EmpAsset  All table
exports.listUseAsset = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT 
        asset."_id",
        asset."assetCode",
        asset."color",
        asset."serialNumber",
        asset."purchaseDt",
        asset."insuranceDt",
        asset."type",
        asset."brand",
        asset."model",
        asset."remark",
        asset."state",
        brand."_id"as brandId,
        brand."brandType",
        brand."brandName",
        model."_id"as modelId,
        model."modelType",
        type."_id" as typeId,
        type."typeName", 
        status."_id"as statusId,
        status."StatusName"
       	FROM asset   
       	LEFT JOIN brand on asset."brand" = brand."_id"
		LEFT JOIN type on asset.type = type."_id"	   
        LEFT JOIN model on asset."model" = model."_id"
        LEFT JOIN status on asset."state" = status."_id"
	   	WHERE  asset."_id" = '${req.body._id}'`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listUseAsset => {		  
        return res.json(listUseAsset);
        // return responseList;
    })          
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }
}

// find emp join EmpAsset  All table   เปลี่ยนไปใช้ table history
exports.listUseEmp = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT 
        employee."_id",
        employee."employeeCode",
        employee."prefix",
        employee."firstname",
        employee."lastname",
        employee."nickname",
        employee."workStart",
        employee."workEnd",
        employee."createDt",
        employee."createBy",
        employee."updateDt",
        employee."updateBy",
        typeEmp."_id" as typeId,
        typeEmp."emType",
        position."_id" as positionId,
        position."lovType",
        site."_id" as siteId,
        site."siteType",
		"employeeAsset"."_id" as employeeAssetId,
        "employeeAsset"."employeeId",
        "employeeAsset"."assetId"
        FROM employee
        LEFT JOIN "typeEm" as typeEmp on employee."type" = typeEmp."_id"
        LEFT JOIN position on employee."position" = position."_id"
        LEFT JOIN site on employee."site" = site."_id"
		LEFT JOIN "employeeAsset" on "employeeAsset"."employeeId" =employee."employeeCode" 
	   	WHERE  "employeeAsset"."assetId" = '${req.body.assetCode}'`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listUseEmp => {		  
        return res.json(listUseEmp);
        // return responseList;
    })          
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }
}


exports.listDeleteAsset = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT 
        asset."_id",
        asset."assetCode"
       FROM "asset"
	   WHERE  asset."_id" = '${req.body.deleteAsset}'`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listDeleteAsset => {		  
        return res.json(listDeleteAsset);
    })          
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }
}

exports.ChandeStatusAsset = async (req, res) => {
    const now = Date.now();
    try {
        const sql = ` SELECT
        asset."_id",
        asset."assetCode",
        "employeeAsset"."assetId"
        FROM "employeeAsset"
        LEFT JOIN "asset" on  asset."assetCode" = "employeeAsset"."assetId"
	    WHERE "employeeAsset"."assetId" '${req.body.IdAsset}'`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(ChandeStatusAsset => {		  
        return res.json(ChandeStatusAsset);
    })          
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }
}




