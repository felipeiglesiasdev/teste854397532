import * as THREE from  'three';

class Block {
    constructor(scene, movingWalls, x, y, z, sizeWallX, sizeWallZ, wallMaterial, speed) {
        const wallGeometry = new THREE.BoxGeometry(sizeWallX-1, 6.2-2, sizeWallZ-0.05);
        this.mesh = new THREE.Mesh(wallGeometry, wallMaterial);
        this.mesh.position.set(x, y+1.1, z); 
        this.mesh.speed = speed
        this.mesh.direction = 1
        this.mesh.castShadow = true; 
        this.mesh.receiveShadow = true; 
        this.mesh.collider = new THREE.Box3().setFromObject(this.mesh);
        movingWalls.push(this.mesh);

    }
}

export function createMovingWalls(movingWalls, level3, sizeX3, sizeZ3, scene){
    let roughness = 0.05
    let metalness = 0.8
    let color = "#45f563"

    let materialMovingWalls = new THREE.MeshStandardMaterial({ 
        color: color,
        roughness: roughness,
        metalness: metalness
    })
        
    const wall1 = new Block(scene,movingWalls, level3.position.x+30, 2, (sizeZ3+144)/16-12, 4,(sizeZ3+144)/8 , materialMovingWalls, 0.2);
    const wall2 = new Block(scene,movingWalls, level3.position.x+60, 2, (sizeZ3+144)/16-12, 4,(sizeZ3+144)/8 , materialMovingWalls, 0.3);
    const wall3 = new Block(scene,movingWalls, level3.position.x+90, 2, (sizeZ3+144)/16-12, 4,(sizeZ3+144)/8 , materialMovingWalls, 0.8);
    
    scene.add(wall1.mesh);
    scene.add(wall2.mesh);
    scene.add(wall3.mesh);
}



// Função para atualizar as paredes móveis
export function updateMovingWalls(movingWalls, limiteSuperior, limiteInferior) {
    movingWalls.forEach(wall => {
        // Movimentando a parede no eixo Z 
        wall.position.z += wall.speed * wall.direction;

        // Atualizando o bounding box
        wall.collider.setFromObject(wall);

        // Colisão com as paredes fixas 
        if (wall.position.z >= limiteSuperior || wall.position.z <= limiteInferior ) {
            // Inverter a direção
            wall.direction *= -1;
        }
    });
}


