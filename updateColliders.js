import * as THREE from 'three';

// ATUALIZA COLISORES
export function updateColliders(tanks, walls, gates, projectilesArray) {

    // Para cada tanque, atualiza colisor
    walls.forEach(wall => {
        wall.collider.setFromObject(wall)
    })

    // Para cada projétil, atualiza colisor
    projectilesArray.forEach(projectile => {
        projectile.collider.setFromObject(projectile.object)
    })
}