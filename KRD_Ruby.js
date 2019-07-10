//================================================
// KRD_Ruby.js
//
// Copyright (c) 2019 kuroudo (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Set ruby on message.(20190710)
 * @author kuroudo (くろうど)
 * @help [Usage]
 * Write in message. \R[BASE,ruby]
 * 
 * [Caution]
 * Use a row for ruby.
 * 
 */

 /*:ja
 * @plugindesc メッセージにルビ（読みがな）を付けます。(20190710)
 * @author kuroudo (くろうど)
 * @help 【使い方】
 * ルビを振りたいメッセージに \R[漢字,かんじ] のように \R[] で囲って記述します。
 * 区切りはカンマ（,）です。
 * 
 * 【注意】
 * ルビは1つ上の行に表示されます。
 * 文章とルビの重なりを避けるために、ルビ用に1行使用する事を推奨します。
 * 
 */

(function() {

'use strict';

//================================================
// Ruby

var KRD_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
        case 'R':
            this.processRubyCharacter(textState);
            break;
        default:
            KRD_Window_Base_processEscapeCharacter.apply(this, arguments);
    }
};

Window_Base.prototype.obtainEscapeParamChar = function(textState) {
    var arr = /^\[[^,]+?,[^,]+?\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0];
    } else {
        return '';
    }
};

Window_Base.prototype.processRubyCharacter = function(textState) {
    var text = this.obtainEscapeParamChar(textState).split(',');
    var base = text[0].slice(1);
    var ruby = text[1].slice(0, -1);
    var w = this.textWidth(base);
    this.makeFontSmaller();
    this.contents.drawText(ruby, textState.x, textState.y - textState.height, w, textState.height, 'center');
    this.makeFontBigger();
    this.contents.drawText(base, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
};

//================================================
})();
