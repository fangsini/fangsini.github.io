//speed：苹果掉落的速度；
//life：玩家的生命
//proTime：每两个苹果产生的间隔时间
var speed = 1,
	life = 3,
	proTime = 2000;
var g = new game(speed,life,proTime);
function begin() {
	g.begin();
	document.getElementById("begin").disabled = "disabled";
}
function end() {
	alert("游戏已暂停，是否继续？");
}

//游戏对象
function game(speed,life,proTime) {
	this.speed = speed;
	this.life = life;
	this.proTime = proTime;
	//设置玩家生命
	this.setLife = function() {
		document.getElementById("life").innerText = "";
		for(var i = 0;i<this.life;i++){
			var img = document.createElement("img");
			img.src = "images/life.png";
			document.getElementById("life").appendChild(img);
		}
		if(this.life == 0) {
			this.over();
		}
	},
	//失去一滴血
	this.removeLife = function() {
		var lastImg = document.getElementById("life").lastChild;
		document.getElementById("life").removeChild(lastImg);
	},
	//获取浏览器宽度
	this.clientWidth = function(){
		var width = window.innerWidth;
		if (typeof width != "number") {
			if (document.compatMode == "CSS1Compat") {
				width = document.documentElement.clientWidth;
			} else {
				width = document.body.clientWidth;
			}
		}
		return width-80;
	},
	//获取浏览器高度
	this.clientHeight = function(){
		var height = window.innerHeight;
		if (typeof width != "number") {
			if (document.compatMode == "CSS1Compat") {
				width = document.documentElement.clientHeight;
			} else {
				width = document.body.clientHeight;
			}
		}
		return height;
	},
	//游戏开始的入口
	this.begin = function() {
		this.letterAry = new letterAry(this,this.speed,
			this.proTime,this.clientWidth(),this.clientHeight());
		this.letterAry.start();
		this.setLife();
		document.getElementById("num").textContent = 0;
	},
	//游戏结束，用户选择是否重来
	this.over = function() {
		this.letterAry.stop();
		var again = confirm("游戏结束，是否重新开始？");
		if(again) {
			var g = new game(this.speed,life,this.proTime);
			g.begin();
		}
	}
}

//字母组对象
//@param game object 游戏对象
//@param speed int 降落速度
//@param proTime int 每两个字母产生的间隔时间
//@param clientWidth int 浏览器宽度
//@param clientHeight int 浏览器高度
function letterAry(game,speed,proTime,clientWidth,clientHeight) {
	this.game = game;
	var letterAry = this;
	this.speed = speed;
	this.proTime = proTime;
	this.letters = new Array();
	this.keys = new Array("abstract","assert","boolean","break","byte","case","catch",
			"char","class","const","continue","default","do","double","else","enum","extends",
			"final","finally","float","for","goto","if","implements","import","instanceof",
			"int","interface","long","native","new","package","private","protected","public",
			"return","strictfp","short","static","super","switch","synchronized","this",
			"throw","throws","transient","try","void","volatile","while");
	this.more;
	this.add = true;
	this.keydowm = true;
	//开始产生字母的入口
	this.start = function() {
		this.more = true;
		this.produceLetter();
	},
	//产生字母
	this.produceLetter = function() {
		if(letterAry.more) {
			var left = Math.floor(Math.random()*clientWidth);
			var index = Math.floor(Math.random()*26);
			var key = letterAry.keys[index];
			var ler = new letter(letterAry.game,left,true,letterAry.speed,clientHeight,key);
			ler.create();
			letterAry.letters[letterAry.letters.length] = ler;
			//判断letterAry的长度，第一次>10后字母下落速度加快、字母产生速度加快
			if(letterAry.add && letterAry.letters.length > 10) {
				letterAry.proTime -= 200;
				letterAry.speed += 1;
				letterAry.add = false;
				for(var i = 0;i<letterAry.letters.length;i++) {
					if(letterAry.letters[i].isLive) {
						letterAry.letters[i].speed +=1;
					}
				}
			}
			window.setTimeout(letterAry.produceLetter,letterAry.proTime);
		}
	},
	//停止
	this.stop = function() {
		if(this.more) {
			for(var i = 0;i < this.letters.length;i++) {
				this.letters[i].clear();
			}
		}
		this.more = false;
	},
	//键盘监听事件，点击正确时将单词清除
	this.i = -1,
	// this.change,
	document.onkeydown = function(e) {
		letterAry.i++;
		var e = e?e:event;
		for(var j = 0;j < letterAry.letters.length;j++) {
			if(letterAry.letters[j].isLive) {
				var index = j;
				break;
			}
		}
		//字母匹配到
		if(letterAry.letters[j].content.charAt(letterAry.i).charCodeAt(0)==(e.keyCode+32)) {
			letterAry.setColor(letterAry.i,letterAry.letters[j]);
			//整个单词匹配到
			if(letterAry.i == letterAry.letters[j].content.length-1) {
				letterAry.letters[j].clear();
				document.getElementById("num").textContent =
				parseInt(document.getElementById("num").textContent)+1;
				letterAry.i = -1;
			}
		}else {
			letterAry.i --;
		}
	},
	//击中字母显示高亮
	this.setColor = function(n,let) {
		var content = let.content;  //获取单词内容
		let.div.textContent = "";
		let.span = document.createElement("span");
		let.span.className = "highlight"; 
		var str = content.slice(0,n+1);  //span内容
		var str2 = content.slice(n+1);   //剩下的
		let.span.textContent = str;  //写span内容
		let.div.appendChild(let.span);
		var text = document.createTextNode(str2);
		let.div.appendChild(text);
	}
} 

// letter对象
// @param game object 游戏对象
// @param left int 左边距
// @param isLive boolean 是否存在
// @param speed int 降落速度
// @param clientHeight int 浏览器高度
// @param content string 单词

function letter(game,left,isLive,speed,clientHeight,content) {
	this.game = game;
	var letter = this;
	this.left = left;
	this.isLive = isLive;
	this.speed = speed;
	this.clientHeight = clientHeight;
	this.content = content;
	this.top;
	this.div;
	this.span;//高亮区域
	//字母的产生
	this.create = function() {
		this.div = document.createElement("div");
		this.div.textContent = content;
		this.div.className = "letter";
		this.setTop(25);
		this.setLeft(this.left);
		document.body.appendChild(this.div);
		this.drop();
	},
	//字母的下降
	this.drop = function() {
		if(letter.isLive){
			if(letter.top <= letter.clientHeight) {
				var top =letter.top + letter.speed;
				letter.setTop(top);
				window.setTimeout(letter.drop,20);
			}else {
				letter.clear();
				letter.game.life--;
				letter.game.removeLife();
				if(letter.game.life == 0) {
					letter.game.over();
				}
			}
		}
	},
	//字母的清除
	this.clear = function() {
		if(this.isLive) {
			this.isLive = false;
			this.div.parentNode.removeChild(this.div);
		}
	},
	//设置字母的顶边距
	this.setTop = function(top) {
		this.top = top;
		this.div.style.top = this.top + "px";
	},
	//设置字母的左边距
	this.setLeft = function(left) {
		this.left = left;
		this.div.style.left = this.left + "px";
	}
}