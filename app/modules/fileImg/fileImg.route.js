module.exports = function (app) {
    const fileImgCtrl = app.modules.fileImg.fileImgCtrl
    app.get('/api/fileImg', fileImgCtrl.list);
    app.post('/api/createFileImg', fileImgCtrl.createFileImg);
  }