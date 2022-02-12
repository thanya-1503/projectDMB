module.exports = function (app) {
    const likeUserCtrl = app.modules.likeUser.likeUserCtrl
    app.get('/api/listLikeUser',likeUserCtrl.listLikeUser);
    app.post('/api/createLikeUser',likeUserCtrl.createLikeUser);
    // app.post('/api/whereListlike',likeUserCtrl.whereListlike);
    app.post('/api/whereListlike',likeUserCtrl.whereListlike);
    app.delete('/api/deleteLike/:id_likeuser', likeUserCtrl.deleteLike);
}
  
  