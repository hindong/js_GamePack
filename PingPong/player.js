
const speed = 20;
const keyUp = "KeyW";
const keyDown = "KeyS";
const playerWidth = 10;
const playerHeight = 70;


export function drawPlayer(player, ctx){
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(player.xPos, player.yPos, playerWidth, playerHeight);
    ctx.closePath();    
    // draw 최적화
    requestAnimationFrame(drawPlayer);
}

// 키를 누르면 플레이어 움직임 (방향키)
// key -  w : up , s : down
export function movePlayer(player, ctx, e){
    
    if(e == keyDown){
        clear(player, ctx);
        
        if(player.yPos < 450){
            player.yPos += speed;
        }
        
        drawPlayer(player, ctx);
    }else if(e == keyUp){
        clear(player, ctx);
        
        if(player.yPos > 20){
            player.yPos -= speed;
        }
        
        drawPlayer(player, ctx);
    }
}

// canvas 잔상을 지워주는 함수
export function clear(object, ctx){
    ctx.clearRect(object.xPos, object.yPos, playerWidth, playerHeight);
    ctx.closePath();
}


