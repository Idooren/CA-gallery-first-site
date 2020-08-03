const decisionTree = 'questsTree';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(decisionTree);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    var nextQuest = gCurrQuest[res]
    gPrevQuest = gCurrQuest;
    gCurrQuest = nextQuest;
}

function addGuess(newQuestTxt, newGuessTxt) {
    var oldGuess = gPrevQuest[gLastRes].txt;
    gCurrQuest.txt = newQuestTxt;
    gCurrQuest.yes = createQuest(newGuessTxt);
    gCurrQuest.no = createQuest(oldGuess);

    _savegQuestsTree()
}

function getCurrQuest() {
    return gCurrQuest
}


function _savegQuestsTree() {
    saveToStorage(decisionTree, gQuestsTree);
}

