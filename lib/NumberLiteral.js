// コンストラクタごと継承する実験
var NumberLiteral = function (t) {
	this.empty = [];
	this.token = t;
};
NumberLiteral.prototype = new ASTLeaf();
NumberLiteral.prototype.value = function () {
	return this.token().getNumber();
};


// package stone.ast;
// import stone.Token;

// public class NumberLiteral extends ASTLeaf {
//     public NumberLiteral(Token t) { super(t); }
//     public int value() { return token().getNumber(); }
// }
