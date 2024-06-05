// Constants
const GRID_SIZE = 50; // Size of each grid cell
const PLAYER_SIZE = 40; // Size of the player square
const ENEMY_SIZE = 40; // Size of the enemy square
const StartX = -100; // Start X location 
const StartY = 0; // STar Y location 



//Variable
var NotColliding = true

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



// Player object
let player = {
    x: 100,
    y: 100,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    color: 'blue'
};

// Enemy object
let SetObject = {
    x: 400,
    y: 300,
    width: ENEMY_SIZE,
    height: ENEMY_SIZE,
    color: 'red'
};

// Function to draw objects
function drawObject(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Function to check collision between two objects
function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// Function to snap position to grid
function snapToGrid(pos) {
    return Math.round(pos / GRID_SIZE) * GRID_SIZE;
}

// Update game state
function update() {
    // Check collision between player and enemy
    if (checkCollision(player, SetObject)) {
        console.log('Collision detected!');
            player.x = StartX
            player.y = StartY
            NotColliding = false
    }
    else   
        NotColliding = true


// Mouse event listeners
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    // Check if mouse click is inside the player object
    if (mouseX >= player.x && mouseX <= player.x + player.width &&
        mouseY >= player.y && mouseY <= player.y + player.height) {
        player.isDragging = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (player.isDragging && NotColliding) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        // Update player position to mouse coordinates
        player.x = mouseX - player.width / 2; // Adjust to center the player horizontally
        player.y = mouseY - player.height / 2; // Adjust to center the player vertically
    }
});

canvas.addEventListener('mouseup', () => {
    player.isDragging = false;
});



// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    // Draw player and enemy
    drawObject(player);
    drawObject(SetObject);
}

// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}


        
// Start the game loop
gameLoop();

