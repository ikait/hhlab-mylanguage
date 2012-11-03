// 引数リストを表すASTList
var ParameterList = function (list) {
	this.children = list || [];
};
ParameterList.prototype = new ASTList();

// index番目の引数の名前を返す (存在しなければnullを返す)
ParameterList.prototype.name = function (index) {
	return this.child(index) ?
		this.child(index).token().getText() :
		null;
};

// 引数の数を返す
ParameterList.prototype.size = function (index) {
	return this.numChildren();
};