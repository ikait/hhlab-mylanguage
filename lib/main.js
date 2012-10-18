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
	'./NegativeExpr',
	'./PrimaryExpr',
	'./StringLiteral',
	'./WhileStmnt',

	// lexer & parser
	'./Lexer',
	'./ExprParser',
	'./BasicParser'
], function () {
	return {};
});