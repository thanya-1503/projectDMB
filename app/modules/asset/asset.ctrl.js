var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where,QueryTypes, Sequelize} = require('sequelize');
const { response } = require('express');
const Op = Sequelize.Op;
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.asset.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    } 
}
exports.searchAsset = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.asset.findAll({where:whereReq});
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createAsset = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.asset.create({
            "_id":req.body._id,
            "assetCode":req.body.assetCode,
            "type":req.body.type,
            "brand":req.body.brand,
            "model":req.body.model,
            "color":req.body.color,
            "serialNumber":req.body.serialNumber,
            "purchaseDt":req.body.purchaseDt,
            "insuranceDt":req.body.insuranceDt,
            "insuranceTerm":req.body.insuranceTerm,
            "purchaseNo":req.body.purchaseNo,
            "price":req.body.price,
            "priceVat":req.body.priceVat,
            "totalPrice":req.body.totalPrice,
            "state":req.body.state,
            "repairCount":req.body.repairCount,
            "repairInsurance":req.body.repairInsurance,
            "saleDt":req.body.saleDt,
            "salePrice":req.body.salePrice,
            "salePricevat":req.body.salePricevat,
            "salePricetotal":req.body.salePricetotal,
            "saleAt":req.body.saleAt,
            "createDt":now,
            "createBy":req.firstname,
            "updateDt":now,
            "updateBy":req.firstname,
            "repairAt":req.body.repairAt,
            "repairDt":req.body.repairDt,
            "remarkrepair":req.body.remarkrepair,
            "purchaserepair":req.body.purchaserepair,
            "pricerepair":req.body.pricerepair,
            "pricerepairvat": req.body.pricerepairvat,
            "totalpricerepair": req.body.totalpricerepair,
            "remark":req.body.remark,
            "boi":req.body.boi,
    }).then(createAsset => {		  
        res.json(createAsset);
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
exports.listasset = async (req, res) => {
    const now = Date.now();
    try{
        const sql = `SELECT 
        asset."_id",
        asset."assetCode",
        asset."color",
        asset."serialNumber",
        asset."purchaseDt",
        asset."insuranceDt",
        asset."insuranceTerm",
        asset."purchaseNo",
        asset."price",
        asset."priceVat",
        asset."totalPrice",
        asset."repairCount",
        asset."repairInsurance",
        asset."saleDt",
        asset."salePrice",
        asset."saleAt",
        asset."createDt",
        asset."createBy",
        asset."updateDt",
        asset."updateBy",
        asset."remark",
        asset."type",
        asset."brand",
        asset."model",
        asset."state",
        asset."boi",
        asset."repairAt",
        asset."purchaserepair",
        asset."remarkrepair",
        asset."repairDt",
        asset."pricerepair",
        asset."pricerepairvat",
        asset."totalpricerepair",
        asset."salePricevat",
        asset."salePricetotal",
        brand."_id"as brandId,
        brand."brandType",
        brand."brandName",
        "type"."typeName",
        model."_id"as modelId,
        model."modelType",
        type."_id" as typeId,
        type."typeName",
        status."_id"as statusId,
        status."StatusName",
  b.id,
  b."employeeCode",
  b.prefix,
  b.firstname,
  b.lastname,
  b.nickname,
  b."workStart",
  b."workEnd",
  b."emType",
  b."lovType",
  b."siteType",
  b."receivedDt",
  b."returnDt"
        FROM asset
        LEFT JOIN brand on asset."brand" = brand."_id"
  LEFT JOIN type on asset."type" = type."_id"    
        LEFT JOIN model on asset."model" = model."_id"
        LEFT JOIN status on asset."state" = status."_id"  
     LEFT JOIN 
   (SELECT 
    employee."employeeCode" as "employeeCode",
     "employeeAsset"."employeeId",
         employee."prefix" as prefix,
         employee."firstname" as firstname,
         employee."lastname" as lastname,
         employee."nickname" as nickname,
         employee."workStart" as "workStart",
         employee."workEnd" as "workEnd" ,
        typeEmp."emType" as "emType",
        position."lovType" as "lovType",
         site."siteType" as "siteType",
         "employeeAsset"."assetId" as id,
         "employeeAsset"."status" as statusas,
         "employeeAsset"."receivedDt" as "receivedDt",
         "employeeAsset"."returnDt" as "returnDt"
         FROM "employeeAsset"
         LEFT JOIN employee on "employeeAsset"."employeeId" = "employee"."employeeCode"
        LEFT JOIN "typeEm" as typeEmp on "employee"."type" = typeEmp."_id"
        LEFT JOIN position on employee."position" = position."_id"
        LEFT JOIN site on employee."site" = site."_id" 
        WHERE "employeeAsset"."status" = 'Y') as b
        ON  asset."_id" = b.id 
        ORDER BY asset."updateDt" DESC`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listasset => {		  
            res.json(listasset);
            return responseList;
        })     
        } catch (err) {
            // console.log(err)
            ret.responseError(req, res, err, '', now);
        }
    }
    exports.deleteAsset =  async(req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        const responseDetail = await models.asset.destroy({
                where: { _id:_id }
            }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };
    exports.updateAsset = async (req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        req.body.updateDt = now;
        req.body.updateBy = req.firstname;
        const responseDetail = await models.asset.update(req.body,
            { where: { _id: _id } }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };
    exports.listassetFree = async (req, res) => {
        const now = Date.now();
        try{
            const sql = `SELECT 
            asset."_id",
            asset."assetCode",
            asset."color",
            asset."serialNumber",
            asset."purchaseDt",
            asset."insuranceDt",
            asset."insuranceTerm",
            asset."purchaseNo",
            asset."price",
            asset."priceVat",
            asset."totalPrice",
            asset."repairCount",
            asset."repairInsurance",
            asset."saleDt",
            asset."salePrice",
            asset."saleAt",
            asset."createDt",
            asset."createBy",
            asset."updateDt",
            asset."updateBy",
            asset."remark",
            asset."type",
            asset."brand",
            asset."model",
            asset."state",
            asset."purchaserepair",
            asset."remarkrepair",
            asset."boi",
            asset."repairAt",
            asset."repairDt",
            asset."pricerepair",
            asset."pricerepairvat",
            asset."salePricevat",
            asset."salePricetotal",
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
            WHERE "status"."StatusName" = 'ว่าง' or  "status"."StatusName" = 'spare' `
            const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listassetFree => {		  
                res.json(listassetFree);
                return responseList;
            })     
            } catch (err) {
                // console.log(err)
                ret.responseError(req, res, err, '', now);
            }
        }

        exports.AssetReport =  async(req, res) => {
            const now = Date.now();
            const a = new String(req.body)
            try{
                const sql = `SELECT 
                asset."_id",
                asset."assetCode",
                asset."color",
                asset."serialNumber",
                asset."purchaseDt",
                asset."insuranceDt",
                asset."insuranceTerm",
                asset."purchaseNo",
                asset."price",
                asset."priceVat",
                asset."totalPrice",
                asset."repairCount",
                asset."repairInsurance",
                asset."saleDt",
                asset."salePrice",
                asset."saleAt",
                asset."createDt",
                asset."createBy",
                asset."updateDt",
                asset."updateBy",
                asset."remark",
                asset."type",
                asset."brand",
                asset."model",
                asset."state",
                asset."boi",
                asset."repairAt",
                asset."repairDt",
                asset."pricerepair",
                asset."pricerepairvat",
                asset."totalpricerepair",
                asset."salePricevat",
                asset."salePricetotal",
                asset."purchaserepair",
                asset."remarkrepair",
                brand."_id"as brandId,
                brand."brandType",
                brand."brandName",
                "type"."typeName",
                model."_id"as modelId,
                model."modelType",
                repair."purchaserepair",
                repair."remarkrepair",
                type."_id" as typeId,
                type."typeName",
                status."_id"as statusId,
                status."StatusName",
                b.id,
                b."employeeCode",
                b.prefix,
                b.firstname,
                b.lastname,
                b.nickname,
                b."workStart",
                b."workEnd",
                b."emType",
                b."lovType",
                b."siteType",
                b."receivedDt",
                b."returnDt"
                FROM asset
                LEFT JOIN brand on asset."brand" = brand."_id"
                LEFT JOIN type on asset."type" = type."_id"    
                LEFT JOIN model on asset."model" = model."_id"
                LEFT JOIN repair on asset."_id" = repair."assetCode"
                LEFT JOIN status on asset."state" = status."_id"  
                LEFT JOIN 
                (SELECT 
                 employee."employeeCode" as "employeeCode",
                 "employeeAsset"."employeeId",
                 employee."prefix" as prefix,
                 employee."firstname" as firstname,
                 employee."lastname" as lastname,
                 employee."nickname" as nickname,
                 employee."workStart" as "workStart",
                 employee."workEnd" as "workEnd" ,
                typeEmp."emType" as "emType",
                position."lovType" as "lovType",
                 site."siteType" as "siteType",
                 "employeeAsset"."assetId" as id,
                 "employeeAsset"."status" as statusas,
                 "employeeAsset"."receivedDt" as "receivedDt",
                 "employeeAsset"."returnDt" as "returnDt"
                 FROM "employeeAsset"
                 LEFT JOIN employee on "employeeAsset"."employeeId" = "employee"."employeeCode"
                LEFT JOIN "typeEm" as typeEmp on "employee"."type" = typeEmp."_id"
                LEFT JOIN position on employee."position" = position."_id"
                LEFT JOIN site on employee."site" = site."_id" 
                WHERE "employeeAsset"."status" = 'Y') as b
                ON  asset."_id" = b.id
                WHERE asset."_id" IN (${a})
                ORDER BY asset."assetCode" DESC` 
                const listasset = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(AssetReport => {    
                    // res.json(AssetReport);
                    console.log('----------------------------------');
                    console.log(AssetReport.length);
                    console.log('AssetReport');
                    console.log(AssetReport);
                    let myMap = new Map(); //check_id
                    let arr = [];    
                    let list = [];   
                    let map2 = new Map(); //data
                    for (let i =0 ; i < AssetReport.length ; i++) {
                        if (myMap.size > 0) {
                            console.log(AssetReport[i]._id);
                            if (myMap.get("id") == AssetReport[i]._id) {
                                map2 = new Map();
                                setEmployee(AssetReport,i,map2)
                                const obj = Object.fromEntries(map2);
                                arr.push(obj)
                            } else {
                                myMap = new Map()
                                map2 = new Map();
                                myMap.set("id", AssetReport[i]._id);
                                setAsset(AssetReport,i,map2)
                                const obj = Object.fromEntries(map2);
                                arr.push(obj)
                            } 
                        } else {
                                myMap.set("id", AssetReport[i]._id);
                                setAsset(AssetReport,i,map2)
                                const obj = Object.fromEntries(map2);
                                arr.push(obj)
                            }
                        }
                        res.json(arr);
                        return AssetReport;
                    })     
                } catch (err) {
                    console.log(err)
                    ret.responseError(req, res, err, '', now);
                }
            }
            const setAsset = function(AssetReport,i,map2) {
                map2.set("id", AssetReport[i]._id);
                map2.set("typeName", AssetReport[i].typeName);
                map2.set("assetCode",AssetReport[i].assetCode);
                map2.set("brandName", AssetReport[i].brandName);
                map2.set("model", AssetReport[i].modelType);
                map2.set("serialNumber", AssetReport[i].serialNumber);
                map2.set("statusName", AssetReport[i].StatusName);
                map2.set("purchaseDt", AssetReport[i].purchaseDt);
                map2.set("insuranceDt", AssetReport[i].insuranceDt);
                map2.set("remark", AssetReport[i].remark);
                map2.set("boi",AssetReport[i].boi);
                map2.set("purchaseNo", AssetReport[i].purchaseNo);
                map2.set("insuranceTerm",AssetReport[i].insuranceTerm);
                map2.set("price", AssetReport[i].price);
                map2.set("priceVat", AssetReport[i].priceVat);
                map2.set("totalPrice",AssetReport[i].totalPrice);
                map2.set("typeEmployee", AssetReport[i].emType);
                map2.set("prefix", AssetReport[i].prefix);
                map2.set("firstname",AssetReport[i].firstname);
                map2.set("lastname", AssetReport[i].lastname);
                map2.set("nickname", AssetReport[i].nickname);
                map2.set("position", AssetReport[i].lovType);
                map2.set("siteType",AssetReport[i].siteType);
                map2.set("workStart",AssetReport[i].workStart);
                map2.set("workEnd",AssetReport[i].workEnd);
                map2.set("purchaserepair",AssetReport[i].purchaserepair);
                map2.set("remarkrepair",AssetReport[i].remarkrepair);
                map2.set("repairDt",AssetReport[i].repairDt);
                map2.set("repairAt",AssetReport[i].repairAt);
                map2.set("pricerepair",AssetReport[i].pricerepair);
                map2.set("pricerepairvat",AssetReport[i].pricerepairvat);
                map2.set("totalpricerepair",AssetReport[i].totalpricerepair);
            }

            const setEmployee = function(AssetReport,i,map2){
                map2.set("id",AssetReport[i]._id);
                map2.set("assetCode","");
                map2.set("brandName", "");
                map2.set("model", "");
                map2.set("type","");
                map2.set("serialNumber", "");
                map2.set("statusName", "");
                map2.set("purchaseDt", "");
                map2.set("insuranceDt", "");
                map2.set("remark", "");
                map2.set("boi",null);
                map2.set("purchaseNo", "");
                map2.set("insuranceTerm","");
                map2.set("price", "");
                map2.set("priceVat", "");
                map2.set("totalPrice","");
                map2.set("typeEmployee","");
                map2.set("prefix","");
                map2.set("firstname","");
                map2.set("lastname","");
                map2.set("nickname", "");
                map2.set("position","");
                map2.set("siteType","");
                map2.set("workStart","");
                map2.set("workEnd","");
                map2.set("purchaserepair",AssetReport[i].purchaserepair);
                map2.set("repairDt",AssetReport[i].repairDt);
                map2.set("repairAt",AssetReport[i].repairAt);
                map2.set("pricerepair",AssetReport[i].pricerepair);
                map2.set("pricerepairvat",AssetReport[i].pricerepairvat);
                map2.set("totalpricerepair",AssetReport[i].totalpricerepair);
                map2.set("remarkrepair",AssetReport[i].remarkrepair);
            }