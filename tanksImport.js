import * as THREE from 'three';
import {GLTFLoader} from '../build/jsm/loaders/GLTFLoader.js';
import {getMaxSize} from"../libs/util/util.js";

export function loadTanks(tanks, scene, asset, file, desiredScale, position, color){
    let loader = new GLTFLoader();
    loader.load(file, function (gltf) {
        let obj = gltf.scene;
        obj.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // TROCANDO COR DAS RODAS
                if (child.name == "Tank_Wheel_1" || child.name == "Tank_Wheel_2" || 
                    child.name == "Tank_Wheel_3" || child.name == "Tank_Wheel_4" ||
                    child.name == "Tank_Wheel_5")
                        child.material = new THREE.MeshPhongMaterial({color: 0x1f1f1f})
                
                // COR PRINCIPAL DO TANQUE
                if (child.name == "Tank_Base")
                    child.material = new THREE.MeshPhongMaterial({color: color})
    
                // COR DO CANHÃO
                if (child.name == "Tank_Barrel"){
                    child.material = new THREE.MeshPhongMaterial({
                        color: multiplyColor(color, 0.25), 
                        shininess: 60

                    })
                }
                // COR PRINCIPAL DA CANHÃO
                if (child.name == "Tank_Tower")
                    child.material = new THREE.MeshPhongMaterial({color: multiplyColor(color, 0.5)})
                
                
            }
        });

        obj = normalizeAndRescale(obj, desiredScale);
        obj.castShadow = true;
        obj.receiveShadow = true;
        let pos = position
        obj.position.copy(pos);

        // Adicionar colisor amarelo
        let boxHelper = new THREE.BoxHelper(obj, 0xffff00); // 0xffff00 é a cor amarela
        obj.BoxHelper = boxHelper
        //scene.add(boxHelper);
        let collider = new THREE.Box3().setFromObject(obj);
        obj.collider = collider


        // Armazenar a referências ao Asset
        asset.object = obj;
        asset.collider = collider;
        asset.boxHelper = boxHelper;
        asset.loaded = true;

        scene.add(asset.object)
        
        // Virando Tanque Vermelho
        if(obj.position.z == 52 || obj.position.z == 65) obj.rotateY(3.14)

        // Virando o Player Tank
        if(obj.position.z == 54) obj.rotateY(3.14)

            
        
    }, null, null);
}


// Normalize scale and multiple by the newScale
export function normalizeAndRescale(obj, newScale)
  {
    var scale = getMaxSize(obj); // Available in 'utils.js'
    obj.scale.set(newScale * (1.0/scale),
                  newScale * (1.0/scale),
                  newScale * (1.0/scale));
    return obj;
  }


function multiplyColor(color, factor) {
    // Extrai os valores RGB da cor
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Multiplica cada componente pela fator e garante que não passe de 255
    r = Math.min(Math.floor(r * factor), 255);
    g = Math.min(Math.floor(g * factor), 255);
    b = Math.min(Math.floor(b * factor), 255);

    // Converte de volta para o formato hexadecimal
    const newColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return newColor;
}

