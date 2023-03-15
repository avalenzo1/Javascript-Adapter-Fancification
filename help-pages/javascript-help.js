function toggleNav() {
    var x = document.getElementById("nav");
    var win = window.innerWidth;
    if (x.style.left === "0%") {
        x.style.left = "-80%"
    } else {
        x.style.left = "0%";
    }
    if (win > 700) {
        x.style.left = "0%"
    }
}

function closeS() {
    var s = document.getElementById("s")
    s.style.display = "none"
}

window.onresize = toggleNav;
window.onresize = equalHeight;
var time = setInterval(equalHeight, 500);

function equalHeight() {
    var offsetHeight = document.getElementById('content-wrapper').offsetHeight;
    var left = document.getElementById('nav').clientHeight;
    var right = document.getElementById('content-wrapper').clientHeight;
    var win = window.innerWidth

    if (left < right) {
        document.getElementById('nav').style.height = offsetHeight + 'px';
    }
    if ((win >= 700) && (left > right)) {
        document.getElementById('nav').style.height = 100 + '%';
    }
    if ((win < 700) && (left > right)) {
        document.getElementById('nav').style.height = offsetHeight + 'px';
    }
}