loadjscssfile("old/default.min.css", "css", function(){
	x=document.getElementsByTagName("xmp")[0];
	y=x.childNodes[0];
	txt=y.nodeValue;
	var rmlmarked = require("./RMLMarked");

	contentDiv = document.createElement('div');		
	contentDiv.innerHTML = rmlmarked(txt);		
	x.parentNode.replaceChild(contentDiv,x);
});

function loadjscssfile(filename, filetype, callback){	
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }

if (filetype.readyState){  //IE
        fileref.onreadystatechange = function(){
            if (fileref.readyState == "loaded" ||
                    fileref.readyState == "complete"){
                fileref.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        fileref.onload = function(){
            callback();
        };
    }

 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}




