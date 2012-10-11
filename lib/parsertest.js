var Parser = function (lexer) {
	this.Lexer = lexer;
};

Parser.prototype.ASTree = function () {

};

Parser.prototype.ASTLeaf = function () {

};

Parser.prototype.expression = function () {
	var left = this.term();
};

Parser.prototype.term = function () {
	// 最小単位のASTreeなので、
	// 呼び出すたびにqueueをshiftしてくればいいとおもう
	// ただしそれをASTにぶちこむ
};

