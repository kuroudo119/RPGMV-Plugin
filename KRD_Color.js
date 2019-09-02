// KRD_Color.js
//
// Copyright (c) 2019 kuroudo (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Color Singleton.
 * @author kuroudo (くろうど)
 * 
 */

/*:ja
 * @plugindesc 色データ取得処理を減らして処理を軽くします。
 * @author kuroudo (くろうど)
 * 
 */

(function() {

'use strict';

// -----------------------------------------------
// Color

var krdNormalColor = null;
var krdSystemColor = null;
var krdDeathColor = null;
var krdCrisisColor = null;
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
        krdNormalColor = this.textColor(0);
    }
    return krdNormalColor;
};

Window_Base.prototype.systemColor = function() {
    if (!krdSystemColor) {
        krdSystemColor = this.textColor(16);
    }
    return krdSystemColor;
};

Window_Base.prototype.crisisColor = function() {
    if (!krdCrisisColor) {
        krdCrisisColor = this.textColor(17);
    }
    return krdCrisisColor;
};

Window_Base.prototype.deathColor = function() {
    if (!krdDeathColor) {
        krdDeathColor = this.textColor(18);
    }
    return krdDeathColor;
};

Window_Base.prototype.gaugeBackColor = function() {
    if (!krdBackColor) {
        krdBackColor = this.textColor(19);
    }
    return krdBackColor;
};

Window_Base.prototype.hpGaugeColor1 = function() {
    if (!krdHpColor) {
        krdHpColor = this.textColor(20);
    }
    return krdHpColor;
};

Window_Base.prototype.hpGaugeColor2 = function() {
    if (!krdHpColor2) {
        krdHpColor2 = this.textColor(21);
    }
    return krdHpColor2;
};

Window_Base.prototype.mpGaugeColor1 = function() {
    if (!krdMpColor) {
        krdMpColor = this.textColor(22);
    }
    return krdMpColor;
};

Window_Base.prototype.mpGaugeColor2 = function() {
    if (!krdMpColor2) {
        krdMpColor2 = this.textColor(23);
    }
    return krdMpColor2;
};

Window_Base.prototype.mpCostColor = function() {
    if (!krdMpCostColor) {
        krdMpCostColor = this.textColor(23);
    }
    return krdMpCostColor;
};

Window_Base.prototype.tpGaugeColor1 = function() {
    if (!krdTpColor) {
        krdTpColor = this.textColor(28);
    }
    return krdTpColor;
};

Window_Base.prototype.tpGaugeColor2 = function() {
    if (!krdTpColor2) {
        krdTpColor2 = this.textColor(29);
    }
    return krdTpColor2;
};

Window_Base.prototype.tpCostColor = function() {
    if (!krdTpCostColor) {
        krdTpCostColor = this.textColor(29);
    }
    return krdTpCostColor;
};

//================================================
})();
