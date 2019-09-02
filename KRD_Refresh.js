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

// BattleManager.processTurn = function() {
//     var subject = this._subject;
//     var action = subject.currentAction();
//     if (action) {
//         action.prepare();
//         if (action.isValid()) {
//             this.startAction();
//         }
//         subject.removeCurrentAction();
//     } else {
//         subject.onAllActionsEnd();
//         this.refreshStatus();
//         this._logWindow.displayAutoAffectedStatus(subject);
//         this._logWindow.displayCurrentState(subject);
//         this._logWindow.displayRegeneration(subject);
//         this._subject = this.getNextSubject();
//     }
// };

BattleManager.startAction = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    var targets = action.makeTargets();
    this._phase = 'action';
    this._action = action;
    this._targets = targets;
    subject.useItem(action.item());
    this._action.applyGlobal();
    // this.refreshStatus();
    this._logWindow.startAction(subject, action, targets);
};

BattleManager.invokeAction = function(subject, target) {
    this._logWindow.push('pushBaseLine');
    if (Math.random() < this._action.itemCnt(target)) {
        this.invokeCounterAttack(subject, target);
    } else if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
    }
    subject.setLastTarget(target);
    this._logWindow.push('popBaseLine');
    // this.refreshStatus();
    if (subject.isActor() || target.isActor()) {
        this.refreshStatus();
    }
};

//================================================
})();
