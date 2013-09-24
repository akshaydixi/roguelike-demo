Game.Map = function(tiles) {
    this._tiles = tiles;
    //cache width and height 
    this._width = tiles.length;
    this._height = tiles[0].length;
    this._entities = [];
    this._scheduler = new ROT.Scheduler.Simple();
    this._engine = new ROT.Engine(this._scheduler);

};

Game.Map.prototype.getEngine = function(){
    return this._engine;
};

Game.Map.prototype.getEntities = function(){
    return this._entities;
};

Game.Map.prototype.getEntityAt = function(x, y){
    for (var entity in this._entities){
        if (entity.getX() == x && entity.getY() == y){
            return entity;
        }
    }
    return false;
};

Game.Map.prototype.getWidth = function(){
    return this._width;
};

Game.Map.prototype.getHeight = function(){
    return this._height;
};

Game.Map.prototype.getTile = function(x,y){
    if ( x < 0 || x >= this._width || y < 0 || y >= this._height){
        return Game.Tile.nullTile;
    }
    else{
        return this._tiles[x][y];
    }
};

Game.Map.prototype.dig = function(x,y){
    if (this.getTile(x,y).isDiggable()){
        this._tiles[x][y] = Game.Tile.floorTile;
    }
}

Game.Map.prototype.getRandomFloorPosition = function(){
        var x,y;
        do{
            x = Math.floor(Math.random() * this._width);
            y = Math.floor(Math.random() * this._height);
        }while( this.getTile(x,y) != Game.Tile.floorTile);
        return {x: x, y: y};
}

