var kit = require('./kit.js');
var f = require('./functions');
var readline = require('readline'); 



var destroy = function(repeat){

    return kit.destroy().catch(e => {

        if(!repeat){

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




var cli = {
    command : function(input){

        if(!input){

            input = 'help.commands'

        }

        var inputs = input.split(' ')

        var action = inputs[0]

        var data = undefined;
        
        try{
            data = JSON.parse(inputs[1] || "")
        }
        catch(e){

        }

        var kaction = f.deep(kit, 'manage.' + action)

		if(!kaction) return Promise.reject('unknownAction')

        return kaction(data)
        
    },
    waitcommand : function(){
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>'
        });
        
        rl.prompt();
        
        rl.on('line', (input) => {

          input = input.toLowerCase();

          rl.close();


          cli.command(input).then(r => {

            console.log(r || "Done")
            cli.waitcommand()

          }).catch(e => {

            console.error(e || "Error")
            cli.waitcommand()

          })

        });
    }
}



kit.init({
    node : {
        dataPath : f.path('pocketcoin')
    }
}).catch(r => {
    console.log(r)
    return Promise.resolve()
}).then(r => {

    process.on('SIGTERM', () => {
        destroy()
    });
    
    process.on('SIGINT', () => {
        destroy()
    });

    cli.waitcommand()
})