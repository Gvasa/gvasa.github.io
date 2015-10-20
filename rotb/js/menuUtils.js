 /* this file handles everything that has to do with the menus
 	which menu should be shown at which part of the game

 	you'll find the following functions:

 	Button - a class for the button, has a buttonType and a sprite

 	createMenu - creates the mainMenu 
	showMenu - shows the main menu
 	hideMenu - hides the main menu
 	
 	createLevelMenu - creates the levelMenu
	showLevelMenu - 
 	hideLevelMenu - 

 	createPostGameMenu -
 	showPostGameMenu - 
 	hidePostGameMenu - 

 	createFailMenu - 
 	showFailMenu - 
 	hideFailMenu - 

 	createLastLevelMenu - 
 	showLastLevelMenu -
 	hideLastLevelMenu -
 */


 function Button(_buttonType, _sprite) {
	this.buttonType = _buttonType;
	this.buttonSprite = _sprite;
}


function createMenu() {
	resetBoard2();
	header = game.add.sprite(114,-910,'header');

	mainMenuButtonSprite1 = game.add.sprite(256, -465-113, 'playButtonSprite');
	mainMenuButtonSprite2 = game.add.sprite(256, -365-113, 'levelsButtonSprite');
	
	mainMenuButtonSprite1.inputEnabled = true;
	mainMenuButtonSprite2.inputEnabled = true;
	

	menuButton1 = new Button('play', mainMenuButtonSprite1);
	menuButton2 = new Button('levels', mainMenuButtonSprite2);
	
	mainMenuButtonSprite1.events.onInputDown.add(menuListener, menuButton1);	
	mainMenuButtonSprite2.events.onInputDown.add(menuListener, menuButton2);
	
	moveFromYAnimation(header, -20, 700);
	moveFromYAnimation(menuButton1.buttonSprite, 265, 700);
	moveFromYAnimation(menuButton2.buttonSprite, 365, 700);

}

function createLevelMenu() {
	header = game.add.sprite(114, -910, 'header');
	var button1 = game.add.sprite(-1000, 366, 'levels');
	var button2 = game.add.sprite(-1000, 366, 'levels');
	var button3 = game.add.sprite(-1000, 366, 'levels');
	var button4 = game.add.sprite(-1000, 366, 'levels');
	var button5 = game.add.sprite(-1000, 366, 'levels');
	var button6 = game.add.sprite(-1000, 366+110, 'levels');
	var button7 = game.add.sprite(-1000, 366+110, 'levels');
	var button8 = game.add.sprite(-1000, 366+110, 'levels');


	button1.animations.add('1', [0], true);
	button2.animations.add('2', [1], true);
	button3.animations.add('3', [2], true);
	button4.animations.add('4', [3], true);
	button5.animations.add('5', [4], true);
	button6.animations.add('6', [5], true);
	button7.animations.add('7', [6], true);
	button8.animations.add('8', [7], true);

	button1.animations.play('1');
	button2.animations.play('2');
	button3.animations.play('3');
	button4.animations.play('4');
	button5.animations.play('5');
	button6.animations.play('6');
	button7.animations.play('7');
	button8.animations.play('8');

	levelButton1 = new Button('level1', button1);
	levelButton2 = new Button('level2', button2);
	levelButton3 = new Button('level3', button3);
	levelButton4 = new Button('level4', button4);
	levelButton5 = new Button('level5', button5);
	levelButton6 = new Button('level6', button6);
	levelButton7 = new Button('level7', button7);
	levelButton8 = new Button('level8', button8);

	button1.inputEnabled = true;
	button2.inputEnabled = true;
	button3.inputEnabled = true;
	button4.inputEnabled = true;
	button5.inputEnabled = true;
	button6.inputEnabled = true;
	button7.inputEnabled = true;
	button8.inputEnabled = true;

	button1.events.onInputDown.add(levelListener, levelButton1);
	button2.events.onInputDown.add(levelListener, levelButton2);
	button3.events.onInputDown.add(levelListener, levelButton3);
	button4.events.onInputDown.add(levelListener, levelButton4);
	button5.events.onInputDown.add(levelListener, levelButton5);
	button6.events.onInputDown.add(levelListener, levelButton6);
	button7.events.onInputDown.add(levelListener, levelButton7);
	button8.events.onInputDown.add(levelListener, levelButton8);
}

function showMenu() {
	resetBoard2();
	tintGame(tintBlack, 0, 1000);
	moveFromYAnimation(header, -20, 700);
	moveFromYAnimation(menuButton1.buttonSprite, 265, 700);
	moveFromYAnimation(menuButton2.buttonSprite, 365, 700);

	header.alpha = true;

	menuButton1.buttonSprite.inputEnabled = true;
	menuButton1.buttonSprite.alpha = true;

	menuButton2.buttonSprite.inputEnabled = true;
	menuButton2.buttonSprite.alpha = true;

	//game.world.bringToTop(header);
	game.world.bringToTop(menuButton1);
	game.world.bringToTop(menuButton2);
	
	guiGroup.alpha = false;
}

function hideMenu() {
	
	moveToYAnimation(header, -910, 700);
	moveToYAnimation(menuButton1.buttonSprite, -465-113, 700);
	moveToYAnimation(menuButton2.buttonSprite, -365-113, 700);
	
	guiGroup.alpha = true;
}

function showLevelMenu() {
	hideMenu();

	moveFromYAnimation(header, -20, 700);
	moveFromXAnimation(levelButton1.buttonSprite, 90, 700);
	moveFromXAnimation(levelButton2.buttonSprite, 90*2, 670);
	moveFromXAnimation(levelButton3.buttonSprite, 90*3, 640);
	moveFromXAnimation(levelButton4.buttonSprite, 90*4, 610);
	moveFromXAnimation(levelButton5.buttonSprite, 90*5, 580);
	moveFromXAnimation(levelButton6.buttonSprite, 90, 700);
	moveFromXAnimation(levelButton7.buttonSprite, 90*2, 670);
	moveFromXAnimation(levelButton8.buttonSprite, 90*3, 640);

	header.alpha = true;

	levelButton1.buttonSprite.inputEnabled = true;
	levelButton1.buttonSprite.alpha = true;

	levelButton2.buttonSprite.inputEnabled = true;
	levelButton2.buttonSprite.alpha = true;

	levelButton3.buttonSprite.inputEnabled = true;
	levelButton3.buttonSprite.alpha = true;

	levelButton4.buttonSprite.inputEnabled = true;
	levelButton4.buttonSprite.alpha = true;

	levelButton5.buttonSprite.inputEnabled = true;
	levelButton5.buttonSprite.alpha = true;

	levelButton6.buttonSprite.inputEnabled = true;
	levelButton6.buttonSprite.alpha = true;

	levelButton7.buttonSprite.inputEnabled = true;
	levelButton7.buttonSprite.alpha = true;

	levelButton8.buttonSprite.inputEnabled = true;
	levelButton8.buttonSprite.alpha = true;

	guiGroup.alpha = false;
}

function hideLevelMenu() {

	moveToYAnimation(header, -910, 700);
	moveToXAnimation(levelButton1.buttonSprite, -1000, 580);
	moveToXAnimation(levelButton2.buttonSprite, -1000, 610);
	moveToXAnimation(levelButton3.buttonSprite, -1000, 640);
	moveToXAnimation(levelButton4.buttonSprite, -1000, 670);
	moveToXAnimation(levelButton5.buttonSprite, -1000, 700);
	moveToXAnimation(levelButton6.buttonSprite, -1000, 580);
	moveToXAnimation(levelButton7.buttonSprite, -1000, 610);
	moveToXAnimation(levelButton8.buttonSprite, -1000, 640);

	guiGroup.alpha = true;
}

function createPostGameMenu() {
	//clearBoard();
	levelCompleteButton = game.add.sprite(114, -910, 'levelCompleteButtonSprite');
	var button1 = game.add.sprite(254, -365-113, 'nextLevelSprite');

	button1.inputEnabled = true;

	nextLevelButton = new Button('nextLevel', button1);

	nextLevelButton.buttonSprite.alpha = false;
	nextLevelButton.buttonSprite.inputEnabled = false;
	levelCompleteButton.alpha = false;

	button1.events.onInputDown.add(levelListener ,nextLevelButton);

}

function showPostGameMenu() {
	moveFromYAnimation(levelCompleteButton, -20, 700);
	moveFromYAnimation(nextLevelButton.buttonSprite, 265, 700);

	resetButton.buttonSprite.inputEnabled = false;
	mainMenuButton.buttonSprite.inputEnabled = false;

	game.world.bringToTop(tintBlack);
	winBarrelGlow.bringToTop();
	game.world.bringToTop(gameBoard[winIndex].barrelSprite);
	game.world.bringToTop(guiGroup);
	levelCompleteButton.alpha = true;
	game.world.bringToTop(levelCompleteButton);

	nextLevelButton.buttonSprite.inputEnabled = true;
	nextLevelButton.buttonSprite.alpha = true;
	game.world.bringToTop(nextLevelButton.buttonSprite);
}

function hidePostGameMenu() {
	moveToYAnimation(levelCompleteButton, -910, 700);
	moveToYAnimation(nextLevelButton.buttonSprite, -498-113, 700);

	resetButton.buttonSprite.inputEnabled = true;
	mainMenuButton.buttonSprite.inputEnabled = true;
}

function createFailMenu() {
	outOfChargesButton = game.add.sprite(114, -910, 'outOfChargesSprite');

	var button1 = game.add.sprite(254, -465-113, 'chooseLevelSprite');
	var button2 = game.add.sprite(256, -365-113, 'restartLevelSprite');

	button1.inputEnabled = true;
	button2.inputEnabled = true;

	chooseLevelButton = new Button('chooseLevel', button1);
	restartLevelButton = new Button('restartLevel', button2);

	outOfChargesButton.alpha = false;
	chooseLevelButton.buttonSprite.alpha = false;
	chooseLevelButton.buttonSprite.inputEnabled = false;
	restartLevelButton.buttonSprite.alpha = false;
	restartLevelButton.buttonSprite.inputEnabled = false;

	button1.events.onInputDown.add(postGameMenuListener, chooseLevelButton);
	button2.events.onInputDown.add(postGameMenuListener, restartLevelButton);
}

function showFailMenu() {
	moveFromYAnimation(outOfChargesButton, -20, 700);
	moveFromYAnimation(chooseLevelButton.buttonSprite, 265, 700);
	moveFromYAnimation(restartLevelButton.buttonSprite, 363, 700);
	
	resetButton.buttonSprite.inputEnabled = false;
	mainMenuButton.buttonSprite.inputEnabled = false;

	tintGame(tintBlack, 1, 1000);
	game.world.bringToTop(guiGroup);

	outOfChargesButton.alpha = true;
	game.world.bringToTop(outOfChargesButton);

	chooseLevelButton.buttonSprite.alpha = true;
	chooseLevelButton.buttonSprite.inputEnabled = true;
	game.world.bringToTop(chooseLevelButton.buttonSprite);

	restartLevelButton.buttonSprite.alpha = true;
	restartLevelButton.buttonSprite.inputEnabled = true;
	game.world.bringToTop(restartLevelButton.buttonSprite);
}

function hideFailMenu() {
	game.add.tween(tintBlack).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	
	moveToYAnimation(outOfChargesButton, -910, 700);
	moveToYAnimation(chooseLevelButton.buttonSprite, -498-113, 700);
	moveToYAnimation(restartLevelButton.buttonSprite ,-398-113, 700);

	resetButton.buttonSprite.inputEnabled = true;
	mainMenuButton.buttonSprite.inputEnabled = true;
}

function createLastLevelMenu() {
	gameComplete = game.add.sprite(114, -910, 'gameCompleteSprite');

	var button1 = game.add.sprite(254, -465-113, 'mainMenuGameCompleteSprite');

	button1.inputEnabled = true;

	lastLevelMainMenuButton = new Button('lastLevelMainMenu', button1);

	gameComplete.alpha = false;
	lastLevelMainMenuButton.buttonSprite.alpha = false;
	lastLevelMainMenuButton.buttonSprite.inputEnabled = false;

	button1.events.onInputDown.add(postGameMenuListener, lastLevelMainMenuButton);
}

function showLastLevelMenu() {
	moveToYAnimation(gameComplete, -20, 700);
	moveToYAnimation(lastLevelMainMenuButton.buttonSprite, 265, 700);

	resetButton.buttonSprite.inputEnabled = false;
	mainMenuButton.buttonSprite.inputEnabled = false;

	tintGame(tintBlack, 1, 1000);
	game.world.bringToTop(guiGroup);

	gameComplete.alpha = true;
	game.world.bringToTop(gameComplete);

	lastLevelMainMenuButton.buttonSprite.alpha = true;
	lastLevelMainMenuButton.buttonSprite.inputEnabled = true;
	game.world.bringToTop(lastLevelMainMenuButton.buttonSprite);

}

function hideLastLevelMenu() {
	tintGame(tintBlack, 0, 1000);

	moveToYAnimation(gameComplete, -910, 700);
	moveToYAnimation(lastLevelMainMenuButton.buttonSprite, -498-113, 700);

	resetButton.buttonSprite.inputEnabled = true;
	mainMenuButton.buttonSprite.inputEnabled = true;
}
