
module.exports = function (app) {
    const assetCtrl = app.modules.asset.assetCtrl 
    app.get('/api/asset', assetCtrl.list);
    app.get('/api/searchAsset', assetCtrl.searchAsset);
    app.post('/api/createAsset', assetCtrl.createAsset);
    app.get('/api/listasset', assetCtrl.listasset);
    app.delete('/api/deleteAsset/:_id', assetCtrl.deleteAsset);
    app.put('/api/updateAsset/:_id', assetCtrl.updateAsset);
    app.get('/api/listassetFree', assetCtrl.listassetFree);
    app.post('/api/reportasset', assetCtrl.AssetReport);
    // app.get('/api/getSearchDateAsset', assetCtrl.getSearchDateAsset);
  }
  
   