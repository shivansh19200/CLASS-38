class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", (data)=>{
            gameState = data.val();
        })
    }

    updateState(state){
        database.ref('/').update({
            gameState: state
        });
    }

    async start(){

        if(gameState == 0){
            player = new Player();
            var pcRef = await database.ref('playerCount').once("value");
            if (pcRef.exists()) {
                playerCount = pcRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }

        car1 = createSprite(100,200,50,50);
        car2 = createSprite(300,200,50,50);
        car3 = createSprite(500,200,50,50);
        car4 = createSprite(700,200, 50,50);

        car1.addImage(car1_img);
        car2.addImage(car2_img);
        car3.addImage(car3_img);
        car4.addImage(car4_img);

        passed = false;

        cars = [car1, car2, car3, car4];
    }

    play(){
        form.hide();

        Player.getPlayerInfo();
        player.getFinishedPlayers();

        if(allPlayers != undefined){
            background(backgroundImg);
            image(track_img, 0, -displayHeight * 4, displayWidth, displayHeight*5);

            //Index of the array, xPos and yPos of the cars
            var index = 0;
            var xPos = 175;
            var yPos;

            for (let plr in allPlayers) {

                //Adding 1 to index for every loop
                index += 1;
                //Positioning cars at a fixed distance from each other
                xPos += 200;

                //Using database to get the yPos for all the cars
                yPos = displayHeight - allPlayers[plr].distance;
                cars[index -1].x = xPos;
                cars[index - 1].y = yPos;

                if (index == player.index) {
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index -1].y;
                    fill("blue");
                    ellipse(xPos, yPos, 60, 60);
                }
                textAlign(CENTER);
                textSize(32);
                fill("pink");
                stroke("lightgreen");
                text(allPlayers[plr].name, cars[index-1].x , cars[index-1].y +75);

            }
        }

        if (keyIsDown(UP_ARROW) && player.index != null && passed != true) {
            player.distance = player.distance + 10;
            console.log(player.distance);
            player.update();
        }

        if (player.distance > 3700 && passed == false) {
            Player.updateFinishedPlayers();
            player.rank = finishedPlayers;
            player.update();
            passed = true;
        }

        drawSprites();
    }

    setRank(){
        camera.position.x = 0;
        camera.position.y = 0;

        imageMode(CENTER);
        image(gold, -200, 20, 60,60);
        image(silver, -200, 80, 60,60);
        image(bronze, -200, 140, 60,60);

        Player.getPlayerInfo();
        fill("black");
        textAlign(CENTER);
        textSize(40);

        for(var plr in allPlayers){

            if (allPlayers[plr].rank == 1) {
                text("1st RANK! "+ allPlayers[plr].name, 0, 20);
            }

            else if(allPlayers[plr].rank == 2){
                text("2nd RANK! "+ allPlayers[plr].name, 0, 80);
            }

            else if (allPlayers[plr].rank == 3) {
                text("3rd RANK "+ allPlayers[plr].name, 0, 140);
            }

            else{
                text("4th RANK "+ allPlayers[plr].name + ". Better Luck next TIME!", 0, 200);
            }

        }
    }


}