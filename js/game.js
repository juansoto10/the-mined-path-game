// Branch: exp

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;
let level = 0;

// -- Player position and gift position object --
const playerPos = {
    x: undefined,
    y: undefined,
}

const giftPos = {
    x: undefined,
    y: undefined,
}

let bombsPos = [];

// -- Events when loading and resizing occurs --
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

// - Truncate numbers -
// function trunc(num, positions) {
//     let numberToString = num.toString();
//     let stringLength = numberToString.length;
//     let decimalLength = numberToString.indexOf('.') + 1;
//     let subString = numberToString.substring(0, decimalLength + positions)
//     return Number(subString);
// }

// - Setting canvas size -
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

// - Rendering the map and the player after each move -
function startGame() {
    console.log({ canvasSize, elementsSize })

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        win();
        return;
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    // console.log({map, mapRows, mapRowsCols});

    bombsPos = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

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
            } else if (col == 'X') {
                bombsPos.push({
                    x: posX,
                    y: posY,
                });
                
                // console.log({bombsPos});
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

// - Render player position -
function movePlayer() {
    // const giftCollisionX = playerPos.x < giftPos.x + 0.1 && playerPos.x > giftPos.x - 0.1;
    // const giftCollisionY = playerPos.y < giftPos.y + 0.1 && playerPos.y > giftPos.y - 0.1; 
    
    const giftCollisionX = playerPos.x.toFixed(3) == giftPos.x.toFixed(3); 
    const giftCollisionY = playerPos.y.toFixed(3) == giftPos.y.toFixed(3);

    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelUp()
    } 
    
    const bombCollision = bombsPos.find(bomb => {
        const bombCollisionX = bomb.x.toFixed(3) == playerPos.x.toFixed(3);
        const bombCollisionY = bomb.y.toFixed(3) == playerPos.y.toFixed(3);
        return bombCollisionX && bombCollisionY;
    });

    if (bombCollision) {
        console.log('No te tocaba, mano. Qué tristeza :c')
    }

    console.log(`x = ${playerPos.x}, y = ${playerPos.y}`)
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y); 
}

function levelUp() {
    console.log('Level up Gorzobia!');
    level++;
    startGame();
}

function win() {
    console.log('You have completed the game');
}

// function detectBombCollision() {
//     bombs.forEach((bomb, bombIndex) => {
//         row.forEach((pos, posIndex) => {
            
//         });
//     });
// }

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
        playerPos.y -= elementsSize;
        startGame();
    }
}
function moveLeft() {
    console.log('Left pressed');
    
    if ((playerPos.x - elementsSize) < elementsSize - 0.01) {
        console.log('OUT');
    } else {
        playerPos.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    console.log('Right pressed');
    
    if ((playerPos.x + elementsSize) > canvasSize + 0.01) {
        console.log('OUT')
    } else {
        playerPos.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    console.log('Down pressed');

    if ((playerPos.y + elementsSize) > canvasSize + 0.01) {
        console.log('OUT');
    } else {
        playerPos.y += elementsSize;
        startGame();
    }  
}
