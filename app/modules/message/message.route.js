module.exports = function (app) {
    const messageCtrl = app.modules.message.messageCtrl
    app.get('/api/listMessage',messageCtrl.listMessage);
    app.post('/api/createMessage',messageCtrl.createMessage);
    app.delete('/api/deleteMsg/:id_message', messageCtrl.deleteMsg);
}
  
  