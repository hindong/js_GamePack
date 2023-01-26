
const speed = 4;

export function playerDraw(player, ctx){
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(player.xPos, player.yPos, 10, 50);
}

// 키를 누르면 플레이어 움직임 (방향키)
// key: ArrowDown , ArrowUp
export function movePlayer(player, ctx, e){
    if(e == "ArrowDown"){
        player.yPos += speed;
        playerDraw(player, ctx);
    }
    if(e == "ArrowUp"){
        player.yPos -= speed;
        playerDraw(player, ctx);
    }   
}
