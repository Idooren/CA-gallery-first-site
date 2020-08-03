'use strict'

function showBoardMines(board) {
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (let j = 0; j < row.length; j++) {
            var cell = row[j];
            if (cell.isMarked) continue;
            if (cell.isMine) cell.isShown = true;
        }
    }
    renderBoard(board);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initTimer() {
    var elTimer = document.getElementById('timer');
    elTimer.innerText = '⏲️ ';
}

function startTimer() {
    if (!gTimerIntervalId) {
        gStartTimer = getTime();
        gTimerIntervalId = setInterval(renderTimer, 10);
    }
}

function getTime() {
    return Date.now();
}

function renderTimer() {
    var diff = getTime() - gStartTimer;
    var time = timeFormatter(diff);
    var elTimer = document.getElementById('timer');
    elTimer.innerText = time;
}

function timeFormatter(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toFixed(0);
    var seconds = time.getSeconds().toFixed(0);
    return minutes + ' : ' + seconds;
}
