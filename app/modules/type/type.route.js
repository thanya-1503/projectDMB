module.exports = function (app) {
    const typeCtrl = app.modules.type.typeCtrl
    app.get('/api/type', typeCtrl.list);
    app.post('/api/createType', typeCtrl.createType);
    app.put('/api/updateType/:_id', typeCtrl.updateType);
    app.delete('/api/deleteType/:_id', typeCtrl.deleteType);
  }
  

  