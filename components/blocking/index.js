var blocking = (function(){

  var self = new nModule();

  var essenses = {};

  var Essense = function(p){

    var primary = deep(p, 'history');

    var el, blocklist;

    var actions = {

    }

    var events = {
        addToBlockList(event, liker) {
          let address = liker.attributes.address.value
          if (blocklist.includes(address)) {
            blocklist = blocklist.filter(i => i !== address)
            liker.children[0].classList.remove('checked')
          } else {
            blocklist.push(address)
            liker.children[0].classList.add('checked')
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

    }

    return {
      primary : primary,

      getdata : async function(clbk){
        var data = {}
        var blocked
        //Запрос лайкеров
        try {
          data.likers = await self.app.api.rpc('getaccountraters', [p.essenseData.address])
          blocked = self.app.platform.sdk.user.storage.me.blocking
          data.likers = data.likers.filter(liker => {

            let res = !(blocked.includes(liker.address) || liker.address === self.app.platform.sdk.user.storage.me.address)

            return res
          })
        } catch (e) {
          console.log(e)
        } finally {
          clbk(data);
        }

      },

      destroy : function(){
        el = {};
        self.closeContainer()
      },

      init : function(p){
        state.load();
        el = {};
        el.c = p.el.find('#' + self.map.id);
        el.likers = el.c.find('.liker')
        if (el.likers) {
          _.each(el.likers, function(liker) {
            liker.addEventListener('click',(e) =>{
              e.stopPropagation();
              events.addToBlockList(e,liker)
            } )
          });
        }



        blocklist = []
        initEvents();

        p.clbk(null, p);

      },
      wnd : {
        class : 'blockingwnd normalizedmobile maxheight',
        header : "Users recommended for blocking",
        buttons : {
          success : {
            text : "Block",
            fn : function() {

              if (blocklist.length) {
                try {
                  var blocking = new Blocking();
                  blocking.addresses.set(blocklist);

                  topPreloader(10)

                  self.sdk.node.transactions.create.commonFromUnspent(

                    blocking,

                    function (tx, error) {


                      if (tx) {
                        var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

                        if (me) me.addRelation(blocklist, 'blocking')

                        var clbks = deep(self.clbks, 'api.actions.blocking') || {}

                        _.each(clbks, function (c) {
                          c(address)
                        })
                      }

                      topPreloader(100)
                      if (error){
                        self.app.platform.errorHandler(error, true)
                      }
                    }
                  )
                } catch (e){
                  self.closeContainer()
                  console.log('blocking',e)
                  self.app.platform.errorHandler(err, true)
                }
              }

              self.closeContainer()
              return true
            }
          }
        }
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
  module.exports = blocking;
}
else{

  app.modules.blocking = {};
  app.modules.blocking.module = blocking;

}