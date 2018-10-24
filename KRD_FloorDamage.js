//================================================
// KRD_FloorDamage.js
//
// Copyright (c) 2016 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Change FloorDamage.
 * @author KRD_DATA (くろうど)
 *
 * @param FloorDamage
 * @desc Input damage.
 * Default: 10
 * @default 10
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc フロアダメージの値を変更します。
 * @author KRD_DATA (くろうど)
 *
 * @param FloorDamage
 * @desc ダメージの値を入力してください。
 * Default: 10
 * @default 10
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {

	var parameters = PluginManager.parameters('KRD_FloorDamage');

    var floorDamage = Number(parameters['FloorDamage']);

	Game_Actor.prototype.basicFloorDamage = function() {
		if (isNaN(floorDamage)) {
			return 10;
		}
	    return floorDamage;
	};

})();

