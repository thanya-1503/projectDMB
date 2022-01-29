module.exports = function (app) {
    const historyassetCtrl = app.modules.historyasset.historyassetCtrl
    app.get('/api/listHistoryasset',historyassetCtrl.listHistoryasset);
    app.post('/api/createHistoryasset',historyassetCtrl.createHistoryasset);
    app.post('/api/historyUsedAsset',historyassetCtrl.historyUsedAsset);
    // app.post('/api/historyUsedAssetNow',historyassetCtrl.historyUsedAssetNow);
}
  
  