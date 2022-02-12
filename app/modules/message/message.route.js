module.exports = function (app) {
    const messageCtrl = app.modules.message.messageCtrl
    app.get('/api/listMessage',messageCtrl.listMessage);
    app.post('/api/createMessage',messageCtrl.createMessage);
}
  
  