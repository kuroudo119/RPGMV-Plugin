// KRD_RandomTile.js
//
// Copyright (c) 2020 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Random Map (Tile).
 * @author KRD_DATA (くろうど)
 *
 */

(function() {

'use strict';

var vBase  = 11;
var vCount = 12;

var beforeId = 1;
var beforeTag = 0;
var swPlaying = 1;

var tileSetIndex = 'C';

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
            $gameSystem._myMapData = $dataMap.data;
            break;
        case 'KRD_SetRegionAll':
            $gameMap.setRegionIdAll();
            $gameSystem._myMapData = $dataMap.data;
            break;
        case 'KRD_ClearRegion':
            $gameSystem._myMapData = null;
            break;
        }
};

//------------------------------------------------
// Region ID

var KRD_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    KRD_Game_Map_initialize.call(this);
    $gameSystem._myMapData = $gameSystem._myMapData || null;
};

Game_Map.prototype.setRegionId = function(x, y, z = 5, id = 0) {
    var width = $dataMap.width;
    var height = $dataMap.height;
    $dataMap.data[(z * height + y) * width + x] = id;
};

var KRD_Game_Map_data = Game_Map.prototype.data;
Game_Map.prototype.data = function() {
    if ($gameSystem._myMapData == null){
        $gameSystem._myMapData = $dataMap.data;
    } else {
        $dataMap.data = $gameSystem._myMapData;
    }
    return KRD_Game_Map_data.call(this);
};

Game_Map.prototype.setRegionIdAll = function() {
    var width = $dataMap.width;
    var height = $dataMap.height;
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            if (this.checkTile(i, j)) {
                this.setRegionId(i, j, 5, this.randomTile());
            }
        }
    }
};

Game_Map.prototype.checkTile = function(x, y) {
    if (beforeId > 0) {
        return this.regionId(x, y) === beforeId;
    } else if (beforeTag > 0) {
        return this.terrainTag(x, y) === beforeTag;
    } else {
        return false;
    }
};

Game_Map.prototype.randomTile = function() {
    return Math.randomInt($gameVariables.value(vCount)) + $gameVariables.value(vBase);
};

//------------------------------------------------
// Tile Image

Tilemap.prototype.changeTileId = function(tileId, dx, dy) {
    if ($gameSwitches.value(swPlaying)) {
        var x = Math.ceil(dx / this._tileWidth) - 1;
        var y = Math.ceil(dy / this._tileHeight) - 1;
        var region = $gameMap.regionId(x, y);
        var tileSet = {B:0, C:256, D:256 * 2, E:256 * 3};
        var change = region >= $gameVariables.value(vBase) ? tileSet[tileSetIndex] + region : tileId;
        return change;
    } else {
        return tileId;
    }
};

Tilemap.prototype._drawTile = function(bitmap, tileId, dx, dy) {
    if (Tilemap.isVisibleTile(tileId)) {
        if (Tilemap.isAutotile(tileId)) {
            this._drawAutotile(bitmap, tileId, dx, dy);
        } else {
            var tileId = this.changeTileId(tileId, dx, dy);
            this._drawNormalTile(bitmap, tileId, dx, dy);
        }
    }
};

ShaderTilemap.prototype._drawTile = function(layer, tileId, dx, dy) {
    if (Tilemap.isVisibleTile(tileId)) {
        if (Tilemap.isAutotile(tileId)) {
            this._drawAutotile(layer, tileId, dx, dy);
        } else {
            var tileId = this.changeTileId(tileId, dx, dy);
            this._drawNormalTile(layer, tileId, dx, dy);
        }
    }
};

//------------------------------------------------
// Transfer by Force Reload

Game_Player.prototype.performTransfer = function() {
    if (this.isTransferring()) {
        this.setDirection(this._newDirection);

        $gameMap.setup(this._newMapId);
        this._needsMapReload = false;

        this.locate(this._newX, this._newY);
        this.refresh();
        if (DataManager.autoSaveGame) {
            DataManager.autoSaveGame();
        }
        this.clearTransferInfo();
    }
};

//------------------------------------------------
}());
