var palikka;
var esteet = [];
var pisteet;
var uudestaan;

function startGame() {
    palikka = new component(30, 30, "black", 10, 120);
    pisteet = new component("20px", "comicSans", "black", 280, 40, "text");
    peliAlue.start();
}

var peliAlue = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updatePeliAlue, 20);
        window.addEventListener('keydown', function (e) {
            peliAlue.keys = (peliAlue.keys || []);
            peliAlue.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function (e) {
            peliAlue.keys[e.keyCode] = false; 
          })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = peliAlue.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;      
        this.kosketaRajaa();
    }
    this.kosketaRajaa = function() {
        var lattia = peliAlue.canvas.height - this.height;
        if (this.y > lattia) {
            this.y = lattia;
        }
        var katto = this.height - peliAlue.canvas.height;
        if (this.y < katto) {
            this.y = katto;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updatePeliAlue() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < esteet.length; i += 1) {
        if (palikka.crashWith(esteet[i])) {
            location.reload(true);
            return;
        } 
    }
    peliAlue.clear();
    peliAlue.frameNo += 1;
    if (peliAlue.frameNo == 1 || everyinterval(50)) {
        x = peliAlue.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 150;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        esteet.push(new component(10, height, "#d9d9db", x, 0));
        esteet.push(new component(10, x - height - gap, "#d9d9db", x, height + gap));
    }
    for (i = 0; i < esteet.length; i += 1) {
        esteet[i].speedX = -4;
        esteet[i].newPos();
        esteet[i].update();
    }
    pisteet.text="PISTEESI: " + peliAlue.frameNo;
    pisteet.update();
    palikka.newPos();    
    palikka.update();
    
    palikka.speedX = 0;
    palikka.speedY = 0;
    if (peliAlue.keys && peliAlue.keys[65])
    {palikka.speedX = -5; }
    if (peliAlue.keys && peliAlue.keys[68])
    {palikka.speedX = 5; }
    if (peliAlue.keys && peliAlue.keys[87])
    {palikka.speedY = -5; }
    if (peliAlue.keys && peliAlue.keys[83])
    {palikka.speedY = 5; }

       

    function everyinterval(n) {
        if ((peliAlue.frameNo / n) % 1 == 0) {return true;}
        return false;
    }
 

}

