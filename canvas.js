var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


canvas.addEventListener("touchstart", function (e) {
    var touch = e.touches[0];
    //console.log(touch.clientX,touch.clientY);
    checkBox(touch);
    //phone.touch(touch,"start");

});
canvas.addEventListener("touchend", function (e) {
    //phone.scale = phone.scale / 1.2;
});
canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    // console.log(touch.clientX,touch.clientY);
    //phone.touch(touch,"move");
});


function Square(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    var scale = 1;
    var direction = 1;

    this.draw = function () {
        c.fillStyle = this.color;
        c.fillRect(this.x - ((150 * scale) / 2), this.y - (150 * scale / 2), 150 * scale, 150 * scale);
    }
    this.update = function (touch, status) {
        if (Math.abs(touch.clientX - this.x) < 150) {
            switch (status) {
                case "start":
                    // console.log("got me!");
                    phone.scale = phone.scale * 1.2;
                    break;
                case "move":
                    phone.x = touch.clientX;
                    phone.y = touch.clientY;
                    checkScan();
                    break;
            }
        }
    }
}

function Rectangle(x, y, width, height, color) {
    this.x = y;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function () {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.x + this.width, this.height);
    }
}

function RoundedRect(x, y, width, height, radius, color) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.r = radius;

    this.draw = function () {
        c.fillStyle = this.color;
        c.beginPath();
        c.moveTo(x + radius, y);
        c.lineTo(x + width - radius, y);
        c.quadraticCurveTo(x + width, y, x + width, y + radius);
        c.lineTo(x + width, y + height - radius);
        c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        c.lineTo(x + radius, y + height);
        c.quadraticCurveTo(x, y + height, x, y + height - radius);
        c.lineTo(x, y + radius);
        c.quadraticCurveTo(x, y, x + radius, y);
        c.fill();
    }

}
function Toast(x, y, source, width, height, btfe) {
    CanvasImage.call(this)
    this.speed = 0;
    this.update = function () {


        this.y += 5 * this.speed;
        if (this.y > canvas.height) {
            this.speed *= -1;
        } else if (this.y < -100) {
            this.speed = 0;
        }

    }
}
//Future Clean up - create new object "Product" that inherites the canvas image and move to separate files
function CanvasImage(x, y, source, width, height, btfe) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = document.createElement("img");
    this.img.src = source;
    this.btfe = btfe;
    this.speed = 0;
    this.draw = function () {
        c.drawImage(this.img, this.x - this.width / 2, this.y - (5 * this.height / 8), this.width, this.height);
    }
    // this.update = function () {
    //     if (this.x < innerWidth + 500 && this.x > 0) {
    //         this.x = this.x - 5;
    //     }
    //     if (this.x < innerWidth * .2 && this.x > 0) {
    //         cta.x = innerWidth / 2;
    //     }
    // }
    this.update = function () {


        this.y += 15 * this.speed;
        if (this.y < canvas.height * .7) {
            this.speed *= -1;
            if(this.img.src.includes("2xBT.png")){
                restock();
            } else {
                console.log("Not counted as Checkmark");
                console.log(this.img.src);
            }
           
        } else if (this.y > innerHeight + innerWidth*.8 && this.speed > 0) {
            this.speed = 0;
        }

    }
    this.touch = function (touch, status) {
        if ((Math.abs(touch.clientX - this.x) <= this.width / 2) && (Math.abs(touch.clientY - this.y) <= this.height / 2)) {
            // switch(status) {
            //     case "start":
            //         console.log("got me!");
            //         phone.scale = phone.scale * 1.2;
            //         break;
            //     case "move":
            //         phone.x = touch.clientX;
            //         phone.y = touch.clientY;
            //         checkScan();
            //         break;
            // }
            //console.log("touched "+this.img.src);
            //console.log("at "+this.x+","+this.y);

            //if btfe
            if (this.btfe) {
                //toast
                console.log("toast begins!");
                brandIndex++;
                if(brandIndex >= brands.length){
                    brandIndex = 0;
                }
                SuccessBox.speed = - 2;
                //raise walmart count
                earnings += 2;
            } else {
                FailureBox.speed = -2;
            }

        }
    }
    // this.bounce = function() {
    //     if (this.width < innerWidth / 4 || this.width > innerWidth/3) {
    //         direction = -direction;
    //     }
    //     this.width += 5 * direction;
    //     this.height += 5 * direction;
    // }
}


function checkBox(touch) {
    foodShelf.forEach(function (arrayItem) {
        arrayItem.touch(touch);
        //console.log(arrayItem);
    });

}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        if(array[currentIndex].btfe) {
            console.log(array[randomIndex]);
            array[currentIndex].img.src = brands[brandIndex];
        }
    }

    return array;
}
function restock() {
    foodShelf = shuffle(foodShelf);
    foodShelf[0].x = position_0.x;
    foodShelf[0].y = position_0.y;
    foodShelf[1].x = position_1.x;
    foodShelf[1].y = position_1.y;
    foodShelf[2].x = position_2.x;
    foodShelf[2].y = position_2.y;
    foodShelf[3].x = position_3.x;
    foodShelf[3].y = position_3.y;
    foodShelf[4].x = position_4.x;
    foodShelf[4].y = position_4.y;
    foodShelf[5].x = position_5.x;
    foodShelf[5].y = position_5.y;
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    //grassCircle.draw();
    //cloud.draw();
    //logo.draw();
    shelfOne.draw();
    shelfTwo.draw();
    shelfThree.draw();

    //Add 9 options for boxes
    AnniesBox.draw();
    GenBox1.draw();
    GenBox2.draw();
    GenBox3.draw();
    GenBox4.draw();
    GenBox5.draw();

    SuccessBox.draw();
    SuccessBox.update();
    FailureBox.draw();
    FailureBox.update();
    //school.draw();
    //parkingLot.draw();
    //playground.draw();
    //bus.update();
    //bus.draw();
    //arrow.draw();
    //arrow.bounce();
    //update phone position

    //animated arrow showing user to drag phone
    //receipt.draw();
    //phone.draw();

    // failsafe
    if (timer == 3000) {
        cta.x = innerWidth / 2;
    }
    cta.draw();
    banner.draw();
    walmartLogo.draw();

    //Draw Text
    c.font = "4em Arial";
    c.fillStyle = "white";
    c.fillText("Double Box Tops at ", .05 * canvas.width, canvas.height * .075);
    c.fillText("Total Box Tops: " + Number(earnings).toFixed(0), .25 * canvas.width, canvas.height * .15);
    timer++;
}

var stage = "0";
//var phone = new CanvasImage(.25 * innerWidth, .80 * innerHeight, "iphone.png", 300,300*1.6);
//var receipt = new CanvasImage(.85 * innerWidth, .80 * innerHeight,"receipt.png", 500,500);
//var school = new CanvasImage(.5 * innerWidth, .5* innerHeight,"smallSchool.png",700,700);
//var playground = new CanvasImage(-200, .75*innerHeight,"playground.png",400,400);
//var parkingLot = new CanvasImage(-500, .97 * innerHeight,"road.jpg",innerWidth, innerWidth * .228);
//var bus = new CanvasImage(innerWidth + 500, .93 * innerHeight,"bus.png",500,500);
//var arrow = new CanvasImage(9*innerWidth/16, innerHeight * .80, "arrow.png",innerWidth/3,innerWidth/3);

//Static Background
//var grassCircle = new Circle(.5* innerWidth, innerHeight, .5 * innerHeight, "#559807");
//var cloud = new CanvasImage(innerWidth/2,.2 * innerHeight,"cloud.png",800,800);
//var logo = new CanvasImage(9*innerWidth/16, .16 * innerHeight,"logo.png",300,300);
var shelfOne = new RoundedRect(innerWidth * 0.05, innerHeight * 0.20, (innerWidth - innerWidth * 0.1), innerHeight * .23, 50, "#7A491E");
var shelfTwo = new RoundedRect(innerWidth * 0.05, innerHeight * 0.45, (innerWidth - innerWidth * 0.1), innerHeight * .23, 50, "#7A491E");
var shelfThree = new RoundedRect(innerWidth * 0.05, innerHeight * 0.70, (innerWidth - innerWidth * 0.1), innerHeight * .23, 50, "#7A491E");

var banner = new Rectangle(0, 0, canvas.width, canvas.height * .18, "#152A54");
var walmartLogo = new CanvasImage(innerWidth * .8, innerHeight * .07, "walmartLogo.png", innerWidth * .35, innerHeight * .06);
var earnings = 0.00;

//positions
var position_0 = { x: innerWidth * .3, y: innerHeight * .34 };
var position_1 = { x: innerWidth * .7, y: innerHeight * .34 };
var position_2 = { x: innerWidth * .3, y: innerHeight * .6 };
var position_3 = { x: innerWidth * .7, y: innerHeight * .6 };
var position_4 = { x: innerWidth * .3, y: innerHeight * .85 };
var position_5 = { x: innerWidth * .7, y: innerHeight * .85 };

//brands
var brands = ["anniesProp.png","Cheerios.png","Nature Valley.png","CTC.png"];
brandIndex = 0;

//Add 6 options for boxes
var AnniesBox = new CanvasImage(position_0.x, position_0.y, brands[brandIndex], innerWidth * .25, innerWidth * .35, true);
var GenBox1 = new CanvasImage(position_1.x, position_1.y, "Generic_2.png", innerWidth * .20, innerWidth * .35, false);
var GenBox2 = new CanvasImage(position_2.x, position_2.y, "Generic_1.png", innerWidth * .20, innerWidth * .35, false);
var GenBox3 = new CanvasImage(position_3.x, position_3.y, "Generic_2.png", innerWidth * .20, innerWidth * .35, false);
var GenBox4 = new CanvasImage(position_4.x, position_4.y, "Generic_2.png", innerWidth * .25, innerWidth * .35, false);
var GenBox5 = new CanvasImage(position_5.x, position_5.y, "Generic_1.png", innerWidth * .30, innerWidth * .30, false);

var SuccessBox = new CanvasImage(innerWidth / 2, innerHeight + innerWidth*.8, "2xBT.png", innerWidth * .45, innerWidth * .4,false);
var FailureBox = new CanvasImage(innerWidth / 2, innerHeight + innerWidth*.8, "xBox.png",innerWidth * .45, innerWidth * .4,false);



var foodShelf = [AnniesBox, GenBox5, GenBox1, GenBox2, GenBox3, GenBox4];

//End
var cta = new CanvasImage(innerWidth * 4, .7 * innerHeight, "cta.png", innerHeight * 1.1, innerHeight * 1.1);





var scale = 1;
var direction = 1;
var timer = 0;
animate();
