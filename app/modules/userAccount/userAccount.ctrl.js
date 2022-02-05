const { v4: uuidv4 } = require('uuid');
var ret = require('../../utils/response/index');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];
var models = require('./../../models');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var Sequelize = require('sequelize');
const nJwt = require('njwt');
const Op = Sequelize.Op;
const { where, QueryTypes } = require('sequelize');
// var formatDateTime = config.formatDate + " " + config.formatTime;

exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.userAccount.findAll({
            order: [
                ['updateDt', 'DESC'],
            ],
        }

        );
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
exports.searchUserAccount = async (req, res) => {
    const now = Date.now();
    try {
        console.log('searchUserAccount');
        let whereReq = req.query || {};
        const responseDetail = await models.userAccount.findOne({ where: whereReq });
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createAccount = async (req, res) => {
    const now = Date.now();
    const status = true;
    const password = req.body.password
    const pass = await models.userAccount.options.instanceMethods.generateHash(password)
    try {
        const responseDetail = await models.userAccount.create({
            "_id": req.body._id,
            "username": req.body.username,
            "password": pass,
            "createBy": req.firstname,
            "createDt": now,
            "updateBy": req.firstname,
            "updateDt": now,
            "status": status,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "role": req.body.role,
            "nickname": req.body.nickname,
            "prefix": req.body.prefix,
            "school": req.body.school,
            "weight": req.body.weight,
            "age": req.body.age,
            "height": req.body.height,
            "picture": req.body.picture,
            "gender": req.body.gender,
            "description": req.body.description,
            "office": req.body.office,
            "province": req.body.province,
            "facebook": req.body.facebook,
            "line": req.body.line,
            "ig": req.body.ig,
            "phone": req.body.phone,
            "type": req.body.type,
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
exports.authLogin = async (req, res) => {
    const now = Date.now();
    try {
        console.log('authLogin');
        // let whereReq = req.query || {};
        let username = req.body.username;
        let password = req.body.password;
        const acc = await models.userAccount.findOne({ where: { username: username } });
        if (!acc) throw [40300, 'username is not associated with any account.'];
        let authen = await models.userAccount.options.instanceMethods.validPassword(password, acc.password);
        if (!authen) throw [40101];
        var resultRes = await exports.generateToken(acc);
        res.setHeader('Authorization', resultRes);
        req.session_id = uuidv4();
        req.username = acc.username;
        ret.response(req, res, { token: resultRes }, '', now);
        // ret.response(20000, msgCode.getMessage("E000", "login"), { token: resultRes }, res);
    } catch (err) {
        console.log(err, 'err');
        ret.responseError(req, res, err, '', now);
    }
}
exports.generateToken = async function (data, type) {
    try {
        //logger.info("[auth|auth-ctrl|token]");
        var dataSetToken = {
            _id: data._id,
            username: data.username,
            password: data.password,
            createBy: data.createBy,
            createDt: data.createDt,
            updateBy: data.updateBy,
            updateDt: data.updateDt,
            status: data.status,
            firstname: data.firstname,
            lastname: data.lastname,
            role: data.role
        }
        let token = nJwt.create(dataSetToken, config.secret); // CREATED PAYLOAD
        var timeout = config.timeoutToken; // SET TIMEOUT TYPE ADMIN AND GENERAL
        return await exports.extendToken(token, timeout); // CREATED TOKEN
    } catch (error) {
        ret.responseError(req, res, error, '', '');
    }
}
exports.authentication = async function (req, res) {
    try {
        var tokenHeader = req.headers['authorization'] || null;
        var token = tokenHeader && tokenHeader.split(' ')[0] === 'Bearer' ? tokenHeader.split(' ')[1] : tokenHeader;
        if (!token) {
            if (req.query.Authorization) token = req.query.Authorization;
        }
        if (!token) throw [40101, "Unauthorized"];
        let tokenDecode = nJwt.verify(token, config.secret); // DECODE AND CHECK EXPIRE
        res.setHeader('Authorization', token); // SET TOKEN TO HEADER
        return tokenDecode;
    } catch (error) {
        ret.responseError(req, res, error, '', '');
    }
}

exports.extendToken = async function (data, timeout) {
    try {
        if (data == undefined) {
            throw new [40100]
        } else {
            data.signingKey = config.secret; // SET SECRET KEY
            data.setExpiration(new Date().getTime() + config.timeoutToken); // SET TIME (+)
            let tokenNew = data.compact(); // GENARATE NEW TOKEN
            return tokenNew;
        }
        //logger.info("[auth|auth-ctrl|extendToken]");

    } catch (error) {
        console.log(error);
        ret.responseError(req, res, error, '', '');
    }
}
exports.updateAccount = async (req, res) => {
    const now = Date.now();
    const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
    // req.body.password = await models.userAccount.options.instanceMethods.generateHash(req.body.password)
    const responseDetail = await models.userAccount.update(req.body,
        { where: { _id: _id } }).then(() => {
            ret.response(req, res, '', '', now);
        }).catch(err => {
            console.log(err);
            ret.responseError(req, res, err, '', now);
        });
};

exports.deleteAccount = async (req, res) => {
    const now = Date.now();
    const _id = req.params._id;
    const responseDetail = await models.userAccount.destroy({
        where: { _id: _id }
    }).then(() => {
        ret.response(req, res, '', '', now);
    }).catch(err => {
        console.log(err);
        ret.responseError(req, res, err, '', now);
    });
};
exports.whereUserforgotpass = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT *
        FROM "userAccount" 
	   	WHERE  "userAccount"."username" = '${req.body.username}'`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(whereUserforgotpass => {
            return res.json(whereUserforgotpass);
            // return responseList;
        })
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }
}

exports.forgotpassword = async (req, res) => {
    const now = Date.now();
    // const _id = req.params._id;
    const _id = req.body._id;
    req.body.updateDt = now;
    // req.body.updateBy = req.firstname;
    req.body.password = await models.userAccount.options.instanceMethods.generateHash(req.body.password)
    const responseDetail = await models.userAccount.update(req.body,
        { where: { _id: _id } }).then(() => {
            ret.response(req, res, '', '', now);
        }).catch(err => {
            console.log(err);
            ret.responseError(req, res, err, '', now);
        });
};

exports.checkpassword = async (req, res) => {
    const now = Date.now();
    try {
        const passwordEncrypt = req.rawToken.password
        req.body.username = req.username
        req.body.updateDt = now;
        const oldPassword = req.body.password
        let authen = await models.userAccount.options.instanceMethods.validPassword(oldPassword, passwordEncrypt);
        console.log(authen);
        // if (!authen){
        //     console.log(false);
        // }
        if (!authen) throw [40101];
        ret.response(req, res, '', '', now);
    } catch (error) {
        console.log(error);
        ret.responseError(req, res, error, '', now);
    }
}

exports.editpassword = async (req, res) => {
    try {
        const now = Date.now();
        const _id = req.rawToken._id;
        req.body.updateDt = now;
        req.body.updateBy = req.firstname;
        req.body.password = await models.userAccount.options.instanceMethods.generateHash(req.body.password)
        const responseDetail = await models.userAccount.update(req.body,
            { where: { _id: _id } }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    } catch (error) {
        ret.responseError(req, res, err, '', now);
    }
};

exports.checkCreateUser = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT *
        FROM "userAccount" 
	   	WHERE  "userAccount"."username" = '${req.body.username}'`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(checkCreateUser => {
            return res.json(checkCreateUser);
            // return responseList;
        })
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }
}
