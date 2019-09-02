// KRD_MapStatus.js
//
// Copyright (c) 2019 kuroudo (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Status Window on Map.
 * @author kuroudo (くろうど)
 * 
 */

/*:ja
 * @plugindesc マップ画面にステータス（戦闘時と同じ）を表示します。
 * @author kuroudo (くろうど)
 * 
 */

var krdMapStatus = true;

(function() {

'use strict';

var KRD_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    this.createMenuStatus();
    KRD_Scene_Map_createAllWindows.call(this);
};

Scene_Map.prototype.createMenuStatus = function() {
    this._statusWindow = new Window_MapStatus();
    this.addWindow(this._statusWindow);
    this._statusWindow.open();
};

var KRD_Scene_Map_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
    KRD_Scene_Map_updateMain.call(this);
    this.updateStatus();
};

Scene_Map.prototype.updateStatus = function() {
    if (krdMapStatus) {
        this._statusWindow.refresh();
        krdMapStatus = false;
    }
};

Game_Actor.prototype.checkFloorEffect = function() {
    if ($gamePlayer.isOnDamageFloor()) {
        this.executeFloorDamage();
        krdMapStatus = true;
    }
};

Game_Actor.prototype.turnEndOnMap = function() {
    if ($gameParty.steps() % this.stepsForTurn() === 0) {
        this.onTurnEnd();
        if (this.result().hpDamage > 0) {
            this.performMapDamage();
        }
        krdMapStatus = true;
    }
};

var KRD_BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    KRD_BattleManager_endBattle.call(this, result);
    krdMapStatus = true;
};

//================================================
function Window_MapStatus() {
    this.initialize.apply(this, arguments);
}

Window_MapStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_MapStatus.prototype.constructor = Window_MapStatus;

Window_MapStatus.prototype.initialize = function() {
    Window_BattleStatus.prototype.initialize.call(this);
    krdMapStatus = true;
};

//================================================
})();
