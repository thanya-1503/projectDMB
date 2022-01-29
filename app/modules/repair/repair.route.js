module.exports = function (app) {
    const repairCtrl = app.modules.repair.repairCtrl
    app.get('/api/listrepair', repairCtrl.listrepair);
    app.post('/api/createRepair', repairCtrl.createRepair);
    app.post('/api/repairasset', repairCtrl.repairasset);
    app.put('/api/updateRepair/:_id', repairCtrl.updateRepair); 
    app.delete('/api/deleteRepair/:_id', repairCtrl.deleteRepair);
}
  
   