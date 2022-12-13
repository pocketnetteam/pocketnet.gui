var downloadMedia = (function(){

  var self = new nModule();

  var essenses = {};

  var Essense = function(p){

    var primary = deep(p, 'history');

    var el, ed;


    var actions = {

    }

    var events = {
      close : function(){
        self.closeContainer();
      },

      downloadMedia : function(save){
        if (ed.success) {
          ed.success(save)
        }
      }

    }

    var renders = {

    }

    var state = {
      save : function(){

      },
      load : function(){

      }
    }

    var initEvents = function(){

      el.no.on('click', () => {
        events.downloadMedia(false);
        self.closeContainer();
      })

      el.yes.on('click',  () => {
        events.downloadMedia(true);
        self.closeContainer();
      })

    }

    var make = function(){
      
    }

    return {
      primary : primary,

      getdata : function(clbk, p){

        ess = deep(p, 'settings.essenseData.item') || 'post';

        sobj = deep(p, 'settings.essenseData.obj') || null;

        ed = p.settings.essenseData || {};

        if (sobj){
          var data = {
            ess : ess
          };
          clbk(data);
        }
      },

      destroy : function(){
        el = {};
      },

      init : function(p){

        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);
        el.no = el.c.find('.no')
        el.yes = el.c.find('.yes')

        initEvents();

        make()

        p.clbk(null, p);
      },
      wnd : {
        class : 'withoutButtons transparent small downloadMedia'
      }
    }
  };



  self.run = function(p){

    var essense = self.addEssense(essenses, Essense, p);

    self.init(essense, p);

  };

  self.stop = function(){

    _.each(essenses, function(essense){

      essense.destroy();

    })

  }

  return self;
})();


if(typeof module != "undefined")
{
  module.exports = downloadMedia;
}
else{
  app.modules.downloadMedia = {};
  app.modules.downloadMedia.module = downloadMedia;

}