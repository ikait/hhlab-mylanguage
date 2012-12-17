define([
	// ast base
	'./ASTree',
	'./ASTLeaf',
	'./ASTList',

	// ast expressions
	'./BinaryExpr',
	'./NumberLiteral',
	'./BlockStmnt',
	'./IfStmnt',
	'./Name',
	'./NullStmnt',
	'./NegativeExpr',
	'./PrimaryExpr',
	'./StringLiteral',
	'./WhileStmnt',

	'./Postfix',
	'./DefStmnt',
	'./ParameterList',
	'./Arguments',

	'./Func',

	// interpreter
	'./BasicEvaluator',
	'./FuncEvaluator',
	'./BasicEnv',

	// builtin packages
	'./builtin-basic',
	'./builtin-fnobi',
	'./builtin-ikait',
	'./builtin-yosh1k104',

	// lexer & parser
	'./Lexer',
	'./ExprParser',
	'./BasicParser',
	'./FuncParser'
], function () {
	var Stone = function () {
		this.stdout = function () {};
	};

	Stone.prototype.onstdout = function (fn) {
		this.stdout = fn || function () {};
	};

	Stone.prototype.exec = function (sourcecode) {
		var lexer = new Lexer(sourcecode);
		var p = new FuncParser(lexer);
		var env = new BasicEnv();

		builtinBasic(env);
		builtin_fnobi(env);
		builtin_ikait(env);
		builtin_yosh1k104(env);

		var t; var value;

		while (lexer.peek(0) != Token.EOF) {
			t = p.program();

			// onstdout:
			// eval時にprintが実行されたら、この関数が呼ばれる
			t.onstdout(this.stdout);

			value = t.eval(env);
		}
	};

	return Stone;
});