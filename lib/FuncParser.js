// 関数定義・呼び出しに対応したパーサー
// BasicParserを継承しているので、BNFに対応する関数のみ、ここで記述する
var FuncParser = function(p){
	this.lexer = p;
};

FuncParser.prototype = new BasicParser();

// param: IDENTIFIER
FuncParser.prototype.param = function(){
	var t, i;

	t = this.lexer.read();
	if(t.isIdentifier()){
		i = new Name(t);
		return i;
	}else{
		this.parseError(t);
	}
};

// params: param { "," param }
FuncParser.prototype.params = function(){
	var args = [];
	args.push(this.param());

	while (this.isToken(',')) {
		this.token(',');
		args.push(this.param());
	}

	return new Arguments(args);

	// どうやらこのままだと、引数が1つのときにはArgumentsを返さない仕様だったので
	// 書き直しました。ふじさわ
	//
	// var t, right;
	// var left = this.param();

	// while(this.isToken(',')){
	// 	t = new ASTLeaf(this.lexer.read());
	// 	right = this.param();
	// 	left = new Arguments([left, right]);
	// }

	// return left;
};

// param_list: "(" [ params ] ")"
FuncParser.prototype.param_list = function(){
	var p;

	this.token('(');

	if(this.isToken(')')){
		p = new NullStmnt();
	}else{
		p = this.params();
	}

	this.token(')');
	return p;
};


// def: "def" IDENTIFIER param_list block
FuncParser.prototype.def = function(){
	var t, i, pl, b;

	this.token('def');

	t = this.lexer.read();

	i = new Name(t);
	pl = this.param_list();
	b = this.block();

	return new DefStmnt([i, pl, b]);
};


// args: expr { "," expr }（教科書）
//　args: equation { "," equation }
FuncParser.prototype.args = function(){
	var args = [];
	args.push(this.equation());

	while (this.isToken(',')) {
		this.token(',');
		var p = this.lexer.peek(0);
		while (this.isToken('\\n')) {
			this.token('\\n');
		}
		args.push(this.equation());
	}

	return new Arguments(args);

	// どうやらこのままだと、引数が1つのときにはASTListを返さない仕様だったので
	// 書き直しました。ふじさわ
	//
	// var t, right;
	// var left = this.equation();

	// while(this.isToken(',')){
	// 	t = new ASTLeaf(this.lexer.read());
	// 	right = this.equation();
	// 	left = new ASTList([left, right]);
	// }
	// return left;
};


// postfix: "(" [ args ] ")"
FuncParser.prototype.postfix = function(){
	var a;

	this.token('(');
	while (this.isToken('\\n')) {
		this.token('\\n');
	}
	if(this.isToken(')')){
		a = new NullStmnt();
	}else{
		a = this.args();
	}
	while (this.isToken('\\n')) {
		this.token('\\n');
	}
	this.token(')');
	return a;
};

// primary: ( "(" expr ")" | NUMBER | IDENTIFIER | STRING ) { postfix }（教科書）
// primary: ( "(" equation ")" | NUMBER | IDENTIFIER | STRING ) { postfix }
FuncParser.prototype.primary = function(){
	var left, t, right;

	if (this.isToken('(')) {
		this.token('(');
		left = this.equation();
		this.token(')');
	} else {
		t = this.lexer.read();
		if (t.isNumber()) {
			left = new NumberLiteral(t);
		} else if (t.isIdentifier()){
			left = new Name(t);
		} else if (t.isString()){
			left = new StringLiteral(t);
		} else {
			this.parseError(t);
		}
	}

	if(this.isToken('(')){
		right = this.postfix();
		return new PrimaryExpr([left, right]);
	} else {
		return new PrimaryExpr([left]);
	}
};

// simple: expr [ args ]（教科書）
// simple: equation [ "(" args ")" ]
FuncParser.prototype.simple = function(){
	var left, right;

	left = this.equation();

	if(this.isToken('(')){
		right = this.postfix();
		left = new ASTList([left, right]);
	}

	return left;
};


// program: [ def | statement ] ( ";" | EOL )
FuncParser.prototype.program = function(){
	var d, s, n;
	if (this.isToken(';') || this.isToken(Token.EOL)) {
		n = this.lexer.read();
		return new NullStmnt();
	} else {
		if(this.isToken('def')){
			d = this.def();
			n = this.lexer.read(); // (';' | EOL)
			return d;
		}else{
			s = this.statement();
			n = this.lexer.read(); // (';' | EOL)
			return s;
		}
	}
};


