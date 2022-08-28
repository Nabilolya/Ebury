import { LightningElement, track,wire,api  } from 'lwc';
import createTrade from '@salesforce/apex/TradeService.createTrade';
import ApiCall from "@salesforce/apex/FixerIOCaller.ApiCall";

export default class CurrencyCalculator extends LightningElement {

    @track BuyDropDownSelected = false;
    @track SellDropDownSelected = false;
    @track value1;
    @track value2;
    @track RateValue;
    @track WanetdValue;
    @track FinalAmount = 0;
    @track date;
    @track exchange;
    @track result;
    @api isShowModal = false;
    @track error;

    get options() {
        return [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
        ];
    }

 // will be accessible from the other componenet so it must be public
  @api
    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }

    handleChangeBuy(event) {
        this.BuyDropDownSelected = true;
        this.value1 = event.detail.value;
        // Check Sell and Buy combobox are chosed and also the WantedValue for money
        if (this.BuyDropDownSelected && this.SellDropDownSelected && this.WanetdValue != null) {
            this.CallData();
        }
    }

    handleChangeSell(event) {
        this.SellDropDownSelected = true;
        this.value2 = event.detail.value;
        // Check Sell and Buy combobox are chosed and also the WantedValue for amount wanted
        if (this.BuyDropDownSelected && this.SellDropDownSelected && this.WanetdValue!=null) {
            this.CallData();
        }
    }

    handleClickCreate(event) {
        this.clickedButtonLabelCreate = event.target.label;
        this.FinalAmount = this.RateValue * this.WanetdValue;
        // Format the now date, i can refactor it to an extern method
        let rightNow = new Date();
        rightNow.setMinutes(
            new Date().getMinutes() - new Date().getTimezoneOffset()
        );
        let yyyyMmDd = rightNow.toISOString().slice(0, 10);
        let yyyyMmDd1 = rightNow.toISOString().slice(11, 19);
        this.date = yyyyMmDd + ' ' + yyyyMmDd1;
        // The object to be send to backedn ( Apex method )
        this.exchange=
        {
            SellCurrency:this.value2,
            SellAmount:this.WanetdValue,
            BuyCurrency: this.value1,
            BuyAmount:this.result,
            Rate:this.RateValue,
            DateBooked:this.date
        };
        
       // Create a new trade by calling the apex method
        createTrade({exchange: JSON.stringify(this.exchange)})
            .then(result => { 
                console.log('Submitted');
         }) .catch(error => {
            this.error = error;
        }
       );
    }

    handleClickCancel(event) {
        this.clickedButtonLabelCancel = event.target.label;
    }

    handleChangeInput(event) {
        this.WanetdValue = event.target.value;
        // Check Sell and Buy combobox are chosed and also the WantedValue for money
        if (this.BuyDropDownSelected && this.SellDropDownSelected &&  this.WanetdValue!=null ){
            this.CallData();
        }
    }

    // Call method responsible for fixerIO data
    CallData() {
        ApiCall({ to: 'eur' , fromm: 'usd', amount: '3' })
            .then(data => { 
                this.result = data.result;
                this.RateValue = data.info.rate;
        }) .catch(error => {
            this.error = error;
        }
       );
	}
 
}