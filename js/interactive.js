Interactive = function(p){

    var app = p.app;
    var platform = p.platform;

    var self = this;

    var el = {}

    var render = {
        bg : function(){
            el.bg = $('<div>', {
                class : 'InteractiveBg'
            })


            $('html').append(el.bg)
        }
    }

    self.init = function(){
        render.bg()
    }

    self.destroy = function(){

        

    }

    return self;
}