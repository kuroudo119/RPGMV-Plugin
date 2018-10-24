//================================================
// KRD-ConfigCancel.js
//
// Copyright (c) 2018 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc This plugin adds "Cancel" to config window.
 * @author KRD_DATA (くろうど)
 *
 */

(function() {

'use strict';

//================================================

var KRD_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    KRD_Window_Options_makeCommandList.call(this);
    this.addCommand(TextManager.cancel, 'cancel');
};

var KRD_Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    if (symbol.contains('cancel')) {
        return '';
    }
    return KRD_Window_Options_statusText.call(this, index);
};

var KRD_Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol.contains('cancel')) {
        SoundManager.playCancel();
        SceneManager.pop();
    } else {
        KRD_Window_Options_processOk.call(this);
    }
};

//================================================
})();
