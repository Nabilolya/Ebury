public with sharing class TradeService {

    // Get whole stored Trades in Salesforce ( will be also called from LWC componenet)
    @AuraEnabled
    public static List<Trade__c> ReturnTrades(){
        
       List<Trade__c> trades= [select SellCurrency__c, SellAmount__c,BuyCurrency__c,BuyAmount__c,Rate__c,DateBooked__c from Trade__c order by createdDate desc];
       if( trades.size() != 0){
        return trades;
       }
       return null;
    }

    // Create a new Trade in Salesforce ( will be also called from LWC componenet)
    @AuraEnabled
    public static void createTrade(string exchange)
    {
        if(exchange!=null){
        Trade__c tr= new Trade__c();
        TradeServiceWrapper exchangew=(TradeServiceWrapper)JSON.deserialize(exchange,TradeServiceWrapper.class);
        Trade__c Lasttrade= [select Id__c from Trade__c order by createdDate desc limit 1];

        if(Lasttrade!=null)
        {
            // Call the method responsible for formatting the ID
            tr.Id__c=IdFormatter(Lasttrade.Id__c);
     
        } else{
            // In case no record exists in salesforce for Trades
            tr.Id__c='TR0000000';
        }

        tr.SellCurrency__c=exchangew.SellCurrency;
        tr.SellAmount__c=Decimal.valueof(exchangew.SellAmount);
        tr.BuyCurrency__c=exchangew.BuyCurrency;
        tr.BuyAmount__c=Decimal.valueof(exchangew.BuyAmount);
        tr.Rate__c=Decimal.valueof(exchangew.BuyAmount);
        tr.DateBooked__c=exchangew.DateBooked;
        insert tr;
    } 
    }

    // Contains the algortihm responsible for formating the Trade Id (eg: TR0000525)
    public static String IdFormatter(String CurrentId){
       // Separate 'TR' from the rest of the number
        String resu = CurrentId.substring(2,CurrentId.length());
        Integer i=0;
        Boolean breaker=false;
       // Check how many zeros I have in the ID
        do{
          if(resu.length()-1==i ){
             i--;
             breaker=true;
          }else{
           i++; 
          }
        }while(resu.substring(i,i+1)=='0' && breaker==false);

       resu= resu.substring(i,7);
       Integer resInt= Integer.valueof(resu);
       resInt++;
       String finalres= String.valueOf(resInt);
       String zeros='TR';
   // Add zeros to the number
       for (Integer  k=0;k<i;k++){
            zeros= zeros+'0';
        }
// Add TR prefix to the final number
       finalres=zeros+finalres;
       return finalres;
    }
}
