import * as THREE from 'three';
import { GLTFLoader } from '../build/jsm/loaders/GLTFLoader.js';
import { getMaxSize } from "../libs/util/util.js";
import { addLampPost } from './createLampPost.js';



// LUZ DIRECIONAL LEVEL 1
export function createDirectionalLightLevel1(scene, level1, sizeX1, sizeZ1) {

    const lightPosition = new THREE.Vector3(
        level1.position.x+5,
        level1.position.y+10,
        level1.position.z+5
    )
    const lightColor = "rgb(255,255,255)"
    const dirLight = new THREE.DirectionalLight(lightColor, 3)
    dirLight.position.copy(lightPosition)
    dirLight.castShadow = true
    scene.add(dirLight)
    dirLight.target.position.set(
        level1.position.x+(sizeX1/2),
        0,
        level1.position.z+(sizeZ1/2)
    ); 
    dirLight.shadow.mapSize.width = 2048; 
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.8;
    dirLight.shadow.camera.far = 170;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.right = 40;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.left = -70;
    scene.add(dirLight.target);
}

// LUZ DIRECIONAL LEVEL 3
export function createDirectionalLightLevel3(scene, level3, sizeX3, sizeZ3) {
    const lightPosition = new THREE.Vector3(
        level3.position.x+5,
        level3.position.y+10,
        level3.position.z+5
    )
    const lightColor = "rgb(255,255,255)"
    const dirLight = new THREE.DirectionalLight(lightColor, 8)
    dirLight.position.copy(lightPosition)
    dirLight.castShadow = true
    scene.add(dirLight)
    dirLight.target.position.set(
        level3.position.x+(sizeX3/2),
        0,
        level3.position.z+(sizeZ3/2)
    ); 
    dirLight.shadow.mapSize.width = 2048; 
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.8;
    dirLight.shadow.camera.far = 170;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.right = 40;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.left = -70;
    scene.add(dirLight.target);
}

// SPOTLIGHTS
export function createSpotLights(scene, sizeX2, sizeZ2, level2) {
    const spotLightColor = 0xffffff;
    const spotLightIntensity = 1700; 
    const spotLightDistance = 80; 
    const spotLightAngle = 0.35; 
    const spotLightPenumbra = 0.25; 
    const spotLightDecay = 1.45; 

    const hor = sizeX2
    const ver = sizeZ2

    for (let x = 0; x <= hor; x += 4) {
        for (let z = 0; z <= ver; z += 4) {
            if ((x === 0 && z === 0) || (x === hor && z === ver)) {

                // Criação da Esfera Amarela
                const geometry = new THREE.SphereGeometry(1, 32, 32);
                const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                const sphere = new THREE.Mesh(geometry, material);

                // Definindo a posição da esfera
                sphere.position.set(x, 23, z);
                //scene.add(sphere) // ESFERA PARA SABER A LOCALIZAÇÃO DO SPOTLIGHT

                // Adicionando Postes
                if (x === 0 && z === 0) addLampPost(scene, x, 2, z, (4 / 7))
                else addLampPost(scene, x, 2, z, 4 / 3)

                // Criação do SpotLight
                const spotLight = new THREE.SpotLight(spotLightColor,
                spotLightIntensity, spotLightDistance, spotLightAngle,
                spotLightPenumbra, spotLightDecay);
                spotLight.position.copy(sphere.position);
                spotLight.castShadow = true;
                spotLight.shadow.mapSize.width = 2048; 
                spotLight.shadow.mapSize.height = 2048;
                spotLight.shadow.camera.near = 0.5;
                spotLight.shadow.camera.far = 50;
                if (x === 0 && z === 0) spotLight.target.position.set(x + 12, 0, z + 12);
                if (x === hor && z === ver) spotLight.target.position.set(x - 12, 0, z - 12);
                spotLight.target.updateMatrixWorld();
                scene.add(spotLight);
                scene.add(spotLight.target);

            } else if ((x === hor/2 && z === 0) || (x === hor/2 && z === ver)) {

                // Criação da Esfera Amarela
                const geometry = new THREE.SphereGeometry(0.5, 32, 32);
                const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                const sphere = new THREE.Mesh(geometry, material);

                // Definindo a posição da esfera
                sphere.position.set(x, 23, z);
                //scene.add(sphere) // ESFERA PARA SABER A LOCALIZAÇÃO DO SPOTLIGHT

                // Adicionando Postes
                if (x === hor/2 && z === 0) addLampPost(scene, x, 2, z, 2 / 3)
                else addLampPost(scene, x, 2, z, 2)

                // Criação do SpotLight
                const spotLight = new THREE.SpotLight(spotLightColor, spotLightIntensity, 
                spotLightDistance, spotLightAngle+.15, spotLightPenumbra, spotLightDecay);
                spotLight.position.copy(sphere.position);
                spotLight.castShadow = true;
                spotLight.shadow.mapSize.width = 2048;
                spotLight.shadow.mapSize.height = 2048;
                spotLight.shadow.camera.near = 0.5;
                spotLight.shadow.camera.far = 50;
                if (x === hor/2 && z === 0) spotLight.target.position.set(hor/2, 0, z+16);
                else spotLight.target.position.set(hor/2, 0, z-16);
                spotLight.target.updateMatrixWorld();
                scene.add(spotLight);
                scene.add(spotLight.target);
            }
        }
    }
}

