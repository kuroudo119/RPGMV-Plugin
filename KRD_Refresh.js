// KRD_Refresh.js
//
// Copyright (C) 2019 kuroudo (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Reduce Refresh.
 * @author kuroudo (くろうど)
 * 
 */

/*:ja
 * @plugindesc 戦闘時のリフレッシュ処理を減らして動作を軽くします。
 * @author kuroudo (くろうど)
 * 
 */

(function() {

'use strict';

BattleManager.endTurn = function() {
    this._phase = 'turnEnd';
    this._preemptive = false;
    this._surprise = false;
    this.allBattleMembers().forEach(function(battler) {
        battler.onTurnEnd();
        // this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(battler);
        this._logWindow.displayRegeneration(battler);
    }, this);
    if (this.isForcedTurn()) {
        this._turnForced = false;
    }
};

//================================================
})();
