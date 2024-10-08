import * as THREE from 'three';


export function createGates(gates, sizeX1, sizeZ1, sizeX2, 
    sizeZ2, sizeX3, sizeZ3, level1, level2, level3,scene, renderer, wallBlocks){

    // TEXTURA PARA OS PORTÕES
    let roughness = 0.1
    let metalness = 0.6
    let color = "#84acd0"
    

    let gateMaterials = [
        setMaterial(renderer, './textures/textureGate.webp', 1,1, roughness, metalness, color),
        setMaterial(renderer, './textures/textureGate.webp', 1,1, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#84acd0' }),
        new THREE.MeshBasicMaterial({ color: '#84acd0' }),
        new THREE.MeshBasicMaterial({ color: '#84acd0' }),
        new THREE.MeshBasicMaterial({ color: '#84acd0' }),
    ];

    const gate1 = new Gates(scene, gates, gateMaterials,level1.position.x + sizeX1,0,sizeZ1/2, 2, 32, wallBlocks)
    const gate2 = new Gates(scene, gates, gateMaterials,level2.position.x,0,sizeZ1/2, 2, 32, wallBlocks)
    const gate3 = new Gates(scene, gates, gateMaterials,level2.position.x+sizeX2,0,sizeZ1/2, 2, 32, wallBlocks)
    const gate4 = new Gates(scene, gates, gateMaterials,level3.position.x,0,level3.position.z+sizeZ3/2, 2, 32, wallBlocks)
    scene.add(gate1.mesh)
    scene.add(gate1.mesh)
    scene.add(gate2.mesh)
    scene.add(gate3.mesh)
    scene.add(gate4.mesh)
}

export function createCorridors(gates, sizeX1, sizeZ1, sizeX2, 
sizeZ2, sizeX3, sizeZ3, level1, level2, level3,scene, wallBlocks, renderer){

    // 1ª PASSAGEM
    const corridorGroup1 = new THREE.Group();
    let roughness = 0.0
    let metalness = 0.15
    let color = "white"
    let corridorMaterials = [
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial(renderer, './textures/textureFloorCorridors.webp', 1.1, 1, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
    ];
    // CRIANDO CORREDOR
    const geometry = new THREE.BoxGeometry(50, 4, 32);
    const corridor = new THREE.Mesh(geometry, corridorMaterials);
    // POSICIONANDO CORREDOR
    corridor.position.x = level1.position.x + sizeX1 + 25;
    corridor.position.z = level1.position.z + sizeZ1 / 2;
    corridor.position.y = -2.05;
    corridorGroup1.add(corridor);

    // MURO 1
    roughness = 0.0
    metalness = 0.3
    color = "#f5f5d5"
    let corridorWallsMaterials = [
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial(renderer,'./textures/textureWall1Corridors.webp', 1, 0.163934426, roughness, metalness, color, 0, 0.418032786),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial(renderer,'./textures/textureWall1Corridors.webp', 1, 0.418032786, roughness, metalness, color, 0, 0),
        setMaterial(renderer,'./textures/textureWall1Corridors.webp', -1, -0.418032786, roughness, metalness, color, 0, 0),
    ];
    const wall1_1 = new Block(scene,wallBlocks, level1.position.x + sizeX1 + 25, 1.1,
                              level1.position.z - 2 + sizeZ1 / 4, 46, 4, corridorWallsMaterials)
    corridorGroup1.add(wall1_1.mesh);

    // MURO 2
    const wall2_1 = new Block(scene,wallBlocks, level1.position.x + sizeX1 + 25, 1.1,
        sizeZ1 + 2 - sizeZ1 / 4, 46, 4, corridorWallsMaterials)
    corridorGroup1.add(wall2_1.mesh);
    scene.add(corridorGroup1);

    // 2ª PASSAGEM
    const corridorGroup2 = new THREE.Group();
    const corridor2 = new THREE.Mesh(geometry, corridorMaterials);
    corridor2.position.x = level1.position.x + sizeX1 + 25;
    corridor2.position.z = level1.position.z + sizeZ1 / 2;
    corridor2.position.y = -2.05;
    corridorGroup2.add(corridor2);

    // MURO 1
    const wall1_2 = new Block(scene,wallBlocks, level1.position.x + sizeX1 + 25, 1.1,
        level1.position.z - 2 + sizeZ1 / 4, 46, 4, corridorWallsMaterials)
    corridorGroup2.add(wall1_2.mesh);

    // MURO 2
    const wall2_2 = new Block(scene,wallBlocks, level1.position.x + sizeX1 + 25, 1.1,
        sizeZ1 + 2 - sizeZ1 / 4, 46, 4, corridorWallsMaterials)
    corridorGroup2.add(wall2_2.mesh);
    corridorGroup2.position.x = level2.position.x + sizeX2 + 50;
    corridorGroup2.position.z = level2.position.z + sizeZ2/2 - 32;
    corridorGroup2.position.y = 0;
    scene.add(corridorGroup2);
}


class Block {
    constructor(scene, wallBlocks, x, y, z, sizeWallX, sizeWallZ, wallMaterial) {
        const wallGeometry = new THREE.BoxGeometry(sizeWallX, 10.2, sizeWallZ);
        this.mesh = new THREE.Mesh(wallGeometry, wallMaterial);
        this.mesh.position.set(x, y, z); 
        this.mesh.castShadow = true; 
        this.mesh.receiveShadow = true; 
        this.mesh.collider = new THREE.Box3().setFromObject(this.mesh);
        wallBlocks.push(this.mesh);

    }
}

class Gates {
    constructor(scene, gates, gateMaterials, x, y, z, sizeWallX, sizeWallZ, wallBlocks) {
        const wallGeometry = new THREE.BoxGeometry(sizeWallX, 16, sizeWallZ);
        this.mesh = new THREE.Mesh(wallGeometry, gateMaterials);
        this.mesh.position.set(x,8,z); 
        this.mesh.castShadow = true; 
        this.mesh.receiveShadow = true; 
        this.mesh.collider = new THREE.Box3().setFromObject(this.mesh);
        gates.push(this.mesh);
        //wallBlocks.push(this.mesh);
    }
}

// CRIA TEXTURA COM MeshStandardMaterial
function setMaterial(renderer, file, repeatX, repeatY, roughness, metalness, color) {
    let loader = new THREE.TextureLoader();
    let mat = new THREE.MeshStandardMaterial({ 
        map: loader.load(file), 
        color: color, 
        roughness: roughness,
        metalness: metalness
    });
    mat.map.colorSpace = THREE.SRGBColorSpace;
    mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
    mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    mat.map.anisotropy = maxAnisotropy;
    mat.map.repeat.x = repeatX
    mat.map.repeat.y = repeatY
    mat.castShadow = true;
    mat.map.castShadow = true;
    mat.map.receiveShadow = true;
    return mat
}