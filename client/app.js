import AppContract from './abi/TimeCapsule.json';

export default class App {
    constructor(web3) {
       this.web3 = web3;
       this.metamaskAccountID;
       this.appContract = new this.web3.eth.Contract(AppContract.abi, "0x7D1320354E7B9C30c610a415866D5019F409edB0");
       this.init()
    }
    
    init(){
        //Initialize all parameters
        this.getMetamaskAccountID();
        this.updateDate();
        this.updateTime();
    }

   async getMetamaskAccountID(){
        //Retrieve accounts
       let account = await this.web3.eth.getAccounts(function(err,res){
            if(err) {
                console.log('Eror: ',err);
                return;
            }
            console.log('getMetamaskID: ', res);
            return res[0];
        })
       this.metamaskAccountID = account;
    }

    updateDate(){
        let today = new Date();
        let d = String(today.getDate());
        let m = String(today.getMonth()+1);
        let y = String(today.getFullYear());
        today = `${y}-${m}-${d}`;
        //Update date field  
        let dateControl = document.querySelector('input[type="date"]');
        dateControl.value = today;
        dateControl.min = today;
    }

    updateTime(){
        let time = new Date();
        let h = time.getHours();
        let min = time.getMinutes();
        time = `${h}:${min}`;
        //Update time field
        let timeControl = document.querySelector('input[type="time"]');
        timeControl.value = time;
        timeControl.min = time;
    }

    async getTimeCapsule() {
        console.log('ARRIVED HERE')
    }

    async submitTimeCapsule() {
        let data
        let time 
       this.appContract.methods.submitTimeCapsule().send(); 
    }
}

