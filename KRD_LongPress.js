//================================================
// KRD_LongPress.js
//
// Copyright (c) 2016 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Long-press is multi-tap. 20181025 update.
 * @author KRD_DATA (くろうど)
 *
 * @param CancelWindow
 * @desc Enter true to use this function.
 * Default: true
 * @default true
 *
 * @param CallMenuOnMap
 * @desc Enter true to use this function.
 * Default: true
 * @default true
 *
 * @param CancelNameInput
 * @desc Enter true to use this function.
 * Default: true
 * @default true
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc クリックorタップの「長押し」で「メニュー＆取り消し」。20181025更新。
 * @author KRD_DATA (くろうど)
 *
 * @param CancelWindow
 * @desc ウィンドウ画面で使用する場合は true と入力。
 * Default: true
 * @default true
 *
 * @param CallMenuOnMap
 * @desc マップ画面でメニューを開く場合は true と入力。
 * Default: true
 * @default true
 *
 * @param CancelNameInput
 * @desc 名前入力画面で使用する場合は true と入力。
 * Default: true
 * @default true
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * マップでの長押しで「メニュー＆取り消し」が発生するため、
 * 連続移動が出来なくなります。
 */

(function() {

var parameters = PluginManager.parameters('KRD_LongPress');

var cancelWindow = parameters['CancelWindow'] === 'true';
var callMenuOnMap = parameters['CallMenuOnMap'] === 'true';
var cancelNameInput = parameters['CancelNameInput'] === 'true';

//================================================
// ウィンドウ関連

if (cancelWindow) {

	var KRD_Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
	Window_Selectable.prototype.processHandling = function() {
		if (this.isOpenAndActive()) {
			if (this.isCancelEnabled() && this.isCancelTriggered()) {
				this.processCancel();
				TouchInput.clear();
			} else {
				KRD_Window_Selectable_processHandling.call(this);
			}
		}
	};

	var KRD_Window_Selectable_isCancelTriggered = Window_Selectable.prototype.isCancelTriggered;
	Window_Selectable.prototype.isCancelTriggered = function() {
		if (TouchInput.isLongPressed()) {
			return true;
		}
		return KRD_Window_Selectable_isCancelTriggered.call(this);
	};

}

//------------------------------------------------
// マップ関連

if (callMenuOnMap) {

	var KRD_Scene_Map_isFastForward = Scene_Map.prototype.isFastForward;
	Scene_Map.prototype.isFastForward = function() {
		return KRD_Scene_Map_isFastForward.call(this) && Input.isLongPressed('ok');
	};

	var KRD_Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
	Scene_Map.prototype.isMenuCalled = function() {
		if (TouchInput.isLongPressed()) {
			TouchInput.clear();
			return true;
		}
		return KRD_Scene_Map_isMenuCalled.call(this);
	};

}

//------------------------------------------------
// 名前入力関連

if (cancelNameInput) {

	var KRD_Window_NameInput_processHandling = Window_NameInput.prototype.processHandling;
	Window_NameInput.prototype.processHandling = function() {
		if (this.isOpen() && this.active) {
			if (TouchInput.isLongPressed()) {
				TouchInput.clear();
				this.processBack();
			} else {
				KRD_Window_NameInput_processHandling.call(this);
			}
		}
	};

}

//================================================
})();
