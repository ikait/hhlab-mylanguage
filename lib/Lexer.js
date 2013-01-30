// トークン (抽象クラスとして扱う。以下のタイプ付きトークンの雛形)
var Token = function (line) {
	this.lineNumber = line;
};

Token.prototype.getLineNumber = function () { return this.lineNumber; };
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

Token.EOF = new Token(-1);
Token.EOL = '\\n';


// 数字のトークン
var NumToken = function (line, number) {
	this.lineNumber = line;
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
var IdToken = function (line, id) {
	this.lineNumber = line;
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
var StrToken = function (line, str) {
	this.lineNumber = line;
	this.literal = str
		.replace(/^"|"$/g, '')
		.replace(/\\"/g, '"')
		.replace(/\\n/g, '\n');
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
	this.sourcecode = sourcecode.split(/\n/);

	this.hasMore = true;
	this.queue = [];
	this.lineNo = 0;

	this.tokenTypes = [{
		tokenClass: NumToken,
		pattern: /[\d]+/
	}, {
		tokenClass: IdToken,
		pattern: /[A-Z_a-z][A-Z_a-z0-9]*|==|<=|>=|&&|\|\||\\|\||{|}|\+|-|\*|%|\/|=|<|>|\(|\)|,/
	}, {
		tokenClass: StrToken,
		pattern: /"(\\"|\\\\|\\n|[^"])*"/
	}];

	this.pattern = generateTokensPattern(this.tokenTypes);
};

// 実際にtokenに分割して、配列にして返す
Lexer.prototype.read = function () {
	if (this.fillQueue(0)) {
		return this.queue.shift();
	} else {
		return Token.EOF;
	}
};

// インデックスiのtokenを取得
Lexer.prototype.peek = function (i) {
	if (this.fillQueue(i)) {
		return this.queue[0];
	} else {
		return Token.EOF;
	}
};

// tokenを読み込んでqueueにためる
Lexer.prototype.fillQueue = function (i) {
	// iを指定して、「this.queue[i]が存在する」ようになるまで読み込み
	// (つまりiは、「先読みしておくインデックス数」という感じ)

	while (i >= this.queue.length) {
		if (this.hasMore) {
			this.readLine();
		} else {
			return false;
		}
	}
	return true;
};

Lexer.prototype.readLine = function () {
	var line = this.sourcecode.shift();
	if (typeof line == 'undefined') {
		this.hasMore = false;
		return;
	}

	this.lineNo++;
	var lineNo = this.lineNo;

	var matcher;
	while (matcher = line.match(this.pattern)) {
		this.addToken(lineNo, matcher);
		line = line.slice(matcher.index + matcher[0].length);
	}
	this.queue.push(new IdToken(lineNo, Token.EOL));
};

Lexer.prototype.addToken = function (lineNo, matcher) {
	for (var i = 0; i < this.tokenTypes.length; i++) {
		if (matcher[i + 1]) {
			this.queue.push(
				new this.tokenTypes[i].tokenClass(lineNo, matcher[0])
			);
		}
	}
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
