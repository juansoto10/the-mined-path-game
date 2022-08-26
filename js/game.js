const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

// - Player position and gift position object -
const playerPos = {
    x: undefined,
    y: undefined,
}

const giftPos = {
    x: undefined,
    y: undefined,
}

// - Events when loading and resizing occurs -
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

// - Truncate numbers -
function trunc(num, positions) {
    let numberToString = num.toString();
    let stringLength = numberToString.length;
    let decimalLength = numberToString.indexOf('.') + 1;
    let subString = numberToString.substring(0, decimalLength + positions)
    return Number(subString);
}

// - Setting canvas size -
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        initialSize = window.innerWidth * 0.8;
        canvasSize = trunc(initialSize, 4)
    } else {
        initialSize = window.innerHeight * 0.8;
        canvasSize = trunc(initialSize, 4)
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    initialElementsSize = canvasSize / 10;
    elementsSize = trunc(initialElementsSize, 4);

    startGame();
}

// - Rendering the map and the player after each move -
function startGame() {
    console.log({ canvasSize, elementsSize })

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    // console.log({map, mapRows, mapRowsCols});

    game.clearRect(0, 0, canvasSize, canvasSize);
    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = trunc(elementsSize * (colIndex + 1), 4);
            const posY = trunc(elementsSize * (rowIndex + 1), 4);

            // console.log({ row, rowIndex, col, colIndex, emoji});

            if (col == 'O') {
                if (!playerPos.x && !playerPos.y) {
                    playerPos.x = posX;
                    playerPos.y = posY;
                    console.log({playerPos});
                }
            } else if (col == 'I') {
                giftPos.x = posX;
                giftPos.y = posY;
                console.log({giftPos});
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

// - Render player position -
function movePlayer() {
    // let truncPlayerPosX = trunc(playerPos.x, 4);
    // let truncPlayerPosY = trunc(playerPos.y, 4);
    // let truncGiftPosX = trunc(giftPos.x, 4);
    // let truncGiftPosY = trunc(giftPos.y, 4);
    // console.log({truncPlayerPosX, truncPlayerPosY, truncGiftPosX, truncGiftPosY});

    const giftCollisionX = trunc(playerPos.x, 4) < trunc(giftPos.x, 4) + 0.1 && trunc(playerPos.y, 4) > trunc(giftPos.y, 4) - 0.1;
    const giftCollisionY = trunc(playerPos.y, 4) < trunc(giftPos.y, 4) + 0.1 && trunc(playerPos.y, 4) > trunc(giftPos.y, 4) - 0.1;
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        console.log('Level up Gonorrea!');
    } 

    console.log(`x = ${playerPos.x}, y = ${playerPos.y}`)
    game.fillText(emojis['PLAYER'], trunc(playerPos.x, 4), trunc(playerPos.y, 4)); 
}

// - Events -
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

// - Player movement -
function moveByKeys(event) {
    console.log(event);
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
    console.log('Up pressed');

    if ((playerPos.y - elementsSize) < elementsSize - 0.01) {
        console.log('OUT');
    } else {
        playerPos.y = trunc(playerPos.y - elementsSize, 4);
        startGame();
    }
}
function moveLeft() {
    console.log('Left pressed');
    
    if ((playerPos.x - elementsSize) < elementsSize - 0.01) {
        console.log('OUT');
    } else {
        playerPos.x = trunc(playerPos.x - elementsSize, 4);
        startGame();
    }
}
function moveRight() {
    console.log('Right pressed');
    
    if ((playerPos.x + elementsSize) > canvasSize) {
        console.log('OUT')
    } else {
        playerPos.x = trunc(playerPos.x + elementsSize, 4);
        startGame();
    }
}
function moveDown() {
    console.log('Down pressed');

    if ((playerPos.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPos.y = trunc(playerPos.y + elementsSize, 4);
        startGame();
    }  
}
