import {canvas, ctx} from "./app.js";

let     gamePause = false;   // 게임 일시정지
const   speed = 15;
const   finishScore = 10;
const   leftPlayerScore = document.getElementById('ai_score');
const   rightPlayerScore = document.getElementById('player_score');
const   paddleHeight = 70;
const   paddleWidth = 10;

const keyCode = {
    keyUp: "KeyW",
    keyDown: "KeyS",
    keyESC: "Escape",
}

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
    width: paddleWidth,
    height: paddleHeight,
    move: true,
    score: 0,
    id: 1,
};

const computer = {
    xPos: 10,
    yPos: 10,
    width: paddleWidth,
    height: paddleHeight,
    move: true,
    score: 0,
    id: 0,
};

// 데이터 초기화
function initGame(){
    registerEventListeners();   // 이벤트 리스너 초기화
}

// 게임 시작
export function startGame(){
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


// *** (방향키) ***
// key -  w : up , s : down
function movePlayer(player, code){
    if(code === keyCode.keyDown && player.yPos < 450){
            player.yPos += speed;
        
    }else if(code === keyCode.keyUp && player.yPos > 20){
            player.yPos -= speed;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.xPos, ball.yPos, ball.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();

}

function moveBall(){
    
    // 공이 벽에 닿았을 때 점수를 계산 해준다.
    if (ball.xPos + ball.dx > canvas.width - ball.radius) {
        updateScore(computer.id);     // 오른쪽 벽에 닿았을 경우
    }else if(ball.xPos + ball.dx < ball.radius){
        updateScore(player.id);   // 왼쪽 벽에 닿았을 경우
    }
    
    // 패들에 닿았을 경우
    if (ball.yPos + ball.radius > player.yPos && 
        ball.yPos - ball.radius < player.yPos + paddleHeight && 
        ball.xPos - ball.radius < player.xPos + paddleWidth && 
        ball.xPos + ball.radius > player.xPos) {
        ball.dx = -ball.dx; // x방향으로 튕겨나오기
    }else if (ball.yPos + ball.radius > computer.yPos &&
            ball.yPos - ball.radius < computer.yPos + paddleHeight &&
            ball.xPos - ball.radius < computer.xPos + paddleWidth &&
            ball.xPos + ball.radius > computer.xPos) {
        ball.dx = -ball.dx; // x방향으로 튕겨나오기
    }

    // 공이 캔버스 y축 범위를 벗어났을때 
    if (ball.yPos + ball.dy > canvas.height - ball.radius || ball.yPos + ball.dy < ball.radius) {
        ball.dy = -ball.dy;         // 부호를 바꿔준다.
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
        }else if(e.code === keyCode.keyESC){
            gamePause = !gamePause;       // pause 상태를 toggle
            alert('Pause!');
        }
    });

}


function initTitle(){
    //...
}

// 점수 계산
function updateScore(id){
    switch(id){
        case 0:
            leftPlayerScore.innerText = ++computer.score;
            break;
        case 1:
            rightPlayerScore.innerText = ++player.score;
            break;
    }
    resetBall();
}

// 게임 종료
function gameOver(){
    
}

// 게임 재시작
function resumeGame(){

}

// 공 초기화
function resetBall(){
    ball.xPos = 275;
    ball.yPos = 250;
}

