// KRD_Formation.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Formation Mode.
 * @author KRD_DATA (くろうど)
 * 
 */

(function() {

'use strict';

//================================================
// Scene_Menu

Scene_Menu.prototype.commandFormation = function() {
    SceneManager.push(Scene_Formation);
};

//------------------------------------------------
// Scene_Formation

function Scene_Formation() {
    this.initialize.apply(this, arguments);
}

Scene_Formation.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Formation.prototype.constructor = Scene_Formation;

Scene_Formation.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Formation.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
};

Scene_Formation.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createFormationWindow();
    this.createParamWindow();
    this.createParamWindow2();
    this._formationWindow.activate();
};

Scene_Formation.prototype.createFormationWindow = function() {
    this._formationWindow = new Window_Formation(0, 0);
    this._formationWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._formationWindow.setHandler('cancel', this.onFormationCancel.bind(this));
    this.addWindow(this._formationWindow);
    this._formationWindow.show();
};

Scene_Formation.prototype.createParamWindow = function() {
    var wx = 0;
    var wy = this._formationWindow.height;
    var ww = Graphics.boxWidth;
    var wh = (Graphics.boxHeight - this._formationWindow.height) / 2;
    this._paramWindow = new Window_Param(wx, wy, ww, wh);
    this._formationWindow.setParamWindow(this._paramWindow);
    this.addWindow(this._paramWindow);
    this._paramWindow.show();
};

Scene_Formation.prototype.createParamWindow2 = function() {
    var wx = 0;
    var wy = this._formationWindow.height;
    var ww = Graphics.boxWidth;
    var wh = (Graphics.boxHeight - this._formationWindow.height) / 2;
    this._paramWindow2 = new Window_Param2(wx, wy + wh, ww, wh);
    this._formationWindow.setParamWindow2(this._paramWindow2);
    this.addWindow(this._paramWindow2);
    this._paramWindow2.show();
};

Scene_Formation.prototype.onFormationOk = function() {
    var index = this._formationWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._formationWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._formationWindow.setPendingIndex(-1);
        this._formationWindow.redrawItem(index);
        this._paramWindow2.contents.clear();
    } else {
        this._formationWindow.setPendingIndex(index);
    }
    this._formationWindow.activate();
};

Scene_Formation.prototype.onFormationCancel = function() {
    if (this._formationWindow.pendingIndex() >= 0) {
        this._formationWindow.setPendingIndex(-1);
        this._formationWindow.activate();
        this._paramWindow2.contents.clear();
    } else {
        this.popScene();
    }
};

//================================================
// Window_Formation

function Window_Formation() {
    this.initialize.apply(this, arguments);
}

Window_Formation.prototype = Object.create(Window_Selectable.prototype);
Window_Formation.prototype.constructor = Window_Formation;

Window_Formation.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._index = 0;
    this._pendingIndex = -1;
    this.drawAllItems();
    this.refresh();
};

Window_Formation.prototype.maxItems = function() {
    return $gameParty.size();
};

Window_Formation.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_Formation.prototype.windowHeight = function() {
    return Graphics.boxHeight - 132 - (36 * 5);
};

var KRD_Window_Selectable_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    KRD_Window_Selectable_select.call(this, index);
    this.callUpdateParamWindow(index);
};

Window_Selectable.prototype.callUpdateParamWindow = function(index) {
};

Window_Formation.prototype.callUpdateParamWindow = function(index) {
    this.updateParamWindow(index);
};

Window_Formation.prototype.updateParamWindow = function(index) {
    var members = $gameParty.members();
    if (this.pendingIndex() >= 0) {
        this._paramWindow2.setActor(members[index]);
    } else {
        if (index >= 0) {
            this._paramWindow.setActor(members[index]);
        }
    }
};

Window_Formation.prototype.pendingIndex = function() {
    return this._pendingIndex;
};

Window_Formation.prototype.setPendingIndex = function(index) {
    var lastPendingIndex = this._pendingIndex;
    this._pendingIndex = index;
    this.redrawItem(this._pendingIndex);
    this.redrawItem(lastPendingIndex);
};

Window_Formation.prototype.setParamWindow = function(paramWindow) {
    this._paramWindow = paramWindow;
};

Window_Formation.prototype.setParamWindow2 = function(paramWindow2) {
    this._paramWindow2 = paramWindow2;
};

Window_Formation.prototype.standardPadding = function() {
    return 18;
};

Window_Formation.prototype.numVisibleRows = function() {
    var members = $gameParty.members().length;
    var rows = Math.ceil(members / this.maxCols());
    return rows;
};

Window_Formation.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

Window_Formation.prototype.maxCols = function() {
    return $gameParty.maxBattleMembers();
};

Window_Formation.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = Math.max(this.itemWidth(), 144);
    rect.height = this.itemHeight();
    rect.x = index % maxCols * rect.width - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};

Window_Formation.prototype.contentsWidth = function() {
    return this.width;
};

Window_Formation.prototype.contentsHeight = function() {
    return this.height;
};

Window_Formation.prototype.drawItem = function(index) {
    this.drawItemBackground(index);
    this.drawItemImage(index);
};

Window_Formation.prototype.drawItemBackground = function(index) {
    if (index === this._pendingIndex) {
        var rect = this.itemRect(index);
        var color = this.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    }
};

Window_Formation.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorCharacter(actor, rect.x + rect.width / 2, rect.y + rect.height * 0.6);
    this.changePaintOpacity(true);
};

Window_Formation.prototype.contentsWidth = function() {
    return this.width;
};

Window_Formation.prototype.contentsHeight = function() {
    return this.height;
};

//------------------------------------------------
// Window_Param

function Window_Param() {
    this.initialize.apply(this, arguments);
}

Window_Param.prototype = Object.create(Window_Base.prototype);
Window_Param.prototype.constructor = Window_Param;

Window_Param.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
};

Window_Param.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_Param.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var x = 60;
        var y = 0;
        this.drawActorFace(this._actor, x, y);
        this.drawActorSimpleStatus(this._actor, x + 220, y, 400);
    }
};

//------------------------------------------------
// Window_Param2

function Window_Param2() {
    this.initialize.apply(this, arguments);
}

Window_Param2.prototype = Object.create(Window_Param.prototype);
Window_Param2.prototype.constructor = Window_Param2;

//================================================
}());
