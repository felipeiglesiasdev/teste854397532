import * as THREE from 'three';
import { createGroundPlaneXZ } from '../libs/util/util.js';
import { addLampPost } from './createLampPost.js';

export function layoutScene(renderer, scene, sizeX1, sizeZ1, sizeX2, sizeZ2, sizeX3, sizeZ3, wallBlocks) {

    let geometryFloor = new THREE.BoxGeometry(4,4,4);

    // TEXTURA PARA O CHÃO LEVEL 1
    let roughness = 0.0
    let metalness = 0.4
    let color = "#595959"
    

    let cubeMaterials1 = [
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureFloorLevel1.webp', 0.5,0.5, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
    ];

    // TEXTURA PARA PAREDE LEVEL 1

    roughness = 1.0
    metalness = 0.0
    color = "#944838"

    let cubeMaterials1Walls_Wall1 = [
        setMaterial('./textures/textureWallLevel1.webp', 1, 1, roughness, metalness, color), // +x
        setMaterial('./textures/textureWallLevel1.webp', 1, 1, roughness, metalness, color), // -x
        setMaterial('./textures/textureWallLevel1.webp', sizeX1/4, 1, roughness, metalness, color), // +y
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureWallLevel1.webp', sizeX1/4, 1, roughness, metalness, color), // +z
        setMaterial('./textures/textureWallLevel1.webp', sizeX1/4, 1, roughness, metalness, color), // -z
    ];



    let cubeMaterials1Walls_Wall3 = [
        setMaterial('./textures/textureWallLevel1.webp', sizeZ1/4, 1, roughness, metalness, color), // +x
        setMaterial('./textures/textureWallLevel1.webp', sizeZ1/4, 1, roughness, metalness, color), // -x
        setMaterial('./textures/textureWallLevel1.webp', 1,sizeZ1/4, roughness, metalness, color), // +y
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureWallLevel1.webp', 1, 1, roughness, metalness, color), // +z
        setMaterial('./textures/textureWallLevel1.webp', 1, 1, roughness, metalness, color), // -z
    ];

    let cubeMaterials1Walls = [
        setMaterial('./textures/textureWallLevel1.webp', sizeZ1/16 ,1, roughness, metalness, color), // +x
        setMaterial('./textures/textureWallLevel1.webp', sizeZ1/16 ,1, roughness, metalness, color), // -x
        setMaterial('./textures/textureWallLevel1.webp', 1, sizeZ1/16, roughness, metalness, color), // +y
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }), // -y
        setMaterial('./textures/textureWallLevel1.webp', 1, 1, roughness, metalness, color), // +z
        setMaterial('./textures/textureWallLevel1.webp', 1, 1, roughness, metalness, color), // -z
    ];

    // TEXTURA PARA O CHÃO LEVEL 2

    roughness = 0
    metalness = 0.08
    color = "#404040"

    let cubeMaterials2 = [
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureFloorLevel2.webp', 0.5,0.5, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
    ];

    

    // TEXTURA PARA PAREDE LEVEL 2
    roughness = 0.08
    metalness = 0.08
    color = "#696969"

    let cubeMaterials2Walls_Wall1 = [
        setMaterial('./textures/textureWallLevel2.webp', 1, 1, roughness, metalness, color), // +x
        setMaterial('./textures/textureWallLevel2.webp', 1, 1, roughness, metalness, color), // -x
        setMaterial('./textures/textureWallLevel2.webp', sizeX1/4, 1, roughness, metalness, color), // +y
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureWallLevel2.webp', sizeX1/4, 1, roughness, metalness, color), // +z
        setMaterial('./textures/textureWallLevel2.webp', sizeX1/4, 1, roughness, metalness, color), // -z
    ];



    let cubeMaterials2Walls_Wall2 = [
        setMaterial('./textures/textureWallLevel2.webp', sizeZ1/8, 1, roughness, metalness, color), // +x
        setMaterial('./textures/textureWallLevel2.webp', sizeZ1/8, 1, roughness, metalness, color), // -x
        setMaterial('./textures/textureWallLevel2.webp', 1,sizeZ1/8, roughness, metalness, color), // +y
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureWallLevel2.webp', 1,1, roughness, metalness, color), // +z
        setMaterial('./textures/textureWallLevel2.webp', 1,1, roughness, metalness, color), // -z
    ];

    let cubeMaterials2Walls = [
        setMaterial('./textures/textureWallLevel2.webp', sizeZ1/16 ,1, roughness, metalness, color), // +x
        setMaterial('./textures/textureWallLevel2.webp', sizeZ1/16 ,1, roughness, metalness, color), // -x
        setMaterial('./textures/textureWallLevel2.webp', 1, sizeZ1/16, roughness, metalness, color), // +y
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }), // -y
        setMaterial('./textures/textureWallLevel2.webp', 1, 1, roughness, metalness, color), // +z
        setMaterial('./textures/textureWallLevel2.webp', 1, 1, roughness, metalness, color), // -z
    ];

    // TEXTURA PARA O CHÃO LEVEL 3
    roughness = 0.03
    metalness = 0.09
    color = "#3d8576"

    let cubeMaterials3 = [
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureFloorLevel3.webp', 1,1, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
    ];

    roughness = 2.0
    metalness = 0.1
    color = "#606060"

    // TEXTURA PARA PAREDE LEVEL 3
    let cubeMaterials3Walls1 = [
        setMaterial('./textures/textureWallLevel3.webp', 1 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', 1 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', sizeX3/4 ,1, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureWallLevel3.webp', sizeX3/4 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', sizeX3/4 ,1, roughness, metalness, color),
    ];

    let cubeMaterials3Walls2 = [
        setMaterial('./textures/textureWallLevel3.webp', sizeZ3/4 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', sizeZ3/4 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', 1, sizeZ3/4, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureWallLevel3.webp', 1 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', 1 ,1, roughness, metalness, color),
    ];


    let cubeMaterials3Walls3 = [
        setMaterial('./textures/textureWallLevel3.webp', (sizeZ3+144)/32 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', (sizeZ3+144)/32 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', 1, (sizeZ3+144)/32, roughness, metalness, color),
        new THREE.MeshBasicMaterial({ color: '#1f1f1f' }),
        setMaterial('./textures/textureWallLevel3.webp', 1 ,1, roughness, metalness, color),
        setMaterial('./textures/textureWallLevel3.webp', 1 ,1, roughness, metalness, color),
    ];

    


    // LEVEL 1 ----------------------------------------------------
    const group1 = new THREE.Group();
    


    //constructor(wallBlocks, x, y, z, sizeWallX, sizeWallZ)
    const wall1_1 = new Block(scene,wallBlocks, sizeX1 / 2, 2, 0, sizeX1 + 4, 4, cubeMaterials1Walls_Wall1);
    const wall2_1 = new Block(scene,wallBlocks, sizeX1 / 2, 2, sizeZ1, sizeX1 + 4, 4, cubeMaterials1Walls_Wall1);
    const wall3_1 = new Block(scene,wallBlocks, 0, 2, sizeZ1 / 2, 4, sizeZ1, cubeMaterials1Walls_Wall3);
    const wall4_1 = new Block(scene,wallBlocks, sizeX1, 2, 8, 4, sizeZ1/4, cubeMaterials1Walls);
    const wall5_1 = new Block(scene,wallBlocks, sizeX1, 2, sizeZ1-8, 4, sizeZ1/4, cubeMaterials1Walls);
    const wall6_1 = new Block(scene,wallBlocks, sizeX1/2, 2, sizeZ1-8, 4, sizeZ1/4, cubeMaterials1Walls);
    const wall7_1 = new Block(scene,wallBlocks, sizeX1/2, 2, 8, 4, sizeZ1/4, cubeMaterials1Walls);

    
    group1.add(wall1_1.mesh);
    group1.add(wall2_1.mesh);
    group1.add(wall3_1.mesh);
    group1.add(wall4_1.mesh);
    group1.add(wall5_1.mesh);
    group1.add(wall6_1.mesh);
    group1.add(wall7_1.mesh);

    // Loop para adicionar texturas no chão do Level 1
    for (let x = 0; x <= sizeX1; x += 4) {
        for (let z = 0; z <= sizeZ1; z += 4) {
            let floor = new THREE.Mesh(geometryFloor, cubeMaterials1);
            floor.position.set(x, -2, z);
            floor.castShadow = true;
            floor.receiveShadow = true;
            group1.add(floor);
        }
    }

    group1.position.x = -sizeX1 - 50;
    scene.add(group1);
    addLampPost(scene, group1.position.x, 2, 0, (4 / 7))
    // ----------------------------------------------------------


    // LEVEL 2 ----------------------------------------------------
    const group2 = new THREE.Group();

    
    const wall1_2 = new Block(scene,wallBlocks, sizeX1 / 2, 2, 0, sizeX1 + 4, 4, cubeMaterials2Walls_Wall1);
    const wall2_2 = new Block(scene,wallBlocks, sizeX1 / 2, 2, sizeZ1, sizeX1 + 4, 4, cubeMaterials2Walls_Wall1);
    const wall3_2 = new Block(scene,wallBlocks, sizeX1, 2, 8, 4, sizeZ1/4, cubeMaterials2Walls);
    const wall4_2 = new Block(scene,wallBlocks, sizeX1, 2, sizeZ1-8, 4, sizeZ1/4, cubeMaterials2Walls);
    const wall5_2 = new Block(scene,wallBlocks, 0, 2, 8, 4, sizeZ1/4, cubeMaterials2Walls);
    const wall6_2 = new Block(scene,wallBlocks, 0, 2, sizeZ1-8, 4, sizeZ1/4, cubeMaterials2Walls);

    const wall7_2 = new Block(scene,wallBlocks, sizeX1/4,2,sizeZ1/4,4,sizeZ1/2,cubeMaterials2Walls_Wall2);
    const wall8_2 = new Block(scene,wallBlocks, 3*sizeX1/4,2,3*sizeZ1/4,4,sizeZ1/2,cubeMaterials2Walls_Wall2);


    group2.add(wall1_2.mesh);
    group2.add(wall2_2.mesh);
    group2.add(wall3_2.mesh);
    group2.add(wall4_2.mesh);
    group2.add(wall5_2.mesh);
    group2.add(wall6_2.mesh);
    group2.add(wall7_2.mesh);
    group2.add(wall8_2.mesh);


    // Loop para adicionar texturas no chão do Level 2
    for (let x = 0; x <= sizeX1; x += 4) {
        for (let z = 0; z <= sizeZ1; z += 4) {
            let floor = new THREE.Mesh(geometryFloor, cubeMaterials2);
            floor.position.set(x, -2, z);
            floor.castShadow = true;
            floor.receiveShadow = true;
            group2.add(floor);  
        }
    }
    
    scene.add(group2);
    // ----------------------------------------------------------



    // LEVEL 3 ----------------------------------------------------
    const group3 = new THREE.Group();

    
    //constructor(wallBlocks, x, y, z, sizeWallX, sizeWallZ)
    const wall1_3 = new Block(scene,wallBlocks, sizeX3 / 2, 2, 0, sizeX3 + 4, 4, cubeMaterials3Walls1);
    const wall2_3 = new Block(scene,wallBlocks, sizeX3 / 2, 2, sizeZ3, sizeX3 + 4, 4, cubeMaterials3Walls1);
    const wall3_3 = new Block(scene,wallBlocks, sizeX3, 2, sizeZ3 / 2, 4, sizeZ3, cubeMaterials3Walls2);
    const wall4_3 = new Block(scene,wallBlocks, 0, 2, (sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);
    const wall5_3 = new Block(scene,wallBlocks, 0, 2, sizeZ3-(sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);

    const wall6_3 = new Block(scene,wallBlocks, 30, 2, sizeZ3-(sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);
    const wall7_3 = new Block(scene,wallBlocks, 60, 2, sizeZ3-(sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);
    const wall8_3 = new Block(scene,wallBlocks, 90, 2, sizeZ3-(sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);

    const wall9_3 = new Block(scene,wallBlocks, 30, 2, (sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);
    const wall10_3 = new Block(scene,wallBlocks, 60, 2, (sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);
    const wall11_3 = new Block(scene,wallBlocks, 90, 2, (sizeZ3+144)/16, 4, (sizeZ3+144)/8, cubeMaterials3Walls3);

    group3.add(wall1_3.mesh)
    group3.add(wall2_3.mesh)
    group3.add(wall3_3.mesh)
    group3.add(wall4_3.mesh)
    group3.add(wall5_3.mesh)
    group3.add(wall6_3.mesh)
    group3.add(wall7_3.mesh)
    group3.add(wall8_3.mesh)
    group3.add(wall9_3.mesh)
    group3.add(wall10_3.mesh)
    group3.add(wall11_3.mesh)

    

    group3.position.x = sizeX1 + 50;
    group3.position.z = -(sizeZ3 - sizeZ1) / 2;
    scene.add(group3);


    let geometryFloor3 = new THREE.BoxGeometry(sizeX3+4,4, sizeZ3+4);
    let floor = new THREE.Mesh(geometryFloor3, cubeMaterials3);
    floor.position.set(sizeX3/2, -2, sizeZ3/2);
    floor.castShadow = true;
    floor.receiveShadow = true;
    group3.add(floor);


    addLampPost(scene, group3.position.x, 2, -(sizeZ3 - sizeZ1) / 2, (4 / 7))
    // ----------------------------------------------------------

    return [group1,group2,group3]
}

class Block {
    constructor(scene, wallBlocks, x, y, z, sizeWallX, sizeWallZ, wallMaterial) {
        const wallGeometry = new THREE.BoxGeometry(sizeWallX, 6.2, sizeWallZ);
        this.mesh = new THREE.Mesh(wallGeometry, wallMaterial);
        this.mesh.position.set(x, y+1.1, z); 
        this.mesh.castShadow = true; 
        this.mesh.receiveShadow = true; 
        this.mesh.collider = new THREE.Box3().setFromObject(this.mesh);
        wallBlocks.push(this.mesh);

    }
}


// CRIA TEXTURA COM MeshStandardMaterial
function setMaterial(file, repeatX, repeatY, roughness, metalness, color) {
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
    mat.map.repeat.x = repeatX
    mat.map.repeat.y = repeatY
    mat.castShadow = true;
    mat.map.castShadow = true;
    mat.map.receiveShadow = true;
    return mat
}

// CRIA TEXTURA COM MeshPhongMaterial
function setMaterial2(renderer, file, repeatX, repeatY, shininess, specular, emissive) {
    let loader = new THREE.TextureLoader();
    let mat = new THREE.MeshPhongMaterial({ 
        map: loader.load(file), 
        emissive: emissive, 
        shininess: shininess,
        specular: specular,
        reflectivity: 1.0,
        refractionRatio: 1.0

    });
    mat.map.colorSpace = THREE.SRGBColorSpace;
    mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
    mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
    mat.map.repeat.x = repeatX
    mat.map.repeat.y = repeatY
    mat.castShadow = true;
    mat.map.castShadow = true;
    mat.map.receiveShadow = true;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    mat.map.anisotropy = maxAnisotropy;
    return mat
}




