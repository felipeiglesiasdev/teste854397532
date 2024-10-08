import * as THREE from  'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import {initRenderer,
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";
import KeyboardState from '../libs/util/KeyboardState.js';
import { updateColliders } from './updateColliders.js';
import { layoutScene } from './layout.js'
import { centralCannon, rotateCannon, shootCentralCannon, tankColliderCannon } from './centralCannon.js';
import { insertSkybox } from './skybox.js';
import { loadTanks } from './tanksImport.js';
import { keyboardUpdate } from './moveTanks.js'
import { tankColliderWall, tankColliderGate, tankColliderMovingWalls } from './tankColliderWall.js';
import { updateCamera, handleZoom } from './camera.js'
import { updateProjectile } from './projectile.js'
import { createDirectionalLightLevel1, createSpotLights, createDirectionalLightLevel3} from './lighting.js'
import { updateEnemyTanks } from './updateEnemyTanks.js';
import { openGates12, openGates34 } from './openGate.js';
import { removeTankA, removeTankB, removeTankC, removeTankD, removeTankE, removeTankF, removeCompleteBC } from './removeTanks.js';
import { createGates, createCorridors } from './createGates.js';
import { createPowerUps, rotatePowerUps, takePowerUp } from './powerUps.js';
import { createMovingWalls, updateMovingWalls } from './movingWalls.js';
import { initAudio } from './sounds.js';
import { keyboardUpdateMobile } from './moveTanksMobile.js';
import { updateLifePlayerTank, updateLifeEnemysTank, verifyShootInCannon } from './updateLife.js';
import { updateBarsLifeEnemyTankA,
         updateBarsLifeEnemyTankB,
         updateBarsLifeEnemyTankC,
         updateBarsLifeEnemyTankD,
         updateBarsLifeEnemyTankE,
         updateBarsLifeEnemyTankF,
         updateBarsLifePlayerTank } from './updateBarsLife.js';


var isMobile = false;

// Verificando se é um dispositivo móvel
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    isMobile = true;
}
         
loadgame()
function loadgame(){
const barsLife = document.getElementById('barsLife');
const controls = document.getElementsByClassName('controls');

// TIRANDO TUDO DA TELA
barsLife.style.display = 'none';

// Itera sobre todos os elementos com a classe 'controls'
for (let i = 0; i < controls.length; i++) {
  controls[i].style.display = 'none';
}

// Criando Tela de Ínicio
const divInicio = document.getElementById('start-game');
const btnStartGame = document.getElementById('start-game-btn');

// Adiciona o estilo da div que ocupa a tela toda e centraliza o conteúdo
divInicio.style.position = 'fixed';
divInicio.style.top = '0';
divInicio.style.left = '0';
divInicio.style.width = '100vw';
divInicio.style.height = '100vh';
divInicio.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Fundo preto com 60% de transparência
divInicio.style.display = 'flex';
divInicio.style.justifyContent = 'center';
divInicio.style.alignItems = 'center';
divInicio.style.zIndex = '999'; // Garante que a div ficará na frente

// Estiliza o botão de Start Game
btnStartGame.style.backgroundColor = '#ff9800';
btnStartGame.style.color = 'white';
btnStartGame.style.fontSize = '24px';
btnStartGame.style.padding = '15px 40px';
btnStartGame.style.border = 'none';
btnStartGame.style.borderRadius = '12px';
btnStartGame.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
btnStartGame.style.cursor = 'pointer';
btnStartGame.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease';
btnStartGame.innerText = 'Start Game';
btnStartGame.style.display = 'flex';

// Efeito de hover
btnStartGame.onmouseover = function() {
  btnStartGame.style.backgroundColor = '#e68a00';
  btnStartGame.style.transform = 'scale(1.1)'; // Efeito de ampliação ao passar o mouse
  btnStartGame.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.4)'; // Sombra mais intensa
};

// Revertendo efeito de hover ao sair
btnStartGame.onmouseout = function() {
  btnStartGame.style.backgroundColor = '#ff9800';
  btnStartGame.style.transform = 'scale(1)';
  btnStartGame.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)'; // Retorna à sombra original
};


// Configura o clique no botão para iniciar o jogo
btnStartGame.addEventListener('click', function() {
    // Esconde a tela de início e o botão
    divInicio.style.display = 'none';
    btnStartGame.style.display = 'none';

    // Faz o barsLife voltar a aparecer
    barsLife.style.display = 'flex'; // Certifique-se de que flex está sendo aplicado corretamente
    barsLife.style.visibility = 'visible'; // Garante que o elemento seja visível
    barsLife.style.opacity = '1'; // Garante que a opacidade seja 100%

    // Faz os controles voltarem a aparecer
    for (let i = 0; i < controls.length; i++) {
        controls[i].style.display = 'flex';
    }


    // Inicia o jogo
    initializeGame();
});
}


export function initializeGame(){


// PARÂMETROS INICIAIS
let scene, renderer, camera, light, orbit; 
scene = new THREE.Scene();    
scene.background = new THREE.Color("black");
renderer = initRenderer();    
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
camera = initCamera()
orbit = new OrbitControls( camera, renderer.domElement ); 
orbit.enableZoom = true
orbit.dampingFactor = 0.05
orbit.enableDamping = true
light = initDefaultBasicLight(scene); 
// INICIA O AUDIO
initAudio(camera)
// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// DEFININDO TAMANHO DO CENÁRIO LEVEL 1
const sizeX1 = 96
const sizeZ1 = 64

// DEFININDO TAMANHO DO CENÁRIO LEVEL 2
const sizeX2 = 96
const sizeZ2 = 64

// DEFININDO TAMANHO DO CENÁRIO LEVEL 3
const sizeX3 = 120
const sizeZ3 = 92

// CRIANDO VETOR PARA ARMAZENAR TODAS AS PAREDES
let wallBlocks = []

// CRIANDO VETOR PARA ARMAZENAR TODOS OS TIROS
let projectilesArray = []

// CRIANDO VETOR PARA ARMAZENAR TODAS AS MÓVEIS
let movingWalls = []


// LAYOUT DO CENÁRIO
let levels = []
levels = layoutScene(renderer, scene,sizeX1,sizeZ1,sizeX2,sizeZ2,sizeX3,sizeZ3,wallBlocks)

// ASSOCIANDO LEVELS AO ARRAY LEVELS
let level1 = levels[0]
let level2 = levels[1]
let level3 = levels[2]

// CRIANDO PORTÕES
let gates = []
createGates(gates, sizeX1, sizeZ1, sizeX2, sizeZ2, sizeX3, sizeZ3, level1, level2, level3,scene, renderer, wallBlocks)

// CRIANDO CORREDORES
createCorridors(gates, sizeX1, sizeZ1, sizeX2, sizeZ2, sizeX3, sizeZ3, level1, level2, level3,scene, wallBlocks, renderer)

// CRIANDO PAREDES MÓVEIS
createMovingWalls(movingWalls, level3, sizeX3, sizeZ3, scene)

// LUZES
createDirectionalLightLevel1(scene, level1, sizeX1, sizeZ1)
createDirectionalLightLevel3(scene, level3, sizeX3, sizeZ3)
createSpotLights(scene, sizeX2, sizeZ2, level2)

// CANHÃO CENTRAL
let centralCannonObj = centralCannon();
scene.add(centralCannonObj)
centralCannonObj.position.x = level2.position.x + sizeX2/2
centralCannonObj.position.z = level2.position.z + sizeZ2/2
centralCannonObj.collider = new THREE.Box3().setFromObject(centralCannonObj);

// DEFININDO VIDA INICIAL DE TODOS OS TANQUES
const initialLife = 10

//IMPORTANDO TANQUES
let playerTank = {
    object: null,
    loaded: false,
    collider: new THREE.Box3(),
    position: new THREE.Vector3(),
    name: "playerTank",
    life: initialLife,
    slope1: false,
    slope2: false,
    slope3: false,
    slope4: false,
    level2load: false,
    level3load: false,
    currentLevel: 1,
    godMode: false,
    cameraOn: true,
    powerUpHit: false,
}

let enemyTankA = {
    object: null,
    loaded: false,
    collider: new THREE.Box3(),
    position: new THREE.Vector3(),
    name: "enemyTankA",
    life: initialLife,
    active: true,
    lastShotTime: 0,  // Controla o tempo do último disparo
    shootCooldown: 2000, // Cooldown de 2 segundos entre disparos (2000ms)
    speed: 0.3,
    currentWaypoint: 0, 
    waypoints: [new THREE.Vector3(-60, 0, 10), 
                new THREE.Vector3(-86, 0, 8), 
                new THREE.Vector3(-81, 0, 32), 
                new THREE.Vector3(-110, 0, 13), 
                new THREE.Vector3(-125, 0, 25), 
                new THREE.Vector3(-127, 0, 45), 
                new THREE.Vector3(-110, 0, 40), 
                ],
    remove: false
};

let enemyTankB = {
    object: null,
    loaded: false,
    collider: new THREE.Box3(),
    position: new THREE.Vector3(),
    name: "enemyTankB",
    life: initialLife,
    active: true,
    lastShotTime: 0,  
    shootCooldown: 2000, 
    speed: 0.3,
    waypoints: [new THREE.Vector3(63, 0, 24), 
                new THREE.Vector3(49, 0, 12), 
                new THREE.Vector3(35, 0, 30), 
                new THREE.Vector3(20, 0, 50), 
                new THREE.Vector3(60, 0, 39), 
                new THREE.Vector3(40, 0, 14), 
                new THREE.Vector3(82, 0, 24),
                new THREE.Vector3(32, 0, 25),  
                ],
    currentWaypoint: 0, 
    remove: false
};

let enemyTankC = {
    object: null,
    loaded: false,
    collider: new THREE.Box3(),
    position: new THREE.Vector3(),
    name: "enemyTankC",
    life: initialLife,
    active: true,
    lastShotTime: 0,  
    shootCooldown: 2000, 
    speed: 0.3,
    waypoints: [new THREE.Vector3(85, 0, 10), 
                new THREE.Vector3(61, 0, 12), 
                new THREE.Vector3(58, 0, 46), 
                new THREE.Vector3(37, 0, 38), 
                new THREE.Vector3(16, 0, 47), 
                new THREE.Vector3(7, 0, 26), 
                new THREE.Vector3(33, 0, 45),
                new THREE.Vector3(40, 0, 11),  
                ],
    currentWaypoint: 0, 
    remove: false
};

let enemyTankD = {
    object: null,
    loaded: false,
    collider: new THREE.Box3(),
    position: new THREE.Vector3(),
    name: "enemyTankD",
    life: initialLife,
    active: true,
    lastShotTime: 0,  // Controla o tempo do último disparo
    shootCooldown: 2000, // Cooldown de 2 segundos entre disparos (2000ms)
    speed: 0.3,
    waypoints: [new THREE.Vector3(188, 0, 68), 
                new THREE.Vector3(197, 0, 25), 
                new THREE.Vector3(185, 0, 15), 
                new THREE.Vector3(191, 0, -5), 
                ],
    currentWaypoint: 0, // Adicione isso para acompanhar o waypoint atual
    remove: false
};

let enemyTankE = {
    object: null,
    loaded: false,
    collider: new THREE.Box3(),
    position: new THREE.Vector3(),
    name: "enemyTankE",
    life: initialLife,
    active: true,
    lastShotTime: 0,  // Controla o tempo do último disparo
    shootCooldown: 2000, // Cooldown de 2 segundos entre disparos (2000ms)
    speed: 0.3,
    waypoints: [new THREE.Vector3(225, 0, -5), 
                new THREE.Vector3(215, 0, 8), 
                new THREE.Vector3(227, 0, 40), 
                new THREE.Vector3(226, 0, 66), 
                ],
    currentWaypoint: 0, // Adicione isso para acompanhar o waypoint atual
    remove: false
};

let enemyTankF = {
    object: null,
    loaded: false,
    collider: new THREE.Box3(),
    position: new THREE.Vector3(),
    name: "enemyTankF",
    life: initialLife,
    active: true,
    lastShotTime: 0,  // Controla o tempo do último disparo
    shootCooldown: 2000, // Cooldown de 2 segundos entre disparos (2000ms)
    speed: 0.3,
    waypoints: [new THREE.Vector3(258, 0, 17), 
                new THREE.Vector3(245, 0, 50), 
                new THREE.Vector3(241, 0, 26), 
                new THREE.Vector3(259, 0, 44), 
                ],
    currentWaypoint: 0, // Adicione isso para acompanhar o waypoint atual
    remove: false
};



let tanks = [playerTank, enemyTankA, enemyTankB, enemyTankC]
let enemyTanks = [enemyTankA, enemyTankB, enemyTankC, enemyTankD, enemyTankE, enemyTankF]
let tanksAll = [playerTank, enemyTankA, enemyTankB, enemyTankC, enemyTankD, enemyTankE, enemyTankF]

// IMPORTANDO TANKS E ATRIBUINDO ATRIBUTOS EM NO OBJETO "asset"
// Player
loadTanks(tanks, scene, playerTank,'toonTank.glb', 6.5, new THREE.Vector3(
    (level1.position.x + 10), 0, (sizeZ1 - 10)) , '#0b630b')

// Enemy Tank Level 1
loadTanks(tanks, scene, enemyTankA,'toonTank.glb', 6.5, new THREE.Vector3((level1.position.x+sizeX1-10), 
0, (sizeZ1 - 10)) , '#871f77')


// CRIANDO OBJETO KEYBOARD
var keyboard = new KeyboardState()


// INSERINDO SKYBOX
insertSkybox(scene, renderer, camera)

// CRIANDO GEOMETRIA E MATERIAL DO POWERUP CAPSULA
const radiusCapsule = 0.7
const lengthCapsule = 2.3
const capSegmentsCapsule = 32
const radialSegmentsCapsule = 32
const geometryCapsule = new THREE.CapsuleGeometry(radiusCapsule, lengthCapsule, capSegmentsCapsule, radialSegmentsCapsule);
const materialCapsule = new THREE.MeshPhongMaterial({
    color: 0x00ff00,          
    specular: 0xffffff,       
    emissive: 0x00ff00,       
    emissiveIntensity: 0.5,    
    flatShading: true
})

// CRIANDO GEOMETRIA E MATERIAL DO POWERUP ICOSAEDRO
const radiusIco = 1.5
const detailIco = 0.0
const geometryIco = new THREE.IcosahedronGeometry(radiusIco, detailIco);
const materialIco = new THREE.MeshPhongMaterial({
    color: '#640b64',          
    specular: 0xffffff,       
    emissive: '#640b64',       
    emissiveIntensity: 0.5,    
    flatShading: true
})

// VETOR PARA ARMAZENAR O POWERUP
let powerUps = []

// Variáveis para as barras de vida
const healthPlayer = document.getElementById('health-bar-player');
const healthEnemyTankA = document.getElementById('health-bar-enemyTankA');
const healthEnemyTankB = document.getElementById('health-bar-enemyTankB');
const healthEnemyTankC = document.getElementById('health-bar-enemyTankC');
const healthEnemyTankD = document.getElementById('health-bar-enemyTankD');
const healthEnemyTankE = document.getElementById('health-bar-enemyTankE');
const healthEnemyTankF = document.getElementById('health-bar-enemyTankF');

// TEMPORIZADOR
const temporizador = document.getElementById('temporizador');

// ATRASANDO A FUNÇÃO RENDER EM 5 SEGUNDOS
setTimeout(() => {
    render()
}, 3000);

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        handleZoom(true);  // Zoom in
    } else {
         handleZoom(false); // Zoom out
    }
});







function render(time)
{

        requestAnimationFrame(render);
        renderer.render(scene, camera)

        // COLISÃO TANQUE-PAREDE
        tankColliderWall(wallBlocks, tanksAll)

        // MOVIMENTAÇÃO DO TANQUE DESKTOP
        keyboardUpdate(keyboard, playerTank, scene, projectilesArray, healthPlayer, initialLife, orbit)

        // GODMODE
        //godMode(playerTank, keyboard, healthPlayer, initialLife)

        // COLISÃO TANQUE-PAREDE MÓVEL
        tankColliderMovingWalls(movingWalls, tanks)

        // ATUALIZA COLISORES A CADA FRAME
        updateColliders(tanks, wallBlocks, gates, projectilesArray)

        // TECLADO MOBILE
        if (isMobile) {
            keyboardUpdateMobile(playerTank, scene, projectilesArray);
        }

        // ATUALIZA TIROS
        updateProjectile(projectilesArray, wallBlocks, centralCannonObj, tanks, gates, movingWalls)

        // COLISÃO TANQUE-CANHÃO
        tankColliderCannon(centralCannonObj, tanksAll)

        // VERIFICA SE O TANQUE A MORREU --> ABRE PORTÃO 1 --> FECHA PORTÃO 1 --> ABRE PORTÃO 2 --> FECHA PORTÃO 2
        if (!enemyTankA.active) openGates12(gates[0], gates[1], playerTank, enemyTankB, enemyTankC, tanks, scene)

        // VERIFICA SE O TANQUE B E C MORRERAM --> ABRE PORTÃO 3 --> FECHA PORTÃO 3 --> ABRE PORTÃO 4 --> FECHA PORTÃO 4
        if (!enemyTankB.active && !enemyTankC.active) openGates34(gates[2], gates[3], playerTank, enemyTankD, enemyTankE, enemyTankF, tanks, scene)


        // CANHÃO CENTRAL ROTACIONANDO PARA O TANQUE MAIS PRÓXIMO
        rotateCannon(centralCannonObj, playerTank, enemyTankB, enemyTankC)

        // CANHÃO CENTRAL ATIRA A CADA 3 SEGUNDOS
        if (playerTank.currentLevel == 2) shootCentralCannon(centralCannonObj, projectilesArray, scene, playerTank)

        // MOVIMENTAÇÃO DOS TANQUES INIMIGOS
        updateEnemyTanks(enemyTanks, playerTank, projectilesArray, scene, wallBlocks)


        // CRIANDO POWERUPS A CADA 10 SEGUNDOS
        createPowerUps(powerUps, time, scene, geometryCapsule, materialCapsule, geometryIco, materialIco,
            playerTank, level1, level2, level3, sizeX1, sizeZ1, sizeX2, sizeZ2, sizeX3, sizeZ3, wallBlocks, tanks, centralCannonObj)

        // ROTACIONANDO POWERUP
        rotatePowerUps(powerUps)

        // VERIFICANDO SE O TANQUE PEGOU O POWERUP
        takePowerUp(playerTank, powerUps, scene, time, initialLife, temporizador)

        // ATUALIZANDO VIDA DO PLAYER TANK
        updateLifePlayerTank(playerTank, projectilesArray, scene)

        // ATUALIZANDO VIDA DO ENEMYS TANKS
        updateLifeEnemysTank(tanksAll, projectilesArray, scene, playerTank)

        // TIROS NO CANHÃO DESAPARECEM
        verifyShootInCannon(centralCannonObj, projectilesArray, scene)

        // PAREDES MÓVEIS
        updateMovingWalls(movingWalls, level3.position.z + sizeZ3 / 2 + 3, level3.position.z + 16)

        // ATUALIZAR BARRAS DE VIDA
        updateBarsLifePlayerTank(playerTank, healthPlayer, initialLife)
        if (playerTank.currentLevel == 1) updateBarsLifeEnemyTankA(enemyTankA, healthEnemyTankA, initialLife)
        if (playerTank.currentLevel == 2) updateBarsLifeEnemyTankB(enemyTankB, healthEnemyTankB, initialLife)
        if (playerTank.currentLevel == 2) updateBarsLifeEnemyTankC(enemyTankC, healthEnemyTankC, initialLife)
        if (playerTank.currentLevel == 3) updateBarsLifeEnemyTankD(enemyTankD, healthEnemyTankD, initialLife)
        if (playerTank.currentLevel == 3) updateBarsLifeEnemyTankE(enemyTankE, healthEnemyTankE, initialLife)
        if (playerTank.currentLevel == 3) updateBarsLifeEnemyTankF(enemyTankF, healthEnemyTankF, initialLife)

        // REMOVENDO TANQUES SEM VIDA
        if (enemyTankA.life <= 0 && !enemyTankA.remove) removeTankA(enemyTankA, scene)
        if (enemyTankB.life <= 0 && !enemyTankB.remove) removeTankB(enemyTankB, scene)
        if (enemyTankC.life <= 0 && !enemyTankC.remove) removeTankC(enemyTankC, scene)
        if (enemyTankD.life <= 0 && !enemyTankD.remove) removeTankD(enemyTankD, scene)
        if (enemyTankE.life <= 0 && !enemyTankE.remove) removeTankE(enemyTankE, scene)
        if (enemyTankF.life <= 0 && !enemyTankF.remove) removeTankF(enemyTankF, scene)

        // REMOVENDO COMPLETAMENTE OS TANQUES B E C
        if (enemyTankB.life <= 0 && enemyTankC.life <= 0){
            removeCompleteBC(enemyTankB, enemyTankC, playerTank)
            playerTank.currentLevel = 3
        }
            
            
        // CAMERA
        updateCamera(camera, playerTank, orbit)       
}
}


