import * as THREE from 'three';

export let listener;
export let backgroundMusic, shotSounds = [], playerHitSound, enemyHitSound, gateMoveSoundDown, gateMoveSoundUp;

let soundEnabled = true;
let audioLoader = new THREE.AudioLoader(); 

// Função para inicializar o listener e os sons
export function initAudio(camera) {
    listener = new THREE.AudioListener();
    camera.add(listener);

    // Carregar os sons
    loadSounds();
}

// Função para carregar os sons
function loadSounds() {
    // Som ambiente
    backgroundMusic = new THREE.Audio(listener);
    audioLoader.load('./Som ambiente.mp3', function(buffer) {
        backgroundMusic.setBuffer(buffer);
        backgroundMusic.setLoop(true);
        backgroundMusic.setVolume(0.3);
        //backgroundMusic.play();
    });

    // Criar instâncias para som de tiro
    for (let i = 0; i < 5; i++) { // Por exemplo, 5 instâncias
        const shotSound = new THREE.Audio(listener);
        audioLoader.load('./Som de tiro tanque.mp3', function(buffer) {
            shotSound.setBuffer(buffer);
            shotSound.setVolume(0.1);
        });
        shotSounds.push(shotSound);
    }

    // Som de impacto no player
    playerHitSound = new THREE.Audio(listener);
    audioLoader.load('./SomAlvoAtingido.mp3', function(buffer) {
        playerHitSound.setBuffer(buffer);
        playerHitSound.setVolume(0.3);
    });

    // Som de impacto nos tanques inimigos
    enemyHitSound = new THREE.Audio(listener);
    audioLoader.load('./SomAlvoAtingido.mp3', function(buffer) {
        enemyHitSound.setBuffer(buffer);
        enemyHitSound.setVolume(0.1);
    });

    // Som de movimentação dos portões
    gateMoveSoundDown = new THREE.Audio(listener);
    audioLoader.load('./SomPortao.mp3', function(buffer) {
        gateMoveSoundDown.setBuffer(buffer);
        gateMoveSoundDown.setVolume(0.1);
    });

    gateMoveSoundUp = new THREE.Audio(listener);
    audioLoader.load('./SomPortao.mp3', function(buffer) {
        gateMoveSoundUp.setBuffer(buffer);
        gateMoveSoundUp.setVolume(0.1);
    });
}

// Função para ativar/desativar os sons
export function toggleSound() {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
        shotSounds.forEach(sound => sound.pause());
        playerHitSound.pause();
        enemyHitSound.pause();
        gateMoveSoundDown.pause();
        gateMoveSoundUp.pause();
    }
}

// Função para o som de tiro
export function playShotSound() {
    if (soundEnabled) {
        const soundToPlay = shotSounds.find(sound => !sound.isPlaying);
        if (soundToPlay) {
            soundToPlay.play();
        } else {
            // Se todos estão tocando, você pode decidir reiniciar um ou ignorar
            shotSounds[0].stop();
            shotSounds[0].play(); // Reinicia a primeira instância
        }
    }
}

// Função para o som quando o player é atingido
export function playPlayerHitSound() {
    if (soundEnabled) {
        playerHitSound.play();
    }
}

// Função para o som quando o inimigo é atingido
export function playEnemyHitSound() {
    if (soundEnabled) {
        enemyHitSound.play();
    }
}

// Função para o som de movimentação dos portões
export function playGateMoveSoundDown() {
    if (soundEnabled) {
        gateMoveSoundDown.play();
    }
}

// Função para o som de movimentação dos portões
export function playGateMoveSoundUp() {
    if (soundEnabled) {
        gateMoveSoundUp.play();
    }
}

// Função para parar o som ambiente
export function stopBackgroundMusic() {
    backgroundMusic.pause();
}
