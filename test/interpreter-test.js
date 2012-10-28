var getInterpreterResult = function (sourcecode) {
	var lexer = new Lexer(sourcecode);
	var p = new BasicParser(lexer);
	var env = new BasicEnv();

	var t; var result;
	while (lexer.peek(0) != Token.EOF) {
		t = p.program();
		result = t.eval(env);
	}

	return result;
};

buster.testCase('Interpreter', {
	'calculate': function () {
		var sourcecode = '3 * 5 - 8 * (2 + 1) / 4';

		var result = getInterpreterResult(sourcecode);
		assert.equals(result, 9);
	},

	'var': function () {
		var sourcecode = [
			'a = 3',
			'a + 2'
		].join('\n');

		var result = getInterpreterResult(sourcecode);
		assert.equals(result, 5);
	},

	'string literal': function () {
		var sourcecode = '"hogehoge"';

		var result = getInterpreterResult(sourcecode);
		assert.equals(result, 'hogehoge');
	},

	'compare (equal)': function () {
		var sourcecode = [
			'x = 5',
			'x == 5'
		].join('\n');

		var result = getInterpreterResult(sourcecode);
		assert(result);
	},

	'compare (greater)': function () {
		var sourcecode = [
			'3 > 5'
		].join('\n');

		var result = getInterpreterResult(sourcecode);
		assert(!result);
	},

	'compare (less)': function () {
		var sourcecode = [
			'3 < 5'
		].join('\n');

		var result = getInterpreterResult(sourcecode);
		assert(result);
	},

	'block': function () {
		var sourcecode = [
			'{',
			'  "hoge"',
			'  3',
			'  "moge"',
			'}'
		].join('\n');

		var result = getInterpreterResult(sourcecode);
		assert.equals(result, 'moge');
	},

	'if': function () {
		var sourcecode = [
			'a = 3',
			'if a == 3 {',
			'  "ok"',
			'} else {',
			'  "ng"',
			'}'
		].join('\n');

		var result = getInterpreterResult(sourcecode);
		assert.equals(result, 'ok');
	},

	'while': function () {
		var sourcecode = [
			'i = 0',
			'while i < 10 {',
			'  i = i + 3',
			'}',
			'i'
		].join('\n');

		var result = getInterpreterResult(sourcecode);
		assert.equals(result, 12);
	}

});