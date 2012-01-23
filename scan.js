
window.watchedUrls = [ "atdmt.com" ];

(function() {

function findDocument() {
    if(window.top) {
        return window.top.document;
    }
    if(window.frameElement && window.frameElement.nodeName == "IFRAME") {
        return window.frameElement.ownerDocument;
    }
    return window.document;
}

function test(url) {
    return window.watchedUrls.some(function(expression) {
        return url.indexOf(expression) > -1;
    });
}

function reveal(url) {
    var document = findDocument();
    var theReveal = document.getElementById("__theReveal");
    if(!theReveal) {
        theReveal = document.createElement("div");
        theReveal.id = "__theReveal";
        theReveal.style.position = 'fixed';
        theReveal.style.top = 0;
        theReveal.style.left = 0;
        theReveal.style.width = "100%";
        theReveal.style.background = "#eee";
        theReveal.style.zIndex = "2147483647";
        document.body.appendChild(theReveal);
    }
    var theDiv = document.createElement("p");
    theDiv.appendChild(document.createTextNode("found " + url + " "));
    var closeLink = document.createElement("a");
    closeLink.appendChild(document.createTextNode("ok"));
    closeLink.addEventListener("click", function() {
        theReveal.removeChild(theDiv);
    });
    theDiv.appendChild(closeLink);
    theReveal.appendChild(theDiv);

    chrome.extension.sendRequest({ "type":"foundUrl", "url": url});
}


document.addEventListener("beforeload", function(event) {
    if(test(event.url))
        reveal(event.url);
},true);

})()

