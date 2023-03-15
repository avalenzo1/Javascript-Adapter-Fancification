window.onload = function() {
    k = document.getElementById('gc');
    cc = k.getContext('2d');
    idealW = 506;
    idealH = 606;
    initialize();
    timerRate = 30;
    setInterval(update, 1000 / timerRate);
    k.addEventListener('click', function(e) {
        XClick = e.clientX - k.offsetLeft;
        YClick = e.clientY - k.offsetTop;
    }, false);
    k.addEventListener('mousemove', function(e) {
        XMove = e.x - k.offsetLeft;
        YMove = e.y - k.offsetTop;
    }, false);
    window.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('mouseup', mouseUp, true);
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener('keyup', keyUp, true);
}

function update() {
    cc.fillStyle = 'white';
    cc.fillRect(3 - 3, 3 - 3, 500 + 3, 600 + 3);
    cc.fillStyle = 'darkslategrey';
    repeatingForever();
    cc.lineWidth = 3;
    cc.strokeStyle = 'blue';
    cc.strokeRect(1 - 3, 1 - 3, 500 + 4, 600 + 4);
}

function keyUp(e) {}

function mouseDown(e) {}

function mouseUp(e) {}

function keyDown(e) {
    runKeyDown = new Function('e', keyDownData)(e);

}

function initialize() {
    keyDownData = "";
    repeatingForeverData = "";
    oldWidth = window.innerWidth - 20;
    oldHeight = window.innerHeight;

    if (oldWidth < 1000) {
        k.width = idealW * oldWidth / 1000;
        k.height = idealH * oldWidth / 1000;
        cc.scale(k.width / ideal, k.width / ideal);
    } else if (oldHeight < idealH) {
        oldWidth = oldHeight / 1.2 * 2;
        k.width = idealW * oldWidth / 1000;
        k.height = idealH * oldWidth / 1000;
        cc.scale(k.width / idealW, k.width / idealW);
        oldWidth = window.innerWidth - 20;
    }
    oldWidth = 5;
    rectLinesShow = 0;
}

function repeatingForever() {
    curWidth = window.innerWidth - 20;
    curHeight = window.innerHeight;
    if (((curWidth != oldWidth) || (curHeight != oldHeight)) && (curHeight < idealH) && (curWidth > 2 / 1.2 * curHeight)) {
        curWidth = 2 * (curHeight - 20) / 1.2;
        oldHeight = curHeight;
    }
    if (curWidth != oldWidth) {
        if (curWidth < 1000) {
            k.width = idealW * curWidth / 1000;
            k.height = idealH * curWidth / 1000;
            cc.scale(k.width / idealW, k.width / idealW);
        } else if (curHeight < idealH) {
            curWidth = (curHeight - 20) / 1.2 * 2;
            k.width = idealW * curWidth / 1000;
            k.height = idealH * curWidth / 1000;
            cc.scale(k.width / idealW, k.width / idealW);
        } else {
            k.width = idealW;
            k.height = idealH;
            cc.scale(k.width / idealW, k.width / idealW);
        }
        oldWidth = curWidth;
        cc.translate(3, 3);
    }

    transferData();
    if (rectLinesShow) {
        if ((rectX != "") && (rectX != null) && (!isNaN(rectX))) {
            cc.strokeStyle = '#A7BEFF';
            cc.lineWidth = 2;
            cc.beginPath();
            cc.moveTo(rectX, 600);
            cc.lineTo(rectX, 0);
            cc.stroke();
        }
        if ((rectY != "") && (rectY != null) && (!isNaN(rectY))) {
            cc.strokeStyle = '#F0F000';
            cc.lineWidth = 2;
            cc.beginPath();
            cc.moveTo(0, rectY);
            cc.lineTo(500, rectY);
            cc.stroke();
        }
        if ((rectW != "") && (rectW != null) && (!isNaN(rectW))) {
            cc.strokeStyle = '#FF88DD';
            cc.lineWidth = 2;
            cc.setLineDash([5, 10]);
            cc.beginPath();
            cc.moveTo(Number(rectX) + Number(rectW), 600);
            cc.lineTo(Number(rectX) + Number(rectW), 0);
            cc.stroke();
            cc.setLineDash([]);
        }
        if ((rectH != "") && (rectH != null) && (!isNaN(rectH))) {
            cc.strokeStyle = '#44FF44';
            cc.lineWidth = 2;
            cc.setLineDash([5, 10]);
            cc.beginPath();
            cc.moveTo(0, Number(rectY) + Number(rectH));
            cc.lineTo(500, Number(rectY) + Number(rectH));
            cc.stroke();
            cc.setLineDash([]);
        }
    }
    if ((rectX != "") && (rectX != null) && (!isNaN(rectX)) && (rectY != "") && (rectY != null) && (!isNaN(rectX))) {
        if ((rectC != "") && (rectC != null))
            cc.fillStyle = rectC;
        if ((rectW != "") && (rectW != null) && (!isNaN(rectW)) && (rectH != "") && (rectH != null) && (!isNaN(rectH)))
            cc.fillRect(rectX, rectY, rectW, rectH);
        var r = 4;
        if ((rectW != "") && (rectW != null) && (rectH != "") && (rectH != null))
            r = Math.min(r, Math.max(rectH / 3, rectW / 3));
        cc.fillStyle = 'black';
        cc.beginPath();
        cc.arc(rectX, rectY, r, 0, 2 * Math.PI);
        cc.fill();
    }
}

function transferData() {
    rectC = document.getElementById('color').value;
    rectX = document.getElementById('coorx').value;
    rectY = document.getElementById('coory').value;
    rectW = document.getElementById('width').value;
    rectH = document.getElementById('height').value;
}

function toggleRectLines() {
    rectLinesShow = 1 - rectLinesShow;
}