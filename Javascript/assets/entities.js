Game.Mixins = {};

Game.Mixins.Moveable = {
    name : 'Moveable',
    tryMove : function(x, y, map){
        var tile = map.getTile(x,y);
        if(tile.isWalkable()){
            this._x = x;
            this._y = y;
            return true;
        }
        else if(tile.isDiggable()) {
            map.dig(x, y);
            return true;
        }
        return false;
    }
}

Game.PlayerTemplate = {
    character : '@',
    foreground : 'white',
    background : 'black',
    mixins : [Game.Mixins.Moveable]
}

