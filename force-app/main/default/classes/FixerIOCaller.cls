public with sharing class FixerIOCaller {

    @AuraEnabled
    public static JsonWrapper  ApiCall(String to, String fromm,String amount){

        String URL= 'http://api.apilayer.com/fixer/convert?to='+to+'&from='+fromm+'&amount='+amount;
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(URL);
        req.setHeader('APIKEY', '3w8WQ5kHdt1iGOs7FBeTf5CiQVDcXbB4');
        Http http = new Http();

        try{
       HttpResponse res = new Http().send(req);
       //Executing web service call
       JsonWrapper  obj= new JsonWrapper();
       obj = JsonWrapper.parse(res.getBody());
       System.debug('This is before '+obj);
       return obj;
        }
        catch(System.CalloutException e){
            //Exception handling goes here..
            system.debug(e);
        }
        return null;
    }
}
