if(typeof loclib == "정의되지 않음" || !loclib)
loclib = {};

loclib.kr = {};

var ____loclib = loclib.kr;

var appname = window.pocketnetproject || "Pocketnet"
//time

____loclib.fewseconds = "몇 초 전";
____loclib.oneminute = "1 분 전";

____loclib.minutes = function(v){
return v + " 분 전"
}

____loclib.tenminutes = "10 분 전";
____loclib.halfanhour = "30 분 전";
____loclib.anhour = "1 시간 전";
____loclib.today = "오늘";

//authorization

____loclib.id0 = "기존 계정에 로그인";
____loclib.id1 = "이미 등록되어 있다면 로그인하십시오";
____loclib.loadqrcode = "QR 코드 업로드";
____loclib.stay = "로그인 상태 유지";
____loclib.signin = "로그인";
____loclib.orcreate = "또는 새 계정 생성";
____loclib.createnew = "새 계정 생성";
____loclib.staysafe = "안전하지 않습니다. 계속 하시겠습니까?";
____loclib.or = "또는";

// Register a New Account
____loclib.id71 = "새 계정 생성";
____loclib.id72 = "이미 회원이십니까? 로그인";

____loclib.rtip1 = "개인 로그인 키를 기록해 두십시오!";
____loclib.rtip2 = function(mobile){
var h = "다음은 개인 키 암호입니다. 적어두고 QR 코드를 저장하십시오"

if(mobile){ h += "기기" } else { h+="PC" }

h+=" 그리고 그것을 잃지 않도록 주의하세요. 우리는 귀하의 개인 데이터를 저장하지 않습니다. 개인 키를 분실하면 복구할 수 없습니다!"

return h
}

____loclib.generatepkey = "개인 키 생성";
____loclib.rtip3 = "이 로그인 키를 적어 QR 코드로 저장하십시오. 개인 데이터를 저장하지 않습니다. 분실시 복구할 수 없습니다! ";
____loclib.saveqrcode = "Qr 코드 저장"
____loclib.copyprivkey = "개인 키 복사"
____loclib.rcontinue = "계속"
____loclib.idle = "일정기간동안 유휴"
____loclib.congratulations = "축하합니다! 당신이 이 안에 있습니다 <span class='pnlabel'>"+appname+"</span>"
____loclib.creatingpreloader = "계정 생성"
____loclib.removepaste = "이 입력에 대한 붙여넣기 옵션을 제거했습니다."
____loclib.filedamaged = "파일에 유효한 개인 키가 없습니다"
____loclib.keysnotmatch = "개인 로그인 키가 일치하지 않습니다"
____loclib.confirmkey = "개인 로그인 키 입력 또는 이전 단계에서 QR 코드 업로드"
____loclib.successfullycopied = "키가 성공적으로 복사되었습니다"
____loclib.urlsuccesscopied = "링크가 성공적으로 복사되었습니다"

____loclib.confirmkeyLabel = "개인 키를 확인하십시오. 양식에 키를 입력하거나 <b>QR 코드를 업로드 하십시오</b>"
____loclib.repeatetocreate = "개인 키를 다시 생성하려면 반복하십시오"
____loclib.confirmcreate = "계정 생성"


//user activation

____loclib.useractivation = "사용자 활성화";
____loclib.wesentmoney = "등록을 위해 몇 개의 코인을 보냈습니다";
____loclib.wesentmoneym = "등록을 위해 이미 몇 개의 코인을 보냈습니다";


____loclib.wesentmoneydelay = "프로세스에 평소보다 더 많은 시간이 소요됩니다. 조금 더 기다려주십시오";

____loclib.funetworkproblems = "연결에 문제가 있습니다. 나중에 시도하십시오";

____loclib.pleasewait = "기다려주십시오";
____loclib.next = "다음";
____loclib.welcometopocketnet = ""+appname+"에 오신 것을 환영합니다";
____loclib.continue = "계속";

//user page

____loclib.rstate = "평판";
____loclib.rprofile = "프로필";
____loclib.rsettings = "설정";
____loclib.rwallet = "지갑";
____loclib.raccounts = "계정";
____loclib.rsystem = "시스템";
____loclib.rconnection = "연결";
____loclib.pnetAddress = "포켓 넷 주소";
____loclib.profile = "프로필";
____loclib.signout = "로그 아웃";

//send

____loclib.postlabel = "포스트 기부";
____loclib.donationlabel = "기부";
____loclib.donationwel = "저자에게 감사를 표하고 싶다면 "+appname+" 거래를 사용할 수 있습니다.";
____loclib.donationwela = ""+appname+" 거래";
____loclib.donationwelan = "또는 다른 암호화 결제시스템을 사용할 수 있습니다";
____loclib.successfullycopiedaddress = "주소가 성공적으로 복사되었습니다";

//wallet

____loclib.wrecieve = "공유 주소로 코인 받기";
____loclib.wcopyshare = "주소 복사 및 공유 :";
____loclib.wqrcode = "Qr 코드";
____loclib.wcopeaddress = "주소 복사";
____loclib.wcreatelink = "또는 결제를 위한 링크 생성";
____loclib.required = "필수";
____loclib.wgetlink = "링크 받기";
____loclib.waddresses = "주소";
____loclib.waddress = "주소";
____loclib.wbalance = "밸런스";
____loclib.wpercente = "백분율";
____loclib.waddaddress = "새 지갑 주소 탐색";
____loclib.wrecieve = "받기";
____loclib.wrecieveon = "받기";
____loclib.wcopyshareorcreate = "주소 복사 및 공유 또는 결제 링크 생성";
____loclib.wdgetlink = "링크 가져오기";
____loclib.wdqrcode = "Qr 코드";
____loclib.wdcopyaddress = "주소 복사";
____loclib.wdpleasefill = "이 필드를 채우십시오";
____loclib.wduseqr = "자금을 받으려면 이 QR 코드를 사용하십시오";
____loclib.wdaddress = "주소";
____loclib.wdamount = "금액";
____loclib.wdlabel = "레이블";
____loclib.wdmessage = "메시지";
____loclib.wsend = "보내기";
____loclib.calcfeesandsend = "수수료 계산 및 보내기";
____loclib.wstrfees = "거래 수수료";
____loclib.wsfees = "수수료";

____loclib.wssendto = "코인 보내기";
____loclib.wssendb = "보내기";

____loclib.tacaddress = "계정 주소";
____loclib.twallet = "지갑";
____loclib.twalletaddresses = "지갑 주소";
____loclib.tTotal = "전체";
____loclib.wsselect = "메뉴에서 소스 선택";
____loclib.wsenter = "주소 입력 또는 메뉴에서 선택";
____loclib.wsreciever = "수신자 주소";
____loclib.wsamount = "금액";
____loclib.wsamountof = "거래 금액";
____loclib.wsincludefees = "금액에 수수료 포함";
____loclib.wsrecieverpay = "수취인이 지불";
____loclib.wssenderpay = "발신인 지불";
____loclib.wdselectfrom = "메뉴에서 선택";

____loclib.wdenteramount = "금액 입력";
____loclib.wdmessageplaceholder = "이 거래의 목적은 무엇입니까?";
____loclib.wrenteraddress = "주소 입력";
____loclib.wrenteraddressselect = "주소 입력 또는 메뉴에서 선택";
____loclib.wreturntoeallet = "지갑으로 돌아가기";
____loclib.linkCreated = "링크 생성됨";
____loclib.waddresswascop = "주소가 성공적으로 복사되었습니다";
____loclib.wqrcodecreated = "QR 코드 생성됨";
____loclib.wlinkcreating = "링크 생성";
____loclib.wqrcodecreating = "QR 코드 생성";
____loclib.wdoptions = "옵션";
____loclib.wssuccessfully = "트랜잭션이 성공적으로 전송되었습니다";
____loclib.wscalculatefees = "요금 계산";
____loclib.wsaddressnotv = "주소가 유효하지 않습니다";

//user profile
____loclib.uaddaddressdona = "기부할 주소 추가";
____loclib.uaddaddressdonaplace = "주소 입력";
____loclib.uchangeicon = "프로필 이미지 업로드";
____loclib.utip1 = ""+appname+"을 사용하기 전에 블록 체인에 이름과 아바타를 생성해야 합니다";
____loclib.utip2 = "한 단계만 남았습니다.";
____loclib.upicset = "프로필 아이콘 설정";
____loclib.upic = "프로필 아이콘";
____loclib.uuserinfo = "사용자 정보";
____loclib.usave = "저장";
____loclib.ucancel = "취소";
____loclib.uwaitb = "정보 저장 확인 대기";
____loclib.uchanges = "변경 사항이 없습니다";
____loclib.uchangesvalid = "프로필 이미지를 업로드하고 사용자 이름을 만들어야 합니다.";
____loclib.uname = "이름";
____loclib.unickname = "닉네임";
____loclib.ulanguage = "언어";
____loclib.uabout = "내 정보";
____loclib.uwebsite = "웹사이트";
____loclib.uaddresesd = "기부 주소";
____loclib.usavechanges = "변경 사항을 저장 하시겠습니까?";

//ustate
____loclib.sreps = "평판과 한계";
____loclib.sdisconnected = "노드에서 연결해제 됨";
____loclib.suseractivation = "사용자 활성화";
____loclib.sprofile = "프로필";
____loclib.spc = "게시물 수";
____loclib.ssc = "별 개수";
____loclib.ccc = "댓글 수";
____loclib.crc = "댓글 비율 수";
____loclib.stp = "시험 기간";
____loclib.srep = "평판";

//accounts
____loclib.aaddedacc = "추가된 계정";
____loclib.acure = "현재";
____loclib.aaddacc = "계정 추가";
____loclib.ascheduler = "스케줄러";
____loclib.aused = "이 주소는 이미 다른 주소 풀에서 사용 중입니다";


//author
____loclib.sub = "팔로우";
____loclib.unsub = "팔로우 해제";
____loclib.joined = "연결된 "+appname+"";
____loclib.shares = "공유";
____loclib.uposts = "게시물";
____loclib.myuposts = "내 게시물";
____loclib.followers = "팔로워";
____loclib.following = "팔로잉";
____loclib.settings = "관리";
____loclib.anofollowers = "이 사용자는 팔로워가 없습니다";
____loclib.aynofollowers = "팔로워가 없습니다";
____loclib.anofollowing = "이 사용자는 아무도 팔로우하고 있지 않습니다";
____loclib.aynofollowing = "당신은 아무도 팔로우하고 있지 않습니다";

//lenta
____loclib.lloadmore = "더 많은 멋진 게시물로드!";
____loclib.lloadprev = "새로운 멋진 게시물로드";


____loclib.lend = "게시물 끝";
____loclib.zerop = "현재 이 작성자의 게시물이 없습니다";
____loclib.zeroy = "아직 발행물이 없습니다. 공유하십시오!";



____loclib.llogin = "계속하려면 로그인해야 합니다.";
____loclib.lcomlaindialog = "정말로 이 게시물을 신고 하시겠습니까?";
____loclib.lunsubscribe = "정말로 이 계정을 언팔로우 하겠습니까?";
____loclib.lprivatepublic = "비공개 또는 공개 구독을 하시겠습니까?";
____loclib.lprivate = "비공개";
____loclib.lpublic = "공개";

//share
____loclib.newShare = "새 게시물";
____loclib.firstShare = ""+appname+"에서 첫 게시물 공유";
____loclib.scaption = "캡션";
____loclib.whatsnew = "새로운 기능";
____loclib.saddlink = "외부 사이트 또는 비디오에 링크 추가";
____loclib.saddimages = "게시물에 이미지 추가";
____loclib.sarticle = "기사를 작성하려면";
____loclib.stelegram = "텔레그램 보내기"
____loclib.stimes = "게시물 제거"


____loclib.snothing = "아무것도 없음";
____loclib.sposttime = "시간별 게시";
____loclib.spostnow = "지금 게시";
____loclib.stimenotselected = "시간이 선택되지 않음";
____loclib.spost = "포스트";
____loclib.sdate = "날짜";
____loclib.stime = "시간";
____loclib.snotags = "태그 추가";
____loclib.expandvideo = "확장하려면 클릭";
____loclib.emptymessage = "메시지가 비어 있습니다";
____loclib.emptytags = "태그를 추가하십시오";
____loclib.emptyutxo = "금액 없음";
____loclib.networkerror = "네트워크 오류";
____loclib.maximages = "최대 또는 10 개의 이미지가 허용되었습니다";
____loclib.sharenow = "지금 이 콘텐츠를 공유 하시겠습니까?";
____loclib.pastdate = "과거 날짜";
____loclib.timenotselected = "선택되지 않은 시간";
____loclib.addtags = "태그 추가";
____loclib.tnews = "뉴스";
____loclib.timages = "이미지";
____loclib.tvideos = "비디오";
____loclib.tmarket = "시장";
____loclib.tsport = "스포츠";

//menu
____loclib.signinmenu = "로그인";
____loclib.signupmenu = "가입";
____loclib.aboutmenu = "자세히 알아보기";

//footer
____loclib.aboutus = "회사 소개";



// Dialog Box Options
____loclib.daccept = "수락";
____loclib.dcancel = "취소";
____loclib.dyes = "예";
____loclib.dno = "아니요";
____loclib.dsa = "더 이상 표시 안함";


// Messages

____loclib.coinbaseSuccess = function(v){
return "축하합니다. 최근 활동으로 "+ v + "Pocketcoin을 획득하셨습니다!"
}
____loclib.coinbaseSuccesspost = function(v){
return "축하합니다. 최신 게시물에 대해 "+ v + "Pocketcoin을 받았습니다!"
}
____loclib.coinbaseSuccesscomment = function(v){
return "축하합니다. 최근 댓글에 대해 "+ v + "Pocketcoin을 획득하셨습니다!"
}
____loclib.userSent = function(v){
return "당신에게 <b>" + v + " POC</b> 를 보냈습니다"
}




____loclib.refferalUserMessage = "축하합니다! 검열된 웹에서 누군가를 구했습니다. 일부 동전이 도착 중입니다!"

____loclib.subscribeUserMessage = "팔로우 함"
____loclib.unsubscribeUserMessage = "팔로우 해제됨"
____loclib.gotoprofileMessage = "프로필로 이동"
____loclib.upvoteShareMessage = "당신의 게시물을 찬성했습니다"

____loclib.upvoteCommentMessage = " 당신의 댓글에 좋아요를 눌렀습니다"

// Errors

____loclib.error = "오류";
____loclib.checkScoreError = ""+appname+"을 사용하기 전에 필요한 프로필 정보를 입력해야 합니다. 지금 입력 하시겠습니까?";
____loclib.checkScoreErrorLight = "계정이 활성화되지 않았습니다";
____loclib.timestamperror = "응용 프로그램과 노드의 시간이 일치하지 않습니다";

// Error Page 404
____loclib.e404 = "오류 404";
____loclib.e404e = "페이지를 찾을 수 없습니다. 메인 페이지로 돌아가기";
____loclib.postLimitLight = function (v) {
return "당신은 24시간 동안"+ (v || 15) + " 게시물 한도에 도달했습니다";
}
____loclib.postLimitLight = function (v) {
return "당신은 24시간 동안"+ (v || 15) + "점수 한도에 도달했습니다.";
}

____loclib.doubleLimitLight = "이미 평가하셨습니다";

____loclib.SelfSubscribeError = "자신을 구독할 수 없습니다";
____loclib.DoubleSubscribeError = "이미 이 사용자를 팔로우하고 있습니다";
____loclib.InvalideSubscribeError = "이 사용자에 가입되어 있지 않습니다";
____loclib.ChangeInfoLimitError = "프로필은 한 시간에 한 번만 편집할 수 있습니다. 잠시 기다렸다가 다시 시도하십시오.";
____loclib.SelfScoreError = "자신의 게시물을 평가할 수 없습니다";

____loclib.unexperror10 = "알 수 없는 오류 (10)";
____loclib.unexperror11 = "알 수 없는 오류 (11)";
____loclib.unexperror12 = "알 수 없는 오류 (12)";

____loclib.networkerror = "노드에 문제가 있습니다";

____loclib.canSpendError = "이전 거래가 블록 체인에서 지워질 때까지 기다려야 합니다. 잠시 기다려주십시오";
____loclib.noMoneyError = "계정 잔액이 없는 상태에서는 작업을 수행할 수 없습니다.";



____loclib.waitConf = "이전 거래가 블록 체인에서 지워질 때까지 기다려야 합니다";
____loclib.postWaitConf = "게시물이 블록 체인 확인을 기다리고 있습니다";



// notifications

____loclib.ntnow = "지금"
____loclib.ntlasthour = "이번 시간"
____loclib.nttoday = "오늘"
____loclib.ntmounth = "이번 달"
____loclib.ntearlier = "이전"


____loclib.nodeWalletAdd = "주소 추가에는 시간이 걸릴 수 있습니다. 계속할까요?"
____loclib.nodeEnableNoteHeader = "참고"
____loclib.nodeEnableNote = "노드를 켜려면 최대 5GB의 RAM이 필요할 수 있습니다. 충분한지 확인하십시오. 행복한 스테이킹 되세요! "


/// 1301

____loclib.address = "주소"
____loclib.privatekey = "개인 키"
____loclib.qrcode = "QR 코드"
____loclib.addaccount = "계정 추가"
____loclib.entermnimo = "연상단어 또는 개인 키 입력"
____loclib.add = "추가"
____loclib.e13011 = ""+appname+" Desktop을 설치한 후 등록을 계속합니다."
____loclib.e13012 = ""+appname+"이 다운로드를 시작하지 않은 경우 여기를 클릭하여 설치하십시오."
____loclib.e13013 = "이미지 캡션 입력 (선택 사항)"
____loclib.e13014 = "이 파일은 지원되는 형식이 아닙니다:"
____loclib.e13015 = "이 파일이 너무 큽니다:"
____loclib.e13016 = "YouTube, Vimeo 링크를 붙여넣고 Enter를 누르십시오"
____loclib.e13017 = "블록 체인에 로드 중"
____loclib.e13018 = "정말 이 기사를 제거 하시겠습니까?"
____loclib.e13019 = "신규"
____loclib.e13020 = "새 기사 쓰기"
____loclib.youarefollowing = "팔로우 중입니다"
____loclib.follow = "팔로우"
____loclib.blocked = "차단됨"
____loclib.e13021 = "더보기"
____loclib.blockuser = "사용자 차단"
____loclib.unblockuser = "사용자 차단 해제"
____loclib.e13022 = "정말 사용자를 팔로우 해제 하시겠습니까?"
____loclib.unfollow = "팔로우 해제"
____loclib.unblock = "차단 해제"
____loclib.share = "공유"
____loclib.info = "정보"
____loclib.e13023 = "정말 사용자 차단을 해제 하시겠습니까?"
____loclib.e13024 = "개인 로그인 키"
____loclib.e13025 = "새 계정 생성"
____loclib.e13026 = ""+appname+" 가입"

____loclib.e13027 = "서명 유지"
____loclib.e13028 = "유효하지 않은 개인 키를 입력했습니다."
____loclib.e13029 = "메시지가 비어 있습니다."
____loclib.e13030 = "댓글은 댓글 당 1000 자로 제한됩니다."
____loclib.e13031 = "이 댓글 공유"
____loclib.e13032 = "댓글을 삭제 하시겠습니까?"
____loclib.e13033 = "댓글이 제거되었습니다."
____loclib.e13034 = "예"
____loclib.e13035 = "아니요, 취소"
____loclib.hide = "숨기기"
____loclib.e13036 = "이전 댓글보기"
____loclib.e13037 = "답글"
____loclib.remove = "제거"
____loclib.e13038 = "지금 댓글 달고 평판 얻기"
____loclib.e13039 = "지금 댓글 달고 평판 얻기"
____loclib.e13040 = "댓글 권한이 없습니다."
____loclib.complain = "신고"
____loclib.next = "다음"
____loclib.post = "게시"
____loclib.e13041 = ""+appname+" 연결"
____loclib.e13042 = ""+appname+" 프록시"

____loclib.e13043 = ""+appname+" 노드"
____loclib.e13044 = "노드 추가"
____loclib.e13045 = "노드를 찾을 수 없음"
____loclib.e13046 = "주소"
____loclib.e13047 = "WS"
____loclib.e13048 = "이름"
____loclib.e13049 = "상태"
____loclib.e13050 = "프록시를 찾을 수 없음"
____loclib.e13051 = "프록시 사용 안함"
____loclib.e13052 = "프록시에 연결할 수 없음"
____loclib.e13053 = "노드에 연결할 수 없음"
____loclib.e13054 = "프록시 추가"
____loclib.e13055 = "프록시 편집"
____loclib.save = "저장"
____loclib.e13056 = "노드 호스트"
____loclib.close = "닫기"
____loclib.e13057 = "모든 필드를 채우십시오"
____loclib.e13058 = "이 프록시가 이미 목록에 있습니다."
____loclib.delete = "삭제"
____loclib.e13059 = "정말 목록에서 이 프록시를 삭제 하시겠습니까?"
____loclib.e13060 = "프록시 목록"
____loclib.e13061 = "정말로 프록시 사용을 중지 하시겠습니까. (Http 연결) 안전하지 않습니다"

____loclib.e13062 = "노드 편집"
____loclib.onproxy = "프록시에서"
____loclib.locally = "로컬"
____loclib.nodehost = "노드 호스트"
____loclib.e13063 = "RPC 포트"
____loclib.e13064 = "WS 포트"
____loclib.e13065 = "노드 이름"
____loclib.e13066 = "노드 이름을 입력하십시오"
____loclib.e13067 = "RPC 로그인"
____loclib.e13068 = "PRC 인증을위한 로그인"
____loclib.e13069 = "RPC 암호"
____loclib.e13070 = "PRC 인증을위한 비밀번호"
____loclib.e13071 = "모든 필드를 채우십시오"
____loclib.e13072 = "정말로 목록에서 이 노드를 삭제 하시겠습니까?"
____loclib.e13073 = "정말로 프록시 사용을 중지 하시겠습니까. (Http 연결)안전하지 않습니다"
____loclib.notselected = "선택되지 않음"
____loclib.donation = "기부"
____loclib.e13074 = "자금 대기. 주소는 유효합니다."
____loclib.sminutes = "분"
____loclib.e13075 = "이 거래에 대한 시간이 만료되었습니다."
____loclib.reactivate = "재 활성화"
____loclib.e13076 = "전송하려면 이 코드를 스캔하십시오"
____loclib.back = "뒤로"
____loclib.e13077 = "기부자 목록에 프로필 추가"
____loclib.e13078 = "왜 우리는 기부를 요청합니까?"
____loclib.e13079 = ""+appname+"을 사람들에게 제공하는 정규업무로 14개월 이상의 추가시간을 투자했습니다. 시간과 노력 외에도 플랫폼 출시를 돕기 위해 자체자금을 투입했습니다. 이제 우리는 성장을 위한 커뮤니티가 필요합니다."
____loclib.e13080 = "기금은 어떻게 사용됩니까?"
____loclib.e13081 = "기금은 광고를 구매하고 "+appname+"을 더욱 안전하게 만들기 위해 특정 분야의 전문가를 고용하는 데 사용됩니다. 현재 개발팀은 이러한 기부금을 받지 않습니다. 가능한 경우 여기에 기금 사용 방법을 게시할 것입니다. "
____loclib.e13082 = "자유를 지지했다는 사실 외에 기부로 얻을 수있는 혜택 :"
____loclib.e13083 = "기부에 대한 감사의 표시로 약간의 Pocketcoin 선물을 받게 됩니다."
____loclib.e13084 = "또한, 그룹 채팅을 구축할 때 귀하는 플랫폼이 성장하더라도 "+appname+"팀에 직접 액세스할 수있는 특별한 기부자 그룹의 구성원이 됩니다."
____loclib.e13085 = ""+appname+" 프로필에 대한 링크가 아래에 나열되어 더 많은 사람들이 귀하의 게시물로 이동하도록 유도합니다 (그렇게하지 말라고 요청하지 않는 한)"
____loclib.e13086 = "지금 분산 웹 지원"
____loclib.e13087 = "비트 코인, 라이트 코인"

____loclib.e13088 = ""+appname+"을 지원하기 위해 기부한 "+appname+" 회원"
____loclib.thankyou = "감사합니다!"
____loclib.e13089 = ""+appname+" 프로필을 기부자 목록에 나열하려면 기부에 대한 정보를 보내주십시오"
____loclib.e13090 = "기부자 목록에 나를 추가"
____loclib.e13091 = "아니면 이메일을 보낼 수 있습니다."
____loclib.e13092 = "공개 키와 금액으로."
____loclib.finish = "완료"
____loclib.e13093 = "기부 방법을 선택하십시오"
____loclib.e13094 = "문제가 발생했습니다. 페이지를 새로 고침하고 다시 시도하십시오 (오류: 0001)"
____loclib.e13095 = "자유를위한 우리의 일을 지원해 주셔서 감사합니다. 우리는 모든 돈을 소중하게 사용할 것입니다. "
____loclib.e13096 = "기부 금액을 입력하십시오"
____loclib.e13097 = "문제가 발생했습니다. 페이지를 새로 고침하고 다시 시도하십시오 (오류: 0002)"
____loclib.e13098 = "외부 사이트 또는 리소스에 대한 링크 추가"
____loclib.e13099 = "이미지 업로드"
____loclib.e13100 = "업로드할 파일을 선택하려면 여기를 클릭하십시오"
____loclib.e13101 = "또는 드래그 앤 드롭"
____loclib.e13102 = "외부 사이트에 링크 추가"
____loclib.e13103 = "Url이 유효하지 않습니다"
____loclib.e13104 = "최대 6 개의 이미지 허용"
____loclib.e13105 = "노드 관리"
____loclib.e13106 = ""+appname+" 노드"
____loclib.e13107 = "노드 관리는 애플리케이션으로 수행할 수 있습니다."
____loclib.e13108 = "Electron 프록시 인터페이스와 연결되지 않았습니다."

____loclib.e13109 = "Pocketcoin을 받고 등록을 계속하려면 그림에 있는 단어를 입력하십시오"
____loclib.e13110 = "단어 입력"
____loclib.next = "다음"
____loclib.refresh = "새로 고침"
____loclib.e13111 = "최신 "+appname+" 업데이트를 받으려면 이메일을 추가하십시오."
____loclib.e13112 = "이메일 입력"
____loclib.e13113 = "이메일 추가"
____loclib.skip = "건너 뛰기"
____loclib.e13114 = "이상한 움직임으로 인해 등록에 문제가 있습니다."
____loclib.e13115 = "이메일을 보내주십시오"
____loclib.e13116 = "코인을 받고 계좌를 개설하기 위해."
____loclib.e13117 = "잔액 확인"
____loclib.joinnow = "지금 가입"
____loclib.loading = "로드 중"
____loclib.e13118 = "단어가 일치하지 않습니다"
____loclib.e13119 = "이메일을 추가하고 계속"
____loclib.e13120 = "응용 프로그램"
____loclib.e13121 = "여기에 이미지가 없습니다"
____loclib.e13122 = "최신 댓글"

____loclib.e13123 = "게시물 더보기"
____loclib.e13124 = "더 멋진 "+appname+" 게시물!"
____loclib.e13125 = "상위 게시물 섹션이 비어 있습니다!"
____loclib.e13126 = "팔로우한 사람들의 게시물이 여기에 표시됩니다"
____loclib.e13127 = "팔로우한 사람들의 게시물이 여기에 표시됩니다"
____loclib.e13128 = "팔로우한 사람들의 게시물이 여기에 표시됩니다"
____loclib.registration = "등록"
____loclib.editpost = "게시물 편집"
____loclib.removepost = "게시물 제거"


____loclib.reportpost = "게시물 보고"
____loclib.donate = "기부"
____loclib.blockuser = "사용자 차단"
____loclib.more = "더보기"
____loclib.showmore = "더보기"
____loclib.e13129 = "첨부된 이미지"
____loclib.e13130 = "편집됨"
____loclib.e13131 = "이 사용자를 차단했습니다."
____loclib.e13132 = "평가함"
____loclib.e13133 = "공유"
____loclib.e13134 = "이 검색 문자열에 대한 결과가 없습니다"
____loclib.e13135 = "사용자에게 개인 키가 없습니다"
____loclib.e13136 = "모든 게시물"
____loclib.e13137 = "당신의 포켓"
____loclib.e13138 = "인기 게시물"
____loclib.e13139 = ""+appname+"에서 검색"
____loclib.e13140 = "검색 켜기"
____loclib.notifications = "알림"
____loclib.showall = "모두보기"
____loclib.e13141 = "알림 없음"

____loclib.recommendations = "추천"
____loclib.e13142 = "키를 저장했습니다, 더 이상 알리지 않음"
____loclib.e13143 = "중요!"
____loclib.e13144 = "텍스트 복사"
____loclib.e13145 = "장치에 키 저장"
____loclib.e13146 = "게시물 끝"
____loclib.e13147 = "공유"
____loclib.e13148 = "이 게시물에 대해 정말로 불만을 제기 하시겠습니까?"
____loclib.e13149 = "사용자 평가"
____loclib.e13150 = "게시물 평가"
____loclib.e13151 = "아무도 이 게시물을 평가하지 않음"
____loclib.e13152 = "사용자 점수"
____loclib.e13153 = "건너 뛰고 웹사이트로 이동"
____loclib.e13154 = "로그인 정보"
____loclib.e13155 = ""+appname+"을 사용하려면 중앙 소셜네트워크에서 로그인과 암호를 대체하는 개인 암호화 키를 생성해야 합니다."
____loclib.users = "사용자"
____loclib.userstx = "사용자"
____loclib.user = "사용자"
____loclib.postscount = "게시물 수"
____loclib.about = "정보"
____loclib.e13156 = "다음 결과"
____loclib.posts = "게시물"
____loclib.e13157 = "검색 기준"
____loclib.e13158 = "결과 없음"
____loclib.e13159 = "검색할 내용이 비어 있습니다."
____loclib.repost = "재게시"
____loclib.e13160 = "안녕 Pocketeers!"

____loclib.e13161 = "게시물에 태그 추가"
____loclib.e13162 = "태그를 30 개 미만으로 입력할 수 있습니다."
____loclib.e13163 = "포스트에 변경 사항이 없습니다."
____loclib.e13164 = "Pocketpeople에게 귀하의 링크에 대해 알리기 위해 몇 마디를 추가하십시오. 그 내용은 무엇입니까? 왜 중요한가요? 귀하의 의견은 무엇입니까?"
____loclib.e13165 = "비디오 링크가 유효하지 않습니다. 유효한 비디오 URL을 로드하십시오."
____loclib.e13166 = "구출하셨습니다"
____loclib.e13167 = "검열된 웹에서 온 사람들"
____loclib.e13168 = "링크를 통해 가입할 때마다 Pocketcoin을 적립"
____loclib.e13169 = "직접 링크"
____loclib.copy = "복사"
____loclib.e13170 = ""+appname+" 가입 클릭 유도 문안 포함"
____loclib.more = "더보기"
____loclib.e13171 = "좋은 소식입니다. 소셜 미디어 독점으로부터 독립을 얻었습니다. pocketnet.app에서 저와 함께 블록 체인에서 독립적으로 공유하고 채팅할 수 있습니다. 여기에 참여하세요"
____loclib.e13172 = "분산형 블록 체인 플랫폼 "+appname+"에서 이것을 공유하고 싶습니다. 유용하다고 생각하신다면 가입하여, 우리 둘 다 Pocketcoin 암호화폐 보너스를 받을 수 있기를 바랍니다!"
____loclib.e13173 = "이메일로 보내기"
____loclib.e13174 = "소셜 공유"
____loclib.e13175 = "인기 태그"
____loclib.e13176 = "주소 유형"
____loclib.e13177 = "사진 업로드"

____loclib.requiredfields = "필수 필드"
____loclib.e13178 = "프로필에 연결되지 않음"
____loclib.e13179 = "사용되지 않은 목록"
____loclib.e13180 = "인보이스가 성공적으로 생성되었습니다."
____loclib.e13181 = "오퍼 생성 프로세스 중에 오류가 발생했습니다."
____loclib.e13182 = "블록 탐색기"
____loclib.e13183 = "도움말 센터"
____loclib.e13184 = "등록 계속"
____loclib.e13185 = "연결 끊김"
____loclib.e13186 = "프로필 수정"
____loclib.e13187 = "내용"
____loclib.e13188 = "중앙 소셜 네트워크의 로그인과 암호를 대체하는 개인 암호화 키를 저장하십시오"
____loclib.e13189 = "나의 키를 기억했습니다!"
____loclib.e13190 = ""+appname+" 테마"
____loclib.e13191 = "테마 설정"
____loclib.e13192 = "레벨"
____loclib.e13193 = "보너스"
____loclib.e13194 = "평판 및 보상"
____loclib.e13195 = "제한 사항"
____loclib.e13196 = "많이 사용합니다"
____loclib.e13197 = "Pocketcoin 받기"
____loclib.e13198 = "대략적인 대기시간"
____loclib.e13199 = "지금 "+appname+" 가입"

____loclib.e13200 = ""+appname+"으로 돌아가기"
____loclib.e13201 = "베타 참여"
____loclib.e13202 = ""+appname+" 베타 테스트는 1월 24일에 시작됩니다."
____loclib.e13203 = ""+appname+" 베타 테스트 이메일 목록에 참여해 주셔서 감사합니다. 반드시 "+appname+"을 사용할 필요는 없지만 이 이메일을 사용하여 플랫폼을 개선하기 위해 설문 조사를 보낼 것입니다. 인터넷의 미래를 형성하는 데 도움을 주셔서 감사합니다. "
____loclib.e13204 = ""+appname+" 수신 주소"
____loclib.e13205 = "매개 변수"
____loclib.e13206 = "Pocketcoin 금액 받기"
____loclib.e13207 = "금액 보내기"
____loclib.e13208 = "사용 가능"
____loclib.e13209 = "크라우드 펀딩 목록"
____loclib.e13210 = "새로운 거래"
____loclib.e13211 = "링크 복사 및 공유"
____loclib.amount = "금액"
____loclib.label = "레이블"
____loclib.message = "메시지"
____loclib.copylink = "링크 복사"
____loclib.e13211 = "이 필드를 채우십시오"
____loclib.e13212 = "Qr 코드 생성"
____loclib.e13213 = "주소 받기"
____loclib.process = "프로세스"
____loclib.source = "소스"
____loclib.yourmessage = "메시지"
____loclib.e13214 = "Pocketcoin 금액"
____loclib.currency = "통화"


____loclib.e13215 = "통화 선택"
____loclib.e13216 = "통화 금액"
____loclib.e13217 = "이 거래에 대한 시간이 만료되었습니다."
____loclib.e13218 = "블록 체인 확인 대기 중"
____loclib.e13219 = "Pocketcoin을 당신에게 보내기"
____loclib.e13220 = "Pocketcoin 전달됨"
____loclib.errorreload = "문제가 발생했습니다. 페이지를 새로 고침하고 다시 시도하십시오."
____loclib.e13221 = "정말로 이 거래에 대한 정보를 삭제 하시겠습니까? 거래를 중단할 수 없습니다."
____loclib.e13222 = "데스크탑 앱 다운로드-이것은 "+appname+"을 사용하는 가장 검열에 강한 방법입니다. 웹 사이트가 종료 되더라도 데스크탑 응용 프로그램은 여전히 ​​노드를 통해 직접 실행됩니다."
____loclib.e13223 = "Windows 용 "+appname+" 다운로드"
____loclib.e132232 = "macOS 용 "+appname+" 다운로드"
____loclib.e13224 = "Linux 용 "+appname+" 다운로드"
____loclib.e13225 = ""+appname+" 노드"
____loclib.e13226 = "노드 다운로드"
____loclib.e13227 = "Windows 용 "+appname+" 노드 다운로드"
____loclib.e13228 = "Linux 용 "+appname+" 노드 다운로드"
____loclib.e13229 = "잘못된 개인 키"
____loclib.e13230 = "정의되지 않은 연결 오류"

____loclib.e13231 = "연결 끊김"
____loclib.e13232 = "노드와 연결할 수 없음"
____loclib.e13233 = "이 주석은 제거되었습니다"
____loclib.e13234 = "Opreturn 오류 / 41"
____loclib.e13235 = "댓글을 두 번 평가할 수 없습니다."
____loclib.e13236 = "이 주석은 제거되었습니다."
____loclib.e13237 = "자신을 평가할 수 없습니다."
____loclib.e13238 = "댓글 전송 오류. 잠시 후 다시 시도하십시오/ 37 "
____loclib.e13239 = "코멘트 전송 오류/ 35"
____loclib.e13240 = "답장하는 댓글이 사용자에 의해 삭제되었습니다."
____loclib.e13241 = "이 주석이 너무 깁니다. 분리하십시오"
____loclib.e13242 = "이 사람에 의해 차단되었으므로, 게시물에 댓글을 달 수 없습니다"
____loclib.e13243 = "24 시간 동안 찬성 댓글 한도에 도달했습니다."
____loclib.e13244 = "24 시간 동안 댓글 편집 한도에 도달했습니다."
____loclib.e13245 = "24 시간 동안 댓글을 보낼 수있는 한도에 도달했습니다."
____loclib.e13246 = "다른 사람의 게시물을 편집하려고 합니다."
____loclib.e13247 = "24 시간 동안 5 개의 게시물 편집 제한에 도달했습니다."
____loclib.e13248 = "블록 체인 블록 당 한 번만 편집할 수 있습니다. 잠시 후 다시 시도하십시오. "
____loclib.e13249 = "자신을 차단할 수 없습니다."
____loclib.e13250 = "이미이 사용자를 차단했습니다."
____loclib.e13251 = "이 사용자를 차단하지 않았습니다"
____loclib.e13252 = "트랜잭션이 잘못됨"
____loclib.e13253 = "자신을 추천할 수 없습니다."
____loclib.e13254 = "사용자 이름이 너무 깁니다"
____loclib.e13255 = "이 사용자 이름은 이미 사용 중입니다."
____loclib.e13256 = "이 게시물이 너무 깁니다. 분리하십시오."
____loclib.e13257 = ""+appname+" 평판 점수는 아직 불만 등록을 허용하지 않습니다."
____loclib.e13258 = "24 시간 동안 불만 한도에 도달했습니다. "

____loclib.e13259 = "자신의 게시물을 신고할 수 없습니다"
____loclib.e13260 = "이 게시물에 대한 신고를 이미 등록하셨습니다."
____loclib.e13261 = "키 저장"
____loclib.e13262 = "나중에"
____loclib.e13263 = "이 사용자의 알림 구독 및 켜기"
____loclib.e13264 = "알림없이 구독"
____loclib.e13265 = "귀하의 이름은 더 이상 사용할 수 없습니다. 다른 이름을 선택하십시오."
____loclib.e13266 = "흰색 테마"
____loclib.e13267 = "어두운 테마"
____loclib.e13268 = "Coinstake 승리"
____loclib.e13269 = "거래 수신"
____loclib.e13270 = "업보 수신"
____loclib.e13271 = "댓글 받기"
____loclib.e13272 = "응답 받기"
____loclib.e13273 = "새 팔로워"
____loclib.e13274 = "구출된 사용자"
____loclib.e13275 = "댓글 점수"
____loclib.e13276 = "삽입 동영상 표시"
____loclib.e13277 = "동영상 자동 재생"
____loclib.e13278 = "자동으로 "+appname+" 시작"
____loclib.e13279 = "채팅"
____loclib.e13280 = "태그"
____loclib.e13281 = "마지막 댓글"
____loclib.e13282 = "텔레그램 봇 토큰"
____loclib.e13283 = "텔레그램 채널에서 게시"
____loclib.e13284 = "채팅에 봇을 추가하고 선택"
____loclib.e13285 = "텔레그램에서 게시하기 전에 질문"
____loclib.e13286 = "텔레그램으로 보내기 전에 확인"
____loclib.e13287 = "텔레그램 채널로 보내기"
____loclib.video = "비디오"
____loclib.e13288 = "메인 페이지 Vidgets"
____loclib.e13289 = "텔레그램과 통합"

____loclib.system = "시스템"
____loclib.e13290 = "팔로우 하시겠습니까"
____loclib.e13291 = "정말 텔레그램에 메시지를 보내시겠습니까?"
____loclib.send = "보내기"
____loclib.e13292 = "이 호스트에 이미 노드가 있습니다."
____loclib.e13293 = "내부 오류"
____loclib.e13294 = "PGSQL 데이터베이스 활성화"
____loclib.e13295 = "DB 호스트"
____loclib.e13296 = "DB 포트"
____loclib.e13297 = "DB Max"
____loclib.e13298 = "DB 유휴 시간 초과, ms"
____loclib.e13298 = "DB 이름"
____loclib.e13300 = "DB 사용자"
____loclib.e13031 = "DB 비밀번호"
____loclib.e13302 = "프록시 서버 켜기"
____loclib.e13303 = "프록시 https 서버 포트"
____loclib.e13304 = "프록시 wss 서버 포트"
____loclib.e13305 = "서버 SSL 키, pem"
____loclib.e13306 = "서버 SSL 인증서, pem"
____loclib.e13307 = "서버 SSL 암호"
____loclib.e13308 = "Firebase 관리자 SDK"
____loclib.e13309 = "크레인 주소"
____loclib.e13310 = "Captcha 활성화"
____loclib.e13311 = "IP 리미터 활성화"
____loclib.e13312 = "서버"

____loclib.e13313 = "데이터베이스, PG SQL"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "기타"
____loclib.e13316 = "사용"
____loclib.e13317 = "바이너리 경로"
____loclib.e13318 = "구성 경로"
____loclib.e13319 = "데이터 경로"
____loclib.e13320 = "스테이킹 주소"
____loclib.e13321 = "스테이킹을 위해 계정 주소를 노드로 가져 오기"
____loclib.e13322 = "상태"
____loclib.e13323 = "스테이킹 주소"
____loclib.e13324 = "마지막 블록"
____loclib.control = "컨트롤"
____loclib.setup = "설정"
____loclib.e13325 = "정말 텔레그램에서 메시지를 게시 하시겠습니까?"
____loclib.e13326 = "게시"
____loclib.e13327 = "정말로 프록시를 다시 사용 하시겠습니까?"
____loclib.e13328 = "댓글에 좋아요!"
____loclib.e13329 = "새 댓글 좋아요"
____loclib.e13330 = "게시물 공유 :"
____loclib.e13331 = "게시물 공유 :"
____loclib.e13332 = "새로운 게시물이 있습니다 :"
____loclib.e13333 = "수신 거래"
____loclib.e13334 = "축하합니다. 이겼습니다"
____loclib.e13335 = "최신 Pocketcoin"
____loclib.e13336 = "메시지 포함 :"
____loclib.e13337 = "게시물에 댓글 달기 :"
____loclib.e13338 = "댓글에 답변했습니다 :"
____loclib.reply = "답장"
____loclib.e13339 = "검열된 웹에서 누군가를 구했습니다. 코인이 오고 있습니다!"
____loclib.e13340 = "축하합니다!"
____loclib.e13341 = "팔로우 함"
// <%=e("e13337")%> <%=e("e13037").toUpperCase()%> <%=e("")%> self.app.localization.e("e13337")
____loclib.e13342 = "새로운 팔로워"
____loclib.e13343 = "게시물을 찬성했습니다"
____loclib.e13344 = "새로운 찬성"
____loclib.e13345 = "비공개 메시지를 보냈습니다."
____loclib.e13346 = "새로운 메시지가 있습니다"
____loclib.e13347 = ""+appname+" 업데이트를 사용할 수 있습니다. 지금 업데이트를 적용 하시겠습니까?"
____loclib.e13348 = "아니요, 나중에"
____loclib.e13349 = ""+appname+" 업데이트를 사용할 수 있습니다. 새 버전을 다운로드하려면 페이지로 이동 하시겠습니까?"
____loclib.e13350 = "지금 "+appname+" 가입 및 Pocketcoin 적립"
____loclib.e133512 = "사람들이 당신을 따르기를 원하는지 결정할 수 있도록 당신에 대해 몇 마디 적어주세요"

____loclib.downloaded = "다운로드됨";
____loclib.downloadedEmpty = "다운로드한 게시물이 여기에 표시됩니다.";
____loclib.downloadVideo = "비디오 다운로드";
____loclib.selectQuality = "품질 선택:";
____loclib.downloadedVideos = "다운로드한 동영상";
____loclib.deleteAllDownloadedVideos = "다운로드한 모든 동영상 삭제";
____loclib.deleteVideoDialog = "이 동영상을 삭제하시겠습니까?";
____loclib.deleteAllVideoDialog = "모든 동영상을 삭제하시겠습니까?";
____loclib.videosDeleted = "동영상이 삭제되었습니다!";
____loclib.noDownloadedVideos = "다운로드한 동영상이 없습니다.";

____loclib.buy = '구입';
