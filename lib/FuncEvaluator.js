DefStmnt.prototype.eval = function (env) {
	var f = new Func(this.parameters(), this.body(), env);
	env.put(this.name, f);
	return f;
};

PrimaryExpr.prototype.eval = function () {
};