//TOOLS FUNCTION 
//returns random rounded value between range between MAX and MIN 
function random(min, max){
    return Math.round(Math.random()* (max-min) + min); 
}


//return promise of user info
function gameSettings(){
    let name = prompt('Please write your name:');
    let count = parseInt(prompt('Count down timer in Seconds?', 60));
    let holes = parseInt(prompt('Number of holes ', 12));
    let user = {
        name: !!name ? name : 'Beautiful' ,
        count: !!count && count < 200 ? count : 60 ,
        holesNum: !!holes && holes < 24 ? holes : 24 
    };
    return user;
}

function saveState(user){
    localStorage.setItem('user',JSON.stringify(user)); 
}



export {random,gameSettings,saveState} ;