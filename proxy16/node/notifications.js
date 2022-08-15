class Notifications{
    constructor() {}
    
    async init(proxy, firebase, nodeManager){
        this.proxy = proxy;
        this.firebase = firebase;
        this.nodeManager = nodeManager;
        // this.test()
        return this;
    }

    async sendBlock(block){
        try {
            const node = this.nodeManager.selectProbabilityByVersion();
            // const notifications = await this.proxy.nodeControl.request.getNotifications([block.height])
            if(node) {
                const notifications = await node.rpcs("getnotifications", [block.height])
                for (const type of Object.keys(notifications)) {
                    if (type === 'pocketnetteam') {
                        for (const notification of notifications?.[type] || []) {
                            await this.firebase.sendToAll(notification)
                        }
                    } else {
                        for (const address of Object.keys(notifications?.[type] || [])) {
                            for (const notification of notifications?.[type]?.[address] || []) {
                                await this.firebase.sendToDevices(notification, null, address)
                            }
                        }
                    }
                }
            }
        }catch (e){
            console.log("ERRR ", e)
        }

    }
    
    destroy(){
        
    }

    async test(){
        // 677211 - pocketnetteam
        // 357441 - money (a lot)
        // 416415 - answer
        // 797528 - private content
        // 834482 - boosts

        const test = [677211, 357441, 357441, 416415, 797528, 834482]
        setInterval(async ()=>{
            try {
                var item = test[Math.floor(Math.random()*test.length)];
                const notifications = await this.proxy.nodeControl.request.getNotifications([677211])
                for (const type of Object.keys(notifications)) {
                    if(type === 'pocketnetteam' && notifications[type]?.length > 0){
                        for (const notification of notifications?.[type] || []) {
                            await this.firebase.sendToAll(notification)
                        }
                    }else {
                        for (const address of Object.keys(notifications?.[type] || [])) {
                            for (const notification of notifications?.[type]?.[address] || []) {
                                await this.firebase.sendToDevices(notification, null, address)
                            }
                        }
                    }
                }
            }catch (e){
                console.log("ERRR ", e)
            }
        },10000)
    }
}

module.exports = Notifications