document.addEventListener("DOMContentLoaded", () => {
    // Array de imagens de papagaios
    const imagensPapagaios = [
        "bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif",
        "unicornparrot.gif", "metalparrot.gif", "revertitparrot.gif"
    ];

    let cartas = [];
    let numJogadas = 0;
    let carta1 = null;
    let carta2 = null;

    // Função para embaralhar as cartas
    function embaralharCartas(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Função para inicializar o jogo
    function iniciarJogo() {
        // Pergunta o número de cartas que o usuário deseja
        let numCartas = parseInt(prompt("Com quantas cartas quer jogar? (4 a 12, número par)"));

        // Validar número de cartas
        while (isNaN(numCartas) || numCartas < 4 || numCartas > 12 || numCartas % 2 !== 0) {
            numCartas = parseInt(prompt("Número inválido! Insira um número par entre 4 e 14."));
        }

        // Gerar cartas de papagaios
        cartas = [];
        for (let i = 0; i < numCartas / 2; i++) {
            cartas.push(imagensPapagaios[i % imagensPapagaios.length]);
            cartas.push(imagensPapagaios[i % imagensPapagaios.length]);
        }

        // Embaralhar as cartas
        embaralharCartas(cartas);

        // Renderizar as cartas no HTML
        const containerCima = document.getElementById("cima");
        const containerBaixo = document.getElementById("baixo");
        
        containerCima.innerHTML = ""; // Limpa o conteúdo antes de renderizar novas cartas
        containerBaixo.innerHTML = ""; // Limpa o conteúdo antes de renderizar novas cartas

        cartas.forEach((imagem, index) => {
            const cartaDiv = document.createElement("div");
            cartaDiv.classList.add("carta");
            cartaDiv.dataset.index = index;
            cartaDiv.dataset.virada = "false"; // Estado inicial da carta (virada para baixo)

            const cartaImg = document.createElement("img");
            cartaImg.src = "assets/back.png"; // Imagem inicial (parte de trás da carta)
            cartaImg.alt = "Carta";

            cartaDiv.appendChild(cartaImg);
            cartaDiv.addEventListener("click", () => virarCarta(cartaDiv, imagem, cartaImg));

            // Distribuir as cartas na parte de cima e de baixo
            if (index < numCartas / 2) {
                containerCima.appendChild(cartaDiv);
            } else {
                containerBaixo.appendChild(cartaDiv);
            }
        });
    }

    // Função para virar a carta
    function virarCarta(cartaDiv, imagem, cartaImg) {
        if (cartaDiv.dataset.virada === "true") return; // Se já estiver virada, não faz nada

        cartaDiv.dataset.virada = "true";
        cartaImg.src = `assets/${imagem}`; // Exibe a parte da frente da carta

        numJogadas++;

        if (!carta1) {
            carta1 = { div: cartaDiv, imagem: imagem, img: cartaImg }; // Primeira carta virada
        } else {
            carta2 = { div: cartaDiv, imagem: imagem, img: cartaImg }; // Segunda carta virada

            // Verificar se as cartas são iguais
            if (carta1.imagem === carta2.imagem) {
                // Se forem iguais, manter as cartas viradas
                carta1 = null;
                carta2 = null;
                // Verificar se o jogo acabou
                if (document.querySelectorAll('[data-virada="true"]').length === cartas.length) {
                    setTimeout(() => {
                        alert(`Você ganhou em ${numJogadas} jogadas!`);
                    }, 500);
                }
            } else {
                // Se não forem iguais, esperar 1 segundo e virar as cartas novamente
                setTimeout(() => {
                    carta1.img.src = "assets/back.png";
                    carta2.img.src = "assets/back.png";
                    carta1.div.dataset.virada = "false";
                    carta2.div.dataset.virada = "false";
                    carta1 = null;
                    carta2 = null;
                }, 1000);
            }
        }
    }

    // Iniciar o jogo quando a página carregar
    iniciarJogo();
});
