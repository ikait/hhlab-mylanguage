// 作った言語をデモとして、試しに動かすためのjs
require(['jquery', '../../lib/main'], function ($) {
	$(function () {
		// lexerを走らせる
		$('#demo-form-lexer').submit(function (e) {
			e.preventDefault();

			// ソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';

			// lexer生成
			var lexer = new Lexer(sourcecode);

			// readでtokenを取得して、ひとつひとつ出力
			var token;

			$('*[name="result"]', this).first().html('');
			while (token = lexer.read()) {
				if (token.lineNumber < 0) {
					break;
				}
				$('*[name="result"]', this).first().append(
					'=> [' + token.lineNumber + '] ' + token + '\n'
				);
			}
		});


		// ExprParserを走らせる
		$('#demo-form-exprparser').submit(function (e) {
			e.preventDefault();

			// ソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';

			var lexer = new Lexer(sourcecode);
			var p = new ExprParser(lexer);
			var t = p.expression();

			$('*[name="result"]', this).first().html('');
			$('*[name="result"]', this).first().html(t.toString());
		});


		// BasicParserを走らせる
		$('#demo-form-basicparser').submit(function (e) {
			e.preventDefault();

			// ソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';
			var $result = $('*[name="result"]', this).first();

			var lexer = new Lexer(sourcecode);
			var p = new BasicParser(lexer);
			var t;

			$result.html('');

			while (lexer.peek(0) != Token.EOF) {
				t = p.program();
				$result.append(t.toString() + '\n');
			}
		});


		// Interpreterを走らせる
		$('#demo-form-interpreter').submit(function (e) {
			e.preventDefault();

			// ソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';
			var $result = $('*[name="result"]', this).first();

			var lexer = new Lexer(sourcecode);
			var p = new BasicParser(lexer);
			var t;

			$result.html('');

			while (lexer.peek(0) != Token.EOF) {
				t = p.program();
				$result.append([
					'=>', t.eval(), '\n'
				].join(' '));
			}
		});
	});
});