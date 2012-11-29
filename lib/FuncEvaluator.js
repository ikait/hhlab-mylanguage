DefStmnt.prototype.eval = function (env) {
	var f = new Func(this.parameters(), this.body(), env);
	env.put(this.name(), f);
	return f;
};

PrimaryExpr.prototype.hasPostFix = function () {
	return this.children.length > 1;
};

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