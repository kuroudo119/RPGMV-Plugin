// KRD_SetRegion.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc リージョン番号を書き換えます。
 * @author KRD_DATA (くろうど)
 *
 * @help
 * 【プラグインコマンド】
 * - KRD_SetRegion x y id
 * コマンド：KRD_SetRegion と入力し、スペースを空けて以下のパラメタを入力してください。
 * パラメタ（x）：変更したい x 座標です。
 * パラメタ（y）：変更したい y 座標です。
 * パラメタ（id）：変更後のリージョン番号です。
 * 
 */

(function() {

'use strict';

//------------------------------------------------
// Plugin Command

var KRD_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    KRD_Game_Interpreter_pluginCommand.call(this, command, args);

    switch (command) {
        case 'KRD_SetRegion':
            var x = $gameVariables.value(Number(args[0]) || 0);
            var y = $gameVariables.value(Number(args[1]) || 0);
            var id = $gameVariables.value(Number(args[2]) || 0);
            $gameMap.setRegionId(x, y, 5, id);
            break;
    }
};

//------------------------------------------------
// Region ID

var KRD_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    KRD_Game_Map_initialize.call(this);
    $gameSystem._myData = $gameSystem._myData || null;
};

Game_Map.prototype.setRegionId = function(x, y, z = 5, id = 0) {
    var width = $dataMap.width;
    var height = $dataMap.height;
    $dataMap.data[(z * height + y) * width + x] = id;
    $gameSystem._myData = $dataMap.data;
};

var KRD_Game_Map_data = Game_Map.prototype.data;
Game_Map.prototype.data = function() {
    if ($gameSystem._myData == null){
        $gameSystem._myData = $dataMap.data;
    } else {
        $dataMap.data = $gameSystem._myData;
    }
    return KRD_Game_Map_data.call(this);
};

//------------------------------------------------
}());
