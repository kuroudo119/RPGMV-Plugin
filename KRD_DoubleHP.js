// KRD_DoubleHP.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Double HP System.
 * @author KRD_DATA (くろうど)
 * 
 */

(function() {

'use strict';

var KRD_Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    if (target.isActor()) {
        var result = target.result();
        if (value === 0) {
            result.critical = false;
        }
        if (value > 0) {
            if (target.mp > 0) {
                this.executeMpDamage(target, value);
            } else {
                this.executeHpDamage(target, value);
            }
        } else {
            KRD_Game_Action_executeDamage.call(this, target, value);
        }
    } else {
        KRD_Game_Action_executeDamage.call(this, target, value);
    }
};

var KRD_Window_BattleLog_displayMpDamage = Window_BattleLog.prototype.displayMpDamage;
Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (target.isAlive() && target.result().mpDamage != 0) {
        if (target.result().mpDamage >= 0) {
            this.push('performDamage', target);
        }
    }
    KRD_Window_BattleLog_displayMpDamage.call(this, target);
};

}());
