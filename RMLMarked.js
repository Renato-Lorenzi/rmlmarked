var util = require("util");

function rmlmarked(markdown){
	var marked = require("marked");
	var hljs = require("highlight.js");	


	var options = {
	  highlight: function (code) {
	    return hljs.highlightAuto(code).value;
	  }
	};
	// Synchronous highlighting with highlight.js
	marked.setOptions(options);

	var toc;
	var originRenderer = new marked.Renderer(options);
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


	return marked(markdown, { renderer: renderer }).replace("[TOC]", toc.generate());
}


//TODO: Extract this to external module
function TOCGenerator(){	
	this.markdown = "";
}

TOCGenerator.prototype.add = function (text, level, escapedText){
	var item = "   ";
	 for(i = 1; i < level; i++){
	 	item += "   ";
	 }

	this.markdown += util.format("%s* [%s](#%s)\n", item, text, escapedText);	
}

TOCGenerator.prototype.generate = function(){		
	var marked = require("marked");	
	return marked(this.markdown);
}


module.exports = rmlmarked;