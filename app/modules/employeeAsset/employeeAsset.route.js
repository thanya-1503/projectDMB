
module.exports = function (app) {
    const employeeAssetCtrl = app.modules.employeeAsset.employeeAssetCtrl
    app.get('/api/employeeAsset', employeeAssetCtrl.list);
    app.post('/api/createEmpAsset', employeeAssetCtrl.createEmpAsset);
    app.put('/api/updateEmpAsset/:_id', employeeAssetCtrl.updateEmpAsset);
    app.delete('/api/deleteEmpAsset/:_id', employeeAssetCtrl.deleteEmpAsset);
    app.post('/api/listEmpUseAsset', employeeAssetCtrl.listEmpUseAsset);
    app.post('/api/listUseAsset', employeeAssetCtrl.listUseAsset);
    app.post('/api/listUseEmp', employeeAssetCtrl.listUseEmp);
    app.post('/api/listDeleteAsset', employeeAssetCtrl.listDeleteAsset);
    app.post('/api/ChandeStatusAsset', employeeAssetCtrl.ChandeStatusAsset);
  }