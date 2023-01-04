// import BLOCKS from './blocks'
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var gameBoard = document.querySelector(".game_board > ul");
var GAME_ROWS = 20;
var GAME_COLS = 10;
var score = 0;
var duration = 500;
var downInterval;
var tempMovingItem;
var BLOCKS = {
    tMino: [
        [[2, 1], [0, 1], [1, 0], [1, 1]],
        [[1, 2], [0, 1], [1, 0], [1, 1]],
        [[1, 2], [0, 1], [2, 1], [1, 1]],
        [[2, 1], [1, 2], [1, 0], [1, 1]],
    ],
    square: [
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
    ],
    bar: [
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
    ],
    zee: [
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 1], [1, 0], [1, 1], [0, 2]],
        [[0, 1], [1, 1], [1, 2], [2, 2]],
        [[2, 0], [2, 1], [1, 1], [1, 2]],
    ],
    elLeft: [
        [[0, 0], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [0, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]],
        [[1, 0], [2, 0], [1, 1], [1, 2]],
    ],
    elRight: [
        [[1, 0], [2, 0], [1, 1], [1, 2]],
        [[0, 0], [0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]],
    ]
};
var movingItem = {
    type: "tMino",
    direction: 1,
    top: 0,
    left: 0
};
init();
// 게임시작 및 초기화
function init() {
    tempMovingItem = __assign({}, movingItem);
    // 게임보드 생성
    for (var i = 0; i < 1; i++) {
        prependNewLine();
    }
    renderBlocks();
}
// 게임보드 사이즈 할당
function prependNewLine() {
    for (var i = 0; i < GAME_ROWS; i++) {
        var li = document.createElement("li");
        var ul = document.createElement("ul");
        for (var j = 0; j < GAME_COLS; j++) {
            // 게임보드 가로길이
            var matrix = document.createElement("li");
            ul.prepend(matrix);
        }
        // 게임보드 세로 길이 
        li.prepend(ul);
        gameBoard.prepend(li);
    }
}
function renderBlocks(moveType) {
    if (moveType === void 0) { moveType = ""; }
    var type = tempMovingItem.type, direction = tempMovingItem.direction, top = tempMovingItem.top, left = tempMovingItem.left;
    // 움직였을때 남은 잔상을 지워주기 위해 moving class를 지워줌
    var movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(function (moving) {
        moving.classList.remove(type, "moving");
    });
    // 블록에 타입과 moving을 할당함
    BLOCKS[type][direction].some(function (block) {
        var x = block[0] + left;
        var y = block[1] + top;
        // 블록이 게임화면 밖으로 나갔을 경우 그려지 않음
        var target = gameBoard.childNodes[y] ? gameBoard.childNodes[y].childNodes[0].childNodes[x] : null;
        var isAvailable = checkEmpty(target);
        if (isAvailable) {
            target === null || target === void 0 ? void 0 : target.classList.add(type, "moving");
        }
        else {
            tempMovingItem = __assign({}, movingItem);
            // 이벤트 스택이 넘치는것을 방지하기 위한 처리
            setTimeout(function () {
                renderBlocks();
                if (moveType == "top") {
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
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}
// 블록이 고정되면 고정시키는 함수
function seizeBlock() {
    var movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(function (moving) {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    //블록이 고정되면 새로운 블록을 생성
    generateNewBlock();
}
//새로운 블록을 생성
function generateNewBlock() {
    var blockArray = Object.entries(BLOCKS);
    var randomIndex = Math.floor(Math.random() * blockArray.length);
    //랜덤블록 생성
    movingItem.type = blockArray[randomIndex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = __assign({}, movingItem);
    renderBlocks();
}
// 블록을 회전시키는 함수
function changeDirection() {
    var direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks();
}
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}
//event handling
//블록 조작 (방향키로 조작) 
document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
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
