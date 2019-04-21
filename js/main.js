const GAME_SETTINGS = {
    cells: 51,
    rows: 51,
    cellsType:["free","wall","start","finish"],
    cellState:{
        free:0,
        wall:1,
        start:2,
        finish:3,
    },
    startPosition:52,
    finishPosition:51*50-2
};

    window.addEventListener("load", init);
function init() {
    let $cellElements =  generateBoard();
    document.getElementById('crButton').addEventListener("click",crButtonClick);
    document.getElementById('findButton').addEventListener("click",findClick($cellElements))
}

function crButtonClick() {
    init();
}

let findClick = function (elements) {
    return function() {
       findPath(elements[0],elements[1]);
    }
};
