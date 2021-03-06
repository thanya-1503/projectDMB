
module.exports = function (app) {
    const userAccountCtrl = app.modules.userAccount.userAccountCtrl
    app.post('/api/authLogin', userAccountCtrl.authLogin);
    app.get('/api/userAccount', userAccountCtrl.list);
    app.get('/api/searchUserAccount', userAccountCtrl.searchUserAccount);
    app.post('/api/createAccount', userAccountCtrl.createAccount);
    app.post('/api/createAccountAdmin', userAccountCtrl.createAccountAdmin);
    app.put('/api/updateAccount/:_id', userAccountCtrl.updateAccount);
    app.delete('/api/deleteAccount/:_id', userAccountCtrl.deleteAccount);
    app.post('/api/whereUserforgotpass', userAccountCtrl.whereUserforgotpass);
    app.put('/api/forgotpassword', userAccountCtrl.forgotpassword);
    
    app.post('/api/checkpassword', userAccountCtrl.checkpassword);
    app.put('/api/editpassword', userAccountCtrl.editpassword);
    app.post('/api/checkCreateUser', userAccountCtrl.checkCreateUser);
    app.post('/api/viewAccouct', userAccountCtrl.viewAccouct);
    app.post('/api/createHistory', userAccountCtrl.createHistory);
    app.get('/api/listHistory', userAccountCtrl.listHistory);
    app.post('/api/viewAccouctHistory', userAccountCtrl.viewAccouctHistory);
    app.get('/api/listAll', userAccountCtrl.listAll);

    
  }
  
  