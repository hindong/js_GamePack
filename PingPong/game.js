import {canvas, ctx} from "./app.js";

// const keyUp = "KeyW";
// const keyDown = "KeyS";

const keyCode = {
    keyUp: "KeyW",
    keyDown: "KeyS",
    keyESC: "Escape",
}

const speed = 15;


// ball object
const ball = {
    xPos: 275,
    yPos: 250,
    radius: 10,
    color: "yellow",
    dx: 3,              // 공의 x방향 이동속도 
    dy: 3,              // 공의 y방향 이동속도
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

// 데이터 초기화
function initGame(){

    registerEventListeners();   // 이벤트 리스너 초기화

}

// 게임 시작
export function gameStart(){
    initGame();
    requestAnimationFrame(update);

}

// 게임 업데이트
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    moveBall();              // 공을 움직임
    drawPlayer(computer);    // computer를 다시 그림
    drawPlayer(player);      // player를 다시 그림
    requestAnimationFrame(update);
}


function drawPlayer(player){
    ctx.beginPath();
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
    ctx.closePath();    
}


// 키를 누르면 플레이어 움직임 (방향키)
// key -  w : up , s : down
function movePlayer(player, code){

    if(code === keyCode.keyDown){
        if(player.yPos < 450){
            player.yPos += speed;
        }
        
    }else if(code === keyCode.keyUp){
        if(player.yPos > 20){
            player.yPos -= speed;
        }
        
    }
}

// 공을 그려줌
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.xPos, ball.yPos, ball.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();

}

// 공의 움직임
function moveBall(){
    // 공 충돌 감지
    // x 충돌
    if (ball.xPos + ball.dx > canvas.width - ball.radius || ball.xPos + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    // y 충돌 
    if (ball.yPos + ball.dy > canvas.height - ball.radius || ball.yPos + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    ball.xPos += ball.dx;
    ball.yPos += ball.dy;
    
    drawBall();
}

// 공 충돌 감지
function collisionDetection(){

}

// 이벤트 리스너 등록
function registerEventListeners(){
    document.addEventListener('keydown', (e) => {
        
        if(e.code === keyCode.keyUp || e.code === keyCode.keyDown){
            movePlayer(player, e.code);
        }

    });

    //...do something
}


function initTitle(){
    //...
}
