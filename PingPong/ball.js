
// ball object
const ball = {
    x: 275,
    y: 250,
    radius: 10,
    color: "yellow"
};

// 공을 그려줌
export function drawBall(ctx){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();
}


// 공 충돌 감지
export function collision(){


}