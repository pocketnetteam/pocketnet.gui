let updatenotifier = (function(){
    let self = new nModule();
    let essenses = {};

    let Essense = function(p){
        let primary = deep(p, 'history');
        let el, ed;
        let isUpdating;

        let actions = {
            updateApplication: () => app.mobile.update.downloadAndInstall((percent, text) => {
                if (percent < 1) {
                    return;
                }

                if (percent === 100) {
                    renders.updatePercent('Downloaded');

                    setTimeout(actions.closeWindow, 5000);

                    return;
                }

                renders.updatePercent(`Downloaded ${Math.floor(percent)}%`);
            }),
            closeWindow: () => {
                el.c.parents('.wnd').find('._close').click();
                self.stop();
            },
        }

        let events = {
            onInstallClick: () => {
                if (isUpdating) {
                    return;
                }

                isUpdating = true;
                el.c.find('.install-later').hide();
                renders.updatePercent('Starting...');
                actions.updateApplication().catch(() => {
                    renders.updatePercent('Error occurred, stopping');
                    setTimeout(actions.closeWindow, 5000);
                });
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
                isUpdating = false;
            },

            init : function(p){
                state.load();

                el = {};
                el.c = p.el.find('#' + self.map.id);

                initEvents();

                p.clbk(null, p);
            },

            wnd : {
                class : 'allscreen black withoutButtons imageGallery fullscreenActive nobfilter',
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
