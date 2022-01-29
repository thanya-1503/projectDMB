module.exports = function (app) {
    const emailCtrl = app.modules.email.emailCtrl
    app.post('/api/sentemail', emailCtrl.sentemail);
    app.post('/api/sentemailOtp', emailCtrl.sentemailOtp);
  }