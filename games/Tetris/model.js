/****方块类****/
function Block(color, shape){
    this.color = color;
    this.shape = shape;
    this.pos = new Position(0,0);
}

Block.prototype.clone = function(){
    return new Block(this.color, this.shape);
}

//方块变形
Block.prototype.transform = function(){
    //创建数组
    var tmpShape = new Array();
    for(var i=0;i<this.shape[0].length;i++){
	var col = new Array();
	for(var j=this.shape.length-1;j>=0;j--){
	    col.push(this.shape[j][i]);
	}
	tmpShape.push(col);
    }

    this.shape = tmpShape;
}

//向左
Block.prototype.left = function(){
    this.pos.x--;
}

//向右
Block.prototype.right = function(){
    this.pos.x++;
}

//设置方块位置
Block.prototype.setPos = function(x, y){
    this.pos = new Position(x, y);
}

/****俄罗斯方块****/
function Tetris(colors, shapes, width, height){
    this.queueLen = 3;
    this.status = true;
    this.score = 0;
    this.stack = Array2D(width, height);
    this.colors = Array2D(width, height);
    this.blocks = new Array();
    this.queue = new Array();

    this.init(colors, shapes);
}

//初始化数据
Tetris.prototype.init = function(colors,shapes){
    //构造候选方块
    for(var i=0;i<shapes.length;i++){
	var block = new Block(colors[i],shapes[i]);
	this.blocks.push(block);
    }

    //初始化队列
    for(var i=0;i<this.queueLen;i++){
	var block = this.getBlock();
	this.queue.push(block);
    }
}

//获取新的方块
Tetris.prototype.getBlock = function(){
    var index = Math.floor(Math.random() * this.blocks.length);
    return this.blocks[index].clone();
}

//向下移动方块
Tetris.prototype.move = function(){
    /*if(this.connected()){
	this.resolveChange();
	return;
    }*/

    this.resolveChange();
    if(this.connected())
	return;
    var block = this.queue[0];
    block.pos.y += 1;
    //this.resolveChange();
}

//加速
Tetris.prototype.accelerate = function(){
    while(!this.connected()){
	this.queue[0].pos.y++;
    }
    this.resolveChange();
}

//处理变化
Tetris.prototype.resolveChange = function(){
    if(this.connected()){
	this.merge();
	if(this.isFull()){
	    this.status = false;
	    return;
	}

	this.queue.push(this.getBlock());
	this.queue.shift();
    }
}

//判断方块和方块堆是否碰撞
Tetris.prototype.connected = function(){
    var block = this.queue[0];
    var posX = block.pos.x;
    var posY = block.pos.y;
    var shape = block.shape;

    for(var i=shape[0].length-1;i>=0;i--){
	for(var j=0;j<shape.length;j++){
	    if(posY+i+1 == this.stack[0].length)
		return true;
	    if(
		shape[j][i] == 1 &&
		this.stack[posX+j][posY+i+1] == 1
	    )
		return true;
	}
    }

    return false;
}

//查看是否已满
Tetris.prototype.isFull = function(){
    for(var i=0;i<this.stack.length;i++){
	if(this.stack[i][1] != 0)
	    return true;
    }

    return false;
}

//将方块加入堆中
Tetris.prototype.merge = function(){
    var block = this.queue[0];
    var posX = block.pos.x;
    var posY = block.pos.y;
    var shape = block.shape;

    for(var i=0;i<shape.length;i++){
	for(var j=0;j<shape[i].length;j++){
	    if(shape[i][j] == 1){
		this.stack[posX+i][posY+j] = 1;
		this.colors[posX+i][posY+j] = block.color;
	    }
	}
    }

    //移除已满的行
    var removedLines = new Array();
    for(var i=0;i<this.stack[0].length;i++){
	var full = true;
	for(var j=0;j<this.stack.length;j++){
	    if(this.stack[j][i] == 0){
		full = false;
		break;
	    }
	}

	//将当前行加入需移除的行
	if(full == true){
	    removedLines.push(i);
	    for(var j=0;j<this.stack.length;j++){
		this.stack[j].splice(i, 1);
		this.colors[j].splice(i, 1);
	    }
	    //在头部加入空行
	    for(var j=0;j<this.stack.length;j++){
		this.stack[j].unshift(0);
		this.colors[j].unshift(0);
	    }
	    this.score += 10;
	}
    }
}

//变换方块
Tetris.prototype.transform = function(){
    var block = this.queue[0];
    block.transform();
    //判断是否超出边界
    var offset = this.stack.length - block.shape.length - block.pos.x;
    if(offset < 0){
	block.pos.x += offset;
    }
}

//向左移动方块
Tetris.prototype.left = function(){
    var block = this.queue[0];
    var shape = block.shape;
    var posX = block.pos.x - 1;
    var posY = block.pos.y;
    if(posX < 0)
	return;

    //判断是否会有重叠区域
    for(var i=0;i<shape.length;i++){
	for(var j=0;j<shape[i].length;j++){
	    if(this.stack[posX+i][posY+j] == 1 && shape[i][j] == 1)
		return;
	}
    }

    //左移方块
    block.left();
}

//向右移动方块
Tetris.prototype.right = function(){
    var block = this.queue[0];
    var shape = block.shape;
    var posX = block.pos.x + 1;
    var posY = block.pos.y;
    if(posX > this.stack.length - shape.length)
	return;

    //判断是否会有重叠区域
    for(var i=shape.length-1;i>=0;i--){
	for(var j=0;j<shape[i].length;j++){
	    if(this.stack[posX+i][posY+j] == 1 && shape[i][j] == 1)
		return;
	}
    }

    //右移方块
    block.right();
}
