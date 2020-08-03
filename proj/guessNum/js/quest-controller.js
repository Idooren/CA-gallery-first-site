'use strict';

const YES = 'Yes, I knew it!';
const DONT_KNOW = 'I dont know...teach me!';

var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    renderQuest();
}

function renderQuest() {
    var cuurQuest = getCurrQuest();
    $('.question-txt').text(cuurQuest.txt);
    $('.quest').show();
    $('.game-start').hide();
}

function onUserResponse(res) {
    if (isChildless(getCurrQuest())) {

        if (res === 'yes') {
            $('.game-res').text(YES);
            $('.game-res').addClass('bg-success jumbotron display-4');
            $('.game-res').click(onRestartGame);
        } else {
            $('.game-res').text(DONT_KNOW);
            $('.game-res').addClass('bg-danger jumbotron display-4');
            setTimeout(function () {
                $('.quest').hide();
                $('.new-quest').show();
            }, 1500);
        }
        $('.game-res').show();
    } else {
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var newGuessTxt = $('#newGuess').val();
    var newQuestTxt = $('#newQuest').val();
    addGuess(newQuestTxt, newGuessTxt, gLastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    $('.quest').hide();
    $('.game-res').hide();
    gLastRes = null;
    init();
}

