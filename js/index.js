import {Game} from './GameEngine.js';
import Timer from './timer.js';

//DECLARING THE GAME 
let timeSpentDom = document.querySelector('.timer');
let timeLeftDom = document.querySelector('.timeleft');
let newGame = new Game(24);
let timeSpent;
let timeLeft;
let myInterval;









// gameSetup triggers one time to initialize the game
async function gameSetup() {
    
    await newGame.createHoles(); //everything waiting the holes to be created 
    timeSpent = new Timer(timeSpentDom);
    timeLeft = new Timer(timeLeftDom);
    myInterval = setInterval(gameLoop, 30);  //THE LOOP FUNCTION 
}




function gameLoop() {
    // game loop that runs frame after frame  60 frames per seconds  in default
    timeSpentDom.innerHTML = 'Time spent: ' + timeSpent.timeSpent();
    timeLeftDom.innerHTML = 'Time left: ' + timeLeft.countDown(10);
    
    newGame.update();
}

gameSetup();



 