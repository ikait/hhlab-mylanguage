// AST系のクラスに、まとめてevalを追加していきます。
// 各々のクラスのprototypeにevalを書けばいいだけなので、jsはかんたん。

// ASTreeのeval (何の情報も持っていないので、nullを返す)
ASTree.prototype.eval = function () {
	return null;
};

// BinaryExprのeval
BinaryExpr.prototype.eval = function () {
	var op = this.operator();

	// opについて、それぞれ演算子にマッチしたら、適切な計算を行って値を返す
	if (op == '+') {
		return this.left().eval() + this.right().eval();
	}

	// opが何にもマッチしなかったら、nullを返す
	return null;
};

// NumberLiteralのeval (自分の数字を返すだけ)
NumberLiteral.prototype.eval = function () {
	// 一応、数値に変換してから返す
	return this.value()|0;
};