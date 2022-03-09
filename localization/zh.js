if(typeof loclib == 'undefined' || !loclib)
loclib = {};

loclib.cmn = {};

var ____loclib = loclib.cmn;
var appname = window.pocketnetproject || "Pocketnet"
//time

____loclib.fewseconds = "几秒前";	
____loclib.oneminute = "1分钟前";	

____loclib.minutes = function(v){
return v + " 分鐘前"
}

____loclib.tenminutes = "10分钟前";	
____loclib.halfanhour = "半小时前";	
____loclib.anhour = "1小时前";	
____loclib.today = "今天";	

//authorization

____loclib.id0 = "登录现有账号";	
____loclib.id1 = "如果你已注册，请登录";	
____loclib.loadqrcode = "上传二维码";
____loclib.stay = "保持登录";
____loclib.signin = "注册";
____loclib.orcreate = "或创建一个新账号";
____loclib.createnew = "创建一个新账号";
____loclib.staysafe = "此操作不安全，是否继续?";
____loclib.or = "或";

// Register a New Account
____loclib.id71 = "创建一个新账号";
____loclib.id72 = "已经是会员？请登录";

____loclib.rtip1 = "请记住你的私人登录密钥!";
____loclib.rtip2 = function(mobile){
var h = '以下为你的私钥密码，请将它记下并确保保存你的二维码' 

if(mobile){ h += '設備' } else { h+='電腦' }

h+='务必保管好，勿丢失。我们将不会储存你的私人数据，私钥一旦丢失就无法找回！'

return h 
}

____loclib.generatepkey = "生成私钥";
____loclib.rtip3 = "请将此登录密钥记下并将其保存为二维码。我们将不会储存你的私人数据，密钥一旦丢失就无法找回！";
____loclib.saveqrcode = "保存二维码" 
____loclib.copyprivkey = "复制私钥"
____loclib.rcontinue = "继续"
____loclib.idle = "閒置一段時間 "
____loclib.congratulations = '恭喜！你在 <span class="pnlabel">口袋网</span>'
____loclib.creatingpreloader = '正在创建账号'
____loclib.removepaste = '我们删除了该输入的粘贴选项。'
____loclib.filedamaged = "文件中包含有效的私钥"
____loclib.keysnotmatch = '私人登录密钥不匹配'
____loclib.confirmkey = '输入您的私人登录密钥或上传上一步中的二维码'
____loclib.successfullycopied = "秘钥已成功复制"
____loclib.urlsuccesscopied = "链接已成功复制"
____loclib.successcopied = "文本已成功复制"

____loclib.confirmkeyLabel = "请确认你的密钥。 在表單中鍵入 <b>上傳二維碼 </b>"
____loclib.repeatetocreate = "重复一遍，再次创建私钥"
____loclib.confirmcreate = "创建账号"


//user activation

____loclib.useractivation = "用户激活";	
____loclib.wesentmoney = "我们向你发送了一些用于注册的货币";	
____loclib.wesentmoneym = "我们已经向你发送了一些用于注册的货币";


____loclib.wesentmoneydelay = "此过程比平时耗时更长，请耐心等候";

____loclib.funetworkproblems = "连接出现问题，请稍后再试";

____loclib.pleasewait = "请稍等";	
____loclib.next = "下一步";	
____loclib.welcometo口袋网 = "欢迎进入口袋网";	
____loclib.continue = "继续";	

//user page

____loclib.rstate = "信誉";	
____loclib.rprofile = "个人资料";	
____loclib.rsettings = "设置";	
____loclib.rwallet = '钱包';	
____loclib.raccounts = '账号';	
____loclib.rsystem = '系统';
____loclib.rconnection = '连接';
____loclib.pnetAddress = '口袋网地址';	
____loclib.profile = '个人资料';	
____loclib.signout = '退出';

//send

____loclib.postlabel = "為帖子捐款";	
____loclib.donationlabel = "捐款";	
____loclib.donationwel = "如果你想感谢作者，可使用口袋网交易";
____loclib.donationwela = "口袋网交易";	
____loclib.donationwelan = "或者你可使用其他加密支付系统";	
____loclib.successfullycopiedaddress = "地址已被成功复制";	

//wallet

____loclib.wrecieve = "分享地址以接收货币";	
____loclib.wcopyshare = "复制并分享地址：";	
____loclib.wqrcode = "二维码";		
____loclib.wcopeaddress = "复制地址";	
____loclib.wcreatelink = "或者为你的付款创建链接";	
____loclib.required = "Required";	
____loclib.wgetlink = "获取链接";	
____loclib.waddresses = "地址";	
____loclib.waddress = "地址";	
____loclib.wbalance = "余额";	
____loclib.wpercente = "百分比";	
____loclib.waddaddress = "探索新的钱包地址";	
____loclib.wrecieve = "接收";	
____loclib.wrecieveon = "接收";	
____loclib.wcopyshareorcreate = "复制并分享地址或创建付款链接";
____loclib.wdgetlink = "获取链接";	
____loclib.wdqrcode = "二维码";
____loclib.wdcopyaddress = "复制地址";	
____loclib.wdpleasefill = "请填写以下内容";
____loclib.wduseqr = "请使用该二维码收款";	
____loclib.wdaddress = "地址";
____loclib.wdamount = "金额";	
____loclib.wdlabel = "标签";	
____loclib.wdmessage = "信息";	
____loclib.wsend = "发送";
____loclib.calcfeesandsend = "合计费用并发送";	
____loclib.wstrfees = "交易费";	
____loclib.wsfees = "费用";	

____loclib.wssendto = "发送货币至";	
____loclib.wssendb = "发送";	

____loclib.tacaddress = '账号地址';	
____loclib.twallet = "钱包";	
____loclib.twalletaddresses = "钱包地址";	
____loclib.tTotal = "总额";	
____loclib.wsselect = "从菜单中选择来源";	
____loclib.wsenter = "输入地址或从菜单中选择";	
____loclib.wsreciever = "收款人地址";	
____loclib.wsamount = "金额";	
____loclib.wsamountof = "你的交易金额";	
____loclib.wsincludefees = "费用计入金额中";	
____loclib.wsrecieverpay = '由收款方支付';	
____loclib.wssenderpay = '由付款方支付';	
____loclib.wdselectfrom = "从菜单中选择";	

____loclib.wdenteramount = "输入金额";	
____loclib.wdmessageplaceholder = "这笔交易的目的是？";
____loclib.wrenteraddress = '输入地址';
____loclib.wrenteraddressselect = "输入地址或从菜单中选择";
____loclib.wreturntoeallet = "返回钱包";	
____loclib.linkCreated = '链接已创建';
____loclib.waddresswascop = "地址已成功复制";
____loclib.wqrcodecreated = '二维码已创建';
____loclib.wlinkcreating = '正在创建链接';
____loclib.wqrcodecreating = '正在生成二维码';
____loclib.wdoptions = '选项';
____loclib.wssuccessfully = "交易已成功发送";
____loclib.wscalculatefees = '合计费用';
____loclib.wsaddressnotv = "地址无效";

//user profile
____loclib.uaddaddressdona = "添加捐款地址";
____loclib.uaddaddressdonaplace = "输入地址";
____loclib.uchangeicon = "上传头像";
____loclib.utip1 = "使用口袋网之前你必须在区块链上创建名字和头像";
____loclib.utip2 = "只剩最后一步";
____loclib.upicset = "设定角色信息";
____loclib.upic = "角色信息";
____loclib.uuserinfo = "用户信息";
____loclib.usave = "保存";
____loclib.ucancel = "取消";
____loclib.uwaitb = "等待确认以保存信息 ";
____loclib.uchanges = "没有修改";
____loclib.uchangesvalid = "你需要上传头像并创建用户名";
____loclib.uname = "姓名";
____loclib.unickname = "昵称";
____loclib.ulanguage = "语言";
____loclib.uabout = "个人简介";
____loclib.uwebsite = "网站";
____loclib.uaddresesd = "捐款地址";
____loclib.usavechanges = "是否保存你的修改？";

//ustate
____loclib.sreps = "信誉与限制";
____loclib.sdisconnected = "与节点连接断开";
____loclib.suseractivation = "用户激活";
____loclib.sprofile = "个人资料";
____loclib.spc = "发帖量";
____loclib.ssc = "星级数";
____loclib.ccc = "评论数";
____loclib.crc = "评论等级";
____loclib.stp = "试用期";
____loclib.srep = "信誉";

//accounts
____loclib.aaddedacc = "新增账号";
____loclib.acure = "当前";
____loclib.aaddacc = "添加账号";
____loclib.ascheduler = "調度器";
____loclib.aused = "该地址已经在另外的地址库中被使用了";


//author
____loclib.sub = "关注";
____loclib.unsub = "取消关注";
____loclib.joined = "已加入口袋网";
____loclib.shares = "分享";
____loclib.uposts = "帖子";
____loclib.myuposts = "我的帖子";
____loclib.followers = "粉丝";
____loclib.following = "我的关注";
____loclib.settings = "管理";
____loclib.anofollowers = "该用户没有粉丝";
____loclib.aynofollowers = "你还没有粉丝";
____loclib.anofollowing = "该用户尚未关注任何人";
____loclib.aynofollowing = "你尚未关注任何人";

//lenta
____loclib.lloadmore = "加载更多精彩的帖子！";
____loclib.lloadprev = "加载新的精彩的帖子";


____loclib.lend = "帖子已到底";
____loclib.zerop = "该作者目前尚未发布任何帖子";


____loclib.zeroy = "你尚未发布任何东西，分享点什么吧！";



____loclib.llogin = '操作前必须登录';
____loclib.lcomlaindialog = "确定要举报这个帖子？";
____loclib.lunsubscribe = "确定要取关这个账号？";
____loclib.lprivatepublic = "你想进行私人订阅还是公开订阅？";
____loclib.lprivate = "私人订阅";
____loclib.lpublic = "公开订阅";

//share
____loclib.newShare = "新帖子";
____loclib.firstShare = "在口袋网分享你的第一帖";
____loclib.scaption = "标题";
____loclib.whatsnew = "有什么新鲜事吗？";
____loclib.saddlink = "添加外部网站或视频的链接";
____loclib.saddimages = "添加图片";
____loclib.sarticle = "写文章";
____loclib.stelegram = "发送至电报"
____loclib.stimes = "清除帖子"


____loclib.snothing = "空空如也";
____loclib.sposttime = "定时发布";
____loclib.spostnow = "现在发布";
____loclib.stimenotselected = "未选定时间";
____loclib.spost = "郵政";
____loclib.sdate = "日期";
____loclib.stime = "时间";
____loclib.snotags = "添加标签";
____loclib.expandvideo = "点选展开";
____loclib.emptymessage = "信息为空";
____loclib.emptytags = "请添加标签";
____loclib.emptyutxo = "无资金";
____loclib.networkerror = "网络故障";
____loclib.maximages = "最多可添加6张图片";
____loclib.sharenow = "现在分享这个内容吗？";
____loclib.pastdate = '过往日期';
____loclib.timenotselected = '未选定时间';
____loclib.addtags = '添加标签';
____loclib.tnews = "消息";
____loclib.timages = "图片";
____loclib.tvideos = "视频";
____loclib.tmarket = "行情";
____loclib.tsport = "体育";

//menu
____loclib.signinmenu = "登录";
____loclib.signupmenu = "注册";
____loclib.aboutmenu = "了解更多";

//footer
____loclib.aboutus = "关于我们";



// Dialog Box Options
____loclib.daccept = "接受";
____loclib.dcancel = "取消";
____loclib.dyes = "是";
____loclib.dno = "否";
____loclib.dsa = "不再显示";


// Messages

____loclib.coinbaseSuccess = function(v){
return "恭喜，你因为最新的活动获得了" + v + " PKOIN！"
}
____loclib.coinbaseSuccesspost = function(v){
return "恭喜，你因为最新发布的帖子获得了" + v + " PKOIN！"
}
____loclib.coinbaseSuccesscomment = function(v){
return "恭喜，你因为最新发布的评论获得了" + v + " PKOIN！"
}
____loclib.userSent = function(v){
return "發送 <b>" + v + " PKOIN</b> 給你"
}

____loclib.coinbaseSuccesspostref = function(v){
    return "恭喜，您的推薦剛剛贏了  " + v + " PKOIN 為你!"
    }
____loclib.coinbaseSuccesscommentref = function(v){
    return "恭喜，您的推薦剛剛贏了  " + v + " PKOIN 為你!"
}

____loclib.refferalUserMessage = "恭喜！您從受審查的網絡中救出了某人。 一些硬幣正在路上！ "

____loclib.subscribeUserMessage = "关注了你"
____loclib.unsubscribeUserMessage = "取关了你"
____loclib.gotoprofileMessage = "查看个人资料"
____loclib.upvoteShareMessage = "赞了你的帖子"

____loclib.upvoteCommentMessage = "点赞了你的评论"

// Errors

____loclib.error = "错误";
____loclib.checkScoreError = "使用口袋网之前需将要求的个人资料填写完整。你现在是否要填写？";
____loclib.checkScoreErrorLight = "账号未激活";
____loclib.timestamperror = "App中的时间与节点的时间不匹配";

// Error Page 404
____loclib.e404 = "404错误";	
____loclib.e404e = "页面未找到，返回页面";	
____loclib.postLimitLight = function(v){
return "你已达到在24小时内发布" + (v || 15) + " 帖子的限制";
}
____loclib.postLimitLight = function(v){
return "你已达到在24小时内给出" + (v || 15) + "评分的限制";
}

____loclib.doubleLimitLight = "你已给过评分了";	

____loclib.SelfSubscribeError = "不能订阅自己的账号";
____loclib.DoubleSubscribeError = "你已关注了该用户";
____loclib.InvalideSubscribeError = "你还未订阅该账号";
____loclib.ChangeInfoLimitError = "个人资料一个小时内只能编辑一次，请稍后再试。";
____loclib.SelfScoreError = "不能为自己的帖子评分";

____loclib.unexperror10 = "未知错误(10)";
____loclib.unexperror11 = "未知错误(11)";
____loclib.unexperror12 = "未知错误(12)";

____loclib.networkerror = "节点出现问题";

____loclib.canSpendError = "之前的交易在区块链中进行清算，请耐心等待";
____loclib.noMoneyError  = "你无法在余额为0的情况下进行操作";



____loclib.waitConf = "请等待之前的交易在区块链中进行清算";
____loclib.postWaitConf = "帖子正在等待区块链确认";



// notifications

____loclib.ntnow = "现在"
____loclib.ntlasthour = "此时"
____loclib.nttoday = "今天"
____loclib.ntmounth = "本月"
____loclib.ntearlier = "之前"


____loclib.nodeWalletAdd = '添加一个地址可能需要一些时间。是否继续？'
____loclib.nodeEnableNoteHeader = '注意'
____loclib.nodeEnableNote = '启动一个节点可能需要5GB的内存，请确保你有足够内存。'


/// 1301

____loclib.address = "地址"
____loclib.privatekey = "私钥"
____loclib.qrcode = "二维码"
____loclib.addaccount = "添加账号"
____loclib.entermnimo = "输入助记符或私钥"
____loclib.add = "添加"
____loclib.e13011 = "现在你将在安装口袋网桌面版之后继续注册。"
____loclib.e13012 = "如果Windows版口袋网还没有开始下载，请点击此处安装。"
____loclib.e13013 = "输入图片标题(可选)"
____loclib.e13014 = "不支持该文件的格式："
____loclib.e13015 = "该文件过大："
____loclib.e13016 = "复制粘贴一个YouTube或Vimeo链接，按回车键"
____loclib.e13017 = "正在加载到区块链"
____loclib.e13018 = "你确定要删除这篇文章？"
____loclib.e13019 = "新建"
____loclib.e13020 = "写新文章"
____loclib.youarefollowing = "正在关注"
____loclib.follow = "关注"
____loclib.blocked = "已屏蔽"
____loclib.e13021 = "显示更多"
____loclib.blockuser = "屏蔽用户"
____loclib.unblockuser = "取消屏蔽用户"
____loclib.e13022 = "你确定取消关注用户？"
____loclib.unfollow = "取消关注"
____loclib.unblock = "取消屏蔽"
____loclib.share = "分享"
____loclib.info = "信息"
____loclib.e13023 = "你确定要取消屏蔽用户？"
____loclib.e13024 = "你的私人登录密钥"
____loclib.e13025 = "创建一个新账号"
____loclib.e13026 = "加入口袋网"

____loclib.e13027 = "保持簽名"
____loclib.e13028 = "你输入的私钥无效"
____loclib.e13029 = "信息为空"
____loclib.e13030 = "评论最多为1000字"
____loclib.e13031 = "分享评论"
____loclib.e13032 = "确定删除评论？"
____loclib.e13033 = "评论已删除"
____loclib.e13034 = "是的"
____loclib.e13035 = "不，取消"
____loclib.hide = "隐藏"
____loclib.e13036 = "显示之前的评论"
____loclib.e13037 = "回复"
____loclib.remove = "删除"
____loclib.e13038 = "立即评论"
____loclib.e13039 = "立即评论"
____loclib.e13040 = "你没有评论权限"
____loclib.complain = "投诉"
____loclib.next = "下一步"
____loclib.post = "发布"
____loclib.e13041 = "口袋网连接"
____loclib.e13042 = "口袋网网络代理"

____loclib.e13043 = "口袋网节点"
____loclib.e13044 = "添加节点"
____loclib.e13045 = "为找到节点"
____loclib.e13046 = "地址"
____loclib.e13047 = "WS"
____loclib.e13048 = "姓名"
____loclib.e13049 = "状态"
____loclib.e13050 = "未找到代理"
____loclib.e13051 = "不要使用代理"
____loclib.e13052 = "无法连接代理"
____loclib.e13053 = "无法连接节点"
____loclib.e13054 = "增加代理"
____loclib.e13055 = "编辑代理"
____loclib.save = "保存"
____loclib.e13056 = "节点主机"
____loclib.close = "关闭"
____loclib.e13057 = "请填写所有字段"
____loclib.e13058 = "你的列表中已有这个代理。"
____loclib.delete = "删除"
____loclib.e13059 = "确定要从列表中删除代理？"
____loclib.e13060 = "代理列表"
____loclib.e13061 = "确定要暂停使用代理吗？(Http连接)不安全"

____loclib.e13062 = "编辑节点"
____loclib.onproxy = "在代理上"
____loclib.locally = "本地"
____loclib.nodehost = "节点主机"
____loclib.e13063 = "RPC端口"
____loclib.e13064 = "WS端口"
____loclib.e13065 = "节点名称"
____loclib.e13066 = "请输入节点名称"
____loclib.e13067 = "RPC登录"
____loclib.e13068 = "登录获取RPC授权"
____loclib.e13069 = "RPC密码"
____loclib.e13070 = "输入密码获取RPC授权"
____loclib.e13071 = "请填写所有字段"
____loclib.e13072 = "确定要从列表中删除该节点？"
____loclib.e13073 = "确定要暂停使用代理吗？(Http连接)不安全"
____loclib.notselected = "未被选中"
____loclib.donation = "捐款"
____loclib.e13074 = "等待资金。地址的有效期为"
____loclib.sminutes = "分钟"
____loclib.e13075 = "该笔交易的时间已经过期。"
____loclib.reactivate = "重新激活"
____loclib.e13076 = "扫码发送"
____loclib.back = "返回"
____loclib.e13077 = "将你的个人资料加入到捐款人名单"
____loclib.e13078 = "为何我们需要你的捐款？"
____loclib.e13079 = "我们各自从全职工作中抽出时间来，花了14个月的时间使口袋网落地。除了时间和精力，我们也投入了资金使这个平台成功上线。现在我们需要社区的帮助，来助推平台的成长。"
____loclib.e13080 = "资金将会如何被使用？"
____loclib.e13081 = "资金将用于购买广告和聘请一些特定的主题专家，使口袋网更加安全。现有的开发团队不会从中获取任何利益。我们会尽可能地将款项用途公布于此。"
____loclib.e13082 = "除了了解到你的捐赠支持了自由，你还能从捐款中获得："
____loclib.e13083 = "为了对你的善举表示感谢，我们将送你一定数量的口袋币作为礼物"
____loclib.e13084 = "同时，当我们建群聊天时，你将作为捐款人特别小组中的一员，可直接接触到口袋网团队成员，在平台壮大过程中也会如此"
____loclib.e13085 = "你的口袋网个人链接将会在下方展示，可为你的内容带来更多流量 (除非你不让我们这么做)"
____loclib.e13086 = "现在就请支持去中心化网络吧"
____loclib.e13087 = "比特币，莱特币"

____loclib.e13088 = "捐款支持口袋网的成员"
____loclib.thankyou = "非常感谢！"
____loclib.e13089 = "如果希望我们把你的口袋网个人资料列在捐款人名单中，请将你的捐款信息发送给我们"
____loclib.e13090 = "把我添加到捐款人名单"
____loclib.e13091 = "或者你可以发送邮件到"
____loclib.e13092 = "包含你的公钥和金额信息。"
____loclib.finish = "完成"
____loclib.e13093 = "请选择捐款方式"
____loclib.e13094 = "出错了，请重新加载页面，再试一次(错误: 0001)"
____loclib.e13095 = '感谢你和我们一起支持自由。我们会确保让每一分钱都花得有价值。'
____loclib.e13096 = '请填入捐款金额'
____loclib.e13097 = "出错了，请重新加载页面，再试一次(错误: 0002)"
____loclib.e13098 = "添加外部网站或资源的链接"
____loclib.e13099 = "上传图片"
____loclib.e13100 = "点击此处，选择要上传的文件"
____loclib.e13101 = "或拖拽添加"
____loclib.e13102 = "添加外部网站的链接"
____loclib.e13103 = "网址无效"
____loclib.e13104 = "最多上传6张图片"
____loclib.e13105 = "节点管理"
____loclib.e13106 = "口袋网节点"
____loclib.e13107 = "节点管理可通过应用程序进行"
____loclib.e13108 = "没有与Electron代理接口的连接"

____loclib.e13109 = "请输入图片中的字以接收口袋币并继续注册"
____loclib.e13110 = "輸入單詞"
____loclib.poll = "创建投票"
____loclib.next = "下一步"
____loclib.refresh = "刷新"
____loclib.e13111 = "添加你的邮箱地址，以便获取口袋网最新资讯"
____loclib.e13112 = "输入邮箱地址"
____loclib.e13113 = "添加邮箱地址"
____loclib.skip = "跳过"
____loclib.e13114 = "由于异常活动，你的注册出现了一些问题。"
____loclib.e13115 = "请发送邮件"
____loclib.e13116 = "以接收货币并开通账户"
____loclib.e13117 = "查看余额"
____loclib.joinnow = "现在加入"
____loclib.loading = "加载中"
____loclib.e13118 = "單詞不匹配"
____loclib.e13119 = "添加邮箱并继续"
____loclib.e13120 = "应用程序"
____loclib.e13121 = "此处没有图片"
____loclib.e13122 = "最新评论"

____loclib.e13123 = "显示更多帖子"
____loclib.e13124 = "更多精彩的口袋网帖子！"
____loclib.e13125 = "热门帖子部分是空的！"
____loclib.e13126 = "你关注的人的帖子将在这里显示"
____loclib.e13127 = "你关注的人的帖子将在这里显示"
____loclib.e13128 = "你关注的人的帖子将在这里显示"
____loclib.registration = "注册"
____loclib.editpost = "编辑帖子"
____loclib.removepost = "删除帖子"


____loclib.reportpost = "举报帖子"
____loclib.donate = "捐"
____loclib.blockuser = "屏蔽用户"
____loclib.more = "更多"
____loclib.showmore = "显示更多"
____loclib.e13129 = "附带图片"
____loclib.e13130 = "已编辑"
____loclib.e13131 = "你已屏蔽该用户"
____loclib.e13132 = "額定"
____loclib.e13133 = "分享"
____loclib.e13134 = "此搜索字符串沒有任何結果"
____loclib.e13135 = "用戶沒有私鑰"
____loclib.e13136 = "所有帖子"
____loclib.e13137 = "你的口袋"
____loclib.e13138 = "热门帖子"
____loclib.e13139 = "在口袋网上搜索"
____loclib.e13140 = "搜索"
____loclib.notifications = "消息提醒"
____loclib.showall = "显示全部"
____loclib.e13141 = "没有任何消息提醒"

____loclib.recommendations = "推荐"
____loclib.e13142 = "我已保存密钥，别再提醒我了"
____loclib.e13143 = "重要提示！"
____loclib.e13144 = "复制文本"
____loclib.e13145 = "在设备上保存密钥"
____loclib.e13146 = "帖子到底了"
____loclib.e13147 = "分享"
____loclib.e13148 = "确定要投诉这个帖子？"
____loclib.e13149 = "用户评分"
____loclib.e13150 = "帖子评分"
____loclib.e13151 = '没人给这个帖子评分'
____loclib.e13152 = "用户得分"
____loclib.e13153 = "跳过并进入网站"
____loclib.e13154 = "你的登录信息"
____loclib.e13155 = "要使用口袋网，你必须先生成密钥，它相当于中心化社交网络上的登录和密码。"
____loclib.users = "用户"
____loclib.userstx = "用户"
____loclib.user = "用户"
____loclib.postscount = "发帖数"
____loclib.about = "关于"
____loclib.e13156 = "下一個結果"
____loclib.posts = "帖子"
____loclib.e13157 = "搜索方式"
____loclib.e13158 = "沒有任何結果"
____loclib.e13159 = "搜索词组是空的"
____loclib.repost = "转发"
____loclib.e13160 = "你好口袋小子!"

____loclib.e13161 = "为你的帖子添加标签"
____loclib.e13162 = "标签不超过5个"
____loclib.e13163 = "该帖子没有任何修改"
____loclib.e13164 = "请用几句话向口袋网民们介绍你的链接。内容是什么？有何重要性？你的观点是？"
____loclib.e13165 = '视频链接无效，请使用有效的视频链接。'
____loclib.e13166 = "你拯救了"
____loclib.e13167 = "被网络审查中的人"
____loclib.e13168 = "让通过你链接的每一个会员注册为你赚取口袋币"
____loclib.e13169 = "直接链接"
____loclib.copy = "复制"
____loclib.e13170 = "包含口袋网注册行为召唤(CTA) "
____loclib.more = "更多"
____loclib.e13171 = "喜大普奔，我摆脱了社交网络垄断，重获自由，和我一起加入口袋网（Pocket.app）吧！ 这样我们就可以在区块链上自由分享和畅聊了。由此加入"
____loclib.e13172 = "我想邀请你加入一个新的去中心化的区块链社交平台——口袋网！在这里你将遇到很多有趣的事物。你的加入也会使我们同时获得口袋币加密货币奖励！"
____loclib.e13173 = "通过邮件发送"
____loclib.e13174 = "社交分享"
____loclib.e13175 = "热门标签"
____loclib.e13176 = "地址类型"
____loclib.e13177 = "上传图片"

____loclib.requiredfields = "必填项"
____loclib.e13178 = "未与你的个人资料绑定"
____loclib.e13179 = "未使用列表"
____loclib.e13180 = "你的发票已成功生成"
____loclib.e13181 = "在生成报价的过程中发生了错误"
____loclib.e13182 = "塊瀏覽器"
____loclib.e13183 = "帮助中心"
____loclib.e13184 = "继续注册"
____loclib.e13185 = "连接中断"
____loclib.e13186 = "编辑个人资料"
____loclib.e13187 = "内容"
____loclib.e13188 = "请保管好你的密钥，它相当于中心化社交网络上的登录和密码"
____loclib.e13189 = "离开，永远失去密钥！"
____loclib.e13190 = "口袋网主题"
____loclib.e13191 = "设置主题"
____loclib.e13192 = "等级"
____loclib.e13193 = "奖金"
____loclib.e13194 = "信誉与奖励"
____loclib.e13195 = "限制条款"
____loclib.e13196 = "它佔用了很多"
____loclib.e13197 = "接收口袋币"
____loclib.e13198 = "大约需要等待的时间为"
____loclib.e13199 = "立即加入口袋网"

____loclib.e13200 = "返回口袋网"
____loclib.e13201 = "加入Beta测试"
____loclib.e13202 = "口袋网beta测试将于1月24日开启"
____loclib.e13203 = "谢谢你加入口袋网beta测试邮件列表，这不是使用口袋网的硬性要求。但我们会通过邮件发送调查问卷，以进一步改善平台。感谢你帮助我们一起塑造互联网的美好未来。"
____loclib.e13204 = "口袋网接受地址"
____loclib.e13205 = "参数"
____loclib.e13206 = "接收口袋币金额"
____loclib.e13207 = "发送金额"
____loclib.e13208 = "可用"
____loclib.e13209 = "众筹名单"
____loclib.e13210 = "新交易"
____loclib.e13211 = "复制链接并分享"
____loclib.amount = "金额"
____loclib.label = "标签"
____loclib.message = "信息"
____loclib.copylink = "复制链接"
____loclib.e13211 = "请填写以下内容"
____loclib.e13212 = "生成二维码"
____loclib.e13213 = "接收地址"
____loclib.process = "进度"
____loclib.source = "来源"
____loclib.yourmessage = "你的消息"
____loclib.e13214 = "口袋币金额"
____loclib.currency = "货币"


____loclib.e13215 = "选择货币"
____loclib.e13216 = "货币金额"
____loclib.e13217 = "这笔交易的时间已过期"
____loclib.e13218 = "等待区块链确认"
____loclib.e13219 = "发送口袋币给你"
____loclib.e13220 = '口袋币已发送'
____loclib.errorreload = "出問題了。 請重新加載頁面並重試"
____loclib.e13221 = "您確定要刪除有關此交易的信息嗎？ 交易不能停止"
____loclib.e13222 = "下载桌面版-這是最抗審查的使用方式 口袋网. 即使網站關閉，桌面應用程序仍將直接通過節點運行。 "
____loclib.e13223 = "下载口袋网Windows版"
____loclib.e132232 = "下载口袋网macOs版"
____loclib.e13224 = "下载口袋网Linux版"
____loclib.e13225 = "口袋网节点"
____loclib.e13226 = '下载节点'
____loclib.e13227 = "下载口袋网节点Windows版"
____loclib.e13228 = "下载口袋网节点Linux版"
____loclib.e13229 = '无效的私钥'
____loclib.e13230 = '未定义的连接错误'

____loclib.e13231 = "连接中断"
____loclib.e13232 = "无法与节点连接"
____loclib.e13233 = '该评论已被删除'
____loclib.e13234 = 'op_return错误/41'
____loclib.e13235 = '不能为评论重复评分'
____loclib.e13236 = '该评论已被删除'
____loclib.e13237 = '你不能为自己评分'
____loclib.e13238 = '评论发送错误，请等待并重试/ 37'
____loclib.e13239 = '评论发送错误/ 35'
____loclib.e13240 = '你正在回复的评论已被该用户删除'
____loclib.e13241 = '评论过长，请分段评论'
____loclib.e13242 = "你被该用户屏蔽了，将无法对其帖子进行评论"
____loclib.e13243 = "你已经达到了24小时内点赞评论的上限"
____loclib.e13244 = "你已经达到了24小时内编辑评论的上限"
____loclib.e13245 = "你已经达到了24小时内发送评论的上限"
____loclib.e13246 = "你正在试图编辑他人的帖子"
____loclib.e13247 = "你已经达到了24小时内最多编辑5个帖子评论的上限"
____loclib.e13248 = '每个区块链区块只能编辑一次，请稍候重试'
____loclib.e13249 = '不能屏蔽自己'
____loclib.e13250 = '已屏蔽该用户'
____loclib.e13251 = '未屏蔽该用户'
____loclib.e13252 = '交易格式错误'
____loclib.e13253 = '不能推荐自己'
____loclib.e13254 = '该用户名过长'
____loclib.e13255 = '该用户名已被使用'
____loclib.e13256 = '该帖子过长，请将其拆分'
____loclib.e13257 = '你的口袋网信誉评分还没达到可登记投诉的标准'
____loclib.e13258 = '你已经达到了24小时内投诉的上限'

____loclib.e13259 = '不可投诉自己的帖子'
____loclib.e13260 = '你已登记了对这个帖子的投诉'
____loclib.e13261 = "保存密钥"
____loclib.e13262 = "稍后"
____loclib.e13263 = "订阅并开启来自该用户的消息提醒"
____loclib.e13264 = "订阅但不开启消息提醒"
____loclib.e13265 = '你的名字已不可用，请选择其他名字'
____loclib.e13266 = "白色主题"
____loclib.e13267 = "暗黑主题"
____loclib.e13268 = '投幣 獲勝'
____loclib.e13269 = '收到的交易'
____loclib.e13270 = '收到的赞'
____loclib.e13271 = '收到的评论'
____loclib.e13272 = '收到的回答'
____loclib.e13273 = '新粉丝'
____loclib.e13274 = '拯救的用户'
____loclib.e13275 = '评论分数'
____loclib.e13276 = '显示插入的视频'
____loclib.e13277 = '自动播放视频'
____loclib.e13278 = '自动启动口袋网'
____loclib.e13279 = '聊天'
____loclib.e13280 = '标签'
____loclib.e13281 = '最新评论'
____loclib.e13282 = "电报机器人代币"
____loclib.e13283 = "电报频道的帖子"
____loclib.e13284 = "将机器人添加到聊天中并选择"
____loclib.e13285 = '从电报中发帖前先询问'
____loclib.e13286 = '向电报发送前询问'
____loclib.e13287 = "发送至电报渠道"
____loclib.video = "视频"
____loclib.e13288 = "主頁小工具"
____loclib.e13289 = "电报整合"

____loclib.system = "系统"
____loclib.e13290 = "你要关注吗？"
____loclib.e13291 = "确定要发消息给电报？"
____loclib.send = "发送"
____loclib.e13292 = "你在这个主机上已有节点"
____loclib.e13293 = "内部错误"
____loclib.e13294 = '启用PGSQL数据库'
____loclib.e13295 = '数据库主机'
____loclib.e13296 = '数据库端口'
____loclib.e13297 = 'DB 最大'
____loclib.e13298 = '数据库空闲超时, ms'
____loclib.e13298 = '数据库名称'
____loclib.e13300 = '数据库用户名'
____loclib.e13031 = '数据库密码'
____loclib.e13302 = '代理服务器'
____loclib.e13303 = 'https代理服务器端口'
____loclib.e13304 = 'wss代理服务器端口'
____loclib.e13305 = '服务器SSL证书密钥, pem'
____loclib.e13306 = '服务器SSL证书, pem'
____loclib.e13307 = '服务器SSL证书密码'
____loclib.e13308 = 'Firebase 行政 SDK'
____loclib.e13309 = '你的Crane地址'
____loclib.e13310 = '启用验证码'
____loclib.e13311 = '启用IP限制器'
____loclib.e13312 = "服务器"

____loclib.e13313 = "服务器, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "其他"
____loclib.e13316 = '启用'
____loclib.e13317 = '二进制路径'
____loclib.e13318 = '配置路径'
____loclib.e13319 = '数据路径'
____loclib.e13320 = '权益质押地址'
____loclib.e13321 = '將賬戶地址導入節點進行堆疊'
____loclib.e13322 = '状态'
____loclib.e13323 = '权益质押地址'
____loclib.e13324 = '最后的区块'
____loclib.control = "控制"
____loclib.setup = "设置"
____loclib.e13325 = "确定要从电报上发布消息吗？"
____loclib.e13326 = "发布"
____loclib.e13327 = '确定要再次使用代理吗？'
____loclib.e13328 = '赞了你的评论！'
____loclib.e13329 = "新的评论点赞"
____loclib.e13330 = "分享了你的帖子："
____loclib.e13331 = "分享了你的帖子："
____loclib.e13332 = "发布了一个新帖子："
____loclib.e13333 = "收到的交易"
____loclib.e13334 = "恭喜你贏了"
____loclib.e13335 = "Pocketcoin 為您提供最新信息"
____loclib.e13336 = "留言说："
____loclib.e13337 = "评论了你的帖子："
____loclib.e13338 = "回复了你的评论："
____loclib.reply = "回复"
____loclib.e13339 = "你从被审查的网络世界拯救了某人，所获得的代币奖励正向你涌来。"
____loclib.e13340 = '恭喜！'
____loclib.e13341 = "关注了你"
// <%=e('e13352')%> <%=e('e13037').toUpperCase()%> <%=e('')%> self.app.localization.e('e13337')
____loclib.e13342 = "新粉丝"
____loclib.e13343 = "赞了你的帖子"
____loclib.e13344 = "新的点赞"
____loclib.e13345 = "向你发送了私信"
____loclib.e13346 = "你有新消息"
____loclib.e13347 = "口袋网有新版本，是否现在更新？"
____loclib.e13348 = "不，稍后再说"
____loclib.e13349 = "口袋网有新版本，是否到页面上下载新版本？"
____loclib.e13350 = '马上加入口袋网并赚取口袋币吧'
____loclib.e133512 = '请写几句话介绍一下你自己，吸引志同道合的人来关注你吧'
____loclib.e13351 = '口袋网聊天'
____loclib.e13352 = '你没有聊天权限'

____loclib.e14001 = '发布的语言'
____loclib.e14002 = '你确定要清除这个帖子吗？'
____loclib.e14003 = '技术支持'
____loclib.e14004 = '哪里可以下载客户端？'
____loclib.e14005 = '哪里可以下载节点？'
____loclib.e14006 = '点击口袋网安装程序'
____loclib.e14007 = '有任何问题请发邮件至 core@pocketnet.app'
____loclib.e14008 = '口袋网'
____loclib.e14009 = '我看到一个PN地址和一个钱包地址，这两个地址都在口袋网区块链上吗？'
____loclib.e14010 = 'PN地址一般用于发布内容和社交网，也用于保存你的高评分帖子所赢得的货币奖励。'
____loclib.e14011 = '钱包地址用于保存其余的货币。'
____loclib.e14012 = '我可以链接到我的个人资料或者是我的"页面" 吗？这样子我可以分享到我的社群，吸引更多成员进来。'
____loclib.e14013 = '在浏览器中，点击右上角的头像，进入你的个人资料，然后复制网页地址，任何通过你的链接注册成功的人会自动关注你，并且你将获得相应奖励。'
____loclib.e14014 = '从桌面版应用程序进入你的个人资料，在你的头像右边会有三个图标，一个是带有货币数量的钱包，然后是消息提醒的铃铛图标，第三个是绿色十字图标，点击该图标，选择“复制”然后分享。通过该链接注册的人会自动关注你，并且你将获得相应奖励。'
____loclib.e14015 = '星级系统对于我们可以给别人评分的星星数量有限制吗？'
____loclib.e14016 = '有一些限制。但随着你信誉的增长，你可以越来越多地点赞。这样做，是为了不让机器人破坏我们的区块链。最初，你每24小时可以给100个评分。随着你信誉的增长(通过发帖和被被人评分获得), 每天你可以给出200个评分.'
____loclib.e14017 = '要多久才能更新我的个人资料？'
____loclib.e14018 = '每个小时可以更新一次。'
____loclib.e14019 = '有Linux的桌面版吗？'
____loclib.e14020 = '是的，正在计划中，随着beta测试的进展，会在2到3周后上线。'
____loclib.e14021 = '你们把视频内容保存到哪里？'
____loclib.e14022 = '我们正在致力于视频存储，这期间你可以从Bitchute、Youtube、Vimeo和其他平台分享视频。'
____loclib.e14023 = '有移动端的App吗？'
____loclib.e14024 = '移动端App还没有准备好。我们计划在2019年7月推出。但我们强烈推荐大家也下载桌面版应用程序，因为与安卓或iPhone上的App不同，桌面版不会受谷歌或苹果控制。'
____loclib.e14025 = '每天或每小时发帖的上限是什么？'
____loclib.e14026 = '我们确实有一些上限，但经过测试，我们增加了上限。在一开始，你可以每24小时发15个帖子和发出100个评分。一旦你信誉评分增长到50以上，你就可以每24小时发30个帖子和200个评分。'
____loclib.e14027 = '信誉是什么？它是如何计算的？'
____loclib.e14028 = '您的信誉是以下列方式计算的评分之和。请注意，信誉低于50的用户不会影响任何人的信誉和货币奖励。他们可以对内容进行评分，但不影响信誉。'
____loclib.e14029 = '因此，如果你有2个5星评分和1个1星评分，总评分会是'
____loclib.e14030 = '是否有办法删除或编辑一个帖子？'
____loclib.e14031 = '不是在這一點上，因為它已經融入了區塊鏈。 但是，我們正在開發一項功能來創建覆蓋交易 &#10075;隱藏&#10076; 事務，這將有效地轉換為編輯或刪除。'
____loclib.e14032 = '是否可以搜索用户？'
____loclib.e14033 = '点击顶部的搜索放大镜，按用户名或关键词进行搜索。'
____loclib.e14034 = '如何关注别人？'
____loclib.e14035 = '在帖子作者(帖子顶部)旁边有一个关注的链接，你可以在热门帖子(页面顶部的红色火焰图标)中找到对方的帖子。你也将很快看到订阅信息，这与主信息流不同。主信息流将是所有人按时间顺序发布的所有内容，但订阅信息流将只包含你关注的人的帖子。因此，你可以进入主信息流寻找优质内容，尽管你可能不喜欢里面的所有内容。然后选择那些你想保留的内容。有点像钓鱼 :)'
____loclib.e14036 = '它可以在Brave或Duck Duck go浏览器上使用吗？'
____loclib.e14037 = '口袋网应该可以在这些浏览器上运行。它在Chrome和Firefox上是完全有效的。但我们强烈建议大家下载桌面应用程序（在此获取口袋网安装程序：https://github.com/pocketnetteam/pocketnet.gui/releases/tag/v0.0.33-beta) 桌面程序永远不会被封锁（即使pocketnet.app因某种原因被关闭或封锁）。在极权主义和准极权主义国家，这是一个值得严肃思考的因素，如果你想一想，会发现极权主义在全球越来越多的国家盛行。'
____loclib.e14038 = '我们可以评论自己或者别人的帖子吗'
____loclib.e14039 = '是的，每个帖子下面都有评论。'
____loclib.e14040 = '如何为帖子添加标签'
____loclib.e14041 = '只要在字段标签中输入并按回车键。不需要指定#，它将被自动添加。'
____loclib.e14042 = '我怎样才能使用公共地址？'
____loclib.e14043 = '你的公共地址是口袋网用来验证你身份的。从本质上讲，你的私钥是一个非常大的数字（可以用12个字的序列或二维码表示）。这个数字被乘以另一个大家都知道的数字（称为基点），我们就得到一个公钥。当你输入你的私钥时，我们可以用它乘以基点，得到你的公钥，我们可以将它与公共地址相匹配。如果它们匹配，我们就知道这是你。但反过来不可能成立，即用公钥除以基点来获得你的私钥。密码学中的乘法工运用只有一种方式，不能被逆用，所以你的密钥是安全的。口袋网使用与比特币完全相同的密码学。'
____loclib.e14044 = 'W是否会有适用于Mac的可下载的执行文件？'
____loclib.e14045 = '是的，我们正在开发Mac平台，目标是在4月中旬。'
____loclib.e14046 = '口袋币'
____loclib.e14047 = '口袋币可以用来做什么?'
____loclib.e14048 = '你可以赚更多口袋币，或作为礼物送给别人。然而，如果当口袋网成功发展时，口袋币将成为平台上购买广告的主要方法。广告商将能够很容易地找到有合适受众的内容创作者，然后向他们提供广告机会。这将是一个无信任的合作（也就是说，任何一方都不能欺骗），因为有一种叫做多重签名协议的东西。多重签名协议需要双方的数字签名才有效。当广告商向内容创作者提供广告时，他创造了两个必要签名中的第一个。他签署了实际的广告和出价金额。内容创作者审查这个部分签名的多重签名，如果接受，那么他就添加第二个签名。当区块链看到这两个签名时，会自动付款给内容创作者，广告会自动显示在创作者的频道上。这些交易将只通过口袋币进行。因此，如果口袋币继续发展，它将是一个非常有价值的代币。'
____loclib.e14049 = '口袋币就像口袋网的股票吗？'
____loclib.e14050 = '绝对不是。口袋网甚至不是一个公司，没有任何所有权。它是一个开放源代码，任何人都可以复制和运行。口袋币是一种促进价值交换的代币，特别是广告交易。此外，口袋网将涵盖一个市场，在这个市场中，商品和服务将直接以口袋币出售。'
____loclib.e14051 = '我可以购买额外的口袋币吗？'
____loclib.e14052 = '是的，我们将在Pocketnet.app上创建一个用比特币和其他一些加密货币购买口袋币的方式。所有的销售收入都将用于向宣传口袋网。因此，通过购买口袋币，你是在为口袋网的成功定位，但同样重要的是，你在帮助口袋网实现这一成就。所有主流的社交网络都有数十亿美元的广告预算。口袋网是由它的创始人出资建立的，开发者们只为口袋网工作。我们需要你帮助我们进行传播。想要更多地助力可以考虑购买一些口袋币来帮助我们宣传网站。要购买口袋币，你需要先购买比特币或其他加密货币，这在现在是非常容易的。'
____loclib.e14053 = '我可以用美元或其他法定货币购买口袋币吗？'
____loclib.e14054 = '不行。'
____loclib.e14055 = '隐私'
____loclib.e14056 = '不输入真实姓名的人算匿名吗？'
____loclib.e14057 = '是的，没有姓名、电话或电子邮件以任何方式与你的账户相连，它只是被选择性地输入以接收资讯更新。'
____loclib.e14058 = '别人能从“花园”外看到某人的资料或帖子吗？这是一个“围墙花园”吗？'
____loclib.e14059 = '由于整个区块链和所有的帖子都是开源的，任何人都可以访问你的帖子和资料。他们只知道它与你的公共地址相联系。在实践中，你可以有多个账户，有的可以用你的真实姓名，有的也可以匿名。匿名是保护自由言论不被权力滥用的一个伟大工具。'
____loclib.e14060 = '我的公钥是否就像我在个人资料中输入的钱包ID，别人可以向其发送积分？'
____loclib.e14061 = '是的，并且公钥可以被公开。但是密钥就不行了，一定要妥善保管！'
____loclib.e14062 = '我可以在我的无头服务器上运行一个节点吗？'
____loclib.e14063 = '我们将把节点的源代码放到GitHub上。运行节点的说明将在4月初提供。'
____loclib.e14064 = '怎样才能重新登录？'
____loclib.e14065 = '你可以使用你的12个字的私钥或二维码来登录。'
____loclib.e14066 = '内容管理'
____loclib.e14067 = '口袋网是否允许出现任何内容？如果有些内容不被允许，这个平台还能被称为言论自由吗？'
____loclib.e14068 = '这是一个非常重要的问题，我们将发布许多关于这个问题的视频和文章，同时也希望得到你的意见。首先，并非所有类型的内容都被允许。然而，关键的一点是，监管执行是透明的，由社区决定，我们将在下面解释。监管是由社区完成的，是公开的，没有隐藏的影子禁令或像硅谷实行的选择性禁止。'
____loclib.e14069 = '口袋网的内容策展规范'
____loclib.e14070 = '当你的信誉达到100，你按下任何帖子右上方的点，会看到一个投诉的选项。如果收到一定量的投诉，该帖子将不再被显示。当某人在24小时内有超过2个帖子被投出平台，他们在发布第二个帖子后的48小时内不能再发帖。当投诉数量至少为4星和5星评分数量的⅓时，投诉就完成了，但至少要有10个投诉（将在与社区协商后调整）。'
____loclib.e140701 = '我们非常热情地支持言论。但是，我们不希望把口袋网变成一个疯子横行的边缘论坛。什么原因会导致你投诉？'
____loclib.e140702 = '不要投诉那些你仅仅不喜欢或感到被冒犯的内容。这不是一个很高的标准。不要关注那些冒犯你的人，我们很快就会有一个取消看他们帖子的功能，但不要投诉他们。请只投诉那些威胁到口袋网作为一个大众交流平台的长期生存的事情，这个平台打算深入到许多国家的各个社会阶层。'
____loclib.e140703 = '我们强烈建议你对任何的色情内容进行投诉。网络上有很多色情网站，我们不想把我们的言论自由努力与之混为一谈。我们强烈鼓励社区对色情内容投票剔除。其次，任何类型的直接威胁都应该投票剔除，明确的种族主义内容也应该被投票取消。如果我们允许现在的主流媒体将我们与种族主义或暴力直接联系在一起，那么口袋网将在我们还没来得清除这些内容时不复存在。仅仅因为主流媒体对虚假的种族主义虚假报道，并不意味着我们应该在我们的平台上容忍种族主义来证明他们是正确的。这将偏离我们试图实现的目标，即挑战由媒体、金融和腐败的政府官员组成的邪恶联盟所创造的新极权主义。'
____loclib.e14071 = '关于种族主义的重要声明'
____loclib.e14072 = '自由思想和自由言论在主流社交平台和媒体上受到攻击。正因如此，我们需要说出真相，这个平台是非公司制和去中心化的。但我们要求每个人在提出你的观点时不要攻击他人的国籍或种族。你可以用证据来表达你的观点。我们不能把口袋网变成一个边缘化的平台。表达事实，但请避免种族主义和对特定民族的集体攻击。我们知道，硅谷和主流媒体已经把种族主义问题变成了他们的扑克牌，他们不断地喊狼来了。我们更应该有分寸，以证据为基础，不要让他们用这个来抹黑我们。如果我们不这样做，我们就不能让大多数人在口袋网上权衡主流媒体腐败的证据。请记住这一点，这样言论自由才能蓬勃发展，我们才能战胜世界上的那些“脸书”。</div><div>最终将是社区决定平台的方向。一群人投诉冒犯他们的内容，无异于和人们直接发出暴力威胁一样糟糕。然而，最初的迹象表明，平台的早期用户一般都很有智慧，而且讲求证据，所以未来前景看起来非常光明。口袋网团队注意到，在beta测试的几天后，我们甚至不再阅读另类新闻，因为口袋网上有很多有趣的内容。继续加油吧！</div><div>请参与到这些话题的讨论中来。这是一个社区平台。我们一直渴望提高平台的透明度，期待你告诉我们如何改进我们的内容策展和管理。你可以通过群聊，或发送邮件到support@pocketnet.app，或就这个话题发表完整的帖子。'
____loclib.e14073 = '口袋网的内容策展规范'
____loclib.e14074 = '口袋网是否允许出现任何内容？如果有些内容不被允许，这个平台还能被称为言论自由吗？'
____loclib.e14075 = '有时可能会有用户带着特定的目的，发布一系列邪恶的图片，以此来攻击口袋网。为了防止这种情况，我们有以下机制：如果某人的信誉达到-50，他的账户就会被自动封锁。获得-50的声誉相当于得到了25个一星评分且没有四星或五星评分。如果不是发布了大量内容极差的帖子，这几乎是不会发生的。'
____loclib.e14076 = '标记特定的帖子'
____loclib.e14077 = '当你的信誉达到50，按下任何帖子右上方的点，会看到一个投诉的选项。如果有足够的投诉，该帖子将不再被显示。当投诉数量至少达到4星和5星评价的⅓时，投诉就完成了，但至少要有10个投诉（这个数字将在与社区协商后进行调整）。然而，我们并不想把口袋网变成一个疯子统治的边缘论坛。什么内容可能会导致投诉？</div><div>不要投诉那些你纯粹不喜欢或感到冒犯的内容。这不是一个很高的标准。不要关注那些冒犯你的人，很快我们就会有一个过滤掉他们帖子的功能，但请不要投诉他们。只投诉那些威胁到口袋网作为一个大众交流平台的长期生存的事情，我们希望触达众多国家的各个社会阶层。</div><div>我们强烈建议你投诉任何形式的色情内容。网络上有很多色情网站，我们不想把我们的言论自由努力与之混为一谈。我们强烈鼓励社区对色情网站进行投票剔除。其次，任何类型的直接威胁都应该被投票提出，明确的种族主义的内容也应该被投票取消。如果我们允许主流媒体将我们与种族主义或暴力直接联系在一起，那么口袋网将在我们还没来得及将这些内容剔除之前就不复存在。仅仅因为主流媒体对虚假的种族主义虚假报道，并不意味着我们应该在平台上容忍种族主义，去证明他们是正确的。这将偏离我们试图实现的目标，即挑战由媒体、金融和腐败的政府官员组成的邪恶联盟所创造的新极权主义。'
____loclib.e14078 = '口袋网与它们有何不同...'
____loclib.e14079 = '推特、脸书、Reddit和其他中心化平台？'
____loclib.e14080 = '不存在中央机构或公司实体。平台由区块链上的平等节点运行。所有收入在节点操作者和内容创作者之间分配。节点操作者以口袋币交易，以便用于铸造区块的奖励和交易费。每个区块中的一半奖励会基于内容从用户那里得到的评分给到相应的创作者。'
____loclib.e14081 = '像Minds.com和Sola这样的去中心化平台？'
____loclib.e14082 = '这两个平台虽然很好，但都不是自成一体的。两者都高度依赖以太坊平台，因为它们的代币是基于ERC-20以太坊标准的。这意味着，使用代币的操作会伴随以太币的Gas费。另外，这些实体背后都有企业，而企业由于其利润增长的经济逻辑，永远是一个中心化的点。还有，有企业存在就极其有可能有审查制度。'
____loclib.e14083 = '像Steemit平台?'
____loclib.e14084 = 'Steemit有自己的区块链，但它是一个企业实体，具有由此产生的所有中心化。'
____loclib.e14085 = '像Mastodon和其他的去中心化平台？'
____loclib.e14086 = '虽然Mastodon是一个完全去中心化的平台，但使用它需要大量的技术知识。这给潜在的广泛受众带来了很大的阻碍。口袋网具有网页端和桌面版应用程序，用户可以从任何设备上登录，从区块链上拉取他们的个人设置，并立即使用该平台，而无需任何技术知识。'
____loclib.e14087 = '口袋网生态系统'
____loclib.e14088 = '口袋网的发展资金是如何筹措的？'
____loclib.e14089 = '口袋网是开源的，目前是由一群具有专业编程和数学技能的志愿者来管理。口袋网推出后，将靠其创建一个去中心化的公平社交网络的承诺，吸引顶尖的编程人才。负责口袋币工作的的程序员和市场推广人员可获得5%的发行量。对开发者和市场推广人员的奖励将由节点以透明的方式投票分配。'
____loclib.e14090 = '口袋币是什么?'
____loclib.e14091 = '口袋币是一种网络代币。它专门用于向口袋网的创作者购买广告，并支付此类付款的交易费用。口袋币的发行取决于口袋网的用户数量，并有固有的算法因素将其长期价值与每用户年收入（ARPU）挂钩。ARPU是数字广告中的一个术语，表示平台每年从一个活跃用户那里获得的收入总额。在口袋网，所有的收入都在内容创作者和节点之间分配。'
____loclib.e14092 = '如何奖励内容创作者和节点操作者？'
____loclib.e14093 = '口袋网具有独特的直销市场，内容创作者可以在这里向广告买家出售广告。内容创作者可以设定价位、接受模块化生产的广告，也可以提供高价值的定制广告（创作者们以自己的方式推销产品）。直销市场本质上是一个广告交易所，允许广告买家在没有任何中介的情况下瞄准特定受众。所有的广告购买和广告本身都绑定在区块链上，因此广告购买是完全去信任的。'
____loclib.e14094 = '如果用户发布非法内容、色情内容和垃圾邮件怎么办？'
____loclib.e14095 = '口袋网不是一个暗网平台或某种色情网站。虽然它是去中心化和抗审查的，但它是由用户监督的。任何非法内容都会被标记出来，并使用维基百科模式从平台上删除。这意味着拥有最高信誉的用户可以监督该平台。然而，我们也有一些保障措施（在开放源代码中），防止相同或非常相似的一群人重复将内容从平台上投票剔除。此外，我们明确鼓励用户标记非法内容或威胁到口袋网的长期生存的内容，而不是仅让他们感到反感的内容。为了确保口袋网成为一个言论自由的平台，我们鼓励你开始参与，提高你的信誉，并在摆脱目前中心化社交媒体普遍存在的审查制度的情况下，适当地监督平台。'
____loclib.e14096 = '口袋网由谁管理？'
____loclib.e14097 = '口袋网不归任何公司实体或个人所有与控制。'
____loclib.e14098 = '口袋网的设计者Daniel Sachkov在2019年夏天改变了他的主要工作重点，他现在正在做区块链技术进一步去中心化相关的研究，这将使所有人受益。他按照完全去中心化的社交媒体架构和设计理念，将项目的控制权交给了社区和运行该网络的节点。'
____loclib.e14099 = '从那时起，一个由有能力、不断变化的开发人员和社区志愿者组成的团队一直在为实现他的愿景而努力。'

____loclib.e14100 = '帮助中心'
____loclib.e14101 = '塊瀏覽器'
____loclib.e14102 = '常见问题'
____loclib.e14103 = '路标规划'
____loclib.e14104 = '节点设置'
____loclib.e14105 = '视频'
____loclib.e14106 = '应用程序'
____loclib.e14107 = '检查更新'
____loclib.e14108 = '分享回答'


____loclib.peertubeAddVideo = '为帖子添加视频'
____loclib.peertubeAddStream = '为帖子添加直播'

____loclib.e14111 = "加载图片出现问题"
____loclib.editcomment = "编辑评论"
____loclib.system16 = {
    charts : {

    }
}


____loclib.downvoteShareMessage = "踩了你的帖子"

____loclib.shareviagroupemail = "邮件"
____loclib.shareviagroupmessenger = "聊天软件"
____loclib.shareviagroupsocial = "社交网络"
____loclib.shareviagroupblog = "博客"

____loclib.anotherSiteCaption = "你关注了跳转第三方网站的外部链接"
____loclib.anotherSiteDisc = "我们对该网站的内容不负责任，并强烈建议你不要在第三方网站上提供你的任何个人数据。"

____loclib.Categories = "分类"
____loclib.addtagsCategories = "添加分类/标签"
____loclib.addcategory = "添加分类"
____loclib.categoryname = "类别名称"
____loclib.entercategoryname = "输入类别名称"
____loclib.categoryfilter = "分类筛选"
____loclib.emptycategoryname = "请输入类别的名称"
____loclib.doublename = "此名称的类别已经存在。请选择另一个名称。"

____loclib.showmoreusers = "显示更多用户"
____loclib.zeron = "未发现";
____loclib.maxtags = "最多只能加5个标签";

____loclib.videotitle = "输入视频标题";
____loclib.videodesc = "输入视频介绍";
____loclib.entervideocaption = "请输入视频标题";

____loclib.period = "周期";
____loclib.periodday = "1天";
____loclib.period3day = "3天";
____loclib.period7day = "1周";
____loclib.period31day = "1个月";
____loclib.period182day = "半年";

____loclib.downloaded = "已下载";
____loclib.downloadedEmpty = "下载的帖子将显示在这里";
____loclib.downloadVideo = "下载视频";
____loclib.selectQuality = "选择质量:";
____loclib.downloadedVideos = "下载的视频";
____loclib.deleteAllDownloadedVideos = "删除所有下载的视频";
____loclib.deleteVideoDialog = "你确定要删除这个视频吗？";
____loclib.deleteAllVideoDialog = "你确定你要删除所有的视频吗？";
____loclib.videosDeleted = "视频被删除!";
____loclib.noDownloadedVideos = "没有下载的视频";

____loclib.buy = '买';
