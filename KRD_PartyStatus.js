//================================================
// KRD_PartyStatus.js
//
// Copyright (c) 2017 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc [v1] This plugin changes status window.
 * @author KRD_DATA (くろうど)
 *
 * @param ParamCount
 * @desc Input prameters count.
 * Default: 6
 * @default 6
 *
 * @help This plugin does not provide plugin commands.
 */

(function() {

var parameters = PluginManager.parameters('KRD_PartyStatus');

var paramCount = Number(parameters['ParamCount']);

Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
//        this.drawBlock1(lineHeight * 0);
//        this.drawHorzLine(lineHeight * 1);
//        this.drawBlock2(lineHeight * 2);
//        this.drawHorzLine(lineHeight * 6);
//        this.drawBlock3(lineHeight * 7);
//        this.drawHorzLine(lineHeight * 13);
//        this.drawBlock4(lineHeight * 14);
        this.drawBlockParty(lineHeight * 2);
    }
};

Window_Status.prototype.drawBlockParty = function(y) {
    if (isNaN(paramCount)) {
        paramCount = 6;
    }
    this.drawPartyParameters(48, y);
    this.drawEquipIcons(48, y);
};

Window_Status.prototype.drawPartyParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    var actor = $gameParty.members();
    var len = actor.length;

    for (var k = 0; k < len; k++) {
        this.drawActorCharacter(actor[k], x + 210 + 70 * k, y);
    }
    for (var i = 0; i < paramCount; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 160);
        this.resetTextColor();
        for (var j = 0; j < len; j++) {
            this.drawText(actor[j].param(paramId), x + 160 + 70 * j, y2, 60, 'right');
        }
    }
};

Window_Status.prototype.drawEquipIcons = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());

    var actor = $gameParty.members();
    var len = actor.length;

    for (var i = 0; i < len; i++) {
        equips = actor[i].equips();
        for (var j = 0; j < count; j++) {
            this.drawItemName(equips[j], x + 190 + 70 * i, y + this.lineHeight() * (j + paramCount) );
        }
    }
};

Window_Status.prototype.drawItemName = function(item, x, y) {
    if (item) {
        this.drawIcon(item.iconIndex, x, y);
    }
};

})();
