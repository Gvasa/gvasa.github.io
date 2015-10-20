/* This file handles all the listeners in the game
	it's quite large so all listeners are split up 
	to have some kind of structure and to make it
	easier to read.
	
	the functions you'll find are the following:

		listener - handles all the events that occurs when 
				   a barrel(reveal, movement, charge etc) is clicked
				   if you are adding a new barrel that affects the gameplay
				   check out listener

		levelListener - this function takes care of all the events that occurs
						when something from the "levelMenu" has been clicked.
						It makes sure the right level gets loaded etc.
						If you are adding a new level check out levelListener

		menuListener - takes care of the events that occur from the main menu
					   this function has very little in it at the moment
					   if you want to add new features such as options / credits
					   do it in this function.

		guiListener - this function handles the resetbutton and "go to menu"-button.
					  not much to say, could probably be incorperated into another function

		posgGameListener - depending on where in the game you are this function
							will do one of the following
								- restart the level you are currently at
								- show the level menu
								- send you to the main menu if you have completed
								  the last level

		tutorialListener - only used once, to get the tutorials rolling

		resetLevel - cleans the board and reloads the level

		readNextLevel - checks wich is the current level and loads the next level
					
*/

function listener() {
	var expr = this.barrelType;
	switch(expr) {
		
		case BARREL_REVEAL_ABOVE:
            if(this.posX == 0 || this.charges <= 0 || gameBoard[this.barrelId-1].visible == true || gameBoard[this.barrelId-1].barrelType == BARREL_EMPTY) {
                console.log('If barrel reveal above');
                //this.barrelInfo();
                gameBoard[this.barrelId-1].barrelInfo();
                break;
            }
            if(currentLevel == 'level1')
            	swapTutorials(3);
        
            bClick.play();
            this.charges--;
			showBarrelAbove(this);
            charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

            if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
            console.log('charges: ' + charges);
			break;

		case BARREL_REVEAL_BELOW:
			if(this.posX == TEST_CONSTANT-1 || this.charges <= 0 || gameBoard[this.barrelId+1].visible == true || gameBoard[this.barrelId+1].barrelType == BARREL_EMPTY) {
				break;
			}
			bClick.play();
			this.charges--;
			showBarrelBelow(this);
            charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

            if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
			break;
		
		case BARREL_REVEAL_RIGHT:
			if(this.posY == TEST_CONSTANT-1 || this.charges <= 0 || gameBoard[this.barrelId+6].visible == true || gameBoard[this.barrelId+6].barrelType == BARREL_EMPTY) {
				console.log('If barrel reveal RIGHT');
				//this.barrelInfo();
				gameBoard[this.barrelId+6].barrelInfo();
				console.log(gameBoard[this.barrelId+6].visible);
				console.log(gameBoard[this.barrelId+6].barrelType);
				break;
			}
			bClick.play();
			this.charges--;
			showBarrelRight(this);
            //this.barrelInfo();
            charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

            if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
            console.log('charges: ' + charges);
			break;
		
		case BARREL_REVEAL_LEFT:
			if(this.posY == 0 || this.charges <= 0 ||gameBoard[this.barrelId-6].visible == true || gameBoard[this.barrelId-6].barrelType == BARREL_EMPTY) {
				console.log('If barrel reveal LEFT');
				break;
			}
			bClick.play();
			this.charges--;
			showBarrelLeft(this);
            //this.barrelInfo();
            charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

            if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
            console.log('charges: ' + charges);
			break;

		case BARREL_MOVE_COL_UP:
			if(this.posY == 0 || this.charges <= 0)
				break;
			this.charges--;
			moveColUp(this);
            //this.barrelInfo();
            charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

            if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
            console.log('charges: ' + charges);
			break;

		case BARREL_MOVE_COL_DOWN:
			if(this.posY == 0 || this.charges <= 0)
				break;
			this.charges--;
			moveColDown(this);
			//this.barrelInfo();
			charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

			if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
			console.log('charges: ' + charges);
			break;

		case BARREL_MOVE_ROW_LEFT:
			if(this.posX == TEST_CONSTANT-1 || this.charges <= 0)
				break;

			this.charges--;
			moveRowLeft(this);
            charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

            if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
			break;

		case BARREL_MOVE_ROW_RIGHT:
			if(this.posX == TEST_CONSTANT-1 || this.charges <= 0)
				break;
			if(currentLevel == 'level1')
					swapTutorials(4);

			this.charges--;
			moveRowRight(this);
			//this.barrelInfo();
			charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

			if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
			console.log('charges: ' + charges);
			break;

		case BARREL_CHARGE:
			if(this.charges <= 0) {
				console.log('asdasd');
				break;
			}
			this.charges--;
			addCharge(this);
            //this.barrelInfo();
            charges--;
            setNumberOfMoves(numOfMovesIndicator = numOfMovesIndicator+1);

            if(charges == 0 && complete == false) {
            	showFailMenu();
            	break;
            }
            console.log('charges: ' + charges);
			break;
	}
}

function levelListener() {
	var type = this.buttonType;
	switch(type) {

		case 'level1':
			currentLevel = 'level1';
			moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 1);
			readJson('level1');
			animationBoardIn();
			hideLevelMenu();
			swapTutorials(1);
			break;

		case 'level2':
			currentLevel = 'level2';
			moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 2);
			readJson('level2');
			animationBoardIn();
			hideLevelMenu();
			break;

		case 'level3':
			currentLevel = 'level3';
			moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 3);
			readJson('level3');
			animationBoardIn();
			hideLevelMenu();
			break;

		case 'level4':
			currentLevel = 'level4';
			moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 4);
			readJson('level4');
			animationBoardIn();
			hideLevelMenu();
			break;

		case 'level5':
			currentLevel = 'level5';
			moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 5);
			readJson('level5');
			animationBoardIn();
			hideLevelMenu();
			break;

		case 'level6':
			currentLevel = 'level6';
			moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 6);
			readJson('level6');
			animationBoardIn();
			hideLevelMenu();
			break;

		case 'level7':
			currentLevel = 'level7';
			moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 7);
			readJson('level7');
			animationBoardIn();
			hideLevelMenu();
			break;

        case 'level8':
            currentLevel = 'level8';
            moveBarrelsToStartPosition();
            setCurrentLevelIndicator(levelCounter = 8);
            readJson('level8');
            animationBoardIn();
            hideLevelMenu();
            break;
			
		case 'nextLevel':
  			resetWinBarrel();
  			tintGame(tintBlack, 0, 1000);
			hidePostGameMenu();
			animationBoardOut();
            setNumberOfMoves(numOfMovesIndicator = 0);
            setCurrentLevelIndicator(levelCounter = levelCounter + 1);
			game.time.events.add(Phaser.Timer.QUARTER*1.9, moveBarrelsToStartPosition, this);
			game.time.events.add(Phaser.Timer.QUARTER*1.9, readNextLevel, this);
			
			break;
	}		
}

function menuListener() {
	console.log(this);	

	var type = this.buttonType;
	switch(type) {

		case 'play':
			currentLevel = 'level1';
            setCurrentLevelIndicator(levelCounter = 1);
			readJson('level1');
			hideMenu();
			//animationBoardIn();
			swapTutorials(1);
			break;

		case 'levels':
			hideMenu();
			createLevelMenu();
			showLevelMenu();
			break;
	}

}

function guiListener() {
	console.log(this);
	var type = this.buttonType;

	switch(type) {

		case 'resetButton':
			//resetBoard2();
			hideMenu();
			animationBoardOut();
			console.log('wtfff');
			game.time.events.add(Phaser.Timer.QUARTER*1.9, resetLevel, this);
			
			break;

		case 'menuButton':
			//resetBoard();
            clearTutorials();
            setNumberOfMoves(numOfMovesIndicator = 0);
			showMenu();
			break;
	}
}

function postGameMenuListener() {
	console.log(this);
	var type = this.buttonType;

	switch(type) {
		case 'chooseLevel':
			resetBoard2();
			showLevelMenu();
            setNumberOfMoves(numOfMovesIndicator = 0);
			hideFailMenu();
			break;

		case 'restartLevel':
			resetBoard2();
			readJson(currentLevel);
            setNumberOfMoves(numOfMovesIndicator = 0);
			hideFailMenu();
			break;

        case 'lastLevelMainMenu':
            resetWinBarrel();
            resetBoard2();
            hideLastLevelMenu();
            setNumberOfMoves(numOfMovesIndicator = 0);
            showMenu();
            resetBoard2();
	}
}

function tutorialListener() {
	console.log(this);
	swapTutorials(2);
	this.inputEnabled = false;
}

function resetLevel() {
	console.log('ven');
    resetBoard2();
	moveBarrelsToStartPosition();
	readJson(currentLevel);
	animationBoardIn();

	setNumberOfMoves(numOfMovesIndicator = 0);
}

function readNextLevel() {
	var foo = currentLevel;
	var levelNum = parseInt(foo.slice(-1))+1;

	if(levelNum <= NUM_OF_LEVELS) {
		var tmp = foo.substring(0, 5) + levelNum;
		currentLevel = foo.substring(0, 5) + levelNum;

		readJson(currentLevel);
		animationBoardIn();
		console.log(currentLevel);
	}
}