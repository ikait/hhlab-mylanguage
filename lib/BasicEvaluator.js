// AST系のクラスに、まとめてevalを追加していきます。
// 各々のクラスのprototypeにevalを書けばいいだけなので、jsはかんたん。

// ASTreeのeval
// 何の情報も持っていないので、nullを返す
ASTree.prototype.eval = function () {
	return null;
};

// BinaryExprのeval
BinaryExpr.prototype.eval = function (env) {
	var varname, rightvalue;
	var op = this.operator();

	// opについて、それぞれ演算子にマッチしたら、適切な計算を行って値を返す
	if (op == '=') {
		console.log(this);
		console.log(this.left());

		rightvalue = this.right().eval(env);
		var left = this.left();

		// leftは、parserによってPrimaryExprだったり、
		// NumberLiteralとかNameとかがそのまま入っていたりするので…
		// PrimaryExprだったら、中身をとってきてleftに再代入
		if (!left.name && left.child(0)) {
			left = left.child(0);
		}

		// 左辺がName(変数を示すもの)だったら、代入の処理
		if (!left.name) {
			throw new Error(left + ' is not variable.');
		}

		varname = left.name();
		env.put(varname, rightvalue);

		return rightvalue;
	}

	if (op == '+') {
		return this.left().eval(env) + this.right().eval(env);
	} else if (op == '-') {
		return this.left().eval(env) - this.right().eval(env);
	} else if (op == '*') {
		return this.left().eval(env) * this.right().eval(env);
	} else if (op == '/') {
		return this.left().eval(env) / this.right().eval(env);
	} else if (op == '%') {
		return this.left().eval(env) % this.right().eval(env);
	} else if (op == '==') {
		return this.left().eval(env) == this.right().eval(env);
	} else if (op == '>') {
		return this.left().eval(env) > this.right().eval(env);
	} else if (op == '<') {
		return this.left().eval(env) < this.right().eval(env);
	}

	// opが何にもマッチしなかったら、nullを返す
	return null;
};

// BlockStmntのeval
BlockStmnt.prototype.eval = function (env) {
	var result = null;
  this.children.forEach(function (child) {
  	result = child.eval(env);
  });
	return result;
};

// IfStmntのeval
IfStmnt.prototype.eval = function (env) {
	var c = this.condition().eval(env);

	if (c) {
		return this.thenBlock().eval(env);
	} else {
		if (this.elseBlock()) {
			return this.elseBlock().eval(env);
		}
		else {
			return null;
		}
	}
};

// Nameのeval
Name.prototype.eval = function (env) {
	return env.get(this.name());
};

// NegativeExprのeval
NegativeExpr.prototype.eval = function (env) {
	var v = this.operand().eval(env);
	if (v) {
		return -v;
	}	else {
		throw new Error("bad type for -");
	}
};

// NumberLiteralのeval (自分の数字を返すだけ)
NumberLiteral.prototype.eval = function (env) {
	// 一応、数値に変換してから返す
	return this.value()|0;
};

// StringLiteralのeval
StringLiteral.prototype.eval = function (env) {
	// 一応、文字列に変換してから返す
	return this.value() + "";
};

// WhileStmntのeval
WhileStmnt.prototype.eval = function (env) {
	var result = null;
	while (true) {
		var c = this.condition().eval(env);
		if (c) {
			result = this.body().eval(env);
		} else {
			return result;
		};
	}
};

