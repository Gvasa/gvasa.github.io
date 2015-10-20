/*Defines all the FINAL values that are used. 
  
  NOT ALLOWED TO CHANGE ANYTHING IN THIS FILE IF 
  YOU ARE NOT 100% SURE THAT IT SHOULD BE CHANGED

*/

var BARREL_REVEAL_ABOVE = 'BARREL_REVEAL_ABOVE';
var BARREL_REVEAL_BELOW = 'BARREL_REVEAL_BELOW';
var BARREL_REVEAL_LEFT = 'BARREL_REVEAL_LEFT';
var BARREL_REVEAL_RIGHT = 'BARREL_REVEAL_RIGHT';
var BARREL_CHARGE = 'BARREL_CHARGE';
var BARREL_MOVE_COL_UP = 'BARREL_MOVE_COL_UP';
var BARREL_MOVE_COL_DOWN = 'BARREL_MOVE_COL_DOWN';
var BARREL_MOVE_ROW_LEFT = 'BARREL_MOVE_ROW_LEFT';
var BARREL_MOVE_ROW_RIGHT = 'BARREL_MOVE_ROW_RIGHT';
var BARREL_EMPTY = 'BARREL_EMPTY';
var BARREL_WIN = 'BARREL_WIN';
var BARREL_FADED = 'BARREL_FADED';
var BARREL_MARKING = 'BARREL_MARKING';

var BOARD_COLS;
var BOARD_ROWS;
var counter = 0;
var idcounter = 0;
var numOfMovesIndicator = 0;
var levelCounter = 1;

var TEST_CONSTANT = 6;
var BARREL_WIDTH = 80*1.05;
var BARREL_HEIGHT = 100*1.05;
var X_SHIFT = 73;
var Y_SHIFT = 163;
var BARREL_SPRITE_WIDTH = 76;
var BARREL_SPRITE_HEIGHT = 96;
var NUM_OF_LEVELS = 8;

var TOP_ROW = [0, 6, 12, 18, 24, 30];
var BOTTOM_ROW = [5, 11, 17, 23, 29];
var LEFT_COL = [0, 1, 2, 3, 4, 5];
var RIGHT_COL = [30, 31, 32, 33, 34];

var TWEENCHECK;

var guiGroup;

var gameBoard;
var gameBoard2;

var winBarrelCol;
var winBarrelRow;
var winIndex;

var currentLevel = '';

var bClick;

var fileText;

var charges;
var complete;

var header;

var mainMenuButtonSprite1;
var mainMenuButtonSprite2;
var menuButton1;
var menuButton2;

var levelButton1;
var levelButton2;
var levelButton3;
var levelButton4;
var levelButton5;
var levelButton6;
var levelButton7;
var levelButton8;

var barrelMarking;

//var nextLevelButton;
var levelCompleteButton;

// Lower GUI
var resetButton;
var mainMenuButton;

// Upper GUI
var levelIndicator;
var numOfMovesIndicator;
var movesIndicatorText;
var levelIndicatorText;

var outOfChargesButton;
var chooseLevelButton;
var restartLevelButton;

var lastLevelMainMenuButton;
var gameComplete;

var tutorial_1_1;
var tutorial_1_2;
var tutorial_1_3;
var tintBlack;
var tutorialContinue;

var winBarrelGlow;
var tmpX;
var tmpY;