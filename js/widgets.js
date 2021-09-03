

var PNWIDGETS = function(){
    var self = this

    self.renders = {
        iframe : function(seed, action, id, p){

            var domain = window.pocketnetdomain || 'pocketnet.app'
            
            return '<iframe width="100%" src="https://'+domain+'/openapi.html?action='+action+'&id='+id+'&embeddingSettigns='+p+'" id="pocketnet_iframe_'+seed+'" scrolling="no" style="border: none;" frameborder="0" marginheight="0" marginwidth="0" loading="lazy" allowfullscreen allowautoplay></iframe>'
        }
    }

    self.make = function(seed, action, id, p, fast){
        var elem = document.getElementById('pocketnet_' + seed);

        if (window.POCKETNETINSTANCE && fast){

            var app = window.POCKETNETINSTANCE

            var embeddingSettigns = {}
			
			try{
				embeddingSettigns = JSON.parse(hexDecode(p || "7B7D"))
			}catch(e){}

            embeddingSettigns.openapi = true

            $(elem).addClass('openapipnet')

            app.platform.papi[action](id, $(elem), null, embeddingSettigns)
        }
        else{
            elem.innerHTML = self.renders.iframe(seed, action, id, p)

            if (typeof iFrameResize != 'undefined')
                iFrameResize({},'#pocketnet_iframe_' + seed)
        }

        
    }


    self.url = function(url){

        var parsed_url = new URL(url)
        var postid = parsed_url.searchParams.get('s') || parsed_url.searchParams.get('v') 
        var connect = parsed_url.searchParams.get('connect')
        var action = parsed_url.searchParams.get('commentid') ? 'commment' : postid ? 'post' : 'channel'

        var id = action === 'channel' ? ( parsed_url.pathname.replace('/', '')) : postid

        if (connect) {
            action = 'connect'
            id = connect
        }

        var p = '7B22626C61636B223A66616C73652C22636F6D6D656E7473223A226C617374222C2266756C6C73637265656E766964656F223A66616C73657D'


        var txid = parsed_url.searchParams.get('stx')

        if (txid) {
            id = txid
            action = 'transaction'
        }

        return {
            action : action,
            id : id,
            p : p
        }

    }

    self.makefromurl = function(el, url){

        var seed = Math.floor(Math.random() * 100000)

        var h = '<div  id="pocketnet_'+seed+'">'

        h += '</div>'

        el.innerHTML = h

        var ps = self.url(url)

        self.make(seed, ps.action, ps.id, ps.p)

    }

    return self
} 

window.PNWIDGETS = PNWIDGETS
