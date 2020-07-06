class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }


    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }
        runner1 = createSprite(10, 200);
        runner1.scale = 1;
        runner1.setCollider("rectangle", 0, 0)
        runner1.debug = false;
        runner1.velocityY = 2;
        runner1.addImage("runner1", runner1_img);

        runner2 = createSprite(10, 350);
        runner2.scale = 1;
        runner2.velocityY = 2;
        runner2.setCollider("rectangle", 0, 0);
        runner2.debug = false;
        runner2.addImage("runner2", runner2_img);

        runner3 = createSprite(10, 400);
        runner3.scale = 1;
        runner3.setCollider("rectangle", 0, 0)
        runner3.debug = false;
        runner3.velocityY = 2;
        runner3.addImage("runner3", runner3_img);

        runner4 = createSprite(10, 100);
        runner4.scale = 1;
        runner4.setCollider("rectangle", 0, 0)
        runner4.debug = false;
        runner4.velocityY = 2;
        runner4.addImage("runner4", runner4_img);

        runners = [runner1, runner2,runner3,runner4];

        invisibleGround1 = createSprite(100, 500, displayWidth * 5, 20);
        invisibleGround1.setCollider("rectangle", 0, 0);
        invisibleGround1.debug = false;
        invisibleGround1.visible=false;


        invisibleGround2 = createSprite(100, 700, displayWidth * 5, 20);
        invisibleGround2.setCollider("rectangle", 0, 0);
        invisibleGround2.debug = false;
        invisibleGround2.visible=false;

        invisibleGround3 = createSprite(100, 180, displayWidth * 5, 20);
        invisibleGround3.setCollider("rectangle", 0, 0);
        invisibleGround3.debug = false;
        invisibleGround3.visible=false;

        invisibleGround4 = createSprite(100, 330, displayWidth * 5, 20);
        invisibleGround4.setCollider("rectangle", 0, 0);
        invisibleGround4.debug = false;
        invisibleGround4.visible=false;

    }
    play() {
        form.hide();
        Player.getPlayerInfo();
        spawnObstacles();
        spawnObstacles1();
        spawnObstacles2();
        spawnObstacles3();


        if (allPlayers !== undefined) {
            //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

            //index of the array
            var index = 0;
            //x and y position of the cars
            var y = 140;
            var x = 50;


            runner1.collide(invisibleGround1);
            runner2.collide(invisibleGround2);
            runner3.collide(invisibleGround3);
            runner4.collide(invisibleGround4);

            for (var plr in allPlayers) {
                index = index + 1;


                y = y + 260;
                //use data form the database to display the cars in x direction
                x = 360 - allPlayers[plr].distance;

                runners[index - 1].x = x;
                runners[index - 1].y = y;
                
                if (index === player.index) {
                    // console.log("yes")
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    runners[index - 1].shapeColor = "red";
                    camera.position.x = runners[index - 1].x;
                    camera.position.y = runners[index - 1].y;
                    player.x = x;
                    player.y = y;


                    if (keyDown("space")) {
                       runners.setVelocityYEach = -4;

                    }
                  
                }
             if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 3
                    player.update();
                }
            }

        }

        if(player.distance > 3860){
            gameState = 2;
            player.rank+=1;
            Player.updateCarsAtEnd(player.rank);
          }

        if(runner1.collide(obstacle)) {
            runner1.setVelocityX = 0;
        }
        if(runner2.collide(obstacle)) {
            runner2.setVelocityX = 0;
        }
        if(runner3.collide(obstacle)) {
            runner3.setVelocityX = 0;
        }
        if(runner4.collide(obstacle)) {
            runner4.setVelocityX = 0;
        }
         
          drawSprites();
        }
      
        end(){
          console.log("Game Ended");
          console.log("Your Rank:"+player.rank);
        }
}

function spawnObstacles() {
    var i = 0;
    if (frameCount % 360 === 0) {
        i = i + 1000
        obstacle = createSprite(600, 125);
        obstacle.visible=true;
        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);

        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;
    }
}

function spawnObstacles1() {
    if (frameCount % 360 === 0) {

        obstacle = createSprite(900, 385);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);
        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;

    }
}

    function spawnObstacles2() {
        if (frameCount % 360 === 0) {
    
            obstacle = createSprite(1100, 645);
    
            obstacle.velocityX = -2;
            obstacle.addImage(hurdle);
            obstacle.scale = 0.80;
            obstacle.lifetime = 800;
            obstacle.setCollider("rectangle", -10, 0, 90, 150);
            obstacle.debug = true;
    
        }
    }

    function spawnObstacles3() {
        if (frameCount % 360 === 0) {
    
            obstacle = createSprite(750, 205);
    
            obstacle.velocityX = -2;
            obstacle.addImage(hurdle);
            obstacle.scale = 0.80;
            obstacle.lifetime = 800;
            obstacle.setCollider("rectangle", -10, 0, 90, 150);
            obstacle.debug = true;
    
        }
    }
