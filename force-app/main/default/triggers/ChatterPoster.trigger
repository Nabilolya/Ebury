trigger ChatterPoster on Trade__c (after insert) {
    
       FeedItem post = new FeedItem();
       Trade__c NewTrade= Trigger.New[0];
        if(NewTrade!=null){
            post.ParentId = NewTrade.ID ; // RecordId
            post.Body ='Content:A new trade has been created with the following data: '+ UserInfo.getName()+' Sell Currency '+NewTrade.SellCurrency__c+
            +' SellAmount__c '+NewTrade.SellAmount__c +' BuyCurrency__c '+NewTrade.BuyCurrency__c+' BuyAmount '+NewTrade.BuyAmount__c 
            +' Rate '+NewTrade.Rate__c+' Date Booked '+NewTrade.DateBooked__c;
            insert post;
        }
}