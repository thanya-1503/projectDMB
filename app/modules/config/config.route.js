
module.exports = function (app) {
    const configCtrl = app.modules.config.configCtrl
  
    app.get('/api/config', configCtrl.list);
    
  }