import * as THREE from 'three';
import { CSG } from '../libs/other/CSGMesh.js';
import { Vector3 } from '../build/three.module.js';
import { shootCannon } from './projectile.js';

export function centralCannon() {

    // Parâmetros gerais
    const radius = 0.7; // Raio externo das rodas
    const wheelThickness = 0.2; // Espessura das rodas (fina)
    const hubRadius = 0.5; // Raio interno das rodas (para criar os aros)
    const distanceBetweenWheels = 0.7; // Distância entre as duas rodas
    const plankWidth = 0.1; // Largura das tábuas
    const plankThickness = 0.05; // Espessura das tábuas
    const plankLength = radius * 1.5; // Comprimento das tábuas
    const supportPlankLength = distanceBetweenWheels * 2; // Comprimento das tábuas de suporte
    

    // Material para as rodas e tábuas
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.5, metalness: 0.6 }); 
    const plankMaterial = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.5, metalness: 0.6 }); 
    const cannonMaterial = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.5, metalness: 0.6}); 
    // Criar um grupo para unir todos os elementos
    const fullGroup = new THREE.Group();

    // Criar a primeira roda
    const outerCylinder1 = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, wheelThickness, 32),
        wheelMaterial
    );
    outerCylinder1.castShadow = true;

    const innerCylinder1 = new THREE.Mesh(
        new THREE.CylinderGeometry(hubRadius, hubRadius, wheelThickness + 0.01, 32),
        wheelMaterial
    );
    innerCylinder1.castShadow = true;

    const wheel1CSG = CSG.fromMesh(outerCylinder1);
    const hub1CSG = CSG.fromMesh(innerCylinder1);

    const wheel1WithHub = wheel1CSG.subtract(hub1CSG);
    const wheel1 = CSG.toMesh(wheel1WithHub, outerCylinder1.matrix, wheelMaterial);
    wheel1.castShadow = true;

    // Rotacionar a primeira roda para que fique alinhada ao plano (chão)
    wheel1.rotation.x = Math.PI / 2;

    // Posicionar a primeira roda
    wheel1.position.set(0, 1, distanceBetweenWheels);
    fullGroup.add(wheel1);

    // Criar a segunda roda (uma cópia da primeira)
    const wheel2 = wheel1.clone();
    wheel2.position.set(0, 1, -distanceBetweenWheels);
    wheel2.castShadow = true;
    fullGroup.add(wheel2);

    // Criar as tábuas para os aros das rodas
    let middlePlank1, middlePlank2;
    for (let i = 0; i < 8; i++) {
        const plank = new THREE.Mesh(
            new THREE.BoxGeometry(plankLength, plankThickness, plankWidth),
            plankMaterial
        );
        plank.castShadow = true;
        const angle = (i * Math.PI) / 4; 
        plank.position.set(0, 1, distanceBetweenWheels); 
        plank.rotation.z = angle; 
        fullGroup.add(plank);

        // Criar a mesma tábua para a segunda roda
        const plank2 = plank.clone();
        plank2.position.set(0, 1, -distanceBetweenWheels);
        plank2.castShadow = true;
        fullGroup.add(plank2);

        // Identificar as tábuas que estão rotacionadas a 180 graus (meio do aro)
        if (i === 4) {
            middlePlank1 = plank;
            middlePlank2 = plank2;
        }
    }

    // Criar as tábuas de suporte entre as rodas
    const supportPlank1 = new THREE.Mesh(
        new THREE.BoxGeometry(supportPlankLength, plankThickness, plankWidth),
        plankMaterial
    );
    supportPlank1.castShadow = true;

    // Posicionar e rotacionar a primeira tábua de suporte
    supportPlank1.position.set(0, 1, 0);
    supportPlank1.rotation.y = Math.PI / 2;
    supportPlank1.position.x = 2 * radius / 3;
    fullGroup.add(supportPlank1);

    // Criar a segunda tábua de suporte, uma cópia da primeira
    const supportPlank2 = supportPlank1.clone();
    supportPlank2.position.x = -2 * radius / 3;
    supportPlank2.castShadow = true;
    fullGroup.add(supportPlank2);

    // Criar a base laranja e adicionar ao cenário
    const baseGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.6, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.2, metalness: 0.7 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;

    // Adicionar a base ao centro do grupo
    base.position.set(0, 0, 0);
    fullGroup.add(base);

    // Criar um grupo para o canhão
    const cannonGroup = new THREE.Group();

    // Corpo do canhão
    const cannonBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 2.7, 32),
        cannonMaterial
    );
    cannonBody.position.set(0, 0, 0);
    cannonBody.castShadow = true;
    cannonBody.rotation.z = Math.PI/2;
    cannonGroup.add(cannonBody);

    // Adicionar o furo no canhão
    const cannonHole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 2.7, 32),
        cannonMaterial
    );
    cannonHole.rotation.x = Math.PI / 2;
    cannonHole.position.set(0, 0, 0);
    cannonGroup.add(cannonHole);

    // Base do canhão (cilindro mais largo)
    const cannonBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.5, 32),
        cannonMaterial
    );
    cannonBase.rotation.z = Math.PI / 2;
    cannonBase.position.set(-1.25, 0, 0);
    cannonBase.castShadow = true;
    cannonGroup.add(cannonBase);

    // Esfera decorativa na parte de trás do canhão
    const cannonBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 32, 32),
        cannonMaterial
    );
    cannonBall.position.set(-1.45, 0, 0);
    cannonBall.castShadow = true;
    cannonGroup.add(cannonBall);

    // Subtrair o furo do corpo do canhão
    const cannonCSG = CSG.fromMesh(cannonBody);
    const holeCSG = CSG.fromMesh(cannonHole);
    const cannonWithHoleCSG = cannonCSG.subtract(holeCSG);
    const cannonWithHole = CSG.toMesh(cannonWithHoleCSG, cannonBody.matrix, cannonMaterial);
    cannonWithHole.castShadow = true;
    cannonWithHole.rotation.z = -Math.PI /2;

    // Remover o corpo original e adicionar o com o furo
    cannonGroup.remove(cannonBody);
    cannonGroup.remove(cannonHole);
    cannonGroup.add(cannonWithHole);

    // Posicionar o canhão sobre as tábuas de suporte
    cannonGroup.position.set(0.6, 1.4, 0);

    // Escalar o canhão para aumentar o tamanho
    cannonGroup.scale.set(1.2, 1.2, 1.2);

    // Adicionar o grupo do canhão ao grupo principal
    fullGroup.add(cannonGroup);
    
    // Mudando escala de tudo
    fullGroup.scale.set(1.6,1.6,1.6)

    //let collider = new THREE.Box3().setFromObject(fullGroup);
    //fullGroup.collider = collider
    //let boxHelper = new THREE.BoxHelper(fullGroup, 0xffff00)
    //fullGroup.bbHelper = boxHelper
    const name = "cannon"
    fullGroup.name = name

    // Retorna o canhão completo
    return fullGroup
}




export function rotateCannon(cannon, playerTank, enemyTankA, enemyTankB) {
    if (playerTank.object &&  playerTank.currentLevel == 2 && enemyTankA.object && enemyTankB.object) {

        // Função para calcular a distância entre o canhão e um tanque
        function calculateDistance(tankPos) {
            const dx = tankPos.x - cannon.position.x;
            const dz = tankPos.z - cannon.position.z;
            return Math.sqrt(dx * dx + dz * dz);
        }

        // Obtendo as distâncias dos tanques ao canhão
        let distancePlayerTank = calculateDistance(playerTank.object.position);
        let distanceEnemyTankA = calculateDistance(enemyTankA.object.position);
        let distanceEnemyTankB = calculateDistance(enemyTankB.object.position);

        // Determinando o tanque mais próximo
        let closestTank = playerTank;
        let closestDistance = distancePlayerTank;

        if (distanceEnemyTankA < closestDistance) {
            closestTank = enemyTankA;
            closestDistance = distanceEnemyTankA;
        }

        if (distanceEnemyTankB < closestDistance) {
            closestTank = enemyTankB;
            closestDistance = distanceEnemyTankB;
        }

        // Calculando a direção para o tanque mais próximo
        const direction = new THREE.Vector3();
        direction.subVectors(closestTank.object.position, cannon.position).normalize();

        // Ajustando o eixo de referência
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction);

        
        const smoothingFactor = 0.1; // Ajuste para controlar a suavidade
        cannon.quaternion.slerp(targetQuaternion, smoothingFactor);
    }

if (playerTank.object &&  playerTank.currentLevel == 2 && !enemyTankA.object && !enemyTankB.object) {

    // Função para calcular a distância entre o canhão e um tanque
    function calculateDistance(tankPos) {
        const dx = tankPos.x - cannon.position.x;
        const dz = tankPos.z - cannon.position.z;
        return Math.sqrt(dx * dx + dz * dz);
    }

    // Obtendo as distâncias dos tanques ao canhão
    let distancePlayerTank = calculateDistance(playerTank.object.position);
    

    // Determinando o tanque mais próximo
    let closestTank = playerTank;
    let closestDistance = distancePlayerTank;


    // Calculando a direção para o tanque mais próximo
    const direction = new THREE.Vector3();
    direction.subVectors(closestTank.object.position, cannon.position).normalize();

    // Ajustando o eixo de referência
    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction);

    
    const smoothingFactor = 0.1; // Ajuste para controlar a suavidade
    cannon.quaternion.slerp(targetQuaternion, smoothingFactor);
    }
}

export function tankColliderCannon(cannon, tanks) {

    tanks.forEach(tank => {
        if (tank.object && cannon.collider.intersectsBox(tank.collider)) {
            // Limites do bloco
            tank.collider.setFromObject(tank.object);
            let x_min = cannon.collider.min.x;
            let x_max = cannon.collider.max.x;
            let z_min = cannon.collider.min.z;
            let z_max = cannon.collider.max.z;

            // Ajusta a posição do tanque com base na direção do movimento
            let overlapX = Math.min(x_max - tank.collider.min.x, tank.collider.max.x - x_min);
            let overlapZ = Math.min(z_max - tank.collider.min.z, tank.collider.max.z - z_min);

            if (overlapX < overlapZ) {
                if (tank.object.position.x > x_max) {
                    tank.object.position.x += overlapX + 0.1; // Ajuste mai suave
                } else if (tank.object.position.x < x_min) {
                    tank.object.position.x -= overlapX + 0.1;
                }
            } else {
                if (tank.object.position.z > z_max) {
                    tank.object.position.z += overlapZ + 0.1;
                } else if (tank.object.position.z < z_min) {
                    tank.object.position.z -= overlapZ + 0.1;
                }
            }
            // Atualiza o bounding box de tanque
            tank.collider.setFromObject(tank.object);
        }
    });


}

export function shootCentralCannon(cannon, projectilesArray, scene, playerTank) {
    // Verifica se o intervalo já foi configurado para evitar múltiplas chamadas de setInterval
    if (!cannon.shootingInterval) {
        cannon.shootingInterval = setInterval(() => {
                shootCannon(cannon, projectilesArray, scene);
        }, 3000); // 3000 milissegundos = 3 segundos
    }
}
