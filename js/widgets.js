
var PNWIDGETS = function(){
    var self = this

    self.renders = {
        iframe : function(seed, action, id, p){

            var domain = window.pocketnetdomain || 'pocketnet.app'
            
            return '<iframe width="100%" src="https://'+domain+'/openapi.html?action='+action+'&id='+id+'&embeddingSettigns='+p+'" id="pocketnet_iframe_'+seed+'" scrolling="no" style="border: none;" frameborder="0" marginheight="0" marginwidth="0" loading="lazy" allowfullscreen allowautoplay></iframe>'
        }
    }

    self.make = function(seed, action, id, p, fast, __el, resized, additional){

        if(!additional) additional = {}

        var elem = document.getElementById('pocketnet_' + seed);

        console.log('additionaladditionaladditional', additional)
 
        if (window.POCKETNETINSTANCE && fast){

            elem = $(__el).find('#pocketnet_' + seed)

            var app = window.POCKETNETINSTANCE

            var embeddingSettigns = {
                id : makeid()
            }
            
            try{
                embeddingSettigns = JSON.parse(hexDecode(p || "7B7D"))
            }catch(e){}

            embeddingSettigns.openapi = true

            embeddingSettigns = _.extend(embeddingSettigns, additional)

            console.log('embeddingSettigns', embeddingSettigns)

            elem.addClass('openapipnet')

            app.platform.papi[action](id, elem, null, embeddingSettigns, additional)

            if(action == 'transaction') return false

            if(app.curation()) return false

            return true
        }
        else{
            elem.innerHTML = self.renders.iframe(seed, action, id, p, additional)

            if(typeof iFrameResize != 'undefined')
                var iframe = iFrameResize({

                    onResized : function(){
                        //window.requestAnimationFrame(function(){
                            if (resized)
                                resized()

                        //s})
                    },
                    onBeforeResized : function(){
                        
                        if (resized)
                            resized(true)
                    
                        
                    }

                },'#pocketnet_iframe_' + seed)

        }

        
    }


    self.url = function(url){

        var parsed_url = new URL(url)

        var postid = parsed_url.searchParams.get('s') || parsed_url.searchParams.get('v')

        var action = parsed_url.searchParams.get('commentid') ? 'comment' 
                                                    : postid ? 'lenta' : 'channel'

        var id = action === 'channel' ? parsed_url.pathname.replace('/', '') : postid

        if(id == 'author' && action === 'channel' ) id = parsed_url.searchParams.get('address')

        var connect = parsed_url.searchParams.get('connect')
        var publicroom = parsed_url.searchParams.get('publicroom')

        var additional = {
            
            commentPs : {
                commentid : parsed_url.searchParams.get('commentid'),
                parentid : parsed_url.searchParams.get('parentid'),
            }
        }

        if (connect) {
            action = 'connect'
            id = connect
        }

        if (publicroom) {
            action = 'publicroom'
            id = publicroom
        }

        var p = '7b22626c61636b223a66616c73652c22636f6d6d656e7473223a226e6f222c22726566223a2250503538325634375038764376586a645633696e77594e677853635a437554577371227d'

        var txid = parsed_url.searchParams.get('stx')

        if (txid) {

            ///pocketnet://i?stx=txid

            id = txid
            action = 'transaction'
        }
        

        return {
            action : action,
            id : id,
            p : p,
            additional
        }

    }

    self.makefromurl = function(el, url, resized, additional){


        var seed = Math.floor(Math.random() * 100000)

        var h = '<div id="pocketnet_'+seed+'">'
            h += '</div>'

        el.innerHTML = h

        var ps = self.url(url)

        ps.additional || (ps.additional = {})

        ps.additional = _.extend(ps.additional, additional || {})

        return self.make(seed, ps.action, ps.id, ps.p, true, el, resized, ps.additional)

    }

    return self
} 

window.PNWIDGETS = PNWIDGETS
