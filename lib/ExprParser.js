// 四則演算のparser
var ExprParser = function (p) {
	this.lexer = p;
};

ExprParser.prototype.expression = function () {
	var op, right;
	var left = this.term();

	while (this.isToken('+') || this.isToken('-')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.term();
		left = new BinaryExpr([left, op, right]);
	}

	return left;
};

ExprParser.prototype.term = function () {
	var op, right;

	var left = this.factor();
	while (this.isToken('*') || this.isToken('/')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.factor();
		left = new BinaryExpr([left, op, right]);
	}

	return left;
};

ExprParser.prototype.factor = function () {
	var e, t, n;

	if (this.isToken('(')) {
		this.token('(');
		e = this.expression();
		this.token(')');
		return e;
	} else {
		t = this.lexer.read();
		if (t.isNumber) {
			n = new NumberLiteral(t);
			return n;
		} else {
			throw new Error('parse exception');
		}
	}
};

ExprParser.prototype.token = function (name) {
	var t = this.lexer.read();
	if (!(t.isIdentifier() && name.equals(t.getText()))) {
		throw new Error('parse exception');
	}

};

ExprParser.prototype.isToken = function (name) {
	var t = this.lexer.peek(0);
	return t.isIdentifier() && name == t.getText();
};

// main関数…とりあえず保持
var main = function (sourcecode) {
	var lexer = new Lexer(sourcecode);
	var p = new ExprParser(lexer);
	var t = p.expression();
	return '=> ' + t;
};