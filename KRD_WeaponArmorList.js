/*:
 * @target MZ
 * @plugindesc 武器防具リスト：アイテムリストの武器欄に防具も表示します
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMV-Plugin
 * 
 * @help
 * KRD_WeaponArmorList.js
 * https://github.com/kuroudo119/RPGMV-Plugin
 * 
 * 【権利表記】
 * (c) 2021 kuroudo119
 * 
 * 【利用規約】
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMV-Plugin/blob/master/LICENSE
 * 
 * 【更新履歴】
 * ver.1 (2021/05/08) 1st Release.
 * 
 * 【機能】
 * アイテムリストの武器欄に防具も表示します。
 * 武器の下に防具が表示されます。
 * 
 * 【注意】
 * このプラグインでは、アイテムリストの「防具」は消えません。
 * 
 */

(function() {

'use strict';

const KRD_Window_ItemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
	switch (this._category) {
	case 'weapon':
		return DataManager.isWeapon(item) || DataManager.isArmor(item);
	default:
		return KRD_Window_ItemList_includes.apply(this, arguments);
	}
};

})();
