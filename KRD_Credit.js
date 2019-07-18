//================================================
// KRD_Credit.js
//
// Copyright (c) 2019 kuroudo (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Add credit command.
 * @author kuroudo (くろうど)
 * 
 */

(function() {

'use strict';

Scene_Title.prototype.commandCredit = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Credit);
};

var KRD_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    KRD_Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler('credit', this.commandCredit.bind(this));
};

var KRD_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    KRD_Window_TitleCommand_makeCommandList.call(this);
    var japanese = ConfigManager.langSelect == undefined ? true : ConfigManager.langSelect;
    this.addCommand(japanese ? '権利表記' : 'Credit', 'credit');
};

function Scene_Credit() {
    this.initialize.apply(this, arguments);
}

Scene_Credit.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Credit.prototype.constructor = Scene_Credit;

Scene_Credit.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Credit.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCreditWindow();
    this.createMessageWindow();
};

Scene_Credit.prototype.createCreditWindow = function() {
    this._cancelWindow = new Window_Cancel();
    this._cancelWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._cancelWindow);
};

Scene_Credit.prototype.createMessageWindow = function() {
    var wx = 0;
    var wy = 0;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - this._cancelWindow.height;
    this._messageWindow = new Window_Credit(wx, wy, ww, wh);
    this.addWindow(this._messageWindow);
    this._messageWindow.show();
};

function Window_Cancel() {
    this.initialize.apply(this, arguments);
}

Window_Cancel.prototype = Object.create(Window_Command.prototype);
Window_Cancel.prototype.constructor = Window_Cancel;

Window_Cancel.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};

Window_Cancel.prototype.makeCommandList = function() {
    this.addCommand(TextManager.cancel,  'cancel');
};

Window_Cancel.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = Graphics.boxHeight - this.height;
};

function Window_Credit() {
    this.initialize.apply(this, arguments);
}

Window_Credit.prototype = Object.create(Window_Base.prototype);
Window_Credit.prototype.constructor = Window_Credit;

Window_Credit.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this.drawMessage();
};

Window_Credit.prototype.drawMessage = function() {
    var pluginCredit = [
        'test1',
        'test2'
    ];
    var materialCredit = [
        'memo1',
        'memo2',
        'memo3'
    ];
    var indent = 28;
    var raw = 1;
    var japanese = ConfigManager.langSelect == undefined ? true : ConfigManager.langSelect;
    this.drawText(japanese ? '権利表記' : 'Credit', 0, 0, this.width, 'center');
    this.drawText(japanese ? 'RPGツクールMV' : 'RPG Maker MV', 0, this.lineHeight() * raw++, this.width, 'left');
    this.drawText('©2015 KADOKAWA CORPORATION./YOJI OJIMA', indent, this.lineHeight() * raw++, this.width, 'left');
    this.drawText(japanese ? '制作' : 'Create', 0, this.lineHeight() * raw++, this.width, 'left');
    this.drawText('kuroudo (くろうど)', indent, this.lineHeight() * raw++, this.width, 'left');
    this.drawText(japanese ? 'プラグイン' : 'Plugins', 0, this.lineHeight() * raw++, this.width, 'left');
    pluginCredit.forEach(pluginCredit => {
        this.drawText(pluginCredit, indent, this.lineHeight() * raw++, this.width, 'left');
    });
    this.drawText(japanese ? '素材' : 'Materials', 0, this.lineHeight() * raw++, this.width, 'left');
    materialCredit.forEach(materialCredit => {
        this.drawText(materialCredit, indent, this.lineHeight() * raw++, this.width, 'left');
    });
};

})();
