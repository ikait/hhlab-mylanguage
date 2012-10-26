buster.testCase('Interpreter', {
	'calc': function () {
		var sourcecode = '3 * 5 - 8 * (2 + 1) / 4';

		var lexer = new Lexer(sourcecode);
		var p = new BasicParser(lexer);
		var env = new BasicEnv();

		var t; var result;
		while (lexer.peek(0) != Token.EOF) {
			t = p.program();
			result = t.eval(env);
		}

		assert.equals(result, 9);
	}
});