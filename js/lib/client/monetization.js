var Monetization = function(app, {url, auth}){
    var self = this

    self.start = 1725235200

    var helpers = {
        getYearPeriod : function(year){

            var start = moment.utc([year, 0, 1]).unix()

            var end = moment.utc([year + 1, 0, 1]).unix()

            return {
                start, end
            }
        },

        totalEarnings : function(ar, f){

            var total = {}

            _.each(ar, (o) => {

                var p = f(o)

                total.commentsCount = (total.commentsCount || 0) + (p.commentsCount || 0)
                total.commentsCountFromSharks = (total.commentsCountFromSharks || 0) + (p.commentsCountFromSharks || 0)
                total.reward = (total.reward || 0) + (p.reward || 0)
                total.scoresCount = (total.scoresCount || 0) + (p.scoresCount || 0)
                total.scoresCountFromSharks = (total.scoresCountFromSharks || 0) + (p.scoresCountFromSharks || 0)
            })


            total.comments = (total.commentsCount || 0) + (total.commentsCountFromSharks || 0)
            total.scores = (total.scoresCount || 0) + (total.scoresCountFromSharks || 0)

            return total

        },
        
        totalBoosts : function(ar, f){

            var total = {}

            _.each(ar, (o) => {

                var p = f(o)

                total.amountBoost = (total.amountBoost || 0) + (p.amountBoost || 0)
            })

            return total

        },
       
    } 

    var groupping = {
        common  : {
            groupByWeekYear : function(r, year, {totalFunction}){
                var weeks = _.sortBy(weeksInYear(year), (w) => {
                    return -w.n
                })
    
                var weeksResult = _.map(weeks, (w) => {
    
                    var posts = _.sortBy(_.filter(r, (f) => {
                        return getWeekNumber(new Date(moment.utc(f.time * 1000).toDate()))[1] == w.n
                    }), (f) => {
                        return -f.time
                    })
    
                    w.notIncluded = w.date > moment.utc().unix()
    
                    w.beforeProgram = w.date < self.start
    
                    return {
                        ...w, posts, total : totalFunction(posts, (r) => {return r}), startof : w.date == self.start
                    }
                })
    
                var byMonth = _.sortBy(_.map(group(weeksResult, (w) => {
                    return (new Date(w.end * 1000)).getMonth() + 1
                }), (bm, i) => {
    
                    var postsCount = _.reduce(bm, (m, p) => {
                        return m + p.posts.length
                    }, 0)
    
                    var start = new Date(year, i - 1, 1)
                    var end = new Date(year, i, 1)
                    var current = new Date()
    
                    return {
                        end,
                        start,
                        current : current.getTime() > start.getTime() && current.getTime() <= end.getTime(),
                        weeks : bm,
                        total : {postsCount, ...totalFunction(bm, (r) => {return r.total})},
                        notIncluded : !_.find(bm, (w) => {
                            return !w.notIncluded
                        }),
                        beforeProgram : !_.find(bm, (w) => {
                            return !w.beforeProgram
                        }),
    
                        startof : _.find(bm, (w) => {
                            return w.startof
                        })
                    }
                }), (m) => {
                    return -(new Date(m.start)).getTime()
                })
    
                var postsCount = _.reduce(byMonth, (m, p) => {
                    return m + p.total.postsCount
                }, 0)
    
                var year = {
                    months : byMonth,
                    total : {postsCount, ...totalFunction(byMonth, (r) => {return r.total})}
                }
    
                return year
            },
    
            groupByMonthYear : function(r, year, {totalFunction}){
                var monts = _.sortBy(monthsInYear(year), (w) => {
                    return -w.n
                })
    
                var current = new Date()
    
                var byMonth = _.map(monts, (w) => {
    
                    var posts = _.sortBy(_.filter(r, (f) => {
                        return moment.utc(f.time * 1000).month() + 1 == w.n 
                    }), (f) => {
                        return -f.time
                    })
    
                    w.notIncluded = w.date > moment.utc().unix()
    
                    var start = new Date(year, w.n - 1, 1)
                    var end = new Date(year, w.n, 1)
    
                    return {
                        ...w, 
                        posts, 
                        current : current.getTime() > start.getTime() && current.getTime() <= end.getTime(),
                        total : {...totalFunction(posts, (r) => {return r}), postsCount : posts.length},
                        start
                    }
    
                })
    
                var postsCount = _.reduce(byMonth, (m, p) => {
                    return m + p.total.postsCount
                }, 0)
    
                var year = {
                    months : byMonth,
                    total : {postsCount, ...totalFunction(byMonth, (r) => {return r.total})}
                }
    
                return year
            }
        },
        earnings : {
            groupByWeekYear : function(r, year){
                
                return groupping.common.groupByWeekYear(r, year, {totalFunction : helpers.totalEarnings})
    
            },
    
            groupByMonthYear : function(r, year){

                return groupping.common.groupByMonthYear(r, year, {totalFunction : helpers.totalEarnings})
               
            }
        },

        boosts : {
            groupByWeekYear : function(r, year){
                
                return groupping.common.groupByWeekYear(r, year, {totalFunction : helpers.totalBoosts})
    
            },
    
            groupByMonthYear : function(r, year){

                return groupping.common.groupByMonthYear(r, year, {totalFunction : helpers.totalBoosts})
               
            },

            groupByPostsYear : function(r, year){


                var posts = _.map(group(_.sortBy(r, (f) => {
                    return -f.time
                }), (p) => {
                    return p.contentRootTxHash
                }), (r, contentRootTxHash) => {

                    var post = r[0]

                    var groupresult = {
                        time : post.contentTime || 0,
                        contentRootTxHash,
                        ...helpers.totalBoosts(r, (r) => {return r}),
                        boosts : r
                    }


                    return groupresult
                })

                return {
                    posts,
                    total :  {postsCount : posts.length, ...helpers.totalBoosts(posts, (r) => {return r})}
                }

            },
        }
    }

    var request = function(path, data = {}, p = {}){

        var er = false

        var hash = path + JSON.stringify(data)

        return app.psdk.monetization.request(() => {

            var headers = _.extend({
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Basic ' + auth
            }, p.headers || {})
    
    
            return fetch('https://' + url + '/api/' + path, {
    
                method: p.method || 'POST',
                mode: 'cors',
                headers: headers,
                body: JSON.stringify(data)
    
            }).then(r => {
    
                if(!r.ok){
                    er = true
                }
    
                if (r.status){
    
                    if (r.status == 261){
                        return Promise.reject({
                            code : r.status
                        })
                    }
    
                }
    
                return r.json()
    
            }).then(result => {
    
                if (er){
                    return Promise.reject(result.error)
                }
    
                return Promise.resolve(result)
    
            })

        }, hash)

        

    }

    self.boostperformance = function({addresses, start, end}){

        if(!_.isArray(addresses)) addresses = [addresses]

        /*var r = [
            {
                "id": 17160474,
                "contentHash": "d8d1dd9bb8c9744f53d1eaaa0718373e4a0468f632e4a7bc66dda2aca7b975af",
                "contentRootTxHash": "d8d1dd9bb8c9744f53d1eaaa0718373e4a0468f632e4a7bc66dda2aca7b975af",
                "contentAddressHash": "PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5",
                "boostAddressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 2922052,
                "time": 1725436121,
                "amountBoost": 200000001
            },
            {
                "id": 17160474,
                "contentHash": "d8d1dd9bb8c9744f53d1eaaa0718373e4a0468f632e4a7bc66dda2aca7b975af",
                "contentRootTxHash": "d8d1dd9bb8c9744f53d1eaaa0718373e4a0468f632e4a7bc66dda2aca7b975af",
                "contentAddressHash": "PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5",
                "boostAddressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 2922103,
                "time": 1725439113,
                "amountBoost": 300000001
            },
            {
                "id": 17403095,
                "contentHash": "dbf0e5dcc839f0c634a90ccb660149f96c4a5ecb38bf59dd26e6b61a6f2fa38b",
                "contentRootTxHash": "dbf0e5dcc839f0c634a90ccb660149f96c4a5ecb38bf59dd26e6b61a6f2fa38b",
                "contentAddressHash": "PXYhCbTwPaUHrP6spJM5NY84TBpLQJtZi5",
                "boostAddressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 2922051,
                "time": 1725436000,
                "amountBoost": 300000001
            }
            ]

        return Promise.resolve(group(r, (f) => {
            return f.boostAddressHash
        }))*/

        return request('monetization/boostperformance', {
            Addresses : addresses,
            StartDate : start,
            EndDate : end
        }).then(r => {

            console.log("CLEAR RESULT ", r)


            return group(r, (f) => {
                return f.boostAddressHash
            })
        })
         
    }


    self.contentperformance = function({addresses, start, end}){

        if(!_.isArray(addresses)) addresses = [addresses]

        /*var r = [
            {
                "id": 99,
                "hash": "9b56be698bf7e4d8eea6ac07ef35a0f496863cac1fc03f336e059d2d6788f045",
                "rootTxHash": "9b56be698bf7e4d8eea6ac07ef35a0f496863cac1fc03f336e059d2d6788f045",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 4799,
                "time": 1549998493,
                "scoresCount": 21,
                "scoresCountFromSharks": 0,
                "commentsCount": 9,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 409,
                "hash": "f62125d2711a168f55978f7f0dd7f748ace05f73397ff439ae7b78c128d56ce1",
                "rootTxHash": "f62125d2711a168f55978f7f0dd7f748ace05f73397ff439ae7b78c128d56ce1",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 26337,
                "time": 1551297586,
                "scoresCount": 25,
                "scoresCountFromSharks": 1,
                "commentsCount": 16,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 442,
                "hash": "fb6b70cf3013648e0f797fd4b837db973376e0458e4f9dc4269555cf78d75d51",
                "rootTxHash": "fb6b70cf3013648e0f797fd4b837db973376e0458e4f9dc4269555cf78d75d51",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 28833,
                "time": 1551448628,
                "scoresCount": 21,
                "scoresCountFromSharks": 0,
                "commentsCount": 14,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 504,
                "hash": "cfa6f61b0731158bfb948671b4976e787b7deb814fc6b4649c3ce33becd10f89",
                "rootTxHash": "cfa6f61b0731158bfb948671b4976e787b7deb814fc6b4649c3ce33becd10f89",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 29903,
                "time": 1551513345,
                "scoresCount": 26,
                "scoresCountFromSharks": 1,
                "commentsCount": 3,
                "commentsFromSharks": 2,
                "reward": 0
            },
            {
                "id": 868,
                "hash": "48ba5da9e6b3b77cd2d4aceed927ac04d2534c130ed5769a4377b6fcac7f06c1",
                "rootTxHash": "48ba5da9e6b3b77cd2d4aceed927ac04d2534c130ed5769a4377b6fcac7f06c1",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 47176,
                "time": 1552562172,
                "scoresCount": 26,
                "scoresCountFromSharks": 0,
                "commentsCount": 1,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 1350,
                "hash": "6a477d56a4c3cb9faeebd8379ae55fef45b7287397d10fd236096c9cae2e0bf1",
                "rootTxHash": "6a477d56a4c3cb9faeebd8379ae55fef45b7287397d10fd236096c9cae2e0bf1",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 57455,
                "time": 1553195569,
                "scoresCount": 15,
                "scoresCountFromSharks": 0,
                "commentsCount": 1,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 2937,
                "hash": "bb4a3d19b26aa09c4079efc3c93da092054c2dd2d0153cd01ef4b467eb71417f",
                "rootTxHash": "bb4a3d19b26aa09c4079efc3c93da092054c2dd2d0153cd01ef4b467eb71417f",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 58850,
                "time": 1553279779,
                "scoresCount": 33,
                "scoresCountFromSharks": 1,
                "commentsCount": 2,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 3634,
                "hash": "e46e082b6a2bf37791c272d4154e04b711a82f1c83b7a4a87c7d3c4cd058a39f",
                "rootTxHash": "e46e082b6a2bf37791c272d4154e04b711a82f1c83b7a4a87c7d3c4cd058a39f",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 60286,
                "time": 1553366661,
                "scoresCount": 25,
                "scoresCountFromSharks": 1,
                "commentsCount": 0,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 5126,
                "hash": "fa2e07295de73bc32861041f384256a06b181a7399e26185c25984b68c0417fb",
                "rootTxHash": "fa2e07295de73bc32861041f384256a06b181a7399e26185c25984b68c0417fb",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 64103,
                "time": 1553596908,
                "scoresCount": 34,
                "scoresCountFromSharks": 0,
                "commentsCount": 2,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 6008,
                "hash": "374678ead5a05025533421155e7eaff91a64c0358d558a4654e9ea3a386a6eeb",
                "rootTxHash": "374678ead5a05025533421155e7eaff91a64c0358d558a4654e9ea3a386a6eeb",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 65918,
                "time": 1553707119,
                "scoresCount": 28,
                "scoresCountFromSharks": 0,
                "commentsCount": 2,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 7089,
                "hash": "e156d31d3fc705062037ba12e9c8e4b3ad847038b4f5f0c076265fb4a3d8ad7b",
                "rootTxHash": "e156d31d3fc705062037ba12e9c8e4b3ad847038b4f5f0c076265fb4a3d8ad7b",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 68427,
                "time": 1553858312,
                "scoresCount": 33,
                "scoresCountFromSharks": 0,
                "commentsCount": 0,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 11647,
                "hash": "da7980b190a276cc766b0abb5f93aee4ca0f233ee648259cf9b6ea38d3ef418a",
                "rootTxHash": "da7980b190a276cc766b0abb5f93aee4ca0f233ee648259cf9b6ea38d3ef418a",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 85425,
                "time": 1554896282,
                "scoresCount": 32,
                "scoresCountFromSharks": 0,
                "commentsCount": 0,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 12534,
                "hash": "5b298e614cf5b1ec16816478cf46908730fcee5d1df73ae9e9227ce2eac606e7",
                "rootTxHash": "5b298e614cf5b1ec16816478cf46908730fcee5d1df73ae9e9227ce2eac606e7",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 89625,
                "time": 1555150066,
                "scoresCount": 30,
                "scoresCountFromSharks": 1,
                "commentsCount": 6,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 12614,
                "hash": "d8f0f05aca8e5ab0a9f5becc0f0cce54c92e8f131780e2e984ea00bd989bdd72",
                "rootTxHash": "d8f0f05aca8e5ab0a9f5becc0f0cce54c92e8f131780e2e984ea00bd989bdd72",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 89899,
                "time": 1555168252,
                "scoresCount": 42,
                "scoresCountFromSharks": 0,
                "commentsCount": 9,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 13570,
                "hash": "e368d85ac8ea07f6ebb0eed9fe5c957864e04cef3df4d56d908655a0cb8497d8",
                "rootTxHash": "e368d85ac8ea07f6ebb0eed9fe5c957864e04cef3df4d56d908655a0cb8497d8",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 94297,
                "time": 1555433510,
                "scoresCount": 58,
                "scoresCountFromSharks": 1,
                "commentsCount": 1,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 26058,
                "hash": "54fe81a1c864814e0a7c96e99e568e0edb2f11c5422c251c9a0b7bf068cc664c",
                "rootTxHash": "54fe81a1c864814e0a7c96e99e568e0edb2f11c5422c251c9a0b7bf068cc664c",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 151499,
                "time": 1558889361,
                "scoresCount": 66,
                "scoresCountFromSharks": 2,
                "commentsCount": 4,
                "commentsFromSharks": 2,
                "reward": 0
            },
            {
                "id": 155152,
                "hash": "c9b9c900c6ff8d205312ac40bbe58f4e21a769b8c3a55e2a5b15109af271c345",
                "rootTxHash": "bc592f816fe7514a6cd23bf6230cd01e8e8fd5e407c3d7301a742d3a1eab916f",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 355271,
                "time": 1571211208,
                "scoresCount": 49,
                "scoresCountFromSharks": 2,
                "commentsCount": 6,
                "commentsFromSharks": 0,
                "reward": 0
            },
            {
                "id": 262952,
                "hash": "9aa6fc1b134834f716486b13b41ef796eee894de0e1ed9ef4fc3dbb6a00b11c5",
                "rootTxHash": "9aa6fc1b134834f716486b13b41ef796eee894de0e1ed9ef4fc3dbb6a00b11c5",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 431615,
                "time": 1575821676,
                "scoresCount": 31,
                "scoresCountFromSharks": 4,
                "commentsCount": 6,
                "commentsFromSharks": 1,
                "reward": 0
            },
            {
                "id": 720627,
                "hash": "27904ded808c8a183b06783a3a671d050e80e442085d22a4f1a5facd21d51741",
                "rootTxHash": "27904ded808c8a183b06783a3a671d050e80e442085d22a4f1a5facd21d51741",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 1015285,
                "time": 1611071486,
                "scoresCount": 42,
                "scoresCountFromSharks": 5,
                "commentsCount": 4,
                "commentsFromSharks": 1,
                "reward": 0
            },
            {
                "id": 1167060,
                "hash": "37348021a565fa549dfae5e9fb855c40dadae4456bda1cb1bfd3d3398081db91",
                "rootTxHash": "37348021a565fa549dfae5e9fb855c40dadae4456bda1cb1bfd3d3398081db91",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 1154404,
                "time": 1619694005,
                "scoresCount": 35,
                "scoresCountFromSharks": 8,
                "commentsCount": 9,
                "commentsFromSharks": 1,
                "reward": 0
            },
            {
                "id": 1171680,
                "hash": "34c0d9d4d0c103c6797983656146375dd71f605dc4a4b6d65b6531e8a2f91a0a",
                "rootTxHash": "34c0d9d4d0c103c6797983656146375dd71f605dc4a4b6d65b6531e8a2f91a0a",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 1156033,
                "time": 1619792870,
                "scoresCount": 62,
                "scoresCountFromSharks": 16,
                "commentsCount": 31,
                "commentsFromSharks": 2,
                "reward": 0
            },
            {
                "id": 3107377,
                "hash": "2787e28e4d7ff20d6843723271decdf0dd2798278d6aceea46b1f68c075c55e8",
                "rootTxHash": "2787e28e4d7ff20d6843723271decdf0dd2798278d6aceea46b1f68c075c55e8",
                "addressHash": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "height": 1486503,
                "time": 1639743867,
                "scoresCount": 184,
                "scoresCountFromSharks": 21,
                "commentsCount": 5,
                "commentsFromSharks": 1,
                "reward": 0
            }
        ]

        return Promise.resolve(group(r, (f) => {
            return f.addressHash
        }))*/

        return request('monetization/contentperformance', {
            Addresses : addresses,
            StartDate : start,
            EndDate : end
        }).then(r => {


            return group(r, (f) => {
                return f.addressHash
            })
        })
    }

    self.getBoosts = function(address, year, group = 'groupByWeekYear'){
        return self.boostperformance({
            addresses : [address],
            ...helpers.getYearPeriod(year)
        }).then((result = {}) => {

            var r = result[address] || []

            _.each(r, (r) => {
                r.amountBoost = ((r.amountBoost - 1) / 100000000)
            })

            console.log('groupping.boosts[group](r, year)', groupping.boosts[group](r, year))

            return groupping.boosts[group](r, year)

        }).catch(e => {
            console.error(e)

            return Promise.reject(e)

        })
    }

    self.getEarnings = function(address, year, group = 'groupByWeekYear'){
        return self.contentperformance({
            addresses : [address],
            ...helpers.getYearPeriod(year)
        }).then((result = {}) => {

            var r = result[address] || []

            return groupping.earnings[group](r, year)

        }).catch(e => {
            console.error(e)

            return Promise.reject(e)

        })
    }

    if(!auth || !url) return null


    return self
}

if(typeof module != "undefined"){ module.exports = {Monetization}; } 
else { window.Monetization = Monetization}