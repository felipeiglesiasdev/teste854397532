import * as THREE from 'three';

export function removeTankA(enemyTankA, scene) {
    if (enemyTankA.loaded) {
        enemyTankA.remove = true;
        enemyTankA.active = false;
        if (enemyTankA.object.BoxHelper) {
            scene.remove(enemyTankA.object.BoxHelper);
            enemyTankA.object.BoxHelper.geometry.dispose();
            enemyTankA.object.BoxHelper.material.dispose();
            enemyTankA.object.BoxHelper = null;
        }
        scene.remove(enemyTankA.object);
        enemyTankA.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        if (enemyTankA.object.collider) {
            enemyTankA.object.collider = null;
        }
        enemyTankA.object = null;
    }
}


export function removeTankB(enemyTankB, scene) {
    if (enemyTankB.loaded) {
        enemyTankB.remove = true;
        enemyTankB.active = false;
        if (enemyTankB.object.BoxHelper) {
            scene.remove(enemyTankB.object.BoxHelper);
            enemyTankB.object.BoxHelper.geometry.dispose();
            enemyTankB.object.BoxHelper.material.dispose();
            enemyTankB.object.BoxHelper = null;
        }
        scene.remove(enemyTankB.object);
        enemyTankB.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        if (enemyTankB.object.collider) {
            enemyTankB.object.collider = null;
        }
        enemyTankB.object = null;
    }
}

export function removeTankC(enemyTankC, scene) {
    if (enemyTankC.loaded) {
        enemyTankC.remove = true;
        enemyTankC.active = false;
        if (enemyTankC.object.BoxHelper) {
            scene.remove(enemyTankC.object.BoxHelper);
            enemyTankC.object.BoxHelper.geometry.dispose();
            enemyTankC.object.BoxHelper.material.dispose();
            enemyTankC.object.BoxHelper = null;
        }
        scene.remove(enemyTankC.object);
        enemyTankC.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        if (enemyTankC.object.collider) {
            enemyTankC.object.collider = null;
        }
        enemyTankC.object = null;
    }
}
            
export function removeTankD(enemyTankD, scene) {
    if (enemyTankD.loaded) {
        enemyTankD.remove = true;
        enemyTankD.active = false;
        if (enemyTankD.object.BoxHelper) {
            scene.remove(enemyTankD.object.BoxHelper);
            enemyTankD.object.BoxHelper.geometry.dispose();
            enemyTankD.object.BoxHelper.material.dispose();
            enemyTankD.object.BoxHelper = null;
        }
        scene.remove(enemyTankD.object);
        enemyTankD.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        if (enemyTankD.object.collider) {
            enemyTankD.object.collider = null;
        }
        enemyTankD.object = null;
    }
}


export function removeTankE(enemyTankE, scene) {
    if (enemyTankE.loaded) {
        enemyTankE.remove = true;
        enemyTankE.active = false;
        if (enemyTankE.object.BoxHelper) {
            scene.remove(enemyTankE.object.BoxHelper);
            enemyTankE.object.BoxHelper.geometry.dispose();
            enemyTankE.object.BoxHelper.material.dispose();
            enemyTankE.object.BoxHelper = null;
        }
        scene.remove(enemyTankE.object);
        enemyTankE.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        if (enemyTankE.object.collider) {
            enemyTankE.object.collider = null;
        }
        enemyTankE.object = null;
    }
}


export function removeTankF(enemyTankF, scene) {
    if (enemyTankF.loaded) {
        enemyTankF.remove = true;
        enemyTankF.active = false;
        if (enemyTankF.object.BoxHelper) {
            scene.remove(enemyTankF.object.BoxHelper);
            enemyTankF.object.BoxHelper.geometry.dispose();
            enemyTankF.object.BoxHelper.material.dispose();
            enemyTankF.object.BoxHelper = null;
        }
        scene.remove(enemyTankF.object);
        enemyTankF.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        if (enemyTankF.object.collider) {
            enemyTankF.object.collider = null;
        }
        enemyTankF.object = null;
    }
}

export function removeCompleteBC(enemyTankB, enemyTankC, playerTank){
    if (enemyTankB.object && enemyTankC.object){
        if (enemyTankB.object.BoxHelper && enemyTankC.object.BoxHelper) {
            enemyTankB.object.BoxHelper.geometry.dispose();
            enemyTankB.object.BoxHelper.material.dispose();
            enemyTankB.object.BoxHelper = null;
            enemyTankC.object.BoxHelper.geometry.dispose();
            enemyTankC.object.BoxHelper.material.dispose();
            enemyTankC.object.BoxHelper = null;
        }
        enemyTankB.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        enemyTankC.object.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        if (enemyTankC.object.collider && enemyTankB.object.collider) {
            enemyTankC.object.collider = null;
            enemyTankB.object.collider = null;
        }
        enemyTankC.object = null;
        enemyTankB.object = null;
        playerTank.currentLevel = 3
    }
    
}


