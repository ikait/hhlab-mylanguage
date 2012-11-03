var Postfix = function (list) {
	this.children = list || [];
};
Postfix.prototype = new ASTList();