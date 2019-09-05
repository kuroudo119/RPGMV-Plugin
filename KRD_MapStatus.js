// KRD_MapStatus.js
//
// Copyright (c) 2019 kuroudo (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Status Window on Map.
 * @author kuroudo (くろうど)
 * 
 * @param MapStatus
 * @desc Input Variables Number to Status Window Flags.
 * @default 1
 *
 * @help
 * - Value in MapStatus
 * -2 : Nothing (at Close)
 * -1 : Window Close
 *  0 : Nothing (at Open)
 *  1 : Refresh
 *  2 : Window Open
 * 
 */

/*:ja
 * @plugindesc マップ画面にステータス（戦闘時と同じ）を表示します。
 * @author kuroudo (くろうど)
 * 
 * @param MapStatus
 * @desc ステータス表示に使用する変数番号を入力してください。
 * @default 1
 *
 * @help
 * ▼MapStatusの変数に入れる値
 * -2 : 非表示継続（更新なし）
 * -1 : 非表示に変更
 *  0 : 表示あり（更新なし）
 *  1 : 表示を更新する
 *  2 : 非表示から再表示する
 * 
 */

var parameters = PluginManager.parameters('KRD_MapStatus');
var mapStatus = Number(parameters['MapStatus'] || 1);

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
    var krdMapStatus = $gameVariables.value(mapStatus);
    if (krdMapStatus === 1) {
        this._statusWindow.refresh();
        krdMapStatus = 0;
        $gameVariables.setValue(mapStatus, krdMapStatus);
    } else if (krdMapStatus === 2) {
        this._statusWindow.open();
        krdMapStatus = 1;
        $gameVariables.setValue(mapStatus, krdMapStatus);
    } else if (krdMapStatus === -1) {
        this._statusWindow.close();
        krdMapStatus = -2;
        $gameVariables.setValue(mapStatus, krdMapStatus);
    }
};

Game_Actor.prototype.checkFloorEffect = function() {
    if ($gamePlayer.isOnDamageFloor()) {
        this.executeFloorDamage();
        var krdMapStatus = $gameVariables.value(mapStatus);
        krdMapStatus = krdMapStatus >= 0 ? 1 : -1;
        $gameVariables.setValue(mapStatus, krdMapStatus);
    }
};

Game_Actor.prototype.turnEndOnMap = function() {
    if ($gameParty.steps() % this.stepsForTurn() === 0) {
        this.onTurnEnd();
        if (this.result().hpDamage > 0) {
            this.performMapDamage();
        }
        var krdMapStatus = $gameVariables.value(mapStatus);
        krdMapStatus = krdMapStatus >= 0 ? 1 : -1;
        $gameVariables.setValue(mapStatus, krdMapStatus);
    }
};

var KRD_BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    KRD_BattleManager_endBattle.call(this, result);
    var krdMapStatus = $gameVariables.value(mapStatus);
    krdMapStatus = krdMapStatus >= 0 ? 1 : -1;
    $gameVariables.setValue(mapStatus, krdMapStatus);
};

//================================================
function Window_MapStatus() {
    this.initialize.apply(this, arguments);
}

Window_MapStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_MapStatus.prototype.constructor = Window_MapStatus;

Window_MapStatus.prototype.initialize = function() {
    Window_BattleStatus.prototype.initialize.call(this);
    var krdMapStatus = $gameVariables.value(mapStatus);
    krdMapStatus = krdMapStatus >= 0 ? 1 : -1;
    $gameVariables.setValue(mapStatus, krdMapStatus);
};

//================================================
})();
