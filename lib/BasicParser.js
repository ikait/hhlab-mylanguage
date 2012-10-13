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
BasicParser.prototype.primary = function () {};

// factor
// BNF文法規則: '-' primary | primary
BasicParser.prototype.factor = function () {};

// expr
// BNF文法規則: factor { OP factor }
BasicParser.prototype.expr = function () {};

// block
// BNF文法規則: '{' [ statement ] {(';' | EOL) [ statement ]} '}'
BasicParser.prototype.block = function () {};

// simple
// BNF文法規則: expr
BasicParser.prototype.simple = function () {};

// statement
// BNF文法規則: 'if' expr block [ 'else' block ] | 'while' expr block | simple
BasicParser.prototype.statement = function () {};

// program
// BNF文法規則: [ statement ] (';' | EOL)
BasicParser.prototype.program = function () {};


// ここから、ExprParserより持ってきた系メソッド ====================================

// lexerよりtokenをひとつもらってくる
// 指定したnameと異なるtokenが返ってきたらエラーを出す
// nameを指定せずにtokenを取得したいときは、直接 lexer.read() を使っている
BasicParser.prototype.token = function (name) {
	var t = this.lexer.read();
	if (!(t.isIdentifier() && name.equals(t.getText()))) {
		throw new Error('parse exception');
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