// KRD_Freeze.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php


/*:
 * @plugindesc Player character can't move when switch on. 2020/02/15
 * @author KRD_DATA (くろうど)
 * 
 * @param SwFreezing
 * @desc Set the switch number to use for freezing.
 * @default 1
 * @type switch
 *
 * @param CmnForMove
 * @desc Set the common event id to use for execute by move.
 * @default 1
 * @type common_event
 * 
 * @help
 * - Player character can't move when switch on.
 * - That time, player can execute a common event by moving.
 * 
 */

/*:ja
 * @plugindesc プレイヤーキャラクターを移動不可にします。2020/02/15
 * @author KRD_DATA (くろうど)
 * 
 * @param SwFreezing
 * @desc このスイッチがONの時、移動不可になります。
 * @default 1
 * @type switch
 *
 * @param CmnForMove
 * @desc 移動しようとした時に実行するコモンイベント番号を設定します。
 * @default 1
 * @type common_event
 * 
 * @help
 * - スイッチONの時、プレイヤーキャラクターを移動不可にします。
 * - その時、プレイヤーが動くと設定したコモンイベントが実行されます。
 * - すごろくなどプレイヤーを移動させたくない場面で使用します。
 * 
 */

(function() {

'use strict';

const parameters = PluginManager.parameters('KRD_Freeze');
const swFreezing = Number(parameters['SwFreezing']);
const cmnForMove = Number(parameters['CmnForMove']);

//================================================
// Player can't move and execute the common event.

var KRD_Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
    if ($gameSwitches.value(swFreezing)) {
        $gameTemp.reserveCommonEvent(cmnForMove);
    } else {
        KRD_Game_Player_executeMove.call(this, direction);
    }
};

var KRD_Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
    if ($gameSwitches.value(swFreezing)) {
        if (Input.isTriggered('ok')) {
            $gameTemp.reserveCommonEvent(cmnForMove);
            return true;
        }
        return false;
    } else {
        KRD_Game_Player_triggerButtonAction.call(this);
    }
};

//================================================
}());
