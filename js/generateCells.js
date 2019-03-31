function generateBoard(){
    let matrix = createMatrix();
    fillMatrix(matrix[0],matrix[1]);
    matrix = matrix[0];
    let $elements =[];
    document.querySelector('[data-component="game"]').innerHTML='';
    let $container = document.querySelector('[data-component="game"]');
    let table = document.createElement("table");
    for (let i = 0; i < GAME_SETTINGS.rows; i++){
        let row = document.createElement("div");
        for (let j = 0;j < GAME_SETTINGS.cells; j++){
            let cell = matrix[j+i*GAME_SETTINGS.cells].state;
            let $el = document.createElement("div");
            $el.classList.add("cell",GAME_SETTINGS.cellsType[cell]);
            row.appendChild($el);
            $elements.push($el);
        }
        table.appendChild(row);
    }
    $container.appendChild(table);
    return [$elements,matrix];
}

function createMatrix(){
    let freeCells = [],
    matrix =[];
    for (let i = 0; i < GAME_SETTINGS.rows*GAME_SETTINGS.cells; i++){
        if (isEven(i)){
            matrix.push({state:1,isVisited:false,distance: GAME_SETTINGS.cells*GAME_SETTINGS.rows});
        }else{
            matrix.push({state:0,isVisited:false,distance: GAME_SETTINGS.cells*GAME_SETTINGS.rows});
            freeCells.push(i);
        }
    }
    matrix[GAME_SETTINGS.startPosition].state = 2;
    matrix[GAME_SETTINGS.finishPosition].state = 3;
    return [matrix,freeCells]
}

function isEven(pos){
    return ! ((pos-Math.floor(pos/GAME_SETTINGS.cells)*GAME_SETTINGS.cells)%2 && Math.floor(pos/GAME_SETTINGS.cells)%2);
}

function fillMatrix(matrix,freeCells){
    clearFirstLine(freeCells,matrix);
    fillLines(freeCells,matrix);
}

function getRandomPos(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function breakWall(element){
    element.state = 0;
}

function clearFirstLine(freeCells,matrix) {
    while (freeCells.shift() - freeCells[0] === -2){
        breakWall(matrix[getLeft(freeCells[0])]);
    }
}

function fillLines(freeCells,matrix) {
    let cell = [];
    for (let i = 0; i <  Math.floor(GAME_SETTINGS.rows/2)-1; i++){
        for (let j = 0; j < Math.floor(GAME_SETTINGS.cells/2); j++){
            let random = getRandomPos(0,1);
            cell.push(freeCells[j + i*Math.floor(GAME_SETTINGS.cells/2) ]);
            if (j === Math.floor(GAME_SETTINGS.cells/2)-1||(random === 0)){
                breakTopWall(cell,matrix);
                cell = [];
            }else {
                breakWall(matrix[getRight(freeCells[j + i*Math.floor(GAME_SETTINGS.cells/2)])])
            }
        }
    }
}

function breakTopWall(elements,matrix) {
   let pos = elements[getRandomPos(0,elements.length-1)];
    breakWall(matrix[getTop(pos)]);
}

