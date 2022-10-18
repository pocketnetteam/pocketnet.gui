var f = require('../functions');
const dictionary = require("./notificationsDictionary");


class NotificationStats{
    constructor() {
        this.success = 0
        this.reject = 0
        this.averageSend = 0
        this.longTime = 0
        this.fastTime = 0
        this.averageTime = 0
        this.memoryUsage = 0
        this.maxSendPush = 0
        this.minSendPush = 0
        this.totalSendPush = 0
    }
}

class Notifications{
    constructor() {}
    
    async init(proxy, firebase, nodeManager){
        this.proxy = proxy;
        this.firebase = firebase;
        this.nodeManager = nodeManager;
        this.lastBlock = "";
        this.workerEnable = false;
        this.queue = []
        this.height = 0
        this.stats = new NotificationStats()
        firebase.useNotifications = true
        return this;
    }

    async worker(){

        this.workerEnable = true

        let item = this.queue.shift();
        while (item){
            const ts = Date.now();
            try {
                const node = item.node
                const events = [];
                const notifications = await node.rpcs("getnotifications", [item.height])
                for (const address of Object.keys(notifications?.notifiers)) {
                    const notifier = notifications?.notifiers?.[address]
                    for (const type of Object.keys(notifier?.e || [])) {
                        for (const index of notifier?.e[type] || []) {
                            const eventIndex = events.findIndex(el => el.index === index && el.type === type);
                            if (eventIndex >=0) {
                                if (!events[eventIndex]?.addresses.some(el=>el===address)) {
                                    events[eventIndex].addresses.push(address)
                                }
                            } else {
                                let notification = notifications.data[index];
                                notification.info = notifier.i || notifier.info;
                                notification.type = type;
                                notification = this.transaction(notification, address)
                                notification = this.setDetails(notification)
                                notification.header = dictionary({
                                    user: notification?.account?.n || notification?.account?.name || "",
                                    amount: notification.amount || 0,
                                    score: notification.val || 0,
                                })?.[notification.type]?.[notification?.info?.l || notification?.info?.lang || 'ru'] || dictionary().default[notification?.info?.l || notification?.info?.lang || 'ru']
                                notification.image = notification?.account?.a || notification?.account?.avatar
                                notification.url = this.generateUrl(notification)
                                events.push({
                                    type: type,
                                    index: index,
                                    notification: notification,
                                    addresses: [address]
                                })
                            }
                        }
                    }
                }
                if(events.length){
                    await this.firebase.sendEvents(events);
                    // for(const event of events) {
                    //     await this.firebase.sendToAll(event.notification)
                    // }
                }

                for(const event of events){
                    if(this.stats.maxSendPush < event.addresses.length){
                        this.stats.maxSendPush = event.addresses.length
                    }
                    if(this.stats.minSendPush === 0 || this.stats.minSendPush > event.addresses.length){
                        this.stats.minSendPush = event.addresses.length
                    }
                    this.stats.totalSendPush += 1;
                }

                this.stats.success++;
            } catch (e) {

                console.log("E", e)

                if(!item.reRequest){
                    item.reRequest = true;
                    this.queue.push(item)
                }
                else{
                    this.stats.reject++;
                    console.log("Error: block", e)
                }
            }
            const totalTime = Date.now() - ts;
            this.stats.longTime = this.stats.longTime < totalTime ? totalTime : this.stats.longTime
            this.stats.fastTime = this.stats.fastTime > totalTime ? totalTime : this.stats.fastTime > 0 ? this.stats.fastTime : totalTime
            item = this.queue.shift()
        }

        this.workerEnable = false
    }

    startWorker(){
        if(!this.workerEnable)
            this.worker()
    }

    info(){
        const sendSum = this.stats.success + this.stats.reject;
        this.stats.averageSend = sendSum ? sendSum /2 : 0;

        const timeSum = this.stats.longTime + this.stats.fastTime;
        this.stats.averageTime = timeSum ? timeSum / 2 : 0;

        this.stats.memoryUsage = this.getMemoryUsage()

        return this.stats
    }

    addblock(block, node){
        if(node.version && f.numfromreleasestring(node.version) > 0.2000025 && this.height < block.height){
            const info = this?.firebase?.info();
            console.log(info)
            if(!this.firebase.inited) {
                console.log("WARNING FIREBASE")
                return
            }
            if(!info.users){
                console.log("FIREBASE USERS IS EMPTY")
                return;
            }
            const notification = {
                height: block.height,
                node: node,
                reRequest: false
            }
            console.log("Block height:", block.height)
            this.height = block.height
            this.queue.push(notification)
            this.startWorker()
        }
    }

    async test(){
        try {
            await new Promise(resolve => setTimeout(resolve, 10000))
            await this.nodeManager.waitready()
            const node = this.nodeManager.selectbest();
            const notifications = await node.rpcs("getnotifications", [1231059])
            const events = [];
            for (const address of Object.keys(notifications?.notifiers)) {
                const notifier = notifications?.notifiers?.[address]
                for (const type of Object.keys(notifier?.e || [])) {
                    for (const index of notifier?.e[type] || []) {
                        const eventIndex = events.findIndex(el => el.index === index && el.type === type);
                        if (eventIndex >=0) {
                            if (!events[eventIndex]?.addresses.some(el=>el===address)) {
                                events[eventIndex].addresses.push(address)
                            }
                        } else {
                            let notification = notifications.data[index];
                            notification.info = notifier.i || notifier.info;
                            notification.type = type;
                            if (notification.type === 'privatecontent') {
                                continue
                            }
                            notification = this.transaction(notification, address)
                            notification = this.setDetails(notification)
                            notification.header = dictionary({
                                user: notification?.account?.n || notification?.account?.name || "",
                                amount: notification.amount || 0,
                                score: notification.val || 0,
                            })?.[notification.type]?.[notification?.info?.l || notification?.info?.lang || 'ru'] || dictionary().default[notification?.info?.l || notification?.info?.lang || 'ru']
                            notification.image = notification?.account?.a || notification?.account?.avatar
                            notification.url = this.generateUrl(notification)
                            events.push({
                                type: type,
                                index: index,
                                notification: notification,
                                addresses: [address]
                            })
                        }
                    }
                }
            }
            if(events.length){
                await this.firebase.sendEvents(events);
                // for(const event of events) {
                //     console.log(event.notification.url)
                //     await this.firebase.sendToAll(event.notification)
                // }
            }
        }catch (e) {
            console.log('E', e)
        }
    }

    transaction(notification, address){
        switch (notification.type) {
            case 'money':
                if (notification.outputs.length && !notification.outputs?.[0]?.addresshash)
                    notification.cointype = this.proxy.pocketnet.kit.getCoibaseType(notification.outputs[0])
                const amount = notification?.outputs?.find(el => el.addresshash === address)?.value;
                notification.amount = amount ? amount / 100000000 : 0
                break
            case 'boost':
                notification.amount = notification?.inputs?.reduce((a, item)=> a+item.value, 0) - notification?.outputs?.reduce((a, item)=> a+item.value, 0)
                break
            case 'comment':
                notification.amount =
                    notification?.outputs?.filter?.(el=>el.addresshash === address)?.reduce((a, item)=> a+item.value, 0) -
                    notification?.inputs?.filter?.(el=>el.addresshash === address)?.reduce((a, item)=> a+item.value, 0)
                break
            default:
                notification.amount = 0
                break
        }

        return notification
    }

    setDetails(notification){
        switch (notification.type){
            case 'money':
                if(notification.cointype){
                    notification.type = notification.cointype;
                }
                break;
            case 'comment':
                if(notification.amount){
                    notification.type = 'commentDonate'
                }
                break;
            case 'answer':
                if(notification.amount){
                    notification.type = 'answerDonate'
                }
                break;
        }
        return notification
    }

    getMemoryUsage(){
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        return `${Math.round(used * 100) / 100} MB`
    }

    generateUrl(notification){
        const content = notification?.relatedContent;
            switch (notification.type) {
                case 'money':
                    return "/userpage?id=wallet"
                case 'winPost':
                    return "/userpage?id=wallet"
                case 'winComment':
                    return "/userpage?id=wallet"
                case 'winCommentref':
                    return "/userpage?id=wallet"
                case 'winPostref':
                    return "/userpage?id=wallet"
                case 'comment':
                    if(content.rootTxHash && notification?.rootTxHash) {
                        return `/index?s=${content.rootTxHash || ""}&commentid=${notification?.rootTxHash || ""}`
                    }
                    return ""
                case 'privatecontent':
                    if(notification?.rootTxHash) {
                        return `/index?s=${notification?.rootTxHash || ""}`
                    }
                    return ""
                case 'commentDonate':
                    if(content.rootTxHash && notification?.rootTxHash ) {
                        return `/index?s=${content.rootTxHash || ""}&commentid=${notification?.rootTxHash || ""}`
                    }
                    return ""
                case 'answer':
                    if(notification?.postHash && notification.rootTxHash && notification.commentParentId) {
                        return `/index?s=${notification?.postHash || ""}&commentid=${notification.rootTxHash || ""}&parentid=${notification.commentParentId || ""}`
                    }
                    return ""
                case 'answerDonate':
                    if(notification?.postHash && notification.rootTxHash && notification.commentParentId) {
                        return `/index?s=${notification?.postHash || ""}&commentid=${notification.rootTxHash || ""}&parentid=${notification.commentParentId || ""}`
                    }
                    return ""
                case 'subscriber':
                    return ""
                case 'contentscore':
                    if(content?.rootTxHash) {
                        return `/index?s=${content?.rootTxHash || ""}`
                    }
                    return ""
                case 'commentscore':
                    if(content.postHash && content.rootTxHash) {
                        return `/index?s=${content.postHash || ""}&commentid=${content.rootTxHash || ""}`
                    }
                    return ""
                default:
                    return ""
        }
    }
    destroy(){
        this.queue = [];
    }

    dictionary(type, lang){

    }
}

module.exports = Notifications