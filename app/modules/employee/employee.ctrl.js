var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
const { where,QueryTypes, Sequelize} = require('sequelize');
var models = require('../../models');
const { response } = require('express');
const Op = Sequelize.Op;
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.employee.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.searchEmployee = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.employee.findAll({where:whereReq});
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.searchEmployee = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.employee.fildAll({where:whereReq});
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
    
}
exports.createEmployee = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.employee.create({
            "_id":req.body._id,
            "employeeCode":req.body.employeeCode,
            "prefix":req.body.prefix,
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "nickname":req.body.nickname,
            "workStart":req.body.workStart,
            "workEnd":req.body.workEnd,
            "createDt":now,
            "createBy":req.firstname,
            "updateDt":now,
            "updateBy":req.firstname,
            "type":req.body.type,
            "position":req.body.position,
            "site":req.body.site,
    }).then(createEmployee => {		  
        res.json(createEmployee);
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
exports.listemployee = async (req, res) => {
    const now = Date.now();
    try{
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
        site."siteType"
        FROM employee
        LEFT JOIN "typeEm" as typeEmp on employee."type" = typeEmp."_id"
        LEFT JOIN position on employee."position" = position."_id"
        LEFT JOIN site on employee."site" = site."_id" 
        ORDER BY employee."updateDt" DESC`
        const listemployee = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listemployee => {		  
            res.json(listemployee);
            return listemployee;
        })     
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }
    }
    exports.deleteEmployee =  async(req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        const responseDetail = await models.employee.destroy({
                where: { _id:_id }
            }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };
    exports.updateEmployee= async (req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        req.body.updateDt = now;
        req.body.updateBy = req.firstname;
        const responseDetail = await models.employee.update(req.body,
            { where: { _id: _id } }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };
    exports.employeeReport = async (req, res) => {
        const now = Date.now();
        
       const a = new String(req.body)
       console.log(a);
        try{
            const sql = ` SELECT
            "employeeAsset"."employeeId",
            "employeeAsset"."assetId",
            "employeeAsset"."receivedDt",
            "employeeAsset"."returnDt",
            "employeeAsset"."status",
            asset."assetCode",
            asset."color",
            asset."serialNumber",
            asset."purchaseDt",
            asset."insuranceDt",
            asset."type",
            asset."brand",
            asset."model",
            asset."state",
            asset."boi",
            brand."_id"as brandId,
            brand."brandType",
            brand."brandName",
            model."_id"as modelId,
            model."modelType",
            type."_id" as typeId,
            type."typeName", 
            status."_id"as statusId,
            status."StatusName",
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
            typeEmp."emType",
            position."_id" as positionId,
            position."lovType",
            site."_id" as siteId,
            site."siteType"
            FROM "employeeAsset"
            LEFT JOIN asset on asset."_id" = "employeeAsset"."assetId"
            LEFT JOIN brand on asset."brand" = brand."_id"
            LEFT JOIN type on asset.type = type."_id"	   
            LEFT JOIN model on asset."model" = model."_id"
            LEFT JOIN status on asset."state" = status."_id"
            RIGHT JOIN employee on employee."employeeCode" = "employeeAsset"."employeeId"
		    LEFT JOIN "typeEm" as typeEmp on employee."type" = typeEmp."_id"
			LEFT JOIN position on employee."position" = position."_id"
			LEFT JOIN site on employee."site" = site."_id" 
            WHERE employee."employeeCode" IN (${a}) 
            ORDER BY employee."employeeCode" DESC`
            const listemployee = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(employeeReport => {		  
                // res.json(employeeReport);
                console.log(employeeReport.length);
                let myMap = new Map(); //check_id
                let arr = [];    
                let list = [];   
                let map2 = new Map(); //data
                for (let i =0 ; i < employeeReport.length ; i++) {
                    if (myMap.size > 0) {
                        if (myMap.get("id") == employeeReport[i]._id) {
                            map2 = new Map();
                            setAsset(employeeReport,i,map2)
                            const obj = Object.fromEntries(map2);
                            arr.push(obj)
                        } else {
                            myMap = new Map()
                            map2 = new Map();
                            myMap.set("id", employeeReport[i]._id);
                            setEmployee(employeeReport,i,map2)
                            const obj = Object.fromEntries(map2);
                            arr.push(obj)
                        }
                    } else {
                        myMap.set("id", employeeReport[i]._id);
                        setEmployee(employeeReport,i,map2)
                        const obj = Object.fromEntries(map2);
                        arr.push(obj)
                    }
                }
                res.json(arr);
                return employeeReport;
            })     
            } catch (err) {
                console.log(err)
                ret.responseError(req, res, err, '', now);
            }
        }

const setEmployee = function(employeeReport,i,map2) {
    map2.set("id", employeeReport[i]._id);
    map2.set("employeeCode", employeeReport[i].employeeCode);
    map2.set("prefix",employeeReport[i].prefix);
    map2.set("firstname", employeeReport[i].firstname);
    map2.set("lastname", employeeReport[i].lastname);
    map2.set("nickname", employeeReport[i].nickname);
    map2.set("workStart", employeeReport[i].workStart);
    map2.set("workEnd", employeeReport[i].workEnd);
    map2.set("lovType", employeeReport[i].lovType);
    map2.set("siteType", employeeReport[i].siteType);
    map2.set("emType", employeeReport[i].emType);
    map2.set("updateDt", employeeReport[i].updateDt);
    map2.set("updateBy", employeeReport[i].updateBy);

    map2.set("assetCode",employeeReport[i].assetCode);
    map2.set("receivedDt", employeeReport[i].receivedDt);
    map2.set("returnDt", employeeReport[i].returnDt);
    map2.set("serialNumber",employeeReport[i].serialNumber);
    map2.set("purchaseDt", employeeReport[i].purchaseDt);
    map2.set("insuranceDt", employeeReport[i].insuranceDt);
    map2.set("brandType",employeeReport[i].brandType);
    map2.set("brandName", employeeReport[i].brandName);
    map2.set("modelType", employeeReport[i].modelType);
    map2.set("typeName", employeeReport[i].typeName);
    map2.set("StatusName",employeeReport[i].StatusName);
}

const setAsset = function(employeeReport,i,map2) {
    map2.set("id", "");
    map2.set("employeeCode", "");
    map2.set("prefix", "");
    map2.set("firstname", "");
    map2.set("lastname", "");
    map2.set("nickname", "");
    map2.set("workStart", "");
    map2.set("workEnd", "");
    map2.set("lovType", "");
    map2.set("siteType", "");
    map2.set("emType", "");
    map2.set("updateDt", "");
    map2.set("updateBy", "");

    map2.set("assetCode",employeeReport[i].assetCode);
    map2.set("receivedDt", employeeReport[i].receivedDt);
    map2.set("returnDt", employeeReport[i].returnDt);
    map2.set("serialNumber",employeeReport[i].serialNumber);
    map2.set("purchaseDt", employeeReport[i].purchaseDt);
    map2.set("insuranceDt", employeeReport[i].insuranceDt);
    map2.set("brandType",employeeReport[i].brandType);
    map2.set("brandName", employeeReport[i].brandName);
    map2.set("modelType", employeeReport[i].modelType);
    map2.set("typeName", employeeReport[i].typeName);
    map2.set("boi", employeeReport[i].boi);
    map2.set("StatusName",employeeReport[i].StatusName);
}