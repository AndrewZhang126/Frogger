/**
 * Created by zhang5170 on 11/28/2017.
 */
var a;
var frog;
var car1 =[];
var car2 = [];
var log1 = [];
var log2 = [];
var onLog = false;
var lvlUp = 0;
var highScr = 0;
var carMove = 1.5;
var logMove = 2;
var myTimer;
var lives = 3;
var startGame = false;
var dif = 0;
var enter = 0;
var createImage = function(src, title, xcoor, ycoor){
    var img = new Image();
    img.src = src;
    img.alt = title;
    img.title= title;
    img.left = xcoor;
    img.top = ycoor;
    return img;
};

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    if(charCode == 119){
        frog.top = frog.top - 97;
        dif = 0;
    }
    if(charCode == 97){
        frog.left = frog.left - 97;
        dif = 0;
    }
    if(charCode == 115){
       frog.top = frog.top + 97;
       dif = 0;
    }
    if(charCode == 100){
        frog.left = frog.left + 97;
        dif = 0;
    }
    if(charCode == 13){
        if (enter == 0){
            startGame = true;
            startTimer();
            document.getElementById("lives").innerHTML = "Lives Left:" + lives;
            document.getElementById("restart").innerHTML = "Click Reset To Restart";
            document.getElementById("score1").innerHTML = "Current Score:" + lvlUp;
            document.getElementById("score2").innerHTML = "High Score:" + highScr;
            document.getElementById("reset").style.visibility = "visible";
            animate();
            enter++;
        }
    }
};

function initialize() {
    drawScreen();
    car2.push(createImage("images/car4.png", "Car4", 100, 825));
    car2.push(createImage("images/car4.png", "Car4", 400, 825));
    car2.push(createImage("images/car4.png", "Car4", 800, 825));
    car2.push(createImage("images/car4.png", "Car4", 1100, 825));
    car2.push(createImage("images/car4.png", "Car4", 1400, 825));
    car2.push(createImage("images/car4.png", "Car4", 1700, 825));
    car2.push(createImage("images/car3.png", "Car3", 0, 640));
    car2.push(createImage("images/car3.png", "Car3", 300, 640));
    car2.push(createImage("images/car3.png", "Car3", 600, 640));
    car2.push(createImage("images/car3.png", "Car3", 900, 640));
    car2.push(createImage("images/car3.png", "Car3", 1200, 640));
    car2.push(createImage("images/car3.png", "Car3", 1600, 640));
    car1.push(createImage("images/car2.png", "Car2", 0, 548));
    car1.push(createImage("images/car2.png", "Car2", 300, 548));
    car1.push(createImage("images/car2.png", "Car2", 600, 548));
    car1.push(createImage("images/car2.png", "Car2", 900, 548));
    car1.push(createImage("images/car2.png", "Car2", 1200, 548));
    car1.push(createImage("images/car2.png", "Car2", 1500, 548));
    car1.push(createImage("images/car1.png", "Car1", 100, 735));
    car1.push(createImage("images/car1.png", "Car1", 400, 735));
    car1.push(createImage("images/car1.png", "Car1", 700, 735));
    car1.push(createImage("images/car1.png", "Car1", 1000, 735));
    car1.push(createImage("images/car1.png", "Car1", 1300, 735));
    car1.push(createImage("images/car1.png", "Car1", 1600, 735));
    car1.push(createImage("images/car1.png", "Car1", -200, 735));
    log1.push(createImage("images/log.png", "Log1", 0, 230));
    log1.push(createImage("images/log.png", "Log1", 550, 230));
    log1.push(createImage("images/log.png", "Log1", 1150, 230));
    log1.push(createImage("images/log.png", "Log1", 50, 425));
    log1.push(createImage("images/log.png", "Log1", 600, 425));
    log1.push(createImage("images/log.png", "Log1", 1200, 425));
    log2.push(createImage("images/log.png", "Log2", 50, 130));
    log2.push(createImage("images/log.png", "Log2", 600, 130));
    log2.push(createImage("images/log.png", "Log2", 1200, 130));
    log2.push(createImage("images/log.png", "Log2", 0, 330));
    log2.push(createImage("images/log.png", "Log2", 550, 330));
    log2.push(createImage("images/log.png", "Log2", 1150, 330));
    frog = createImage("images/frog.png", "Frog", 780, 930);
}

function startTimer(){
    var time = 30;
    var tmp = time;
    myTimer = setInterval(function(){
        var c=tmp--,m=(c/60)>>0,s=(c-m*60)+'';
        document.getElementById("timer").textContent = "Time Left Before Game Ends =" + m+':'+(s.length>1?'':'0')+s;
        tmp!=0||(tmp=time);
        if (m == 0 && s == 1){
            clearInterval(myTimer);
            cancelAnimationFrame(a);
            document.getElementById("lives").innerHTML = "Game Over. You Ran Out Of Time";
        }
    },1000);// source of code: https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
}

function animate(){
    a=requestAnimationFrame(animate);
    drawBackground();
    drawLine();
    drawCars();
    drawLogs();
    drawFrog();
    checkCollision();
    if (frog.top <500){
        checkWater();
    }
}

function drawScreen(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle="#66FF99";
    ctx.fillRect(0,0,1600,1000);
    ctx.font = "bold 180px Courier New";
    ctx.fillStyle="#000000";
    ctx.textAlign = "center";
    ctx.fillText("FROGGER",800,500);
    ctx.fillStyle="#000000";
    ctx.font = "bold 50px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("Press Enter To Begin",800,700);
    ctx.fillStyle="#000000";
    ctx.font = "bold 50px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("Use WASD To Move",800,800);
}

function drawBackground(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle="#0066FF";
    ctx.fillRect(0,0,1800,1000);
    ctx.fillStyle="#33CC33";
    ctx.fillRect(0,0,220,100);
    ctx.fillStyle="#33CC33";
    ctx.fillRect(345,0,220,100);
    ctx.fillStyle="#33CC33";
    ctx.fillRect(690,0,220,100);
    ctx.fillStyle="#33CC33";
    ctx.fillRect(1035,0,220,100);
    ctx.fillStyle="#33CC33";
    ctx.fillRect(1380,0,220,100);
    ctx.fillStyle="#33CC33";
    ctx.fillRect(0,0,1600,30);
    ctx.fillStyle="#808080";
    ctx.fillRect(0,500,1800,430);
    ctx.fillStyle="#FF66FF";
    ctx.fillRect(0,930,1800,70);
}

function drawLine(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.strokeStyle = "#FFFF00";
    ctx.beginPath();
    ctx.moveTo(20,612.5);
    ctx.lineTo(90,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(150,612.5);
    ctx.lineTo(220,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(280,612.5);
    ctx.lineTo(350,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(410,612.5);
    ctx.lineTo(480,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(540,612.5);
    ctx.lineTo(610,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(670,612.5);
    ctx.lineTo(740,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(800,612.5);
    ctx.lineTo(870,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(930,612.5);
    ctx.lineTo(1000,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1060,612.5);
    ctx.lineTo(1130,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1190,612.5);
    ctx.lineTo(1260,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1320,612.5);
    ctx.lineTo(1390,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1450,612.5);
    ctx.lineTo(1520,612.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1580,612.5);
    ctx.lineTo(1650,612.5);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20,720);
    ctx.lineTo(90,720);
    ctx.lineWidth = 5;
    ctx.moveTo(150,720);
    ctx.lineTo(220,720);
    ctx.lineWidth = 5;
    ctx.moveTo(280,720);
    ctx.lineTo(350,720);
    ctx.lineWidth = 5;
    ctx.moveTo(410,720);
    ctx.lineTo(480,720);
    ctx.lineWidth = 5;
    ctx.moveTo(540,720);
    ctx.lineTo(610,720);
    ctx.lineWidth = 5;
    ctx.moveTo(670,720);
    ctx.lineTo(740,720);
    ctx.lineWidth = 5;
    ctx.moveTo(800,720);
    ctx.lineTo(870,720);
    ctx.lineWidth = 5;
    ctx.moveTo(930,720);
    ctx.lineTo(1000,720);
    ctx.lineWidth = 5;
    ctx.moveTo(1060,720);
    ctx.lineTo(1130,720);
    ctx.lineWidth = 5;
    ctx.moveTo(1190,720);
    ctx.lineTo(1260,720);
    ctx.lineWidth = 5;
    ctx.moveTo(1320,720);
    ctx.lineTo(1390,720);
    ctx.lineWidth = 5;
    ctx.moveTo(1450,720);
    ctx.lineTo(1520,720);
    ctx.lineWidth = 5;
    ctx.moveTo(1580,720);
    ctx.lineTo(1650,720);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20,817.5);
    ctx.lineTo(90,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(150,817.5);
    ctx.lineTo(220,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(280,817.5);
    ctx.lineTo(350,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(410,817.5);
    ctx.lineTo(480,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(540,817.5);
    ctx.lineTo(610,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(670,817.5);
    ctx.lineTo(740,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(800,817.5);
    ctx.lineTo(870,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(930,817.5);
    ctx.lineTo(1000,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1060,817.5);
    ctx.lineTo(1130,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1190,817.5);
    ctx.lineTo(1260,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1320,817.5);
    ctx.lineTo(1390,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1450,817.5);
    ctx.lineTo(1520,817.5);
    ctx.lineWidth = 5;
    ctx.moveTo(1580,817.5);
    ctx.lineTo(1650,817.5);
    ctx.lineWidth = 5;
    ctx.stroke();
}

function drawFrog(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.drawImage(frog,frog.left,frog.top,50,50);
}

function drawCars() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for(i=0;i<car1.length;i++){
        car1[i].left += carMove;
        ctx.drawImage(car1[i], car1[i].left, car1[i].top, 70, 55);
        if (car1[i].left > 1600) {
            car1[i].left = -200;
        }
    }
    for(i=0;i<car2.length;i++){
        car2[i].left -= carMove;
        ctx.drawImage(car2[i], car2[i].left, car2[i].top, 100, 60);
        if (car2[i].left < -100) {
            car2[i].left = 1800;
        }
    }
}

function drawLogs(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for(i=0;i<log1.length;i++){
        log1[i].left += logMove;
        ctx.drawImage(log1[i], log1[i].left, log1[i].top, 200, 70);
        if (log1[i].left > 1600) {
            log1[i].left = -200;
        }
    }
    for(i=0;i<log2.length;i++){
        log2[i].left -= logMove;
        ctx.drawImage(log2[i], log2[i].left, log2[i].top, 200, 70);
        if (log2[i].left < -200) {
            log2[i].left = 1800;
        }
    }
}

function checkCollision() {
    var cars = car1.concat(car2);
    for (i = 0; i < cars.length; i++) {
        if (frog.left < cars[i].left + 70 && frog.left + 35 > cars[i].left && frog.top < cars[i].top + 35 && frog.top + 35 > cars[i].top) {
            frog.left = 800;
            frog.top = 930;
            lives = lives - 1;
            document.getElementById("lives").innerHTML = "Lives Left: " + lives;
        }
    }
    if (frog.top < 100) {
        if ((frog.left > 220 && frog.left < 345) || (frog.left > 565 && frog.left < 690) || (frog.left > 910 && frog.left < 1035) || (frog.left > 1255 && frog.left < 1380)){
            frog.left = 800;
            frog.top = 930;
            lives = lives - 1;
            document.getElementById("lives").innerHTML = "Lives Left: " + lives;
        }
        else{
            frog.left = 800;
            frog.top = 930;
            clearInterval(myTimer);
            startTimer();
            lvlUp++;
            highScr++;
            carMove = carMove + 0.1;
            logMove = logMove + 0.1;
            document.getElementById("score1").innerHTML = "Current Score:" + lvlUp;
            document.getElementById("score2").innerHTML = "High Score:" + highScr;
        }
    }
    if (frog.left > 1600) {
        frog.left = 1555;
    }
    if (frog.left < -5) {
        frog.left = 5;
    }
    if (lives  < 1){
        clearInterval(myTimer);
        document.getElementById("lives").innerHTML = "Game Over. You Ran Out Of Lives";
        cancelAnimationFrame(a);
    }
}

function checkWater() {
    var logs = log1.concat(log2);
    onLog = false;
        for (i = 0; i < logs.length; i++) {
            if (frog.left < logs[i].left + 200 && frog.left + 50 > logs[i].left && frog.top < logs[i].top + 70 && frog.top + 50 > logs[i].top) {
                if (dif == 0) {
                    dif = logs[i].left - frog.left;
                }
                frog.left = logs[i].left - dif;
                frog.top = logs[i].top + 20;
                onLog = true;
            }
        }
        if (onLog == false) {
            frog.left = 800;
            frog.top = 930;
            lives = lives - 1;
            document.getElementById("lives").innerHTML = "Lives Left: " + lives;
        }
    if (lives < 1){
        clearInterval(myTimer);
        document.getElementById("lives").innerHTML = "Game Over. You Ran Out Of Lives";
        cancelAnimationFrame(a);
    }
}

function reset() {
    cancelAnimationFrame(a);
    clearInterval(myTimer);
    drawScreen();
    lvlUp = 0;
    carMove = 1.5;
    logMove = 2;
    lives = 3;
    startGame = false;
    dif = 0;
    enter = 0;
    document.getElementById("timer").innerHTML = "";
    document.getElementById("lives").innerHTML = "";
    document.getElementById("score1").innerHTML = "";
    document.getElementById("score2").innerHTML = "";
    document.getElementById("lives").innerHTML = "";
    document.getElementById("restart").innerHTML = "";
    document.getElementById("reset").style.visibility = "hidden";
}