/*
10/25
・ちょっとオブジェクト指向っぽくしてみた
・eachを使うようにした
・aタグを無駄に探さないようにした
*/

var TabView = function (selector) {

	tab = [];

	$('a[href]', selector).each(function (index, d) {
		tab[index] = new Tab(d);

		// まず全てのセクションを隠す
		tab[index].hide();

		// タブがクリックされたとき
		tab[index].selector.click(function (e) {
			e.preventDefault();
			// まず全てのセクションを隠す
			$.each(tab, function (){
				this.hide();
			});
			// クリックされたタブを表示
			tab[index].show();
		});

	});

	tab[0].show();
	// this.setTab();
};

// タブを選択する
TabView.prototype.setTab = function () {
	if (location.hash) {
	} else {
		// 指定がなければなければ
		tab[0].show();
	}
}

var Tab = function (d) {
	this.selector = $(d);
	this.content = $(this.selector.attr('href'));
};

Tab.prototype.show = function () {
	this.selector.addClass('active');
	this.content.show();
};

Tab.prototype.hide = function () {
	this.selector.removeClass('active');
	this.content.hide();
};


// オブジェクト指向なしで書いた
/*
var TabView = function (selector) {

	// 与えられたselectorの配下にあるaタグの数を取得
	var f = $('a[href]', selector).size();

	// tab配列にaタグのhrefの中身(#xxx)を入れていくついでに、全てのsectionを一旦非表示
	var tab = [];
	for (var i = 0; i < f; i++) {
		$(tab[i] = $('a[href]:eq(' + i + ')', selector).attr('href')).hide();
	}

	// 一つ目のタブは最初から表示しておく
	$(tab[0]).show();
	$('a[href=' + tab[0] + ']', selector).addClass("active");

	// タブがクリックされたとき、
	$('a', selector).click(function () {

		// 一旦全部のsectionを非表示にして、タブのaタグの.activeを取り除く
		for (var i = 0; i < f; i++) {
			$(tab[i]).hide();
			$('a[href=' + tab[i] + ']', selector).removeClass("active");
		}

		// クリックされたタブに対応するsectionを表示させて、タブのaタグに.activeを付ける
		$($(this).addClass("active").attr("href")).show();

		// スクロールさせない
		return false;
	});

};

var Tab = function () {

};
*/