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

	// interpreter
	'./BasicEvaluator',
	'./BasicEnv',

	// lexer & parser
	'./Lexer',
	'./ExprParser',
	'./BasicParser'
], function () {
	return {};
});