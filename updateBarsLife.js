import * as THREE from 'three';

export function updateBarsLifePlayerTank(PlayerTank, healthPlayer, initialLife) {
    if (PlayerTank.object) {
        const percentageLife = (PlayerTank.life / initialLife) * 100
        healthPlayer.style.width = percentageLife + '%'
        if (PlayerTank <= 0) healthPlayer.style.width = 0 + '%'
    } 
}

export function updateBarsLifeEnemyTankA(enemyTankA, healthEnemyTankA, initialLife) {
    if (enemyTankA.object) {
        const percentageLife = (enemyTankA.life / initialLife) * 100
        healthEnemyTankA.style.width = percentageLife + '%'
        if (enemyTankA <= 0) healthEnemyTankA.style.width = 0 + '%'
    } 
    else{
        healthEnemyTankA.style.width = 0 + '%'
    }
}

export function updateBarsLifeEnemyTankB(enemyTankB, healthEnemyTankB, initialLife) {
    if (enemyTankB.object) {
        const percentageLife = (enemyTankB.life / initialLife) * 100;
        healthEnemyTankB.style.width = percentageLife + '%';
        if (enemyTankB <= 0) healthEnemyTankB.style.width = 0 + '%'
    } 
    else{
        healthEnemyTankB.style.width = 0 + '%'
    }
}

export function updateBarsLifeEnemyTankC(enemyTankC, healthEnemyTankC, initialLife) {
    if (enemyTankC.object) {
        const percentageLife = (enemyTankC.life / initialLife) * 100;
        healthEnemyTankC.style.width = percentageLife + '%';
        if (enemyTankC <= 0) healthEnemyTankC.style.width = 0 + '%'
    } 
    else{
        healthEnemyTankC.style.width = 0 + '%'
    }
}

export function updateBarsLifeEnemyTankD(enemyTankD, healthEnemyTankD, initialLife) {
    if (enemyTankD.object) {
        const percentageLife = (enemyTankD.life / initialLife) * 100;
        healthEnemyTankD.style.width = percentageLife + '%';
        if (enemyTankD <= 0) healthEnemyTankD.style.width = 0 + '%'
    } 
    else{
        healthEnemyTankD.style.width = 0 + '%'
    }
}

export function updateBarsLifeEnemyTankE(enemyTankE, healthEnemyTankE, initialLife) {
    if (enemyTankE.object) {
        const percentageLife = (enemyTankE.life / initialLife) * 100;
        healthEnemyTankE.style.width = percentageLife + '%';
        if (enemyTankE <= 0) healthEnemyTankE.style.width = 0 + '%'
    } 
    else{
        healthEnemyTankE.style.width = 0 + '%'
    }
}

export function updateBarsLifeEnemyTankF(enemyTankF, healthEnemyTankF, initialLife) {
    if (enemyTankF.object) {
        const percentageLife = (enemyTankF.life / initialLife) * 100;
        healthEnemyTankF.style.width = percentageLife + '%';
        if (enemyTankF <= 0) healthEnemyTankF.style.width = 0 + '%'
    } 
    else{
        healthEnemyTankF.style.width = 0 + '%'
    }
}

