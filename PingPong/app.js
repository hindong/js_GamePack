import { movePlayer, playerDraw } from "./player.js";
import { drawBall } from "./ball.js";

const canvas = document.querySelector("#main");
export const ctx = canvas.getContext("2d");

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

// user
playerDraw(player, ctx);
drawBall();

setTimeout(() => {
    document.addEventListener('keypress', (e) =>{
        if(e.code){
            movePlayer(player, ctx, e.code);
        }
    })    
}, 50);









