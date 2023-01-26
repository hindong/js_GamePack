import { movePlayer, playerDraw } from "./player.js";

const canvas = document.querySelector("#main");
const ctx = canvas.getContext("2d");

const player = {
    xPos: 580,
    yPos: 500
};

const computer = {
    xPos: 10,
    yPos: 10,
}

// computer
playerDraw(computer, ctx);

// human
playerDraw(player, ctx);


document.addEventListener('keydown', (e) =>{
    if(e.code){
        console.log(e.code);
        movePlayer(player, ctx, e.code);
    }
})






