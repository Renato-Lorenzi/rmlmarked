rmlmarked
=========



## Building
Para construir e ficilitar o uso em aplicações web deve-se criar o "bundle" que consiste em usar o [browserify](https://github.com/substack/browserify-handbook) com a opção [`--standalone`](http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds) que possibilita fazer a exportação para browser (requireJS, global, AMD...) do modulo que está sendo criado (nesse casso é o módulo `rmlmarked`).

``` ShellScript
browserify --standalone rmlmarked RMLMarked.js > bundle.js
```