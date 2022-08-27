public class JsonWrapper {
@AuraEnabled
public Boolean success;
@AuraEnabled
public Query query;
@AuraEnabled
public Info info ;
@AuraEnabled
public String result;

public class query {
    @AuraEnabled
    public Decimal amount;
}

public class info {
    @AuraEnabled
    public Decimal  rate; 
}

public static JsonWrapper parse(String json) {
    return (JsonWrapper) System.JSON.deserialize(json, JsonWrapper.class);
}
}
