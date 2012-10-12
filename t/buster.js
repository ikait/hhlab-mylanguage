var config = module.exports;

config['stone test'] = {
	rootPath: '../',
	environment: 'browser', // 'browser' or 'node'
	sources: [
		'lib/Lexer.js',
		'lib/ASTree.js',
		'lib/ASTLeaf.js',
		'lib/ASTList.js',
		'lib/BinaryExpr.js',
		'lib/NumberLiteral.js',
		'lib/Name.js',
		'lib/ExprParser.js'
	],
	tests: [
		't/*-test.js'
	]
};