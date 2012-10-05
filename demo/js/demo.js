// 作った言語をデモとして、試しに動かすためのjs

$(function () {
	// フォームがsubmitされたら、言語のinterpreterにtextareaの中身を与える
	// 結果は、 #demo-resultという要素の中身に書き出す

	$('#demo-form').submit(function (e) {
		e.preventDefault();

		// 言語のバージョンは、フォームのversion欄に応じる
		var language = mylang[$('*[name="version"]', this).val()] || mylang;

		// ソースコードはフォームのsourcecode欄から取得
		var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';

		// lexer生成
		var lexer = new language.Lexer(sourcecode);

		// readでtoken一覧を取得して、ひとつひとつ出力
		$('#demo-result').html('');
		lexer.read().forEach(function (token) {
			$('#demo-result').append('=> ' + token + '\n');
		});

	});
});