var complain = (function(){

  var self = new nModule();

  var essenses = {};

  var Essense = function(p){

    var primary = deep(p, 'history');

    var el, ess, sobj, selected, ed, textreason;

    var reasons = {

      post : [
        {
          name : self.app.localization.e('lowstar_reason_1'),
          gid : 1
        },
        {
          name : self.app.localization.e('lowstar_reason_2'),
          gid : 2
        },
        {
          name : self.app.localization.e('lowstar_reason_3'),
          gid : 3
        },
        {
          name : self.app.localization.e('lowstar_reason_4'),
          gid : 4
        }

      ],
      user : [
        {
          name : self.app.localization.e('lowstar_reason_1'),
          gid : 1
        },
        {
          name : self.app.localization.e('lowstar_reason_2'),
          gid : 2
        },
        {
          name : self.app.localization.e('lowstar_reason_3'),
          gid : 3
        },
        {
          name : self.app.localization.e('lowstar_reason_4'),
          gid : 4
        }

      ]

    }


    var actions = {
      find : function(id){
        return _.find(reasons[ess], function(r){
          return (r.gid || r.id) == id
        })
      },

      complain : function(clbk){
        try {
          self.app.platform.sdk.ustate.me(function(mestate){
            if(ess == 'post'){

              if((typeof mestate!= 'undefined' && mestate.badges && Object.values(mestate.badges).includes('shark'))){

                var modFlag = sobj.modFlag(selected);

                topPreloader(30);
                self.sdk.node.transactions.create.commonFromUnspent(

                  modFlag,

                  function(tx, error){
                    topPreloader(100)

                    if(!tx){
                      self.app.platform.errorHandler(error, true)

                      if (clbk)
                        clbk()
                    }
                    else
                    {

                      successCheck()
                      sitemessage(self.app.localization.e('complain_success'))
                    }

                  }
                )
                if (clbk)
                  clbk(true)
              }

              else{
                try{
                  var i1 = ((actions.find(selected) || {}).name) || selected;
                  self.app.Logger.info({
                    actionId: 'POST_COMPLAIN',
                    actionValue: i1,
                    actionSubType: sobj.txid
                  });
                  clbk(true)
                  sitemessage(self.app.localization.e('complain_success'))
                } catch (error) {
                  self.app.platform.errorHandler(error, true)
                }

                // var i1 = ((actions.find(selected) || {}).name) || selected;
                // self.app.complainletters.post({
                //   i1,
                //   s3 : mestate.address,
                //   s2 : sobj.txid
                // }, function(r){
                //   successCheck()
                //
                //   if (clbk)
                //     clbk(r)
                // })
              }
            }

            if(ess == 'user'){
              if((typeof mestate!= 'undefined' && mestate.badges && Object.values(mestate.badges).includes('shark'))){

                var modFlag = sobj.data.modFlag(selected);

                topPreloader(30);
                self.sdk.node.transactions.create.commonFromUnspent(

                  modFlag,

                  function(tx, error){
                    topPreloader(100)

                    if(!tx){
                      self.app.platform.errorHandler(error, true)

                      if (clbk)
                        clbk()
                    }
                    else
                    {
                      successCheck()
                      sitemessage(self.app.localization.e('complain_success'))
                    }

                  }
                )
                if (clbk)
                  clbk(true)
              }

              else{
                try{
                  var i1 = ((actions.find(selected) || {}).name) || selected;
                  self.app.Logger.info({
                    actionId: 'USER_COMPLAIN',
                    actionValue: i1,
                    actionSubType: sobj.data.address
                  });
                  clbk(true)
                  sitemessage(self.app.localization.e('complain_success'))
                } catch (error) {
                  self.app.platform.errorHandler(error, true)
                }

              }
            }

          })
        } catch (e) {
          console.log(e)
        }

      },

      nextActive : function(){

        if(selected || textreason){

          el.next.removeClass('disabled')

        }
        else
        {
          el.next.addClass('disabled')
        }
      },
    }

    var events = {
      close : function(){
        self.closeContainer();
      },

      complain : function(){
        if(!el.next.hasClass('disabled') && (selected || textreason)){

          actions.complain(function(r){
            if(r){
              self.closeContainer();

              if (ed.success) {
                ed.success()
              }
            }

          })
        }

      },



      select : function(){
        var id = $(this).attr('reason')

        var reason = actions.find(id);

        if (reason){

          if($(this).hasClass('active')){

          }
          else
          {
            el.c.find('.reason').removeClass('active');

            selected = null

            $(this).addClass('active')

            selected = reason.gid

            actions.nextActive()
          }

        }
      }
    }

    var renders = {
      reasons : function(){
        self.shell({
          name :  'reasons',
          inner : html,
          el : el.reasons,
          data : {
            reasons : reasons[ess]
          },

        }, function(p){
          p.el.find('.reason').on('click', events.select)
        })
      }

    }

    var state = {
      save : function(){

      },
      load : function(){

      }
    }

    var initEvents = function(){

      el.c.find('.cancel').on('click', events.close)

      el.next.on('click', events.complain)

      el.c.find('textarea').on('keyup', function(){
        textreason = $(this).val()
        actions.nextActive()
      })
    }

    var make = function(){
      renders.reasons()
    }

    return {
      primary : primary,

      getdata : function(clbk, p){

        selected = null;
        textreason = ''

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
        el.reasons = el.c.find('.reasons')
        el.next = el.c.find('.next')

        initEvents();

        make()

        p.clbk(null, p);
      },
      wnd : {
        class : 'withoutButtons transparent small complain'
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
  module.exports = complain;
}
else{
  app.modules.complain = {};
  app.modules.complain.module = complain;

}