import {canvas, ctx} from "./app.js";

const keyUp = "KeyW";
const keyDown = "KeyS";
const speed = 15;


// ball object
export const ball = {
    x: 275,
    y: 250,
    radius: 10,
    color: "yellow",
    dx: 2,  // 공의 x방향 이동속도 
    dy: 2,  // 공의 y방향 이동속도
};

const player = {
    xPos: 530,
    yPos: 450,
    width:10,
    height:70,
    move: true,
};

const computer = {
    xPos: 10,
    yPos: 10,
    width:10,
    height:70,
    move: true,
}

// 게임 시작
export function start(){
    drawPlayer(computer);       // computer 
    drawPlayer(player);         // player
    drawBall();

    document.addEventListener('keydown', (e) => {
        if(e.code === "KeyW" || e.code === "KeyS"){
            movePlayer(player, e.code);
        }
    });    

    requestAnimationFrame(update);
}

// 게임 업데이트
function update(){
    moveBall();              // 공을 움직임
    drawPlayer(computer);    // computer를 다시 그림
    drawPlayer(player);      // player를 다시 그림
    requestAnimationFrame(update);
}


export function drawPlayer(player){
    ctx.beginPath();
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
    ctx.fill();
    ctx.closePath();    
    // draw 최적화
    requestAnimationFrame(drawPlayer);
}


// 키를 누르면 플레이어 움직임 (방향키)
// key -  w : up , s : down
export function movePlayer(player, e){
    
    if(e == keyDown){
        clear(player);
        
        if(player.yPos < 450){
            player.yPos += speed;
        }
        
        drawPlayer(player);
    }else if(e == keyUp){
        clear(player);
        
        if(player.yPos > 20){
            player.yPos -= speed;
        }
        
        drawPlayer(player);
    }
}

// canvas 잔상을 지워주는 함수
export function clear(object){
    ctx.clearRect(object.xPos, object.yPos, object.width, object.height);
    ctx.closePath();
}


// 공을 그려줌
export function drawBall(){
    // 이전 위치를 지워줌
    ctx.clearRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);

    // 공을 그림
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();

}

// 공의 움직임
export function moveBall(){
    //ctx.clearRect(0,0,canvas.width,canvas.height);

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

// 공 충돌 감지
export function collision(){

}

function clearBall(){
    ctx.beginPath();
    ctx.arc();
    ctx.fill();
}
