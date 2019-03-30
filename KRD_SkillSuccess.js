// KRD_SkillSuccess.js
//
// Copyright (c) 2018 KRD_DATA (Kuroudo)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Skill will failure.
 * @author KRD_DATA(Kuroudo)
 * 
 * @param SuccessStateId
 * @desc State number used for changing success rate.
 * Default: 20
 * @default 20
 * 
 * @help
 * How to use.
 * SuccessStateId's number is used in State list.
 * For example "Traits" is written "SuccessStateId * 75%" of "State Rate" 
 * what "Success" is 75% in all Skill type.
 * 
 */

/*:ja
 * @plugindesc スキルの成功率を変更するステートを作成する。
 * @author KRD_DATA(Kuroudo)
 * 
 * @param SuccessStateId
 * @desc スキルの成功率を変更するためのステート番号。
 * Default: 20
 * @default 20
 * 
 * @help
 * 使い方。
 * ステート（SuccessStateId 番）をダミーとして使用します。
 * （内容は設定不要ですが分かりやすい名前を付けて下さい）
 * 例えば、特徴に「ステート有効度」として「SuccessStateId * 75%」と記述すると、
 * その特徴を持つ場合、全てのスキルの成功率が75%になります。
 * （全てのスキルとは、スキルタイプ「なし」以外のスキルです）
 * 
 */

(function() {

'use strict';
const parameters = PluginManager.parameters('KRD_SkillSuccess');
const krdSuccessStateId = Number(parameters['SuccessStateId']) || 20;

const KRD_Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(target) {
    var krdSuccessRate = this.subject().stateRate(krdSuccessStateId);
    if (this.isSkill() && this.item().stypeId > 0) {
        if (this.isPhysical()) {
            return this.item().successRate * 0.01 * this.subject().hit * krdSuccessRate;
        } else {
            return this.item().successRate * 0.01 * krdSuccessRate;
        }
    } else {
        return KRD_Game_Action_itemHit.call(this, target);
    }
};

})();
