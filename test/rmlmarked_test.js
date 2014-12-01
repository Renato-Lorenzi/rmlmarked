//should tests
require("chai").should();

var rmlmarked = require("../RMLMarked");

describe('TOC', function (){
	it('Should return alright simple toc', function(){
		console.log();
		rmlmarked("#teste").
				should.equal('<ul>\n' + 
							 '<li><a href="#teste">teste</a></li>\n' +
							 '</ul>\n' + 
							'<h1><a name="teste" class="anchor" href="#teste"><span class="header-link"></span></a>teste</h1>');
	}),
	it('Should return alright toc with h2', function(){
		console.log();
		rmlmarked("##teste").
				should.equal('<ul>\n' + 
							 '<li><a href="#teste">teste</a></li>\n' +
							 '</ul>\n' + 
							'<h2><a name="teste" class="anchor" href="#teste"><span class="header-link"></span></a>teste</h2>');
	}),
	it('Should return alright toc with h3', function(){
		console.log();
		rmlmarked("###teste").
				should.equal('<ul>\n' + 
							 '<li><a href="#teste">teste</a></li>\n' +
							 '</ul>\n' + 
							'<h3><a name="teste" class="anchor" href="#teste"><span class="header-link"></span></a>teste</h3>');
	})
})
