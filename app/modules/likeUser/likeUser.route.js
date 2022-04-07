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
    app.post('/api/searchType',likeUserCtrl.searchType);
    app.post('/api/searchGender',likeUserCtrl.searchGender);
    app.post('/api/searchProvince',likeUserCtrl.searchProvince);
    app.post('/api/searchAge',likeUserCtrl.searchAge);
    app.post('/api/searchHeight',likeUserCtrl.searchHeight);
    app.post('/api/searchAll',likeUserCtrl.searchAll);
    app.post('/api/searchTypeGender',likeUserCtrl.searchTypeGender);
    app.post('/api/searchTypeProvince',likeUserCtrl.searchTypeProvince);
    app.post('/api/searchTypeAge',likeUserCtrl.searchTypeAge);
    app.post('/api/searchTypeHeight',likeUserCtrl.searchTypeHeight);
    app.post('/api/searchGenderProvince',likeUserCtrl.searchGenderProvince);
    app.post('/api/searchGenderProvince',likeUserCtrl.searchGenderProvince);
    app.post('/api/searchGenderAge',likeUserCtrl.searchGenderAge);
    app.post('/api/searchGenderHeight',likeUserCtrl.searchGenderHeight);
    app.post('/api/searchProvinceAge',likeUserCtrl.searchProvinceAge);
    app.post('/api/searchProvinceHeight',likeUserCtrl.searchProvinceHeight);
    app.post('/api/searchAgeHeight',likeUserCtrl.searchAgeHeight);    
  
    app.post('/api/searchTGP',likeUserCtrl.searchTGP);
    app.post('/api/searchTGA',likeUserCtrl.searchTGA);
    app.post('/api/searchTGH',likeUserCtrl.searchTGH);
    app.post('/api/searchGPA',likeUserCtrl.searchGPA);
    app.post('/api/searchGPH',likeUserCtrl.searchGPH);    
    app.post('/api/searchPAH',likeUserCtrl.searchPAH);    
   
}
  
  