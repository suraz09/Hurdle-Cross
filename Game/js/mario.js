// JavaScript Document

getHighScore();
var currenthighscore;

var bdy= document.getElementsByTagName("body");
var mario= document.createElement("div");
var success_img= document.getElementById("success");
var name= prompt("Please Enter Your Name");

var current_score= document.getElementById("current-score");

var upObstacle= document.createElement("div");
var bottomObstacle= document.createElement("div");

var coin_div= document.createElement("div");
var coin_left= 700;
var coin_width= 200;
coin_div.className= "coindiv";

coin_div.style.left= coin_left + "px"; 
coin_div.style.top= "550px";
coin_div.style.width= coin_width +"px";

mario.className= "mario";
upObstacle.className= "up-obstacle";
bottomObstacle.className= "bottom-obstacle";

var shift_x= 20; 
var left_bottom= 800;
var obstacle_width= 200;

var left_up= 500; 
var jump_value= 550;
var godown_value= 615;
var flag_jump= 0;
var score= 0;
var speed= 100;

bdy[0].onkeydown= function(e)
{
	
	//alert("dsa");
	//alert(c);
	if (e.keyCode == '38')
	{
		mario.style.top= godown_value- 65+ "px";
		flag_jump= 1;
	
		
	}
}


function movecoin(){
	coin_div.style.left= coin_left+ "px";
	coin_left-= 10;	
	
	if (coin_left < -300)
	{
		coin_left= Math.floor(Math.random() * (900-700) + 700);
		coin_width= 40 * Math.floor(Math.random() * (5 - 1) + 1);
		coin_div.style.width= coin_width + "px";	
	}
	
}

function shiftobstacles(){
	
	bottomObstacle.style.left= left_bottom + "px";
	bottomObstacle.style.width= obstacle_width+ "px";
	left_bottom-= 10;  	
	if (mario.style.top == "615px")
		flag_jump= 0;
	if (left_bottom == 230 && flag_jump == 0 ) // game over condition
	{	
		//alert(Math.floor(score/5));
		document.getElementById("id2").pause();
		document.getElementById("over").play();
		clearInterval(horsesound);
		clearInterval(sh_interval);
		clearInterval(coin);
		clearInterval(scorecoin);
		clearInterval(bg);
		
		PostData();
		if (score > parseInt(currenthighscore))
		{
			 document.getElementById('game-over').innerHTML += "Congratulations for your High Score!";
			PostHighScore();
		}
	}
	if (left_bottom < 240 && flag_jump == 1)//standing on the div
	{
		godown_value= 550;	
	}
	if (left_bottom < 240- obstacle_width-10 && flag_jump ==1)//jumping from div
	{
		godown_value= 615;
		flag_jump= 0;	
	}
	if (left_bottom < -400)
	{
		flag_jump= 0;	
		left_bottom = 900;
		obstacle_width= Math.floor(Math.random() * (500-300) + 300);
		document.getElementById("train").play();
		
	}
	
}
function gomariodown(){
	
	mario.style.top= godown_value + "px";
}


function earncoin(){
	
	if (Math.floor(score/5)== 50)
	{
		success_img.style.display= "block";
	}
	
	var temp= coin_width;
	//alert(coin_left);
	if (coin_left < 240 && coin_left > coin_width)
	{
		//alert(coin_width);
		if( coin_div.style.top == mario.style.top)
		{
			coin_width-= 40;
			if (coin_width > -40)
				score+= (temp- coin_width)/40;
			temp= coin_width; 
			coin_div.style.width= coin_width + "px";
			document.getElementById("coin").play();
			current_score.innerHTML= Math.floor(score);
		}
	}
		
}

var pox= 90;
function repeatbg()
{
	pox+= 10;
	document.body.style.backgroundPosition= -pox + "px 0" +"px"; 	
	
}
function horse_move(){

document.getElementById("id2").play();
	
}

function getHighScore(){
	 var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        alert("Ajax is not supported by this browser");
    }
   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 ) {
				currenthighscore= xhr.responseText;
                document.getElementById('high-score').innerHTML += xhr.responseText;
				
            }
        }
    }
    
    xhr.open('GET', 'highscore.txt', false);
    xhr.send();
}
	
function PostHighScore(){
	var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        alert("Ajax is not supported by this browser");
    }
   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 ) {
                //document.getElementById('game-over').innerHTML += xhr.responseText;
				//document.getElementById('game-over').style.display= "block";
            }
        }
    }
    
    xhr.open('POST', 'highscore.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("score=" +Math.floor(score));

}
	
	


function PostData() {
    
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        alert("Ajax is not supported by this browser");
    }
   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 ) {
                document.getElementById('game-over').innerHTML += xhr.responseText;
				document.getElementById('game-over').style.display= "block";
            }
        }
    }
    
    xhr.open('POST', 'verify1.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("userid=" + name + " " +Math.floor(score) + "\n");
}




var horsesound= setInterval(horse_move, 10)



var bg= setInterval(repeatbg,100);


bdy[0].appendChild(mario);
bdy[0].appendChild(bottomObstacle);
//bdy[0].appendChild(upObstacle);
bdy[0].appendChild(coin_div);

var sh_interval= setInterval(shiftobstacles, speed);
var mario_down= setInterval (gomariodown, 500);
var coin= setInterval(movecoin, 100);
var scorecoin= setInterval(earncoin, 100);
//var up_interval= setInterval(upobstacle, 100);