var stone_sourcecode = [
	'sum = 0',
	'i = 1',
	'',
	'print "start program \"sum\""',
	'',
	'while i < 10 {',
	'  sum = sum + i',
	'  i = i + 1',
	'}',
	'sum'
].join('\n');

buster.testCase("lexer", {
	"read": function () {
		var lexer = new Lexer(stone_sourcecode);
		var read = lexer.read();
		assert(read == 'sum');
	},
	"fill queue": function () {
		var lexer = new Lexer(stone_sourcecode);
		lexer.fillQueue(5);
		assert(lexer.queue);
	},
	"read line": function () {
		var lexer = new Lexer(stone_sourcecode);
		lexer.readLine();
		assert(lexer.queue);
	}
});

buster.testCase("ast", {
	"main": function () {
		var lexer = new Lexer('3 + 2 * 5 -5');
		var p = new ExprParser(lexer);
		var t = p.expression();

		assert(t == '((3 + (2 * 5)) - 5)');
	}
});