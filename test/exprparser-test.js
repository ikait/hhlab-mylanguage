buster.testCase('ExprParser', {
	'expression': function () {
		var lexer = new Lexer('3 + 2 -5');
		var p = new ExprParser(lexer);
		var t = p.expression();

		assert.equals(t, '((3 + 2) - 5)');
	},
	'term': function () {
		var lexer = new Lexer('3*4 + 2 -5*10');
		var p = new ExprParser(lexer);
		var t = p.expression();

		assert.equals(t, '(((3 * 4) + 2) - (5 * 10))');
	},
	'factor': function () {
		var lexer = new Lexer('3 * (4 + 2) - 5 * 10');
		var p = new ExprParser(lexer);
		var t = p.expression();

		assert.equals(t, '((3 * (4 + 2)) - (5 * 10))');
	}
});