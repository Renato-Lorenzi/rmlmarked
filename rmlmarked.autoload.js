var pre = document.getElementsByTagName("pre");
if(!pre){
  return;
}

var x=pre[0];
if(!x){
  return;
}
var y = x.childNodes[0];
var txt = y.nodeValue;
var rmlmarked = require("./RMLMarked");
var contentDiv = document.createElement('div');		
contentDiv.innerHTML = rmlmarked(txt);		
contentDiv.className = "markdown-body";
x.parentNode.replaceChild(contentDiv,x);