


retry(function(){
	return typeof app != 'undefined'
}, function(){

	app = new Application({


		listofproxies : [
			
			{
				host : 'pocketnet.app',
				port : 8899,
				wss : 8099
			},
			{
				host : '1.pocketnet.app',
				port : 8899,
				wss : 8099
			},

		],
		
	});

	app.preapi()

	retry(function(){
		return (window.pocketnetVendorLoaded && window.pocketnetJoinLoaded ) || window.design
	}, function(){

		app.deviceReadyInit({
			clbk : function(){

				var p = parameters()

				var el = $('#content')

				var action = p.action || ''
				var id = p.id || ''
				var ids = p.ids || ''

				var embeddingSettigns = {}
				
				try{
					embeddingSettigns = JSON.parse(hexDecode(p.embeddingSettigns || "7B7D"))
				}catch(e){}

				if(embeddingSettigns.black){
					$('html').attr('theme', 'black')
				}
				else{
					$('html').attr('theme', 'white')
				}

				if (embeddingSettigns.ref){
					app.ref = embeddingSettigns.ref

					$('.openapipromolink').each(function(){
						var h = $(this).attr('href')

						h += '?ref=' + app.ref 

						$(this).attr('href', h)
					})
				}

				
				embeddingSettigns.openapi = true
				
				if (app.platform.papi[action] && (id || ids)){
					app.platform.papi[action](id || ids.split(','), el, null, embeddingSettigns)
				}
			}
		});
	})

})
