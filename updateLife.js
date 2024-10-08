import * as THREE from  'three';
import { playPlayerHitSound, playEnemyHitSound } from './sounds.js';

// Função para atualizar a barra de vida
export function updateLifePlayerTank(playerTank, projectilesArray, scene) {
    // Pra cada projétil
    projectilesArray.forEach(projectile => {
        // Se estiver ativo
        if (projectile.active) {
            if (projectile.collider.intersectsBox(playerTank.collider) && (playerTank.name != projectile.name)) {
                if(!playerTank.godMode) playerTank.life -= 1
                projectile.active = false
                scene.remove(projectile.object)
                playPlayerHitSound()
            }
        }

    })
}

export function updateLifeEnemysTank(tanks, projectilesArray, scene, playerTank){
    // Pra cada projétil
    projectilesArray.forEach(projectile => {
        tanks.forEach(tank =>{
            if(projectile.active && tank.name != 'playerTank' && projectile.name == 'playerTank'){
                if (tank.object && projectile.collider.intersectsBox(tank.collider)){
                    scene.remove(projectile.object)
                    projectile.active = false
                    projectilesArray = projectilesArray.filter(shoot => shoot.active);
                    if(playerTank.powerUpHit) tank.life -= 2
                    else tank.life -= 1
                    playEnemyHitSound()
                }
            }
        })
        if(projectile.active && projectile.name == 'cannon'){
            tanks.forEach(tank => {
                if (tank.object && projectile.collider.intersectsBox(tank.collider) && tank.name != "playerTank"){
                    scene.remove(projectile.object)
                    projectile.active = false
                    projectilesArray = projectilesArray.filter(shoot => shoot.active);
                    tank.life -= 1
                    playEnemyHitSound()
                }

            })
        }
    })
}


export function verifyShootInCannon(cannon, projectilesArray,scene){
    // Pra cada projétil
    projectilesArray.forEach(projectile => {
        if (projectile.active) {
            if (projectile.collider.intersectsBox(cannon.collider) && (projectile.name != 'cannon')) {
                projectile.active = false
                projectilesArray = projectilesArray.filter(shoot => shoot.active !== false);
                scene.remove(projectile.object)
            }
        }
    })
}