//================================================
// KRD_CommandAttack.js
//
// Copyright (c) 2016 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Change command Attack.
 * @author KRD_DATA (くろうど)
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc 攻撃コマンドの対象選択をスキルに合ったものにします。
 * @author KRD_DATA (くろうど)
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {

	Scene_Battle.prototype.commandAttack = function() {
	    BattleManager.inputtingAction().setAttack();
	    this.onSelectAction();
	};

})();
