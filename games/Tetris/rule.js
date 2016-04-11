/****游戏运行规则****/
function Rule(tetris){
    this.tetris = tetris;
}

Rule.prototype.start = function(){
    this.timer = setInterval(this.run, 500, this);
}

Rule.prototype.run = function(self){
    var tetris = self.tetris;
    var queue = tetris.queue;
    var block = queue[0];
    
    //移动方块
    tetris.move();
    if(tetris.status == false){
	self.stop();
    }
}

Rule.prototype.stop = function(){
    clearInterval(this.timer);
}
