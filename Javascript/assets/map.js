Game.Map = function(tiles) {
    this._tiles = tiles;
    //cache width and height
    
    this._width = tiles.length;
    this._height = tiles[0].length;
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


