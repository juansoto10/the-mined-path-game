const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const playerResult = document.querySelector('#result');

const startButton = document.querySelector('#start');
const tryAgainButton = document.querySelector('#try-again');
const resetRecord = document.querySelector('#reset');
const scrollDown = document.querySelector('#scroll-down');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

// -- Player position and gift position object --
const playerPos = {
    x: undefined,
    y: undefined,
}

const giftPos = {
    x: undefined,
    y: undefined,
}

// -- Bombs positions --
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

// CANVAS ANTES
/* if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7 + 30;
} else {
    if (window.innerWidth < 1660) {
        canvasSize = window.innerWidth * 0.35 + 30;
    } else {
        canvasSize = window.innerHeight * 0.68 + 30;
    }
} */


// -- Setting canvas size --
function setCanvasSize() {
    if (window.innerHeight >= 826) {
        if (window.innerWidth <= 670) {
            canvasSize = window.innerWidth * 0.58 + 30;
        } else if (window.innerWidth <= 1000) {
            canvasSize = window.innerWidth * 0.52 + 30;
        } else {
            canvasSize = window.innerWidth * 0.32 + 30;
        }
    } else {
        if (window.innerWidth < 440 && window.innerHeight <= 770) {
            canvasSize = window.innerWidth * 0.72 + 30;
        } else if (window.innerWidth <= 670 && window.innerHeight <= 770) {
            canvasSize = window.innerHeight * 0.47 + 30;
        } else if (window.innerWidth <= 670 && window.innerHeight > 770) {
            canvasSize = window.innerWidth * 0.76 + 30;
        } else if (window.innerWidth > 670 && window.innerHeight > 510) {
            canvasSize = window.innerWidth * 0.45 + 30;
        } else if (window.innerWidth > 670 && window.innerHeight < 510) {
            canvasSize = window.innerHeight * 0.62 + 30;
        } 
    }
    
    if (window.innerWidth <= 1000) {
        scrollDown.classList.remove('inactive');
    } else {
        scrollDown.classList.add('inactive');
    }
    


    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize - 30) / 10;

    startGame();
}

// -- Rendering the map and the player after each move --
function startGame() {
    console.log({ canvasSize, elementsSize })

    game.font = (elementsSize - 12) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        win();
        return;
    }

    /* if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 0.0000000000001);
        showRecord();
    } */
    

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowsCols});

    showLives();

    bombsPos = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1) + 20;
            const posY = elementsSize * (rowIndex + 1);

            // console.log({ row, rowIndex, col, colIndex, emoji });

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


// -- Render player position --
function movePlayer() {
    // const giftCollisionX = playerPos.x < giftPos.x + 0.1 && playerPos.x > giftPos.x - 0.1;
    // const giftCollisionY = playerPos.y < giftPos.y + 0.1 && playerPos.y > giftPos.y - 0.1; 
    
    const giftCollisionX = playerPos.x.toFixed(3) == giftPos.x.toFixed(3); 
    const giftCollisionY = playerPos.y.toFixed(3) == giftPos.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelUp();
    } 
    
    const bombCollision = bombsPos.find(bomb => {
        const bombCollisionX = bomb.x.toFixed(3) == playerPos.x.toFixed(3);
        const bombCollisionY = bomb.y.toFixed(3) == playerPos.y.toFixed(3);
        return bombCollisionX && bombCollisionY;
    });

    if (bombCollision) {
        /* game.fillText(emojis['COLLISION'], playerPos.x, playerPos.y);  */
        lose();
    }

    console.log(`x = ${playerPos.x}, y = ${playerPos.y}`)
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y); 
}

function levelUp() {
    console.log('Level up Gorzobia!');
    level++;

    const map = maps[level];

    if (map) {
        playerPos.x = undefined;
        playerPos.y = undefined;
    }
    
    startGame();
}

function lose() {
    console.log('No te tocaba, mano. Qué tristeza :c');

    game.fillText(emojis['COLLISION'], playerPos.x, playerPos.y);

    lives--;

    console.log(`Lives: ${lives}`);

    if (lives <= 0) {
        level = 0;
        lives = 3;
        clearInterval(timeInterval);
        timeStart = undefined;
        startButton.classList.add('inactive');
        tryAgainButton.classList.remove('inactive');
        playerResult.innerHTML = 'You lose all your lives 💀. Try again.';
        /* setTimeout(playAgain, 3500) */
        // Do something in PlayAgain!! and remove return
        return
    }
    
    playerPos.x = undefined;
    playerPos.y = undefined;

    
    setTimeout(startGame, 280)
    /* startGame(); */
}

function win() {
    console.log('You have completed the game, Manito');
    // Win message <--
    clearInterval(timeInterval);
    
    // function setRecord() ***
    const recordTime = localStorage.getItem('record_time');
    let playerTime = ((Date.now() - timeStart)/1000).toFixed(2);
    playerTime = Number(playerTime);

    if (recordTime) {
        if (recordTime >= playerTime) {
            startButton.classList.add('inactive');
            tryAgainButton.classList.remove('inactive');
            localStorage.setItem('record_time', playerTime);
            playerResult.innerHTML = `You won and set a new record! Your time: ${playerTime} s. Prove yourself again 😌`;
        } else {
            startButton.classList.add('inactive');
            tryAgainButton.classList.remove('inactive');
            playerResult.innerHTML = `You won, but you did not beat the record 💀. Your time: ${playerTime} s`;
        }
    } else {
        startButton.classList.add('inactive');
        tryAgainButton.classList.remove('inactive');
        localStorage.setItem('record_time', playerTime);
        playerResult.innerHTML = `You won and set a new record! Your time: ${playerTime} s. Prove yourself again 😌`;
    }

    console.log({recordTime, playerTime});
}


function play() {

    startGame()

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 0.0000000000001);
        showRecord();
    }
}

startButton.addEventListener('click', play);


function tryAgain() {
    playerPos.x = undefined;
    playerPos.y = undefined;
    playerResult.innerHTML = '';
    level = 0;
    lives = 3;
    timeStart = undefined;

    play()
}

tryAgainButton.addEventListener('click', tryAgain)


function reset() {
    console.log('reset record');
    localStorage.removeItem('record_time');
}

resetRecord.addEventListener('click', reset);


// -- Lives, Time and Record --
function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']);
    console.log(heartsArray);

    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
    spanTime.innerHTML = ((Date.now() - timeStart)/1000).toFixed(2);
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}


// -- Events --
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);


// -- Player movement --
function moveByKeys(event) {
    console.log(event);
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
    console.log('Up pressed');

    if (timeStart) {
        if ((playerPos.y - elementsSize) < elementsSize - 0.01) {
            console.log('OUT');
        } else {
            playerPos.y -= elementsSize;
            startGame();
        }
    } 
}

function moveLeft() {
    console.log('Left pressed');

    if (timeStart) {
        if ((playerPos.x - elementsSize) < elementsSize - 0.01) {
            console.log('OUT');
        } else {
            playerPos.x -= elementsSize;
            startGame();
        }
    }
}

function moveRight() {
    console.log('Right pressed');

    if (timeStart) {
        if ((playerPos.x + elementsSize) > (canvasSize) + 0.01) {
            console.log('OUT')
        } else {
            playerPos.x += elementsSize;
            startGame();
        }
    }
}

function moveDown() {
    console.log('Down pressed');

    if (timeStart) {
        if ((playerPos.y + elementsSize) > (canvasSize) + 0.01) {
            console.log('OUT');
        } else {
            playerPos.y += elementsSize;
            startGame();
        }  
    }
}
