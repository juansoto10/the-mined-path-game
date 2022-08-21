const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    // game.fillRect(0, 0, 120, 100);
    // game.clearRect(0, 0, 50, 50);
    // game.clearRect(50, 0, 25, 25);

    // game.font = '25px Verdana';
    // game.fillStyle = 'purple';
    // game.textAlign = 'start';
    // game.fillText('Juan', 125, 50);
    // game.fillText('Cada día', 5, 95);
    // game.fillText('Será mejor', 150, 140);

    let canvasSize;

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    const elementsSize = canvasSize / 10;

    console.log({ canvasSize, elementsSize })

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end'

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize * i + 10, elementsSize)
    }
}