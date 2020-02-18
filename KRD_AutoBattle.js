// KRD_AutoBattle.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

(function() {

'use strict';

const battleLimit = 3;

const partyCommand = true;
const partyAuto = true;
const actorAuto = true;

//================================================
// Party Command & Actor Command Auto Enter Timer

var KRD_Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    KRD_Scene_Battle_createPartyCommandWindow.call(this);
    this._oldTime = Date.now();
    this._oldTurn = $gameTroop.turnCount();
};

var KRD_Scene_Battle_StartPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    this._oldTime = null;
    KRD_Scene_Battle_StartPartyCommandSelection.call(this);
    if (!partyCommand) {
        this.selectNextCommand();
        this._partyCommandWindow.deactivate();
    }
};

var KRD_Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    this._oldTime = null;
    KRD_Scene_Battle_startActorCommandSelection.call(this);
};

var KRD_Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
    KRD_Scene_Battle_onSkillCancel.call(this);
    this._oldTime = null;
};

var KRD_Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
    KRD_Scene_Battle_onItemCancel.call(this);
    this._oldTime = null;
};

var KRD_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    KRD_Scene_Battle_onEnemyCancel.call(this);
    this._oldTime = null;
};

var KRD_Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    KRD_Scene_Battle_update.call(this);

    if (partyAuto && this._partyCommandWindow.active) {
        if (!this._oldTime || this._oldTurn < $gameTroop.turnCount()) {
            this._oldTime = Date.now();
            this._oldTurn = $gameTroop.turnCount();
        }
        var newTime = Date.now();
        var time = Math.floor((newTime - this._oldTime) / 1000);
        $gameScreen.eraseTimer();
        $gameScreen.showTimer(battleLimit - time);
        if (!!this._oldTime && time >= battleLimit) {
            this.commandPartyAutoBattle();
            SoundManager.playOk();
            this._partyCommandWindow.deactivate();
            this._oldTime = null;
            $gameScreen.eraseTimer();
        }
    }
    if (actorAuto && this._actorCommandWindow.active) {
        if (!this._oldTime || this._oldTurn < $gameTroop.turnCount()) {
            this._oldTime = Date.now();
            this._oldTurn = $gameTroop.turnCount();
        }
        var newTime = Date.now();
        var time = Math.floor((newTime - this._oldTime) / 1000);
        $gameScreen.eraseTimer();
        $gameScreen.showTimer(battleLimit - time);
        if (!!this._oldTime && time >= battleLimit) {
            this.commandActorAutoBattle();
            SoundManager.playOk();
            this.changeInputWindow();
            this._oldTime = null;
        }
    }
};

//================================================
// End Command Selection

var KRD_Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
    this._actorCommandWindow.deactivate();

    KRD_Scene_Battle_endCommandSelection.call(this);

    $gameScreen.eraseTimer();
};

//================================================
// Timer Graphic

const picId = 21;
const timeMax = 10;

Game_Screen.prototype.showTimer = function(time = 10){
    const name = 'Timer';
    var x = 0;
    // var y = 816 - 48;
    var y = 624 - 180 - 48;

    for (var i = 0; i < Math.min(time, timeMax); i++) {
        //   showPicture(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
        this.showPicture(picId + i, name, 0, x + i * 48, y, 150, 150, 255, 0);
    }
};

Game_Screen.prototype.eraseTimer = function(){
    for (var i = picId; i < picId + 10; i++) {
        $gameScreen.erasePicture(i);
    }
};

}());
