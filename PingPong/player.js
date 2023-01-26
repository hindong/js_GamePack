
const speed = 4;
const keyUp = "KeyW";
const keyDown = "KeyS";

export function playerDraw(player, ctx){
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(player.xPos, player.yPos, 10, 50);
}

// 키를 누르면 플레이어 움직임 (방향키)
// key -  w : up , s : down
export function movePlayer(player, ctx, e){
    if(e == keyDown){
        clear(player, ctx);
        player.yPos += speed;
        playerDraw(player, ctx);
    }
    if(e == keyUp){
        clear(player, ctx);
        player.yPos -= speed;
        playerDraw(player, ctx);
    }   
}

// canvas 잔상을 지워주는 함수
export function clear(object, ctx){
    ctx.clearRect(object.xPos, object.yPos, 10, 50);
}