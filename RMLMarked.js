'use strict'

var util = require("util");
var TOCGenerator = require("./TOCGenerator");
var slugify = require('slugify');

var FIRST_HEADER = "<!--FIRST_HEADER_MARKDOWN-->";
var TOC_MARK = "[TOC]";

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
	var oriRender = new marked.Renderer(options);
	var indexOfTOC = markdown.indexOf("[TOC]");
	var foundTOC = false;	

	renderer.paragraph = function(text){				
		if(!foundTOC && indexOfTOC > -1){			
			if(text.indexOf("[TOC]") > -1	){
				toc.restart();
				foundTOC = true;						
			}
		}
		return oriRender.paragraph(text);
	}

	var firstHeader = true;
	renderer.heading = function (text, level) {
	    var ret = "";
	    if(firstHeader){
	    	firstHeader = false;
	    	ret = FIRST_HEADER;
	    }
	    var escapedText = slugify(text);	  
	    toc.add(text, level, escapedText);	  
	    return ret + util.format('<h%d><a name="%s" class="anchor" href="#%s"><span class="header-link"></span></a>%s</h%d>',
	    					 level, escapedText, escapedText, text, level);
	  	  
	};	

	var ret = marked(markdown, { renderer: renderer });	
	return  foundTOC ? ret.replace(TOC_MARK, toc.generate()) : ret.replace(FIRST_HEADER, toc.generate());
}





module.exports = rmlmarked;