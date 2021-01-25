var kit = require('./kit.js');
var f = require('./functions');

kit.init({
    node : {
        dataPath : f.path('pocketcoin')
    }
})

var destroy = function(repeat){

    return kit.destroy().catch(e => {

        if(!repeat){

            console.log("AUTODETACH CLI")

            return kit.manage.proxy.detach().then(r => {
                return destroy(true)
            })
        }

        return Promise.resolve()

    }).then(r => {
        console.log("EXIT")
        process.exit(0)
    })

}

process.on('SIGTERM', () => {
	destroy()
});

process.on('SIGINT', () => {
	destroy()
});