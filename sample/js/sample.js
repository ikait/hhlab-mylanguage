// 作った言語をデモとして、試しに動かすためのjs
require(['jquery', '../../lib/main'], function ($, Stone) {
	$(function () {
		var stone = new Stone();

		// 出力先決定
		var $result = $('#stone-result').first();
		stone.onstdout(function (content) {
			$result.append(content);
		});
		$result.html('');

		// 実行時の処理
		$('#stone-form').submit(function (e) {
			e.preventDefault();
			var sourcecode = $('#stone-sourcecode').first().val();
			if (!sourcecode) {
				return false;
			}

			stone.exec(sourcecode);
		});
	});
});