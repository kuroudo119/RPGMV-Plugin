//================================================
// KRD_AutoMove.js
//
// Copyright (c) 2019 kuroudo (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Player auto move.
 * @author kuroudo (くろうど)
 * 
 * @param AutoMoveSwitch
 * @desc Input auto move switch number.
 * Default: 1
 * @default 1
 *
 * @param XY_Flag
 * @desc Input x or y. This is auto move destination.
 * Default: x
 * @default x
 * 
 * @param Destination
 * @desc true = +1, false = -1.
 * Default: true
 * @default true
 * 
 * @param CenterPosition
 * @desc Input center position.
 * Default: 0
 * @default 0
 * 
 * @help Thank You.
 */

 /*:ja
 * @plugindesc アクターを強制移動させます。(20190807)
 * @author kuroudo (くろうど)
 * 
 * @param AutoMoveSwitch
 * @desc 強制移動させるスイッチを入力してください。
 * Default: 1
 * @default 1
 *
 * @param XY_Flag
 * @desc x または y の強制移動させたい方向を入力してください。
 * Default: x
 * @default x
 * 
 * @param Destination
 * @desc x軸またはy軸に対しての移動方向を入力してください。true(プラス)／false(マイナス)
 * Default: true
 * @default true
 * 
 * @param CenterPosition
 * @desc 中心をずらしたい場合にそのマス数を入力してください。マイナスも可能です。
 * Default: 0
 * @default 0
 * 
 * @help
 * ■CenterPosition
 * CenterPosition を 0 以外にする場合、
 * 場所移動コマンドで中心をずらした位置に移動させてください。
 * そうしないと反映されません。
 * 
 * ■キー入力
 * 強制移動中でもキーボードからの入力は可能です。
 * マウスや画面タップによる移動操作は受け付けません。
 * メニュー表示は可能です。
 */

(function() {

'use strict';

var parameters = PluginManager.parameters('KRD_AutoMove');

var sw = Number(parameters['AutoMoveSwitch']) || 1;
var xyFlag = parameters['XY_Flag'].toLowerCase();
var xDestination = xyFlag === 'x' ? (parameters['Destination'] === 'true' ? 1 : -1) : 0;
var yDestination = xyFlag !== 'x' ? (parameters['Destination'] === 'true' ? 1 : -1) : 0;
var xPosition = xyFlag === 'x' ? (Number(parameters['CenterPosition']) || 0) : 0;
var yPosition = xyFlag !== 'x' ? (Number(parameters['CenterPosition']) || 0) : 0;

var KRD_Scene_Map_updateDestination = Scene_Map.prototype.updateDestination;
Scene_Map.prototype.updateDestination = function() {
    if ($gameSwitches.value(sw)) {
        var x = $gamePlayer.x;
        var y = $gamePlayer.y;
        $gameTemp.setDestination(x + xDestination, y + yDestination);
    } else {
        KRD_Scene_Map_updateDestination.call(this);
    }
};

var KRD_Sprite_Destination_update = Sprite_Destination.prototype.update;
Sprite_Destination.prototype.update = function() {
    if (!$gameSwitches.value(sw)) {
        KRD_Sprite_Destination_update.call(this);
    }
};

var KRD_Sprite_Destination_createBitmap = Sprite_Destination.prototype.createBitmap;
Sprite_Destination.prototype.createBitmap = function() {
    if (!$gameSwitches.value(sw)) {
        KRD_Sprite_Destination_createBitmap.call(this);
    }
};

var KRD_Game_Player_centerX = Game_Player.prototype.centerX;
Game_Player.prototype.centerX = function() {
    if ($gameSwitches.value(sw)) {
        return KRD_Game_Player_centerX.call(this) + xPosition;
    } else {
        return KRD_Game_Player_centerX.call(this);
    }
};

var KRD_Game_Player_centerY = Game_Player.prototype.centerY;
Game_Player.prototype.centerY = function() {
    if ($gameSwitches.value(sw)) {
        return KRD_Game_Player_centerY.call(this) + yPosition;
    } else {
        return KRD_Game_Player_centerY.call(this);
    }
};

})();
