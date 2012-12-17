var builtinBasic = function (env) {
	env.defBuiltinVars({
		one: 1,
		two: 2,
		three: 3
	});

	env.defBuiltinFunc('add', function (a, b) {
		return a + b;
	});
	env.defBuiltinFunc('print', function (str) {
		stdout(str);
	});
};