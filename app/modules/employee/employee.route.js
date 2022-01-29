
module.exports = function (app) {
    const employeeCtrl = app.modules.employee.employeeCtrl
    app.get('/api/employee', employeeCtrl.list);
    app.get('/api/searchEmployee', employeeCtrl.searchEmployee);
    app.post('/api/createEmployee', employeeCtrl.createEmployee);
    app.get('/api/listemployee', employeeCtrl.listemployee);
    app.delete('/api/deleteEmployee/:_id', employeeCtrl.deleteEmployee);
    app.put('/api/updateEmployee/:_id', employeeCtrl.updateEmployee);
    app.post('/api/employeeReport', employeeCtrl.employeeReport);

  }