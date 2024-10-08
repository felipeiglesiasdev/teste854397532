import { initializeGame } from "./main";

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
