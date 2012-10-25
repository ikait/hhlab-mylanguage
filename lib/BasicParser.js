// 教科書リスト5.1の文法定義を表現するパーサー

// リスト5.2のjavaをjavascript化してもいいんですが、ちょっと構文木からはかなり
// 離れていて分かりづらそうだったので、リスト16.2のExprParserと同じ攻め方の
// BasicParserを作る方針でやってみたい(まずは)。

var BasicParser = function (p) {
	this.lexer = p;
};


// ここから、リスト5.1に基づいた各パーサー ==========================================


// primary
// BNF文法規則: '(' expr ')' | NUMBER | IDENTIFIER | STRING
BasicParser.prototype.primary = function () {
	var e, t, n, i, s;
	
	if (this.isToken('(')) {
		this.token('(');
		e = this.equation();// 変えました
		this.token(')');
		return e;
	} else {
		t = this.lexer.read();
		if (t.isNumber()) {
			n = new NumberLiteral(t);
			return n;
		} else if (t.isIdentifier()){
			i = new Name(t);
			return i;
		} else if (t.isString()){
			s = new StringLiteral(t);
			return s;
		} else {
			this.parseError(t);
		}
	}
};

// factor
// BNF文法規則: '-' primary | primary
BasicParser.prototype.factor = function () {
	if(this.isToken('-')){
		var op = new ASTLeaf(this.token('-'));
		return new ASTList([op, this.primary()]);
	}else{
		return this.primary();
	}
};

// term
// 優先順位4（かけ算、わり算）
// 勝手に作りました
BasicParser.prototype.term = function(){
        var op, right;
        var left = this.factor();

        while(this.isToken('*') || this.isToken('/') || this.isToken('%')){
                op = new ASTLeaf(this.lexer.read());
		right = this.factor();
		left = new BinaryExpr([left, op, right]);
	}
        return left;
};

// expr
// 優先順位3（たし算、ひき算）
// BNF文法規則: factor { OP factor }
BasicParser.prototype.expr = function () {
	var op, right;
	var left = this.term();

	while (this.isToken('+') || this.isToken('-')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.term();
		left = new BinaryExpr([left, op, right]);
	}

	return left;
};

// inequality
// 優先順位2（不等式など）
// 勝手に作りました
BasicParser.prototype.inequality = function () {
	var op, right;
	var left = this.expr();

	while (this.isToken('==') || this.isToken('>') || this.isToken('<')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.expr();
		left = new BinaryExpr([left, op, right]);
	}

	return left;
};

// equation
// 優先順位1（方程式）
// 勝手に作りました
BasicParser.prototype.equation = function () {
	var op, right;
	var left = this.inequality();

	while (this.isToken('=')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.equation();
		left = new BinaryExpr([left, op, right]);
	}

	return left;
};

// block
// BNF文法規則: '{' [ statement ] {(';' | EOL) [ statement ]} '}'
BasicParser.prototype.block = function () {
	var statements = [];

	this.token('{');

	if (!(this.isToken(';') || this.isToken(Token.EOL))) {
		statements.push(this.statement());
	}

	while (!this.isToken('}')) {
		if (!(this.isToken(';') || this.isToken(Token.EOL))) {
			this.parseError(this.lexer.read());
		}
		this.lexer.read(); // (';' | EOL)

		if (!(this.isToken(';') || this.isToken(Token.EOL) || this.isToken('}'))) {
			statements.push(this.statement());
		}
	}
	this.token('}');
	return new BlockStmnt(statements);
};

// simple
// BNF文法規則: expr
BasicParser.prototype.simple = function () {
	var e = this.equation();// 変えました
	return e;
};

// statement
// BNF文法規則: 'if' expr block [ 'else' block ] | 'while' expr block | simple
BasicParser.prototype.statement = function () {
	var i, e, b1, b2, s;
	if (this.isToken('if')) {
		this.token('if');
		e = this.equation();// 変えました
		b1 = this.block();
		i = new IfStmnt([e, b1]);
		if ( this.isToken('else')) {
			this.token('else');
			b2 = this.block();
			i = new IfStmnt([e, b1, b2]);
		}
		return i;
	} else if (this.isToken('while')) {
		this.token('while');
		e = this.equation();// 変えました
		b1 = this.block();
		i = new WhileStmnt([e, b1]);
		return i;
	} else {
		s = this.simple();
		return s;
	}
};

// program
// BNF文法規則: [ statement ] (';' | EOL)
BasicParser.prototype.program = function () {
	var s, n;
	if (this.isToken(';') || this.isToken(Token.EOL)) {
		n = this.lexer.read();
		return new NullStmnt();
	} else {
		s = this.statement();
		n = this.lexer.read(); // (';' | EOL) のはず
		return s;
	}
};


BasicParser.prototype.parseError = function (errorToken) {
	throw new Error(
		'parse error. invalid token "' + errorToken +  '" ' +
			'at line ' + errorToken.lineNumber + '.'
	);
};



// ここから、ExprParserより持ってきた系メソッド ====================================

// lexerよりtokenをひとつもらってくる
// 指定したnameと異なるtokenが返ってきたらエラーを出す
// nameを指定せずにtokenを取得したいときは、直接 lexer.read() を使っている
BasicParser.prototype.token = function (name) {
	var t = this.lexer.read();
	if (!(t.isIdentifier() && name == t.getText())) {
		this.parseError(t);
	}

};

// lexerが次に出してくるtokenが何なのか確認する
BasicParser.prototype.isToken = function (name) {
	var t = this.lexer.peek(0);
	return t.isIdentifier() && name == t.getText();
};

// 実際にパースを行う
BasicParser.prototype.parse = function () {
	return this.program();
};