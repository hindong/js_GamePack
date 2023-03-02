import { movePlayer, drawPlayer } from "./player.js";
import { drawBall, moveBall, animate } from "./ball.js";

export const canvas = document.querySelector("#main");
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
drawPlayer(computer, ctx);

// user
drawPlayer(player, ctx);
drawBall();


animate();

setTimeout(() => {
    document.addEventListener('keypress', (e) =>{
        if(e.code){
            movePlayer(player, ctx, e.code);
        }
    })    
}, 50);











