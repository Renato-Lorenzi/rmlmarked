var util = require("util");

function rmlmarked(markdown){
	var marked = require("marked");
	var hljs = require("highlight.js");	


	// Synchronous highlighting with highlight.js
	marked.setOptions({
	  highlight: function (code) {
	    return hljs.highlightAuto(code).value;
	  }
	});

	var toc;
	var renderer = new marked.Renderer();	
	var indexToInsertTOC = markdown.indexOf("[TOC]");

	renderer.heading = function (text, level) {
	  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
	  var ret = "";
	  if(!toc){	  	
	  	toc = new TOCGenerator();
	  	if(indexToInsertTOC < 0){
	  		ret = "[TOC]";
	  	}
	  }
	  toc.add(text, level, escapedText);	  
	  ret += util.format('<h%d><a name="%s" class="anchor" href="#%s"><span class="header-link"></span></a>%s</h%d>',
	  					 level, escapedText, escapedText, text, level);
	  return ret;	  
	};	

	renderer.table = function(header, body) {
	    return '<table class="pure-table pure-table-bordered">\n'
	    	+ '<thead>\n'
	    	+ header
		    + '</thead>\n'
		    + '<tbody>\n'
		    + body
		    + '</tbody>\n'
		    + '</table>\n';
	}

    var isOdd = false;

    renderer.tablerow = function(content) {
    	var clazz = isOdd ? 'class="pure-table-odd"' : "";
    	isOdd = !isOdd;
  		return '<tr '+ clazz + ' >\n' + content + '</tr>\n';
	};	



	return marked(markdown, { renderer: renderer }).replace("[TOC]", toc.generate());				
}


//TODO: Extract this to external module
function TOCGenerator(){	
	this.markdown = "";
}

TOCGenerator.prototype.add = function (text, level, escapedText){
	var item = " ";
	 for(i = 1; i < level; i++){
	 	item += " ";
	 }

	this.markdown += util.format("%s* [%s](#%s)\n", item, text, escapedText);	
}

TOCGenerator.prototype.generate = function(){		
	var marked = require("marked");	
	return marked(this.markdown);
}


module.exports = rmlmarked;