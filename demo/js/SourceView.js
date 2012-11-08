var SourceView = function (selector) {
	this.setForm(selector);
}

SourceView.prototype.setForm = function (selector) {
	var self = this;
	var $form = $('form', $(selector));

	this.forms = [];

	$form.each(function () {
		self.addForm(this);
	});
};

SourceView.prototype.addForm = function (f) {
	var form = new Form(f);
	form.sourceview = this;
	this.forms.push(form);
};

var Form = function (f) {
	var self = this;
	var $form = $(f);
	var $textarea = $('textarea', $(f));

	this.textareas = [];
	$textarea.each(function () {
		self.addTextarea(this);
	});

	$form.bind('mousemove', function () {
		self.textareas[1].setEnv(self.textareas[1].$textarea);
		self.addLineNumber(self.textareas[1]);
	});
};

Form.prototype.addTextarea = function (ta) {
	var textarea = new Textarea(ta);
	textarea.sourceview = this;
	this.textareas.push(textarea);

	// 元のテキストエリアの左に行数表示用のテキストエリアを作る
	$(textarea.$textarea).before('<textarea></textarea>');
	this.addLineNumber(textarea);
};

Form.prototype.addLineNumber = function (textarea) {
	$(textarea.$textarea).css({
		"width": "95%", // 幅を合計100%になるようにすると2行になる。。
		"resize": "vertical"
	}).attr({
		"rows": textarea.length + 1
	});
	$(textarea.$textarea).prev().css({
		"width": "3%",
		"text-align": "right",
		"border": "none",
		"resize": "none"
	}).attr({
		"disabled": "",
		"rows": textarea.length + 1
	}).val(function() {
		for (var i = 0, j = textarea.length, k = ''; i < j; i++) {
			k += i + 1 + "\n";
		}	return k;
	});
	textarea.minheight = textarea.$textarea.height();
};

Form.prototype.refresh = function (textarea) {
	var height = textarea.$textarea.height();
	$(textarea.$textarea).prev().css({
		"height": height
	});
};

// テキストエリアの挙動を管理するクラス
var Textarea = function (ta) {
	var self = this;

	this.setEnv(ta);
	this.$textarea = $(ta);

	$(this.$textarea).bind('keyup change blur', function (e) {
		e.preventDefault();
		self.setEnv(this);
		self.sourceview.addLineNumber(self);
	}).bind('mousemove', function (e) {
		e.preventDefault();
		self.sourceview.refresh(self);
	});
};

// 引数のテキストエリアの内容と行数をセット
Textarea.prototype.setEnv = function (ta) {
	this.value = $(ta).val();
	this.length = this.value.split('\n').length;
}