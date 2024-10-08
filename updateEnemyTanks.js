import * as THREE from  'three';
import { shoot } from './projectile.js';
import { tankColliderWall } from './tankColliderWall.js';
import { playShotSound } from './sounds.js';


export function updateEnemyTanks(enemyTanks, playerTank, projectilesArray, scene, wallBlocks) {
    const safeDistance = 15;  // Distância de segurança para fuga
    const obstacleAvoidanceDistance = 10;  // Distância para evitar obstáculos
    const time = Date.now();

    enemyTanks.forEach(enemy => {
        if (enemy.active && enemy.object && enemy !== playerTank) {
            const distanceToPlayer = enemy.object.position.distanceTo(playerTank.object.position);
            //------------------------------------------------------------------

            if (distanceToPlayer > safeDistance) {
            // Definindo o próximo waypoint do tanque inimigo
            const waypoints = enemy.waypoints; // Usando os waypoints específicos do tanque
            let currentWaypoint = enemy.currentWaypoint || 0; // Índice do waypoint atual
 
            // Verificanfo se há waypoints definidos
            if (waypoints.length > 0) {
                const nextPoint = waypoints[currentWaypoint];
                const direction = new THREE.Vector3().subVectors(nextPoint, enemy.object.position).normalize();
                
                // Olhando para o próximo ponto
                enemy.object.lookAt(nextPoint)

                // Movendo o tanque inimigo em direção ao próximo waypoint
                enemy.object.position.add(direction.multiplyScalar(enemy.speed));
                enemy.collider.setFromObject(enemy.object);
 
                // Verificando se o tanque chegou ao próximo waypoint
                if (enemy.object.position.distanceTo(nextPoint) < 1) {
                    currentWaypoint = (currentWaypoint + 1) % waypoints.length; // Atualizar para o próximo waypoint
                    enemy.currentWaypoint = currentWaypoint; // Salvar o índice do waypoint atual
                }
             }
            }
            //------------------------------------------------------------------
            // 1. Movimento de Fuga: O tanque tenta manter distância do jogador
            if (distanceToPlayer < safeDistance) {
                const escapeDirection = new THREE.Vector3().subVectors(enemy.object.position, playerTank.object.position).normalize();
                const newPosition = enemy.object.position.clone().add(escapeDirection.multiplyScalar(enemy.speed));

                // 2. Evitar Obstáculos: Usar Raycasting para detectar colisões
                const raycaster = new THREE.Raycaster(enemy.object.position, escapeDirection);
                const intersections = raycaster.intersectObjects(wallBlocks);

                if (intersections.length > 0 && intersections[0].distance < obstacleAvoidanceDistance) {
                    // Se houver uma colisão iminente com um obstáculo, mudar a direção
                    const avoidDirection = new THREE.Vector3(escapeDirection.z, 0, -escapeDirection.x); // Girar 90 graus
                    enemy.object.position.add(avoidDirection.multiplyScalar(enemy.speed));
                } else {
                    // Se não houver colisão, continuar com o movimento de fuga
                    enemy.object.position.copy(newPosition);
                }

                enemy.collider.setFromObject(enemy.object);
            }

            // 3. Verificar se o tanque está encurralado (distância muito pequena e sem espaço para fugir)
            if (distanceToPlayer < safeDistance / 2 && intersections.length > 0) {
                // Se estiver encurralado, mudar para movimento em zig-zag
                const angleOffset = Math.sin(time * 0.01) * Math.PI / 4;  // Amplitude e frequência para zig-zag
                const zigZagDirection = escapeDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleOffset).normalize();
                enemy.object.position.add(zigZagDirection.multiplyScalar(enemy.speed));
                enemy.collider.setFromObject(enemy.object);
            }

            // 4. Colisões com paredes
            //tankColliderWall(wallBlocks, [enemy]);

            // 5. O inimigo atira no jogador se estiver ativo

            let shootingDistance = 30
            if (distanceToPlayer < shootingDistance) {
                const timeNow = Date.now();

                

                if (timeNow - enemy.lastShotTime > enemy.shootCooldown) {
                    // Calcular a direção para o jogador
                    const direction = new THREE.Vector3();
                    direction.subVectors(playerTank.object.position, enemy.object.position).normalize();
            
                    // Calcular a rotação desejada usando lookAt
                    const targetPosition = enemy.object.position.clone().add(direction);
                    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
            
                    // Interpolar suavemente entre a rotação atual e a rotação desejada
                    enemy.object.quaternion.slerp(targetQuaternion, 1); // 0.1 controla a suavidade
                    

                    // Verificar linha de visão
                    const ray = new THREE.Raycaster(enemy.object.position, playerTank.object.position.clone().sub(enemy.object.position).normalize());
                    const intersections = ray.intersectObjects(wallBlocks);
                
                    if (intersections.length === 0) {
                        // Se não houver obstáculos, atira diretamente no jogador
                        shoot(enemy, projectilesArray, scene);
                        playShotSound()
                    } 

                    enemy.lastShotTime = timeNow;
                }
            }
            
            }
});
}