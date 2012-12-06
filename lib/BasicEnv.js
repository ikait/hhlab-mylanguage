// 変数等の環境を表すクラス
var BasicEnv = function (defaultValue) {
	this.values = defaultValue || {};

	this.defBuiltinVars({
		one: 1,
		two: 2,
		three: 3
	});

	this.defBuiltinFunc('add', function (a, b) {
		return a + b;
	});
	this.defBuiltinFunc('print', function (str) {
		alert(str);
	});
};

BasicEnv.prototype.put = function (name, value) {
	this.values[name] = value;
};

BasicEnv.prototype.get = function (name) {
	if (this.values[name] !== undefined) {
		return this.values[name];
	} else if (this.parentEnv){
		return this.parentEnv.get(name);
	} else {
		return undefined;
	}
};

BasicEnv.prototype.defBuiltinVars = function (params) {
	var self = this;
	$.each(params, function (key, value) {
		self.put(key, value);
	});
};


BasicEnv.prototype.defBuiltinFunc = function (name, args, sourcecode) {
	this.put('add', new Func(
		[
			new Name(new IdToken('a')),
			new Name(new IdToken('b'))
		],
		new BlockStmnt()
	));
};