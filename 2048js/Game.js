var grid = document.getElementsByClassName("grid");
var arr_before = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];
var arr_now = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];
//重新开始游戏
function restart() {
	if(confirm("是否确定重新开始？")) {
		newGame();
	}
}
window.onload = function() {
	newGame();
}

//开始新的游戏
function newGame() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			document.getElementById("grid_" + i + j).innerHTML = '';
		}
	}
	newGridRandom();
	panel_before();
	score();
}
//随机选择产生数字的格子
function getGrid() {
	if(!isFull()) {
		var gArr = new Array(16);
		var indexArr = new Array();
		for(var i = 0; i < 16; i++) {
			if(isEmpty(grid[i])) {
				gArr[i] = 1;
			} else {
				gArr[i] = 0;
			}
		}
		for(var i = 0; i < 16; i++) {
			if(gArr[i] == 1) {
				indexArr.push(i);
			}
		}
		return grid[indexArr[Math.floor(Math.random() * indexArr.length)]];
	}
}
//随机产生数字2或4
function getRandom() {
	var x = Math.random();
	x < 0.5 ? x = 2 : x = 4;
	return x;
}
//随机空格子产生随机数字2或4
function newGridRandom() {
	if(!isFull())
		getGrid().innerHTML = getRandom();
}
//判断所选的格子是不是空格
function isEmpty(x) {
	if(x != null) {
		return(x.innerHTML == '');
	} else {
		return false;
	}

}
//格子是否全满
function isFull() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			var g = document.getElementById("grid_" + i + j);
			if(isEmpty(g)) {
				return false;
			}
		}
	}
	return true;
}
//是否发生了改变
function isChanged() {
	if(arr_before.toString() == arr_now.toString())
		return false;
	else
		return true;
}
//存储上一步前情况
function panel_before() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			arr_before[i][j] = parseInt(document.getElementById("grid_" + i + j).innerHTML);
		}
	}
}
//存储当前情况
function panel_now() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			arr_now[i][j] = parseInt(document.getElementById("grid_" + i + j).innerHTML);
		}
	}
}
//判断游戏是否结束（格子全满且相邻格子不相等）
function isOver() {
	var arr = new Array(4);
	if(isFull()) {
		for(var i = 0; i < 4; i++) {
			arr[i] = new Array(4);
		}
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				arr[i][j] = parseInt(document.getElementById("grid_" + i + j).innerHTML);
			}
		}
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 4; j++) {
				if(arr[i][j] == arr[i + 1][j]) {
					return false;
				}
			}
		}
		for(var j = 0; j < 3; j++) {
			for(var i = 0; i < 4; i++) {
				if(arr[i][j] == arr[i][j + 1]) {
					return false;
				}
			}
		}
		return true;
	} else {
		return false;
	}
}
//向上移动
function moveUp() {
	panel_before();
	for(var t = 0; t < 3; t++) {
		var i = 2;
		var j = 0;
		for(var i = 1; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				var currentGrid = document.getElementById("grid_" + i + j);
				var nextGrid = document.getElementById("grid_" + (i - 1) + j);
				if(isEmpty(nextGrid)) {
					nextGrid.innerHTML = currentGrid.innerHTML;
					currentGrid.innerHTML = '';
				} else if(nextGrid.innerHTML == currentGrid.innerHTML) {
					nextGrid.innerHTML = parseInt(currentGrid.innerHTML) * 2;
					currentGrid.innerHTML = '';
				}
			}
		}
	}
	panel_now();
}
//向下移动

function moveDown() {
	panel_before();
	for(var t = 0; t < 3; t++) {
		var i = 2;
		var j = 0;
		for(i = 2; i >= 0; i--) {
			for(j = 0; j < 4; j++) {
				var currentGrid = document.getElementById("grid_" + i + j);
				var nextGrid = document.getElementById("grid_" + (i + 1) + j);
				if(isEmpty(nextGrid) && !isEmpty(currentGrid)) {
					nextGrid.innerHTML = currentGrid.innerHTML;
					currentGrid.innerHTML = '';
				} else if(!isEmpty(currentGrid) && nextGrid.innerHTML == currentGrid.innerHTML) {
					nextGrid.innerHTML = parseInt(currentGrid.innerHTML) * 2;
					currentGrid.innerHTML = '';
				}
			}
		}
	}
	panel_now();
}
//向左移动
function moveLeft() {
	panel_before();
	for(var t = 0; t < 3; t++) {
		var i = 2;
		var j = 0;
		for(var j = 1; j < 4; j++) {
			for(var i = 0; i < 4; i++) {
				var currentGrid = document.getElementById("grid_" + i + j);
				var nextGrid = document.getElementById("grid_" + i + (j - 1));
				if(isEmpty(nextGrid)) {
					nextGrid.innerHTML = currentGrid.innerHTML;
					currentGrid.innerHTML = '';
				} else if(nextGrid.innerHTML == currentGrid.innerHTML) {
					nextGrid.innerHTML = parseInt(currentGrid.innerHTML) * 2;
					currentGrid.innerHTML = '';
				}
			}
		}
	}
	panel_now();
}
//向右移动
function moveRight() {
	panel_before();
	for(var t = 0; t < 3; t++) {
		var i = 2;
		var j = 0;
		for(var j = 2; j >= 0; j--) {
			for(var i = 0; i < 4; i++) {
				var currentGrid = document.getElementById("grid_" + i + j);
				var nextGrid = document.getElementById("grid_" + i + (j + 1));
				if(isEmpty(nextGrid)) {
					nextGrid.innerHTML = currentGrid.innerHTML;
					currentGrid.innerHTML = '';
				} else if(nextGrid.innerHTML == currentGrid.innerHTML) {
					nextGrid.innerHTML = parseInt(currentGrid.innerHTML) * 2;
					currentGrid.innerHTML = '';
				}
			}
		}
	}
	panel_now();
}
//获取键盘键
document.onkeydown = function(event) {
	if(isOver()) {
		alert("Game Over !");
		newGame();
	} else {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e.keyCode == 37) {
			moveLeft();
			if(isChanged()) {
				newGridRandom();
			}
		} else if(e.keyCode == 38) {
			moveUp();
			if(isChanged()) {
				newGridRandom();
			}

		} else if(e.keyCode == 39) {
			moveRight();
			if(isChanged()) {
				newGridRandom();
			}

		} else if(e.keyCode == 40) {
			moveDown();
			if(isChanged()) {
				newGridRandom();
			}
		}

	}
	score();
}
//撤回上一步
function regret() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			document.getElementById("grid_" + i + j).innerHTML = '';
		}
	}
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(!isNaN(arr_before[i][j]))
				document.getElementById("grid_" + i + j).innerHTML = arr_before[i][j];
		}
	}
	score();
}
//更换背景色
function score() {
	for(var i = 0; i < grid.length; i++) {
		if(grid[i].innerHTML != "") {
			var bk = grid[i].innerHTML;
			switch(bk) {
				case "2":
					grid[i].style.backgroundColor = "#dacebc";
					grid[i].style.color = "#987e5c";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "4":
					grid[i].style.backgroundColor = "#eecd6f";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "8":
					grid[i].style.backgroundColor = "orange";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "16":
					grid[i].style.backgroundColor = "#E9967A";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "32":
					grid[i].style.backgroundColor = "#FF6347";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "64":
					grid[i].style.backgroundColor = "red";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "128":
					grid[i].style.backgroundColor = "yellow";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "256":
					grid[i].style.backgroundColor = "green";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "512":
					grid[i].style.backgroundColor = "cyan";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "50px";
					grid[i].style.fontWeight = 600;
					break;
				case "1024":
					grid[i].style.backgroundColor = "darkblue";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "30px";
					grid[i].style.fontWeight = 600;
					break;
				case "2048":
					grid[i].style.backgroundColor = "#bf3eff";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "30px";
					grid[i].style.fontWeight = 600;
					break;
				case "4096":
					grid[i].style.backgroundColor = "#2b2b2b";
					grid[i].style.color = "#FFFFFF";
					grid[i].style.fontSize = "30px";
					grid[i].style.fontWeight = 600;
					break;
			}
		} else {
			grid[i].style.backgroundColor = "#EED5B7";
			grid[i].style.color = "#000000";
			grid[i].style.fontSize = "50px";
		}
	}
}