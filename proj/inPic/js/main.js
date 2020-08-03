'use strict'
var gIdIndex = 101;
var gQuestions = [];
const NUM_OF_IMG = 4;
var gNumOfCorr = 0;
var gCount = 0;


function newGame() {
    gNumOfCorr = 0;
    gCount = 0;
    document.querySelector('div').classList.add('end_game');
    init();
}

function init() {

    createQuestions();
    var elImg = document.querySelector('img');
    var elBtns = document.querySelectorAll('button');
    elImg.src = gQuestions[gCount].imgSrc
    elBtns[0].innerText = gQuestions[gCount].options[0];
    elBtns[1].innerText = gQuestions[gCount].options[1];

}

function renderNextQuesttion(chosenOption) {
    var currOptionIndex = gQuestions[gCount].currOptionIndex;
    if (gQuestions[gCount].options[currOptionIndex] === chosenOption.innerText) {
        chosenOption.classList.add('currect');
        setTimeout(function () {
            chosenOption.classList.remove('currect');
        }, 1000);
        gCount++;
        gNumOfCorr++;
    } else {
        chosenOption.classList.add('wrong');
        setTimeout(function () {
            chosenOption.classList.remove('wrong');
        }, 1000);
        gCount++;
    }
    if (gCount < NUM_OF_IMG) {

        setTimeout(function () {
            init();
        }, 1500);
    } else {
        var elendmsg = document.querySelector('.end_game');
        elendmsg.querySelector('h2').innerText += ' ' + gNumOfCorr + ' questions';
        elendmsg.classList.remove('end_game');
    }
}


function createQuestion(imgSrc, options, currOptionIndex) {
    var quest = {
        id: gIdIndex++,
        imgSrc: imgSrc,
        options: options,
        currOptionIndex: currOptionIndex
    }
    return quest;
}

function createQuestions() {
    var imgSrc = ['images/cane corso.jpg', 'images/great danes.jpg', 'images/grey hound.jpg', 'images/sharpei.jpg'];
    var dogsName = ['cane corso', 'great danes', 'grey hound', 'sharpei',];
    for (var i = 0; i < NUM_OF_IMG; i++) {
        var optionsandIndexOfCorrect = createOptions(dogsName[i], i, dogsName);
        gQuestions[i] = createQuestion(imgSrc[i], optionsandIndexOfCorrect[0], optionsandIndexOfCorrect[1]);
    }

}

function createOptions(correct, correctIndex, dogsBreeds) {
    var newDogsBreeds = dogsBreeds.slice();
    newDogsBreeds.splice(correctIndex, 1);
    var wrongOption = rndOption(newDogsBreeds);
    var newCorrectIndex = 0;
    var options = [];
    if (Math.random > 0.5) {
        options[0] = correct;
        options[1] = wrongOption;
    } else {
        options[1] = correct;
        options[0] = wrongOption;
        newCorrectIndex = 1;
    }
    return [options, newCorrectIndex];

}


function rndOption(nums) {
    var rngNumIndex = getRandomInteger(0, nums.length - 1);
    var rngNum = nums[rngNumIndex];
    nums.splice(rngNumIndex, 1);
    return rngNum;
}

function getRandomInteger(min, max) {
    var dif = max - min;
    var rngNum = Math.floor(Math.random() * (dif + 1));
    return rngNum + min;
}
