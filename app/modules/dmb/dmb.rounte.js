
module.exports = function (app) {
    const dmbCtrl = app.modules.dmb.dmbCtrl
    app.get('/api/dmb', dmbCtrl.list);
  }