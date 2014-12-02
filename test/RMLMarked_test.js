//should tests
require("chai").should();

var rmlmarked = require("../RMLMarked");

describe('RMLMarked - Testing TOC', function (){
	it('Should return alright simple toc', function(){
		rmlmarked("#teste").
				should.equal('<ul>\n' + 
							 '<li><a href="#teste">teste</a></li>\n' +
							 '</ul>\n' + 
							'<h1><a name="teste" class="anchor" href="#teste"><span class="header-link"></span></a>teste</h1>');
	}),
	it('Should return alright toc with h2', function(){
		rmlmarked("##teste").
				should.equal('<ul>\n' + 
							 '<li><a href="#teste">teste</a></li>\n' +
							 '</ul>\n' + 
							'<h2><a name="teste" class="anchor" href="#teste"><span class="header-link"></span></a>teste</h2>');
	}),
	it('Should return alright toc with h3', function(){
		rmlmarked("###teste").
				should.equal('<ul>\n' + 
							 '<li><a href="#teste">teste</a></li>\n' +
							 '</ul>\n' + 
							'<h3><a name="teste" class="anchor" href="#teste"><span class="header-link"></span></a>teste</h3>');
	}),
	it('Should return alright toc with h2 and TOC after text', function(){
		rmlmarked("testmarkdown text toc after\n"+
				  "##teste").
				should.equal('<p>testmarkdown text toc after</p>\n<ul>\n<li><a href=\"#teste\">teste</a></li>\n</ul>\n<h2><a name=\"teste\" class=\"anchor\" href=\"#teste\"><span class=\"header-link\"></span></a>teste</h2>');
	}),
	it('Should return TOC in mark location', function(){
		
		rmlmarked("testmarkdown text toc after\n" +
				  "[TOC]\n" +
				  "##teste").
				should.equal('<p>testmarkdown text toc after\n<ul>\n<li><a href=\"#teste\">teste</a></li>\n</ul>\n</p>\n<!--FIRST_HEADER_MARKDOWN--><h2><a name=\"teste\" class=\"anchor\" href=\"#teste\"><span class=\"header-link\"></span></a>teste</h2>');
	}),
	it('Should return TOC in mark location ignoring before headers on TOC', function(){
		
		rmlmarked("testmarkdown text toc after\n" +
				  "##header1\n" +
				  "[TOC]\n" +
				  "##header2").
				should.equal('<p>testmarkdown text toc after</p>\n<!--FIRST_HEADER_MARKDOWN--><h2><a name=\"header1\" class=\"anchor\" href=\"#header1\"><span class=\"header-link\"></span></a>header1</h2><p><ul>\n<li><a href=\"#header2\">header2</a></li>\n</ul>\n</p>\n<h2><a name=\"header2\" class=\"anchor\" href=\"#header2\"><span class=\"header-link\"></span></a>header2</h2>');
	}),
	it('Should return without TOC', function(){		
		rmlmarked("testmarkdown without TOC").should.equal('<p>testmarkdown without TOC</p>\n');
	}),
	it('Should return slugified link references to TOC', function(){		
		rmlmarked("#táúíóéç~´ãẽàè").should.equal('<ul>\n<li><a href=\"#tauioec~aae\">táúíóéç~´ãẽàè</a></li>\n</ul>\n<h1><a name=\"tauioec~aae\" class=\"anchor\" href=\"#tauioec~aae\"><span class=\"header-link\"></span></a>táúíóéç~´ãẽàè</h1>');
	})
});

describe('RMLMarked - Other tests', function(){	
	it('Should return formatted code block with highlight.js lib', function(){		
		rmlmarked("#testmarkdown\n"+ 
				  "test code:\n" + 
				  "```java\n" +
				  "		public class Test{\n"+
				  "		}\n" +
				  "```").should.equal('<ul>\n<li><a href=\"#testmarkdown\">testmarkdown</a></li>\n</ul>\n<h1><a name=\"testmarkdown\" class=\"anchor\" href=\"#testmarkdown\"><span class=\"header-link\"></span></a>testmarkdown</h1><p>test code:</p>\n<pre><code class=\"lang-java\">        <span class=\"hljs-keyword\">public</span> <span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span> <span class=\"hljs-title\">Test</span></span>{\n        }\n</code></pre>\n');
	})
})
