/* This file has all functions that handles
 	all the barrels different interactions with eachother.

 	You'll find following functions:
	
		showBarrelRight void - shows the barrel to the RIGHT of the selected barrel
		showBarrelLeft - shows the barrel to the LEFT of the selected barrel
		showBarrelAbove - shows the barrel ABOVE the selected barrel
		showBarrelBelow - shows the barrel BELOW the selected barrel

		moveColUp - moves the column to the left of the selected barrel UP
		moveColDown - moves the column to the left of the selected barrel DOWN
		
		moveRowRight - moves the row below the selected barrel RIGHT
		moveRowLeft - moves the row below the selected barrel LEFT

		addCharge - will add a CHARGE to the barrel surrounding the selected barrel
					above, below, right & left

		calcCol - returns the column that is supposed to be moved
		calcRow - returns the row that is supposed to be moved

		compare - small comparement function used by the built in sorting functions for arrays
*/
function showBarrelRight(tmpBarrel) {

	var currentBarrel = tmpBarrel.barrelId;
	var rightBarrel = currentBarrel+6;

   	gameBoard[rightBarrel].barrelSprite.loadTexture(gameBoard[rightBarrel].barrelType);
    gameBoard[rightBarrel].visible = true;
    updateBarrelVisibility2();
}

function showBarrelLeft(tmpBarrel) {
	
	var currentBarrel = tmpBarrel.barrelId;
	var leftBarrel = currentBarrel-6;
   	
   	gameBoard[leftBarrel].barrelSprite.loadTexture(gameBoard[leftBarrel].barrelType);
    gameBoard[leftBarrel].visible = true;

  	updateBarrelVisibility2();
}

function showBarrelAbove(tmpBarrel) {
    console.log('shwo above!');
    var currentBarrel = tmpBarrel.barrelId;
    var aboveBarrel = currentBarrel-1;

   	gameBoard[aboveBarrel].barrelSprite.loadTexture(gameBoard[aboveBarrel].barrelType);
    gameBoard[aboveBarrel].visible = true;

    updateBarrelVisibility2();
}

function showBarrelBelow (tmpBarrel) {
	console.log('show bellow!');
	var currentBarrel = tmpBarrel.barrelId;
	var belowBarrel = currentBarrel+1;

   	gameBoard[belowBarrel].barrelSprite.loadTexture(gameBoard[belowBarrel].barrelType);
	gameBoard[belowBarrel].visible = true;

	updateBarrelVisibility2();
}

function moveColUp (tmpBarrel) {
	var currentBarrel = tmpBarrel.barrelId;
	var colToMove = calcCol(tmpBarrel.barrelId);
	var winBarrelInArray = colToMove.indexOf(winIndex);
	tmpBarrel.barrelSprite.inputEnabled = false;
	animateColUp(colToMove);
	if(winBarrelInArray != -1 && gameBoard[colToMove[winBarrelInArray+1]].barrelType != BARREL_EMPTY) {
			console.log(colToMove);
			console.log('asdasd');
			levelComplete();
			return;
	}

	updateBarrelVisibility2();
	game.time.events.add(Phaser.Timer.QUARTER, function() {
		var tmpId = gameBoard[colToMove[5]].barrelId;
		var tmpPosX = gameBoard[colToMove[5]].spritePosX;
		var tmpPosY = gameBoard[colToMove[5]].spritePosY;

		for(var i = 5; i >= 0; i--) {
			if(i == 0) {
				gameBoard[colToMove[i]].barrelId = tmpId;
				gameBoard[colToMove[i]].spritePosX = tmpPosX;
				gameBoard[colToMove[i]].spritePosY = tmpPosY;
			} else if(colToMove[i-1] == winIndex) {
				gameBoard[colToMove[i]].barrelId = gameBoard[colToMove[i-2]].barrelId;
				gameBoard[colToMove[i]].spritePosX = gameBoard[colToMove[i-2]].spritePosX;
				gameBoard[colToMove[i]].spritePosY = gameBoard[colToMove[i-2]].spritePosY;
				i--;
			} else {
				gameBoard[colToMove[i]].barrelId = gameBoard[colToMove[i-1]].barrelId;
				gameBoard[colToMove[i]].spritePosX = gameBoard[colToMove[i-1]].spritePosX;
				gameBoard[colToMove[i]].spritePosY = gameBoard[colToMove[i-1]].spritePosY;
			}
		}
		gameBoard.sort(compare);
		updateBarrelVisibility2();
		tmpBarrel.barrelSprite.inputEnabled = true;
	}, this);

	
}

function moveColDown (tmpBarrel) {
	var currentBarrel = tmpBarrel.barrelId;
	var colToMove = calcCol(tmpBarrel.barrelId);
	var winBarrelInArray = colToMove.indexOf(winIndex);
	tmpBarrel.barrelSprite.inputEnabled = false;
	animateColDown(colToMove);
	if(winBarrelInArray != -1 && gameBoard[colToMove[winBarrelInArray-1]].barrelType != BARREL_EMPTY) {
		levelComplete();
		return;
	}

	game.time.events.add(Phaser.Timer.QUARTER, function() {
			var tmpId = gameBoard[colToMove[0]].barrelId;
			var tmpPosX = gameBoard[colToMove[0]].spritePosX;
			var tmpPosY = gameBoard[colToMove[0]].spritePosY;

			for(var i = 0; i <= 5; i++) {
				if(i == 5) {
					gameBoard[colToMove[i]].barrelId = tmpId;
					gameBoard[colToMove[i]].spritePosX = tmpPosX;
					gameBoard[colToMove[i]].spritePosY = tmpPosY;
				} else if(colToMove[i+1] == winIndex) {
					gameBoard[colToMove[i]].barrelId = gameBoard[colToMove[i+2]].barrelId;
					gameBoard[colToMove[i]].spritePosX = gameBoard[colToMove[i+2]].spritePosX;
					gameBoard[colToMove[i]].spritePosY = gameBoard[colToMove[i+2]].spritePosY;
					i++;
				} else {
					gameBoard[colToMove[i]].barrelId = gameBoard[colToMove[i+1]].barrelId;
					gameBoard[colToMove[i]].spritePosX = gameBoard[colToMove[i+1]].spritePosX;
					gameBoard[colToMove[i]].spritePosY = gameBoard[colToMove[i+1]].spritePosY;
				}
			}
			gameBoard.sort(compare);
			updateBarrelVisibility2();
			tmpBarrel.barrelSprite.inputEnabled = true;
		}, this);

}

function moveRowRight (tmpBarrel) {

	var currentBarrel = tmpBarrel.barrelId;
	var rowToMove = calcRow(tmpBarrel.barrelId);
	var winBarrelInArray = rowToMove.indexOf(winIndex);

	tmpBarrel.barrelSprite.inputEnabled = false;
	
	animateRowRight(rowToMove);
	if(winBarrelInArray != -1 && gameBoard[rowToMove[winBarrelInArray-1]].barrelType != BARREL_EMPTY) {
			levelComplete();
			return;
	}

	game.time.events.add(Phaser.Timer.QUARTER, function() {
		var tmpId = gameBoard[rowToMove[0]].barrelId;
		var tmpPosX = gameBoard[rowToMove[0]].spritePosX;
		var tmpPosY = gameBoard[rowToMove[0]].spritePosY;

		for(var i = 0; i <= 5; i++) {
			if(i == 5) {
				gameBoard[rowToMove[i]].barrelId = tmpId;
				gameBoard[rowToMove[i]].spritePosX = tmpPosX;
				gameBoard[rowToMove[i]].spritePosY = tmpPosY;
			} else if (rowToMove[i+1] == winIndex) {
				gameBoard[rowToMove[i]].barrelId = gameBoard[rowToMove[i+2]].barrelId;
				gameBoard[rowToMove[i]].spritePosX = gameBoard[rowToMove[i+2]].spritePosX;
				gameBoard[rowToMove[i]].spritePosY = gameBoard[rowToMove[i+2]].spritePosY;
				i++;
			} else {
				gameBoard[rowToMove[i]].barrelId = gameBoard[rowToMove[i+1]].barrelId;
				gameBoard[rowToMove[i]].spritePosX = gameBoard[rowToMove[i+1]].spritePosX;
				gameBoard[rowToMove[i]].spritePosY = gameBoard[rowToMove[i+1]].spritePosY;
			}
		}
		gameBoard.sort(compare);
		updateBarrelVisibility2();
		tmpBarrel.barrelSprite.inputEnabled = true;
	}, this);

	

}
function moveRowLeft (tmpBarrel) {
	var currentBarrel = tmpBarrel.barrelId;
	var rowToMove = calcRow(tmpBarrel.barrelId);
	var winBarrelInArray = rowToMove.indexOf(winIndex);
	tmpBarrel.barrelSprite.inputEnabled = false;

	animateRowLeft(rowToMove);
	if(winBarrelInArray != -1 && gameBoard[rowToMove[winBarrelInArray+1]].barrelType != BARREL_EMPTY) {
			levelComplete();
			return;
	}

	game.time.events.add(Phaser.Timer.QUARTER, function() {
		
			var tmpId = gameBoard[rowToMove[5]].barrelId;
			var tmpPosX = gameBoard[rowToMove[5]].spritePosX;
			var tmpPosY = gameBoard[rowToMove[5]].spritePosY;
				
			for(var i = 5; i >= 0; i--) {
				if(i == 0) {
					gameBoard[rowToMove[i]].barrelId = tmpId;
					gameBoard[rowToMove[i]].spritePosX = tmpPosX;
					gameBoard[rowToMove[i]].spritePosY = tmpPosY;
					
				} else if(rowToMove[i-1] == winIndex) {
					if(winIndex == rowToMove[0]) {
						gameBoard[rowToMove[i]].barrelId = tmpId;
						gameBoard[rowToMove[i]].spritePosX = tmpPosX;
						gameBoard[rowToMove[i]].spritePosY = tmpPosY;
						i--;
					} else {
						gameBoard[rowToMove[i]].barrelId = gameBoard[rowToMove[i-2]].barrelId;
						gameBoard[rowToMove[i]].spritePosX = gameBoard[rowToMove[i-2]].spritePosX;
						gameBoard[rowToMove[i]].spritePosY = gameBoard[rowToMove[i-2]].spritePosY;
						i--;
					}
				} else {
					gameBoard[rowToMove[i]].barrelId = gameBoard[rowToMove[i-1]].barrelId;
					gameBoard[rowToMove[i]].spritePosX = gameBoard[rowToMove[i-1]].spritePosX;
					gameBoard[rowToMove[i]].spritePosY = gameBoard[rowToMove[i-1]].spritePosY;
					
				}
			}
			gameBoard.sort(compare);
			updateBarrelVisibility2();
			tmpBarrel.barrelSprite.inputEnabled = true;

		}, this);	
}

function addCharge (tmpBarrel) {
	console.log('add charge!');
	
	if(TOP_ROW.indexOf(tmpBarrel.barrelId) == -1 && gameBoard[tmpBarrel.barrelId-1].barrelType != BARREL_EMPTY) {
		gameBoard[tmpBarrel.barrelId-1].charges++;
		charges++;
        console.log('CHARGE UP!');
        //console.log(gameBoard[tmpBarrel.barrelId-1]);
	}
	if(BOTTOM_ROW.indexOf(tmpBarrel.barrelId) == -1 && gameBoard[tmpBarrel.barrelId+1].barrelType != BARREL_EMPTY) {
		gameBoard[tmpBarrel.barrelId+1].charges++;
        charges++;
        console.log('CHARGE DOWN!');
        //console.log(gameBoard[tmpBarrel.barrelId+1]);
	}
	if(RIGHT_COL.indexOf(tmpBarrel.barrelId) == -1 && gameBoard[tmpBarrel.barrelId+6].barrelType != BARREL_EMPTY) {
		gameBoard[tmpBarrel.barrelId+6].charges++;
        charges++;
        console.log('CHARGE RIGHT!');
        //console.log(gameBoard[tmpBarrel.barrelId+6]);
	}
	if(LEFT_COL.indexOf(tmpBarrel.barrelId) == -1 && gameBoard[tmpBarrel.barrelId-6].barrelType != BARREL_EMPTY) {
		//console.log(gameBoard[tmpBarrel.barrelId+6]);
		gameBoard[tmpBarrel.barrelId-6].charges++;
		//console.log(gameBoard[tmpBarrel.barrelId+6]);
        charges++;
        console.log('CHARGE LEFT!');
        //console.log(gameBoard[tmpBarrel.barrelId-6]);
	}
	updateBarrelVisibility2();

}


function calcCol(barrelId) {
	switch(barrelId) {
		case 6: case 7: case 8: case 9: case 10: case 11:
			return [0, 1, 2, 3, 4, 5]; break;
		case 12: case 13: case 14: case 15: case 16: case 17:
			return [6, 7, 8, 9, 10, 11]; break; 
		case 18: case 19: case 20: case 21: case 22: case 23:
			return [12, 13, 14, 15, 16, 17]; break; 
		case 24: case 25: case 26: case 27: case 28: case 29:
			return [18, 19, 20, 21, 22, 23]; 
		case 30: case 31: case 32: case 33: case 34: case 35:
			return [24, 25, 26, 27, 28, 29];
	}
}
function calcRow(barrelId) {
	switch(barrelId) {
		case 0: case 6: case 12: case 18: case 24: case 30:
			return [1, 7, 13, 19, 25, 31]; break;
		case 1: case 7: case 13: case 19: case 25: case 31:
			return [2, 8, 14, 20, 26, 32]; break;
		case 2: case 8: case 14: case 20: case 26: case 32:
			return [3, 9, 15, 21, 27, 33]; break;
		case 3: case 9: case 15: case 21: case 27: case 33:
			return [4, 10, 16, 22, 28, 34]; break;
		case 4: case 10: case 16: case 22: case 28: case 34:
			return [5, 11, 17, 23, 29, 35]; break;	
	}
}

function compare(barrel1, barrel2) {
	if(barrel1.barrelId < barrel2.barrelId)
		return -1;
	if(barrel1.barrelId > barrel2.barrelId)
		return 1;
	return 0;
}
