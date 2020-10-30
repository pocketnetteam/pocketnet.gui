if(typeof loclib == 'undefined' || !loclib)
	loclib = {};

	loclib.ru = {};

var ____loclib = loclib.ru;

//authorization

____loclib.id0 = "Войти в существующий аккаунт";	
____loclib.id1 = "Если вы уже зарегистрированны в системе, выполните вход";	
____loclib.loadqrcode = "Загрузить QR Код";
____loclib.stay = "Оставаться в системе";
____loclib.signin = "Войти";
____loclib.orcreate = "Или создать новый аккаунт";
____loclib.createnew = "Создать новый аккаунт";
____loclib.staysafe = "Это небезопасно, вы желаете продолжить?";

// Register a New Account
____loclib.id71 = "Создать новый аккаунт";
____loclib.id72 = "Уже имеете аккаунт? Войти";

____loclib.rtip1 = "Обязательно запишите свой приватный ключ!";
____loclib.rtip2 = function(mobile){
	var h = 'Далее будет сгенерирован ваш приватный ключ. Запишите его и сохраните QR код на ' 

	if(mobile){ h += 'вашем устройстве' } else { h+='компьютере' }

	h+=' и не потеряйте их. Мы не храним ваши персональные данные. Приватный ключ не может быть востановлен!'

	return h 
}

____loclib.generatepkey = "Создать приватный ключ";
____loclib.rtip3 = "Запишите этот ключ для входа и сохраните QR код. Мы не храним ваши персональные данные. Приватный ключ не может быть востановлен! ";
____loclib.saveqrcode = "Сохранить QR код" 
____loclib.copyprivkey = "Скопировать приватный ключ"
____loclib.rcontinue = "Продолжить"
____loclib.idle = "Задержка не непродолжительное время"
____loclib.congratulations = 'Поздравляем! Вы в <span class="pnlabel">POCKETNET</span>'
____loclib.creatingpreloader = 'Аккаунт в процессе создания'
____loclib.removepaste = 'Мы убрали возможность вставки в эту форму.'
____loclib.filedamaged = "Файл поврежден"
____loclib.keysnotmatch = 'Сгенерированный ключ и введенный вами не совпадают'
____loclib.confirmkey = 'Впечатайте ваш приватный ключ здесь'
____loclib.successfullycopied = "Ключ был скопирован в буфер обмена"
____loclib.confirmkeyLabel = "Подтвердите свой приватный ключ. Впечатайте ключ в поле или <b>загрузите QR код</b>"
____loclib.repeatetocreate = "Вернуться к созданию ключа"
____loclib.confirmcreate = "Создать аккаунт"

//user activation

____loclib.useractivation = "Активация пользователя";	
____loclib.wesentmoney = "Мы отослали вам несколько коинов для продолжения процесса регистрации, подождите пока они будет зачислены";	
____loclib.wesentmoneym = "Мы уже вам несколько коинов для регистрации";


____loclib.wesentmoneydelay = "Процесс занимает больше времени чем обычно, подождите еще";	
____loclib.funetworkproblems = "Возникли некоторые проблемы с соединением. Пожалуйста, повторите позднее";


____loclib.pleasewait = "Пожалуйста подождите";	
____loclib.next = "Далее";	
____loclib.welcometopocketnet = "Приветствуем вас в POCKETNET";	
____loclib.continue = "Продолжить";	

//user page

____loclib.rstate = "Статус";	
____loclib.rprofile = "Профиль";	
____loclib.rsettings = "Настройки";	
____loclib.rwallet = 'Кошелек';	
____loclib.raccounts = 'Аккаунты';	
____loclib.pnetAddress = 'Адрес POCKETNET';	
____loclib.profile = 'Профиль';	
____loclib.signout = 'Выйти';

//send



//send

____loclib.postlabel = "Пожертвование связанное с публикацией";	
____loclib.donationlabel = "";	
____loclib.donationwel = "Если вы хотите отблагодарить автора публикации вы можете воспользоваться транзакцией Pocketnet";
____loclib.donationwela = "Отправить с помощью Pocketnet";	
____loclib.donationwelan = "Также можно использовать другие криптовалютные системы";	
____loclib.successfullycopiedaddress = "Адрес был успешно скопирован";	
____loclib.urlsuccesscopied = "Ссылка была успешно скопирована"

//wallet

____loclib.wrecieve = "Получить коины на адрес";	
____loclib.wcopyshare = "Скопируйте и поделитесь адресом";	
____loclib.wqrcode = "QR код";		
____loclib.wcopeaddress = "Скопировать адрес";	
____loclib.wcreatelink = "Или создать ссылку для платежа";	
____loclib.required = "Необходимо";	
____loclib.wgetlink = "Получить ссылку";	
____loclib.waddresses = "Адреса";	
____loclib.waddress = "Адрес";	
____loclib.wbalance = "Баланс";	
____loclib.wpercente = "Процент";	
____loclib.waddaddress = "Открыть новый адрес";	
____loclib.wrecieve = "Получить";	
____loclib.wrecieveon = "Получить на";	
____loclib.wcopyshareorcreate = "Скопируйте и поделитесь адресом или создайте ссылку для платежа";
____loclib.wdgetlink = "Получить ссылку";	
____loclib.wdqrcode = "QR код";
____loclib.wdcopyaddress = "Скопировать адрес";	
____loclib.wdpleasefill = "Пожалуйста, заполните необходимые поля";
____loclib.wduseqr = "Используйте этот QR код, чтобы получить коины на этот адрес";	
____loclib.wdaddress = "Адрес";
____loclib.wdamount = "Сумма";	
____loclib.wdlabel = "Надпись";	
____loclib.wdmessage = "Сообщение";	
____loclib.wsend = "Отправить";
____loclib.calcfeesandsend = "Рассчитать комиссию и отправить";	
____loclib.wstrfees = "Комиссия транзакции";	
____loclib.wsfees = "Комиссия";	

____loclib.wssendto = "ОТОСЛАТЬ КОИНЫ НА";	
____loclib.wssendb = "ОТОСЛАТЬ";	

____loclib.tacaddress = 'Адрес Аккаунта';	
____loclib.twallet = "Кошелек";	
____loclib.twalletaddresses = "Адреса кошелька";	
____loclib.tTotal = "Итого";	
____loclib.wsselect = "Выберите источник";	
____loclib.wsenter = "Введите адрес или выберите";	
____loclib.wsreciever = "Адрес получателя";	
____loclib.wsamount = "Сумма";	
____loclib.wsamountof = "Сумма транзакции";	
____loclib.wsincludefees = "Включение комиссии в сумму";	
____loclib.wsrecieverpay = 'Отправитель платит';	
____loclib.wssenderpay = 'Получатель платит';	
____loclib.wdselectfrom = "Выбрать";	

____loclib.wdenteramount = "Введите сумму";	
____loclib.wdmessageplaceholder = "Для чего эта транзакция?";
____loclib.wrenteraddress = 'Введите адрес';
____loclib.wrenteraddressselect = "Введите адрес или выберите";
____loclib.wreturntoeallet = "ВЕРНУТЬСЯ В КОШЕЛЕК";	
____loclib.linkCreated = 'ССЫЛКА СОЗДАНА';
____loclib.waddresswascop = "Адрес был скопирован в буфер бомена";
____loclib.wqrcodecreated = 'QR КОД СОЗДАН';
____loclib.wlinkcreating = 'СОЗДАНИЕ ССЫЛКИ';
____loclib.wqrcodecreating = 'СОЗДАНИЕ QR КОДА';
____loclib.wdoptions = 'НАСТРОЙКИ';
____loclib.wssuccessfully = "Транзакция была успешно отослана";
____loclib.wscalculatefees = 'РАСЧЕТ КОМИССИИ';
____loclib.wsaddressnotv = "Адрес введен неверно";

//user profile
____loclib.uaddaddressdona = "Добавить адрес для пожертвований";
____loclib.uaddaddressdonaplace = "Введите адрес";
____loclib.uchangeicon = "Изменить иконку пользователя";
____loclib.utip1 = "Вы должны ввести имя пользователя и установить иконку прежде чем пользоваться POCKETNET";
____loclib.upicset = "Установить иконку пользователя";
____loclib.upic = "Иконка пользователя";
____loclib.uuserinfo = "Информация о пользователе";
____loclib.usave = "Сохранить";
____loclib.ucancel = "Отмена";
____loclib.uwaitb = "Ожидание подтверждений для сохранения информации";
____loclib.uchanges = "Вы не ввели изменений";
____loclib.uchangesvalid = "Вы должны ввести имя пользователя и установить иконку";

____loclib.uname = "Имя";
____loclib.ulanguage = "Язык";
____loclib.uabout = "О себе";
____loclib.uwebsite = "Веб сайт";
____loclib.uaddresesd = "Адреса для пожертвований";
____loclib.usavechanges = "Вы хотите сохранить изменения?";

//ustate
____loclib.sreps = "Репутация и ограничения";
____loclib.sdisconnected = "Отсоединен от ноды";
____loclib.suseractivation = "Активация пользователя";
____loclib.sprofile = "Профиль";
____loclib.spc = "Количество постов";
____loclib.ssc = "Количество звезд";
____loclib.stp = "Триальный период";
____loclib.srep = "Репутация";

//accounts
____loclib.aaddedacc = "Добавленные аккаунты";
____loclib.acure = "Текущий";
____loclib.aaddacc = "Добавить аккаунт";
____loclib.ascheduler = "Планировщик задач";
____loclib.aused = "Этот адрес уже использоуется на этом устройстве";


//author
____loclib.sub = "Подписаться";
____loclib.unsub = "Отписаться";
____loclib.joined = "Вступил в сообщество";
____loclib.shares = "ПУБЛИКАЦИИ";
____loclib.uposts = "ПУБЛИКАЦИИ";
____loclib.myuposts = "МОИ ПУБЛИКАЦИИ";
____loclib.followers = "ПОДПИСЧИКИ";
____loclib.following = "ПОДПИСКИ";
____loclib.settings = "УПРАВЛЕНИЕ";
____loclib.anofollowers = "Этот пользователь еще не имеет подписчиков";
____loclib.aynofollowers = "У вас еще нет подписчиков";
____loclib.anofollowing = "этот пользователь еще ни на кого не подписан";
____loclib.aynofollowing = "Вы еще ни на кого не подписаны";

//lenta
____loclib.lloadmore = "Загрузить больше публикаций!";
____loclib.lloadprev = "Загрузить свежие материалы"
____loclib.lend = "Конец ленты";
____loclib.zerop = "У этого автора еще нет публикаций";
____loclib.zeroy = "У вас еще нет публикаций, поделитесь чем-нибудь!";

____loclib.llogin = 'Перед тем как продолжить, вам необьходимо войти в систему';
____loclib.lcomlaindialog = "Вы действительно хотите пожаловаться на данный пост?";
____loclib.lunsubscribe = "Вы действительно хотите отписаться от пользователя?";
____loclib.lprivatepublic = "Вы хотели бы сделать публичную подписку или приватную?";
____loclib.lprivate = "Приватная";
____loclib.lpublic = "Публичная";

//share
____loclib.newShare = "Новая публикация";
____loclib.scaption = "Заголовок";
____loclib.whatsnew = "Что нового?";
____loclib.saddlink = "Добавить ссылку на сайт или на видео";
____loclib.saddimages = "Прикрепить изображения";
____loclib.sarticle = "Написать статью";
____loclib.stelegram = "Отправить в телеграм"
____loclib.snothing = "Ничего";
____loclib.sposttime = "Опубликовать по времени";
____loclib.spostnow = "Опубликовать сейчас";
____loclib.stimenotselected = "Время не выбрано";
____loclib.spost = "Опубликовать";
____loclib.sdate = "Дата";
____loclib.stime = "Время";
____loclib.snotags = "Добавить тег";
____loclib.expandvideo = "Нажмите, чтобы расширить";
____loclib.emptymessage = "Сообщение пустое";
____loclib.emptytags = "Пожалуйста, добаьте теги";
____loclib.emptyutxo = "На адресе нет коинов";
____loclib.networkerror = "Ошибка сети";
____loclib.maximages = "Разрешено загружать максимум 6 изображений";
____loclib.sharenow = "Вы хотите опубликовать этот контент сейчас?";
____loclib.pastdate = 'Указано прошедшее время';
____loclib.timenotselected = 'Время не выбрано';
____loclib.addtags = 'Добавить теги';
____loclib.tnews = "новости";
____loclib.timages = "изображения";
____loclib.tvideos = "видео";
____loclib.tmarket = "магазин";
____loclib.tsport = "спорт";

//menu
____loclib.signinmenu = "Войти";
____loclib.signupmenu = "Регистрация";
____loclib.aboutmenu = "узнать больше";
//footer
____loclib.aboutus = "О нас";



// Dialog Box Options
____loclib.daccept = "Подтвердить";
____loclib.dcancel = "Отмена";
____loclib.dyes = "Да";
____loclib.dno = "Нет";
____loclib.dsa = "Не показывать больше";

// Messages

____loclib.coinbaseSuccess = function(v){
	return "<b>Поздравляем!</b> " + " Вы выиграли <b>" + v + " POC</b>"
}
____loclib.userSent = function(v){
	return "отослал вам <b>" + v + " POC</b>"
}



____loclib.refferalUserMessage = "Congrats! You rescued someone from the censored web."




____loclib.subscribeUserMessage = "подписался на вас"
____loclib.unsubscribeUserMessage = "отписался от вас"
____loclib.gotoprofileMessage = "перейти в профиль"
____loclib.upvoteShareMessage = "поставил оценку ващему посту"

// Errors

____loclib.error = "Ошибка";
____loclib.checkScoreError = "Необходимо заполнить профиль перед тем как пользоваться Pocketnet. Вы бы хотели сделать это сейчас?";
____loclib.checkScoreErrorLight = "Аккаунт не активирован";
____loclib.timestamperror = "Время в приложении и на ноде не совпадают";
____loclib.postLimitLight = "Вы достигли лимита публикаций";
____loclib.scoreLimitLight = "Вы достигли лимита выставления оценок";
____loclib.doubleLimitLight = "Вы уже ставили оценку этой публикации";

____loclib.SelfSubscribeError = "Невозможно подписаться на себя";
____loclib.DoubleSubscribeError = "Вы уже подписаны на этот аккаунт. Обновите страницу";
____loclib.InvalideSubscribeError = "Возникла ошибка при отписке от аккаунта. Обновите страницу";
____loclib.ChangeInfoLimitError = "Вы достигли лимита на изменение информации о себе. Попробуйте позднее";
____loclib.SelfScoreError = "Невозможно поставить оценку себе";

	


____loclib.networkerror = "Возникли некоторые проблемы во взаимодействии между нодой и вашим аккаунтом";

____loclib.canSpendError = "У вас нет незаблокированных денег. Для совершения действия необходимо подождать";
____loclib.noMoneyError = "У вас нет денег";

____loclib.waitConf = "Пожалуйста подождите пока предыдущие транзакции будут обработаны";
____loclib.postWaitConf = "Пост ожидает подтверждения";

____loclib.nodeWalletAdd = 'Добавление адреса может занять некоторое время. Продолжить?'
____loclib.nodeEnableNoteHeader = 'Note'
____loclib.nodeEnableNote = 'That turning on a node may take up to 5GB of RAM. Make sure you have enough. Happy staking!'
