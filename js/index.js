let mainContainer = document.querySelector('main'); 


//
class Hole {

    constructor(id){
        this.id = id; 
    }
    render(){
        let article = document.createElement('article'); 
        article.setAttribute('data-id', this.id);
        mainContainer.appendChild(article);
    }

}

//Game creation and logic template 

class Game {
    constructor(numOfHoles){
        this.score = 0; 
        this.numOfHoles = numOfHoles;
        this.randomHole = this.randomHoleID();
        this.currentHole = null;   
        this.gameOver = false ; 
        this.gameSpeed = 50;
        this.timer = 60;
        this.DOMEl = document.querySelector('.randomID');
        this.Moles = document.querySelector('.moleswhacked'); 
        this.checkClick();
        
        this.count = 0;
    }

    createHoles(){
        let promise = new Promise(res=>{
                for (let i = 0; i < this.numOfHoles; i++) {
                    let newHole = new Hole(i);
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
        return random(this.numOfHoles - 1, 0 );
    }

    logic(){
        //checking if the clicked Hole match the random one
        if(parseInt(this.currentHole) === this.randomHole){
            
            this.score++;
            this.currentHole = null; 
        }
        
        
    }

    debug() {
        document.querySelector('.debug').innerHTML = `
            <ul>
                <li><b>Score:</b> ${this.score} </li> 
                <li><b>Random Hole:</b> ${this.randomHole} </li> 
                <li><b>clicked Hole:</b> ${this.currentHole} </li> 
                <li><b>game over:</b> ${this.gameOver} </li> 
                <li><b>gameSpeed:</b> ${1 / this.gameSpeed} </li> 
                <li><b>Number of holes:</b> ${this.numOfHoles} </li> 
                <li><b>Timer:</b> ${this.timer} </li> 
            </ul>
        
        ` ;
    }

    renderUI(){
        this.Moles.innerHTML = `Moles: ${this.score}`;


    }

    update(){
        if(this.count > this.gameSpeed ){
            this.randomHole = this.randomHoleID();
            this.DOMEl.innerText = this.randomHole;
            
            this.count = 0; 
        }
        this.debug();
        this.logic();
        this.renderUI();
        this.count++;
    }

}//Game CLass 





//DECLARING THE GAME 
let newGame = new Game(4);
async function gameSetup(){
        // gameSetup triggers one time to initialize the game
        //everything waiting the holes to be created 
        await  newGame.createHoles();


        //THE LOOP FUNCTION 
        let myInterval = setInterval(gameLoop,30);
}
    



function gameLoop(){
    // game loop that runs frame after frame  60 frames per seconds  in default
    newGame.update();
}


gameSetup();

//TOOLS FUNCTION 
//returns random rounded value between range between MAX and MIN 
function random(min, max){
    return Math.round(Math.random()* (max-min) + min); 
}
