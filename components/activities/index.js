var activities = (function(){

  var self = new nModule();

  var essenses = {};

  var Essense = function(p){

    var primary = deep(p, 'history');

    var el;

    var tabs = [
      {name: 'all', isActive: true},
      {name: 'rating', isActive: false},
      {name: 'comments', isActive: false},
      {name: 'following', isActive: false},
      {name: 'donates', isActive: false},
    ]

    var activities

    var actions = {
        getactivities: async function() {
          activities = await self.app.api.rpc('getactivities', [self.user.address.value, self.app.platform.currentBlock, 0 ,["contentscore"]])
          activities.map(i => {
            if (i.description) {
              i.description = JSON.parse(i.description)
            }

            if (!i.description && i.relatedContent.description) {
              try {
                i.description = JSON.parse(i.relatedContent.description)
              } catch (e) {
                i.description = {}
                i.description.message = i.relatedContent.description
              }
            }
            if (i.height){

              let range = (self.app.platform.currentBlock - i.height) / 2
              console.log(range)
              i.date = moment().subtract(range, 'minute').calendar();
            }
          })

          renders.content()
        }
    }

    var events = {

    }

    var renders = {
      content: function (type) {
        self.shell({

          name :  'content',
          el :   el.content,
          data : {
            activities: activities,
          },
        }, function(_p) {

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


    }

    return {
      primary : primary,

      getdata : function(clbk){



        var data = {
          tabs: tabs
        };

        clbk(data);

      },

      destroy : function(){
        el = {};
      },

      init : function(p){

        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);
        el.content = p.el.find('.content');
        initEvents();

        actions.getactivities()

        p.clbk(null, p);
      },
      wnd : {
        //header : "notifications",
        class : 'wndactivities normalizedmobile maxheight',
        parallaxselector : '.wndback,.wndheader'
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
  module.exports = activities;
}
else{

  app.modules.activities = {};
  app.modules.activities.module = activities;

}