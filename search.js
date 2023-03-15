function search() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("resultUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// not my code //

function enter() {
    var input, query;
    query = getParameterByName('query');
    input = document.getElementById("searchInput")
    if (input != query) {
        input.value = query;
    }

}

// my code :) //