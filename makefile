all:
	@browserify --standalone rmlmarked RMLMarked.js > bundle.js
	@uglifyjs -o rmlmarked.min.js bundle.js	

	@browserify rmlmarked.autoload.js > bundle.autoload.js
	@uglifyjs -o rmlmarked.autoload.min.js bundle.autoload.js		

clean:	
	@rm rmlmarked.min.js
	@rm rmlmarked.autoload.min.js

bench:
	@node test --bench

.PHONY: clean all