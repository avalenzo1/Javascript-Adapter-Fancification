window.onload = function() {
    k = document.getElementById('gc');
    cc = k.getContext('2d');
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
    cc.fillRect(3, 3, 500 - 6, 600 - 6);
    cc.fillStyle = 'darkslategrey';
    repeatingForever();
    cc.lineWidth = 3;
    cc.strokeStyle = 'blue';
    cc.strokeRect(1, 1, 500 - 2, 600 - 2);
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

    new Function(repeatingForeverData)();
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
    tempElement.value = "keyDown\n" + document.getElementById('keyDown').value + "\n\ninitialize\n" + document.getElementById('initialize').value + "\n\nrepeatingForever\n" + document.getElementById('repeatingForever').value
    tempElement.setAttribute('readonly', '');
    tempElement.style = { position: 'absolute', left: '-9999px' };
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
        tempElement.value = " \n<strong>keyDown()</strong>\n" + document.getElementById('keyDown').value + "\n\n<strong>initialize()</strong>\n" + document.getElementById('initialize').value + "\n\n<strong>repeatingForever()</strong>\n" + document.getElementById('repeatingForever').value + "\n\n<strong>Screenshot</strong>\n";
        tempElement.setAttribute('readonly', '');
        tempElement.style = { position: 'absolute', left: '-9999px' };
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

function help() {
    window.open('help.html');
}

function home() {
    window.open('index.html');
}

function reportBug() {
    window.open('mailto:sampleemail.com')
}

function newJSA() {
    window.open('jsh.html')
}

// Ctrl + Shift + X will automatically run //

document.onkeyup = function(e) {
    if (e.ctrlKey && e.shiftKey && e.which == 88) {
        transferData();
    }
};

function screenToggle() {
    var x = document.getElementById("fullscreen");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}