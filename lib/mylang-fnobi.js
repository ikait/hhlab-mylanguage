// 言語処理系 (fnobi版)

// トークン (抽象クラスとして扱う。以下のタイプ付きトークンの雛形)
var Token = function () { };
Token.prototype.isIdentifier = function () { return false; };
Token.prototype.isNumber = function () { return false; };
Token.prototype.isString = function () { return false; };

Token.prototype.getNumber = function () {
	throw new Error('not number token');
};
Token.prototype.getText = function () {
	return '';
};


// 数字のトークン
var NumToken = function (number) {
	this.value = number;
};
NumToken.prototype = new Token();
NumToken.prototype.isNumber = function () {
	return true;
};
NumToken.prototype.getText = function () {
	return this.value + '';
};
NumToken.prototype.getNumber = function () {
	return this.value;
};


// 識別子のトークン
var IdToken = function (id) {
	this.text = id;
};
IdToken.prototype = new Token();
IdToken.prototype.isIdentifier = function () {
	return true;
};
IdToken.prototype.getText = function () {
	return this.text;
};


// 文字列のトークン
var StrToken = function (str) {
	this.literal = str;
};
StrToken.prototype = new Token();
StrToken.prototype.isString = function () {
	return true;
};
StrToken.prototype.getText = function () {
	return this.literal;
};


// sourcecodeをtokenに分割するクラス
var Lexer = function (sourcecode) {
	this.sourcecode = sourcecode;

	this.tokenTypes = [{
		type: 'number',
		pattern: /[\d]+/
	}, {
		type: 'symbol',
		pattern: /<|>|=|\{|\}|\+|-/
	}];

	this.regexp = tokensPattern(this.tokenTypes);
};

// 実際にtokenに分割して、配列にして返す
Lexer.prototype.read = function () {
	var source = this.sourcecode;
	var results = [];

	// gオプションを付けてマッチしていってもよいが、
	// jsのmatchはgオプションを付けると、()の何番目にマッチしたかなどの情報が死ぬ
	// ので、sourceの文を削りながら、g無しでのマッチを繰り返す。
	var match;
	while (match = source.match(this.regexp)) {
		for (var i = 0; i < this.tokenTypes.length; i++) {
			if (match[i + 1]) {
				results.push([
					match[0],
					this.tokenTypes[i].type
				]);
			}
		}
		source = source.slice(match.index + match[0].length);
	}

	return results;
};

var tokensPattern = function (tokenTypes) {
	var exps = [];

	tokenTypes.forEach(function (tokenType) {
		exps.push(
			(tokenType.pattern + '')
				.replace(/^\//, '(')
				.replace(/\/$/, ')')
		);
	});

	return new RegExp(exps.join('|'));
};


// fnobiの名前でまとめる
mylang.fnobi = {
	Lexer: Lexer
};