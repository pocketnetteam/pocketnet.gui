FX_Particle = function(p){
    if(!p) p = {}

    var self = this

        self.x = p.x || 0
        self.y = p.y || 0
        self.size = p.size || 15
        self.color = p.color || '#5eb1ff'
        self.opacity = p.opacity || 0.50
        self.lifetime = p.lifetime || 1000

        self.id = makeid()

    if(self.opacity < 0)  self.opacity = 0
    if(self.opacity > 1)  self.opacity = 1

    var time = 0;
    var ctx = null;
    var moving = null

    self.on = {
        destroyed : {

        }
    }

    var setTime = function(_time){
        time += _time

        if (time > self.lifetime) {
            time = self.lifetime
            self.destroy()
            
            return false
        }

        return true
    }

    self.destroy = function(){

        ctx.destroy()
        p.to.removeChild(ctx);
        moving = null
        time = 0

        _.each(self.on.destroyed, function(d){
            d()
        })

    }

    self.update = function(t){

        if(!setTime(t)) return

        if (moving){

            moving.t += t

            var nc = moving.curve.get(moving.t / moving.time)

            self.x = nc.x
            self.y = nc.y

        }

        render()
        
    }

    self.moveToByBezier = function(x, y, _time){

        var t = self.lifetime - time

        var max = Math.max((x - self.x) / 2, (y - self.y) / 2)

        moving = {
            x  : x,
            y  : y,
            bx : (x - self.x) / 2 + rand(-max * 2, max * 2),
            by : (y - self.y) / 2 + rand(-max * 2, max * 2),
            fx : self.x,
            fy : self.y,
            time : Math.min(t, _time),
            t : 0,        
        }


        var curve = new Bezier(moving.fx, moving.fy, moving.x, moving.y, moving.bx, moving.by)

        moving.curve = curve
    }

    self.init = function(){
        ctx = new PIXI.Graphics()
        p.to.addChild(ctx);       
    }

    var render = function(){

        ctx.clear()

        if (self.render)
            self.render(ctx, time / self.lifetime)

    }


    return self
}

FX_Heart = function(p){

    if(!p) p = {}

    var self = new FX_Particle(p)

    self.render = function(ctx, percentOfLife){
        var x = self.x;
        var y = self.y;
        var width = self.size;
        var height = self.size;
        var topCurveHeight = height * 0.3;

        var color = Color(self.color)
        var opacity = self.opacity - self.opacity * percentOfLife

        color.darken(percentOfLife)   
        
        ctx.beginFill(color.rgbNumber(), opacity);

        ctx.moveTo(x, y + topCurveHeight);
    
        ctx.bezierCurveTo(
            x, y, 
            x - width / 2, y, 
            x - width / 2, y + topCurveHeight
        );
        
        ctx.bezierCurveTo(
            x - width / 2, y + (height + topCurveHeight) / 2, 
            x, y + (height + topCurveHeight) / 2, 
            x, y + height
        );
        
        ctx.bezierCurveTo(
            x, y + (height + topCurveHeight) / 2, 
            x + width / 2, y + (height + topCurveHeight) / 2, 
            x + width / 2, y + topCurveHeight
        );
        
        ctx.bezierCurveTo(
            x + width / 2, y, 
            x, y, 
            x, y + topCurveHeight
        );
        
        ctx.closePath();
        ctx.endFill();
    }

    return self
}

FX_Star = function(p){

    if(!p) p = {}

    var self = new FX_Particle(p)

    self.angle = p.angle || 0

    //var color = Color(self.color)
    //self.color = color.lighten( Math.min(Math.random() + 0.5, 1)).hex()

    self.render = function(ctx, percentOfLife){
        var x = self.x;
        var y = self.y;
        var outerRadius = self.size / 2;
        var innerRadius = self.size / 3;
        var points = 5;

        var color = Color(self.color)
        var opacity = self.opacity - self.opacity * percentOfLife

        color.darken(percentOfLife)   
        
        ctx.beginFill(color.rgbNumber(), opacity);

        var step = (Math.PI * 2) / points;
        var halfStep = step / 2;
        var start = ((self.angle + 180 * percentOfLife) / 180) * Math.PI;

        var n, dx, dy;

        ctx.moveTo(
            x + (Math.cos(start) * outerRadius),
            y - (Math.sin(start) * outerRadius)
        );

        for (n = 1; n <= points; ++n) {

            dx = x + Math.cos(start + (step * n) - halfStep) * innerRadius;
            dy = y - Math.sin(start + (step * n) - halfStep) * innerRadius;
            ctx.lineTo(dx, dy);

            dx = x + Math.cos(start + (step * n)) * outerRadius;
            dy = y - Math.sin(start + (step * n)) * outerRadius;
            ctx.lineTo(dx, dy);
        }
        
        ctx.closePath();
        ctx.endFill();
    }

    return self
}

FX_Effects = function(el){

    var self = this;
    var app = null;

    var $workspace = null;

    var objects = {}
    var ticker = null
    var timeouts = {}

    var time = 0

    var timeout = function(f, duration){
        var id = makeid()

        timeouts[id] = {
            to : time + duration,
            f
        }
    }

    var places = {
        x : {
            left : function(scatter = 0, size = 0){
                return 0 + size / 2 +  scatter / 2 + rand(-scatter, scatter) / 2
            },

            right : function(scatter = 0, size = 0){
                return $workspace.clientWidth - size / 2 - scatter / 2 + rand(-scatter, scatter) / 2
            },

            center : function(scatter, size = 0){
                return (places.x.left(scatter) - places.x.left(scatter)) / 2
            }
        },

        y : {
            top : function(scatter = 0, size = 0){
                return 0 + size / 2 + scatter / 2 + rand(-scatter, scatter) / 2
            },

            bottom : function(scatter = 0, size = 0){
                return $workspace.clientHeight - size / 2 - scatter / 2 + rand(-scatter, scatter) / 2
            },

            center : function(scatter, size = 0){
                return (places.x.bottom(scatter) - places.x.top(scatter)) / 2
            }
        },

        xy : function(c, scatter){
            return {x : places.x[c.x](scatter), y : places.y[c.y](scatter)}
        }
    }

    var effects = {
        stars : function(parameters, clbk){

            if(!parameters) parameters = {}

            parameters.duration || (parameters.duration = 1200)
            parameters.scatter || (parameters.scatter = 100)
            parameters.from || (parameters.from = {x : 'left', y : 'bottom'})
            parameters.to || (parameters.to = {x : 'right', y : 'top'})
            parameters.size || (parameters.size = 10)

            var createH = function(){


                timeout(function(){

                    var from = places.xy(parameters.from, parameters.scatter, parameters.size)
                    var to = places.xy(parameters.to, parameters.scatter, parameters.size)


                    var h = new FX_Star({
                        to : app.stage,

                        x : from.x,
                        y : from.y,
        
                        lifetime : rand(parameters.duration / 4, 4 * parameters.duration / 4),

                        size : parameters.size,
                        color : parameters.color,
                        opacity : parameters.opacity * (Math.random() + 0.5)
                    })
        
                    h.init()
                    h.moveToByBezier(to.x, to.y, h.lifetime) 

                    objects[h.id] = h

                    h.on.destroyed.main = function(){
                        delete objects[h.id]
                    }

                }, rand(0, parameters.duration / 4))
            }

            var c = rand(10, 20)

            for(var i = 0; i < c; i++){
                createH()
            }
             

            if (clbk){
                timeout(function(){
                    if(clbk) clbk()
                }, parameters.duration)
            }
           
        }
    }

    var initTicker = function(){

        ticker = PIXI.Ticker.shared;

        ticker.autoStart = false;
        
        ticker.start();


        ticker.add(function (t) {
            var dtime = t * 10

            time += dtime

            _.each(objects, function(o){
                o.update(dtime)
            })

            _.each(timeouts, (t, id) => {
                if (t.to <= time){
                    t.f()
                    delete timeouts[id]
                }
            })

        });
    }
    
    self.destroy = function(){  


        ticker.stop();
        ticker = null;

        $workspace.removeChild(app.view)
        $workspace = null

        app.destroy()

        timeouts = {}
        objects = {}

        app = null

    }
    
    self.init = function(){

        $workspace = el 

        app = new PIXI.Application({
            transparent: true, 
            resolution: 1,
            antialias: true,
            width : $workspace.clientWidth,
            height : $workspace.clientHeight
        });

        $workspace.appendChild(app.view);

        initTicker()

    }

    self.play = function(effect, parameters, clbk){
        if (effects[effect]){
            effects[effect](parameters, function(){

                self.destroy()

                clbk()
            })
        }
    }

    return self;
}

FX_Manager = function(app){
    var self = this

    var lib = [
        {src : 'js/vendor/pixi.min.js', f : 'js'}, 
        {src : 'js/vendor/bezier.js', f : 'js'}, 
        {src : 'js/vendor/color.min.js', f : 'js'}
    ]
    var relations = {}

    var importlibs = function(clbk){


        importScripts(lib, relations, function(){

            if (clbk)
                clbk();

        }, null, null, app);
    }

    self.prepare = function(clbk){
        importlibs(clbk)

        return self
    }

    self.effect = function(el, effect, parameters, clbk){

        if(el.attr('effect')) return

        var effects = new FX_Effects(el[0])
        
            effects.init()

            el.attr('effect', effect)

            effects.play(effect, parameters, function(){

                el.removeAttr('effect')

                effects = null

                if(clbk) clbk()
            })

    }

    return self
}
/*
fx_manager = new FX_Manager(app).prepare(function(){})
fx_manager.effect($('#effects'), 'hearts', {
    color : '#ffa000',
    opacity : 0.8,
    scatter : 20,
    duration : 900
})

*/
