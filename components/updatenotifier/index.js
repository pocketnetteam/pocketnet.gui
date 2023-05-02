let updatenotifier = (function(){
    let self = new nModule();
    let essenses = {};

    let Essense = function(p){
        let primary = deep(p, 'history');
        let el, ed;

        let actions = {
            updateApplication: () => app.mobile.update.downloadAndInstall((percent, text) => {
                if (percent === 100) {
                    renders.updatePercent('Downloaded');
                    return;
                }

                renders.updatePercent(percent);
            }),
            closeWindow: () => self.stop(),
        }

        let events = {
            onInstallClick: () => {
                actions.updateApplication();
            },
            onLaterClick: () => {
                actions.closeWindow();
            },
        }

        let renders = {
            updatePercent: (text) => {
                const elem = el.c.find('.install-now');
                elem.text(text)
            }
        }

        let state = {
            save : function(){

            },
            load : function(){

            }
        }

        let initEvents = function(){
            console.log('upd events');

            el.c.on('click', '.install-now', events.onInstallClick);
            el.c.on('click', '.install-later', events.onLaterClick);
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
