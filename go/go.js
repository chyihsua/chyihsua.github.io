
function setup() {
    initializeFields();
    createCanvas(450, 450);
}

// 陣列
var bx;

var by;

// 現在有幾個棋子
var N;

function draw() {
    background(color(0xE5, 0xC4, 0x68));
    for (// 畫棋盤
    var xy = 50; // 畫棋盤
    xy < 450; // 畫棋盤
    xy += 50) {
        line(0, xy, 450, xy);
        line(xy, 0, xy, 450);
    }
    for (// i代表現在是第幾個棋子
    var i = 0; // i代表現在是第幾個棋子
    i < N; // i代表現在是第幾個棋子
    i++) {
        if (// 決定黑/白棋
        i % 2 == 0)
            // 決定黑/白棋
            fill(0);
        else
            fill(255);
        ellipse(bx[i], by[i], 35, 35);
    }
    if (// 決定鼠標顯示黑/白棋
    N % 2 == 0)
        // 決定鼠標顯示黑/白棋
        fill(0);
    else
        fill(255);
    // 要精準在十字上只要判斷靠近哪一個xy座標
    ellipse(mouseX, mouseY, 35, 35);
}

function mousePressed() {
    bx[N] = mouseX;
    by[N] = mouseY;
    N++;
}

function initializeFields() {
    bx = new Array(100);
    by = new Array(100);
    N = 0;
}
