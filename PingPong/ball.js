import {canvas, ctx} from './app.js';

// ball object
export const ball = {
    x: 275,
    y: 250,
    radius: 10,
    color: "yellow",
    dx: 5,  // 공의 x방향 이동속도 
    dy: 5,  // 공의 y방향 이동속도
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
    // 공 충돌 감지
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    drawBall();
}

export function animate(){
    moveBall();
    requestAnimationFrame(animate);
}

// 공 충돌 감지
export function collision(){

}