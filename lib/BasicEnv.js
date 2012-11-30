// 変数等の環境を表すクラス
var BasicEnv = function (defaultValue) {
	this.values = defaultValue || {};
	this.initBuiltin();
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

BasicEnv.prototype.initBuiltin = function () {
	var self = this;

	this.put(
		'print',
		new Func(
			new Arguments([
				new Name(new IdToken('string'))
			]),
			function (string) {
				this.print(string);
			}
		)
	);
};