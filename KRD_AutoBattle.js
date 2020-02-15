// KRD_AutoBattle.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

(function() {
//================================================
// Party Command Auto Enter Timer

const battleLimit = 3;

var KRD_Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    KRD_Scene_Battle_createPartyCommandWindow.call(this);
    this._oldTime = Date.now();
    this._oldTurn = $gameTroop.turnCount();
};

var KRD_Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    KRD_Scene_Battle_update.call(this);

    if (this._partyCommandWindow.active) {
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
            this._partyCommandWindow.deactivate();
            this._oldTime = null;
            $gameScreen.eraseTimer();
        }
    }
};

var KRD_Scene_Battle_StartPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    KRD_Scene_Battle_StartPartyCommandSelection.call(this);
    this._oldTime = null;
};

//================================================
// Timer Graphic

const picId = 21;
const timeMax = 10;

Game_Screen.prototype.showTimer = function(time = 10){
    const name = 'Timer';
    var x = 0;
    // var y = 816 - 48;
    var y = 624 - 200 - 48;

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
