var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.site.findAll({
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
    } }

exports.createSite = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.site.create({
                "_id":req.body._id,
                "siteType":req.body.siteType,
                "createDt":now,
                "createBy":req.firstname,
                "updateDt":now,
                "updateBy":req.firstname,
        }).then(createSite => {		  
            res.json(createSite);
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
exports.updateSite =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
	const responseDetail = await models.site.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};

exports.deleteSite =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
	const responseDetail = await models.site.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};

