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

	// lexer & parser
	'./Lexer',
	'./ExprParser',
	'./BasicParser',
	'./FuncParser'
], function () {
	return {};
});