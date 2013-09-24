Game.Screen = {};

Game.Screen.startScreen = {
    enter : function() { console.log("Entered start screen."); },
    exit : function() { console.log("Exited from the start screen"); },
    render : function(display) {
        display.drawText(1, 1, "%c{yellow}Javascript RogueLike");
        display.drawText(1, 2, "Press [Enter] to start !");
    },
    handleInput : function(inputType, inputData){
        if ( inputType === 'keydown'){
            if ( inputData.keyCode === ROT.VK_RETURN ){
                Game.switchScreen(Game.Screen.playScreen);
            }
        }
    }
}

Game.Screen.playScreen = {
    _map : null,
    _player : null,
    enter : function() {
        var map = [];
        var mapWidth = 500;//500;
        var mapHeight = 500;//500;
        for ( var x = 0; x < mapWidth; x++){
            map.push([]);
            for (var y = 0; y < mapHeight; y++){
                map[x].push(Game.Tile.nullTile);
            }
        }
        //Cellular map generator
        
        var generator = new ROT.Map.Cellular(mapWidth, mapHeight);
        generator.randomize(0.5);
        var totalIterations = 3;
        for ( var i = 0; i < totalIterations - 1; i++){
            generator.create();
        }
        generator.create(function(x,y,v){
            if( v == 1){
                map[x][y] = Game.Tile.floorTile;
            }
            else{
                map[x][y] = Game.Tile.wallTile;
            }
        });
        
        this._map = new Game.Map(map);
        this._player = new Game.Entity ( Game.PlayerTemplate);
        var position = this._map.getRandomFloorPosition();
        this._player.setX(position.x);
        this._player.setY(position.y);

       
        //Uniform Map Generator
        /*
        mapWidth = 250;
        mapHeight = 250;
        var generator = new ROT.Map.Uniform(mapWidth,mapHeight,{timeLimit : 5000});
        generator.create(function(x,y,v){
            if (v == 0){
                map[x][y] = Game.Tile.floorTile;
            }
            else{
                map[x][y] = Game.Tile.wallTile;
            }
        });
        this._map = new Game.Map(map);
        */
        //debug message
        console.log("Entered play screen");
    
    },
    
    
    move : function(dX , dY){
   //     console.log(this._centerX,this._centerY);
        var newX = this._player.getX() + dX;
        var newY = this._player.getY() + dY;
        this._player.tryMove(newX,newY,this._map);
    },
    
    
    exit : function() { console.log("Exited play screen");},
    
    
    render : function(display){
        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();
        var topLeftX = Math.max(0,this._player.getX() - (screenWidth/2));
        var topLeftX = Math.min(topLeftX,this._map.getWidth() - screenWidth);

        var topLeftY = Math.max(0, this._player.getY() - (screenHeight/2));
        topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);
    
        for ( var x = topLeftX; x < screenWidth + topLeftX; x++){
            for( var y = topLeftY; y < screenHeight + topLeftY; y++){
                var tile = this._map.getTile(x,y);
                display.draw(x-topLeftX, y-topLeftY, tile.getChar(),tile.getForeground(), tile.getBackground());
            }
        }
        display.draw(
                this._player.getX() - topLeftX,
                this._player.getY() - topLeftY,
                this._player.getChar(),
                this._player.getForeground(),
                this._player.getBackground());
    },
    
    
    handleInput : function(inputType, inputData){
        if(inputType === 'keydown'){
            if(inputData.keyCode === ROT.VK_RETURN){
                Game.switchScreen(Game.Screen.winScreen);
            }
            else if(inputData.keyCode === ROT.VK_ESCAPE){
                Game.switchScreen(Game.Screen.loseScreen);
            }
            if(inputData.keyCode === ROT.VK_LEFT){
                this.move(-1,0);
            }
            else if(inputData.keyCode === ROT.VK_RIGHT){
                this.move(1,0);
            }
            else if(inputData.keyCode === ROT.VK_UP){
                this.move(0,-1);
            }
            else if(inputData.keyCode === ROT.VK_DOWN){
                this.move(0,1);
            }
        }
    }
}

Game.Screen.winScreen = {
    enter : function() { console.log("Entered win screen");},
    exit : function() { console.log("Exited  win screen");},
    render : function(display){
        for( var i = 0; i < 22; i++) {
            var r = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r,g,b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
    },
    handleInput : function(inputType, inputData){
    }
}

Game.Screen.loseScreen = {
    enter : function() { console.log("Entered lose screen");},
    exit : function() { console.log("Exited lose screen");},
    render : function(display){
        for ( var  i = 0; i < 22; i ++){
            display.drawText(2, i+1, "%b{red}You lose! :(");
        }
    },
    handleInput : function(inputType, inputData){
    }
}


