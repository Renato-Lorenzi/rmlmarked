var xmp = document.getElementsByTagName("xmp");
if(!xmp){
  return;
}

x=xmp[0];
if(!x){
  return;
}
y=x.childNodes[0];
txt=y.nodeValue;
var rmlmarked = require("./RMLMarked");
contentDiv = document.createElement('div');		
contentDiv.innerHTML = rmlmarked(txt);		
x.parentNode.replaceChild(contentDiv,x);