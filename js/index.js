import {Game} from './GameEngine.js';
import Timer from './timer.js';
import {random,gameSettings,saveState}  from './functions.js';


//DECLARING THE GAME 
let userName = document.querySelector('.userName');
let timeLeftDom = document.querySelector('.timeleft');
let timerDom = document.querySelector('.timer');

let list = document.querySelector('.list');
let newGame;
let timeLeft;
let timer; 
let userData;
let myInterval;


// gameSetup triggers one time to initialize the game
async function gameSetup() {

        userData = await gameSettings();  // returns user object
        newGame = new Game(userData.holesNum);
        userName.innerHTML = 'Hello ' + userData.name + '!';
        timeLeft = new Timer();
        timer = new Timer();
        await newGame.createHoles(); //everything waiting the holes to be created 
        myInterval = setInterval(gameLoop, 30);  //THE LOOP FUNCTION / frames update
    
    

  }


// game loop that runs frame after frame  60 frames per seconds  in default
function gameLoop() {
    let timeleft =  timeLeft.countDown(userData.count);//setting count down timer 
    let timerSpending =  timer.timeSpent();//setting count down timer 
    timeLeftDom.innerHTML = 'Time left: ' + timeleft + 's';
    timerDom.innerHTML = 'Time spendig: ' + timerSpending + 's';
    newGame.update();
}

gameSetup();

