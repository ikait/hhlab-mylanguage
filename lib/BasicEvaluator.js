// AST系のクラスに、まとめてevalを追加していきます。
// 各々のクラスのprototypeにevalを書けばいいだけなので、jsはかんたん。

// NumberLiteralのeval (自分の数字を返すだけ)
NumberLiteral.prototype.eval = function () {
	// 一応、数値に変換してから返す
	return this.value|0;
};