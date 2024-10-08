import * as THREE from 'three';


export function insertSkybox(scene, renderer, camera){
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./textures/skybox1.jpeg', () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height * 2); // Aumentar o fator pode melhorar a nitidez
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
    });
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter; // Filtro linear para a magnificação
    texture.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy()); // Aumentar anisotropia até o máximo suportado
    texture.wrapS = THREE.RepeatWrapping; // Ajustes para envolvimento da textura
    texture.wrapT = THREE.RepeatWrapping;

    camera.fov = 75;
    

    // Configurar pixel ratio para telas de alta densidade
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

}

