module.exports = function (app) {
    const likeUserCtrl = app.modules.likeUser.likeUserCtrl
    app.get('/api/listLikeUser',likeUserCtrl.listLikeUser);
    app.post('/api/createLikeUser',likeUserCtrl.createLikeUser);
    // app.post('/api/whereListlike',likeUserCtrl.whereListlike);
    app.post('/api/whereListlike',likeUserCtrl.whereListlike);
    app.delete('/api/deleteLike/:id_likeuser', likeUserCtrl.deleteLike);
    app.put('/api/updateLike/:id_likeuser', likeUserCtrl.updateLike);
    app.post('/api/whereMatch',likeUserCtrl.whereMatch);
    app.post('/api/whereChatSender',likeUserCtrl.whereChatSender);
    app.post('/api/whereChatReceivet',likeUserCtrl.whereChatReceivet);

    app.post('/api/whereCListChat',likeUserCtrl.whereCListChat);
    app.post('/api/messageChat',likeUserCtrl.messageChat);
    app.post('/api/search',likeUserCtrl.search);
    app.post('/api/searchListChat',likeUserCtrl.searchListChat);

    
    
}
  
  