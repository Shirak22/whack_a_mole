import {Game} from './GameEngine.js';
//DECLARING THE GAME 
let newGame = new Game(24);

// gameSetup triggers one time to initialize the game
async function gameSetup() {

    //everything waiting the holes to be created 
    await newGame.createHoles();
    //THE LOOP FUNCTION 
    let myInterval = setInterval(gameLoop, 30);
}

function gameLoop() {
    // game loop that runs frame after frame  60 frames per seconds  in default
    newGame.update();
}

gameSetup();

