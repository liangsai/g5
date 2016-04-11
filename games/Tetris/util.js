//创建二维数组
function Array2D(width, height){
    var array = new Array();

    for(var i=0;i<width;i++){
	var col = new Array();
	for(var j=0;j<height;j++){
	    col.push(0);
	}
	array.push(col);
    }

    return array;
}

/****位置类****/
function Position(x, y){
    this.x = x;
    this.y = y;
}
