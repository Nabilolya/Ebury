public with sharing class TradeServiceWrapper {

    @auraenabled
    public String SellCurrency{get;set;}
    @auraenabled
    public String SellAmount{get;set;}
    @auraenabled
    public String BuyCurrency{get;set;}
    @auraenabled
    public String BuyAmount{get;set;}
    @auraenabled
    public String Rate{get;set;}
    @auraenabled
    public String DateBooked{get;set;}
   
    public TradeServiceWrapper() {
    }
}
