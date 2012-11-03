// 構文木における根を表現

// 継承関係: ASTree > ASTList
// 構文木の1要素(=節 =ASTree)の中で、子要素を持つもの(=根)を表すのが、ASTList

var ASTList = function () {
	this.children = [];
};
ASTList.prototype = new ASTree();

ASTList.prototype.child = function (i) {
	return this.children[i] || null;
};

ASTList.prototype.numChildren = function () {
	return this.children.length;
};

ASTList.prototype.toString = function () {
	var strings = [];

	this.children.forEach(function (child) {
		strings.push(child.toString());
	});

	return '(' + strings.join(' ') + ')';

};

ASTList.prototype.location = function () {
	var result = null;

	this.children.forEach(function (child) {
		if (result) {
			return;
		}

		var s = child.location();
		if (s) {
			result = s;
		}
	});

	return result;
};
