var getFancparserResult = function (sourcecode) {
	var lexer = new Lexer(sourcecode);
	var p = new FuncParser(lexer);

	var t; var result;
	while (lexer.peek(0) != Token.EOF) {
		t = p.program();
		result = t.toString();
	}

	return result;
};

buster.testCase('FancParser', {
	'param': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'params': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'param_list': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'def': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'args': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'postfix': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'primary': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'simple': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	},
	'program': function () {
		var sourcecode = [

		].join('\n');

		var result = getFancparserResult(sourcecode);
		assert.equals(result, '');
	}
});