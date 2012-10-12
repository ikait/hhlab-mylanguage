var ASTList = function (list) {
	this.children = list;
};
ASTList.prototype = new ASTree();

ASTList.prototoype.child = function (i) {
	return this.children[i] || null;
};

ASTList.prototoype.numChildren = function () {
	// ただのlengthでよいかはまだ不明
	return this.children.length;
};

ASTList.prototoype.children = function () {
	// return children.iterator();
	// ?
};

ASTList.prototoype.toString = function () {
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
