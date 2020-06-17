// KRD_AlwaysImage.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This is Released under the MIT license.
// https://github.com/kuroudo119/RPGMV-Plugin/blob/master/LICENSE

/*:
 * @plugindesc 画像を常時画面上に表示します。
 * @author KRD_DATA (くろうど)
 * 
 * @param ファイル
 * @desc 表示する画像のファイル名です。
 * 画像は img/pictures/ フォルダ内に置いてください。
 * @type file
 * @dir img/pictures/
 * 
 * @param ALT
 * @desc HTMLのimgタグのaltに設定する値です。
 * 画像の読込失敗時にこの文字列が表示されます。
 * @default KRD_AlwaysImage
 * 
 * @param ID
 * @desc HTMLのimgタグのIDに設定する値です。
 * 特に変更する必要はありません。
 * @default KRD_AlwaysImage
 * 
 * @param 下余白
 * @desc Windowの下と画像の下の空白部分です。
 * 単位はピクセルです。表示する位置を微調整できます。
 * @default 10
 * @type number
 * @min -10000
 * 
 * @param 右余白
 * @desc Windowの右端と画像の右端の空白部分です。
 * 単位はピクセルです。表示する位置を微調整できます。
 * @default 10
 * @type number
 * @min -10000
 * 
 * @param 不透明度
 * @desc 表示する画像の不透明度です。
 * 0:透明 → 100:不透明
 * @default 100
 * @type number
 * @max 100
 * 
 * @param コモンイベント番号
 * @desc 画像をクリックまたはタッチした時に実行する
 * コモンイベントの番号です。1以上の場合に有効。
 * @default 0
 * @type common_event
 * 
 * @help
 * これはWindow内に常時画像を表示させるプラグインです。
 * 
 * ここで言うWindowはブラウザのWindowです。
 * ゲームの表示領域の外も含みます。
 * 
 * そのWindowの右下に画像を常時表示します。
 * ゲーム起動時から表示するので、
 * タイトル画面でも表示されます。
 * 
 * 非表示にする機能はありません。
 * 
 * ブラウザのサイズを変更しても
 * 画像サイズは変わりませんが、
 * 表示位置は変更されます。
 * 
 * オマケ機能として、
 * 画像をクリックまたはタッチした時に、
 * 任意のコモンイベントひとつを呼ぶ機能があります。
 * 
 * クリックは左右両方ともです。
 * 
 * 画像を連打すると何回もコモンイベントが
 * 呼ばれますので注意してください。
 * 
 */

(function() {

'use strict';

const parameters = PluginManager.parameters('KRD_AlwaysImage');

const パス		= './img/pictures/';
const ファイル	= parameters['ファイル'] + '.png';
const ALT		= parameters['ALT']		|| 'KRD_AlwaysImage';
const ID		= parameters['ID']		|| 'KRD_AlwaysImage';
const 下余白	= parameters['下余白']	|| '10';
const 右余白	= parameters['右余白']	|| '10';
const 不透明度	= ((Number(parameters['不透明度']) || 0) / 100).toString();
const コモン番号 = Number(parameters['コモンイベント番号']) || 0;

let 表示状態	= false;

class 肖像画 {
	constructor() {
		this._img = document.createElement('img');
		this._img.src	= パス + ファイル;
		this._img.alt	= ALT;
		this._img.id	= ID;
		this._img.style.position	= 'fixed';
		this._img.style.bottom		= 下余白 + 'px';
		this._img.style.right		= 右余白 + 'px';
		this._img.style.opacity		= 不透明度;
		this._img.style.zIndex		= '11';

		function タッチ時処理() {
			if (!$gameParty.inBattle() && $gameMap._mapId > 0) {
				if (コモン番号 > 0) {
					$gameTemp.reserveCommonEvent(コモン番号);
				}
			}
		}

		this._img.oncontextmenu = function() {
			return false;
		};
		this._img.addEventListener('mousedown', function(ev){
			ev.preventDefault();
		}, false);
		this._img.addEventListener('mouseup', function(ev){
			タッチ時処理();
		}, false);
		this._img.addEventListener('touchstart', function(ev){
			ev.preventDefault();
		}, false);
		this._img.addEventListener('touchend', function(ev){
			タッチ時処理();
		}, false);

		document.body.appendChild(this._img);
	}
}

const シーン開始関数 = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
	シーン開始関数.call(this);
	if (!表示状態) {
		表示状態 = true;
		this._portrait = new 肖像画();
	}
};

}());
