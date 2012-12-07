// DefStmntのeval = 関数定義を実行
DefStmnt.prototype.eval = function (env) {
	var f = new Func(this.parameters(), this.body(), env);
	env.put(this.name(), f);
	return f;
};

// PrimaryExprが、postfixを持っているかどうか(関数実行かどうか)を返す
PrimaryExpr.prototype.hasPostFix = function () {
	return this.children.length > 1;
};

// PrimaryExprのeval = 項の計算、あるいは関数実行
PrimaryExpr.prototype.eval = function (env) {
	var operand = this.children[0].eval(env);
	var postfix;

	if (this.hasPostFix()) {
		// postfixがあるなら、関数実行としてのeval
		postfix = this.children[1];

		// operandが定義済のものか確認
		if (operand === undefined) {
			throw new Error(
				'undefined function "' + this.children[0]+ '"'
			);
		}

		// -----------------------------------------------------------
		// [!組込み関数実装!]
		// Funcかどうかだけでなく、operandがjavascriptの関数である可能性も
		// ここで考える。operandがjavascriptの関数かどうかは、
		// 「typeof operand == 'function'」で確かめられる。
		//
		// javascriptの関数だった場合は、
		// ・postfixの中身は、Funcを実行するときと同じように、それぞれ
		// 　evalして配列にしておく必要がある
		// ・↑を「args」とすると、javascript関数の実行は、
		// 　「operand.apply(window, args)」でたぶんいける
		//
		// ▼applyとcallについて
		// applyとcallの使い方を丁寧に説明してみる - あと味
		//  - http://taiju.hatenablog.com/entry/20100515/1273903873
		// -----------------------------------------------------------

		// operandがFuncかどうかを確認
		if (!(operand.parameters && operand.body)) {
			throw new Error('"' + operand + '" is not function');
		}
		var parameters = operand.parameters;

		// 環境を新規作成
		var childEnv = new BasicEnv();

		// !!引数の数は間違ってないことにする
		for (var i = 0; i < parameters.children.length; i++) {
			childEnv.put(
				parameters.children[i].name(),
				postfix   .children[i].eval(env)
			);
		}

		// 現在の環境を親環境として登録
		childEnv.parentEnv = env;

		return operand.body.eval(childEnv);
	} else {
		// ないなら、ふつうに1コ目のchildrenにevalをかけるだけ
		return operand;
	}
};