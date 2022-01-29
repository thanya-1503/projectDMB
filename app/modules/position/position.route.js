module.exports = function (app) {
    const positionCtrl = app.modules.position.positionCtrl
    app.get('/api/position', positionCtrl.list);
    app.post('/api/createposition', positionCtrl.createPosition);
    app.put('/api/updatePosition/:_id', positionCtrl.updatePosition);
    app.delete('/api/deletePosition/:_id', positionCtrl.deletePosition);
  }
  