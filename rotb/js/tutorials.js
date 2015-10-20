/* This file has all functions that takes care of the tutorials shown at the start

    You'll find following functions:

        loadTutorials - Creates and places our gui-elements
        showTutorials - sets the alpha to true so the tutorial is shown
        swapTutorial - big function that swaps between the different 
                        "stages" in the tutorial. it will hide / show the correct gui-elements
                        and bring the nessecary parts to the front.
                        this function should probably be rewritten in a better way. 

        clearTutorials - hides the tutorials from the board
*/
function loadTutorials() {
    tintBlack = game.add.sprite(0,0, 'tintBlack');
    tutorial_1_1 = game.add.sprite(115, -960,'tutorial_1_1');
    tutorial_1_2 = game.add.sprite(115, -20,'tutorial_1_2');
    tutorial_1_3 = game.add.sprite(115, -20,'tutorial_1_3');
    tutorialContinue = game.add.sprite(256,-1000, 'continueButtonSprite');
   
    console.log('wtf');
    clearTutorials();
}

function showTutorials () {
    tutorial_1_1.alpha = true;
    tutorial_1_2.alpha = false;
    tutorial_1_3.alpha = false;
    tintGame(tintBlack, 1, 1000);

    console.log('wtf2');
}

function swapTutorials(index) {
    if(index == 1) {
        moveFromYAnimation(tutorial_1_1, -20, 800);
        moveFromYAnimation(tutorialContinue, 270, 790);
        tutorial_1_1.alpha = true;
        tutorial_1_2.alpha = false;
        tutorial_1_3.alpha = false;
        tintGame(tintBlack, 1, 1000);
        tutorialContinue.alpha = true;
        tutorialContinue.inputEnabled = true;
        tutorialContinue.events.onInputDown.add(tutorialListener, this);
        game.world.bringToTop(guiGroup);
        game.world.bringToTop(gameBoard[winIndex].barrelSprite);
        game.world.bringToTop(tutorial_1_1);
        game.world.bringToTop(tutorialContinue);
        updateBarrelVisibility2();
        gameBoard[16].barrelSprite.inputEnabled = false;
        gameBoard[15].barrelSprite.inputEnabled = false;
        console.log(index);
    } else if(index == 2) {
        tutorial_1_1.alpha = false;
        tutorial_1_2.alpha = true;
        tutorialContinue.alpha = false;
        tutorialContinue.inputEnabled = false;
        game.world.bringToTop(tintBlack);
        game.world.bringToTop(guiGroup);
        game.world.bringToTop(tutorial_1_2);
        game.world.bringToTop(gameBoard[16].barrelSprite);
        gameBoard[16].barrelSprite.inputEnabled = true;
        console.log(index);
    } else if(index == 3) {
        tutorial_1_2.alpha = false;
        tutorial_1_3.alpha = true;
        game.world.bringToTop(tintBlack);
        game.world.bringToTop(guiGroup);
        game.world.bringToTop(tutorial_1_3);
        game.world.bringToTop(gameBoard[15].barrelSprite);
        gameBoard[15].barrelSprite.inputEnabled = true;
        console.log(index);
    } else {
       // rollUpMenuAnimation(tutorial_1_3, -910, 700);
        tintGame(tintBlack, 0, 1000);
        console.log(index);
    }
}

function clearTutorials() {
    tutorial_1_1.alpha = false;
    tutorial_1_2.alpha = false;
    tutorial_1_3.alpha = false;
    tintGame(tintBlack, 0, 1000);
    tutorialContinue.alpha = false;
    game.world.bringToTop(menuButton1.buttonSprite);
    game.world.bringToTop(menuButton2.buttonSprite);
}