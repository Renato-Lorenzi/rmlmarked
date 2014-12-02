'use strict'

//should tests
require("chai").should();
var TOCGenerator = require("../TOCGenerator");

describe('TOCGenerator', function (){
	it('Should return alright simple toc in any levels', function(){		
  		var toc = new TOCGenerator();
  		for(var i = 1;i < 6; i++){										  			
			toc.add("batatinha", i, "batatinha");
			toc.generate().should.equal('<ul>\n<li><a href=\"#batatinha\">batatinha</a></li>\n</ul>\n');			
		}				
	}),
	it('Should return all in same level, because not hierarchy defined', function(){		
  		var toc = new TOCGenerator();
  		toc.add("batatinha2", 2, "batatinha2");
  		toc.add("batatinha1", 1, "batatinha1");  		
  		toc.generate().should.equal('<ul>\n<li><a href=\"#batatinha2\">batatinha2</a></li>\n<li><a href=\"#batatinha1\">batatinha1</a></li>\n</ul>\n');			

  		toc.add("batatinha5", 5, "batatinha5");
  		toc.add("batatinha1", 1, "batatinha1");  		
  		toc.generate().should.equal('<ul>\n<li><a href=\"#batatinha5\">batatinha5</a></li>\n<li><a href=\"#batatinha1\">batatinha1</a></li>\n</ul>\n');			
	}),
	it('Should return all with broken hierarchy', function(){		
  		var toc = new TOCGenerator();  		
  		toc.add("t5", 5, "e5");
  		toc.add("t1", 1, "e1");
  		toc.add("t2", 2, "e1.1");  		
  		toc.add("t2", 5, "e1.2");
  		toc.add("t2", 2, "e2");
  		toc.add("t4", 4, "e4");
  		
  		toc.generate().should.equal('<ul>\n<li><a href=\"#e5\">t5</a></li>\n<li><a href=\"#e1\">t1</a><ul>\n<li><a href=\"#e1.1\">t2</a><ul>\n<li><a href=\"#e1.2\">t2</a></li>\n</ul>\n</li>\n<li><a href=\"#e2\">t2</a><ul>\n<li><a href=\"#e4\">t4</a></li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n');			
	}),
	it('Should return alright hierarchy defined', function(){		
  		var toc = new TOCGenerator();
  		toc.add("t1", 1, "e1");
  		toc.add("t2", 2, "e2");  		
  		toc.add("t3", 3, "e3");
  		toc.add("t4", 4, "e4");
  		toc.add("t5", 5, "e5");
  		toc.generate().should.equal('<ul>\n<li><a href=\"#e1\">t1</a><ul>\n<li><a href=\"#e2\">t2</a><ul>\n<li><a href=\"#e3\">t3</a><ul>\n<li><a href=\"#e4\">t4</a><ul>\n<li><a href=\"#e5\">t5</a></li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n');			
	}),
	it('Should return alright hierarchy defined with childs in item', function(){		
  		var toc = new TOCGenerator();
  		toc.add("t1", 1, "e1");
  		toc.add("t2", 2, "e2");
  		toc.add("t2", 3, "e2.1");
  		toc.add("t3", 3, "e2.2");
  		toc.add("t4", 4, "e4");
  		toc.add("t5", 5, "e5");
  		toc.generate().should.equal('<ul>\n<li><a href=\"#e1\">t1</a><ul>\n<li><a href=\"#e2\">t2</a><ul>\n<li><a href=\"#e2.1\">t2</a></li>\n<li><a href=\"#e2.2\">t3</a><ul>\n<li><a href=\"#e4\">t4</a><ul>\n<li><a href=\"#e5\">t5</a></li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n');			
	});	



});