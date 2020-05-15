// KRD_MapStatus2.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc マップ画面に戦闘時と同じステータスウィンドウを表示。
 * @author KRD_DATA (くろうど)
 * 
 * @param マップステータス変数番号
 * @desc マップステータス表示処理に使う変数の番号
 * @default 1
 * @type variable
 * 
 * @help
 * マップ画面に戦闘時と同じステータスウィンドウを表示するプラグインです。
 * 
 * ■プラグインコマンド
 * 【コマンド名】
 * マップステータス表示する
 * 【説明】
 * マップステータスを表示します。
 * 
 * 【コマンド名】
 * マップステータス更新する
 * 【説明】
 * マップステータス表示中に表示内容を更新します。
 * イベントコマンド等で表示内容が変わるような処理
 * （「HPの増減」など）を行った場合に使ってください。
 * 
 * 【コマンド名】
 * マップステータス表示しない
 * 【説明】
 * マップステータスを非表示にします。
 * 
 */

(function() {

'use strict';

const 非表示 = 0;
const 表示中 = 1;
const 更新 = 2;
const 表示に変更 = 4;
const 非表示に変更 = -1;

const プラグインパラメータ = PluginManager.parameters('KRD_MapStatus2');
const マップステータス変数番号 = Number(プラグインパラメータ['マップステータス変数番号']) || 1;

const プラグインコマンド関数退避 = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(プラグインコマンド, プラグインコマンド引数) {
    プラグインコマンド関数退避.apply(this, arguments);

    switch (プラグインコマンド) {
        case 'KRD_MapStatus_refresh':
        case 'マップステータス更新する':
                if ($gameVariables.value(マップステータス変数番号) >= 表示中) {
                $gameVariables.setValue(マップステータス変数番号, 更新);
            }
            break;
        case 'KRD_MapStatus_ON':
        case 'マップステータス表示する':
            $gameVariables.setValue(マップステータス変数番号, 表示に変更);
            break;
        case 'KRD_MapStatus_OFF':
        case 'マップステータス表示しない':
            $gameVariables.setValue(マップステータス変数番号, 非表示に変更);
            break;
    }
};

const 全ウィンドウ作成関数退避 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    this.createMenuStatus();
    全ウィンドウ作成関数退避.apply(this, arguments);
};

Scene_Map.prototype.createMenuStatus = function() {
    this._statusWindow = new マップステータスウィンドウ();
    this.addWindow(this._statusWindow);
    this._statusWindow.open();
};

const マップ更新関数退避 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    マップ更新関数退避.apply(this, arguments);
    this.updateStatus();
};

Scene_Map.prototype.updateStatus = function() {
    const 状態 = $gameVariables.value(マップステータス変数番号);
    if (状態 === 更新) {
        this._statusWindow.refresh();
        $gameVariables.setValue(マップステータス変数番号, 表示中);
    } else if (状態 === 表示に変更) {
        this._statusWindow.open();
        $gameVariables.setValue(マップステータス変数番号, 更新);
    } else if (状態 === 非表示に変更) {
        this._statusWindow.close();
        $gameVariables.setValue(マップステータス変数番号, 非表示);
    }
};

const 歩行処理関数退避 = Game_Actor.prototype.onPlayerWalk;
Game_Actor.prototype.onPlayerWalk = function() {
    歩行処理関数退避.apply(this, arguments);
    $gameVariables.setValue(マップステータス変数番号, 更新);
};

const バトル終了処理関数退避 = BattleManager.endBattle;
BattleManager.endBattle = function(結果) {
    バトル終了処理関数退避.apply(this, arguments);
    const 状態 = $gameVariables.value(マップステータス変数番号);
    $gameVariables.setValue(マップステータス変数番号, 状態 >= 表示中 ? 更新 : 非表示に変更);
};

//------------------------------------------------
function マップステータスウィンドウ() {
    this.初期処理.apply(this, arguments);
}

マップステータスウィンドウ.prototype = Object.create(Window_BattleStatus.prototype);
マップステータスウィンドウ.prototype.constructor = マップステータスウィンドウ;

マップステータスウィンドウ.prototype.初期処理 = function() {
    Window_BattleStatus.prototype.initialize.apply(this, arguments);
    const 状態 = $gameVariables.value(マップステータス変数番号);
    $gameVariables.setValue(マップステータス変数番号, 状態 >= 表示中 ? 更新 : 非表示に変更);
};

//------------------------------------------------
}());
