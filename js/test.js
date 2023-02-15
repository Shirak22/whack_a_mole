//CREATING THE GAME 
// --- GENERATING THE HOLES 
let main = document.querySelector('main');

//Global variable  result 
// create Holes UI + addEventListener 
//create random Hole and render UI by adding and deleting [ mole class] (interval)
//Check if the clicked hole is the right one 
//if is right generate code { global score++ , and add hit class }
// render the game again 

let score = 0; 
let speed = 5000; 
let Holes = []; 
let randomHole = 0;

async function Game(){
    main.innerHTML = ''; 
    console.log('start....');
    let create = await createHolesPromise();
    create();
  
    let articles = document.querySelectorAll('main > article');
    articles.forEach(article =>{
        article.addEventListener('click', returnID);
    });

    let myInterval = setInterval(roundLoop, speed);
}



function roundLoop(){
    randomHole = random(23,0); 
    console.log('random', randomHole);
    
}

function returnID(e){
  let clickedId =   e.target.getAttribute('data-id');
  if(clickedId == randomHole){
        console.log('bingooooooooooo');
        score++;
        document.querySelector('.moleswhacked').innerHTML = score;
  }
}

//returns random rounded value between range between MAX and MIN 
function random(min, max){
    return Math.round(Math.random()* (max-min) + min); 
}

function createHolesPromise(){
    let promies = new Promise((res,rej)=>{
        res(()=>{
            
                for (let index = 0; index < 24; index++) {
                    let article = document.createElement('article');
                    article.setAttribute('data-id', index);
                    main.appendChild(article);  
                }
            });
            
        
    });

    return promies; 
}

Game();