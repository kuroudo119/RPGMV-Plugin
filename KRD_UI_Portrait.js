//================================================
// Krd_UI_Portrait.js
//
// Copyright (c) 2016 krd_data
// This is under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc UI set for SmartPhone (Portrait).
 * @author krd_data
 *
 * @help This plugin can change UI for SmartPhone (Portrait).
 */

/*:ja
 * @plugindesc スマホ縦長画面用UI詰め合わせ。
 * @author krd_data
 *
 * @help このプラグインは、UIをスマホの縦長画面用（ポートレート）に変更できます。
 */

(function() {

'use strict';

// -----------------------------------------------
// Title
// -----------------------------------------------

Window_TitleCommand.prototype.lineHeight = function() {
    return 36 + 30;
};


// -----------------------------------------------
// Menu
// -----------------------------------------------

var _Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    this._statusWindow.x = 0;
    this._statusWindow.y = this._commandWindow.height;
    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
};

Window_MenuCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_MenuCommand.prototype.maxCols = function() {
    return 4;
};

Window_MenuCommand.prototype.numVisibleRows = function() {
    return 2;
};


Window_Command.prototype.itemTextAlign = function() {
    return 'center';
};

Window_MenuCommand.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows() * 2);
};

Window_MenuCommand.prototype.itemHeight = function() {
    return this.lineHeight() * 2;
};

Window_MenuCommand.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight() * 2, align);
};


Window_MenuStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_MenuStatus.prototype.windowHeight = function() {
//    var h1 = this.fittingHeight(1);
//    var h2 = this.fittingHeight(2);
    var h1 = Window_MenuCommand.prototype.windowHeight();
    var h2 = Window_Gold.prototype.windowHeight();
    return Graphics.boxHeight - h1 - h2;
};

Window_MenuStatus.prototype.maxCols = function() {
    return 1;
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 4;
};

Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight - 24);
    this.changePaintOpacity(true);
};


Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorClass(actor, x, y + lineHeight * 1);
    this.drawActorLevel(actor, x, y + lineHeight * 2);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorHp(actor, x2, y, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorTp(actor, x2, y + lineHeight * 2, width2);
};


var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
Window_MenuActor.prototype.initialize = function() {
    _Window_MenuActor_initialize.call(this);
//    this.y = this.fittingHeight(2);
    this.y = Window_MenuCommand.prototype.windowHeight();
};


Window_MenuStatus.prototype.standardPadding = function() {
    return 18 + 12;
};


// -----------------------------------------------
// Item
// -----------------------------------------------

Window_ItemList.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_ItemCategory.prototype.lineHeight = function() {
    return 36 + 24;
};


Window_ItemList.prototype.standardPadding = function() {
    return 18 + 24;
};


// -----------------------------------------------
// Skill
// -----------------------------------------------

Window_SkillList.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_SkillStatus.prototype.lineHeight = function() {
    return 36;
};

Window_SkillStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    this.drawActorHp(actor, x, y, width);
    this.drawActorMp(actor, x, y + lineHeight * 1, width);
    this.drawActorTp(actor, x, y + lineHeight * 2, width);
};

Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        var y = h / 2 - this.lineHeight() * 1.5;
        var width = w - 162 - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, 144, h);
        this.drawActorSimpleStatus(this._actor, 162, y, width);
    }
};

Window_SkillType.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_SkillType.prototype.numVisibleRows = function() {
	return 2;
};


Window_SkillList.prototype.standardPadding = function() {
    return 18 + 24;
};


// -----------------------------------------------
// Equip
// -----------------------------------------------

Window_EquipCommand.prototype.lineHeight = function() {
    return 36 + 16;
};

Window_EquipStatus.prototype.lineHeight = function() {
    return 36 + 24;
};

Window_EquipStatus.prototype.standardPadding = function() {
    return 8;
};

Window_EquipStatus.prototype.numVisibleRows = function() {
    return 7;
};

Window_EquipItem.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_EquipItem.prototype.standardPadding = function() {
    return 18 + 18;
};

Window_EquipSlot.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_EquipSlot.prototype.standardPadding = function() {
    return 8;
};

Window_EquipSlot.prototype.drawItem = function(index) {
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
        this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y, 196);
        this.changePaintOpacity(true);
    }
};


Window_EquipStatus.prototype.windowWidth = function() {
//    return 312;
    return 252;
};


Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, 120);
};

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
    this.drawText(this._actor.param(paramId), x - 28, y, 48, 'right');
};

Window_EquipStatus.prototype.drawRightArrow = function(x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x - 30, y, 32, 'center');
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(newValue, x - 40, y, 48, 'right');
};

// -----------------------------------------------
// Status
// -----------------------------------------------

var myParam = 6;
var myEquip = 5;

Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0);
        this.drawHorzLine(lineHeight * 2);
        this.drawBlock2(lineHeight * 3);
        this.drawHorzLine(lineHeight * 7);
        this.drawBlockExp(lineHeight * 8);
        this.drawHorzLine(lineHeight * 10);
        this.drawBlock3(lineHeight * 11);
        this.drawHorzLine(lineHeight * (11 + Math.max(myParam, myEquip)));
        this.drawBlock4(lineHeight * (12 + Math.max(myParam, myEquip)));
    }
};

Window_Status.prototype.drawBlock1 = function(y) {
    var halfWidth = Graphics.width / 2;
    this.drawActorName(this._actor, halfWidth / 4, y);
    this.drawActorClass(this._actor, halfWidth, y);
    this.drawActorNickname(this._actor, halfWidth, y + this.lineHeight());
};

Window_Status.prototype.drawBlock2 = function(y) {
    var halfWidth = Graphics.width / 2;
    this.drawActorFace(this._actor, halfWidth / 4, y);
    this.drawBasicInfo(halfWidth, y);
};

Window_Status.prototype.drawBlockExp = function(y) {
    var halfWidth = Graphics.width / 2;
    this.drawExpInfo(halfWidth / 2, y);
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x / 2, y + lineHeight * 0, 270);
    this.drawText(expNext, x / 2, y + lineHeight * 1, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 0, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 1, 270, 'right');
};

Window_Status.prototype.drawBlock3 = function(y) {
    var halfWidth = Graphics.width / 2;
    this.drawParameters(6, y);
    this.drawEquipments(halfWidth, y);
};

Window_Status.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    var w = (Graphics.width / 2) - 40;
    for (var i = 0; i < count; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i, w);
    }
};

Window_Status.prototype.drawBlock4 = function(y) {
    this.drawProfile(6, y);
};


Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 0);
    this.drawActorHp(this._actor, x, y + lineHeight * 1);
    this.drawActorMp(this._actor, x, y + lineHeight * 2);
    this.drawActorTp(this._actor, x, y + lineHeight * 3, 186);
};


// -----------------------------------------------
// OtherMenu
// -----------------------------------------------

Window_Options.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_GameEnd.prototype.lineHeight = function() {
    return 36 + 30;
};


// -----------------------------------------------
// Event
// -----------------------------------------------

Window_NumberInput.prototype.lineHeight = function () {
    return 94;
};

Window_NumberInput.prototype.itemWidth = function () {
    return 32 + 32;
};

Window_NumberInput.prototype.placeButtons = function () {
    var numButtons = this._buttons.length;
    var spacing = 16 + 32;
    var totalWidth = -spacing;
    for (var i = 0; i < numButtons; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    var x = (this.width - totalWidth) / 2;
    for (var j = 0; j < numButtons; j++) {
        var button = this._buttons[j];
        button.x = x;
        button.y = this.buttonY();
        x += button.width + spacing;
    }
};


Window_Base.prototype.drawItemName = function (item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x, y + this.lineHeight() / 2 - Window_Base._iconHeight / 2);

        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

Window_EventItem.prototype.lineHeight = function () {
    return 36 + 30;
};

Window_EventItem.prototype.standardPadding = function() {
    return 18 + 24;
};


Window_ChoiceList.prototype.lineHeight = function () {
    return 36 + 30;
};

Window_ChoiceList.prototype.drawItem = function (index) {
    var rect = this.itemRectForText(index);
    this.drawTextEx(this.commandName(index), rect.x, rect.y + (this.lineHeight() / 4));
};


// -----------------------------------------------
// Shop
// -----------------------------------------------

Window_ShopCommand.prototype.lineHeight = function() {
    return 36 + 20;
};

Window_ShopBuy.prototype.lineHeight = function () {
    return 36 + 30;
};

Window_ShopBuy.prototype.standardPadding = function() {
    return 18 + 24;
};


Window_ShopSell.prototype.lineHeight = function () {
    return 36 + 30;
};

Window_ShopSell.prototype.standardPadding = function() {
    return 18 + 24;
};


Window_ShopBuy.prototype.windowWidth = function() {
//    return 456;
    return Graphics.width - 240;
};


Window_ShopNumber.prototype.windowWidth = function() {
//    return 456;
    return Graphics.width - 240;
};

Window_ShopNumber.prototype.placeButtons = function() {
    var numButtons = this._buttons.length;
    var spacing = 16;
    var totalWidth = -spacing;
    for (var i = 0; i < numButtons - 1; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    var x = (this.width - totalWidth) / 2;
    for (var j = 0; j < numButtons - 1; j++) {
        var button = this._buttons[j];
        button.x = x;
        button.y = this.buttonY();
        x += button.width + spacing;
    }
    var button4 = this._buttons[4];
    button4.x = (this.windowWidth() / 2) - (this._buttons[4].width / 2);
    button4.y = this.buttonY() + 48 * 2;
    x += button.width + spacing;
};

Window_ShopNumber.prototype.itemY = function() {
//    return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5);
    return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 4);
};

Window_ShopNumber.prototype.priceY = function() {
//    return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
    return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 2);
};

Window_ShopNumber.prototype.buttonY = function() {
    return Math.round(this.priceY() + this.lineHeight() * 2.5);
};


Window_ShopStatus.prototype.drawActorEquipInfo = function(x, y, actor) {
    var enabled = actor.canEquip(this._item);
    this.changePaintOpacity(enabled);
    this.resetTextColor();
    this.drawText(actor.name(), x, y, 168);
    var item1 = this.currentEquippedItem(actor, this._item.etypeId);
    if (enabled) {
        this.drawActorParamChange(x, y, actor, item1);
    }
    this.drawItemName(item1, x, y + this.lineHeight(), 196);
    this.changePaintOpacity(true);
};


// -----------------------------------------------
// Battle
// -----------------------------------------------

Window_BattleEnemy.prototype.lineHeight = function() {
    return 36 + 36;
};

Window_BattleEnemy.prototype.standardPadding = function() {
    return 18 + 8;
};

Window_BattleEnemy.prototype.windowWidth= function() {
    return Graphics.boxWidth / 2;
};

Window_BattleEnemy.prototype.windowHeight = function() {
    return Graphics.boxHeight - Window_BattleStatus.prototype.windowHeight();
};

Window_BattleEnemy.prototype.numVisibleRows = function() {
    return 8;
};

Window_BattleEnemy.prototype.maxCols = function() {
    return 1;
};

Window_BattleEnemy.prototype.initialize = function(x, y) {
    this._enemies = [];
    var width = this.windowWidth();
    var height = this.windowHeight();

    Window_Selectable.prototype.initialize.call(this, x, 0, width, height);

    this.refresh();
    this.hide();
};


Window_BattleActor.prototype.lineHeight = function() {
    return (this.windowHeight() / 4) - 16;
};

Window_BattleActor.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

Window_BattleActor.prototype.windowHeight = function() {
    return Graphics.boxHeight - Window_ActorCommand.prototype.windowHeight() - Window_BattleStatus.prototype.windowHeight();
};

Window_BattleActor.prototype.initialize = function(x, y) {
    Window_BattleStatus.prototype.initialize.call(this);
    this.x = x;
//    this.y = y - 145;
    this.y = Window_ActorCommand.prototype.windowHeight();
    this.openness = 255;
    this.hide();
};

Window_BattleActor.prototype.drawItem = function(index) {
    var actor = $gameParty.battleMembers()[index];
    this.drawBasicArea(this.basicAreaRect(index), actor);
//    this.drawGaugeArea(this.gaugeAreaRect(index), actor);
};

Window_BattleActor.prototype.basicAreaRect = function(index) {
    var rect = this.itemRectForText(index);
    rect.width = this.windowWidth() - 12;
    return rect;
};

Window_BattleActor.prototype.drawBasicArea = function(rect, actor) {
    this.drawActorName(actor, rect.x + 0, rect.y, rect.width);
//    this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
};


Window_BattleSkill.prototype.lineHeight = function() {
    return 36 + 36;
};

Window_BattleSkill.prototype.standardPadding = function() {
    return 18 + 24;
};

Window_BattleItem.prototype.lineHeight = function() {
    return 36 + 36;
};

Window_BattleItem.prototype.standardPadding = function() {
    return 18 + 24;
};


Window_PartyCommand.prototype.initialize = function() {
    var y = Graphics.boxHeight - this.windowHeight();
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
    this.deactivate();
};

Window_PartyCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_PartyCommand.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_PartyCommand.prototype.maxCols = function() {
    return 2;
};

Window_PartyCommand.prototype.numVisibleRows = function() {
    return 2;
};

Window_ActorCommand.prototype.initialize = function() {
    var y = Graphics.boxHeight - this.windowHeight();
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};

Window_ActorCommand.prototype.lineHeight = function() {
    return 36 + 30;
};

Window_ActorCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_ActorCommand.prototype.maxCols = function() {
    return 2;
};

Window_ActorCommand.prototype.numVisibleRows = function() {
    return 2;
};

Window_BattleStatus.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - width;
    var y = Graphics.boxHeight - height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.openness = 0;
};

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
// default
//    this.drawActorName(actor, rect.x + 0, rect.y, 150);
//    this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
    this.drawActorName(actor, rect.x + 0, rect.y, 170);
    this.drawActorIcons(actor, rect.x + 176, rect.y, rect.width - 156 + 20);
};

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
//    return 330;
    return 280;
};

Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
// default
//    this.drawActorHp(actor, rect.x + 0, rect.y, 108);
//    this.drawActorMp(actor, rect.x + 123, rect.y, 96);
//    this.drawActorTp(actor, rect.x + 234, rect.y, 96);
    this.drawActorHp(actor, rect.x + 16, rect.y, 108 - 16);
    this.drawActorMp(actor, rect.x + 123, rect.y, 96 - 20);
    this.drawActorTp(actor, rect.x + 234 - 25, rect.y, 96 - 25);
};

Window_BattleStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Scene_Battle.prototype.updateWindowPositions = function() {
	/*---------------ここは使わないのでコメントアウト。
    var statusX = 0;
    if (BattleManager.isInputting()) {
        statusX = this._partyCommandWindow.width;
    } else {
        statusX = this._partyCommandWindow.width / 2;
    }
    if (this._statusWindow.x < statusX) {
        this._statusWindow.x += 16;
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x = statusX;
        }
    }
    if (this._statusWindow.x > statusX) {
        this._statusWindow.x -= 16;
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x = statusX;
        }
    }
    ---------------*/
};


Sprite_Actor.prototype.setActorHome = function(index) {
//    this.setHome(600 + index * 32, 280 + index * 48);
    this.setHome(Graphics.boxWidth - 100, 280 + index * (48 + 48));
};


Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
    this.setHome(battler.screenX(), battler.screenY() + 180);
    this._stateIconSprite.setup(battler);
};


// -----------------------------------------------
// Save
// -----------------------------------------------

var _Scene_File_create = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
    _Scene_File_create.call(this);
    this._listWindow.height = this._listWindow.fittingHeight(7 * 2);
    var x = 0;
    var y = this._listWindow.y + this._listWindow.height;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight - y;
    this._statusWindow = new Window_SavefileStatus(x, y, width, height);
    this._statusWindow.setMode(this.mode());
    this._listWindow.statusWindow = this._statusWindow;
    this._listWindow.callUpdateHelp();
    this.addWindow(this._statusWindow);
};

var _Scene_File_start = Scene_File.prototype.start;
Scene_File.prototype.start = function() {
    _Scene_File_start.call(this);
    this._listWindow.ensureCursorVisible();
    this._listWindow.callUpdateHelp();
};

Window_SavefileList.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_SavefileList.prototype.maxCols = function() {
    return 3;
};

Window_SavefileList.prototype.numVisibleRows = function() {
    return 7;
};

Window_SavefileList.prototype.spacing = function() {
    return 8;
};

Window_SavefileList.prototype.itemHeight = function() {
    return this.lineHeight() * 2;
};

Window_SavefileList.prototype.standardPadding = function() {
    return 28;
};


Window_SavefileList.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0) {
        if (hitIndex === this.index()) {
            if (triggered && this.isTouchOkEnabled()) {
                this.processOk();
            }
        } else if (this.isCursorMovable()) {
            this.select(hitIndex);
        }
    } else if (this._stayCount >= 10) {
        if (y < this.padding + 20) {
            this.cursorUp();
        } else if (y >= this.height - this.padding - 20) {
            this.cursorDown();
        }
    }
    if (this.index() !== lastIndex) {
        SoundManager.playCursor();
    }
};


var _Window_SavefileList_callUpdateHelp =
        Window_SavefileList.prototype.callUpdateHelp;
Window_SavefileList.prototype.callUpdateHelp = function() {
    _Window_SavefileList_callUpdateHelp.call(this);
    if (this.active && this.statusWindow) {
        this.statusWindow.setId(this.index() + 1);
    }
};

function Window_SavefileStatus() {
    this.initialize.apply(this, arguments);
}

Window_SavefileStatus.prototype = Object.create(Window_Base.prototype);
Window_SavefileStatus.prototype.constructor = Window_SavefileStatus;

Window_SavefileStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._id = 1;
};

Window_SavefileStatus.prototype.contentsWidth = function() {
    return this.width - this.standardPadding() * 2 - 10 * 2;
};

Window_SavefileStatus.prototype.setMode = function(mode) {
    this._mode = mode;
};

Window_SavefileStatus.prototype.setId = function(id) {
    this._id = id;
    this.refresh();
};

Window_SavefileStatus.prototype.refresh = function() {
    this.contents.clear();
    var id = this._id;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id);
    var rect = this.contents.rect;
    this.resetTextColor();
    if (this._mode === 'load') {
        this.changePaintOpacity(valid);
    }
    this.drawFileId(id, rect.x, rect.y);
    if (info) {
        this.changePaintOpacity(valid);
        this.drawContents(info, rect, valid);
        this.changePaintOpacity(true);
    }
};

Window_SavefileStatus.prototype.drawFileId = function(id, x, y) {
    this.drawText(TextManager.file + ' ' + id, x, y, 180);
};

Window_SavefileStatus.prototype.drawContents = function(info, rect, valid) {
    var bottom = rect.y + rect.height;
    if (rect.width >= 420) {
	    if (info.title) {
	        this.drawText(info.title, rect.x + 192, rect.y, rect.width - 192);
	    }
        if (valid) {
		    if (info.characters) {
		        for (var i = 0; i < info.characters.length; i++) {
		            var data = info.characters[i];
		            this.drawCharacter(data[0], data[1], (rect.x + 100) + i * 48, bottom - 4);
		        }
		    }
        }
    }
    var lineHeight = this.lineHeight();
    var y2 = bottom - lineHeight;
    if (info.playtime) {
    var y2 = bottom - lineHeight;
        this.drawText(info.playtime, rect.x, y2, rect.width, 'right');
    }
};

// -----------------------------------------------

})();
