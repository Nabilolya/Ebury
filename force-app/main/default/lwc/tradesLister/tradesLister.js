import { LightningElement, track } from 'lwc';
import ReturnTrades from '@salesforce/apex/TradeService.ReturnTrades';

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
    @track error;
  
    // Show modal
    showModalBox() {
        const modal = this.template.querySelector('c-currency-Calculator');
         modal.showModalBox();

     }

    // Onload method to get the data from salesforce
    connectedCallback() {
        this.CallTrades();
     }
    
    // Method responsible for getting data
    CallTrades() {
        ReturnTrades()
              .then(data => {
                this.data = data;
            }).catch(error => {
                this.error = error;
            });
    }
}