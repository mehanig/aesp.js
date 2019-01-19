var STYLE_ID_CONST = "STYLE_ID_CONST"
var CSS_STYLE_FONT_SIZE = "div {font-size: 50px; border: 10px solid blue; }";
var CSS_STYLE_COLOR = "div { background-color:yellow; }"

function createStyleNodeViaPlus() {
    document.querySelector('head').innerHTML +=  '<style id="' + STYLE_ID_CONST + '"></style>'
}

function createStyleNodeViaAppend() {
    var newElem = document.createElement('style');
    newElem.type = 'text/css';
    newElem.id = STYLE_ID_CONST;
    document.querySelector('head').appendChild(newElem)
}


function applyStyling(headStyleNodeCreator) {
    const defStyle = document.getElementById("DEF_STYLE");

    // THIS IS CRITICAL PART.
    // IF headStyleNodeCreator removes nodes from DOM, all the above defined references will be invalid.
    // In this case it's defStyle variable.
    headStyleNodeCreator();
    const myStyle = document.getElementById(STYLE_ID_CONST)
    // This line will not work if headStyleNodeCreator unmounts defStyle node
    defStyle.appendChild(document.createTextNode(CSS_STYLE_FONT_SIZE));
    myStyle.appendChild(document.createTextNode(CSS_STYLE_COLOR));
}

function badFunc() {
    applyStyling(createStyleNodeViaPlus)
}

function goodFunc() {
    applyStyling(createStyleNodeViaAppend)
}