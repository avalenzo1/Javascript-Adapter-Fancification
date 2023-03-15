window.onload = function() {
    k = document.getElementById('gc');
    k2 = document.getElementById('gc2');
    k3 = document.getElementById('gc3');
    k2.style.display = 'none'
    k3.style.display = 'none'
    cc = k.getContext('2d');
    initialize();
    timerRate = 30;
    setInterval(update, 1000 / timerRate);
    k.addEventListener('click', function(e) {
        XClick = e.clientX - k.offsetLeft;
        YClick = e.clientY - k.offsetTop;
    }, false);
    window.addEventListener('mousemove', mouseMove, false);
    k.addEventListener('mousedown', mouseDown, true);
    k2.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('mouseup', mouseUp, true);
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener('keyup', keyUp, true);
}

function mouseMove(e) {
    if (largeMode) {
        XMove = e.x - k2.offsetLeft;
        YMove = e.y - k2.offsetTop;
        if ((XMove < -10) || (XMove > 1010))
            XMove = -500;
        else
            XMove = Math.min(Math.max(0, XMove), 999);
        if ((YMove < -10) || (YMove > 610))
            YMove = -500;
        else
            YMove = Math.min(Math.max(0, YMove), 599);
    } else {
        XMove = e.x - k.offsetLeft;
        YMove = e.y - k.offsetTop;
        if ((XMove < -10) || (XMove > 510))
            XMove = -500;
        else
            XMove = Math.min(Math.max(0, XMove), 499);
        if ((YMove < -10) || (YMove > 610))
            YMove = -500;
        else
            YMove = Math.min(Math.max(0, YMove), 599);
    }
}

function check1() {
    cc.fillStyle = 'red';
    cc.fillRect(50, 50, 50, 50);
}

function check2() {
    cc.fillStyle = 'blue';
    cc.fillRect(100, 50, 50, 50);
}

function update() {
    if (largeMode) {
        cc.fillStyle = 'black';
        cc.fillRect(3, 3, 1000 - 6, 600 - 6);
        cc.fillStyle = 'darkslategrey';
        repeatingForever();
        cc.lineWidth = 3;
        cc.strokeStyle = 'blue';
        cc.strokeRect(1, 1, 1000 - 2, 600 - 2);
    } else {
        cc.fillStyle = 'white';
        cc.fillRect(3, 3, 500 - 6, 600 - 6);
        cc.fillStyle = 'darkslategrey';
        repeatingForever();
        cc.lineWidth = 3;
        cc.strokeStyle = 'blue';
        cc.strokeRect(1, 1, 500 - 2, 600 - 2);
    }
}

function keyUp(e) {
    if (e.keyCode == 17)
        e.preventDefault();
    if ((e.ctrlKey) || (e.keyCode == 17) || (e.keyCode == 91) || (e.keyCode == 93) || (e.keyCode == 224)) {
        ctrlPress = false;
        k.style.cursor = "default";
        k2.style.cursor = "default";
    }
}

function mouseDown(e) {
    mousePress = true;
}

function mouseUp(e) {
    mousePress = false;
    k.style.cursor = "default";
    k2.style.cursor = "default";
}

function keyDown(e) {
    if (e.keyCode == 17)
        e.preventDefault();
    if ((e.ctrlKey) || (e.keyCode == 17) || (e.keyCode == 91) || (e.keyCode == 93) || (e.keyCode == 224))
        ctrlPress = true;
    if ((e.keyCode == 9) || (e.keyCode == 192)) {
        e.preventDefault();
        if (largeMode)
            runSmall();
        else
            runFull();
    }

    runKeyDown = new Function('e', keyDownData)(e);

}

function initialize() {
    largeMode = false;
    mousePress = false;
    ctrlPress = false;
    XMove = -500;
    YMove = -500;
    keyDownData = "";
    repeatingForeverData = "";
    oldWidth = window.innerWidth - 20;
    oldHeight = window.innerHeight;

    if (oldWidth < 1000) {
        k.width = 500 * oldWidth / 1000;
        k.height = 600 * oldWidth / 1000;
        cc.scale(k.width / 500, k.width / 500);
    } else if (oldHeight < 600) {
        oldWidth = oldHeight / 1.2 * 2;
        k.width = 500 * oldWidth / 1000;
        k.height = 600 * oldWidth / 1000;
        cc.scale(k.width / 500, k.width / 500);
        oldWidth = window.innerWidth - 20;
    }
    oldWidth = 5;
}

function repeatingForever() {
    curWidth = window.innerWidth - 20;
    curHeight = window.innerHeight;
    if (((curWidth != oldWidth) || (curHeight != oldHeight)) && (curHeight < 600) && (curWidth > 2 / 1.2 * curHeight)) {
        curWidth = 2 * (curHeight - 20) / 1.2;
        oldHeight = curHeight;
    }
    if (curWidth != oldWidth) {
        if (curWidth < 1000) {
            k.width = 500 * curWidth / 1000;
            k.height = 600 * curWidth / 1000;
            cc.scale(k.width / 500, k.width / 500);
        } else if (curHeight < 600) {
            curWidth = (curHeight - 20) / 1.2 * 2;
            k.width = 500 * curWidth / 1000;
            k.height = 600 * curWidth / 1000;
            cc.scale(k.width / 500, k.width / 500);
        } else {
            k.width = 500;
            k.height = 600;
            cc.scale(k.width / 500, k.width / 500);
        }
        oldWidth = curWidth;
    }

    showMouseXY()
    new Function(repeatingForeverData)();
    showMouseXY()
}

function showMouseXY() {
    if ((mousePress) && (ctrlPress) && (XMove != -500) && (YMove != -500)) {
        k.style.cursor = "crosshair";
        k2.style.cursor = "crosshair";
        xTemp = XMove;
        yTemp = YMove;
        if (largeMode)
            xTemp = Math.max(Math.min(xTemp, 950), 48)
        else
            xTemp = Math.max(Math.min(xTemp, 450), 48)
        yTemp = Math.max(Math.min(yTemp, 566), 31)
        cc.fillStyle = 'white';
        cc.strokeStyle = 'red'
        cc.textAlign = 'center';
        cc.font = 'bold 30px arial'
        cc.lineWidth = 1.5;
        cc.fillText("x: " + XMove, xTemp, yTemp - 5);
        cc.fillText("y: " + YMove, xTemp, yTemp + 25);
        cc.strokeText("x: " + XMove, xTemp, yTemp - 5);
        cc.strokeText("y: " + YMove, xTemp, yTemp + 25);
    }
}

function transferData() {
    keyDownData = document.getElementById('keyDown').value;
    keyDownData = keyDownData.replace(/`/g, "'");
    keyDownData = keyDownData.replace(/´/g, "'");
    keyDownData = keyDownData.replace(/‘/g, "'");
    keyDownData = keyDownData.replace(/”/g, '"');
    keyDownData = keyDownData.replace(/“/g, '"');
    keyDownData = keyDownData.replace(/¨/g, '"');
    document.getElementById("keyDown").value = keyDownData;

    initializeData = document.getElementById('initialize').value;
    initializeData = initializeData.replace(/`/g, "'");
    initializeData = initializeData.replace(/´/g, "'");
    initializeData = initializeData.replace(/‘/g, "'");
    initializeData = initializeData.replace(/”/g, '"');
    initializeData = initializeData.replace(/“/g, '"');
    initializeData = initializeData.replace(/¨/g, '"');
    document.getElementById("initialize").value = initializeData;

    repeatingForeverData = document.getElementById('repeatingForever').value;
    repeatingForeverData = repeatingForeverData.replace(/`/g, "'");
    repeatingForeverData = repeatingForeverData.replace(/´/g, "'");
    repeatingForeverData = repeatingForeverData.replace(/‘/g, "'");
    repeatingForeverData = repeatingForeverData.replace(/”/g, '"');
    repeatingForeverData = repeatingForeverData.replace(/“/g, '"');
    repeatingForeverData = repeatingForeverData.replace(/¨/g, '"');

    document.getElementById("repeatingForever").value = repeatingForeverData;

    new Function(initializeData)();
    new Function(initializeData)();
}

function copyText() {
    var tempElement = document.createElement('textarea');
    tempElement.value = "keyDown(e)\n" + document.getElementById('keyDown').value + "\n\ninitialize()\n" + document.getElementById('initialize').value + "\n\nrepeatingForever()\n" + document.getElementById('repeatingForever').value
    tempElement.setAttribute('readonly', '');
    tempElement.style = {
        position: 'absolute',
        left: '-9999px'
    };
    document.body.appendChild(tempElement);
    tempElement.select();
    tempElement.setSelectionRange(0, 99999)
    document.execCommand('copy');
    document.body.removeChild(tempElement);

    /* Alert the copied text */
    alert("Copied Text");
}

function copyEverything() {
    var img = document.createElement('img');
    img.src = k.toDataURL()
    img.onload = function() {
        var k2 = document.createElement("canvas");
        k2.width = 375;
        k2.height = 450;
        c2 = k2.getContext('2d');
        c2.drawImage(img, 0, 0, 375, 450);
        var img2 = document.createElement('img');
        img2.src = k2.toDataURL()

        var div = document.createElement('div');
        div.contentEditable = true;

        var tempElement = document.createElement('textarea');
        tempElement.value = " \n<strong>keyDown(e)</strong>\n" + document.getElementById('keyDown').value + "\n\n<strong>initialize()</strong>\n" + document.getElementById('initialize').value + "\n\n<strong>repeatingForever()</strong>\n" + document.getElementById('repeatingForever').value + "\n\n<strong>Screenshot</strong>\n";
        tempElement.setAttribute('readonly', '');
        tempElement.style = {
            position: 'absolute',
            left: '-9999px'
        };
        div.appendChild(document.createTextNode(tempElement.value));
        div.innerHTML = tempElement.value.replace(/(\n|\r|\r\n)/g, '<br\>');
        div.appendChild(img2);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);

        // do copy
        selectText(div);
        document.execCommand('Copy');
        document.body.removeChild(div);
        alert("Everything Copied");
    }
}

function selectText(element) {
    var doc = document;
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function copyPic() {
    var img = document.createElement('img');
    img.src = k.toDataURL()
    img.onload = function() {
        var k2 = document.createElement("canvas");
        k2.width = 375;
        k2.height = 450;
        c2 = k2.getContext('2d');
        c2.drawImage(img, 0, 0, 375, 450);
        var img2 = document.createElement('img');
        img2.src = k2.toDataURL()

        var div = document.createElement('div');
        div.contentEditable = true;
        div.appendChild(img2);
        document.body.appendChild(div);

        // do copy
        selectText(div);
        document.execCommand('Copy');
        document.body.removeChild(div);
        alert("Picture Copied");
    }
}

function colors() {
    window.open('https://htmlcolorcodes.com/color-names/');

}

function oldCode() {
    var allCode = document.getElementById("prevCode").value;
    var temp1 = allCode.indexOf('keyDown(e)');
    var temp2 = allCode.indexOf('initialize()');
    var temp3 = allCode.indexOf('repeatingForever()');
    var temp4 = allCode.indexOf('Screenshot');
    if ((temp1 == -1) || (temp2 == -1) || (temp3 == -1))
        return;
    document.getElementById("keyDown").value = allCode.substring(temp1 + 11, temp2 - 2);
    document.getElementById("initialize").value = allCode.substring(temp2 + 13, temp3 - 2);
    if (temp4 == -1)
        document.getElementById("repeatingForever").value = allCode.substring(temp3 + 19);
    else
        document.getElementById("repeatingForever").value = allCode.substring(temp3 + 19, temp4 - 2);
    transferData();
}

function runFull() {
    document.documentElement.style.overflow = 'hidden'; // firefox, chrome
    document.body.scroll = "no"; // ie only 
    cc = k2.getContext('2d');
    k2.height = 600;
    k3.height = 600;
    largeMode = true;
    k2.style.display = 'block'
    k3.style.display = 'block'
}

function runSmall() {
    document.documentElement.style.overflow = 'auto'; // firefox, chrome
    document.body.scroll = "yes"; // ie only
    k2.style.display = 'none'
    k3.style.display = 'none'
    cc = k.getContext('2d');
    k2.height = 1;
    k3.height = 1;
    largeMode = false;
}

// modified code

function screenToggle() {
    if (k3.style.display === "none") {
        k3.style.display = "block";
    } else {
        k3.style.display = "none";
    }
}