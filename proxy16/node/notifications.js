var f = require('../functions');
const dictionary = require("./notificationsDictionary");


class NotificationBlock{
    constructor() {
        this.height = 0
        this.time = 0
        this.nodeVersion = 0
        this.nodeAddress = 0
        this.eventsCount = 0
        this.pushStatus = []
        this.pushEvents = []
        this.events = []
        this.data = []
    }
}

class NotificationStats{
    constructor() {
        this.blocks = []
    }

    addBlock(block){

        this.blocks.unshift(block)

        if (this.blocks.length > 10) this.blocks.pop()
    }
}


class NotificationStatsShort{
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
        this.statsShort = new NotificationStatsShort()
        firebase.useNotifications = true

        // this.test()

        //this.checkBlock(2126503)

        return this;
    }

    async worker(){
        
        this.workerEnable = true

        let item = this.queue.shift();
        while (item){
            const ts = Date.now();
            try {

                this.logger.w('system', 'info', `Notification: Generate Events: ${item.height}`)

                const {events, block} = await this.generateEvents(item)
      
                if (events.length){
                    this.logger.w('system', 'info', `Notification: Generated Events.length: ${item.height}-${events.length}`)

                    this.firebase.sendEvents(events, block);
                }

                for(const event of events){
                    if (this.statsShort.maxSendPush < event.addresses.length){
                        this.statsShort.maxSendPush = event.addresses.length
                    }
                    if (this.statsShort.minSendPush === 0 || this.statsShort.minSendPush > event.addresses.length){
                        this.statsShort.minSendPush = event.addresses.length
                    }
                    this.statsShort.totalSendPush += 1;
                }

                this.statsShort.success++;
            } catch (e) {
                if(!item.reRequest){
                    item.reRequest = true;
                    this.queue.push(item)
                }
                else{

                    this.statsShort.reject++;
                    this.logger.w('system', 'error', `Notification: Response from the node:${e?.message || e}`)
                }
            }
            const totalTime = Date.now() - ts;
            this.statsShort.longTime = this.statsShort.longTime < totalTime ? totalTime : this.statsShort.longTime
            this.statsShort.fastTime = this.statsShort.fastTime > totalTime ? totalTime : this.statsShort.fastTime > 0 ? this.statsShort.fastTime : totalTime
            item = this.queue.shift()
        }

        this.workerEnable = false
    }

    async generateEvents(data){
        const events = [];
        let node = data.node;
        if(!node){
            await this.nodeManager.waitready()
            node = this.nodeManager.selectbest();
        }


        const notifications = await node.rpcs("getnotifications", [data.height])
        const block = new NotificationBlock()


        block.height = data.height
        block.time = new Date(Date.now()).toISOString()
        block.eventsCount = notifications.data.length
        block.nodeVersion = node.version
        block.nodeAddress = node.host
        this.stats.addBlock(block)
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

                        let notification =  {...notifications.data[index]}
                        notification.info = notifier.i || notifier.info;
                        notification.type = type;
                        notification = this.transaction(notification, address)
                        notification = this.setDetails(notification)
                        var dic = dictionary({
                            user: notification?.account?.n || notification?.account?.name || "",
                            amount: notification.amount || 0,
                            score: notification.val || 0,
                        })

                        notification.header = dic?.[notification.type]?.[notification?.info?.l || notification?.info?.lang || 'en'] || dic?.[notification.type]?.['en']

                        if (notification.header){
                            const json = notification.description || notification.relatedContent?.description
                            if(json){
                                let description = {}
                                try {
                                    description = JSON.parse(json)
                                }catch (e) {
                                    try {
                                        description.caption = json
                                    }catch (e) {
                                        this.logger.w('system', 'error', `Notification: Error generate description ${e.message || e}`)
                                    }
                                }
                                if(description.caption){
                                    const caption = decodeURIComponent(description.caption)
                                    notification.header.body = `${caption.length > 100 ? caption.slice(0, 100)+'...' : caption}`
                                }else if(description.message){
                                    const message = decodeURIComponent(description.message)
                                    notification.header.body = `${message.length > 100 ? message.slice(0, 100)+'...' : message}`
                                }else if(description.images && description.images.length) {
                                    const imageText = dic?.['images']?.[notification?.info?.l || notification?.info?.lang || 'en']
                                    notification.header.body = `${imageText}(${description.images.length})`
                                }

                            }

                            notification.image = notification?.account?.a || notification?.account?.avatar
                            notification.url = this.generateUrl(notification)

                            if(!notification.ignore){

                                events.push({
                                    type : notification.type,
                                    index: index,
                                    notification: notification,
                                    addresses: [address]
                                })

                            }
                        }
                        else{
                            this.logger.w('system', 'error', `Notification: Error generate header ${type}`)
                        }
                    }
                }
            }
        }
        block.events = events;
        block.data = notifications
        return {events, block}
    }

    startWorker(){
        if(!this.workerEnable) this.worker()

        else{
            this.logger.w('system', 'warn', `Notification: WorkerEnabled Queue: ${this.queue.length}`)
        }
    }

    addblock(block, node, ignore){
        if(!node.version || f.numfromreleasestring(node.version) < 0.21) {
            // this.logger.w('system', 'warn', `Notification: Node version is lower: ${node?.version}`)
            return;
        }

        if (this.height >= block.height && !ignore) {
            this.logger.w('system', 'warn', `Notification: Block height is lower or equal: Current:${this.height} >= Incoming:${block.height}`)
            return;
        }

        this.logger.w('system', 'info', `Notification: Block height: Incoming:${block.height}`)

        const info = this?.firebase?.info();
        this.height = block.height

        if(!this.firebase.inited) {
            this.logger.w('system', 'error', `Notification: Firebase not inited`)
            return
        }
        if(!info.users){
            this.logger.w('system', 'info', `Notification: Firebase user list is empty`)
            return;
        }

        const notification = {
            height: block.height,
            node: node,
            reRequest: false
        }

        this.queue.push(notification)
        this.startWorker()
    }
    ///2126503
    async checkBlock(number){
        await this.nodeManager.waitready()
        var node = this.nodeManager.selectbest();
        var block = {
            height : number
        }

        this.addblock(block, node, true)
    }
    //// 2126503
    async test(height){
        //setInterval(async ()=>{
        try {
            await new Promise(resolve => setTimeout(resolve, 10000))
            const {events, block} = await this.generateEvents({height: height})
        }catch (e) {
            console.log(e)
        }
        //}, 5000)
    }

    transaction(notification, address){
        switch (notification.type) {
            case 'money':
                if (notification.outputs.length && !notification.outputs?.[0]?.addresshash)
                    notification.cointype = this.proxy.pocketnet.kit.getCoibaseType(notification.outputs[0])
                let amount = notification?.outputs?.find(el => el.addresshash === address)?.value;
                notification.amount = amount ? amount / 100000000 : 0

                if(notification?.inputs?.find(el=>el.addresshash === address)){
                    notification.ignore = true  
                }

                break
            case 'boost':
                notification.amount = (notification?.inputs?.reduce((a, item)=> a+item.value, 0) - notification?.outputs?.reduce((a, item)=> a+item.value, 0)) / 100000000
                break
            case 'comment':
                notification.amount =
                    (notification?.outputs?.filter?.(el=>el.addresshash === address)?.reduce((a, item)=> a+item.value, 0) -
                    notification?.inputs?.filter?.(el=>el.addresshash === address)?.reduce((a, item)=> a+item.value, 0)) / 100000000
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
                case 'repost':
                    if(notification.rootTxHash){
                        return `/index?s=${notification?.rootTxHash || ""}`
                    }
                    return ""
                case 'boost':
                    if(content?.rootTxHash){
                        return `/index?s=${content?.rootTxHash || ""}`
                    }
                    return ""
                default:
                    return ""
        }
    }

    destroy(){
        this.queue = [];
    }

    info(){
        const sendSum = this.statsShort.success + this.statsShort.reject;
        this.statsShort.averageSend = sendSum ? sendSum /2 : 0;

        const timeSum = this.statsShort.longTime + this.statsShort.fastTime;
        this.statsShort.averageTime = timeSum ? timeSum / 2 : 0;

        this.statsShort.memoryUsage = this.getMemoryUsage()

        return this.statsShort
    }

    statsInfo(){
        return this.stats
    }

    userInfo(){
        return this?.firebase?.users?.map(el=>({token: el.token, address: el.address, device: el.device})) || [];
    }
}

module.exports = Notifications