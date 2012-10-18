var StringLiteral = function (t) {
	this.empty = [];
	this.token = t;
};
StringLiteral.prototype = new ASTLeaf();

StringLiteral.prototype.value = function() {
	return this.token().getText();
}

// package stone.ast;
// import stone.Token;

// public class StringLiteral extends ASTLeaf {
//     public StringLiteral(Token t) { super(t); }
//     public String value() { return token().getText(); }
// }
