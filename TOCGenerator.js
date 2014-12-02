'use strict'

var util = require("util");

/**
  * TOC genrator class 
  *
  * @constructor
  */
function TOCGenerator(){
	this.restart();
}

/**
  * Restart the classs properties
  */
TOCGenerator.prototype.restart = function(){
	this.nodeParent = {};
	this.nodeParent.childs = [];	
	this.nodeParent.level = 0;
	this.last = this.nodeParent;
}


/**
  * Add a item on TOC
  *
  * @param {string} - Text of header
  * @param {int} level  - level of header(h1, h2...)
  * @param {string} escapedText - Text escaped

  */
TOCGenerator.prototype.add = function (text, level, escapedText){
	var item = {};
	item.childs = [];
	item.level = level;
	item.escapedText = escapedText;	
	item.text = text;

  	item.nodeParent = getItemParent(this.last, item);  	
  	item.nodeParent.childs.push(item);
  	this.last = item;
}

/**
  * Generate TOC from added headers
  * 
  * @return {string} - Return generated HTML from TOC markdown
  */
TOCGenerator.prototype.generate = function(){		
	var marked = require("marked");		 
	var ret = marked(generateItem("", this.nodeParent), {renderer: marked.Renderer()});
	this.restart();
 	return ret;
}

function generateItem(levelStr, parent){
	var childs = parent.childs;
	var ret = "";		
	for(var i = 0; i < childs.length; i++){					
		ret += util.format("%s* [%s](#%s)\n", levelStr, childs[i].text, childs[i].escapedText);
		ret += generateItem(levelStr + "    ", childs[i]);
	}
	return ret;
}

function getItemParent(last2, item){
	if(item.level > last2.level){  
		return last2;  		
  	}else if(item.level == last2.level) {
  		return last2.nodeParent;  		
  	}else{
  		return getItemParent(last2.nodeParent, item);
  	}
}


module.exports = TOCGenerator;