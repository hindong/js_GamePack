
// ball object
const ball = {
    x: 0,
    y: 0,
    radius: 0,
    color: 0
};

// 공을 그려줌
export function drawBall(ctx){
    ctx.beginPath();
    ctx.arc(275, 250, 10,  0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
}


// 공 충돌 감지
export function collision(){


}