/*:
 * @target MV
 * @plugindesc ステートグループ（防具スキル）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMV-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_StateGroup.js

ステートグループ（防具スキル）

## 権利表記

(c) 2023 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMV-Plugin/blob/master/LICENSE

## 機能概要

アクターが装備している
防具に設定されたグループ＆取得ポイントの組合せを合算し、
対応するステートのグループの発動ポイント以上の取得ポイントを持つ
ステートを付与します。

## 使い方

### 防具側

メモ欄に以下のように記述します。
<TagPoint:{"グループA":4, "グループC":3}>

TagPoint: 任意のタグ名です。
グループA 任意のグループ名です。
4 取得ポイント（任意の値）です。

{"グループ名":99} ひとつのグループの書式です。
{"グループ名":99, "グループ名":99} 複数の場合はカンマ区切りです。

詳しくは json の書式を確認してください。

### ステート側

メモ欄に以下のように記述します。
<TagState:{"グループB":8}>

TagState: 任意のタグ名です。
グループB 任意のグループ名です。
8 発動ポイント（任意の値）です。

{"グループ名":99} ひとつのグループの書式です。
ひとつのステートにひとつのグループのみ設定可能です。

詳しくは json の書式を確認してください。

## プラグインコマンド

### addAllStateGroupParty

プラグインコマンド欄に以下のように記述します。
addAllStateGroupParty TagPoint TagState

TagPoint 防具側に記述した任意のタグです。
TagState ステート側に記述した任意のタグです。

## 更新履歴

- ver.0.0.1 (2023/10/06) 作成開始
- ver.0.1.0 (2023/10/07) 関数版完成
- ver.1.0.0 (2023/10/07) 公開
- ver.1.1.0 (2023/10/07) 発動ポイント最大のステート付与に修正

 * 
 * 
 */

(() => {

"use strict";

const TAG_POINT = "TagPoint";
const TAG_STATE = "TagState";

//--------------------------------------
// プラグインコマンド

const KRD_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	KRD_Game_Interpreter_pluginCommand.apply(this, arguments);
	switch(command) {
		case "addAllStateGroupParty":
			$gameParty.addAllStateGroup(args[0], args[1]);
			break;
	}
};

//--------------------------------------

Game_Actor.prototype.armorPointList = function(tag = TAG_POINT) {
	return this.armors().filter(armor => armor.meta[tag]).map(armor => JSON.parse(armor.meta[tag]));
};

Game_Actor.prototype.armorStateList = function(armorPointList) {
	const set = new Set();
	let list = [];
	armorPointList.forEach(armorPoint => list = list.concat(Object.keys(armorPoint)));
	list.forEach(data => set.add(data));
	return set;
};

Game_Actor.prototype.armorPoint = function(groupName, armorPointList) {
	return armorPointList.reduce((r, point) => r + (point[groupName] || 0), 0);
};

Game_Temp.prototype.stateGroupData = function(tag = TAG_STATE) {
	return $dataStates.filter(state => state && state.meta[tag]).map(state => state && {"id":state.id, "tag":JSON.parse(state.meta[tag])});
};

Game_Actor.prototype.addAllStateGroup = function(tagPoint = TAG_POINT, tagState = TAG_STATE) {
	const armorPointList = this.armorPointList(tagPoint);
	const armorStateList = this.armorStateList(armorPointList);
	const stateGroupData = $gameTemp.stateGroupData(tagState);

	armorStateList.forEach(groupName => {
		const armorPoint = this.armorPoint(groupName, armorPointList);
		this.addStateGroup(groupName, armorPoint, stateGroupData);
	}, this);
};

Game_Actor.prototype.addStateGroup = function(groupName, armorPoint, stateGroupData) {
	const filtered = stateGroupData.filter(data => data.tag[groupName] <= armorPoint);
	filtered.sort((a, b) => b.tag[groupName] - a.tag[groupName]);
	if (filtered.length > 0) {
		this.addState(filtered[0].id);
	}
};

Game_Party.prototype.addAllStateGroup = function(tagPoint = TAG_POINT, tagState = TAG_STATE) {
	this.members().forEach(actor => actor.addAllStateGroup(tagPoint, tagState));
};

//--------------------------------------
})();
