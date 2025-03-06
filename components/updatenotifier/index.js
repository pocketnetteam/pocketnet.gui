let updatenotifier = (function(){
    let self = new nModule();
    let essenses = {};

    let Essense = function(p){
        let primary = deep(p, 'history');
        let el, ed;
        let e = (l) => self.app.localization.e(`updateNotifier_${l}`);
        let isUpdating, updateInfo;

        let actions = {
            updateApplication: () => app.mobile.update.downloadAndInstall((percent, text) => {
                if (percent < 1) {
                    return;
                }

                if (percent === 100) {
                    renders.updatePercent(e('stateDownload'));

                    setTimeout(actions.closeWindow, 5000);

                    return;
                }

                renders.updatePercent(`${e('stateDownload')} ${Math.floor(percent)}%`);
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
                renders.updatePercent(e('stateStart'));
                actions.updateApplication().catch(() => {
                    renders.updatePercent(e('stateError'));
                    setTimeout(actions.closeWindow, 5000);
                });
            },
            onLaterClick: () => {
                localStorage.updateNotifier = JSON.stringify({
                    notified: Date.now(),
                    version: updateInfo.version,
                });

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

            el.c.on('click', '.install-now', events.onInstallClick);
            el.c.on('click', '.install-later', events.onLaterClick);
        }

        return {
            primary : primary,

            getdata : function(clbk, p){
                updateInfo = p.settings.essenseData.updateInfo;

                const data = { updateInfo };

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
                class : 'allscreen black withoutButtons fullscreenActive nobfilter',
            }
        }
    };

    self.run = function(p){
        let essense = self.addEssense(essenses, Essense, p);
        self.init(essense, p);
    };

    self.stop = function(){
        _.each(essenses, function(essense){
            window.rifticker.add(() => {
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
