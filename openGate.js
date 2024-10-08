import * as THREE from 'three';
import { loadTanks } from './tanksImport.js';
import { gateMoveSoundUp, gateMoveSoundDown } from './sounds.js';

export function openGates12(gate1, gate2, playerTank, enemyTankB, enemyTankC ,tanks, scene) {
    
    const lerpConfig1 = { 
        destination: new THREE.Vector3(gate1.position.x,14,gate1.position.z),
        alpha: 0.01,
        move: true
    }
    if(lerpConfig1.move && !playerTank.slope1) {
        gate1.position.lerp(lerpConfig1.destination, lerpConfig1.alpha)
        gateMoveSoundUp.play();
    }
    
    if(gate1.position.y == lerpConfig1.destination.y) lerpConfig1.move = false

    // VERIFICANDO SE O PLAYERTANK JÁ PASSOU DO PORTÃO
    
    if(playerTank.object.position.x > -45 && !playerTank.slope1){
        const lerpConfig2 = { 
            destination: new THREE.Vector3(gate1.position.x,2,gate1.position.z),
            alpha: 0.07,
            move: true
        }
        if(lerpConfig2.move) {
            gate1.position.lerp(lerpConfig2.destination, lerpConfig2.alpha);
            gateMoveSoundDown.play();
        }
        if(gate1.position.y < 8){
            lerpConfig2.move = false
            playerTank.slope1 = true
        } 
    }

    // JA PASSOU DO PORTÃO 1, AGORA ABRE O 2
    const lerpConfig3 = { 
        destination: new THREE.Vector3(gate2.position.x,14,gate2.position.z),
        alpha: 0.01,
        move: true
    }
    if(lerpConfig3.move && !playerTank.slope2 && playerTank.object.position.x > -35) {
        gate2.position.lerp(lerpConfig3.destination, lerpConfig3.alpha)
        gateMoveSoundUp.play();
    }
    if(gate2.position.y == lerpConfig3.destination.y) lerpConfig3.move = false


    // FECHA O PORTÃO 2
    if(playerTank.object.position.x > 8 && !playerTank.slope2){
        const lerpConfig4 = { 
            destination: new THREE.Vector3(gate2.position.x,2,gate2.position.z),
            alpha: 0.07,
            move: true
        }
        if(lerpConfig4.move) {
            gate2.position.lerp(lerpConfig4.destination, lerpConfig4.alpha);
            gateMoveSoundDown.play();
        }
        if(gate2.position.y < 8){
            lerpConfig4.move = false
            playerTank.slope2 = true
        } 
    }
    gate1.collider.setFromObject(gate1)
    gate2.collider.setFromObject(gate1)
    
    // CARREGANDO TANQUES DO LEVEL 2
    if(playerTank.slope1 && !playerTank.level2load){
        tanks = tanks.filter(tank => tank.name !== "enemyTankA");
        loadTanks(tanks, scene, enemyTankB,'toonTank.glb', 6.5, new THREE.Vector3(84, 0, 12) , '#2151a6')
        loadTanks(tanks, scene, enemyTankC,'toonTank.glb', 6.5, new THREE.Vector3(84, 0, 52) , '#ad1919')
        playerTank.level2load = true
        playerTank.currentLevel = 2
    }
}


export function openGates34(gate1, gate2, playerTank, enemyTankD, enemyTankE, enemyTankF, tanks, scene) {
    const lerpConfig1 = { 
        destination: new THREE.Vector3(gate1.position.x,14,gate1.position.z),
        alpha: 0.01,
        move: true
    }
    if(lerpConfig1.move && !playerTank.slope3) {
        gate1.position.lerp(lerpConfig1.destination, lerpConfig1.alpha);
        gateMoveSoundUp.play();
    }
    if(gate1.position.y == lerpConfig1.destination.y) lerpConfig1.move = false

    // VERIFICANDO SE O PLAYERTANK JÁ PASSOU DO PORTÃO
    if(playerTank.object.position.x > 110 && !playerTank.slope3){
        const lerpConfig2 = { 
            destination: new THREE.Vector3(gate1.position.x,2,gate1.position.z),
            alpha: 0.07,
            move: true
        }
        if(lerpConfig2.move){ 
            gate1.position.lerp(lerpConfig2.destination, lerpConfig2.alpha)
            gateMoveSoundDown.play();
        }
        
        if(gate1.position.y < 8){
            lerpConfig2.move = false
            playerTank.slope3 = true
        } 
    }

    // JA PASSOU DO PORTÃO 1, AGORA ABRE O 2
    const lerpConfig3 = { 
        destination: new THREE.Vector3(gate2.position.x,14,gate2.position.z),
        alpha: 0.01,
        move: true
    }
    if(lerpConfig3.move && !playerTank.slope4 && playerTank.object.position.x > 110) {
        gate2.position.lerp(lerpConfig3.destination, lerpConfig3.alpha)
        gateMoveSoundUp.play();
    }
    if(gate2.position.y == lerpConfig3.destination.y) lerpConfig3.move = false


    // FECHA O PORTÃO 2
    if(playerTank.object.position.x > 180 && !playerTank.slope4){
        const lerpConfig4 = { 
            destination: new THREE.Vector3(gate2.position.x,2,gate2.position.z),
            alpha: 0.07,
            move: true
        }
        if(lerpConfig4.move){
            gate2.position.lerp(lerpConfig4.destination, lerpConfig4.alpha);
            gateMoveSoundDown.play();
        }
        if(gate2.position.y < 8){
            lerpConfig4.move = false
            playerTank.slope4 = true
            playerTank.currentLevel = 3
        } 
    }

    // CARREGANDO TANQUES DO LEVEL 3
    if(playerTank.slope3 && !playerTank.level3load){
        tanks = tanks.filter(tank => tank.name !== "enemyTankB");
        tanks = tanks.filter(tank => tank.name !== "enemyTankC");
        loadTanks(tanks, scene, enemyTankD, 'toonTank.glb', 6.5, new THREE.Vector3(192, 0, 4), '#e77326')
        loadTanks(tanks, scene, enemyTankE, 'toonTank.glb', 6.5, new THREE.Vector3(222, 0, 65), '#e7e937')
        loadTanks(tanks, scene, enemyTankF, 'toonTank.glb', 6.5, new THREE.Vector3(252, 0, 4), '#4ee6eb')
        playerTank.level3load = true
        playerTank.currentLevel = 3
    }

    gate1.collider.setFromObject(gate1)
    gate2.collider.setFromObject(gate1)
}

