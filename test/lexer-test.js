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

buster.testCase('lexer', {
	'read first token': function () {
		var lexer = new Lexer(stone_sourcecode);
		var read = lexer.read();
		assert.equals(read, 'sum');
	},
	'fill queue': function () {
		var lexer = new Lexer(stone_sourcecode);
		lexer.fillQueue(5);
		assert(lexer.queue.length >= 5);
	},
	'read line': function () {
		var lexer = new Lexer(stone_sourcecode);
		lexer.readLine();
		assert(lexer.queue);
	}
});