// 言語処理系 (fnobi版)

var Lexer = (function () {
	// sourcecodeをtokenに分割するクラス
	var Lexer = function (sourcecode) {
		this.sourcecode = sourcecode;

		this.tokenTypes = [{
			type: 'number',
			pattern: /[\d]+/
		}, {
			type: 'symbol',
			pattern: /<|>|=|\{|\}|\+|-/
		}];

		this.regexp = tokensPattern(this.tokenTypes);
	};

	// 実際にtokenに分割して、配列にして返す
	Lexer.prototype.read = function () {
		var source = this.sourcecode;
		var results = [];

		// gオプションを付けてマッチしていってもよいが、
		// jsのmatchはgオプションを付けると、()の何番目にマッチしたかなどの情報が死ぬ
		// ので、sourceの文を削りながら、g無しでのマッチを繰り返す。
		var match;
		while (match = source.match(this.regexp)) {
			for (var i = 0; i < this.tokenTypes.length; i++) {
				if (match[i + 1]) {
					results.push([
						match[0],
						this.tokenTypes[i].type
					]);
				}
			}
			source = source.slice(match.index + match[0].length);
		}

		return results;
	};

	var tokensPattern = function (tokenTypes) {
		var exps = [];

		tokenTypes.forEach(function (tokenType) {
			exps.push(
				(tokenType.pattern + '')
					.replace(/^\//, '(')
					.replace(/\/$/, ')')
			);
		});

		return new RegExp(exps.join('|'));
	};

	return Lexer;
})();

// fnobiの名前でまとめる
mylang.fnobi = {
	Lexer: Lexer
};