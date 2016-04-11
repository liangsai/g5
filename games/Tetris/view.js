/****视图类****/
function View(canvas, tetris){
    this.canvas = canvas;
    this.tetris = tetris;
}

View.prototype.start = function(){
    this.timer = setInterval(this.run, 200, this);
}

View.prototype.run = function(self){
    var cell_size = 20;
    var stack = self.tetris.stack;
    var context = self.canvas.getContext("2d");
    context.clearRect(0, 0, self.canvas.width, self.canvas.height);

    //绘制堆
    context.shadowColor = "gray";
    context.shadowBlur = "10";
    context.shadowOffsetX = "3";
    context.shadowOffsetY = "3";
    context.strokeStyle = "white";
    for(var i=0;i<stack.length;i++){
	for(var j=1;j<stack[i].length;j++){
	    if(stack[i][j] == 0){
		context.fillStyle = "black";
		context.fillRect(
		    i*cell_size,
		    j*cell_size,
		    cell_size,
		    cell_size
		);
	    }else{
		context.fillStyle = self.tetris.colors[i][j];
		context.fillRect(
		    i*cell_size,
		    j*cell_size,
		    cell_size,
		    cell_size
		);
		context.strokeRect(
		    i*cell_size,
		    j*cell_size,
		    cell_size,
		    cell_size
		);
	    }
	}
    }
    context.shadowColor = "black";
    context.shadowBlur = "0";
    context.shadowOffsetX = "0";
    context.shadowOffsetY = "0";

    //绘制结束提示
    if(self.tetris.status == false){
	var left = cell_size*(stack.length-8)/2;
	var top = cell_size*(stack[0].length-1)/2;
	context.fillStyle = "red";
	context.strokeStyle = "white";
	context.font = "40px sans-serif";

	context.fillText("游戏结束",left,top);
	context.strokeText("游戏结束",left,top);

	left = cell_size*(stack.length-7)/2;
	top = top + cell_size;
	context.font = "20px sans-serif";
	context.fillText(
	    "您的分数："+self.tetris.score,
	    left,
	    top+cell_size
	);

	return;
    }

    //绘制方块
    var block = self.tetris.queue[0];
    var shape = block.shape;
    var pos = block.pos;
    context.strokeStyle = "white";
    context.fillStyle = block.color;
    for(var i=0;i<shape.length;i++){
	for(var j=0;j<shape[i].length;j++){
	    if(shape[i][j] != 0){
		context.fillRect(
		    (i + pos.x)*cell_size,
		    (j + pos.y)*cell_size,
		    cell_size,
		    cell_size
		);

		context.strokeRect(
		    (i + pos.x)*cell_size,
		    (j + pos.y)*cell_size,
		    cell_size,
		    cell_size
		);
	    }
	}
    }

    //绘制下一个方块
    var block = self.tetris.queue[1];
    var offsetX = stack.length*cell_size + 10;
    var offsetY = 0;
    context.fillStyle = "black";
    context.fillRect(offsetX,0,3*cell_size,3*cell_size);
    context.fillStyle = block.color;
    context.strokeStyle = "white";
    for(var i=0;i<block.shape.length;i++){
	for(var j=0;j<block.shape[i].length;j++){
	    if(block.shape[i][j] != 1)
		continue;
	    context.fillRect(
		offsetX + i*cell_size,
		offsetY + j*cell_size,
		cell_size,
		cell_size
	    );
	    context.strokeRect(
		offsetX + i*cell_size,
		offsetY + j*cell_size,
		cell_size,
		cell_size
	    );
	}
    }

    //绘制得分
    context.fillStyle = "black";
    context.fillRect(0, 0, stack.length*cell_size, cell_size);
    context.fillStyle = "white";
    context.font = "16px sans-serif";
    context.textBaseline = "top";
    context.fillText("您的分数："+self.tetris.score, 0, 0);
}

View.prototype.stop = function(){
    clearInterval(this.timer);
}
