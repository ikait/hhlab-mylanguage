// 構文木における葉を表現

// 継承関係: ASTree > ASTLeaf
// 構文木の1要素(=節 =ASTree)の中で、子要素を持たないもの(=葉)を表すのが、ASTLeaf


var ASTLeaf = function (t) {
	this.empty = [];
	this.token = t;
};
ASTLeaf.prototype = new ASTree();
ASTLeaf.prototype.child = function (i) {
	throw new Error('index out of bounds exception');
};
ASTLeaf.prototype.numChildren = function () {
	return 0;
};
ASTLeaf.prototype.children = function () {
	// return empty.iterator();
};
ASTLeaf.prototype.toString = function () {
	return this.token.getText();
};
ASTLeaf.prototype.location = function () {
	return 'at line ' + this.token.getLineNumber();
};
ASTLeaf.prototype.token = function () {
	return this.token;
};