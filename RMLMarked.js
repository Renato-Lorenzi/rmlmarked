var util = require("util");

function rmlmarked(markdown){
	var marked = require("marked");
	var hljs = require("highlight.js");	

	// Synchronous highlighting with highlight.js
	var options = {
	  highlight: function (code) {
	    return hljs.highlightAuto(code).value;
	  }
	};
		

	var toc = new TOCGenerator();
	var renderer = new marked.Renderer(options);	
	var indexToInsertTOC = markdown.indexOf("[TOC]");

	renderer.heading = function (text, level) {
	  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');	  	  
	  toc.add(text, level, escapedText);	  
	  return util.format('<h%d><a name="%s" class="anchor" href="#%s"><span class="header-link"></span></a>%s</h%d>',
	  					 level, escapedText, escapedText, text, level);
	  	  
	};	

	return toc.generate() + marked(markdown, { renderer: renderer });
}


//TODO: Extract this to external module
function TOCGenerator(){	
	this.markdown = "";
	this.nodeParent = {};
	this.nodeParent.childs = [];	
	this.nodeParent.level = 0;
	this.lastParent = this.nodeParent;
}

TOCGenerator.prototype.getItemParent = function (lastParent, item){
	if(item.level > lastParent.level){  
		return lastParent;  		
  	}else if(item.level == lastParent.level) {
  		return lastParent.nodeParent;  		
  	}else{
  		return this.getItemParent(lastParent.nodeParent, item);
  	}
}

TOCGenerator.prototype.add = function (text, level, escapedText){
	var item = {};
	item.childs = [];
	item.level = level;
	item.escapedText = escapedText;	
	item.text = text;

  	item.nodeParent = this.getItemParent(this.lastParent, item);
  	item.nodeParent.childs.put(item);
}

TOCGenerator.prototype.generateItem = function(levelStr, parent){
	var childs = parent.childs;
	var ret = "";
	for(item in childs){
		ret += util.format("%s* [%s](#%s)\n", levelStr, item.text, item.escapedText);
		ret += this.generateItem(levelStr + "    ", item);
	}
	return ret;
}

TOCGenerator.prototype.generate = function(){		
	var marked = require("marked");	
	return marked(this.generateItem("    ", this.nodeParent), {renderer: marked.Renderer()});
}


module.exports = rmlmarked;