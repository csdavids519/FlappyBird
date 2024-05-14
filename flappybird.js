//board
let board;
let boardWidth = 1200;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

// bird object
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

// pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;



// physics
let velocityX = -2; // pipes moving left speed
let velocityY = 0; // bird jump speed
let gravity = 0.4;


// ON WINDOW LOAD
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used to draw on the canvas


    // // draw box bird - box removed because we have nice image of a fish bird
    // context.fillStyle = "blue";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height); // fillRect draws a rectangle according to the current fill style


    //load images
    // birdImg = new Image();
    // birdImg.src = "./fishorange.png";
    // birdImg.onload = function() {
    //     context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    // }

    // on window load call requestAnimationFrame method once, pass it the "update" function - inside "update" the RAFrame method will be called recursively 
    requestAnimationFrame(update);  // this calls requestAni//tells the browser you wish to perform an animation frame request and call a user-supplied callback function before the next repaint.
    setInterval(placePipes, 1500); // every 1.5 seconds call placePipes - create new positions to push into the pipe array
    setInterval(printArray, 1500);
    document.addEventListener("keydown", moveBird);

}

function printArray() {
    console.log(pipeArray);
}

// call animation frame to draw a rectangle to clear the previous frames
function update() {  // this created the function "update"
    requestAnimationFrame(update) // this is a recursive call back to itslef to loop the requestAnimationFrame
    context.clearRect(0, 0, board.width, board.height); // draws a large rectangle over the canvas to clear the previous drawing

    // fish/bird
    // context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height); // after the canvas is clear, draw the fish bird again with
    context.fillStyle = "blue";
    velocityY += gravity;
    bird.y += velocityY;
    context.fillRect(bird.x, bird.y, bird.width, bird.height); // after the canvas is clear, draw the fish bird again with

    // // draw box pipe from pipe array 
    context.fillStyle = "orange";
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;    // add pipe velo to each pipe X position in the array -  this would happen every time the screen is re-drawn
        context.fillRect(pipe.x,pipe.y, pipe.width, pipe.height); // draws all pipes in the array each time the update function is called
    }
}


function placePipes() {

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;


    let topPipe = {
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false  // check if the fish passed the pipe
    }

    pipeArray.push(topPipe);


    let bottomPipe = {
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);



}

function moveBird(x) {
    if (x.code == "Space"){
        //jump
        velocityY = -6;
    }
}


function detectCollision(a, b) {
    

}






console.log('hello! can you hear me?');
// console.log(pipeArray);