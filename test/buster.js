var config = module.exports;

config['stone test'] = {
	rootPath: '../',
	environment: 'browser', // 'browser' or 'node'
	sources: [
		// ast base
		'lib/ASTree.js',
		'lib/ASTLeaf.js',
		'lib/ASTList.js',

		// ast expressions
		'lib/BinaryExpr.js',
		'lib/NumberLiteral.js',
		'lib/BlockStmnt.js',
		'lib/IfStmnt.js',
		'lib/Name.js',
		'lib/NullStmnt.js',
		'lib/NegativeExpr.js',
		'lib/PrimaryExpr.js',
		'lib/StringLiteral.js',
		'lib/WhileStmnt.js',

		'lib/Postfix.js',
		'lib/DefStmnt.js',
		'lib/ParameterList.js',
		'lib/Arguments.js',

		// interpreter
		'lib/BasicEvaluator.js',
		'lib/BasicEnv.js',

		// lexer & parser
		'lib/Lexer.js',
		'lib/ExprParser.js',
		'lib/BasicParser.js',
		'lib/FuncParser.js'
	],
	tests: [
		'test/*-test.js'
	]
};