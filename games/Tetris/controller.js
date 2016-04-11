var shapes = new Array();
var colors = ['red','orange','yellow','green','blue','cyan','purple'];
var blocks;
var queue;
var stack;
var rule;
var view;
var canvas;

function main(){
    shapes.push([[1,1,1]]);
    shapes.push([[1,0,0], [1,1,1]]);
    shapes.push([[1,1], [1,1]]);
    shapes.push([[1,1,1], [1,0,0]]);
    shapes.push([[1,0], [1,1], [0,1]]);
    shapes.push([[0,1], [1,1], [1,0]]);
    shapes.push([[1,0], [1,1], [1,0]]);

    tetris = new Tetris(colors, shapes, 10, 18);
    canvas = document.getElementById("canvas");
        
    rule = new Rule(tetris);
    view = new View(canvas, tetris);
    window.addEventListener("keydown", keyPressed, true);

    rule.start();
    view.start();
}

//按键被按下
function keyPressed(event){
    switch(event.keyCode){
	//变形
	case 38:
	case 40:
	tetris.transform();
	break;

	//移动
	case 37:
	tetris.left();
	break;

	case 39:
	tetris.right();
	break;

	//加速
	case 32:
	tetris.accelerate();
	break;
    }
}
