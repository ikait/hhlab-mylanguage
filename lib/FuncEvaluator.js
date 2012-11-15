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

		// operandがFuncかどうかを確認
		if (!(operand.parameters && operand.body)) {
			throw new Error();
		}

		var parameters = operand.parameters;
		var nestEnv = new BasicEnv();

		// !!引数の数は間違ってないことにする
		for (var i = 0; i < parameters.children.length; i++) {
			nestEnv.put(
				parameters.children[i].name(),
				postfix   .children[i].eval(env)
			);
		}

		// parameters.children = [
		//   name.name() == 'a',
		//   name.name() == 'b'
		// ]

		// postfix.children = [
		//   primaryExpr.eval(env) == 2,
		//   primaryExpr.eval(env) == 3
		// ]


		// nestEnv.put('a', 2)
		// nestEnv.put('b', 3)

		// nestEnv.get('a') => 2
		// nestEnv.get('b') => 3

		return operand.body.eval(nestEnv);
	} else {
		// ないなら、ふつうに1コ目のchildrenにevalをかけるだけ
		return operand;
	}
};