'use strict'

function countMine(board, cellI, cellJ) {
    var neighborsCount = 0; 

    for (var i = cellI-1; i <= cellI+1; i++) {
        for (var j = cellJ-1; j <= cellJ+1; j++) {
            if (i < 0 || j < 0 || i >= board.length || j >= board.length) continue;
            if (i === cellI && j === cellJ) continue;  
            var cell = board[i][j];
            if(cell.content === MINE) neighborsCount++;
        } 
    }
    return neighborsCount;
}

function isNeighborFirstCell(board, cellI, cellJ) {

    for (var i = cellI-1; i <= cellI+1; i++) {
        for (var j = cellJ-1; j <= cellJ+1; j++) {
            if (i < 0 || i < 0 || i >= board.length || j >= board.length) continue;
            if (cellI === i && cellJ === j) continue; 
            if (i === gFirstCellClicked.location.i && j === gFirstCellClicked.location.j) return true;
        } 
    }
    return false;
}

function expandShownRecursive(board, cellI, cellJ) {
    var cell = board[cellI][cellJ];
    if (cell.content !== EMPTY) return;

    for (var i = cellI-1; i <= cellI+1; i++) {
        for (var j = cellJ-1; j <= cellJ+1; j++) {
            if (i < 0 || j < 0 || i >= board.length || j >= board.length) continue;
            if (i === cellI && j === cellJ) continue; 
            var currNeighbor = board[i][j];
            if (currNeighbor.content === MINE || 
                currNeighbor.isMarked) continue;
            if (!currNeighbor.isShown) {
                currNeighbor.isShown = true;
                gGame.shownCount++;
                expandShownRecursive(board, i, j);
            }}}}

