module.exports = function (app) {
    const siteCtrl = app.modules.site.siteCtrl
    app.get('/api/site', siteCtrl.list);
    app.post('/api/createSite', siteCtrl.createSite);
    app.put('/api/updateSite/:_id', siteCtrl.updateSite);
    app.delete('/api/deleteSite/:_id', siteCtrl.deleteSite);
  }
  
  