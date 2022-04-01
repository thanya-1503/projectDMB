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
            "chat_status":req.body.chat_status,
        })
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now); 
    } catch (err) {
        console.log(err);
        ret.responseError(req, res, err, '', now);
    }
}

    exports.whereListlike = async (req, res) => {
        // const a = req.body.user2
        const now = Date.now();
        try {
            const sql = `SELECT * FROM public."likeUser"
            LEFT JOIN public."userAccount" on "likeUser".user1 = "userAccount"._id
            WHERE "likeUser".user2 ='${req.body.user2}' AND "likeUser".status = false`
            const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(whereListlike => {	
                console.log(req.body.user2);	  
                return res.json(whereListlike);
                console.log(whereListlike)
                // return responseList;
            })          
            } catch (err) {
                console.log(req.body.user2);
                console.log(err)
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
exports.updateLike =  async(req, res) => {
    const now = Date.now();
	const id_likeuser = req.params.id_likeuser;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
	const responseDetail = await models.likeUser.update(req.body, 
			{ where: {id_likeuser:id_likeuser} }).then(() => {         
                ret.response(req, res, '', '', now);
                
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});                
};

exports.whereMatch = async (req, res) => {
    // const a = req.body.user2
    const now = Date.now();
    try {
        const sql = `SELECT * FROM public."likeUser"
        LEFT JOIN public."userAccount" on "likeUser".user1 = "userAccount"._id OR
        "likeUser".user2 = "userAccount"._id
        WHERE ("likeUser".user2 =  '${req.body.user2}' OR "likeUser".user1 =  '${req.body.user2}') AND "likeUser".status = true`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(whereListlike => {	
            console.log(req.body.user2);	  
            return res.json(whereListlike); 
        })          
        } catch (err) {
            console.log(req.body.user2);
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }

}

exports.whereChatSender = async (req, res) => {
    // const a = req.body.user2
    const now = Date.now();
    try {
        const sql = `SELECT 
        "userAccount".nickname,
        "userAccount"._id,
        "userAccount".username,
        "message".message,
        "message".id_sender,
        "message".id_receivet,
        "message"."updateDt",
        "userAccount".picture
        FROM public."message"
        LEFT JOIN public."userAccount" on "message".id_receivet = "userAccount"._id
        WHERE "message".id_sender = '${req.body.id_sender}'
        ORDER BY "message"."updateDt" DESC `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(whereChat => {	
            console.log(req.body.user2);	  
            return res.json(whereChat);   
        })          
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }
}
exports.whereChatReceivet = async (req, res) => {
    // const a = req.body.user2
    const now = Date.now();
    try {
        const sql = `SELECT 
        "userAccount".nickname,
        "userAccount"._id,
        "userAccount".username,
        "message".message,
        "message".id_sender,
        "message".id_receivet,
        "message"."updateDt",
        "userAccount".picture
        FROM public."message"
        LEFT JOIN public."userAccount" on "message".id_sender = "userAccount"._id
        WHERE "message".id_receivet = '${req.body.id_receivet}'
        ORDER BY "message"."updateDt" DESC `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(whereChatReceivet => {	  
            return res.json(whereChatReceivet);   
        })          
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }

}

exports.whereCListChat = async (req, res) => {
    // const a = req.body.user2
    const now = Date.now();
    try {
        const sql = `SELECT "userAccount".nickname,
        "userAccount"._id,
        "userAccount".username,
        "likeUser".user1,
        "likeUser".user2,
        "likeUser".chat_status,
        "userAccount".picture
        FROM public."likeUser" 
        JOIN public."userAccount"  on "likeUser".user1 = "userAccount"._id OR
		 "likeUser".user2 = "userAccount"._id
        WHERE ("likeUser".user2 =  '${req.body.user2}' OR "likeUser".user1 =  '${req.body.user1}') AND "likeUser".chat_status = true AND
		"userAccount"._id !=  '${req.body._id}'`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(whereCListChat => {	  
            return res.json(whereCListChat);   
        })          
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }

}

exports.messageChat = async (req, res) => {
    // const a = req.body.user2
    const now = Date.now();
    try {
        const sql = `SELECT 
        "userAccount".nickname,
        "message".id_message,
        "message".message,
        "message".id_sender,
        "message".id_receivet,
        "message"."updateDt"
        FROM public."message"
        LEFT JOIN public."userAccount" on "message".id_receivet = "userAccount"._id
        WHERE ("message".id_sender = '${req.body.id_sender}' OR "message".id_receivet = '${req.body.id_sender}' )AND 
		("message".id_sender = '${req.body.id_receivet}' OR "message".id_receivet = '${req.body.id_receivet}')
        ORDER BY "message"."updateDt" ASC`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(messageChat => {	  
            return res.json(messageChat);   
        })          
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }

}

exports.search = async (req, res) => {
    if(req.body.height == null){
        req.body.height = 0 
    }
    if(req.body.age == null){
         req.body.age = 0 
    }
    // const a = req.body.user2
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}' OR "userAccount".gender = '${req.body.gender}' 
        OR "userAccount".province = '${req.body.province}' OR "userAccount".age BETWEEN 0 AND '${req.body.age}'  
        OR "userAccount".height BETWEEN 0 AND '${req.body.height}'`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(search => {	  
          return res.json(search);
        })          
        } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }

}

exports.searchListChat = async (req, res) => {
    // const a = req.body.user2
    const now = Date.now();
    try {
        const sql = `SELECT "userAccount".nickname,
        "userAccount"._id,
        "userAccount".username,
        "likeUser".user1,
        "likeUser".user2,
        "likeUser".chat_status,
        "userAccount".picture
        FROM public."likeUser" 
        JOIN public."userAccount"  on "likeUser".user1 = "userAccount"._id OR
		 "likeUser".user2 = "userAccount"._id
        WHERE (("likeUser".user2 =  '${req.body.user2}' OR "likeUser".user1 =  '${req.body.user1}') AND "likeUser".chat_status = true AND
		"userAccount"._id !=  '${req.body._id}') AND "userAccount".nickname ILIKE '%${req.body.nickname}%'`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchListChat => {	  
            return res.json(searchListChat);   
        })          
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }

}

