//TOOLS FUNCTION 
//returns random rounded value between range between MAX and MIN 
function random(min, max){
    return Math.round(Math.random()* (max-min) + min); 
}


export {random} ;