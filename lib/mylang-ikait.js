// 言語処理系 (ikait版)

// sourcecodeをtokenに分割するクラス
var Lexer = function (sourcecode) {
	this.sourcecode = sourcecode;
};

// 実際にtokenに分割して、配列にして返す
Lexer.prototype.read = function () {
	// 配列は返しているけど、これは駄目な例です。
	return [];
};


// ikaitの名前でまとめる
mylang.ikait = {
	Lexer: Lexer
};