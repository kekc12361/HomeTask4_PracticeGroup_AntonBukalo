function findPath(elements, matrix){
    clearVisitedFlags(matrix);
    let finish = movesToPath(elements,matrix);

    if (finish) {
        let queue = findStart(elements, matrix, finish);
        moveToFinish(elements, queue);
    }
}

function movesToPath(elements,matrix){
    matrix[GAME_SETTINGS.startPosition].distance = 0;
    let queue = [];
    queue.push(GAME_SETTINGS.startPosition);
    if (matrix[queue[0]].isVisited) {
        alert(" u already did that");
        return false;
    }
    let finish = pathFinding(matrix,queue,elements);
    if (finish ===null) {
        alert (" there is no path");
        return false;
    }
    return finish;

}

function pathFinding(matrix,queue,elements){
    let finish = null;
    while (queue.length>0){
        if (matrix[queue[0]].state == 3) {
            finish = queue[0];
            return finish;
        }
        setVisited(matrix[queue[0]]);
        addTopToQueue(matrix,queue,elements);
        addDownToQueue(matrix,queue,elements);
        addRightToQueue(matrix,queue,elements);
        addLeftToQueue(matrix,queue,elements);
        queue.shift();
    };
    return finish;
}

function isOptionToQueue(element,pos){
    return isExist(pos) && isNotWall(element)  && (!element.isVisited);
}

function setVisited(element) {
    element.isVisited = true;
}

function getTop(pos){
    return pos-GAME_SETTINGS.cells;
}

function getLeft(pos) {
    return pos-1
}

function getRight(pos){
    return pos+1
}

function getDown(pos){
    return pos+GAME_SETTINGS.cells;
}

function isNotWall(element){
    return element.state !==1
}

function isExist(element){
   return element >= 0 && element < GAME_SETTINGS.cells*GAME_SETTINGS.rows;
}

function addTopToQueue(matrix,queue){
    if (isOptionToQueue(matrix[getTop(queue[0])],getTop(queue[0]))){
        queue.push(getTop(queue[0]));
        // elements[getTop(queue[0])].innerHTML = matrix[queue[0]].distance+1
        matrix[getTop(queue[0])].distance = matrix[queue[0]].distance+1;
        setVisited(matrix[getTop(queue[0])]);

    }
}

function addDownToQueue(matrix,queue) {
    if (isOptionToQueue(matrix[getDown(queue[0])],getDown(queue[0]))){
        queue.push(getDown(queue[0]));
        // elements[getDown(queue[0])].innerHTML = matrix[queue[0]].distance+1
        matrix[getDown(queue[0])].distance = matrix[queue[0]].distance+1;
        setVisited(matrix[getDown(queue[0])]);
    }
}

function addRightToQueue(matrix,queue){
    if (isOptionToQueue(matrix[getLeft(queue[0])],getLeft(queue[0]))&& (queue[0]%GAME_SETTINGS.cells!==0)){
        queue.push(getLeft(queue[0]));
        // elements[getLeft(queue[0])].innerHTML = matrix[queue[0]].distance+1
        matrix[getLeft(queue[0])].distance = matrix[queue[0]].distance+1;
        setVisited(matrix[getLeft(queue[0])]);
    }
}

function addLeftToQueue(matrix,queue){
    if (isOptionToQueue(matrix[getRight(queue[0])],getRight(queue[0]))&& queue[0]%GAME_SETTINGS.cells !==GAME_SETTINGS.cells-1){
        queue.push(getRight(queue[0]));
        // elements[getRight(queue[0])].innerHTML = matrix[queue[0]].distance+1
        matrix[getRight(queue[0])].distance = matrix[queue[0]].distance+1;
        setVisited(matrix[getRight(queue[0])]);
    }
}

function isOptionToNeigh(element,pos){
    return isExist(pos) && isNotWall(element);
}

function addTopToNeigh(matrix,queue,where,wherePosition) {
    if (isOptionToNeigh(matrix[getTop(queue[0])], getTop(queue[0]))) {
        where.push(matrix[getTop(queue[0])]);
        wherePosition.push(getTop(queue[0]));

    }
}

function addDownToNeigh(matrix,queue,where,wherePosition) {
    if ( isOptionToNeigh(matrix[getDown(queue[0])], getDown(queue[0]))) {
        where.push(matrix[getDown(queue[0])]);
        wherePosition.push(getDown(queue[0]))
    }
}

function addLeftToNeigh(matrix,queue,where,wherePosition) {
    if ( isOptionToNeigh(matrix[getLeft(queue[0])], getLeft(queue[0]))&&(queue[0]%GAME_SETTINGS.cells!==0)) {
        where.push(matrix[getLeft(queue[0])]);
        wherePosition.push(getLeft(queue[0]));
    }
}

function addRightToNeigh(matrix,queue,where,wherePosition) {
    if ( isOptionToNeigh(matrix[getRight(queue[0])], getRight(queue[0])) &&queue[0]%GAME_SETTINGS.cells !==GAME_SETTINGS.cells-1) {
        where.push(matrix[getRight(queue[0])]);
        wherePosition.push(getRight(queue[0]));
    }
}

function moveToFinish(elements,queue){
    let i =-1;
    let move = setInterval(function(){
        if (++i !=queue.length) {
            elements[queue[i]].style.background = "yellow";
        } else {
            clearInterval(move);
        }
    },10)
}

function findStart(elements,matrix,finish){
    let queue = [];
    queue.push(finish);
    while (queue[0]!=GAME_SETTINGS.startPosition){
        let neigh = [],neighPos = [];
        addTopToNeigh(matrix,queue,neigh,neighPos);
        addDownToNeigh(matrix,queue,neigh,neighPos);
        addLeftToNeigh(matrix,queue,neigh,neighPos);
        addRightToNeigh(matrix,queue,neigh,neighPos);
        queue.unshift(compareNeighbours(neigh,neighPos));
    }
    return queue;

}

function compareNeighbours(neigh,neighPos){
    let temp = neigh[0],
        tempPos = neighPos[0];
    for (let i = 1; i < neigh.length; i++){
        if (neigh[i].distance<temp.distance){
            temp = neigh[i];
            tempPos = neighPos[i];
        }
    }
    return tempPos;
}

function clearVisitedFlags(matrix) {
    for (let i = 0; i < GAME_SETTINGS.cells * GAME_SETTINGS.rows; i++) {
            matrix[i].isVisited = false;
        }
    }
