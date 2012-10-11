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
Token.prototype.toString = function () {
	return this.getText();
};


// 数字のトークン
var NumToken = function (number) {
	this.value = number|0;
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
	this.literal = str
		.replace(/^"|"$/g, '')
		.replace(/\\"/g, '"');
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
		tokenClass: NumToken,
		pattern: /[\d]+/
	}, {
		tokenClass: IdToken,
		pattern: /[A-Z_a-z][A-Z_a-z0-9]*|==|<=|>=|&&|\\|\||{|}|\+|-|\*|=|<|>/
	}, {
		tokenClass: StrToken,
		pattern: /"(\\"|\\\\|\\n|[^"])*"/
	}];

	this.pattern = generateTokensPattern(this.tokenTypes);
	this.queue = null;
};

// 実際にtokenに分割して、配列にして返す
Lexer.prototype.read = function () {
	this.queue = [];

	// gオプションを付けてマッチしていってもよいが、
	// jsのmatchはgオプションを付けると、()の何番目にマッチしたかなどの情報が死ぬ
	// ので、sourceの文を削りながら、g無しでのマッチを繰り返す。
	var matcher;
	while (matcher = this.sourcecode.match(this.pattern)) {
		this.addToken(matcher);
	}

	this.sourcecode = '';

	return this.queue;
};

Lexer.prototype.addToken = function (matcher) {
	for (var i = 0; i < this.tokenTypes.length; i++) {
		if (matcher[i + 1]) {
			this.queue.push(
				new this.tokenTypes[i].tokenClass(matcher[0])
			);
		}
	}
	this.sourcecode = this.sourcecode.slice(
		matcher.index + matcher[0].length
	);
};

var generateTokensPattern = function (tokenTypes) {
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