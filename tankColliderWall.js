import * as THREE from 'three';


export function tankColliderWall(wallBlocks, tanks) {
   tanks.forEach(tank => {
       if (tank.object && tank.collider) {
           tank.collider.setFromObject(tank.object);
           tank.boxHelper.update();
           // Flag para indicar colisão
           let collided = false;
           // Verificação de colisão para cada parede
           wallBlocks.forEach(block => {
               if (block.collider && block.collider.min && block.collider.max && tank.collider.min && tank.collider.max) {
                   // Limites do bloco
                   const x_min = block.collider.min.x;
                   const x_max = block.collider.max.x;
                   const z_min = block.collider.min.z;
                   const z_max = block.collider.max.z;
                   // Calculando a sobreposição
                   let overlapX = Math.min(x_max - tank.collider.min.x, tank.collider.max.x - x_min);
                   let overlapZ = Math.min(z_max - tank.collider.min.z, tank.collider.max.z - z_min);
                   // Pequeno buffer para evitar ajustes contínuos
                   const buffer = 0.05;
                   // Determinando qual eixo tem a maior sobreposição
                   if (overlapX < overlapZ) {
                       // Colisão no eixo X
                       if (tank.collider.min.x < x_min && tank.collider.max.x > x_min) {
                           tank.object.position.x -= overlapX + buffer;
                           collided = true;
                       } else if (tank.collider.max.x > x_max && tank.collider.min.x < x_max) {
                           tank.object.position.x += overlapX + buffer;
                           collided = true;
                       }
                   } else {
                       // Colisão no eixo Z
                       if (tank.collider.min.z < z_min && tank.collider.max.z > z_min) {
                           tank.object.position.z -= overlapZ + buffer;
                           collided = true;
                       } else if (tank.collider.max.z > z_max && tank.collider.min.z < z_max) {
                           tank.object.position.z += overlapZ + buffer;
                           collided = true;
                       }
                   }
                   if (collided) {
                       tank.collider.setFromObject(tank.object);
                       tank.boxHelper.update();
                   }
               }
           });
           // Armazena a posição anterior do tanque para cálculo de direção
           tank.prevPosition = tank.object.position.clone();
       }
   });
}

export function tankColliderMovingWalls(wallBlocks, tanks) {
    tanks.forEach(tank => {
        if (tank.object && tank.collider) {
            tank.collider.setFromObject(tank.object);
            tank.boxHelper.update();
            // Flag para indicar colisão
            let collided = false;
            // Verificação de colisão para cada parede
            wallBlocks.forEach(block => {
                if (block.collider && block.collider.min && block.collider.max && tank.collider.min && tank.collider.max) {
                    // Limites do bloco
                    const x_min = block.collider.min.x;
                    const x_max = block.collider.max.x;
                    const z_min = block.collider.min.z;
                    const z_max = block.collider.max.z;
                    // Calculando a sobreposição
                    let overlapX = Math.min(x_max - tank.collider.min.x, tank.collider.max.x - x_min);
                    let overlapZ = Math.min(z_max - tank.collider.min.z, tank.collider.max.z - z_min);
                    // Pequeno buffer para evitar ajustes contínuos
                    const buffer = 0.05;
                    // Determinando qual eixo tem a maior sobreposição
                    if (overlapX < overlapZ) {
                        // Colisão no eixo X
                        if (tank.collider.min.x < x_min && tank.collider.max.x > x_min) {
                            tank.object.position.x -= overlapX + buffer;
                            collided = true;
                        } else if (tank.collider.max.x > x_max && tank.collider.min.x < x_max) {
                            tank.object.position.x += overlapX + buffer;
                            collided = true;
                        }
                    } else {
                        // Colisão no eixo Z
                        if (tank.collider.min.z < z_min && tank.collider.max.z > z_min) {
                            tank.object.position.z -= overlapZ + buffer;
                            collided = true;
                        } else if (tank.collider.max.z > z_max && tank.collider.min.z < z_max) {
                            tank.object.position.z += overlapZ + buffer;
                            collided = true;
                        }
                    }
                    if (collided) {
                        tank.collider.setFromObject(tank.object);
                        tank.boxHelper.update();
                    }
                }
            });
            // Armazena a posição anterior do tanque para cálculo de direção
            tank.prevPosition = tank.object.position.clone();
        }
    });
 }
 



export function tankColliderGate(gates, tanks) {
    tanks.forEach(tank => {
        if (tank.object && tank.collider) {
            tank.collider.setFromObject(tank.object);
            tank.boxHelper.update();
            // Flag para indicar colisão
            let collided = false;
            // Verificação de colisão para cada parede
            gates.forEach(gate => {
                if (gate.collider && gate.collider.min && gate.collider.max && tank.collider.min && tank.collider.max) {
                    // Limites do bloco
                    
                    const x_min = gate.collider.min.x;
                    const x_max = gate.collider.max.x;
                    const z_min = gate.collider.min.z;
                    const z_max = gate.collider.max.z;
                    // Calculando a sobreposição
                    let overlapX = Math.min(x_max - tank.collider.min.x, tank.collider.max.x - x_min);
                    let overlapZ = Math.min(z_max - tank.collider.min.z, tank.collider.max.z - z_min);
                    // Pequeno buffer para evitar ajustes contínuos
                    const buffer = 0.05;
                    // Determinando qual eixo tem a maior sobreposição
                    if (overlapX < overlapZ) {
                        // Colisão no eixo X
                        if (tank.collider.min.x < x_min && tank.collider.max.x > x_min) {
                            tank.object.position.x -= overlapX + buffer;
                            collided = true;
                        } else if (tank.collider.max.x > x_max && tank.collider.min.x < x_max) {
                            tank.object.position.x += overlapX + buffer;
                            collided = true;
                        }
                    } else {
                        // Colisão no eixo Z
                        if (tank.collider.min.z < z_min && tank.collider.max.z > z_min) {
                            tank.object.position.z -= overlapZ + buffer;
                            collided = true;
                        } else if (tank.collider.max.z > z_max && tank.collider.min.z < z_max) {
                            tank.object.position.z += overlapZ + buffer;
                            collided = true;
                        }
                    }
                    if (collided) {
                        tank.collider.setFromObject(tank.object);
                        tank.boxHelper.update();
                    }
                }
            });
            // Armazena a posição anterior do tanque para cálculo de direção
            tank.prevPosition = tank.object.position.clone();
        }
    });
 }
