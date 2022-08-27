import { LightningElement, track } from 'lwc';
import ReturnTrades from '@salesforce/apex/AccountService.ReturnTrades';

const columns = [
    { label: 'Sell Currency', fieldName: 'SellCurrency__c' },
    { label: 'Sell Amount', fieldName: 'SellAmount__c' },
    { label: 'BuyCurrency', fieldName: 'BuyCurrency__c' },
    { label: 'BuyAmount', fieldName: 'BuyAmount__c' },
    { label: 'Rate', fieldName: 'Rate__c' },
    { label: 'DateBooked', fieldName: 'DateBooked__c' },
];

export default class TradesLister extends LightningElement {

    data = [];
    columns = columns;

    showModalBox() {
        const modal = this.template.querySelector('c-currency-Calculator');
         modal.showModalBox();
        console.log('pop up is showed 2');
     }

    connectedCallback() {
        console.log('Hello moto ');
        this.CallTrades();
     }
    
    CallTrades() {
         ReturnTrades()
        .then(data => {    
        var allTBGContacts = JSON.stringify(data);
        console.log('this is allTBAccts  ' + allTBGContacts);
        console.log('this is normal data ' + data);
        this.data = data;
                      }
             )
    }
}