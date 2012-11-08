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
	var $textarea = $('textarea', $(f));
	var $button = $('input[type="submit"]', $(f));

	this.textareas = [];
	$textarea.each(function () {
		self.addTextarea(this);
	});

	this.buttons = [];
	$button.each(function () {
		self.addButton(this);
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

Form.prototype.addButton = function (btn) {
	var button = new Button(btn);
	button.sourceview = this;
	this.buttons.push(button);
};

Form.prototype.addLineNumber = function (textarea) {
	$(textarea.$textarea).css({
		"width": "95%" // 幅を合計100%になるようにすると2行になる。。
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
	});
};

// 引数のテキストエリアの内容と行数をセット
Textarea.prototype.setEnv = function (ta) {
	this.value = $(ta).val();
	this.length = this.value.split('\n').length;
}

var Button = function (btn) {
	var self = this;
	this.$button = $(btn);

	$(this.$button).bind('click', function (e) {
		self.sourceview.textareas[1].setEnv(self.sourceview.textareas[1].$textarea);
		self.sourceview.addLineNumber(self.sourceview.textareas[1]);
	});
};
