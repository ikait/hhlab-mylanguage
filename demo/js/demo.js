// 作った言語をデモとして、試しに動かすためのjs

$(function () {
	// フォームがsubmitされたら、言語のinterpreterにtextareaの中身を与える
	// 結果は、 #demo-resultという要素の中身に書き出す

	$('#demo-form').submit(function (e) {
		e.preventDefault();
		var sourcecode = $('*[name="sourcecode"]', this).first().val();
		$('#demo-result').html(sourcecode);
	});
});