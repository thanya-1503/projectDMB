module.exports = function (app) {
    const modelCtrl = app.modules.model.modelCtrl
    app.get('/api/assetModel', modelCtrl.list);
    app.post('/api/createModel', modelCtrl.createModel);
    app.put('/api/updateModelAsset/:_id', modelCtrl.updateModelAsset);
    app.delete('/api/deleteModelAsset/:_id', modelCtrl.deleteModelAsset);
  }
  
  