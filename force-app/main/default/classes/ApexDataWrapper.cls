public with sharing class ApexDataWrapper {

    public ApexDataWrapper() {
         String SellCurrency;
         String SellAmount;
         String BuyCurrency;
         String BuyAmount;
         String DateBooked;
    }
    
    public static ApexDataWrapper parse(String json) {
        return (ApexDataWrapper) System.JSON.deserialize(json, ApexDataWrapper.class);
    }
}
