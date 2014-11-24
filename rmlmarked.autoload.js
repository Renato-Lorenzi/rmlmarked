var xmp = document.getElementsByTagName("xmp");
if(!xmp){
  return;
}

var x=xmp[0];
if(!x){
  return;
}
var y = x.childNodes[0];
var txt = y.nodeValue;
var rmlmarked = require("./RMLMarked");
var contentDiv = document.createElement('div');		
contentDiv.innerHTML = rmlmarked(txt);		
x.parentNode.replaceChild(contentDiv,x);