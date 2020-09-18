var Node = require("./objects/node");

var Nodemanager = function(p){
    if(!p) p = {};

    var self = this;


    self.nodes = [];
    self.nomap = {};
    self.rpc = {};

    self.remap = function(){
        self.nomap = {};

        _.each(self.nodes, function(n){
            self.nomap[n.host] = n

            self.rpc[n.host] = self.rpcinit(n)
        })

        _.each(self.rpc, function(r, n){
            if(!self.nomap[n]) delete self.rpc[n]
        })

    }

    self.rpcinit = function(node){

        var config = {
            protocol: 'http',
            user: node.rpcuser || p.rpcuser,
            pass: node.rpcpass || p.rpcpass,
            host: node.host,
            port: node.port,
        };


        return new RpcClient(config);

    }

    self.addLocally = function(node){

        var rpc = self.rpcinit(node);


        return rpc
    }

    self.check = function(node, clbk){

        var rpc = self.rpcinit(node);


        rpc.getnodeinfo([], function(err, data){

            console.log(err, data)
          
            if (clbk)
                clbk(!err && data)

        })  

    }

    self.revoke = function(_p, clbk){

        _p.addedby = _p.signature.address

        var node = new Node(_p, p)

        node.revoke(function(err){

            if(!err){

                removeEqual(self.nodes, {
                    host : _p.host
                });


                self.remap()

                if (clbk)
                    clbk(null)
            }

            else{
                if (clbk)
                    clbk(err)
            }

            
        })
    }

    self.update = function(_p, clbk){

        _p.addedby = _p.signature.address

        var node = new Node(_p, p)

        self.check(_p, function(res){

            if(res){
                node.update(function(err, nd){

                    if(!err){

                        var n = _.find(self.nodes, function(n){
                            return n.host == nd.host
                        })

                        if (n){

                            n.port = nd.port
                            n.ws = nd.ws
                            n.path = nd.path
                            n.nodename = nd.nodename

                            self.remap()
                        }
        
                       
        
                        if (clbk)
                            clbk(null, nd)
                    }
        
                    else{
                        if (clbk)
                            clbk(err, nd)
                    }
        
                    
                })
            }

            else{
                if (clbk)
                    clbk('Unable to connect with node')
            }

        })

        
    }
    
    self.create = function(_p, clbk){

        _p.addedby = _p.signature.address

        var node = new Node(_p, p)

        self.check(_p, function(res){

            if(res){
                node.create(function(err, nd){

                    if(!err){

        
                        self.nodes.push(nd);
                        self.remap()
        
                        if (clbk)
                            clbk(null, nd)
                    }
        
                    else{
                        if (clbk)
                            clbk(err, nd)
                    }
        
                    
                })
            }

            else{
                if (clbk)
                    clbk('Unable to connect with node')
            }

        })

        
    }

    self.getnodes = function(){

        return _.map(self.nodes, function(n){
            return {
                addedby : n.addedby,
                date : n.date || '',
                host : n.host,
                nodename : n.nodename,
                port : n.port,
                ws : n.ws,
                stable : n.stable || false,
                statistic : self.statistic.get(n.host) || ''
            }
        })

    }

    self.init = function(clbk){

        self.nodes = _.clone(p.stable);
        self.remap()

        if (p.db){
            var node = new Node({}, p)

            node.all(function(err, result){

                if(!err){

                    self.nodes = self.nodes.concat(result || []);

                }

                self.remap()

                if (self.nodes.length)
                    self.api.peernodes(self.nodes[0], function(newnodes){

                        //console.log("SUCC", newnodes.length)

                    })

                if (clbk)
                    clbk(err)        
                
            })
        }
        else{
            if (clbk)
                clbk()  
        }

        
    }

    self.path = function(_node){
        var node = null;
        
        if(_node.locally){
            node = _node.locally

        }
        else{
            node = self.nomap[_node.ws_node_host]
        }
       

        if (node){

            return `ws://${node.host}:${node.ws}/ws`;

        }

        return null
    }

    self.select = function(n){

        if(!self.nodes.length){
            return null
        }

        var i = 0// rand(1, self.nodes.length) - 1


        if(!n || n == 'auto'){

            return self.nodes[i].host
        }

        return self.nomap[n].host

    }

    self.validateHost = function(str){

        return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);

    }

    self.request = function(_p, clbk, node){

        var ps = {
            method : _p.method,
            parameters : _p.parameters || [],
        }

        if (node) 
            ps.nodelocally = JSON.stringify(node);       

        p.handles.rpc.action({
            parameters : ps,

            nodeManager : self,

            responseSuccess : function(_p){
                var data = _p.data

                if (clbk)
                    clbk(data)
            },  

            responseFail : function(err, d){
                if (clbk)
                    clbk(d, err)
            }
        })

    }

    self.api = {

        peernodes : function(node, clbk){
            this.peers(function(nodes, error){                

                if(!error){

                    nodes = _.filter(nodes, function(n){
                        return !self.nomap[n.host]
                    })


                    self.api.connected(nodes, function(connected){

                        _.each(connected, function(newnode){
                            self.nodes.push(newnode)

                            self.remap()
                        })

                        if (clbk)
                            clbk(connected)


                    })

                }
                else{
                    if (clbk)
                        clbk()
                }

            }, node)
        },

        connected : function(nodes, clbk){
            var connected = []

            lazyEach({
                array : nodes || [],
                action : function(p){
                    var node = p.item;

                    self.api.info(node, function(info, error){

                        if(!error){
                            connected.push(node)
                        }

                        p.success()

                    })

                },

                all : {
                    success : function(){
                        if (clbk)
                            clbk(connected)
                    }
                }
            })
        },       

        info : function(node, clbk){

            self.request({

                method : 'getnodeinfo'

            }, function(data, error){

                if (clbk)
                    clbk(data, error)

            }, node)

        },
        peers : function(clbk, node){
            self.request({
                method : 'getPeerInfo'
            }, function(data, error){

                if(!error){
                    var nodes = _.map(data.result || [], function(peer){

                        var pr = peer.addr.split(":")

                        var node = {
                            host : pr[0],
                            port : p.defaults.port,
                            ws : p.defaults.ws,
                            nodename : "Unknown peer",
                            peer : true
                        }

                        return node

                    })

                    nodes = _.uniq(nodes, function(n){
                        return n.host
                    })

                    if (clbk)
                        clbk(nodes, error)
                }
                else{
                    if (clbk)
                        clbk(null, error)
                }

                

            }, node)
        }
    
    }

    self.statistic = {

        storage : {},

        add : function(node, p){

            this.storage[node] || (
                this.storage[node] = {
                    last : []
                }
            )

            this.storage[node].last.push(p)

            var d = this.storage[node].last.length - 1000

            if (d > 1){

                this.storage[node].last = this.storage[node].last.concat(0, d)

            }

        },

        get : function(node){
            var s = this.storage[node];

            if(!s || !s.last || !s.last.length){
                return null;
            }

            var r = {
                success : 0,
                failed : 0,
                time : 0,
                count : s.last.length
            }

            _.each(s.last, function(l){

                if (l.code == 200){
                    r.success++
                }
                else
                {
                    r.failed++
                }

                r.time += l.difference

            })

            r.percent = (r.success / r.count) * 100

            r.time = r.time / r.count

            return r
        }

    }
		
    return self;
}

module.exports = Nodemanager