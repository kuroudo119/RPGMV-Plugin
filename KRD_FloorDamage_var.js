//================================================
// KRD_FloorDamage_var.js
//
// Copyright (c) 2018 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Change FloorDamage.
 * @author KRD_DATA (くろうど)
 *
 * @param Variables
 * @desc Input variables number.
 * Default: 1
 * @default 1
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc フロアダメージの値を変更します。
 * @author KRD_DATA (くろうど)
 *
 * @param Variables
 * @desc フロアダメージの値として使う変数番号を入力してください。
 * Default: 1
 * @default 1
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * フロアダメージの変数は初期値 0 なので、変数に値を設定してください。
 */

(function() {

var parameters = PluginManager.parameters('KRD_FloorDamage_var');
var variables = Number(parameters['Variables']);

Game_Actor.prototype.basicFloorDamage = function() {
	return $gameVariables.value(variables);
};

})();
