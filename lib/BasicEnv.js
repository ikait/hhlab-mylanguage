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
	        stdout(str);
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

// 組込み変数をまとめて定義する
BasicEnv.prototype.defBuiltinVars = function (params) {
	var self = this;
	$.each(params, function (key, value) {
		self.put(key, value);
	});
};

// 組込み関数を定義する
BasicEnv.prototype.defBuiltinFunc = function (name, jsfunc) {
	this.put(name, jsfunc);
};