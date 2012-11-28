// 変数等の環境を表すクラス
var BasicEnv = function (defaultValue) {
	this.values = defaultValue || {};
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