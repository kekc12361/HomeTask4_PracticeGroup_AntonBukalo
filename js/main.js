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

    const defaultDistance = GAME_SETTINGS.cells*GAME_SETTINGS.rows+1


    window.addEventListener("load", init);
function init() {
    // console.log(defaultDistance);
    let $cellElements =  generateBoard();
    document.getElementById('crButton').addEventListener("click",crButtonClick);
    document.getElementById('findButton').addEventListener("click",findClick($cellElements))
}

function crButtonClick() {
    init();
}

let findClick = function (parameters) {
    return function() {
       findPath(parameters[0],parameters[1]);
    }
};
