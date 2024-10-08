import { GLTFLoader } from '../build/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export function addLampPost(scene, x, y, z, rot) {
    const loader = new GLTFLoader();

    loader.load('./lampPost.glb', (gltf) => {
        const lampPost = gltf.scene;
        lampPost.name = "lampPost";
        lampPost.position.set(x, y, z); 
        lampPost.scale.set(4.0, 3.5, 4.0);
        lampPost.rotation.y = Math.PI / rot;

        lampPost.traverse((child) => {
            
            if (child.isMesh) {
                if (child.material.color.r = 0.1723264455795288)
                {
                    child.material.color.r = 0.08
                    child.material.color.g = 0.08
                    child.material.color.b = 0.08
                }
            }
        });

        scene.add(lampPost); // Adiciona o objeto à cena
    })
}
