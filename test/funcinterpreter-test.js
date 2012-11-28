var getFuncInterpreterResult = function (sourcecode) {
	var lexer = new Lexer(sourcecode);
	var p = new FuncParser(lexer);
	var env = new BasicEnv();

	var t; var result;
	while (lexer.peek(0) != Token.EOF) {
		t = p.program();
		result = t.eval(env);
	}

	return result;
};

buster.testCase('FancParser', {
	'macro function': function () {
		var sourcecode = [
			'def hoge () {',
			'  "hoge"',
			'}',
			'hoge()'
		].join('\n');

 		var result = getFuncInterpreterResult(sourcecode);
 		assert.equals(result, 'hoge');
	},

	'calculater function': function () {
		var sourcecode = [
			'def add (a, b){',
			'  a + b',
			'}',
			'',
			'add(2,3)'
		].join('\n');
 		var result = getFuncInterpreterResult(sourcecode);
 		assert.equals(result, 5);
	},

	'recursive function': function () {
		var sourcecode = [
			'def sumTo (x){',
			'  if (x==1) {',
			'    1',
			'  } else {',
			'    x + sumTo(x-1)',
			'  }',
			'}',
			'sumTo(10)'
		].join('\n');
 		var result = getFuncInterpreterResult(sourcecode);
 		assert.equals(result, 55);
	}
});