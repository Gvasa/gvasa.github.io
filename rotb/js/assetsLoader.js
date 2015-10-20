//This is just a "pre-loader" 
//as the function name states just load in all our assets that we need

function assetsLoader() {

    game.load.image('background', 'assets/backgrounds/bg_copy.jpg');
    game.load.image('screencastbg', 'assets/backgrounds/screencast_bg.jpg');
    game.load.image('BARREL_EMPTY', 'assets/barrels/barrel_invis_76_96.png');
    game.load.image('BARREL_WIN', 'assets/barrels/barrel_win_76_96.png');
    game.load.image('BARREL_MOVE_ROW_LEFT', 'assets/barrels/barrel_move_row_left_76_96.png');
    game.load.image('BARREL_MOVE_ROW_RIGHT', 'assets/barrels/barrel_move_row_right_76_96.png');
    game.load.image('BARREL_MOVE_COL_UP', 'assets/barrels/barrel_move_col_up_76_96.png');
    game.load.image('BARREL_MOVE_COL_DOWN', 'assets/barrels/barrel_move_col_down_76_96.png');
    game.load.image('BARREL_REVEAL_ABOVE', 'assets/barrels/barrel_reveal_up_76_96.png');
    game.load.image('BARREL_REVEAL_BELOW', 'assets/barrels/barrel_reveal_below_76_96.png');
    game.load.image('BARREL_REVEAL_LEFT', 'assets/barrels/barrel_reveal_left_76_96.png');
    game.load.image('BARREL_REVEAL_RIGHT', 'assets/barrels/barrel_reveal_right_76_96.png');
    game.load.image('BARREL_CHARGE', 'assets/barrels/barrel_add_charge_76_96.png');
    game.load.image('BARREL_FADED', 'assets/barrels/barrel_tinted_black_76_96.png');
    game.load.image('BARREL_BASE', 'assets/barrels/barrel_base_76_96.png');
    game.load.image('BARREL_WIN_LARGE', 'assets/barrels/barrel_win_512_651.png');
    game.load.image('BARREL_MARKING', 'assets/barrels/barrel_marking.png');
    game.load.image('ROW_ARROW', 'assets/barrels/arrow.png');
    
    game.load.audio('sfx', 'assets/sound/barrelclick.wav');
    game.load.audio('sfxLevelComplete', 'assets/sound/levelcomplete.wav');

    game.load.text('level1', 'assets/levels/level1.json');
    game.load.text('level2', 'assets/levels/level2.json');
    game.load.text('level3', 'assets/levels/level3.json');
    game.load.text('level4', 'assets/levels/level4.json');
    game.load.text('level5', 'assets/levels/level5.json');
    game.load.text('level6', 'assets/levels/level6.json');
    game.load.text('level7', 'assets/levels/level7.json');
    game.load.text('level8', 'assets/levels/level8.json');

    game.load.image('header', 'assets/menu/menu_wood_chains_rotb.png');
    game.load.image('menuLowerButtonSprite', 'assets/menu/menuLowerButton_150_111.png');
    game.load.image('menuUpperButtonSprite', 'assets/menu/menuUpperButton_150_138.png');
    game.load.image('menuButtonSprite', 'assets/menu/menuButton_150_111.png');
    game.load.image('menuButtonWood2', 'assets/menu/menuButton_200_141.png');
    game.load.image('resetButtonSprite', 'assets/menu/menuButtonReset_196_53.png');
    game.load.image('mainMenuButtonSprite', 'assets/menu/main_menu_196_53.png');
    game.load.image('continueButtonSprite', 'assets/menu/menuButtonContinue_150_113.png');
    game.load.image('levelsButtonSprite', 'assets/menu/menuButtonLevels_150_113.png');
    game.load.image('playButtonSprite', 'assets/menu/menuButtonPlay_150_113.png');
    game.load.image('nextLevelSprite', 'assets/menu/nextLevel_150_113.png');
    game.load.image('outOfChargesSprite', 'assets/menu/out_of_charges_420_310.png');
    game.load.image('chooseLevelSprite', 'assets/menu/choose_level_150_113.png');
    game.load.image('restartLevelSprite', 'assets/menu/restart_level_150_113.png');
    
    game.load.image('gameCompleteSprite', 'assets/menu/game_complete_420_310.png');
    game.load.image('mainMenuGameCompleteSprite', 'assets/menu/main_menu_150_113.png');

    game.load.image('tutorial_1_1', 'assets/tutorials/tutorial_1_1_420_310.png');
    game.load.image('tutorial_1_2', 'assets/tutorials/tutorial_1_2_420_310.png');
    game.load.image('tutorial_1_3', 'assets/tutorials/tutorial_1_3_420_310.png');

    game.load.image('tintBlack', 'assets/splash_screens/tint_game_black.png');
    game.load.image('winBarrelGlow', 'assets/splash_screens/barrel_aura.png');

    game.load.image('spriteStar', 'assets/barrelIcons/chargeFlash_25_37.png');
    game.load.image('spriteChargeUpper', 'assets/barrelIcons/charge_upper_76_96.png');
    game.load.image('spriteChargeLower', 'assets/barrelIcons/charge_lower_76_96.png');

    game.load.image('spriteGuiUpper', 'assets/gui/gui_upper_bar.png');
    game.load.image('spriteGuiLower', 'assets/gui/gui_lower_bar.png');

    game.load.spritesheet('levels', 'assets/barrels/levels/levels_spritesheet.png', 77, 98);

    game.load.image('levelCompleteButtonSprite', 'assets/menu/level_complete_420_310.png');

    //game.load.spritesheet('smoke', 'assets/particles/smoke_animation.png', 128, 128);
}