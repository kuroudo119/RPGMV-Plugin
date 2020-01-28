//================================================
// KRD_TpPopup.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc TP damage popup.
 * @author KRD_DATA (くろうど)
 * 
 */

 /*:ja
 * @plugindesc TP増減をポップアップ表示します。
 * @author KRD_DATA (くろうど)
 * 
 */

(function() {

'use strict';

Sprite_Damage.prototype.setup = function(target) {
    var result = target.result();
    // When Use "BattleEffectPopup.js" comment out.
    if (result.missed || result.evaded) {
        this.createMiss();
    } else if (result.hpAffected) {
    // if (result.hpAffected) {
        this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
        this.createDigits(2, result.mpDamage);
    }
    if (target.isAlive() && result.tpDamage !== 0) {
        this.createDigitsTp(2, result.tpDamage);
    }
    if (result.critical) {
        this.setupCriticalEffect();
    }
};

Game_Battler.prototype.regenerateTp = function() {
    var value = Math.floor(100 * this.trg);
    this.gainTp(value);
};

Sprite_Damage.prototype.createDigitsTp = function(baseRow, value) {
    var string = Math.abs(value).toString();
    var row = baseRow + (value < 0 ? 1 : 0);
    var w = this.digitWidth();
    var h = this.digitHeight();
    for (var i = 0; i < string.length; i++) {
        var sprite = this.createChildSpriteTp();
        var n = Number(string[i]);
        sprite.setFrame(n * w, row * h, w, h);
        sprite.x = (i - (string.length - 1) / 2) * w;
        sprite.dy = -i;
    }
};

Sprite_Damage.prototype.createChildSpriteTp = function() {
    var sprite = new Sprite();
    sprite.bitmap = this._damageBitmap;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 2;
    sprite.y = -40;
    sprite.ry = sprite.y;
    this.addChild(sprite);
    return sprite;
};

}());
