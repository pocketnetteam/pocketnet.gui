let updatenotifier = (function(){
    let self = new nModule();
    let essenses = {};

    let Essense = function(p){
        let primary = deep(p, 'history');
        let el, ed;

        let actions = {

        }

        let events = {

        }

        let renders = {
            createWindow: () => {
                self.fastTemplate('updatenotifier', function(rendered){
                    let d = new dialog({
                        html : rendered,
                        class : "updateNotifier",
                        btn1text : self.app.localization.e('close'),

                        clbk : function(el, d){
                            alert(100);
                        }
                    })
                }, {});
            }
        }

        let state = {
            save : function(){

            },
            load : function(){

            }
        }

        let initEvents = function(){

        }

        return {
            primary : primary,

            getdata : function(clbk, p){
                ed = p.settings.essenseData

                let data = {
                    ed
                };

                clbk(data);
            },

            destroy : function(){
                ed = {}
                el = {};
            },

            init : function(p){
                state.load();

                el = {};
                el.c = p.el.find('#' + self.map.id);

                initEvents();

                p.clbk(null, p);
            }
        }
    };

    self.run = function(p){
        let essense = self.addEssense(essenses, Essense, p);
        self.init(essense, p);
    };

    self.stop = function(){
        _.each(essenses, function(essense){
            window.requestAnimationFrame(() => {
                essense.destroy();
            });
        });
    }

    return self;
})();

if (typeof module != "undefined") {
    module.exports = updatenotifier;
} else {
    app.modules.updatenotifier = {};
    app.modules.updatenotifier.module = updatenotifier;
}
