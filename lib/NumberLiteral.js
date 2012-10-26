// 「ただの数字」を表すASTLeaf

// 継承関係: ASTree > ASTLeaf > NumberLiteral
// 構文木の1要素(=節 =ASTree)の中で、子要素を持たないもの(=葉 =ASTLeaf)の中で、単なる数字を表すものが、NumberLiteral

var NumberLiteral = function (t) {
	this.empty = [];
	this.token = t;
};
NumberLiteral.prototype = new ASTLeaf();
NumberLiteral.prototype.value = function () {
	return this.token.getNumber();
};


// オリジナルのjavaコード
//
// package stone.ast;
// import stone.Token;

// public class NumberLiteral extends ASTLeaf {
//     public NumberLiteral(Token t) { super(t); }
//     public int value() { return token().getNumber(); }
// }
