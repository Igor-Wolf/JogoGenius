let order = [];
let clickedOrder = [];
let score = 0;


var pontuacaoAtual = document.getElementById('pontuacaoAtual')
var pontuacaoRecord = document.getElementById('pontuacaoRecord')

pontuacaoAtual.innerHTML = 0
pontuacaoRecord.innerHTML = 0

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


function playsound(audioName) {

    let audio = new Audio(`./sfx/${audioName}.mp3`);
    //alert(audioName)
    if (audioName === "erro") {
        audio.volume = 0.2;
    }
    audio.play();

}

let shuffleOrder = () => {

    let colorOrder = Math.floor(Math.random() * 4);

    order.push(colorOrder);
    clickedOrder = [];

    for (let i in order) {
        let element = createColorElement(order[i]);      
        
        lightColor(element, Number(i) + 1, order[i]);
    }
}

let lightColor = (element, number, order) => {


    number = number * 1000; // Multiplicando por 1000 para obter o tempo em milissegundos
    setTimeout(() => {
        if (order == "0") {
            playsound('simonSound1')
            
        }
        else if (order == "1") {
            playsound('simonSound2')
            
        }
        else if (order == "2") {
            playsound('simonSound3')
            
        }
        else if (order == "3") {
            playsound('simonSound4')
            
        }
        element.classList.add('selected');
        setTimeout(() => {
            element.classList.remove('selected');
        }, 500); // Tempo para manter a cor acesa (meio segundo)
    }, number);
}


//checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] !== order[i]) {
            lose();
            break;
        }
    }
    if (clickedOrder.length === order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//função para clique do usuário

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    let element = createColorElement(color);
    element.classList.add('selected');
    
    if (color == "0") {
        playsound('simonSound1')
        
    }
    else if (color == "1") {
        playsound('simonSound2')
        
    }
    else if (color == "2") {
        playsound('simonSound3')
        
    }
    else if (color == "3") {
        playsound('simonSound4')
        
    }

    setTimeout(() => {
        element.classList.remove('selected');
        checkOrder();
    }, 250); // Tempo suficiente para a cor ser mostrada
}


//função que retorna a cor
let createColorElement = (color) => {
    if (color === 0) {
        return green;
    } else if (color === 1) {
        return red;
    } else if (color === 2) {
        return yellow;
    } else if (color === 3) {
        return blue;
    }
}

// funcao para proximo nível do jogo
let nextLevel = () => {
    score++;
    pontuacaoAtual.innerHTML = score - 1;
    shuffleOrder();
}

// funcao para game over
let lose = () => {

    if (parseInt(pontuacaoAtual.innerHTML) > parseInt(pontuacaoRecord.innerHTML)) {

        pontuacaoRecord.innerHTML = pontuacaoAtual.innerHTML
    }
    playsound("erro");
    alert(`Pontuação: ${score - 1}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    pontuacaoAtual.innerHTML = 0;

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert("Bem vindo ao Gênesis! Iniciando novo jogo!");
    score = 0;
    nextLevel();
}

//eventos de clique para inicio do jogo
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
