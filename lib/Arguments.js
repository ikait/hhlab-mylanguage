var Arguments = function (list) {
	this.children = list || [];
};
Arguments.prototype = new Postfix();

Arguments.prototype.size = function () {
	return this.numChildren();
};
