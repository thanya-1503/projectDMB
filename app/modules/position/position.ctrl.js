const ret = require('../../utils/response/index');
const models = require('../../models');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.position.findAll({
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
exports.createPosition = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.position.create({
            "_id": req.body._id,
            "lovType": req.body.lovType,
            "createDt": now,
            "createBy": req.firstname,
            "updateDt": now,
            "updateBy": req.firstname,
        }).then(createPosition => {
            res.json(createPosition);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.updatePosition = async (req, res) => {
    const now = Date.now();
    const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
    const responseDetail = await models.position.update(req.body,
        { where: { _id: _id } }).then(() => {
            ret.response(req, res, '', '', now);
        }).catch(err => {
            console.log(err);
            ret.responseError(req, res, err, '', now);
        });
};
exports.deletePosition = async (req, res) => {
    const now = Date.now();
    const _id = req.params._id;
    const responseDetail = await models.position.destroy({
        where: { _id: _id }
    }).then(() => {
        ret.response(req, res, '', '', now);
    }).catch(err => {
        console.log(err);
        ret.responseError(req, res, err, '', now);
    });
};



