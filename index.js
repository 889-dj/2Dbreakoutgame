const grid = document.querySelector(".grid")
const scoredisplay = document.querySelector('#score');
const blockwidth = 100;
const blockheight = 20;
const balldiameter = 20;
const boardwidth = 560;
const boardheight = 300;
let yDirection = 2;
let xDirection = -2;

const userstart = [230,10];
let currentPosition = userstart;

const ballstart = [270,40];
let ballcurrentPosition = ballstart;

let timerID
let score = 0;


//* create block
class block{
    constructor(xAxis , yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockwidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockheight];
        this.topRight = [xAxis + blockwidth, yAxis + blockheight];
    }
}

const blocks = [
    new block(10,270),
    new block(120,270),
    new block(230,270),
    new block(340,270),
    new block(450,270),
    new block(10,240),
    new block(120,240),
    new block(230,240),
    new block(340,240),
    new block(450,240),
    new block(10,210),
    new block(120,210),
    new block(230,210),
    new block(340,210),
    new block(450,210),
];

//*draw all my blocks
function addblocks(){
for(let i = 0; i < blocks.length; i++){
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
 }
}

addblocks();

//*add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//*draw the user
function drawUser(){
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

//* draw the ball
function drawBall(){
    ball.style.left = ballcurrentPosition[0] + 'px';
    ball.style.bottom = ballcurrentPosition[1] + 'px';
}

//*move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10;
                drawUser();
            }            
            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardwidth - blockwidth){
                currentPosition[0] += 10;
                drawUser();
            }            
            break;
    }
    user.style.left = currentPosition[0] + 'px';
}

document.addEventListener('keydown', moveUser);

//* add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//* move the ball
function moveBall(){
    ballcurrentPosition[0] += xDirection;
    ballcurrentPosition[1] += yDirection;
    drawBall();
    checkCollision();
}

timerID = setInterval(moveBall, 30);

//* check for collision
function checkCollision(){
//* check for collision with the blocks
     for(let i = 0; i < blocks.length; i++){
         if(ballcurrentPosition[0] > blocks[i].bottomLeft[0] && ballcurrentPosition[0] < blocks[i].bottomRight[0] &&
           (ballcurrentPosition[1] + balldiameter) > blocks[i].bottomLeft[1] && ballcurrentPosition[1]  < blocks[i].topLeft[1]){
               const allblocks = Array.from(document.querySelectorAll('.block'));
               allblocks[i].classList.remove('block');
               blocks.splice(i,1);
               changeDirection();
               score++
               scoredisplay.innerHTML = score;

               //* check for win
                if(blocks.length === 0){
                    scoredisplay.innerHTML = 'You Win!';
                    clearInterval(timerID);
                    document.removeEventListener('keydown', moveUser);
                }
           }
        }

    //* check for wall collision 
    if(ballcurrentPosition[0] >= (boardwidth - balldiameter) || ballcurrentPosition[1] >= (boardheight - balldiameter)
    || ballcurrentPosition[0] <= 0 ){
        changeDirection();
}
    //* check for user collision
    if(ballcurrentPosition[0] > currentPosition[0] && ballcurrentPosition[0] < (currentPosition[0] + blockwidth) &&
        ballcurrentPosition[1] > currentPosition[1] && ballcurrentPosition[1] < (currentPosition[1] + blockheight)){
            changeDirection();
        }


    //* check for game over
    if(ballcurrentPosition[1] <= 0){
        clearInterval(timerID);
        scoredisplay.innerHTML = 'you loose';
        document.removeEventListener('keydown', moveUser);
    }
}

function changeDirection(){
    if(xDirection == 2 && yDirection == 2){
        yDirection = -2;
        return;
    }
    if(xDirection == 2 && yDirection == -2){
        xDirection = -2;
        return;
    }
    if(xDirection == -2 && yDirection == -2){
        yDirection = 2;
        return;
    }
    if(xDirection == -2 && yDirection == 2){
        xDirection = 2;
        return;
    }

}
