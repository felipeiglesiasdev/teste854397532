import * as THREE from 'three';
import { initAudio, playShotSound, toggleSound } from './sounds.js';

import { updateProjectile, shoot } from './projectile.js';
import { Projectile } from './projectile.js';

let clock = new THREE.Clock();

export function keyboardUpdate(keyboard, playerTank, scene, projectilesArray, healthPlayer, initialLife, orbit) {

    // Atualiza estado do teclado
    keyboard.update();

    var speed = 6;
    var moveDistance = speed * clock.getDelta();

    // Rotação do tanque
    if (keyboard.pressed("left") || keyboard.pressed("A")) {
        playerTank.object.rotateY(moveDistance);
        playerTank.collider.setFromObject(playerTank.object);
        playerTank.boxHelper.update(); 

    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        playerTank.object.rotateY(-moveDistance);
        playerTank.collider.setFromObject(playerTank.object);
        playerTank.boxHelper.update();
    }

    // Translação do tanque
    if (keyboard.pressed("up") || keyboard.pressed("W")) {
        playerTank.object.translateZ(2 * moveDistance);        
        playerTank.collider.setFromObject(playerTank.object);
        playerTank.boxHelper.update();
    }
    if (keyboard.pressed("down") || keyboard.pressed("S")) {
        playerTank.object.translateZ(-2 * moveDistance);
        playerTank.collider.setFromObject(playerTank.object);
        playerTank.boxHelper.update();
    }
    if (keyboard.down("P")) {
        toggleSound()
    }
    if (keyboard.pressed("O")) {
        if(playerTank.cameraOn){
            playerTank.cameraOn = false
            orbit.enablePan = true
            orbit.enableRotate = true
            orbit.target = null
        }
        else{
            playerTank.cameraOn = true
            orbit.enablePan = false
            orbit.enableRotate = false
        }
    }



    // Disparo de projéteis
    if (keyboard.down("space")) {
        shoot(playerTank, projectilesArray, scene);
        playShotSound()
        let tankPosition = new THREE.Vector3();
        playerTank.object.getWorldPosition(tankPosition);

    }

    if (keyboard.down("G")){
        if(playerTank.godMode) desactiveGodMode(playerTank, healthPlayer)
        else activeGodMode(playerTank, healthPlayer, initialLife)
    }

}

function activeGodMode(playerTank, healthPlayer, initialLife){
    if(playerTank.object){
        playerTank.godMode = true
        healthPlayer.style.width = '100%'
        playerTank.life = initialLife
        healthPlayer.innerHTML = '<span style="color: red; font-weight: bold; display: block; text-align: center;">VIDA INFINITA</span>';
    }
}

function desactiveGodMode(playerTank, healthPlayer){
    playerTank.godMode = false
    healthPlayer.innerHTML = ''
}