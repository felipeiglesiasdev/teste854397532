import * as THREE from  'three';

// CLASSE POWERUPS
class PowerUp {
    constructor(geometry, material, position) {
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.rotateZ(90) 
        this.mesh.catch = false
        this.mesh.collider = new THREE.Box3().setFromObject(this.mesh);
    }
}

// Variáveis para controlar a criação da cápsula
let lastPowerUpTime = 0;
let powerUp = null;



// FUNÇÃO PARA CRIAR OS POWERUPS
export function createPowerUps(powerUps, time, scene, capsuleGeometry, materialCapsule, geometryIco, materialIco,
    playerTank,level1, level2, level3, sizeX1,sizeZ1,sizeX2,sizeZ2,sizeX3,sizeZ3,wallBlocks, tanks, cannon){
        if (time - lastPowerUpTime > 10000) { 

            // REMOVENDO O POWER UP ANTERIOR, CASO ELA EXISTA
            if (powerUp) {
                scene.remove(powerUp.mesh);
                powerUp = null;
            }

            // CHAMANDO A FUNÇÃO choosePowerUps PARA ESCOLHER POWERUP ALEATORIAMENTE
            let data = choosePowerUps(capsuleGeometry,materialCapsule,geometryIco,materialIco)
            let geometry = data[0]
            let material = data[1]

            // CHAMANDO A FUNÇÃO setPositionPowerUps PARA DEFINIR UMA POSIÇÃO
            let position = setPositionPowerUps(playerTank, level1, level2, level3,sizeX1,
                sizeZ1,sizeX2,sizeZ2,sizeX3,sizeZ3,wallBlocks, tanks, cannon)

            // CRIANDO OBJETO POWER UP
            powerUp = new PowerUp(geometry, material, position);

            // ADICIONA NA CENA
            scene.add(powerUp.mesh);

            // ADICIONA AO ARRAY powerUps
            powerUps.push(powerUp)


            // Atualiza o tempo da última cápsula criada
            lastPowerUpTime = time;
        }
}

// FUNÇÃO PARA ROTACIONAR OS POWER UPS
export function rotatePowerUps(powerUps) {
    powerUps.forEach(powerUp => {
        powerUp.mesh.rotation.y += 0.2
    });
}

// FUNÇÃO PARA POSICIONAR OS POWER UPS
function setPositionPowerUps(playerTank, level1, level2, level3,sizeX1,
    sizeZ1,sizeX2,sizeZ2,sizeX3,sizeZ3,wallBlocks, tanks, cannon){

        // PLAYER TANQUE NO LEVEL 1
        if(playerTank.currentLevel == 1){
            // LIMITES MÁXIMOS
            let xmin = level1.position.x + 4
            let xmax = level1.position.x + sizeX1 - 4
            let zmin = level1.position.z + 4
            let zmax = level1.position.z + sizeZ1 - 4
            // POSIÇÕES ALEATÓRIAS
            let x = Math.random() * (xmax - xmin) + xmin; 
            let z = Math.random() * (zmax - zmin) + zmin; 
            let y = 2.2; 
            // VERIFICA SE NÃO FICOU DENTO DE ALGUMA PAREDE (SE A POSIÇÃO X E Z SÃO VÁLIDAS, RETORNA)
            if (verifyPosition(wallBlocks,x,z)) return new THREE.Vector3(x, y, z);

            // SE FICOU DENTRO DE ALGUMA PAREDE, ATIVA RECURSIVIDADE PARA REPOSICIONAR
            else return setPositionPowerUps(playerTank, level1, level2, level3,sizeX1,
                sizeZ1,sizeX2,sizeZ2,sizeX3,sizeZ3,wallBlocks, tanks, cannon)
        }

        // PLAYER TANQUE NO LEVEL 2
        if(playerTank.currentLevel == 2){
            // LIMITES MÁXIMOS
            let xmin = level2.position.x + 4
            let xmax = level2.position.x + sizeX2 - 4
            let zmin = level2.position.z + 4
            let zmax = level2.position.z + sizeZ2 - 4
            // POSIÇÕES ALEATÓRIAS
            let x = Math.random() * (xmax - xmin) + xmin; 
            let z = Math.random() * (zmax - zmin) + zmin; 
            let y = 2.2; 
            // VERIFICA SE NÃO FICOU DENTO DE ALGUMA PAREDE (SE A POSIÇÃO X E Z SÃO VÁLIDAS, RETORNA)
            if (verifyPosition(wallBlocks,x,z)) return new THREE.Vector3(x, y, z);

            // SE FICOU DENTRO DE ALGUMA PAREDE, ATIVA RECURSIVIDADE PARA REPOSICIONAR
            else return setPositionPowerUps(playerTank, level1, level2, level3,sizeX1,
                sizeZ1,sizeX2,sizeZ2,sizeX3,sizeZ3,wallBlocks, tanks, cannon)
        }

        // PLAYER TANQUE NO LEVEL 3
        if(playerTank.currentLevel == 3){
            // LIMITES MÁXIMOS
            let xmin = level3.position.x + 4
            let xmax = level3.position.x + sizeX3 - 4
            let zmin = level3.position.z + 4
            let zmax = level3.position.z + sizeZ3 - 4
            // POSIÇÕES ALEATÓRIAS
            let x = Math.random() * (xmax - xmin) + xmin; 
            let z = Math.random() * (zmax - zmin) + zmin; 
            let y = 2.2; 
            // VERIFICA SE NÃO FICOU DENTO DE ALGUMA PAREDE (SE A POSIÇÃO X E Z SÃO VÁLIDAS, RETORNA)
            if (verifyPosition(wallBlocks,x,z)) return new THREE.Vector3(x, y, z);

            // SE FICOU DENTRO DE ALGUMA PAREDE, ATIVA RECURSIVIDADE PARA REPOSICIONAR
            else return setPositionPowerUps(playerTank, level1, level2, level3,sizeX1,
                sizeZ1,sizeX2,sizeZ2,sizeX3,sizeZ3,wallBlocks, tanks, cannon)
        }
}

// FUNÇÃO PARA ESCOLHER UM MATERIAL E GEOMETRIA
function choosePowerUps(capsuleGeometry,materialCapsule,geometryIco,materialIco){
    let randomIndex = Math.floor(Math.random() * 2)
    if (randomIndex == 0) return [capsuleGeometry, materialCapsule]
    else return [geometryIco, materialIco]
}


// FUNÇÃO PARA VERIFICAR SE FICOU DENTRO DE UMA PAREDE
function verifyPosition(wallBlocks, x, z) {
    const positionToCheck = new THREE.Vector3(x, 2.2, z); 
    for (let wall of wallBlocks) {
        if (wall.collider.containsPoint(positionToCheck)) return false 
        else return true
    }
}

export function takePowerUp(playerTank, powerUps,scene, time, initialLife, temporizador) {
    powerUps.forEach(powerUp => {
        if (!powerUp.mesh.catch && playerTank.collider.intersectsBox(powerUp.mesh.collider)) {
            powerUp.mesh.catch = true
            scene.remove(powerUp.mesh)
            applyPowerUpEffect(playerTank, powerUp, initialLife, time, temporizador);
            lastPowerUpTime = time;
        }
    });
}

// Função para aplicar o efeito do PowerUp ao playerTank
function applyPowerUpEffect(playerTank, powerUp, initialLife, time, displayElement) {
    if (powerUp.mesh.geometry instanceof THREE.CapsuleGeometry) {
        playerTank.life = playerTank.life * 1.2;
        if(playerTank.life > initialLife) playerTank.life = initialLife;
    }

    if (powerUp.mesh.geometry instanceof THREE.IcosahedronGeometry) {
        // Aplica o efeito do PowerUp
        playerTank.powerUpHit = true;

        // Estilos aplicados diretamente ao displayElement
        displayElement.style.display = 'inline-block';
        displayElement.style.width = '50px';
        displayElement.style.height = '50px';
        displayElement.style.lineHeight = '50px'; // Centraliza verticalmente o texto
        displayElement.style.textAlign = 'center';
        displayElement.style.backgroundColor = '#640b64';
        displayElement.style.borderRadius = '50%'; // Torna o fundo circular
        displayElement.style.fontSize = '20px'; // Tamanho da fonte
        displayElement.style.fontWeight = 'bold'; // Negrito
        displayElement.style.color = 'white';
        displayElement.style.marginTop = '10px'; // Margem superior
        displayElement.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)'; // Sombra suave
        displayElement.style.position = 'relative'; // Pode ser útil para posicionamento

        // Inicia o temporizador visual
        let cont = 10
        startPowerUpTimer(displayElement, time, 10000, cont); 
        
        
        // Remove o efeito após 10 segundos
        setTimeout(() => {
            removePowerUpEffect(playerTank, powerUp, displayElement);
        }, 10000);
    }
}

// Função para remover o efeito do PowerUp após 10 segundos
function removePowerUpEffect(playerTank, powerUp, displayElement) {
    if (powerUp.mesh.geometry instanceof THREE.IcosahedronGeometry) {
        playerTank.powerUpHit = false;
        displayElement.style.display = '';
        displayElement.style.width = '';
        displayElement.style.height = '';
        displayElement.style.lineHeight = ''; 
        displayElement.style.textAlign = '';
        displayElement.style.backgroundColor = '';
        displayElement.style.borderRadius = ''; 
        displayElement.style.fontSize = ''; 
        displayElement.style.fontWeight = ''; 
        displayElement.style.color = '';
        displayElement.style.marginTop = ''; 
        displayElement.style.boxShadow = ''; 
        displayElement.style.position = ''; 
    }
}


// Função para iniciar ou reiniciar o temporizador na tela
function startPowerUpTimer(displayElement, time, countdown,cont) {
    // Se já houver um intervalo de contagem, limpa-o antes de iniciar um novo
    if (displayElement.timerInterval) {
        clearInterval(displayElement.timerInterval);
    }
    
    // Atualiza o temporizador visual a cada segundo
    displayElement.timerInterval = setInterval(() => {
        displayElement.innerHTML = cont; // Atualiza o número dentro do círculo
        cont--; // Diminui a contagem

        // Quando o countdown chega a 0, limpa o intervalo
        if (cont <= 0) {
            clearInterval(displayElement.timerInterval);
            displayElement.innerHTML = ""; // Limpa o temporizador da tela
        }
    }, 1000);
}