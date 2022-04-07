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
        WHERE "userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
        AND "userAccount".province = '${req.body.province}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}'  
        AND "userAccount".height BETWEEN 0 AND '${req.body.height}'`

/*
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE
        ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
            AND "userAccount".province = '${req.body.province}'
            AND "userAccount".age BETWEEN 0 AND '${req.body.age}' 
            AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
            AND "userAccount".province = '${req.body.province}')
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
            AND "userAccount".age BETWEEN 0 AND '${req.body.age}')
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
            AND ("userAccount".height BETWEEN 0 AND '${req.body.height}'))
            
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".province = '${req.body.province}' 
            AND "userAccount".age BETWEEN 0 AND '${req.body.age}')
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".province = '${req.body.province}' 
            AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}' 
            AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        
        OR ("userAccount".gender = '${req.body.gender}' AND "userAccount".province = '${req.body.province}' 
            AND "userAccount".age BETWEEN 0 AND '${req.body.age}')
        OR ("userAccount".gender = '${req.body.gender}' AND "userAccount".province = '${req.body.province}' 
            AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        OR ("userAccount".gender = '${req.body.gender}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}' 
            AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
            
        OR ("userAccount".province = '${req.body.province}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}' 
            AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
            
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}'
            AND "userAccount".province = '${req.body.province}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}')
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}'
            AND "userAccount".province = '${req.body.province}' AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        
        OR ("userAccount".gender = '${req.body.gender}' AND "userAccount".province = '${req.body.province}'
            AND "userAccount".age BETWEEN 0 AND '${req.body.age}' AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}')
        OR ("userAccount".type = '${req.body.type}' AND "userAccount".province = '${req.body.province}')
        OR ("userAccount".type = '${req.body.type}' AND ("userAccount".age BETWEEN 0 AND '${req.body.age}'))
        OR ("userAccount".type = '${req.body.type}' AND ("userAccount".height BETWEEN 0 AND '${req.body.height}'))
        
        OR ("userAccount".gender = '${req.body.gender}' AND "userAccount".province = '${req.body.province}')
        OR ("userAccount".gender = '${req.body.gender}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}')
        OR ("userAccount".gender = '${req.body.gender}' AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        
        OR ("userAccount".province = '${req.body.province}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}')
        OR ("userAccount".province = '${req.body.province}' AND "userAccount".height BETWEEN 0 AND '${req.body.height}')
        
        OR ("userAccount".age BETWEEN 0 AND '${req.body.age}' AND "userAccount".height BETWEEN 0 AND '${req.body.height}') 
        
       `
       */
    //   const sqlStatement = `SELECT * 
    //   FROM public."userAccount"
    //   WHERE
    //   ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
    //       AND "userAccount".province = '${req.body.province}'
    //       AND "userAccount".age BETWEEN 0 AND '${req.body.age}' 
    //       AND "userAccount".height BETWEEN 0 AND '${req.body.height})'`

    //   if (req.body.type != null && req.body.gender != null && req.body.province != null) {
    //     const sql = `SELECT * 
    //     FROM public."userAccount"
    //     WHERE
    //     ("userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
    //         AND "userAccount".province = '${req.body.province}')`
        

    //   }

        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(search => {	  
          return res.json(search);
        })          
        } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }

}
exports.searchType = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}' 
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchType => {	  
          return res.json(searchType);
        })          
        } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchGender = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".gender = '${req.body.gender}' 
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}'`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchGender => {	  
          return res.json(searchGender);
        })          
        } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchProvince = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".province = '${req.body.province}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}'`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchProvince => {	  
          return res.json(searchProvince);
        })          
        } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchAge = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".age BETWEEN 0 AND '${req.body.age}' 
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchAge => {	  
          return res.json(searchAge);
        })          
        } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchHeight = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchHeight => {	  
          return res.json(searchHeight);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchAll = async (req, res) => {
    if(req.body.height == null){
        req.body.height = 0 
    }
    if(req.body.age == null){
         req.body.age = 0 
    }
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}' AND "userAccount".gender = '${req.body.gender}' 
        AND "userAccount".province = '${req.body.province}' AND "userAccount".age BETWEEN 0 AND '${req.body.age}'  
        AND "userAccount".height BETWEEN 0 AND '${req.body.height}' 
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}'
        `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchAll => {	  
          return res.json(searchAll);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchTypeGender = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}' 
        AND"userAccount".gender = '${req.body.gender}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchTypeGender => {	  
          return res.json(searchTypeGender);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchTypeProvince = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}' 
        AND"userAccount".province = '${req.body.province}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchTypeProvince => {	  
          return res.json(searchTypeProvince);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchTypeAge = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}' 
        AND"userAccount".age BETWEEN 0 AND '${req.body.age}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchTypeAge => {	  
          return res.json(searchTypeAge);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchTypeHeight = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}' 
        AND"userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchTypeHeight => {	  
          return res.json(searchTypeHeight);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchGenderProvince = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".gender = '${req.body.gender}' 
        AND"userAccount".province = '${req.body.province}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchGenderProvince => {	  
          return res.json(searchGenderProvince);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchGenderAge = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".gender = '${req.body.gender}' 
        AND"userAccount".age BETWEEN 0 AND '${req.body.age}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchGenderAge => {	  
          return res.json(searchGenderAge);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchGenderHeight = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".gender = '${req.body.gender}' 
        AND"userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchGenderHeight => {	  
          return res.json(searchGenderHeight);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchProvinceAge = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".province = '${req.body.province}' 
        AND"userAccount".age BETWEEN 0 AND '${req.body.age}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchProvinceAge => {	  
          return res.json(searchProvinceAge);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchProvinceHeight = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".province = '${req.body.province}' 
        AND"userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchProvinceHeight => {	  
          return res.json(searchProvinceHeight);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchAgeHeight = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".age BETWEEN 0 AND '${req.body.age}'
        AND"userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchAgeHeight => {	  
          return res.json(searchAgeHeight);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchTGP = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}'
        AND"userAccount".gender = '${req.body.gender}'
        AND"userAccount".province = '${req.body.province}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchTGP => {	  
          return res.json(searchTGP);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchTGA = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}'
        AND"userAccount".gender = '${req.body.gender}'
        AND "userAccount".age BETWEEN 0 AND '${req.body.age}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchTGA => {	  
          return res.json(searchTGA);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchTGH = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".type = '${req.body.type}'
        AND"userAccount".gender = '${req.body.gender}'
        AND "userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchTGH => {	  
          return res.json(searchTGH);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchGPA = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE userAccount".gender = '${req.body.gender}'
        AND "userAccount".province ='${req.body.province}' 
        AND "userAccount".age BETWEEN 0 AND '${req.body.age}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchGPA => {	  
          return res.json(searchGPA);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchGPH = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE userAccount".gender = '${req.body.gender}'
        AND "userAccount".province ='${req.body.province}' 
        AND "userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchGPH => {	  
          return res.json(searchGPH);
        })          
        } catch (err) {
        console.log("err")
        console.log(err)
        ret.responseError(req, res, err, '', now);
        }
}
exports.searchPAH = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT * 
        FROM public."userAccount"
        WHERE "userAccount".province ='${req.body.province}' 
        AND "userAccount".age BETWEEN 0 AND '${req.body.age}'
        AND "userAccount".height BETWEEN 0 AND '${req.body.height}'
        AND "userAccount".role !='ADMIN'  
        AND "userAccount"._id !='${req.body._id}' `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(searchPAH => {	  
          return res.json(searchPAH);
        })          
        } catch (err) {
        console.log("err")
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

