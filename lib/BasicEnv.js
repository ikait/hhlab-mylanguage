// 変数等の環境を表すクラス
var BasicEnv = function (defaultValue) {
	this.values = defaultValue || {};
};

BasicEnv.prototype.put = function (name, value) {
	this.value[name] = value;
};

BasicEnv.prototype.get = function (name) {
	return this.value[name];
};