// 教科書ではFunction

var Func = function (parameters, body, env) {
  this.parameters = parameters;
  this.body = body;
  this.env = env;
};

Func.prototype.parameters = function () {
  return this.parameters;
};

Func.prototype.body = function () {
  return this.body;
};

Func.prototype.makeEnv = function () {
  return new BasicEnv(env);
};

Func.prototype.toString = function () {
  return "<fun>";
};