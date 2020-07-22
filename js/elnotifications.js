$ = require('jquery');


var bgImages = function(el, p){

	if(!p) p = {};

	el.find('[image]').each(function(){

		var _el = $(this);

		if (_el.attr('image'))
		{
			_el.css('background-image', 'url('+$(this).attr('image')+')');
			_el.css('background-size', p.size || 'cover');
			_el.css('background-position', p.position || 'center center');
			_el.css('background-repeat', p.repeat || 'no-repeat');

			
			_el.attr('image', '')
		}

	})
		
}

var electron = require('electron');

var html = window.location.search.substr(1);

$('html .cnt').html(decodeURIComponent(html))

$('html .close').on('click', function(){
	electron.ipcRenderer.send('electron-notification-close')
})

$('html .fmCnt').on('click', function(){
	electron.ipcRenderer.send('electron-notification-click')
})

$('html a').on('click', function(){
	electron.ipcRenderer.send('electron-notification-click')
	return false
})

bgImages($('html .cnt'))
