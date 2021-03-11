var database;
var gameState = 0 ;
var playerCount;
var car1, car2, car3, car4;
var cars;
var passed;
var allPlayers;
var finishedPlayers = 0;
var form, player, game;
var car1_img, car2_img, car3_img, car4_img, track_img, backgroundImg;
var gold, silver, bronze;

function preload(){
    car1_img = loadImage("images/car1.png");
    car2_img = loadImage("images/car2.png");
    car3_img = loadImage("images/car3.png");
    car4_img = loadImage("images/car4.png");

    track_img = loadImage("images/track.jpg");
    
    backgroundImg = loadImage("images/ground.png");

    gold = loadImage("images/gold_medal.png");
    silver = loadImage("images/silver_medal.png");
    bronze = loadImage("images/bronze_medal.png");
}

function setup(){
    createCanvas(displayWidth - 20 , displayHeight);
    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background(255);

    if (playerCount == 4 && finishedPlayers == 0) {
        game.updateState(1);
    }

    if(gameState == 1){
        game.play();
    }

    if (finishedPlayers == 4) {
        game.updateState(2);
    }

    if (gameState == 2 && finishedPlayers == 4) {
        game.setRank();
    }
}