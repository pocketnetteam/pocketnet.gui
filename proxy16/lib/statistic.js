var f = require('../functions');

var Statistic = function(settings){

    if(!settings) settings = {}

    var self = this;

    var maxevents = settings.maxevents || 500

    var hperiodicity = settings.hperiodicity || 30
    var periodicity = settings.periodicity || 10000

    var events = []
    var eventsCount = 0
    initedTime = null

    var statisticInterval = null

    var statistic = {
        events : null,
        bymethods : null,
        history : [],
        historyslice : null
    }

    var inited = false

    var clear = function(){
        events = []
        eventsCount = 0

        statistic = {
            events : null,
            bymethods : null,
            history : [],
            historyslice : null
        }
    }

    var penalty = {
        k : 0,

        reason : null,
        timer : null,
        time : null,
        started : null,

        set : function(_k, time, reason){

            if(_k < 0 || _k > 1) return
            if(penalty.k || !time || !reason || !_k) return

            penalty.reason = reason
            penalty.started = new Date()
            penalty.time = time
            penalty.k = _k

            penalty.timer = setTimeout(function(){
                penalty.clear()
            }, time)
        },

        clear : function(){
            
            penalty.clearTimer()

            penalty.k = 0;
            penalty.time = null;
            penalty.started = null;
            penalty.reason = null;

        },

        clearTimer : function(){

            if (penalty.timer){

                clearTimeout(penalty.timer)
                penalty.timer = null

            }
        },

        getk : function(){
            return 1 - penalty.k
        },

        get : function(){

            return {
                k : penalty.k,
                reason : penalty.reason,
                time : penalty.time,
                started : penalty.started,
            }

        }
    }

    self.penalty = {
        set : penalty.set,
        get : penalty.get,
        value : penalty.getk()
    }

    self.add = function(p){
        var push = _.clone(p)
            push.time = new Date()

        events.push(push)

        if(!inited){
            events = f.lastelements(events, maxevents, maxevents / 10)
        }

        eventsCount ++

    }

    var mix = function(objs){

        var common = {
            success : 0,
            failed : 0,
            count : 0,
            time : 0,
            rate : 0,
            percent : 0
        }

        _.each(objs, function(obj){

            if(obj){
                common.success += obj.success || 0
                common.failed += obj.failed || 0
                common.count += obj.count || 0
            }

            
        })

        if (common.count && objs.length){ 
            
            _.each(objs, function(obj){
                
                if(obj){
                    common.time += (obj.time || 0) * (obj.count || 0)
                    common.rate += (obj.rate || 0)
                    common.percent += (obj.percent || 0)* (obj.count || 0)
                }
            })    
           

            common.time = common.time / common.count
            common.rate = common.rate / objs.length
            common.percent = common.percent / common.count

        }
        else{
            common.time = 0; common.rate = 0; common.percent = 0;
        }

        common.date = new Date()

        return common

    }

    var fixhistory = function(e){
        statistic.history.push(e)

        var d = statistic.history.length - hperiodicity

        if (d > hperiodicity / 10){
            statistic.history = statistic.history.splice(0, d)
        }


        statistic.historyslice = mix(statistic.history)

    }

    var eventsfix = function(){

        var groupedByMethods = bymethods()
        var _events = get()

        statistic.events = mix([statistic.events, _events])

        var emap = {}

        statistic.bymethods || (statistic.bymethods = {})

        _.each(groupedByMethods, function(v,i){emap[i] = i})
        _.each(statistic.bymethods, function(v,i){emap[i] = i})

        _.each(emap, function(i){
            statistic.bymethods[i] = mix([statistic.bymethods[i], groupedByMethods[i]])
        })

        fixhistory(_events)


        events = []
    }

    var get = function(method){

        var evt = _.filter(events, function(l){
            if (method && l.method != method) return false

            return true
        })
        
        var r = {
            success : 0,
            failed : 0,
            time : 0,
            count : evt.length,
            rate : rate(method)
        }

        _.each(evt, function(l){

            if (l.code == 200){
                r.success++
            }
            else
            {
                r.failed++
            }

            r.time += l.difference

        })

        r.percent = (r.success / (r.count || 1)) * 100

        r.time = r.time / (r.count || 1)

        return r

    }

    var bymethods = function(){
        var ms = {}

        _.each(events, function(e){
            
            if(e.method && !ms[e.method]) {
                ms[e.method] = get(e.method)
            }

        })


        return ms
    }

    var rate = function(method){
        var s = f.date.addseconds(new Date(), - periodicity / 1000)
        var l = events.length
        var c = 0

        if(l){
            while (l && events[l - 1].time > s){

                if(!method || events[l - 1].method == method){
                    c++
                }

                l--
            }
        }

        return c / (periodicity / 1000)
    }

    var availability = function(s){

        if(!s.count) return null

        var time = s.time;
        var rate = (s.rate || 0) + 1

        if (time && time > 0 && time <= 200) time = 200
        if (time && time > 200 && time <= 400) time = 300
        if (time && time > 400 && time <= 700) time = 500
        if (time && time > 700 && time <= 1300) time = 1000
        if (time && time > 1300 && time <= 2300) time = 1700
        if (time && time > 2300 && time <= 4000) time = 3100
        if (time && time > 4000 && time <= 7000) time = 5300
        if (time && time > 7000 && time <= 15000) time = 10000
        if (time && time > 15000) time = 30000

        if (rate <= 2) rate = 1.5
        if (rate > 2 && rate <= 4) rate = 3
        if (rate > 4 && rate <= 8) rate = 6
        if (rate > 8 && rate <= 16) rate = 12
        if (rate > 16 && rate <= 30) rate = 23
        if (rate > 30 && rate <= 50) rate = 40
        if (rate > 50 && rate <= 100) rate = 75

        return (s.percent * rate / (time))

    }

   

    self.get = {
        history : () => statistic.history,
        events : () => {
            if(!statistic.events) eventsfix()

            return statistic.events
        },
        slice : () => {
            if(!statistic.events) eventsfix()

            return statistic.historyslice
        },

        startDate : function(){
            return initedTime
        },

        availability : function(){
            var alltime = availability(self.get.events())
            var slicetime = availability(self.get.slice())

            return Math.sqrt(alltime, slicetime)
        }
    }


    self.init = function(){

        inited = true
        initedTime = new Date()

        if(!statisticInterval)
            statisticInterval = setInterval(eventsfix, periodicity)

        return self
    }

    self.destroy = function(){

        clear()

        inited = false
        initedTime = null

        if(!statisticInterval)
            clearInterval(statisticInterval)

        statisticInterval = null
    }

    return self
}


module.exports = Statistic

