// タブをつかったレイアウトを管理する
var TabView = function (selector) {
	this.$links = $('a', $(selector));

	this.initializeTabs();
};

// Tabをすべて認識して、1番最初のものを選択する
TabView.prototype.initializeTabs = function () {
	var self = this;
	var tabs = [];

	this.$links.each(function () {
		var tab = new Tab(this);
		$(this).click(function (e) {
			e.preventDefault();
			self.selectTab(tab);
		});
		tabs.push(tab);
	});

	this.selectTab(tabs[0]);
	this.tabs = tabs;
};

// 引数で指定したtabを選択(1つだけ表示)
TabView.prototype.selectTab = function (tab) {
	this.tabs.forEach(function (tab) {
		tab.hide();
	});
	tab.show();
};

var Tab = function (link) {
	var self = this;
	this.$content = $($(link).attr('href'));
};

Tab.prototype.hide = function () {
	this.$content.hide();
};

Tab.prototype.show = function () {
	this.$content.show();
};