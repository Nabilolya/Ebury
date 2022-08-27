public with sharing class AccountService {

    @AuraEnabled
    public static List<Trade__c> ReturnTrades(){
        
       List<Trade__c> trades= [select SellCurrency__c, SellAmount__c,BuyCurrency__c,BuyAmount__c,Rate__c,DateBooked__c from Trade__c order by createdDate desc];
       if( trades.size() != 0){
        return trades;
       }
       return null;
    }

    @AuraEnabled
    public static void createAccountContact(string exchange)
    {
        if(exchange!=null){
        Trade__c tr= new Trade__c();
        AccountWrapper exchangew=(AccountWrapper)JSON.deserialize(exchange,AccountWrapper.class);
        Trade__c Lasttrade= [select Id__c from Trade__c order by createdDate desc limit 1];

        if(Lasttrade!=null)
        {
            tr.Id__c=IdFormatter(Lasttrade.Id__c);
     
        } else{
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

    public static String IdFormatter(String CurrentId){

        String resu = CurrentId.substring(2,CurrentId.length());
        Integer i=0;
        Boolean breaker=false;

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

       for (Integer  k=0;k<i;k++){
            zeros= zeros+'0';
        }

       finalres=zeros+finalres;
       return finalres;
    }
}
