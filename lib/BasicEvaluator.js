// AST系のクラスに、まとめてevalを追加していきます。
// 各々のクラスのprototypeにevalを書けばいいだけなので、jsはかんたん。

// ASTreeのeval
// 何の情報も持っていないので、nullを返す
ASTree.prototype.eval = function () {
	return null;
};

// BinaryExprのeval
BinaryExpr.prototype.eval = function () {
	var op = this.operator();

	// opについて、それぞれ演算子にマッチしたら、適切な計算を行って値を返す
	if (op == '+') {
		return this.left().eval() + this.right().eval();
	} else if (op == '-') {
		return this.left().eval() - this.right().eval();
	} else if (op == '*') {
		return this.left().eval() * this.right().eval();
	} else if (op == '/') {
		return this.left().eval() / this.right().eval();
	} else if (op == '%') {
		return this.left().eval() % this.right().eval();
	}

	// opが何にもマッチしなかったら、nullを返す
	return null;
};

// BlockStmntのeval
BlockStmnt.prototype.eval = function (env) {

};

// IfStmntのeval
IfStmnt.prototype.eval = function (env) {

};

// Nameのeval
Name.prototype.eval = function (env) {

};

// NegativeExprのeval
NegativeExpr.prototype.eval = function (env) {

};

// NumberLiteralのeval (自分の数字を返すだけ)
NumberLiteral.prototype.eval = function (env) {
	// 一応、数値に変換してから返す
	return this.value()|0;
};

// StringLiteralのeval
StringLiteral.prototype.eval = function (env) {

};

// WhileStmntのeval
WhileStmnt.prototype.eval = function (env) {

};

