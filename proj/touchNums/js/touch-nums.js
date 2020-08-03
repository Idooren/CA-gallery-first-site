
var gNums = [];
var gCurrNum = 1;
var BOARDSIZE = 16;
var gTimer;
var gDuration = 0;

function init() {
    gCurrNum = 1;
    gDuration = 0;
    initUI();
    createNumsArr();
    buildBoard();
    showNextMove();
}

function createNumsArr() {
    gNums = [];
    for (var i = 0; i < BOARDSIZE; i++) {
        gNums.push(i + 1);
    }
}

function getRndmNum() {
    var rndm = parseInt(Math.random() * gNums.length);
    return gNums.splice(rndm, 1);
}

function showNextMove() {
    var next = document.querySelector('.next-num');
    if (gCurrNum > BOARDSIZE) {
        next.innerHTML = '✌️ Winner !';
    }
    else next.querySelector('span').innerHTML = gCurrNum;
}

function buildBoard() {
    var strHtml = '';
    var table = document.querySelector('.game-table tbody');
    for (var i = 0; i < Math.sqrt(BOARDSIZE); i++) {
        strHtml += '<tr>';
        for (var j = 0; j < Math.sqrt(BOARDSIZE); j++) {
            var getRndnum = getRndmNum();
            strHtml += `<td data-index="${getRndnum}" onclick="cellClicked(this)">`;
            strHtml += getRndnum;
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }
    table.innerHTML = strHtml;
}

function cellClicked(elClickedNum) {
    var clickedNum = parseInt(elClickedNum.dataset.index);
    if (clickedNum === gCurrNum) {
        if (gCurrNum === 1) {
            var timer = document.querySelector('.timer');
            gTimer = setInterval(myTimer, 100);
            function myTimer() {
                gDuration += 0.1;
                timer.querySelector('span').innerHTML = gDuration.toFixed(2);
            }
        }
        elClickedNum.classList.add('touched');
        if (clickedNum === BOARDSIZE) { 
            clearInterval(gTimer);
            gCurrNum++;
            showNextMove();
            highScore();
            document.querySelector('.win img').style.display = 'block';
        }
        else {
            gCurrNum++;
            showNextMove();
        }
    }
}

function highScore() {
    var myStorage = window.localStorage;
    var currHigh = myStorage.getItem(`highscore${BOARDSIZE}`);
    if (!currHigh) {
        myStorage.setItem(`highscore${BOARDSIZE}`, gDuration);
        document.querySelector('.best-score span').innerHTML = gDuration.toFixed(2);
    }
    else if (gDuration < currHigh)  {
            myStorage.setItem(`highscore${BOARDSIZE}`, gDuration);
            document.querySelector('.best-score span').innerHTML = gDuration.toFixed(2);   
    }
}

function resetHighScore () {
    var storageHighScore = window.localStorage[`highscore${BOARDSIZE}`];
    localStorage.clear();
    document.querySelector('.best-score span').innerHTML = '00.00';

}

// inject Timer in HEADER
function initUI() {
    clearInterval(gTimer);
    var timer = document.querySelector('.timer');
    timer.innerHTML = '&#9203 Time: <span></span>';
    timer.querySelector('span').innerHTML = '00.00';

    var next = document.querySelector('.next-num');
    next.innerHTML = '▶ Next Move: <span> </span>';
    next.querySelector('span').innerHTML = gCurrNum;

    var bestScore = document.querySelector('.best-score');
    bestScore.innerHTML = '🏁 High Score: <span> </span>';
    var currHigh = +window.localStorage.getItem(`highscore${BOARDSIZE}`);
    if (currHigh !== null ) bestScore.querySelector('span').innerHTML = `${currHigh.toFixed(2)}`;
    else bestScore.querySelector('span').innerHTML = 0;

    var winImg = document.querySelector('.win img')
    if (winImg.style.display === 'block') winImg.style.display = 'none';
}