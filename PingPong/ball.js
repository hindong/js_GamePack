import {ctx} from './app.js';

// ball object
export const ball = {
    x: 275,
    y: 250,
    radius: 10,
    color: "yellow"
};

// 공을 그려줌
export function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();
    console.log(ctx);
}

// 공의 움직임
export function moveBall(){
    //...
}

// 공 충돌 감지
export function collision(){
    //...
}