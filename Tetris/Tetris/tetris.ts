// import BLOCKS from './blocks'

const gameBoard = document.querySelector(".game_board > ul") as Element;

const GAME_ROWS: Number = 20;
const GAME_COLS: Number = 10;

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
    tMino: [
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ],
    square: [
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
    ],
    bar:  [
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
    ],
    zee: [
        [[0,0],[1,0],[1,1],[2,1]],
        [[0,1],[1,0],[1,1],[0,2]],
        [[0,1],[1,1],[1,2],[2,2]],
        [[2,0],[2,1],[1,1],[1,2]],
    ],
    elLeft: [
        [[0,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[0,2]],
        [[0,1],[1,1],[2,1],[2,2]],
        [[1,0],[2,0],[1,1],[1,2]],
    ],
    elRight: [
        [[1,0],[2,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[0,2],[1,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,1],[2,2]],
    ],
}

const movingItem = {
    type: "tMino",  // 블록의 이름
    direction: 1,   // 블록의 현재 모양
    top: 0,         
    left: 0,
};

init();

// 게임시작 및 초기화
function init(){
    tempMovingItem = { ...movingItem };

    // 게임보드 생성
    for(let i = 0; i < 1; i++){
        prependNewLine();
    }

    renderBlocks();
}


// 게임보드 사이즈 할당
function prependNewLine(): void {
    for(let i = 0; i < GAME_ROWS; i++){
        const li = document.createElement("li");
        const ul = document.createElement("ul");
        
        for(let j = 0; j < GAME_COLS; j++){
            // 게임보드 가로길이
            const matrix = document.createElement("li");
            ul.prepend(matrix);
        }
        // 게임보드 세로 길이 
        li.prepend(ul);
        gameBoard.prepend(li);
    }
}


function renderBlocks(moveType = ""): void{
    const {type, direction, top, left} = tempMovingItem;

    // 움직였을때 남은 잔상을 지워주기 위해 moving class를 지워줌
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    });

    // 블록에 타입과 moving을 할당함
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        // 블록이 게임화면 밖으로 나갔을 경우 그려지 않음
        const target = gameBoard.childNodes[y] ? gameBoard.childNodes[y].childNodes[0].childNodes[x] as HTMLElement : null;
        
        const isAvailable = checkEmpty(target);
        
        if(isAvailable){
            target?.classList.add(type, "moving");
        }else{
            tempMovingItem = {...movingItem };
            
            // 이벤트 스택이 넘치는것을 방지하기 위한 처리
            setTimeout(() => {
                renderBlocks();
                if(moveType == "top"){
                    seizeBlock();
                }
            }, 0);

            // renderBlocks();
            return true;
        }   
    });
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

// 블록이 새로운 블록과 겹치는지 체크
// 블록이 제일 하단으로 내려와서 seized 상태면 false를 반환
function checkEmpty(target: HTMLElement | null): boolean{
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

// 블록이 고정되면 고정시키는 함수
function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    //블록이 고정되면 새로운 블록을 생성
    generateNewBlock();
}

//새로운 블록을 생성
function generateNewBlock(){
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    
    //랜덤블록 생성
    movingItem.type = blockArray[randomIndex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks();
}

// 블록을 회전시키는 함수
function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks();
}

function moveBlock(moveType, amount): void{
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

//event handling
//블록 조작 (방향키로 조작) 
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;
        default:
            break;
    }
});


/*
    개선 사항
    블록이 좌측 우측 끝에 있을경우 모양이 변하지 않음.
*/