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
    enter : function() {
        var map = [];
        for ( var x = 0; x < 80; x++){
            map.push([]);
            for (var y = 0; y < 24; y++){
                map[x].push(Game.Tile.nullTile);
            }
        }
        //map generator
        var generator = new ROT.Map.Cellular(80, 24);
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
        //debug message
        console.log("Entered play screen");
    
    },
    exit : function() { console.log("Exited play screen");},
    render : function(display){
        for ( var x = 0; x < this._map.getWidth(); x++){
            for( var y = 0; y < this._map.getHeight(); y++){
                var glyph = this._map.getTile(x,y);
                var glyph = glyph.getGlyph();
                display.draw(x, y, glyph.getChar(),glyph.getForeground(), glyph.getBackground());
            }
        }
    },
    handleInput : function(inputType, inputData){
        if(inputType === 'keydown'){
            if(inputData.keyCode === ROT.VK_RETURN){
                Game.switchScreen(Game.Screen.winScreen);
            }
            else if(inputData.keyCode === ROT.VK_ESCAPE){
                Game.switchScreen(Game.Screen.loseScreen);
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


