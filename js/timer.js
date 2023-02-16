export default class Timer {
    constructor(){
        this.previousTime = Date.now();
    }

    timeSpent(){
        let now = Math.round((Date.now() - this.previousTime)/1000); 
        return now; 
    }


    countDown(timeLimit){
        let result;
        this.timeLimit = timeLimit;
        let now = Math.round((Date.now() - this.previousTime)/1000); 
        let count = this.timeLimit - now ; 
        result = count > 0 ? count : 'Time Out' ;
            return result ; 
    }


 }