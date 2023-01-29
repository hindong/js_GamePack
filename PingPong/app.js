import { movePlayer, playerDraw } from "./player.js";

const canvas = document.querySelector("#main");
const ctx = canvas.getContext("2d");

const player = {
    xPos: 530,
    yPos: 450,
    move: true,
};

const computer = {
    xPos: 10,
    yPos: 10,
    move: true,
}

// computer
playerDraw(computer, ctx);

// human
playerDraw(player, ctx);

setTimeout(() => {
    document.addEventListener('keypress', (e) =>{
        if(e.code){
            console.log(e.code);
            
            movePlayer(player, ctx, e.code);
        }
    })    
}, 50);







