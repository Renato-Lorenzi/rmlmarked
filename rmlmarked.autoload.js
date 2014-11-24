x=document.getElementsByTagName("xmp")[0];
y=x.childNodes[0];
txt=y.nodeValue;
var rmlmarked = require("./RMLMarked");
contentDiv = document.createElement('div');		
contentDiv.innerHTML = rmlmarked(txt);		
x.parentNode.replaceChild(contentDiv,x);