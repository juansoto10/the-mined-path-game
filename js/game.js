const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPos = {
    x: undefined,
    y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    };

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    console.log({ canvasSize, elementsSize })

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowsCols});

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            console.log({ row, rowIndex, col, colIndex, emoji});

            if (col == 'O') {
                playerPos.x = posX;
                playerPos.y = posY;
                console.log({playerPos});
            };

            game.fillText(emoji, posX + 7, posY - 7);
        });
    });

    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPos.x + 7, playerPos.y - 7);
};

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    console.log(event);
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
};
function moveUp() {
    console.log('Up pressed');
    playerPos.y -= elementsSize;
    movePlayer();
};
function moveLeft() {
    console.log('Left pressed');
    playerPos.x -= elementsSize;
    movePlayer();
};
function moveRight() {
    console.log('Right pressed');
    playerPos.x += elementsSize;
    movePlayer();
};
function moveDown() {
    console.log('Up pressed');
    playerPos.y += elementsSize;
    movePlayer();
};
