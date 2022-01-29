module.exports = function (app) {
    const typeEmCtrl = app.modules.typeEm.typeEmCtrl
    app.get('/api/typeEm', typeEmCtrl.list);
    app.post('/api/createTypeEm', typeEmCtrl.createTypeEm);
    app.put('/api/updateTypeEm/:_id', typeEmCtrl.updateTypeEm);
    app.delete('/api/deleteTypeEm/:_id', typeEmCtrl.deleteTypeEm);
    
  }