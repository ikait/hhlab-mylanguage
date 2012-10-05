// 言語処理系

// sourcecodeをtokenに分割するクラス
var Lexer = function (sourcecode) {
	this.sourcecode = sourcecode;
};

// 実際にtokenに分割して、配列にして返す
Lexer.prototype.read = function () {
	// 配列は返しているけど、これは駄目な例です。
	return this.sourcecode.split(/[\s\n]+/);
};

// まとめる
var mylang = {
	Lexer: Lexer
};