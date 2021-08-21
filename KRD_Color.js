/*:
 * @plugindesc Color Singleton.
 * @author kuroudo (くろうど)
 * 
 * @param normalColor
 * @desc Default 0
 * @default 0
 * 
 * @param systemColor
 * @desc Default 16
 * @default 16
 * 
 * @param crisisColor
 * @desc Default 17
 * @default 17
 * 
 * @param deathColor
 * @desc Default 18
 * @default 18
 * 
 * @param gaugeBackColor
 * @desc Default 19
 * @default 19
 * 
 * @param hpGaugeColor1
 * @desc Default 20
 * @default 20
 * 
 * @param hpGaugeColor2
 * @desc Default 21
 * @default 21
 * 
 * @param mpGaugeColor1
 * @desc Default 22
 * @default 22
 * 
 * @param mpGaugeColor2
 * @desc Default 23
 * @default 23
 * 
 * @param mpCostColor
 * @desc Default 23
 * @default 23
 * 
 * @param tpGaugeColor1
 * @desc Default 28
 * @default 28
 * 
 * @param tpGaugeColor2
 * @desc Default 29
 * @default 29
 * 
 * @param tpCostColor
 * @desc Default 29
 * @default 29
 * 
 * @help
KRD_Color.js

Copyright (c) 2019 kuroudo (くろうど)
This plugin is released under the MIT License.
https://opensource.org/licenses/mit-license.php
 * 
 * 
 */

/*:ja
 * @plugindesc 色データをシングルトンのように保持して処理を軽くします。
 * @author kuroudo (くろうど)
 * 
 * @param normalColor
 * @desc ノーマル色。デフォルト 0
 * @default 0
 * 
 * @param systemColor
 * @desc システム色。デフォルト 16
 * @default 16
 * 
 * @param crisisColor
 * @desc 瀕死時色。デフォルト 17
 * @default 17
 * 
 * @param deathColor
 * @desc 戦闘不能色。デフォルト 18
 * @default 18
 * 
 * @param gaugeBackColor
 * @desc ゲージ背景色。デフォルト 19
 * @default 19
 * 
 * @param hpGaugeColor1
 * @desc HPゲージ色1。2つあるのはグラデーション用。デフォルト 20
 * @default 20
 * 
 * @param hpGaugeColor2
 * @desc HPゲージ色2。2つあるのはグラデーション用。デフォルト 21
 * @default 21
 * 
 * @param mpGaugeColor1
 * @desc MPゲージ色1。2つあるのはグラデーション用。デフォルト 22
 * @default 22
 * 
 * @param mpGaugeColor2
 * @desc MPゲージ色2。2つあるのはグラデーション用。デフォルト 23
 * @default 23
 * 
 * @param mpCostColor
 * @desc 消費MP色。デフォルト 23
 * @default 23
 * 
 * @param tpGaugeColor1
 * @desc TPゲージ色1。2つあるのはグラデーション用。デフォルト 28
 * @default 28
 * 
 * @param tpGaugeColor2
 * @desc TPゲージ色2。2つあるのはグラデーション用。デフォルト 29
 * @default 29
 * 
 * @param tpCostColor
 * @desc 消費TP色。デフォルト 29
 * @default 29
 * 
 * @help
KRD_Color.js

Copyright (c) 2019 kuroudo (くろうど)
This plugin is released under the MIT License.
https://opensource.org/licenses/mit-license.php
 * 
 * 
 */

(function() {

'use strict';

//================================================
// Plugin Param

var PLUGIN_NAME = "KRD_Color";
var PARAM = PluginManager.parameters(PLUGIN_NAME);

var NORMAL = Number(PARAM['normalColor']) || 0;
var SYSTEM = Number(PARAM['systemColor']) || 0;
var CRISIS = Number(PARAM['crisisColor']) || 0;
var DEATH = Number(PARAM['deathColor']) || 0;

var GAUGE_BACK = Number(PARAM['gaugeBackColor']) || 0;

var HP_GAUGE_1 = Number(PARAM['hpGaugeColor1']) || 0;
var HP_GAUGE_2 = Number(PARAM['hpGaugeColor2']) || 0;

var MP_GAUGE_1 = Number(PARAM['mpGaugeColor1']) || 0;
var MP_GAUGE_2 = Number(PARAM['mpGaugeColor2']) || 0;
var MP_COST = Number(PARAM['mpCostColor']) || 0;

var TP_GAUGE_1 = Number(PARAM['tpGaugeColor1']) || 0;
var TP_GAUGE_2 = Number(PARAM['tpGaugeColor2']) || 0;
var TP_COST = Number(PARAM['tpCostColor']) || 0;

// -----------------------------------------------
// Color

var krdNormalColor = null;
var krdSystemColor = null;
var krdCrisisColor = null;
var krdDeathColor = null;

var krdBackColor = null;

var krdHpColor = null;
var krdHpColor2 = null;

var krdMpColor = null;
var krdMpColor2 = null;
var krdMpCostColor = null;

var krdTpColor = null;
var krdTpColor2 = null;
var krdTpCostColor = null;

Window_Base.prototype.normalColor = function() {
	if (!krdNormalColor) {
		krdNormalColor = this.textColor(NORMAL);
	}
	return krdNormalColor;
};

Window_Base.prototype.systemColor = function() {
	if (!krdSystemColor) {
		krdSystemColor = this.textColor(SYSTEM);
	}
	return krdSystemColor;
};

Window_Base.prototype.crisisColor = function() {
	if (!krdCrisisColor) {
		krdCrisisColor = this.textColor(CRISIS);
	}
	return krdCrisisColor;
};

Window_Base.prototype.deathColor = function() {
	if (!krdDeathColor) {
		krdDeathColor = this.textColor(DEATH);
	}
	return krdDeathColor;
};

Window_Base.prototype.gaugeBackColor = function() {
	if (!krdBackColor) {
		krdBackColor = this.textColor(GAUGE_BACK);
	}
	return krdBackColor;
};

Window_Base.prototype.hpGaugeColor1 = function() {
	if (!krdHpColor) {
		krdHpColor = this.textColor(HP_GAUGE_1);
	}
	return krdHpColor;
};

Window_Base.prototype.hpGaugeColor2 = function() {
	if (!krdHpColor2) {
		krdHpColor2 = this.textColor(HP_GAUGE_2);
	}
	return krdHpColor2;
};

Window_Base.prototype.mpGaugeColor1 = function() {
	if (!krdMpColor) {
		krdMpColor = this.textColor(MP_GAUGE_1);
	}
	return krdMpColor;
};

Window_Base.prototype.mpGaugeColor2 = function() {
	if (!krdMpColor2) {
		krdMpColor2 = this.textColor(MP_GAUGE_2);
	}
	return krdMpColor2;
};

Window_Base.prototype.mpCostColor = function() {
	if (!krdMpCostColor) {
		krdMpCostColor = this.textColor(MP_COST);
	}
	return krdMpCostColor;
};

Window_Base.prototype.tpGaugeColor1 = function() {
	if (!krdTpColor) {
		krdTpColor = this.textColor(TP_GAUGE_1);
	}
	return krdTpColor;
};

Window_Base.prototype.tpGaugeColor2 = function() {
	if (!krdTpColor2) {
		krdTpColor2 = this.textColor(TP_GAUGE_2);
	}
	return krdTpColor2;
};

Window_Base.prototype.tpCostColor = function() {
	if (!krdTpCostColor) {
		krdTpCostColor = this.textColor(TP_COST);
	}
	return krdTpCostColor;
};

//================================================
})();
