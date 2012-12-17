var builtin_fnobi = function (env) {
	env.defBuiltinFunc('printOnBottom', function (text) {
		var $msgbox = $('<div />');
		$('body').append($msgbox);
		$msgbox.html(text);
		$msgbox.css({
			position: 'absolute',
			width: '100%',
			left: '0px',
			bottom: '0px',
			textAlign: 'center',
			backgroundColor: '#f88'
		});
		$msgbox.hide();
		$msgbox.fadeIn();
	});
};