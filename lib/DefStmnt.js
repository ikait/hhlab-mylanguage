// 関数定義文を表すASTList

var DefStmnt = function (list) {
	this.children = list || [];
};
DefStmnt.prototype = new ASTList();

DefStmnt.prototype.name = function () {
	return this.child(0).token.getText();
};

DefStmnt.prototype.parameters = function () {
	return this.child(1);
};

DefStmnt.prototype.body = function () {
	return this.child(2);
};

DefStmnt.prototype.toString = function () {
	return '(def ' + this.name() + ' ' + this.parameters() + ' ' + this.body() + ')';
};

