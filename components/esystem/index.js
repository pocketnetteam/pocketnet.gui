var esystem = (function() {

    var self = new nModule();

    var essenses = {};

    var Essense = function(p) {

        var proxy = {
            parameters: function() {



            }
        }

        var primary = deep(p, 'history');

        var el;

        var actions = {

        }



        var events = {

        }


        var renders = {

            nodeControl: function(clbk) {
                var composed = null;

                if (self.sdk.esystem.tickstate) {
                    let state = deep(self, 'sdk.esystem.tickstate.settings.node')
                    composed = self.sdk.esystem.node.settings.compose(state)
                }

                renders.options(composed, el.nodecontrolcnt, function(p) {

                    p.el.find('input[pid="Enable"]').on('change', function(e) {
                        if (e.target.checked) {
                            dialog({
                                html: self.app.localization.e('nodeEnableNote'),
                                header: self.app.localization.e('nodeEnableNoteHeader'),
                                btn1text: self.app.localization.e('daccept'),
                                btn2text: self.app.localization.e('dcancel'),
                                success: function() {
                                    self.sdk.esystem.request('node.enable', { v: e.target.checked }, function(data) {})
                                },
                                fail: function() {}
                            })
                        } else {
                            self.sdk.esystem.request('node.enable', { v: e.target.checked }, function(data) {})
                        }
                    });


                    p.el.find('button[pid="binPath_Selector"]').on('click', function(e) {
                        self.sdk.esystem.request('node.setBinPath', {}, function(er, msg) {
                            p.el.find('input[pid="binPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="dataPath_Selector"]').on('click', function(e) {
                        self.sdk.esystem.request('node.setDataPath', {}, function(er, msg) {
                            p.el.find('input[pid="dataPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="confPath_Selector"]').on('click', function(e) {
                        self.sdk.esystem.request('node.setConfPath', {}, function(er, msg) {
                            p.el.find('input[pid="confPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="setPrivateKey"]').on('click', function(e) {
                        e.preventDefault()

                        dialog({
                            html: self.app.localization.e('nodeWalletAdd'),
                            btn1text: self.app.localization.e('dyes'),
                            btn2text: self.app.localization.e('dno'),
                            success: function() {

                                let private = bitcoin.ECPair.fromPrivateKey(self.app.user.private.value).toWIF()
                                self.sdk.esystem.request('node.setWallet', { private: private }, function(err, msg) {
                                    if (err) {
                                        dialog({
                                            html: msg,
                                            header: self.app.localization.e('error'),
                                            btn1text: self.app.localization.e('daccept'),
                                            class: 'one'
                                        })
                                    }
                                })

                            },
                            fail: function() {


                            }
                        })


                    });

                })
            },

            proxyOptions: function(clbk) {

                var composed = null;

                if (self.sdk.esystem.tickstate) {
                    composed = self.sdk.esystem.proxy.settings.compose(deep(self, 'sdk.esystem.tickstate.settings'))
                }

                renders.options(composed, el.proxyoptions, clbk)
            },

            options: function(composed, _el, clbk) {

                self.shell({
                    name: 'options',
                    el: _el,
                    data: {
                        composed: composed
                    }

                }, function(p) {
                    ParametersLive(composed.o, p.el)
                    if (clbk) clbk(p)
                })
            },

            download: function() {
                if (el.downloadElectron.length) {

                    self.nav.api.load({
                        open: true,
                        id: 'applications',
                        el: el.downloadElectron,

                        eid: 'applications_ui',

                        essenseData: {

                        },

                        clbk: function(e, p) {

                            if (!el.c) return

                        }
                    })

                }
            }

        }

        var state = {
            save: function() {

            },
            load: function() {

            }
        }

        var initEvents = function() {

            self.sdk.esystem.clbks.tick.esystem = function(settings, changed) {
                if (changed) {
                    renders.proxyOptions()
                    renders.nodeControl()
                }
            }

        }

        var make = function() {
            renders.download()
            renders.proxyOptions()
            renders.nodeControl()
        }

        return {
            primary: primary,

            getdata: function(clbk) {

                var data = {};

                clbk(data);

            },

            destroy: function() {

                delete self.sdk.esystem.clbks.tick.esystem

                el = {};
            },

            init: function(p) {

                state.load();

                el = {};
                el.c = p.el.find('#' + self.map.id);

                el.downloadElectron = el.c.find('.downloadApplication.ui')
                el.proxyoptions = el.c.find('.proxyoptions')
                el.nodecontrolcnt = el.c.find('.nodecontrolcnt')

                initEvents();

                make()

                p.clbk(null, p);
            }
        }
    };



    self.run = function(p) {

        var essense = self.addEssense(essenses, Essense, p);

        self.init(essense, p);

    };

    self.stop = function() {

        _.each(essenses, function(essense) {

            essense.destroy();

        })

    }

    return self;
})();


if (typeof module != "undefined") {
    module.exports = esystem;
} else {

    app.modules.esystem = {};
    app.modules.esystem.module = esystem;

}