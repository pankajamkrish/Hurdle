var canvas, backgroundImage;
var obstacle ;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;

var track, runner1_img, runner2_img, runner3_img, runner4_img, hurdle, invisibleGround1, invisibleGround2,invisibleGround3,invisibleGround4;

function preload() {
    hurdle = loadImage("../images/hurdle.png");
    track = loadImage("../images/tra.jpg");
    runner1_img = loadImage("b.png", "p.png", "y.png");
    runner2_img = loadImage("b.png", "p.png", "y.png");
    runner3_img = loadImage("b.png", "p.png", "y.png");
    runner4_img = loadImage("b.png", "p.png", "y.png");
}

function setup() {
    canvas = createCanvas(displayWidth-20,displayHeight-30);
    database = firebase.database();
    obstacle = createSprite(0,0);
    obstacle.visible = false
    game = new Game();
    game.getState();
    game.start();
}


function draw() {
    if (playerCount === 4) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
}