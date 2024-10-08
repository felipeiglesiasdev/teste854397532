import * as THREE from 'three';



let currentZoomOffset = 80; // Inicialmente o valor do deslocamento no eixo Z

export function handleZoom(zoomIn) {
    const zoomSpeed = 5; // Definir uma velocidade de zoom adequada
    if (zoomIn) {
        currentZoomOffset = Math.min(200, currentZoomOffset + zoomSpeed)
    } else {
        currentZoomOffset = Math.max(20, currentZoomOffset - zoomSpeed) 
}
}

export function updateCamera(camera, playerTank, orbit) {
    if (playerTank.cameraOn) {
        // Posição atual do tanque
        let tankPosition = new THREE.Vector3();
        playerTank.object.getWorldPosition(tankPosition);

        // Definir uma altura fixa para a câmera
        const fixedHeight = 50;  // Altura constante da câmera

        // Atualizando a posição da câmera com base no deslocamento dinâmico
        camera.position.x = tankPosition.x;
        camera.position.y = fixedHeight;
        camera.position.z = tankPosition.z + currentZoomOffset; // Usar o deslocamento dinâmico
        
        orbit.target = new THREE.Vector3(tankPosition.x , tankPosition.y , tankPosition.z)
        // Fazer a câmera sempre olhar para o tanque
        camera.lookAt(tankPosition);

        // Desabilitar rotação e pan, se necessário
        orbit.enablePan = false;
        orbit.enableRotate = false;
    }
}



