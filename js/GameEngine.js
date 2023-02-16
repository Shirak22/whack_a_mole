import {random} from './functions.js';


class Hole {

    constructor(id,place){
        this.id = id;
        this.mainContainer = place;
    }
    render(){
        let article = document.createElement('article'); 
        article.setAttribute('data-id', this.id);
        this.mainContainer.appendChild(article);
    }

}

//Game creation and logic template 
class Game {
    constructor(numOfHoles){
        this.DOMEl = document.querySelector('.level');
        this.Moles = document.querySelector('.moleswhacked'); 
        this.mainContainer = document.querySelector('main'); 
        this.score = 0; 
        this.numOfHoles = numOfHoles;
        this.randomHole = this.randomHoleID();
        this.currentHole = null;   
        this.gameOver = false ; 
        this.gameSpeed = 0;
        this.timer = 60;
        this.level = 1;
        this.checkClick();
        this.count = 0;
        this.clicked = false; 
    }

    createHoles(){
        let promise = new Promise(res=>{
                for (let i = 0; i < this.numOfHoles; i++) {
                    let newHole = new Hole(i,this.mainContainer);
                    newHole.render();
                 }
                 res(); 
        });

        return promise; 
    }
    checkClick(){
    
        window.addEventListener('click',(e)=> {
            this.currentHole = e.target.getAttribute('data-id') ;
            
        });
    }

    randomHoleID(){
        return random(0,this.numOfHoles - 1 );
    }

    levels(){
          //game speed logic 
          switch (this.level) {
            case 1:
                this.gameSpeed = 50;
                break;
            case 2:
                this.gameSpeed = 40;
                break;
            case 3:
                this.gameSpeed = 30;
                break;
            case 4:
                this.gameSpeed = 20;
                break;
            case 5:
                this.gameSpeed = 15;
                break;
            case 6:
                this.gameSpeed = 10;
                break;

        }
    }

    logic(){
        //checking if the clicked Hole match the random one
       
        if(!this.clicked && parseInt(this.currentHole) === this.randomHole){
            this.mainContainer.querySelector(`[data-id = "${this.currentHole}"]`).classList.add('hit');
                this.score++;
                this.clicked = true;            
        }

        if(this.score > 10 && this.score < 20 ){
            this.level = 2; 
        }else if(this.score > 20 && this.score < 30 ){
            this.level = 3; 
        }else if(this.score > 30 && this.score < 40 ){
            this.level = 4; 
        }else if(this.score > 40&& this.score < 50 ){
            this.level = 5; 
        }else if(this.score > 50 && this.score < 60 ){
            this.level = 6; 
        }
        
        
        this.currentHole = null;
    }

    debug() {
        if(document.querySelector('#debugCheck').checked){
            document.querySelector('.debug').innerHTML = `
            <ul>
                <li><b>Score:</b> ${this.score} </li> 
                <li><b>Level:</b> ${this.level} </li> 
                <li><b>Random Hole:</b> ${this.randomHole} </li> 
                <li><b>clicked Hole:</b> ${this.currentHole} </li> 
                <li><b>game over:</b> ${this.gameOver} </li> 
                <li><b>gameSpeed:</b> ${this.gameSpeed} </li> 
                <li><b>Number of holes:</b> ${this.numOfHoles} </li> 
            </ul>
        
        ` ;
        }else {
            document.querySelector('.debug').innerHTML = '';
        }
   
    }

    renderScores(){
        this.Moles.innerHTML = `Whacked Moles: ${this.score}`;

    }

    renderRandomID(id){
        //clearing the mole list from every hole
        let data = this.mainContainer.querySelectorAll(`[data-id]`);
        data.forEach(e => {
            e.classList.remove('mole','hit');
        });


        this.mainContainer.querySelector(`[data-id = "${id}"]`).classList.add('mole');
    }
    update(){
        if(this.count > this.gameSpeed ){
            this.randomHole = this.randomHoleID();
            this.clicked = false;
            this.renderRandomID(this.randomHole);

            this.count = 0; 
        }
        
        this.DOMEl.innerText = `Level: ${this.level}`;
        this.debug();
        this.logic();
        this.levels();
        this.renderScores();
        this.count++;
    }

}//Game CLass 


export {Game,Hole}