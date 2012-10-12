var ASTList = function (list) {
	this.children = list;
};
ASTList.prototype = new ASTree();

ASTList.prototype.child = function (i) {
	return this.children[i] || null;
};

ASTList.prototype.numChildren = function () {
	// ただのlengthでよいかはまだ不明
	return this.children.length;
};

ASTList.prototype.children = function () {
	// return children.iterator();
	// ?
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
