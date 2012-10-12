var Name = function (t) {
	this.empty = [];
	this.token = t;
};
Name.prototype = new ASTLeaf();
Name.prototype.name = function () {
	return this.token().getText();
};


// package stone.ast;
// import stone.Token;

// public class Name extends ASTLeaf {
//     public Name(Token t) { super(t); }
//     public String name() { return token().getText(); }
// }
