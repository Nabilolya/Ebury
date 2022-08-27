import { LightningElement, track,wire,api  } from 'lwc';
import createAccountContact from '@salesforce/apex/AccountService.createAccountContact';
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

    get options() {
        return [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
        ];
    }

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
        if (this.BuyDropDownSelected && this.SellDropDownSelected &&  this.WanetdValue!=null ){
            console.log('both selected from buy');
        }
    }

    handleChangeSell(event) {
        this.SellDropDownSelected = true;
        this.value2 = event.detail.value;
        if (this.BuyDropDownSelected && this.SellDropDownSelected && this.WanetdValue!=null) {
            console.log('both selected from sell');
        }
    }

    handleClickCreate(event) {
        console.log('rah khdam 1');
        this.clickedButtonLabelCreate = event.target.label;
        this.FinalAmount = this.RateValue * this.WanetdValue;
        let rightNow = new Date();
        rightNow.setMinutes(
            new Date().getMinutes() - new Date().getTimezoneOffset()
        );
        let yyyyMmDd = rightNow.toISOString().slice(0, 10);
        let yyyyMmDd1 = rightNow.toISOString().slice(11, 19);
        this.date=yyyyMmDd+' '+yyyyMmDd1;
        this.exchange=
        {
            SellCurrency:this.value2,
            SellAmount:this.WanetdValue,
            BuyCurrency: this.value1,
            BuyAmount:this.result,
            Rate:this.RateValue,
            DateBooked:this.date
        };

        console.log('rah khdam 2');
        console.log('hahowa objet ' + JSON.stringify(this.exchange));
        console.log('hahowa objet '+ this.exchange);
        createAccountContact({exchange: JSON.stringify(this.exchange)})
        .then(result => { console.log('rah khdam 3');
            console.log('Data:' + JSON.stringify(result));
        }) .catch(error => {
            console.log(error);
            console.log('rah khdam 4');
            this.error = error;
        }
       );
    }

    handleClickCancel(event) {
        this.clickedButtonLabelCancel = event.target.label;
    }

    handleChangeInput(event) {
        this.WanetdValue = event.target.value;
        if (this.BuyDropDownSelected && this.SellDropDownSelected &&  this.WanetdValue!=null ){
            console.log('both selected from Input');
            this.CallData();
        }
    }

    CallData() {
        ApiCall({ to: 'eur' , fromm: 'usd', amount: '3' })
            .then(data => {
               var allTBGContacts = JSON.stringify(data);
             
                console.log('this is my data ' + data.result);
                this.result = data.result;
                this.RateValue = data.info.rate;
                console.log('this is my res ' + this.result);
                console.log('this is my rate ' + data.info.rate);
                console.log(' this is my info ' + allTBGContacts);
            })
	}



    


 
}