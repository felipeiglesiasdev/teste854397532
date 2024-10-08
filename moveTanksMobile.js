import * as THREE from 'three';
import { shoot } from './projectile.js';

let clock = new THREE.Clock();


let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;



export function keyboardUpdateMobile(playerTank, scene, projectilesArray) {
    // Inicializa os controles de toque
    document.getElementById('joystickContainer').style.display = 'block';
    document.getElementById('shootButton').style.display = 'block';

    var speed = 0.05;
    var moveDistance = speed * clock.getDelta();

    const joystick = nipplejs.create({
        zone: document.getElementById('joystickContainer'),
        mode: 'static',
        position: { left: '50px', bottom: '50px' },
        color: 'blue',
        size: 100,
    });

    // Função chamada quando o joystick é movido
    joystick.on('move', function (evt, data) {
        const forward = data.vector.y; // Coordenada Y do joystick (para frente/trás)
        const turn = data.vector.x;    // Coordenada X do joystick (para os lados)

        // Redefinir os valores de movimento
        fwdValue = bkdValue = lftValue = rgtValue = 0;

        if (forward > 0) {
            fwdValue = Math.abs(forward); // Movendo-se para frente
        } else if (forward < 0) {
            bkdValue = Math.abs(forward); // Movendo-se para trás
        }

        if (turn > 0) {
            rgtValue = Math.abs(turn); // Virando à direita
        } else if (turn < 0) {
            lftValue = Math.abs(turn); // Virando à esquerda
        }
    });

    

    // Lógica para atirar ao pressionar o botão
    document.getElementById('shootButton').addEventListener('touchstart', () => {
        shoot(playerTank, projectilesArray, scene);
    });
}


