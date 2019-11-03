// KRD_Sugoroku_Alpha.js
//
// Copyright (c) 2019 KRD_DATA (くろうど)
// This is under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Sugoroku Plugin version Alpha. 2019/11/03 Update.
 * @author KRD_DATA (くろうど)
 * 
 * @requiredAssets img/pictures/dice_1
 * @requiredAssets img/pictures/dice_2
 * @requiredAssets img/pictures/dice_3
 * @requiredAssets img/pictures/dice_4
 * @requiredAssets img/pictures/dice_5
 * @requiredAssets img/pictures/dice_6
 * 
 * @param Common_Sugoroku
 * @desc Set a common event number to use for Sugoroku Move.
 * @default 1
 * @type common_event
 * 
 * @param Common_Goal
 * @desc Set a common event number to use for Goal Event.
 * @default 2
 * @type common_event
 * 
 * @param Common_RivalMove
 * @desc Set a common event number to use for Rival Move.
 * @default 3
 * @type common_event
 * 
 * @param Common_CollisionByRival
 * @desc Set a common event number to use for Collision by Rival.
 * @default 4
 * @type common_event
 * 
 * @param Common_CollisionByActor
 * @desc Set a common event number to use for Collision by Actor.
 * @default 5
 * @type common_event
 * 
 * @param Common_CollisionByReverse
 * @desc Set a common event number to use for Collision by Reverse.
 * @default 6
 * @type common_event
 * 
 * @param Common_RegionBase
 * @desc Set a common event number's base to use for Region ID.
 * @default 10
 * @type common_event
 * 
 * @param Switch_SugorokuMode
 * @desc Set a switch number to use for Sugoroku Mode.
 * @default 1
 * @type switch
 * 
 * @param Switch_DiceRoll
 * @desc Set a switch number to use for Dice Roll.
 * @default 2
 * @type switch
 * 
 * @param Switch_Collision
 * @desc Set a switch number to use for Collision to Rival.
 * @default 3
 * @type switch
 * 
 * @param Switch_CanMoveRival
 * @desc Set a switch number to use for Rival Movable.
 * @default 4
 * @type switch
 * 
 * @param Variable_Dice
 * @desc Set a variables number to use for Number of Dice.
 * @default 1
 * @type variable
 * 
 * @param Variable_RollType
 * @desc Set a variables number to use for Dice Roll Type.
 * @default 2
 * @type variable
 * 
 * @param Variable_Result
 * @desc Set a variables number to use for Result from Dice Roll.
 * @default 3
 * @type variable
 * 
 * @param Variable_NextDirection
 * @desc Set a variables number to use for not Terrain Tag.
 * @default 4
 * @type variable
 * 
 * @param Variable_EventX
 * @desc Set a variables number to use for Rival's X Position.
 * @default 5
 * @type variable
 * 
 * @param Variable_EventY
 * @desc Set a variables number to use for Rival's Y Position.
 * @default 6
 * @type variable
 * 
 * @param Variable_RivalStatus
 * @desc Set a variables number to use for Rival's Status.
 * @default 7
 * @type variable
 * 
 * @param Event_Rival
 * @desc Set a Map Event ID to use for Rival.
 * @default 1
 * @type number
 * @min 0
 * 
 * @param DiceX
 * @desc Set Dice Position X.
 * @default 408
 * @type number
 * @min 0
 * 
 * @param NextDicePosition
 * @desc Set Next Dice Position X.
 * @default 120
 * @type number
 * @min 0
 * 
 * @param HalfNextDicePosition
 * @desc Set Half Next Dice Position X.
 * @default 60
 * @type number
 * @min 0
 * 
 * @param DiceY
 * @desc Set Dice Position Y.
 * @default 312
 * @type number
 * @min 0
 * 
 * @param MoveSpeed
 * @desc Set Move Speed for Sugoroku Move.
 * @default 6
 * @type number
 * @min 0
 * 
 * @param DefaultSpeed
 * @desc Set Default Speed.
 * @default 4
 * @type number
 * @min 0
 * 
 * @help
 * This is the Sugoroku Plugin version Alpha.
 * 
 * [Use Image]
 * Please set dice images into pictures folder.
 * For example the name is dice_1.
 * For example the size is 100px.
 * 
 * img/pictures/dice_1
 * img/pictures/dice_2
 * img/pictures/dice_3
 * img/pictures/dice_4
 * img/pictures/dice_5
 * img/pictures/dice_6
 * 
 * [Setting]
 * Set Terrain Tag for direction to move.
 * Terrain Tag : Direction
 *           1 : Down
 *           2 : Left
 *           3 : Right
 *           4 : Up
 * 
 * Set Region ID to use Stop Event.
 * Stop event is common event.
 * Common Event ID + Common_RegionBase = Stop Event's Common Event ID
 * 
 * [Usage Sugoroku Start]
 * Player can't move on Sugoroku Mode Switch is ON.
 * 
 * [Usege Dice Roll]
 * 1. Set the Roll Type Variable.
 * Value : Roll Type
 *     1 : Add dice rolls (nD6)
 *     2 : DiceA * 10 + DiceB (D66)
 *     3 : Count 3 or more
 *     4 : Count 4 or more
 * 
 * 2. Set the Number of Dice Variable to use Number of Dice.
 * 3. Set the Dice Roll Switch to ON to roll some dice.
 * 4. Set the Dice Roll Switch to OFF to stop roll.
 * 
 * [Usage Player Move]
 * Set player's move steps by plugin command KRD_setPlayerStep.
 * 
 * 
 * プラグインコマンド「KRD_setPlayerStep」を使用して、
 * プレイヤーが移動する歩数（マスの数）を設定してください。
 * 
 * そうすると、マスに設定された地形タグに従って自動的に移動します。
 * そして、止まったマスのリージョンIDを元に算出されたコモンイベントを実行します。
 * 
 * 地形タグを設定していないマス、つまり地形タグが 0 のマスは、移動が強制停止し、
 * ゴールイベント（Common_Goal で設定したコモンイベント）が実行されます。
 * 
 * 
 * 
 * [Usage Rival]
 * 一緒にすごろくをするキャラクターを1体用意する事が出来ます。
 * これをこのプラグインではライバルと呼びます。
 * 
 * ライバルを使用する場合、
 * まず、Event_Rival にマップイベントIDを設定します。
 * この値は全マップ共通で使うので 1 を使う事を想定しています。
 * 
 * ライバルを移動させるには
 * まず、 KRD_startRival を使います。
 * 
 * そして、プラグインコマンド「KRD_setRivalStep」を使用して、
 * ライバルが移動する歩数（マスの数）を設定してください。
 * そうすると、ライバルが自動的に移動します。
 * ライバルはマスに止まってもイベントが発生しません。
 * 
 * ライバルとの衝突イベントを発生させる場合、
 * Switch_Collision で設定したスイッチを ON にしてください。
 * 
 * 
 * 
 * [Step]
 * 歩数は Variable_Result で設定した変数を使用する想定ですが、
 * 必ずしもサイコロを振る必要はなく、値の設定方法は自由です。
 * 
 * 歩数がマイナスの場合、マスの向きと反対方向に移動します。
 * つまり、戻る移動をするわけですが、曲がる事は出来ません。
 * 
 * 戻す先が決まっているなら、移動ルートの設定でジャンプするなどしてください。
 * 
 * [Plugin Command]
 * 以下はプラグインコマンドのコマンド名です。
 * プラグインコマンドは「コマンド名 パラメータ」という構成で記述します。
 * コマンド名とパラメータの間は半角スペースです。
 * 
 * - KRD_setPlayerStep
 * プレイヤーが移動する歩数を設定します。
 * パラメータは、歩数が入っている変数の番号です。
 * 
 * - KRD_setPlayerStepValue
 * プレイヤーが移動する歩数を設定します。
 * パラメータは、歩数の値そのものです。
 * 
 * - KRD_setRivalStep
 * ライバルが移動する歩数を設定します。
 * パラメータは、歩数が入っている変数の番号です。
 * 
 * - KRD_eraseDice
 * 表示されているサイコロ画像を消します。
 * パラメータはありません。
 * 
 * - KRD_initSugoroku
 * そのマップでのすごろく処理を開始します。
 * パラメータはありません。
 * 
 * - KRD_idleRival
 * ライバルを一時移動停止します。
 * パラメータはありません。
 * 
 * - KRD_startRival
 * ライバルが移動可能な状態にします。
 * パラメータはありません。
 * 
 * - KRD_stopRival
 * ライバルの移動を終了します。
 * パラメータはありません。
 * 
 * - KRD_setCanMoveRival
 * ライバルが移動可能な状態なのかチェックしてスイッチをON／OFFします。
 * Switch_CanMoveRival で設定したスイッチが使用されます。
 * パラメータはありません。
 * 
 * 
 */

/*:ja
 * @plugindesc すごろくプラグイン。アルファ版。2019/11/03 更新。
 * @author KRD_DATA (くろうど)
 * 
 * @requiredAssets img/pictures/dice_1
 * @requiredAssets img/pictures/dice_2
 * @requiredAssets img/pictures/dice_3
 * @requiredAssets img/pictures/dice_4
 * @requiredAssets img/pictures/dice_5
 * @requiredAssets img/pictures/dice_6
 * 
 * @param Common_Sugoroku
 * @desc プレイヤーの移動に使うコモンイベント番号を設定してください。
 * @default 1
 * @type common_event
 * 
 * @param Common_Goal
 * @desc ゴールに止まった時に使うコモンイベント番号を設定してください。
 * @default 2
 * @type common_event
 * 
 * @param Common_RivalMove
 * @desc ライバルの移動に使うコモンイベント番号を設定してください。
 * @default 3
 * @type common_event
 * 
 * @param Common_CollisionByRival
 * @desc ライバルがプレイヤーに衝突した時に使うコモンイベント番号を設定してください。
 * @default 4
 * @type common_event
 * 
 * @param Common_CollisionByActor
 * @desc アクターがライバルに衝突した時に使うコモンイベント番号を設定してください。
 * @default 5
 * @type common_event
 * 
 * @param Common_CollisionByReverse
 * @desc アクターが戻る移動してライバルに衝突した時に使うコモンイベント番号を設定してください。
 * @default 6
 * @type common_event
 * 
 * @param Common_RegionBase
 * @desc マスに止まった時に使うコモンイベント番号の基礎値を設定してください。
 * @default 10
 * @type common_event
 * 
 * @param Switch_SugorokuMode
 * @desc すごろくモードに使うスイッチ番号を設定してください。
 * @default 1
 * @type switch
 * 
 * @param Switch_DiceRoll
 * @desc サイコロを振る時に使うスイッチ番号を設定してください。
 * @default 2
 * @type switch
 * 
 * @param Switch_Collision
 * @desc ライバルとの衝突処理を使うかどうかのスイッチ番号を設定してください。
 * @default 3
 * @type switch
 * 
 * @param Switch_CanMoveRival
 * @desc ライバルの移動可能状態に使うスイッチ番号を設定してください。
 * @default 4
 * @type switch
 * 
 * @param Variable_Dice
 * @desc サイコロを振る個数を入れる変数の番号を設定してください。
 * @default 1
 * @type variable
 * 
 * @param Variable_RollType
 * @desc サイコロの判定方法に使う変数の番号を設定してください。
 * @default 2
 * @type variable
 * 
 * @param Variable_Result
 * @desc サイコロの判定結果を入れる変数の番号を設定してください。
 * @default 3
 * @type variable
 * 
 * @param Variable_NextDirection
 * @desc 地形タグを無視して次の方向を決める時に使う変数の番号を設定してください。
 * @default 4
 * @type variable
 * 
 * @param Variable_EventX
 * @desc ライバルの位置（x座標）を入れる変数の番号を設定してください。
 * @default 5
 * @type variable
 * 
 * @param Variable_EventY
 * @desc ライバルの位置（y座標）を入れる変数の番号を設定してください。
 * @default 6
 * @type variable
 * 
 * @param Variable_RivalStatus
 * @desc ライバルの状態を入れる変数の番号を設定してください。
 * @default 7
 * @type variable
 * 
 * @param Event_Rival
 * @desc ライバルに使用するマップイベントIDを設定してください。
 * @default 1
 * @type number
 * @min 0
 * 
 * @param DiceX
 * @desc 1つ目のサイコロ画像を表示する位置（x座標）を設定してください。
 * @default 408
 * @type number
 * @min 0
 * 
 * @param NextDicePosition
 * @desc サイコロ画像を表示する位置に加算していく値を設定してください。
 * @default 120
 * @type number
 * @min 0
 * 
 * @param HalfNextDicePosition
 * @desc サイコロ画像を表示する位置に加算していく値（の半分）を設定してください。
 * @default 60
 * @type number
 * @min 0
 * 
 * @param DiceY
 * @desc 1つ目のサイコロ画像を表示する位置（y座標）を設定してください。
 * @default 312
 * @type number
 * @min 0
 * 
 * @param MoveSpeed
 * @desc すごろくの移動時に使う移動速度を設定してください（1～6）。
 * @default 6
 * @type number
 * @min 0
 * 
 * @param DefaultSpeed
 * @desc すごろく以外で使う移動速度を設定してください（1～6）。
 * @default 4
 * @type number
 * @min 0
 * 
 * @help
 * これはすごろくプラグイン（アルファ版）です。
 * 
 * 【使用する画像】
 * サイコロ画像を pictures フォルダに入れてください。
 * ファイル名は dice_1 から dice_6 としてください。
 * サイコロ画像の画像サイズは一辺が 100 ピクセルの正方形を想定しています。
 * サイコロ処理で、ピクチャID 1～9 を使います。
 * 
 * img/pictures/dice_1
 * img/pictures/dice_2
 * img/pictures/dice_3
 * img/pictures/dice_4
 * img/pictures/dice_5
 * img/pictures/dice_6
 * 
 * 【設定】
 * 移動に使用するタイルセットに地形タグを設定してください。
 * 
 * 地形タグ : 移動する方向
 *       1 : 下 ↓
 *       2 : 左 ←
 *       3 : 右 →
 *       4 : 上 ↑
 * 
 * 止まった時に発生するコモンイベントの番号と
 * 対応するリージョンIDをマップに設定してください。
 * 「リージョンID ＋ Common_RegionBase の値 
 * = 止まった時に発生するコモンイベントの番号」となります。
 * 
 * 【すごろくの開始について】
 * すごろくモードスイッチが ON の時、プレイヤーは移動が出来なくなります。
 * 
 * 【サイコロ処理の使い方】
 * 1. 「サイコロの判定方法に使う変数（Variable_RollType）」に
 * 値を設定してください。
 * 
 * 設定する値 : 判定方法
 *         1 : 出目を加算(nD6)
 *         2 : サイコロを2個振り片方を10の位とする(D66)
 *         3 : 出目(3以上)の個数をカウント
 *         4 : 出目(4以上)の個数をカウント
 * 
 * 2. 「サイコロを振る個数を入れる変数（Variable_Dice）」に
 * サイコロの個数を設定してください。
 * 3. 「サイコロを振る時に使うスイッチ（Switch_DiceRoll）」を
 * ON にしてください。
 * サイコロを振っている状態になります。
 * 4. プレイヤーの入力などにより、
 * 「サイコロを振る時に使うスイッチ（Switch_DiceRoll）」を
 * OFF にしてください。
 * 
 *    （イベント例）
 *   ◆スイッチの操作：#0002 Rolling Dice = ON
 *   ◆ループ
 *    ◆選択肢の表示：サイコロを止める (ウィンドウ, 中, #1, -)
 *    ：サイコロを止めるのとき
 *      ◆スイッチの操作：#0002 Rolling Dice = OFF
 *      ◆ループの中断
 *      ◆
 *    ：分岐終了
 *   ：以上繰り返し
 * 
 * 【プレイヤーの移動方法】
 * プラグインコマンド「KRD_setPlayerStep」を使用して、
 * プレイヤーが移動する歩数（マスの数）を設定してください。
 * 
 * そうすると、マスに設定された地形タグに従って自動的に移動します。
 * そして、止まったマスのリージョンIDを元に算出されたコモンイベントを実行します。
 * 
 * 地形タグを設定していないマス、つまり地形タグが 0 のマスは、移動が強制停止し、
 * ゴールイベント（Common_Goal で設定したコモンイベント）が実行されます。
 * 
 * 【ライバルの使い方】
 * 一緒にすごろくをするキャラクターを1体用意する事が出来ます。
 * これをこのプラグインではライバルと呼びます。
 * 
 * ライバルを使用する場合、
 * まず、Event_Rival にマップイベントIDを設定します。
 * この値は全マップ共通で使うので 1 を使う事を想定しています。
 * 
 * ライバルを移動させるには
 * まず、 KRD_startRival を使います。
 * 
 * そして、プラグインコマンド「KRD_setRivalStep」を使用して、
 * ライバルが移動する歩数（マスの数）を設定してください。
 * そうすると、ライバルが自動的に移動します。
 * ライバルはマスに止まってもイベントが発生しません。
 * 
 * ライバルとの衝突イベントを発生させる場合、
 * Switch_Collision で設定したスイッチを ON にしてください。
 * 
 * 【歩数について】
 * 歩数は Variable_Result で設定した変数を使用する想定ですが、
 * 必ずしもサイコロを振る必要はなく、値の設定方法は自由です。
 * 
 * 歩数がマイナスの場合、マスの向きと反対方向に移動します。
 * つまり、戻る移動をするわけですが、曲がる事は出来ません。
 * 
 * 戻す先が決まっているなら、移動ルートの設定でジャンプするなどしてください。
 * 
 * 【プラグインコマンドの使い方】
 * 以下はプラグインコマンドのコマンド名です。
 * プラグインコマンドは「コマンド名 パラメータ」という構成で記述します。
 * コマンド名とパラメータの間は半角スペースです。
 * 
 * - KRD_setPlayerStep
 * プレイヤーが移動する歩数を設定します。
 * パラメータは、歩数が入っている変数の番号です。
 * 
 * - KRD_setPlayerStepValue
 * プレイヤーが移動する歩数を設定します。
 * パラメータは、歩数の値そのものです。
 * 
 * - KRD_setRivalStep
 * ライバルが移動する歩数を設定します。
 * パラメータは、歩数が入っている変数の番号です。
 * 
 * - KRD_eraseDice
 * 表示されているサイコロ画像を消します。
 * パラメータはありません。
 * 
 * - KRD_initSugoroku
 * そのマップでのすごろく処理を開始します。
 * パラメータはありません。
 * 
 * - KRD_idleRival
 * ライバルを一時移動停止します。
 * パラメータはありません。
 * 
 * - KRD_startRival
 * ライバルが移動可能な状態にします。
 * パラメータはありません。
 * 
 * - KRD_stopRival
 * ライバルの移動を終了します。
 * パラメータはありません。
 * 
 * - KRD_setCanMoveRival
 * ライバルが移動可能な状態なのかチェックしてスイッチをON／OFFします。
 * Switch_CanMoveRival で設定したスイッチが使用されます。
 * パラメータはありません。
 * 
 */

(function() {

'use strict';

const parameters = PluginManager.parameters('KRD_Sugoroku_Alpha');

// Common Event ID
const cmnSugoroku           = Number(parameters['Common_Sugoroku']);
const cmnGoal               = Number(parameters['Common_Goal']);
const cmnRivalMove          = Number(parameters['Common_RivalMove']);
const cmnCollisionByRival   = Number(parameters['Common_CollisionByRival']);
const cmnCollisionByActor   = Number(parameters['Common_CollisionByActor']);
const cmnCollisionByReverse = Number(parameters['Common_CollisionByReverse']);
const cmnPlus               = Number(parameters['Common_RegionBase']);

// Switch ID
const swSugoroku  = Number(parameters['Switch_SugorokuMode']);
const swRolling   = Number(parameters['Switch_DiceRoll']);
const swCollision = Number(parameters['Switch_Collision']);
const swRival     = Number(parameters['Switch_CanMoveRival']);

// Variable ID
const varDice      = Number(parameters['Variable_Dice']);
const varType      = Number(parameters['Variable_RollType']);
const varResult    = Number(parameters['Variable_Result']);
const varDirection = Number(parameters['Variable_NextDirection']);
const varEventX    = Number(parameters['Variable_EventX']);
const varEventY    = Number(parameters['Variable_EventY']);
const varRival     = Number(parameters['Variable_RivalStatus']);

// Event ID
const evRival = Number(parameters['Event_Rival']);

// Dice Image
const dx    = Number(parameters['DiceX']);
const dNext = Number(parameters['NextDicePosition']);
const dHalf = Number(parameters['HalfNextDicePosition']);
const dy    = Number(parameters['DiceY']);

// Move Speed
const moveSpeed    = Number(parameters['MoveSpeed']);
const defaultSpeed = Number(parameters['DefaultSpeed']);

//================================================
// Plugin Command

const KRD_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    KRD_Game_Interpreter_pluginCommand.call(this, command, args);

    switch (command) {
        case 'KRD_setPlayerStep':
            var v = !!Number(args) ? Number(args) : 0;
            $gamePlayer.setStep($gameVariables.value(v));
            break;
        case 'KRD_setPlayerStepValue':
            var step = !!Number(args) ? Number(args) : 0;
            $gamePlayer.setStep(step);
            break;
        case 'KRD_setRivalStep':
            var v = !!Number(args) ? Number(args) : 0;
            $gameMap._events[evRival].setStep($gameVariables.value(v));
            break;
        case 'KRD_eraseDice':
            $gameScreen.eraseDice();
            break;
        case 'KRD_initSugoroku':
            $gamePlayer.initSugoroku();
            break;
        case 'KRD_idleRival':
            $gameMap._events[evRival].idleRival();
            break;
        case 'KRD_startRival':
            $gameMap._events[evRival].startRival();
            break;
        case 'KRD_stopRival':
            $gameMap._events[evRival].stopRival();
            break;
        case 'KRD_setCanMoveRival':
            var movable = this.canMoveRival();
            $gameSwitches.setValue(swRival, movable);
            break;
    }
};

//================================================
// Move for Sugoroku

const KRD_Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
    if ($gameSwitches.value(swSugoroku)) {
        $gameTemp.reserveCommonEvent(cmnSugoroku);
    } else {
        KRD_Game_Player_executeMove.call(this, direction);
    }
};

const KRD_Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
    if ($gameSwitches.value(swSugoroku)) {
        if (Input.isTriggered('ok')) {
            $gameTemp.reserveCommonEvent(cmnSugoroku);
            return true;
        }
        return false;
    } else {
        KRD_Game_Player_triggerButtonAction.call(this);
    }
};

//================================================
// Sugoroku Initialize

Game_Player.prototype.initSugoroku = function(){
    if (evRival > 0) {
        $gameMap._events[evRival].initRival();
    }
};

//================================================
// Sugoroku Step

Game_Player.prototype.setStep = function(step = null){
    this._step = step;
};

Game_Player.prototype.sugorokuStep = function(){
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    let direction = $gameMap.terrainTag(x, y);
    const next = $gameVariables.value(varDirection);
    if (next > 0 && next <= 4) {
        direction = next;
        $gameVariables.setValue(varDirection, 0);
    }
    switch (direction) {
        case 1: // Down
            this.setDirection(2);
            break;
        case 2: // Left
            this.setDirection(4);
            break;
        case 3: // Right
            this.setDirection(6);
            break;
        case 4: // Up
            this.setDirection(8);
            break;
        default: // Don't Move
            return;
    }
    this.forceMoveForward();
    if (evRival > 0) {
        $gameMap._events[evRival].collisionEvent(cmnCollisionByActor);
    }
};

Game_Player.prototype.sugorokuReverse = function(){
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const tag = $gameMap.terrainTag(x, y);
    switch (tag) {
        case 1: // Down -> Up
            this.setDirection(8);
            break;
        case 2: // Left -> Right
            this.setDirection(6);
            break;
        case 3: // Right -> Left
            this.setDirection(4);
            break;
        case 4: // Up -> Down
            this.setDirection(2);
            break;
        default: // Don't Move
            return;
    }
    this.forceMoveForward();
    if (evRival > 0) {
        $gameMap._events[evRival].collisionEvent(cmnCollisionByReverse);
    }
};

const KRD_Game_Player_updateStop = Game_Player.prototype.updateStop;
Game_Player.prototype.updateStop = function() {
    KRD_Game_Player_updateStop.call(this);
    
    if (this._step != null) {
        if (this._step > 0) {
            this._step -= 1;
            this.setMoveSpeed(moveSpeed);
            this.sugorokuStep();
        } else if (this._step < 0) {
            this._step += 1;
            this.setMoveSpeed(moveSpeed);
            this.sugorokuReverse();
        } else {
            this.checkRegion();
            this.setMoveSpeed(defaultSpeed);
            this._step = null;
        }
    }
};

const KRD_Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if (this._step != null) {
        return false;
    } else {
        return KRD_Game_Player_canMove.call(this);
    }
};

//================================================
// Sugoroku Stop Event

Game_Player.prototype.checkRegion = function(){
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const region = $gameMap.regionId(x, y);
    if (region > 0) {
        $gameTemp.reserveCommonEvent(region + cmnPlus);
    } else {
        $gameTemp.reserveCommonEvent(cmnGoal);
    }
};

//================================================
// Dice Roll

Game_Screen.prototype.rollDice = function(count = 0, max = 1){
    const name = ['dice_1', 'dice_2', 'dice_3', 'dice_4', 'dice_5', 'dice_6'];
    const baseX = [
                [dx],
                [dx - dHalf, dx + dHalf],
                [dx - dNext, dx, dx + dNext],
                [dx - dNext, dx, dx + dNext, dx],
                [dx - dNext, dx, dx + dNext, dx - dHalf, dx + dHalf],
                [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext],
                [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext, dx],
                [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext, dx - dHalf, dx + dHalf],
                [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext]
            ];
    const x = baseX[max - 1][count];
    const y = dy + Math.floor(count / 3) * dNext;
    const dice = Math.randomInt(6) + 1;
    //   showPicture(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    this.showPicture(count + 1, name[dice - 1], 1, x, y, 100, 100, 255, 0);
    return dice;
};

Game_Screen.prototype.rollAllDice = function() {
    $gameVariables.setValue(varResult, 0);
    const max = Math.min($gameVariables.value(varDice), 9);
    for (let i = 0; i < max; i++) {
        $gameVariables.setValue(varResult, this.rollDice(i, max) + $gameVariables.value(varResult));
    }
};

Game_Screen.prototype.rollD66 = function() {
    $gameVariables.setValue(varDice, 2);
    $gameVariables.setValue(varResult, this.rollDice(0, 2) * 10);
    $gameVariables.setValue(varResult, this.rollDice(1, 2) + $gameVariables.value(varResult));
};

Game_Screen.prototype.rollUpper = function(border = 3) {
    $gameVariables.setValue(varResult, 0);
    const max = Math.min($gameVariables.value(varDice), 9);
    for (let i = 0; i < max; i++) {
        $gameVariables.setValue(varResult,
            this.rollDice(i, max) >= border ? $gameVariables.value(varResult) + 1 : $gameVariables.value(varResult));
    }
};

Game_Screen.prototype.selectRollType = function() {
    if ($gameSwitches.value(swRolling)) {
        switch ($gameVariables.value(varType)) {
            case 1:
                this.rollAllDice();
                break;
            case 2:
                this.rollD66();
                break;
            case 3:
                this.rollUpper();
                break;
            case 4:
                this.rollUpper(4);
                break;
            default:
                this.rollAllDice();
                break;
        }
    }
};

const KRD_Game_Screen_updatePictures = Game_Screen.prototype.updatePictures;
Game_Screen.prototype.updatePictures = function() {
    this.selectRollType();
    KRD_Game_Screen_updatePictures.call(this);
};

Game_Screen.prototype.eraseDice = function() {
    const max = Math.min($gameVariables.value(varDice), 9);
    for (let i = 1; i <= max; i++) {
        const realPictureId = this.realPictureId(i);
        this._pictures[realPictureId] = null;
    }
};

//================================================
// Rival Move

Game_Event.prototype.setStep = function(step = null){
    this._step = step;
};

Game_Event.prototype.sugorokuStep = function(){
    const x = this.x;
    const y = this.y;
    const tag = $gameMap.terrainTag(x, y);
    switch (tag) {
        case 1: // Down
            this.setDirection(2);
            break;
        case 2: // Left
            this.setDirection(4);
            break;
        case 3: // Right
            this.setDirection(6);
            break;
        case 4: // Up
            this.setDirection(8);
            break;
        default: // Don't Move
            return;
    }
    this.moveForward();
    this.collisionEvent(cmnCollisionByRival);
};

const KRD_Game_Event_updateStop = Game_Event.prototype.updateStop;
Game_Event.prototype.updateStop = function() {
    KRD_Game_Event_updateStop.call(this);

    if (this._step != null) {
        if (this._step > 0) {
            this._step -= 1;
            this.setThrough(true);
            this.setMoveSpeed(moveSpeed);
            this.sugorokuStep();
        } else {
            switch ($gameVariables.value(varRival)){
                case 100:
                    this.saveRival();
                    break;
                case 200:
                    this.saveRival();
                    break;
                case 300:
                    this.saveRival();
                    break;
            }
            this.setMoveSpeed(defaultSpeed);
            this.setThrough(false);
            this._step = null;
        }
    }
};

//================================================
// Rival Position

Game_Event.prototype.initRival = function(){
    const x = $gameVariables.value(varEventX);
    const y = $gameVariables.value(varEventY);
    if (x != 0 && y != 0) {
        this.locate(x, y);
    }
};

Game_Event.prototype.idleRival = function(){
    const rivalStatus = $gameVariables.value(varRival);
    $gameVariables.setValue(varRival, rivalStatus < 300 ? 100 : rivalStatus);
};

Game_Event.prototype.startRival = function(){
    const rivalStatus = $gameVariables.value(varRival);
    $gameVariables.setValue(varRival, rivalStatus < 300 ? 200 : rivalStatus);
};

Game_Event.prototype.stopRival = function(){
    const rivalStatus = $gameVariables.value(varRival);
    $gameVariables.setValue(varRival, rivalStatus < 300 ? 300 : rivalStatus);
};

Game_Event.prototype.saveRival = function(){
    $gameVariables.setValue(varEventX, this.x);
    $gameVariables.setValue(varEventY, this.y);
};

Game_Interpreter.prototype.canMoveRival = function(){
    const rivalStatus = $gameVariables.value(varRival);
    return rivalStatus === 200;
};

//================================================
// Collision

Game_Event.prototype.checkCollision = function(){
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const eventX = this.x;
    const eventY = this.y;
    return x === eventX && y === eventY;
};

Game_Event.prototype.collisionEvent = function(commonId){
    if ($gameSwitches.value(swCollision) && this.checkCollision()) {
        $gamePlayer._step = null;
        this._step = null;
        if (!!commonId) {
            $gameTemp.reserveCommonEvent(commonId);
        }
    }
};

//================================================
}());
