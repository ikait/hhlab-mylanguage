// タブをつかったレイアウトを管理する
var TabView = function (selector) {
	this.setTablinks(selector);
};

// selector以下のaタグをすべて認識して、タブを生成
// また、1番最初のものを選択する
TabView.prototype.setTablinks = function (selector) {
	var self = this;
	var $links = $('a', $(selector));

	this.tabs = [];

	$links.each(function () {
		self.addTab(this);
	});

	this.selectTab(this.tabs[0]);
};

// 管理するタブを追加
TabView.prototype.addTab = function (link) {
	var tab = new Tab(link);
	tab.tabview = this;
	this.tabs.push(tab);
};

// 引数で指定したタブを選択 (1つだけ表示)
TabView.prototype.selectTab = function (tab) {
	this.tabs.forEach(function (t) {
		t.hide();
	});
	tab.show();
};

// タブの挙動を管理するクラス
var Tab = function (link) {
	var self = this;

	this.$link = $(link);
	this.$content = $(this.$link.attr('href'));

	$(this.$link).click(function (e) {
		e.preventDefault();
		self.tabview.selectTab(self);
	});
};

// タブを非表示
Tab.prototype.hide = function () {
	this.$link.removeClass('active');
	this.$content.hide();
};

// タブを表示
Tab.prototype.show = function () {
	this.$link.addClass('active');
	this.$content.show();
};