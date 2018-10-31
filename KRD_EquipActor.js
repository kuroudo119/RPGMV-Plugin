//================================================
// KRD_EquipActor.js
//
// Copyright (c) 2018 KRD_DATA (くろうど)
// This plugin is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//================================================

/*:
 * @plugindesc Add actor image on equip window.
 * @author KRD_DATA (くろうど)
 *
 * @param PositionX
 * @desc Input X.
 * Default: 205
 * @default 205
 * 
 * @param PositionY
 * @desc Input Y.
 * Default: 50
 * @default 50
 * 
 * @param UseFace
 * @desc Input true to use face image. Please change X=150, Y=0
 * Default: false
 * @default false
 * 
 */

(function() {

'use strict';

var parameters = PluginManager.parameters('KRD_EquipActor');
var x = Number(parameters['PositionX']);
var y = Number(parameters['PositionY']);
var useFace = parameters['UseFace'] === 'true';

//================================================

var KRD_Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
Window_EquipStatus.prototype.refresh = function() {
    KRD_Window_EquipStatus_refresh.call(this);
    if (this._actor) {
        if (useFace) {
            this.drawActorFace(this._actor, x, y, 144, 36);
        } else {
            this.drawActorCharacter(this._actor, x, y);
        }
    }
};

//================================================
})();
