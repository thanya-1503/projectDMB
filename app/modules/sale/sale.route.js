module.exports = function (app) {
    const saleCtrl = app.modules.sale.saleCtrl
    app.get('/api/listsale', saleCtrl.listsale);
    app.post('/api/createsale', saleCtrl.createsale);
    app.put('/api/updatesale', saleCtrl.updatesale); 
    app.delete('/api/deletesale', saleCtrl.deletesale);
}
  