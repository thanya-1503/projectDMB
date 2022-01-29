
module.exports = function (app) {
    const brandCtrl = app.modules.brand.brandCtrl
    app.get('/api/brand', brandCtrl.list);
    app.post('/api/createBrand', brandCtrl.createBrand);
    app.put('/api/updateBrand/:_id', brandCtrl.updateBrand);
    app.delete('/api/deleteBrand/:_id', brandCtrl.deleteBrand);
    app.get('/api/listBrand', brandCtrl.listBrand);
  }