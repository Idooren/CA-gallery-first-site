'use strict'
var MINE = '💣';
var FLAG = '⛳';
var EMPTY = '';

var gBoard;
var gStartTimer;
var gTimerIntervalId;
var gFirstCellClicked;

var gLevel = {
    size: 4,
    mines: 2,
};

var gGame = {
    isOn: false,
    isWin: false,
    minesCount: 0,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var greet = new Audio('greet.mp3');
var boom = new Audio('explosion+7.mp3');
var soundtrk = new Audio('warsound.mp3');

function initGame() {
    soundtrk.play()
    greet.play()
    initgGameObjs();
    gGame.isOn = true;
    renderSoldier('soldierwating');
    initTimer();
    buildBoard(gLevel.size);
    renderBoard(gBoard);
}

function buildBoard(n) {
    gBoard = [];
    for (var i = 0; i < n; i++) {
        gBoard[i] = [];
        for (var j = 0; j < n; j++) {
            var cell = {
                content: '',
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            gBoard[i][j] = cell;
        }
    }
}

function changeLevel(size, mines) {
    initgGameObjs();
    gLevel.size = size;
    gLevel.mines = mines;
    clearInterval(gTimerIntervalId);
    gTimerIntervalId = null;
    gFirstCellClicked = null;
    gBoard = null;
    initGame();
}

function renderBoard(board) {
    var rows = board.length;
    var cols = board[0].length;
    var strHTML = '<table border="1"><tbody>';
    for (let i = 0; i < rows; i++) {
        strHTML += '<tr>';
        for (let j = 0; j < cols; j++) {
            var cell = board[i][j];
            var content = (cell.isShown) ? cell.content : EMPTY;
            var flag = (cell.isMarked) ? FLAG : '';
            var cellClass = (cell.isShown) ? 'white' : '';
            strHTML += `<td data-id="cell-${i}-${j}" class="${cellClass}" onclick="cellClicked(${i},${j})" oncontextmenu="markCell(event,${i},${j})">${content}${flag}</td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.board-container');
    elBoard.innerHTML = strHTML;
}

function renderSoldier(imgName) {
    if (gGame.isOn) imgName = 'soldierwaiting';
    var strHtml = '';
    var elSoldierCont = document.querySelector('.soldier-container');
    strHtml += `<img onclick="changeLevel(${gLevel.size}, ${gLevel.mines})"src="img/${imgName}.jpg"/>`;
    elSoldierCont.innerHTML = strHtml;
}

function setMinesNeighborsCount(board) {
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (let j = 0; j < row.length; j++) {
            var cell = row[j];
            if (cell.isMine) continue;
            cell.minesAroundCount = countMine(board, i, j);
            var minesAround = cell.minesAroundCount;
            if (cell.minesAroundCount !== 0) cell.content = minesAround.toString();
        }
    }
    return board;
}

function cellClicked(cellI, cellJ) {
    if (!gGame.isOn) return;
    var cell = gBoard[cellI][cellJ];
    if (cell.isShown || cell.isMarked) return;
    startTimer();

    if (!gFirstCellClicked) {
        gFirstCellClicked = {
            location: { i: cellI, j: cellJ }
        };
        setMinesNegsCount(gBoard);
        setMinesNeighborsCount(gBoard);
    }
    if (cell.isMine ) {
        showBoardMines(gBoard);
        renderBoard(gBoard);
        gameOver( boom.play(), alert('YOU DEAD'));
       
        
        return;
    }
    if (!cell.isShown) {
        cell.isShown = true;
        gGame.shownCount++;
    }
    // expandShown()
    expandShownRecursive(gBoard, cellI, cellJ);
    renderBoard(gBoard);
    checkGameOver();
}

function markCell(elEvent, cellI, cellJ) {
    startTimer();
    elEvent.preventDefault();
    var cell = gBoard[cellI][cellJ];
    cell.isMarked = (cell.isMarked) ? false : true;
    if (cell.isMarked) {
        gGame.markedCount++;
    } else {
        gGame.markedCount--;
    }
    renderBoard(gBoard);
    checkGameOver();
}

function setMinesNegsCount(board) {
    while (gGame.minesCount < gLevel.mines) {
        var randI = getRandomInt(0, board.length - 1);
        var randJ = getRandomInt(0, board.length - 1);
        var cell = board[randI][randJ];

        if (cell.isMine) continue;
        if (isNeighborFirstCell(board, randI, randJ)) continue;
        if (randI === gFirstCellClicked.location.i && randJ === gFirstCellClicked.location.j) continue;

        cell.content = MINE;
        gGame.minesCount++;
        cell.isMine = true;
    }
}

function gameOver(text) {
    gGame.isOn = false;
    if (gGame.isWin) {
        renderSoldier('tumbupsoldier');
    } else {
        renderSoldier('tumbdownsoldier');
    }
    initgGameObjs();
    clearInterval(gTimerIntervalId);
    gTimerIntervalId = null;
    gFirstCellClicked = null
    gBoard = null;
}

function checkGameOver() {
    var allShownOrMines = gGame.shownCount + gGame.minesCount;
    var allShownOrFlaged = gGame.shownCount + gGame.markedCount;
    var numCells = gLevel.size ** 2;
    if (allShownOrFlaged === numCells && allShownOrMines === numCells) {
        gGame.isWin = true;
        gameOver(alert('YOU WON'));
    }
}

function initgGameObjs() {
    gGame = {
        isOn: false,
        isWin: false,
        minesCount: 0,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    gLevel.hintsLeft = 3;
}

