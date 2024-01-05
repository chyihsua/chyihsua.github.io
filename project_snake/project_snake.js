class ArrayList extends Array {
    constructor() {
        super(...[]);
    }
    size() {
        return this.length;
    }
    add(x) {
        this.push(x);
    }
    get(i) {
        return this[i];
    }
    remove(i) {
        this.splice(i, 1);
    }
}

let pt = new ArrayList(); //食物的點
let body = new ArrayList(); //蛇身
let rgb = new ArrayList(); //改變身體顏色
//PFont myfont=createFont("標楷體",80);
let snakelen = 1;
let s = 1;
let snake = 1;
let sizeX = -1000,
    sizeY = -800;
let speed = 5;
let mapSpeed = 1.5;
let sizeFood = 20,
    sizeSnake = 30;
let x = 250,
    y = 250,
    dir = 0; //dir角度
let dx, dy, d;
let status = 0;
let glow = true;
let glowSize = 1.25;
let time = 0;
function setup() {
    createCanvas(1000, 800);
    for (let i = 0; i < 1000; i++)
        pt.add(
            new p5.Vector(
                random(sizeX, sizeX + 3000),
                random(sizeY, sizeY + 2400)
            )
        );
    rgb.add(new p5.Vector(random(255), random(255), random(255)));
}
function draw() {
    //println(minX,maxX);
    if (status == 0) welcome();
    if (status == 1) {
        background(0);
        drawmap();
        fill(255);
        dx = mouseX - x;
        dy = mouseY - y;
        d = sqrt(dx * dx + dy * dy) * 3;
        stroke(0);
        drawsnake2();
        drawsnake3();
        drawsnake4();
        drawsnake5();
        drawbody();
        drawhead(x, y, dir);
        move();
        eat(x, y, 1);
        mapMove();
        hit();
    }
    if (status == 2) {
        gameOver();
    }
    if (status == 4) {
        stopGame();
    }
} //限制畫布範圍
function drawmap() {
    fill(60);
    stroke(255, 0, 0);
    strokeWeight(10);
    rect(sizeX, sizeY, 3000, 2400);
    stroke(75);
    strokeWeight(2);
    for (let i = 50; i < 2400; i += 50)
        line(sizeX, sizeY + i, sizeX + 3000, sizeY + i);
    for (let i = 50; i < 3000; i += 50)
        line(sizeX + i, sizeY, sizeX + i, sizeY + 2400);
    time += 1;
    if (glowSize < 1.65 && glow && time == 4) glowSize += 0.05;
    if (glowSize >= 1.65) glow = false;
    if (glowSize > 1.25 && !glow && time == 4) glowSize -= 0.05;
    if (glowSize <= 1.25) glow = true;
    if (time == 4) time = 0;
    for (let p of pt) {
        noStroke();
        fill(255, 255, 0, 100);
        ellipse(p.x, p.y, sizeFood * glowSize, sizeFood * glowSize);
        fill(255, 255, 0);
        ellipse(p.x, p.y, sizeFood, sizeFood);
        fill(225, 255, 0);
        ellipse(p.x, p.y, sizeFood * 0.7, sizeFood * 0.7);
    }
} //畫布移動
function mapMove() {
    if (x < 100) {
        x = 100;
        sizeX += mapSpeed;
        for (let p of pt) {
            p.x += mapSpeed;
        }
        for (let b of body) {
            b.x += mapSpeed;
        }
        for (let b2 of body2) {
            b2.x += mapSpeed;
        }
        for (let b3 of body3) {
            b3.x += mapSpeed;
        }
        for (let b4 of body4) {
            b4.x += mapSpeed;
        }
        for (let b5 of body5) {
            b5.x += mapSpeed;
        }
    } else if (x > 900) {
        x = 900;
        sizeX -= mapSpeed;
        for (let p of pt) {
            p.x -= mapSpeed;
        }
        for (let b of body) {
            b.x -= mapSpeed;
        }
        for (let b2 of body2) {
            b2.x -= mapSpeed;
        }
        for (let b3 of body3) {
            b3.x -= mapSpeed;
        }
        for (let b4 of body4) {
            b4.x -= mapSpeed;
        }
        for (let b5 of body5) {
            b5.x -= mapSpeed;
        }
    }
    if (y < 100) {
        y = 100;
        sizeY += mapSpeed;
        for (let p of pt) {
            p.y += mapSpeed;
        }
        for (let b of body) {
            b.y += mapSpeed;
        }
        for (let b2 of body2) {
            b2.y += mapSpeed;
        }
        for (let b3 of body3) {
            b3.y += mapSpeed;
        }
        for (let b4 of body4) {
            b4.y += mapSpeed;
        }
        for (let b5 of body5) {
            b5.y += mapSpeed;
        }
    } else if (y > 700) {
        y = 700;
        sizeY -= mapSpeed;
        for (let p of pt) {
            p.y -= mapSpeed;
        }
        for (let b of body) {
            b.y -= mapSpeed;
        }
        for (let b2 of body2) {
            b2.y -= mapSpeed;
        }
        for (let b3 of body3) {
            b3.y -= mapSpeed;
        }
        for (let b4 of body4) {
            b4.y -= mapSpeed;
        }
        for (let b5 of body5) {
            b5.y -= mapSpeed;
        }
    }
}
function drawbody() {
    let j = 0;
    for (let i = 0; i < body.size(); i += 8) {
        let b = body.get(i);
        noStroke();
        fill(rgb.get(j).x, rgb.get(j).y, rgb.get(j).z);
        ellipse(b.x, b.y, sizeSnake, sizeSnake);
        line(b.x, b.y, b.x - 15 * cos(b.z), b.y - 15 * sin(b.z));
        j += 1;
    }
}
function drawhead(x, y, dir) {
    noStroke();
    ellipse(x, y, sizeSnake, sizeSnake);
    line(x, y, x + 15 * cos(dir), y + 15 * sin(dir));
    fill(255);
} //移動
function move() {
    if (dist(mouseX, mouseY, x, y) < 20) {
        x += 1 * cos(dir);
        y += 1 * sin(dir);
        dir += 0.1;
    } else {
        x += (dx / d) * speed;
        y += (dy / d) * speed;
    }
    if (body.size() < snakelen * 8) {
        //只發生在一開始(snakelen=1)跟按UP時(snalelen++)
        body.add(new p5.Vector(x, y, dir));
        if (sizeFood > 5) sizeFood -= 0.01;
        sizeSnake += 0.1;
    } else {
        for (let i = 0; i < body.size() - 1; i++) {
            body.get(i).x = body.get(i + 1).x;
            body.get(i).y = body.get(i + 1).y;
            body.get(i).z = body.get(i + 1).z;
        }
        body.get(body.size() - 1).x = x;
        body.get(body.size() - 1).y = y;
        body.get(body.size() - 1).z = dir;
    }
} //吃到食物偵測
function eat(x, y, snake) {
    for (let p of pt) {
        if (
            p.x <= x + sizeSnake / 2 &&
            p.x >= x - sizeSnake / 2 &&
            p.y <= y + sizeSnake / 2 &&
            p.y >= y - sizeSnake / 2
        ) {
            if (snake == 1) snakelen++;
            else if (snake == 2) snakelen2++;
            else if (snake == 3) snakelen3++;
            else if (snake == 4) snakelen4++;
            else if (snake == 5) snakelen5++;
            p.x = random(sizeX, sizeX + 3000);
            p.y = random(sizeY, sizeY + 2400);
            rgb.add(new p5.Vector(random(255), random(255), random(255)));
        }
    }
}
function keyPressed() {
    if (key == "s") status = 1;
    if (status == 1 && key == " ") status = 4;
    if (status == 2 && key == "r") reset();
}
function keyReleased() {
    key = ">"; //隨便丟一個未使用的值做初始化
}
function mousePressed() {
    speed = 8;
    mapSpeed = 2.5;
}
function mouseReleased() {
    speed = 5;
    mapSpeed = 1.5;
}
let img2;
function stopGame() {
    img2 = loadImage("stop.png");
    img2.resize(1000, 800);
    background(60);
    image(img2, 0, 0); //textFont(myfont);
    //textSize(80);
    //textAlign(CENTER);
    //text("STOP", 500, 300);
    //textSize(30);
    //text("按s鍵繼續遊戲", 500, 450);
    if (key == "s") status = 1;
}
let img3;
function gameOver() {
    img3 = loadImage("gameover.png");
    img3.resize(1000, 800);
    background(60);
    image(img3, 0, 0); //textFont(myfont);
    //textSize(80);
    //textAlign(CENTER);
    //text("GAMEOVER",500,300);
    //textSize(30);
    //text("請按r鍵重新開始",500,450);
} //新增蛇 mapMove() draw() eat() reset()要改
//每一隻蛇
//Snake5
let body5 = new ArrayList(); //蛇3
let snakelen5 = 1; //float x5=500, y5=250, dir5=200;
let x5 = random(100, 500),
    y5 = random(200, 800),
    dir5 = 0; //遊戲中亂入的蛇（障礙）
function drawsnake5() {
    for (let i = 0; i < body5.size(); i += 8) {
        let b5 = body5.get(i);
        noStroke();
        fill(random(150), random(100, 200), random(50));
        ellipse(b5.x, b5.y, 35, 35);
        line(b5.x, b5.y, b5.x - 15 * cos(b5.z), b5.y - 15 * sin(b5.z));
    } // 改變方向
    dir5 += random(-0.2, 0.2);
    x5 += cos(dir5) * 0.6;
    y5 += sin(dir5) * 0.6;
    if (body5.size() < snakelen5 * 8) {
        body5.add(new p5.Vector(x5, y5, dir5));
    } else {
        for (let i = 0; i < body5.size() - 1; i++) {
            body5.get(i).x = body5.get(i + 1).x;
            body5.get(i).y = body5.get(i + 1).y;
            body5.get(i).z = body5.get(i + 1).z;
        }
        body5.get(body5.size() - 1).x = x5;
        body5.get(body5.size() - 1).y = y5;
        body5.get(body5.size() - 1).z = dir5;
    }
    eat(x5, y5, 5);
} //Snake4
let body4 = new ArrayList(); //蛇3
let snakelen4 = 1; //float x4=500, y4=250, dir4=200;
let x4 = random(2000, 3000),
    y4 = random(500, 800),
    dir4 = 0; //遊戲中亂入的蛇（障礙）
function drawsnake4() {
    for (let i = 0; i < body4.size(); i += 8) {
        let b4 = body4.get(i);
        noStroke();
        fill(random(150), random(100, 200), random(50));
        ellipse(b4.x, b4.y, 35, 35);
        line(b4.x, b4.y, b4.x - 15 * cos(b4.z), b4.y - 15 * sin(b4.z));
    } // 改變方向
    dir4 += random(-0.2, 0.2);
    x4 += cos(dir4) * 0.8;
    y4 += sin(dir4) * 0.8;
    if (body4.size() < snakelen4 * 8) {
        body4.add(new p5.Vector(x4, y4, dir4));
    } else {
        for (let i = 0; i < body4.size() - 1; i++) {
            body4.get(i).x = body4.get(i + 1).x;
            body4.get(i).y = body4.get(i + 1).y;
            body4.get(i).z = body4.get(i + 1).z;
        }
        body4.get(body4.size() - 1).x = x4;
        body4.get(body4.size() - 1).y = y4;
        body4.get(body4.size() - 1).z = dir4;
    }
    eat(x4, y4, 4);
} //Snake3
let body3 = new ArrayList(); //蛇3
let snakelen3 = 1; //float x3=350, y3=400, dir3=20;
let x3 = random(1500, 2000),
    y3 = random(0, 1000),
    dir3 = 0; //遊戲中亂入的蛇（障礙）
function drawsnake3() {
    for (let i = 0; i < body3.size(); i += 8) {
        let b3 = body3.get(i);
        noStroke();
        fill(random(255), random(100), random(50));
        ellipse(b3.x, b3.y, 35, 35);
        line(b3.x, b3.y, b3.x - 15 * cos(b3.z), b3.y - 15 * sin(b3.z));
    } // 改變方向
    dir3 += random(-0.2, 0.2);
    x3 += cos(dir3) * 0.8;
    y3 += sin(dir3) * 0.8;
    if (body3.size() < snakelen3 * 8) {
        body3.add(new p5.Vector(x3, y3, dir3));
    } else {
        for (let i = 0; i < body3.size() - 1; i++) {
            body3.get(i).x = body3.get(i + 1).x;
            body3.get(i).y = body3.get(i + 1).y;
            body3.get(i).z = body3.get(i + 1).z;
        }
        body3.get(body3.size() - 1).x = x3;
        body3.get(body3.size() - 1).y = y3;
        body3.get(body3.size() - 1).z = dir3;
    }
    eat(x3, y3, 3);
} //Snake2
let body2 = new ArrayList(); //蛇2
let snakelen2 = 1; //float x2=350, y2=400, dir2=0;
let x2 = random(300, 1000),
    y2 = random(300, 1000),
    dir2 = 0; //遊戲中亂入的蛇（障礙）
function drawsnake2() {
    for (let i = 0; i < body2.size(); i += 8) {
        let b2 = body2.get(i);
        noStroke();
        fill(random(150, 255), random(100), random(0, 50));
        ellipse(b2.x, b2.y, 35, 35);
        line(b2.x, b2.y, b2.x - 15 * cos(b2.z), b2.y - 15 * sin(b2.z));
    } // 改變方向
    dir2 += random(-0.2, 0.2);
    x2 += cos(dir2) * 0.6;
    y2 += sin(dir2) * 0.6;
    if (body2.size() < snakelen2 * 8) {
        body2.add(new p5.Vector(x2, y2, dir2));
    } else {
        for (let i = 0; i < body2.size() - 1; i++) {
            body2.get(i).x = body2.get(i + 1).x;
            body2.get(i).y = body2.get(i + 1).y;
            body2.get(i).z = body2.get(i + 1).z;
        }
        body2.get(body2.size() - 1).x = x2;
        body2.get(body2.size() - 1).y = y2;
        body2.get(body2.size() - 1).z = dir2;
    }
    eat(x2, y2, 2);
}
function hit() {
    //println(x,y);
    let min = body.size();
    let size = [
        body.size(),
        body2.size(),
        body3.size(),
        body4.size(),
        body5.size(),
    ];
    for (let i = 0; i < size.length; i++) {
        if (createCanvas[i] < min) min = createCanvas[i];
    } //if (body.size()>body2.size()|| body2.size()<body3.size())
    //  min=body2.size();
    //else if (body.size()>body3.size()|| body2.size()>body3.size())
    //  min=body3.size();
    //else min=body.size();
    for (let i = 0; i < min - 1; i++) {
        if (
            dist(x, y, body2.get(i).x, body2.get(i).y) < 25 ||
            dist(x, y, body3.get(i).x, body3.get(i).y) < 25 ||
            dist(x, y, body4.get(i).x, body4.get(i).y) < 25 ||
            dist(x, y, body5.get(i).x, body5.get(i).y) < 25
        ) {
            //IndexOutOfBoundsException: Index 16 out of bounds for length 16
            status = 2;
            break;
        }
    }
    if (
        x <= sizeX + sizeSnake / 5 ||
        y <= sizeY + sizeSnake / 5 ||
        x >= sizeX + 3000 - sizeSnake / 5 ||
        y >= sizeY + 2400 - sizeSnake / 5
    ) {
        //IndexOutOfBoundsException: Index 16 out of bounds for length 16
        status = 2;
    }
}
function reset() {
    pt.clear();
    body.clear();
    body2.clear();
    body3.clear();
    body4.clear();
    body5.clear();
    rgb.clear();
    snakelen = 1;
    snakelen2 = 1;
    snakelen3 = 1;
    snakelen4 = 1;
    snakelen5 = 1;
    s = 1;
    snake = 0;
    speed = 5;
    mapSpeed = 1.5;
    sizeFood = 20;
    sizeSnake = 30;
    sizeX = -1000;
    sizeY = -800;
    x = 250;
    y = 250;
    dir = 0;
    x2 = random(300, 1000);
    y2 = random(300, 1000);
    dir2 = 0;
    x3 = random(1500, 2000);
    y3 = random(0, 1000);
    dir3 = 0;
    x4 = random(2000, 3000);
    y4 = random(500, 800);
    dir4 = 0;
    x5 = random(100, 500);
    y5 = random(200, 800);
    dir5 = 0;
    status = 1;
    for (let i = 0; i < 1000; i++)
        pt.add(
            new p5.Vector(
                random(sizeX, sizeX + 3000),
                random(sizeY, sizeY + 2400)
            )
        );
    rgb.add(new p5.Vector(random(255), random(255), random(255)));
}
let img1;
function welcome() {
    img1 = loadImage("main.png");
    img1.resize(1000, 800);
    background(60);
    stroke(75);
    strokeWeight(2);
    for (let i = 50; i < 2400; i += 50)
        line(sizeX, sizeY + i, sizeX + 3000, sizeY + i);
    for (let i = 50; i < 3000; i += 50)
        line(sizeX + i, sizeY, sizeX + i, sizeY + 2400);
    image(img1, 0, 0); //textFont(myfont);
    //textSize(80);
    //textAlign(CENTER);
    //text("貪吃蛇",500,300);
    //textSize(30);
    //text("請按s鍵開始遊戲",500,450);
}
