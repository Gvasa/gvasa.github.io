/*This file handles the animations in a way. 
The animations are created in another file but should be called from here
since we want to keep it easy to read and structured.

be carefull if you change something in these functions because they are quite
easy to screw up.

    You'll find following functions:
		
		animationBoardIn - Animates the gameboard in from the right
		animationBoardOut - Animates the gameboard ou to the left
		
		animateColUp - animates the column to the left of the selected barrel one step UP
		animateColDown - animates the column to the left of the seleceted barrel one step DOWN
		animateRowLeft - animates the row below the selected barrel one step LEFT
		animateRowRight - animates the row below the selected barrel one step RIGHT
		
		moveBarrelToStartPosition - will move barrels far to the right and 
									prepare them for when needed to be animated in

		animateWinBarrel - will animate the winBarrel to the center of the screen
		animateWinBarrelGlow - animates the glow behind the winBarrel
		resetGlowScale -
*/

function animationBoardIn() {
	var speed = 320;

	for(var i = 1; i <= 36; i ++) {
		moveFromXAnimation(gameBoard[i-1].barrelSprite, gameBoard[i-1].spritePosX, speed);
		moveFromXAnimation(gameBoard[i-1].marking, gameBoard[i-1].spritePosX-4, speed);
		speed = speed + 54;

		if(i%6 == 0)
			speed = 320;
	}
}

function animationBoardOut() {
	var speed = 320;

	for(var i = 1; i <= 36; i ++) {
		moveFromXAnimation(gameBoard[i-1].barrelSprite, -1000, speed);
		moveFromXAnimation(gameBoard[i-1].marking, -1000, speed);
		speed = speed + 54;

		if(i%6 == 0)
			speed = 320;
	}
}

function animateColUp(colArray) {
	var speed = 150;
	
	var tmpMarking = game.add.sprite(gameBoard[colArray[0]].marking.x-4, gameBoard[colArray[0]].marking.y-4, BARREL_MARKING);
	var tmpBarrel = game.add.sprite(gameBoard[colArray[0]].spritePosX,gameBoard[colArray[0]].spritePosY, gameBoard[colArray[0]].barrelType);
	
	if(gameBoard[colArray[0]].barrelType == BARREL_EMPTY)
		tmpMarking.alpha = false;

	game.world.bringToTop(guiGroup);
	game.world.bringToTop(gameBoard[winIndex].barrelSprite);
	gameBoard[colArray[0]].barrelSprite.y = 960+BARREL_HEIGHT;
	gameBoard[colArray[0]].marking.y = 960+BARREL_HEIGHT;

	for(var i = 0; i < 6; i++) {
		if(colArray[i] == winIndex) {
			continue;
		} else if(colArray[i-1] == winIndex) {
			if(gameBoard[colArray[i]].barrelType != BARREL_EMPTY) {
				moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[i]+5].spritePosY, speed);
				moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[i]+5].marking.y, speed);
			}
			else {
				if(winIndex == colArray[0]) {
					moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[5]+6].spritePosY, speed);
					moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[5]+6].marking.y, speed);
				}
				else {
					moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[i]+4].spritePosY, speed);
					moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[i]+4].marking.y, speed);
				}
			}
		}else if(i == 0) {
			moveToYAnimation(gameBoard[colArray[0]].barrelSprite, gameBoard[colArray[5]].spritePosY, speed);
			moveToYAnimation(gameBoard[colArray[0]].marking, gameBoard[colArray[5]].marking.y, speed);
		} else {
			moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[i]+5].spritePosY, speed);
			moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[i]+5].marking.y, speed);
		}
	}
	if(colArray[0] != winIndex) {
		moveToYAnimation(tmpBarrel, -BARREL_HEIGHT, speed);
		moveToYAnimation(tmpMarking, -BARREL_HEIGHT, speed);
	}
}

function animateColDown(colArray) {
	var speed = 150;

	var tmpMarking = game.add.sprite(gameBoard[colArray[5]].marking.x-4, gameBoard[colArray[5]].marking.y-4, BARREL_MARKING);
	var tmpBarrel = game.add.sprite(gameBoard[colArray[5]].spritePosX,gameBoard[colArray[5]].spritePosY, gameBoard[colArray[5]].barrelType);
	
	if(gameBoard[colArray[5]].barrelType == BARREL_EMPTY)
		tmpMarking.alpha = false;

	game.world.bringToTop(guiGroup);
	game.world.bringToTop(gameBoard[winIndex].barrelSprite);
	gameBoard[colArray[5]].barrelSprite.y = -BARREL_HEIGHT;
	gameBoard[colArray[5]].marking.y = -BARREL_HEIGHT;

	for(var i = 0; i < 6; i++) {
		if(colArray[i] == winIndex) {
			continue;
		} else if(colArray[i+1] == winIndex) {
			if(gameBoard[colArray[i]].barrelType != BARREL_EMPTY) {
				moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[i]+7].spritePosY, speed);
				moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[i]+7].marking.y, speed);
			}
			else {
				if(winIndex == colArray[5]) {
					moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[5]+1].spritePosY, speed);
					moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[5]+1].marking.y, speed);
				}
				else {
					moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[0]+6].spritePosY, speed);
					moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[0]+6].marking.y, speed);
				}
			}
		}else if(i == 5) {
			moveToYAnimation(gameBoard[colArray[5]].barrelSprite, gameBoard[colArray[0]].spritePosY, speed);
			moveToYAnimation(gameBoard[colArray[5]].marking, gameBoard[colArray[0]].marking.y, speed);
		} else {
			moveToYAnimation(gameBoard[colArray[i]].barrelSprite, gameBoard[colArray[i]+7].spritePosY, speed);
			moveToYAnimation(gameBoard[colArray[i]].marking, gameBoard[colArray[i]+7].marking.y, speed);			
		}
	}
	if(colArray[5] != winIndex) {
		moveToYAnimation(tmpBarrel, 960+BARREL_HEIGHT, speed);
		moveToYAnimation(tmpMarking, 960+BARREL_HEIGHT, speed);
	}
}

function animateRowLeft(rowArray) {
	var speed = 150;

	var tmpMarking = game.add.sprite(gameBoard[rowArray[0]].marking.x-4, gameBoard[rowArray[0]].marking.y-4, BARREL_MARKING);
	var tmpBarrel = game.add.sprite(gameBoard[rowArray[0]].spritePosX, gameBoard[rowArray[0]].spritePosY, gameBoard[rowArray[0]].barrelType);

	if(gameBoard[rowArray[0]].barrelType == BARREL_EMPTY)
		tmpMarking.alpha = false;


	game.world.bringToTop(guiGroup);
	game.world.bringToTop(gameBoard[winIndex].barrelSprite);

	gameBoard[rowArray[0]].barrelSprite.x = 640+BARREL_WIDTH;
	gameBoard[rowArray[0]].marking.x = 640+BARREL_WIDTH;

	for(var i = 0; i < 6; i++) {
		if(rowArray[i] == winIndex)
			continue;
		else if(rowArray[i-1] == winIndex) {
			if(gameBoard[rowArray[i]].barrelType != BARREL_EMPTY) {
				moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[i]-5].spritePosX, speed);
				moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[i]-5].marking.x, speed);
			}
			else {
				if(winIndex == rowArray[0]) {
					moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[5]-1].spritePosX, speed);
					moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[5]-1].marking.x, speed);
				}
				else {
					moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[i]-11].spritePosX, speed);
					moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[i]-11].marking.x, speed);
				}
			}
		}else if(i == 0) {
			moveToXAnimation(gameBoard[rowArray[0]].barrelSprite, gameBoard[rowArray[5]].spritePosX, speed);
			moveToXAnimation(gameBoard[rowArray[0]].marking, gameBoard[rowArray[5]].marking.x, speed);
		} else {
			moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[i]-5].spritePosX, speed);
			moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[i]-5].marking.x, speed);
		}
	}
	if(rowArray[0] != winIndex) {
		moveToXAnimation(tmpBarrel, -BARREL_WIDTH, speed);
		moveToXAnimation(tmpMarking, -BARREL_WIDTH, speed);
	}
}

function animateRowRight(rowArray) {
	var speed = 150;
	
	var tmpMarking = game.add.sprite(gameBoard[rowArray[5]].marking.x-4, gameBoard[rowArray[5]].marking.y-4, BARREL_MARKING);
	var tmpBarrel = game.add.sprite(gameBoard[rowArray[5]].spritePosX, gameBoard[rowArray[5]].spritePosY, gameBoard[rowArray[5]].barrelType);
	
	if(gameBoard[rowArray[5]].barrelType == BARREL_EMPTY)
		tmpMarking.alpha = false;


	game.world.bringToTop(guiGroup);
	game.world.bringToTop(gameBoard[winIndex].barrelSprite);

	gameBoard[rowArray[5]].barrelSprite.x = -BARREL_WIDTH;
	gameBoard[rowArray[5]].marking.x = -BARREL_WIDTH;

	for(var i = 0; i < 6; i++) {
		if(rowArray[i] == winIndex)
			continue;
		else if(rowArray[i+1] == winIndex) {
			if(gameBoard[rowArray[i]].barrelType != BARREL_EMPTY) {
				moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[i]+5].spritePosX, speed);
				moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[i]+5].marking.x, speed);
			}
			else {
				if(winIndex == rowArray[5]) {
					moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[0]-1].spritePosX, speed);
					moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[0]-1].marking.x, speed);
				}
				else {
					moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[i]-4].spritePosX, speed);
					moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[i]-4].marking.x, speed);
				}
			}
		}else if(i == 5) {
			moveToXAnimation(gameBoard[rowArray[5]].barrelSprite, gameBoard[rowArray[0]].spritePosX, speed);
			moveToXAnimation(gameBoard[rowArray[5]].marking, gameBoard[rowArray[0]].marking.x, speed);
		} else {
				moveToXAnimation(gameBoard[rowArray[i]].barrelSprite, gameBoard[rowArray[i]+5].spritePosX, speed);
				moveToXAnimation(gameBoard[rowArray[i]].marking, gameBoard[rowArray[i]+5].marking.x, speed);			
		}
	}
	if(rowArray[5] != winIndex) {
		moveToXAnimation(tmpBarrel, 640+BARREL_WIDTH, speed);
		moveToXAnimation(tmpMarking, 640+BARREL_WIDTH, speed);
	}
	
}

function moveBarrelsToStartPosition() {
	resetBoard2();

	for(var i = 0; i < 36; i ++) {
		gameBoard[i].marking.x = 1000;
		gameBoard[i].barrelSprite.x = 1000;
	}
}

function animateWinBarrel() {
    gameBoard[winIndex].barrelSprite.loadTexture('BARREL_WIN_LARGE');
    gameBoard[winIndex].barrelSprite.scale.setTo(BARREL_SPRITE_WIDTH/512, BARREL_SPRITE_HEIGHT/651);
    gameBoard[winIndex].barrelSprite.x = tmpX;
    gameBoard[winIndex].barrelSprite.y = tmpY;
    gameBoard[winIndex].marking.alpha = false;
    scaleXYAnimation(gameBoard[winIndex].barrelSprite, 0.5, 0.5, 700);
    moveToXYAnimation(gameBoard[winIndex].barrelSprite, 200, 420, 700);
}

function animateWinBarrelGlow() {
    winBarrelGlow.anchor.setTo(0.5, 0.5);
    winBarrelGlow.alpha = true;
    winBarrelGlow.scale.setTo(BARREL_SPRITE_HEIGHT/400, BARREL_SPRITE_HEIGHT/400);
    winBarrelGlow.x = (tmpX - BARREL_SPRITE_WIDTH/2) + BARREL_SPRITE_WIDTH;
    winBarrelGlow.y = (tmpY - BARREL_SPRITE_WIDTH/2) + BARREL_SPRITE_WIDTH + 50;
    scaleXYAnimation(winBarrelGlow, 1.6, 1.6, 700);
    moveToXYAnimation(winBarrelGlow, 320, 560, 700);
    rotateAnimation(winBarrelGlow, 360, 8000, true);
}

function resetGlowScale() {
        winBarrelGlow.scale.setTo(2,2);
}