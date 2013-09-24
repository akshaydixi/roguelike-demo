Game.Mixins = {};

Game.Mixins.Moveable = {
    name : 'Moveable',
    tryMove : function(x, y, map){
        var tile = map.getTile(x,y);
        var target = map.getEntityAt(x,y);
        if (target){
            return false;
        }

        else if(tile.isWalkable()){
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
};

Game.Mixins.PlayerActor = {
    name : 'PlayerActor',
    groupName : 'Actor',
    act : function(){
        Game.refresh();
        this.getMap().getEngine().lock();
    }
};

Game.Mixins.FungusActor = {
    name : 'FungusActor',
    groupName : 'Actor',
    act : function(){
    }
};

Game.PlayerTemplate = {
    character : '@',
    foreground : 'white',
    background : 'black',
    mixins : [Game.Mixins.Moveable,Game.Mixins.PlayerActor]
};

Game.FungusTemplate = {
    character : 'F',
    foreground : 'green',
    mixins : [Game.Mixins.FungusActor]
};

