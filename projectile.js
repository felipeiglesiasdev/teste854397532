import * as THREE from 'three';
import { setDefaultMaterial } from "../libs/util/util.js";

// Classe Projectile
export class Projectile {
  constructor(object, shooter) {
    // Propriedades
    this.active = true
    this.object = object
    this.speed = 1
    this.name = shooter.name

    if (shooter.name == "cannon")
      this.direction = (new THREE.Vector3(1, 0, 0)).applyQuaternion(shooter.quaternion).normalize()
    else 
      this.direction = (new THREE.Vector3(0, 0, 1)).applyQuaternion(shooter.object.quaternion).normalize()

    this.reflections = 0

    // Criando colisor
    this.collider = new THREE.Box3().setFromObject(object)
  }
}

// Função para criar tiros dos Tanques
export function shoot(tank, projectilesArray, scene) {
  // Criar o material e a geometria do projétil
  let projectileRadius = 0.5;
  // Criar o material Phong, branco e brilhante
  let material = new THREE.MeshPhongMaterial({
    color: 0xffffff,        
    specular: 0xffffff,     
    shininess: 100,         
    emissive: 0xffffff,     
    emissiveIntensity: 0.8  
  });
  // Criar o material Phong, powerUP ativado
  let material2 = new THREE.MeshPhongMaterial({
    color: 0x640b64,        
    specular: 0xffffff,     
    shininess: 100,         
    emissive: 0x640b64,     
    emissiveIntensity: 0.5  
  });
  

  // Copiando a posição do tanque
  let tankPosition = new THREE.Vector3();
  tank.object.getWorldPosition(tankPosition);

  // Obtendo a orientação do tanque para normalizar o vetor
  let tankDirection = new THREE.Vector3();
  tank.object.getWorldDirection(tankDirection);

  // Normalizar a direção do tanque no plano XZ
  tankDirection.y = 0; // Ignorando o componente Y para manter no plano XZ
  tankDirection.normalize();

  // Criar a geometria do projétil (esfera)
  let projectileGeometry = new THREE.SphereGeometry(projectileRadius);
  let projectile
  if (tank.name == 'playerTank' && tank.powerUpHit){
      projectile = new THREE.Mesh(projectileGeometry, material2);
  }
  else{
      projectile = new THREE.Mesh(projectileGeometry, material);
  }

  // Ajustando a posição inicial do tiro
  const offset = 4; // Deslocamento para garantir que o tiro saia na frente do tanque
  projectile.position.set(
    tankPosition.x + tankDirection.x * offset,
    (tankPosition.y + 2) * 1.4,  // Ajuste da altura
    tankPosition.z + tankDirection.z * offset
  );

  // Adicionando o projétil à cena
  scene.add(projectile);

  // Adicionando o projétil à lista de projectiles
  projectilesArray.push(new Projectile(projectile, tank));
}


// Criando tiros do Canhão
export function shootCannon(cannon, projectilesArray, scene) {
  const projectileRadius = 0.5;
  let material = setDefaultMaterial("white");
  let projectileGeometry = new THREE.SphereGeometry(projectileRadius); 
  let projectile = new THREE.Mesh(projectileGeometry, material);
  let cannonPosition = cannon.position.clone();
  const cannonOffset = new THREE.Vector3(4, 2.3, -2); 
  let projectilePosition = cannonPosition.clone().add(cannon.getWorldDirection(new THREE.Vector3()).multiplyScalar(2)); // Saindo do canhão
  projectilePosition.add(cannonOffset); 
  projectile.position.copy(projectilePosition);
  scene.add(projectile);
  projectilesArray.push(new Projectile(projectile, cannon));
}



export function updateProjectile(projectilesArray, wallBlocks, cannon, tanks, gates, movingWalls) {
  projectilesArray.forEach(projectile => {
    if (projectile.active) {
      // Posição inicial do projétil
      const startPosition = projectile.object.position.clone();

      // Calculando a nova posição do projétil
      const newPosition = startPosition.clone().add(projectile.direction.clone().multiplyScalar(projectile.speed));

      // Usando Raycasting para verificar colisão ao longo do caminho
      const ray = new THREE.Raycaster(startPosition, projectile.direction.clone().normalize(), 0, projectile.speed);
      
      // Verificando se há interseção com qualquer parede, tanque, canhão ou portão
      const intersections = ray.intersectObjects([...gates, ...wallBlocks, ...movingWalls], true);

      // Itera sobre todas as interseções encontradas
      intersections.forEach(intersection => {
        // Colisão detectada, reflete o projétil
        const wallNormal = intersection.face.normal;  // Normal da superfície
        projectile.direction.reflect(wallNormal);      // Refletir a direção com base na superfície

        // Atualiza a contagem de reflexões
        projectile.reflections += 1;

        // Movendo o tiro um pouco para fora para evitar múltiplas colisões consecutivas
        projectile.object.position.copy(intersection.point.clone().add(wallNormal.clone().multiplyScalar(0.5)));

        // Se o projétil refletiu 3 vezes, desativar
        if (projectile.reflections >= 3) {
          projectile.active = false;
          projectile.object.visible = false;
        }
      });

      // Se não houver interseções, mover o projétil normalmente
      if (intersections.length === 0) {
        projectile.object.position.copy(newPosition);
      }
    }
  });
  removeShoots(projectilesArray)
}

export function removeShoots(projectilesArray){
  projectilesArray = projectilesArray.filter(shoot => shoot.active !== false);
}


