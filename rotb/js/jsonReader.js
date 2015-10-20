/* this file handles the creation of the levels
   the levels are created as json-files and then parsed into phaser
   and added into arrays where we store them so they can easily be loaded later on
	
	readJson - reads a json file and stores the level.
	addBarrelHover - checks if we should also add a hover effect to certain barrels
					 depending on the level and barrels in that level.
*/
function readJson(fileName) {
		
	var parsedJsonData = JSON.parse(game.cache.getText(fileName));
	console.log(parsedJsonData);
    charges = 0;
    complete = false;

	winBarrelRow = parsedJsonData.winRow;
	winBarrelCol = parsedJsonData.winCol;
	winIndex = winBarrelCol*6 + winBarrelRow;
	console.log('WININDEX: ' + winIndex);

	var counter = 0;
	for(var i = 0; i < TEST_CONSTANT; i++) {
		for(var j = 0; j < TEST_CONSTANT; j++) {
			gameBoard[counter].barrelType = parsedJsonData.gameBoard[j][i].type;
			gameBoard[counter].visible = parsedJsonData.gameBoard[j][i].visible;
			gameBoard[counter].charges = parsedJsonData.gameBoard[j][i].charges;

            charges += parsedJsonData.gameBoard[j][i].charges;

			if(gameBoard[counter].barrelType != BARREL_EMPTY) {
				if(!gameBoard[counter].visible)
					gameBoard[counter].barrelSprite.loadTexture(BARREL_FADED);
				else
					gameBoard[counter].barrelSprite.loadTexture(gameBoard[counter].barrelType);
					gameBoard[counter].barrelSprite.inputEnabled = true;
					addBarrelHover(gameBoard[counter]);
			}
			counter++;

		}	
	}
    console.log('charges: ' + charges);
    updateBarrelVisibility2();
}

function addBarrelHover(barrel) {
	barrel.barrelSprite.events.onInputOver.add(function(){

		switch(barrel.barrelType) {

			case BARREL_REVEAL_ABOVE:
				if(TOP_ROW.indexOf(barrel.barrelId) == -1 && gameBoard[barrel.barrelId-1].barrelType != BARREL_EMPTY && gameBoard[barrel.barrelId-1].barrelSprite != BARREL_FADED) {
					tintGame(gameBoard[barrel.barrelId-1].marking, 1, 300);
					//gameBoard[barrel.barrelId-1].barrelSprite.alpha = 1;
				}
				break;

			case BARREL_REVEAL_BELOW:
				if(BOTTOM_ROW.indexOf(barrel.barrelId) == -1  && gameBoard[barrel.barrelId+1].barrelType != BARREL_EMPTY && gameBoard[barrel.barrelId+1].barrelSprite != BARREL_FADED) {
					//gameBoard[barrel.barrelId+1].barrelSprite.alpha = 1;
					tintGame(gameBoard[barrel.barrelId+1].marking, 1, 300);
				}
				break;

			case BARREL_REVEAL_LEFT:
				if(LEFT_COL.indexOf(barrel.barrelId) == -1  && gameBoard[barrel.barrelId-6].barrelType != BARREL_EMPTY && gameBoard[barrel.barrelId-6].barrelSprite != BARREL_FADED) {
					//gameBoard[barrel.barrelId-6].barrelSprite.alpha = 1;
					tintGame(gameBoard[barrel.barrelId-6].marking, 1, 300);
				}
				break;

			case BARREL_REVEAL_RIGHT:
				if(RIGHT_COL.indexOf(barrel.barrelId) == -1  && gameBoard[barrel.barrelId+6].barrelType != BARREL_EMPTY && gameBoard[barrel.barrelId+6].barrelSprite != BARREL_FADED) {
					//gameBoard[barrel.barrelId+6].marking.alpha = 1;
					tintGame(gameBoard[barrel.barrelId+6].marking, 1, 300);
				}
				break;

			case BARREL_MOVE_COL_UP: case BARREL_MOVE_COL_DOWN:
				if(LEFT_COL.indexOf(barrel.barrelId) == -1) {
					var col = calcCol(barrel.barrelId);
					for(var i = 0; i <= 5; i++) {
						if(gameBoard[col[i]].barrelType != BARREL_EMPTY)
							tintGame(gameBoard[col[i]].marking, 1, 300);
					}
				}
				break;

			case BARREL_MOVE_ROW_RIGHT: case BARREL_MOVE_ROW_LEFT:
				if(BOTTOM_ROW.indexOf(barrel.barrelId) == -1) {
					var row = calcRow(barrel.barrelId);
					for(var i = 0; i <= 5; i++) {
						if(gameBoard[row[i]].barrelType != BARREL_EMPTY)
							tintGame(gameBoard[row[i]].marking, 1, 300);
					}
				}
				break;

			case BARREL_CHARGE:
				if(TOP_ROW.indexOf(barrel.barrelId) == -1 && gameBoard[barrel.barrelId-1].barrelType != BARREL_EMPTY) {
					tintGame(gameBoard[barrel.barrelId-1].marking, 1, 300);
				}
				if(BOTTOM_ROW.indexOf(barrel.barrelId) == -1 && gameBoard[barrel.barrelId+1].barrelType != BARREL_EMPTY) {
					tintGame(gameBoard[barrel.barrelId+1].marking, 1, 300);	
				}
				if(RIGHT_COL.indexOf(barrel.barrelId) == -1 && gameBoard[barrel.barrelId+6].barrelType != BARREL_EMPTY) {
					tintGame(gameBoard[barrel.barrelId+6].marking, 1, 300);
				}
				if(LEFT_COL.indexOf(barrel.barrelId) == -1 && gameBoard[barrel.barrelId-6].barrelType != BARREL_EMPTY) {
					tintGame(gameBoard[barrel.barrelId-6].marking, 1, 300);
				}
				break;
    	}

        }, this);

    barrel.barrelSprite.events.onInputOut.add(function(){

    	switch(barrel.barrelType) {

			case BARREL_REVEAL_ABOVE:
				if(TOP_ROW.indexOf(barrel.barrelId) == -1)
					tintGame(gameBoard[barrel.barrelId-1].marking, 0, 300);
				break;

			case BARREL_REVEAL_BELOW:
				if(BOTTOM_ROW.indexOf(barrel.barrelId) == -1)
					tintGame(gameBoard[barrel.barrelId+1].marking, 0, 300);
				break;

			case BARREL_REVEAL_LEFT:
				if(LEFT_COL.indexOf(barrel.barrelId) == -1)
					tintGame(gameBoard[barrel.barrelId-6].marking, 0, 300);
				break;

			case BARREL_REVEAL_RIGHT:
				if(RIGHT_COL.indexOf(barrel.barrelId) == -1)
					tintGame(gameBoard[barrel.barrelId+6].marking, 0, 300);
				break;

			case BARREL_MOVE_COL_UP: case BARREL_MOVE_COL_DOWN:
				if(LEFT_COL.indexOf(barrel.barrelId) == -1) {
					var col = calcCol(barrel.barrelId);
					//console.log(col);
					
					for(var i = 0; i <= 5; i++) {
						tintGame(gameBoard[col[i]].marking, 0, 300);
					}
					
				}
				break;

			case BARREL_MOVE_ROW_RIGHT: case BARREL_MOVE_ROW_LEFT:
				if(BOTTOM_ROW.indexOf(barrel.barrelId) == -1) {
					var row = calcRow(barrel.barrelId);
					//console.log(row);
					for(var i = 0; i <= 5; i++) {
						tintGame(gameBoard[row[i]].marking, 0, 300);
					}
				}
				break;

			case BARREL_CHARGE:
				if(TOP_ROW.indexOf(barrel.barrelId) == -1) {
					tintGame(gameBoard[barrel.barrelId-1].marking, 0, 300);
				}
				if(BOTTOM_ROW.indexOf(barrel.barrelId) == -1) {
					tintGame(gameBoard[barrel.barrelId+1].marking, 0, 300);
				}
				if(RIGHT_COL.indexOf(barrel.barrelId) == -1) {
					tintGame(gameBoard[barrel.barrelId+6].marking, 0, 300);
				}
				if(LEFT_COL.indexOf(barrel.barrelId) == -1) {
					tintGame(gameBoard[barrel.barrelId-6].marking, 0, 300);
				}
				break;
			}

        }, this);
}
