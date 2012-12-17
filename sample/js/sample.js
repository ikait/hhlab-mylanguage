// 作った言語をデモとして、試しに動かすためのjs
require(['jquery', '../../lib/main'], function ($, Stone) {
	$(function () {
		var stone = new Stone();
		var $result = $('#stone-result').first();

		stone.onstdout(function (content) {
			$result.append(content);
		});

		$('#stone-form').submit(function (e) {
			e.preventDefault();

			// ソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('#stone-sourcecode').first().val() || '';
			$result.html('');
			stone.exec(sourcecode);
		});


	});
});