if(typeof loclib == "undefined" || !loclib)
	loclib = {};

	loclib.ru = {};

var appname = window.pocketnetproject || "Pocketnet"



var ____loclib = loclib.ru;

//time

____loclib.fewseconds = "Секунду назад";	
____loclib.oneminute = "Минуту назад";	

____loclib.minutes = function(v){
return v + " минут назад"
}

____loclib.tenminutes = "Десять минут назад";	
____loclib.halfanhour = "Час назад";	
____loclib.anhour = "Час назад";	
____loclib.today = "Сегодня в";	

//authorization

____loclib.id0 = "Войти в существующий аккаунт";	
____loclib.id1 = "Если вы уже зарегистрированны в системе, выполните вход";	
____loclib.loadqrcode = "Загрузить QR Код";
____loclib.stay = "Оставаться в системе";
____loclib.signin = "Войти";
____loclib.orcreate = "Или создать новый аккаунт";
____loclib.createnew = "Создать новый аккаунт";
____loclib.staysafe = "Это небезопасно, вы желаете продолжить?";
____loclib.or = "Или";

// Register a New Account
____loclib.id71 = "Создать новый аккаунт";
____loclib.id72 = "Уже имеете аккаунт? Войти";

____loclib.rtip1 = "Обязательно запишите свой приватный ключ!";
____loclib.rtip2 = function(mobile){
	var h = "Далее будет сгенерирован ваш приватный ключ. Запишите его и сохраните QR код на " 

	if(mobile){ h += "вашем устройстве" } else { h+="компьютере" }

	h+=" и не потеряйте их. Мы не храним ваши персональные данные. Приватный ключ не может быть востановлен!"

	return h 
}

____loclib.generatepkey = "Создать приватный ключ";
____loclib.rtip3 = "Запишите этот ключ для входа или сохраните QR код. Мы не храним ваши персональные данные. Приватный ключ не может быть востановлен! ";
____loclib.saveqrcode = "Сохранить QR код" 
____loclib.copyprivkey = "Скопировать приватный ключ"
____loclib.rcontinue = "Продолжить"
____loclib.idle = "Задержка не непродолжительное время"
____loclib.congratulations = "Поздравляем! Вы в <span class='pnlabel'>"+appname+"</span>"
____loclib.creatingpreloader = "Аккаунт в процессе создания"
____loclib.removepaste = "Мы убрали возможность вставки в эту форму."
____loclib.filedamaged = "Файл поврежден"
____loclib.keysnotmatch = "Сгенерированный ключ и введенный вами не совпадают"
____loclib.confirmkey = "Впечатайте ваш приватный ключ здесь"
____loclib.successfullycopied = "Ключ был скопирован в буфер обмена"
____loclib.urlsuccesscopied = "Ссылка была успешно скопирована"
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
____loclib.welcometopocketnet = "Приветствуем вас в "+appname+"";	
____loclib.continue = "Продолжить";	

//user page

____loclib.rstate = "Репутация";	
____loclib.rprofile = "Профиль";	
____loclib.rsettings = "Настройки";	
____loclib.rwallet = "Кошелек";	
____loclib.raccounts = "Аккаунты";	
____loclib.rsystem = "Система";
____loclib.rconnection = "Подключение";
____loclib.pnetAddress = "Адрес "+appname+"";	
____loclib.profile = "Профиль";	
____loclib.signout = "Выйти";

//send



//send

____loclib.postlabel = "Пожертвование связанное с публикацией";	
____loclib.donationlabel = "Пожертвование";	
____loclib.donationwel = "Если вы хотите отблагодарить автора публикации вы можете воспользоваться транзакцией "+appname+"";
____loclib.donationwela = "Отправить с помощью "+appname+"";	
____loclib.donationwelan = "Также можно использовать другие криптовалютные системы";	
____loclib.successfullycopiedaddress = "Адрес был успешно скопирован";	


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

____loclib.tacaddress = "Адрес Аккаунта";	
____loclib.twallet = "Кошелек";	
____loclib.twalletaddresses = "Адреса кошелька";	
____loclib.tTotal = "Итого";	
____loclib.wsselect = "Выберите источник";	
____loclib.wsenter = "Введите адрес или выберите";	
____loclib.wsreciever = "Адрес получателя";	
____loclib.wsamount = "Сумма";	
____loclib.wsamountof = "Сумма транзакции";	
____loclib.wsincludefees = "Включение комиссии в сумму";	
____loclib.wsrecieverpay = "Отправитель платит";	
____loclib.wssenderpay = "Получатель платит";	
____loclib.wdselectfrom = "Выбрать";	

____loclib.wdenteramount = "Введите сумму";	
____loclib.wdmessageplaceholder = "Для чего эта транзакция?";
____loclib.wrenteraddress = "Введите адрес";
____loclib.wrenteraddressselect = "Введите адрес или выберите";
____loclib.wreturntoeallet = "ВЕРНУТЬСЯ В КОШЕЛЕК";	
____loclib.linkCreated = "ССЫЛКА СОЗДАНА";
____loclib.waddresswascop = "Адрес был скопирован в буфер бомена";
____loclib.wqrcodecreated = "QR КОД СОЗДАН";
____loclib.wlinkcreating = "СОЗДАНИЕ ССЫЛКИ";
____loclib.wqrcodecreating = "СОЗДАНИЕ QR КОДА";
____loclib.wdoptions = "НАСТРОЙКИ";
____loclib.wssuccessfully = "Транзакция была успешно отослана";
____loclib.wscalculatefees = "РАСЧЕТ КОМИССИИ";
____loclib.wsaddressnotv = "Адрес введен неверно";

//user profile
____loclib.uaddaddressdona = "Добавить адрес для пожертвований";
____loclib.uaddaddressdonaplace = "Введите адрес";
____loclib.uchangeicon = "Изменить иконку пользователя";
____loclib.utip1 = "Вы должны ввести имя пользователя и установить иконку прежде чем пользоваться "+appname+"";
____loclib.utip2 = "Остался последний шаг";
____loclib.upicset = "Установить иконку пользователя";
____loclib.upic = "Иконка пользователя";
____loclib.uuserinfo = "Информация о пользователе";
____loclib.usave = "Сохранить";
____loclib.ucancel = "Отмена";
____loclib.uwaitb = "Ожидание подтверждений для сохранения информации";
____loclib.uchanges = "Вы не ввели изменений";
____loclib.uchangesvalid = "Вы должны ввести имя пользователя и установить иконку";
____loclib.uname = "Имя";
____loclib.unickname = "Псевдоним";
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
____loclib.spv = "Количество постов c видео";
____loclib.ssc = "Количество звезд";
____loclib.ccc = "Количество комментариев";
____loclib.crc = "Количество оценок комментариев";
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
____loclib.joined = "Зарегистрировался";
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

____loclib.blockedusers = "Заблокированные";
____loclib.anoblocked = "Этот пользователь еще никого не заблокировал";
____loclib.aynoblocked = "Вы еще никого не заблокировали";

//lenta
____loclib.lloadmore = "Загрузить больше публикаций!";
____loclib.lloadprev = "Загрузить свежие материалы"
____loclib.lend = "Конец ленты";
____loclib.zerop = "У этого автора еще нет публикаций";
____loclib.zeroy = "У вас еще нет публикаций, поделитесь чем-нибудь!";

____loclib.llogin = "Перед тем как продолжить, вам необьходимо войти в систему";
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
____loclib.stimes = "Очистить пост"
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
____loclib.pastdate = "Указано прошедшее время";
____loclib.timenotselected = "Время не выбрано";
____loclib.addtags = "Добавить теги";
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
	return "<b>Поздравляем!</b> " + " Вы выиграли <b>" + v + " PKOIN</b>"
}
____loclib.coinbaseSuccesspost = function(v){
	return "Поздравляем, вы получили " + v + " Покеткоинов за ваши последние посты!"
}
____loclib.coinbaseSuccesscomment = function(v){
	return "Поздравляем, вы получили " + v + " Покеткоинов за ваши последние комментарии!"
}
____loclib.userSent = function(v){
	return "отослал вам <b>" + v + " PKOIN</b>"
}



____loclib.refferalUserMessage = "Congrats! You rescued someone from the censored web."




____loclib.subscribeUserMessage = "подписался на вас"
____loclib.unsubscribeUserMessage = "отписался от вас"
____loclib.gotoprofileMessage = "перейти в профиль"
____loclib.upvoteShareMessage = "поставил оценку вашему посту"

// Errors

____loclib.error = "Ошибка";
____loclib.checkScoreError = "Необходимо заполнить профиль перед тем как пользоваться "+appname+". Вы бы хотели сделать это сейчас?";
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

____loclib.canSpendError = "Для совершения действия необходимо подождать пока ваши предыдущие транзакции будут приняты блокчейном.";
____loclib.noMoneyError = "У вас нет монет";

____loclib.waitConf = "Пожалуйста подождите пока предыдущие транзакции будут обработаны";
____loclib.postWaitConf = "Пост ожидает подтверждения";
____loclib.actionWaitConf = "Действие ожидает подтверждения в блокчейне";

// notifications
____loclib.ntnow = "Сейчас"
____loclib.ntlasthour = "Час назад"
____loclib.nttoday = "Сегодня"
____loclib.ntmounth = "В этом месяце"
____loclib.ntearlier = "Давно"
____loclib.nodeWalletAdd = "Добавление адреса может занять некоторое время. Продолжить?"
____loclib.nodeEnableNoteHeader = "Note"
____loclib.nodeEnableNote = "Функционирующая Нода "+appname+" может занимать до 5 GB оперативной памяти. Будьте уверены, что вам хватит памяти для этого. Счастливого стейкинга!"

/// 1301

____loclib.address = "Адрес"
____loclib.privatekey = "Приватный ключ"
____loclib.qrcode = "QR Код"
____loclib.addaccount = "Добавить аккаунт"
____loclib.entermnimo = "Введите мнемофразу или приватный ключ"
____loclib.add = "Добавить"
____loclib.e13011 = "Теперь вы продолжите регистрацию после установки "+appname+" Desktop."
____loclib.e13012 = "Если "+appname+" не начал загружаться, нажмите, чтобы загрузить его"
____loclib.e13013 = "Введите подпись к изображению (необязательно)"
____loclib.e13014 = "Формат этого файла не поддерживается:"
____loclib.e13015 = "Размер этого файла слишком большой:"
____loclib.e13016 = "Вставьте ссылку YouTube, Vimeo и нажмите Enter."
____loclib.e13017 = "Происходит загрузка в блокчейн"
____loclib.e13018 = "Вы действительно хотите удалить эту статью?"
____loclib.e13019 = "New"
____loclib.e13020 = "Написать новую статью"
____loclib.youarefollowing = "Вы подписаны"
____loclib.follow = "Подписаться"
____loclib.blocked = "Заблокирован"
____loclib.e13021 = "Показать больше"
____loclib.blockuser = "Заблокировать пользователя"
____loclib.unblockuser = "Разблокировать пользователя"
____loclib.e13022 = "Вы действительно хотите отписаться от пользователя?"
____loclib.unfollow = "Отписаться"
____loclib.unblock = "Разблокировать"
____loclib.share = "Поделиться"
____loclib.info = "Информация"
____loclib.e13023 = "Вы действительно хотите разблокировать пользователя?"
____loclib.e13024 = "Ваш приватный ключ для входа"
____loclib.e13025 = "Создать новый аккаунт"
____loclib.e13026 = "Присоединяйтесь к "+appname+""

____loclib.e13027 = "Оставаться в системе"
____loclib.e13028 = "Вы ввели неверный приватный ключ"
____loclib.e13029 = "Сообщение пустое"
____loclib.e13030 = "Комментарии могут содержать не более 1000 символов."
____loclib.e13031 = "Поделиться этим комментарием"
____loclib.e13032 = "Вы действительно хотите удалить свой комментарий?"
____loclib.e13033 = "Комментарий удален"
____loclib.e13034 = "Да"
____loclib.e13035 = "Нет, отменить"
____loclib.hide = "Скрыть"
____loclib.e13036 = "Показать предыдущие комментарии"
____loclib.e13037 = "Ответы"
____loclib.remove = "Удалить"
____loclib.e13038 = "Комментировать"
____loclib.e13039 = "Комментировать"
____loclib.e13040 = "У вас нет прав на комментирование"
____loclib.complain = "Пожаловаться"
____loclib.next = "Далее"
____loclib.post = "Опубликовать"
____loclib.e13041 = "Подключение к "+appname+""
____loclib.e13042 = ""+appname+" Прокси Сервера"

____loclib.e13043 = ""+appname+" Ноды"
____loclib.e13044 = "Добавить ноду"
____loclib.e13045 = "Ноды не найдены"
____loclib.e13046 = "Адрес"
____loclib.e13047 = "WS"
____loclib.e13048 = "Имя"
____loclib.e13049 = "Статус"
____loclib.e13050 = "Прокси сервера не найдены"
____loclib.e13051 = "Не использовать прокси сервера"
____loclib.e13052 = "Невозможно соединиться с прокси"
____loclib.e13053 = "Невозможно соединиться с нодой"
____loclib.e13054 = "Добавить прокси"
____loclib.e13055 = "Редактировать прокси"
____loclib.save = "Сохранить"
____loclib.e13056 = "Хост ноды"
____loclib.close = "Закрыть"
____loclib.e13057 = "Пожалуйста, заполните все поля"
____loclib.e13058 = "У вас уже есть этот прокси в списке."
____loclib.delete = "Удалить"
____loclib.e13059 = "Вы действительно хотите удалить этот прокси из списка?"
____loclib.e13060 = "Список прокси"
____loclib.e13061 = "Вы действительно хотите прекратить использование прокси и переключиться на небезопасное соединение (HTTP-соединение)"

____loclib.e13062 = "Редактировать Ноду"
____loclib.onproxy = "В памяти прокси"
____loclib.locally = "В памяти устройства"
____loclib.nodehost = "Хост ноды"
____loclib.e13063 = "RPC Порт"
____loclib.e13064 = "WS Порт"
____loclib.e13065 = "Имя ноды"
____loclib.e13066 = "Пожалуйста введите имя ноды"
____loclib.e13067 = "RPC логин"
____loclib.e13068 = "Логин для авторизации PRC"
____loclib.e13069 = "RPC пароль"
____loclib.e13070 = "Пароль для авторизации PRC"
____loclib.e13071 = "Пожалуйста заполните все поля"

____loclib.e13072 =  "Вы действительно хотите удалить эту ноду из списка?"
____loclib.e13073 = "Вы действительно хотите остановить прокси и переключиться на небезопасное соединение (HTTP-соединение)"
____loclib.notselected = "Не выбрано"
____loclib.donation = "Пожертвование"
____loclib.e13074 = "В ожидании средств. Адрес будет действителен в течение"
____loclib.sminutes = "минут"
____loclib.e13075 = "Время для этой сделки истекло."
____loclib.reactivate = "Реактивировать"
____loclib.e13076 = "Отсканируйте этот код, чтобы отправить"
____loclib.back = "Назад"
____loclib.e13077 = "Добавьте свой профиль в список доноров"
____loclib.e13078 = "Why are we asking for donations?"
____loclib.e13079 = "We have spent 14+ months in spare time from full time jobs bringing "+appname+" to people. In addition to time and effort, we have put in our own money to help launch the platform. Now we need the community to step up and help us with growth."
____loclib.e13080 = "How will the funds be used?"
____loclib.e13081 = "Funds will be used to purchase advertising and hire some specific subject matter experts to make "+appname+" even more secure. Current development team will not get any of these donations. Wherever possible, we will post here how we used the funds. "
____loclib.e13082 = "What you will get for your donation besides knowing you supported freedom:"
____loclib.e13083 = "As a sign of our gratitude for donation, you will receive a gift in some amount of Pocketcoin"
____loclib.e13084 = "Also, when we build group chat, you will be a member of a special group of donors that will have direct access to "+appname+" team, even as the platform grows"
____loclib.e13085 = "Link to your "+appname+" profile will be listed below driving more people to your posts (unless you ask us to not do that)"
____loclib.e13086 = "Support Decentralized Web Now"
____loclib.e13087 = "Bitcoin, Litecoin"

____loclib.e13088 = "Пользователи "+appname+", которые сделали пожертвования в поддержку "+appname+""
____loclib.thankyou = "Спасибо!"
____loclib.e13089 = "Если вы хотите, чтобы мы включили ваш профиль "+appname+" в список благотворителей, пришлите нам информацию о вашем пожертвовании."
____loclib.e13090 = "Добавить меня в список благотворителей"
____loclib.e13091 = "Или вы можете отправить нам электронное письмо по адресу"
____loclib.e13092 = "с вашим адресом и суммой"
____loclib.finish = "Завершить"
____loclib.e13093 = "Пожалуйста, выберите способ пожертвования"
____loclib.e13094 = "Что-то пошло не так. Пожалуйста, перезагрузите страницу и попробуйте еще раз (error: 0001)"
____loclib.e13095 = "Спасибо за поддержку нашей работы за свободу. Мы позаботимся о том, чтобы каждая копейка была на счету."
____loclib.e13096 = "Введите сумму пожертвования"
____loclib.e130961 = "Сколько Вы хотите перечислить?"
____loclib.e130962 = "Доступный баланс:"
____loclib.e13097 = "Что-то пошло не так. Пожалуйста, перезагрузите страницу и попробуйте еще раз (error: 0002)"
____loclib.e13098 = "Добавить ссылку на внешний сайт или ресурс"
____loclib.e13099 = "Загрузить изображения"
____loclib.e13100 = "Щелкните здесь, чтобы выбрать файлы для загрузки"
____loclib.e13101 = "или перетащите в это пространство"
____loclib.e13102 = "Добавить ссылку на внешний сайт"
____loclib.e13103 = "URL недействителен"
____loclib.e13104 = "Допускается загружать не более 6 изображений"
____loclib.e13105 = "Управление нодой"
____loclib.e13106 = ""+appname+" Нода"
____loclib.e13107 = "Управление нодой может осуществляться с помощью десктопного приложения"
____loclib.e13108 = "Нет связи с интерфейсом прокси Electron"

____loclib.e13109 = "Пожалуйста, введите слова с картинки, чтобы получить покеткоины и продолжить регистрацию"
____loclib.e13110 = "Введите капчу"
____loclib.next = "Далее"
____loclib.refresh = "Обновить"
____loclib.e13111 = "Добавьте свой адрес электронной почты, чтобы получать последние обновления "+appname+""
____loclib.e13112 = "Введите адрес электронной почты"
____loclib.e13113 = "Добавить адрес электронной почты"
____loclib.skip = "Пропустить"
____loclib.e13114 = "Возникла проблема с вашей регистрацией из-за странной активности вашего ip адреса."
____loclib.e13115 = "Пожалуйста, напишите нам на"
____loclib.e13116 = "для того, чтобы получить монеты и открыть свой счет."
____loclib.e13117 = "Проверить баланс"
____loclib.joinnow = "Присоединиться сейчас"
____loclib.loading = "Загрузка"
____loclib.e13118 = "Буквы введены неверно"
____loclib.e13119 = "Добавить email и продолжить"
____loclib.e13120 = "Приложения"
____loclib.e13121 = "Изображений не найдено"
____loclib.e13122 = "Последние комментарии"

____loclib.e13123 = "Показать больше публикаций"
____loclib.e13124 = "Больше замечательных публикаций "+appname+"!"
____loclib.e13125 = "Раздел лучших публикаций пуст!"
____loclib.e13126 = "Здесь будут отображаться сообщения людей, на которых вы подписаны."
____loclib.e13127 = "Здесь будут отображаться сообщения людей, на которых вы подписаны."
____loclib.e13128 = "Здесь будут отображаться сообщения людей, на которых вы подписаны."
____loclib.registration = "Регистрация"
____loclib.editpost = "Редактировать публикацию"
____loclib.removepost = "Удалить публикацию"
____loclib.opennewwindow = "Открыть пост в новом окне"

____loclib.unsubscribe = "Отписаться"
____loclib.startchat = "Начать чат"
____loclib.reportpost = "Пожаловаться"
____loclib.donate = "Пожертвование"
____loclib.blockuser = "Заблокировать пользователя"
____loclib.more = "Больше"
____loclib.showmore = "Показать больше"
____loclib.e13129 = "Прикрепленные изображения"
____loclib.e13130 = "Редактировано"
____loclib.e13131 = "Вы заблокировали этого пользователя"
____loclib.e13132 = "оценили"
____loclib.e13133 = "Поделиться"
____loclib.e13134 = "По этой строке поиска нет результатов"
____loclib.e13135 = "У пользователя нет закрытого ключа"
____loclib.e13136 = "Вся лента"
____loclib.e13137 = "Ваша лента"
____loclib.e13138 = "Лучшее"
____loclib["Top Posts Over"] = "Лучшее за время"
____loclib.topnext = "Далее"
____loclib.topprevious = "Прошлые"
____loclib.topactual = "Вернуться к актуальным"
____loclib.e13139 = "Поиск в "+appname+""
____loclib.e13140 = "Поиск в"
____loclib.notifications = "Уведомления"
____loclib.showall = "Показать всё"
____loclib.e13141 = "У вас нет уведомлений"

____loclib.recommendations = "Рекоммендации"
____loclib.e13142 = "Я сохранил свой ключ, больше не напоминать мне об этом"
____loclib.e13143 = "Важно!"
____loclib.e13144 = "Скопировать"
____loclib.e13145 = "Сохранить ключ на устройстве"
____loclib.e13146 = "Больше публикаций нет"
____loclib.e13147 = "Поделиться"
____loclib.e13148 = "Вы действительно хотите пожаловаться на этот пост?"
____loclib.e13149 = "оценки пользователей"
____loclib.e13150 = "Рэйтинг публикации"
____loclib.e13151 = "Никто ещё не оценил эту публикацию"
____loclib.e13152 = "Оценки пользователей"
____loclib.e13153 = "Пропустить и перейти на сайт"
____loclib.e13154 = "Ваша регистрационная информация"
____loclib.e13155 = "Чтобы использовать "+appname+", вам необходимо сгенерировать свой приватный криптографический ключ, который заменяет логин и пароль централизованных социальных сетей."
____loclib.users = "Пользователи"
____loclib.userstx = "Пользователя"
____loclib.user = "Пользователь"
____loclib.postscount = "Количество публикаций"
____loclib.about = "О пользователе"
____loclib.e13156 = "К следующим результатам"
____loclib.posts = "Публикации"
____loclib.e13157 = "Поиск по"
____loclib.e13158 = "не принёс ни одного результата"
____loclib.e13159 = "Поисковая фраза пуста"
____loclib.repost = "Репост"
____loclib.e13160 = "Привет, Pocketeers!"

____loclib.e13161 = "Добавить теги для вашей публикации"
____loclib.e13162 = "Вы можете ввести не более 5 тегов"
____loclib.e13163 = "В публикацию не внесено изменений"
____loclib.e13164 = "Добавьте несколько слов, чтобы сообщить Pocketpeople о вашей ссылке. О чем это? Почему это важно? Каково ваше мнение?"
____loclib.e13165 = "Ваша ссылка на видео недействительна. Попробуйте загрузить валидный URL-адрес видео."
____loclib.e13166 = "Вы спасли"
____loclib.e13167 = "человек из цензурированного интернета"
____loclib.e13168 = "Зарабатывайте Pocketcoin за каждую регистрацию по вашей ссылке"
____loclib.e13169 = "Прямая ссылка"
____loclib.copy = "Копировать"
____loclib.e13170 = "Включить призыв к регистрации в "+appname+""
____loclib.more = "Больше"
____loclib.e13171 = "Отличные новости. Я получил независимость от монополий в социальных сетях. Присоединяйтесь ко мне на pocketnet.app, чтобы мы могли делиться информацией и общаться в чате независимо от блокчейна. Присоединяйся ко мне здесь"
____loclib.e13172 = "Я хочу поделиться с вами этим из децентрализованной блокчейн-платформы "+appname+". Надеюсь, вы найдете это полезным, и если вы зарегистрируетесь, мы оба получим бонус в криптовалюте Pocketcoin!"
____loclib.e13173 = "Послать по email"
____loclib.e13174 = "Поделиться в социальных сетях"
____loclib.e13175 = "Актуальные теги"
____loclib.e13176 = "Тип адреса"
____loclib.e13177 = "Загрузать фотографию"

____loclib.requiredfields = "необходимые поля"
____loclib.e13178 = "Не связан с вашим профилем"
____loclib.e13179 = "Список неизрасходованных транзакций"
____loclib.e13180 = "Ваш счет успешно создан"
____loclib.e13181 = "Произошла ошибка в процессе создания предложения"
____loclib.e13182 = "Block Explorer"
____loclib.e13183 = "Центр помощи"
____loclib.e13184 = "Продолжить регистрацию"
____loclib.e13185 = "Соединение потеряно"
____loclib.e13186 = "Редактировать профиль"
____loclib.e13187 = "Содержание"
____loclib.e13188 = "Сохраните свой приватный криптографический ключ, который заменяет логин и пароль централизованных социальных сетей."
____loclib.e13189 = "Выйти и потерять мой ключ навсегда!"
____loclib.e13190 = ""+appname+" тема"
____loclib.e13191 = "Выбор темы"
____loclib.e13192 = "Уровень"
____loclib.e13193 = "Бонус"
____loclib.e13194 = "Репутация и вознаграждения"
____loclib.e13195 = "Ограничения"
____loclib.e13196 = "Это может занять"
____loclib.e13197 = "Получить покеткоины"
____loclib.e13198 = "Примерное время ожидания"
____loclib.e13199 = "Присоединиться к "+appname+" сейчас"

____loclib.e13200 = "Вернуться в "+appname+""
____loclib.e13201 = "Присоединиться к бета-тесту"
____loclib.e13202 = "Бета-тест "+appname+" начнется 24 января."
____loclib.e13203 = "Спасибо, что присоединились к списку рассылки бета-тестирования "+appname+". Использование "+appname+" не обязательно, однако мы будем использовать это электронное письмо для отправки ваших опросов с целью улучшения платформы. Спасибо за помощь в формировании будущего Интернета."
____loclib.e13204 = "Адрес для получения Покеткоинов"
____loclib.e13205 = "Параметры"
____loclib.e13206 = "Сумма получения"
____loclib.e13207 = "Сумма отправления"
____loclib.e13208 = "Доступно"
____loclib.e13209 = "Список краудфандинга"
____loclib.e13210 = "Новый договор"
____loclib.e13211 = "Скопируйте ссылку и поделитесь"
____loclib.amount = "Величина"
____loclib.label = "Подпись"
____loclib.message = "Сообщение"
____loclib.copylink = "Скопировать ссылку"
____loclib.e13211 = "Пожалуйста, заполните эти поля"
____loclib.e13212 = "Создать Qr Код"
____loclib.e13213 = "Адрес получателя"
____loclib.process = "Процесс"
____loclib.source = "Источник"
____loclib.yourmessage = "Ваше сообщение"
____loclib.e13214 = "Количество покеткоинов"
____loclib.currency = "Валюта"


____loclib.e13215 = "Выбрать валюту"
____loclib.e13216 = "Текущая валюта"
____loclib.e13217 = "Время до этой сделки истекло."
____loclib.e13218 = "Ожидание подтверждений блокчейна"
____loclib.e13219 = "Отправить вам Покеткоины"
____loclib.e13220 = "Покеткоины доставлены"
____loclib.errorreload = "Что-то пошло не так. Пожалуйста, перезагрузите страницу и попробуйте еще раз"
____loclib.e13221 = "Вы действительно хотите удалить информацию об этой сделке? Сделку остановить не возможно"
____loclib.e13222 = "Скачать Desktop App - это наиболее устойчивый к цензуре способ использования "+appname+". Даже если веб-сайты закрыты, приложение все равно будет работать напрямую через узлы."
____loclib.e13223 = "Скачать Покетнет для Windows"
____loclib.e132232 = "Скачать Покетнет для macOS"
____loclib.e13224 = "Скачать Покетнет для Linux"
____loclib.e13225 = ""+appname+" Нода"
____loclib.e13226 = "Скачать Ноду"
____loclib.e13227 = "Скачать "+appname+" ноду для Windows"
____loclib.e13228 = "Скачать "+appname+" ноду для Linux"
____loclib.e13229 = "Не верный приватный ключ"
____loclib.e13230 = "Неопределенная ошибка подключения"

____loclib.e13231 = "Соединение потеряно"
____loclib.e13232 = "Невозможно подключиться к ноде"
____loclib.e13233 = "Этот комментарий был удален"
____loclib.e13234 = "Opreturn error/41"
____loclib.e13235 = "Вы не можете оценить комментарий дважды"
____loclib.e13236 = "Этот комментарий был удален"
____loclib.e13237 = "Вы не можете оценить себя"
____loclib.e13238 = "Ошибка отправки комментария. Подождите и попробуйте еще раз / 37"
____loclib.e13239 = "Ошибка отправки комментария / 35"
____loclib.e13240 = "Комментарий, на который вы пытаетесь ответить, был удален пользователем"
____loclib.e13241 = "Этот комментарий слишком длинный, пожалуйста, разбейте его на несколько"
____loclib.e13242 = "Вы были заблокированы этим человеком, вы не можете комментировать его сообщения"
____loclib.e13243 = "Вы достигли своего лимита выставления оценок за комментарии за период 24 часа"
____loclib.e13244 = "Вы достигли своего лимита редактирования комментариев за период 24 часа"
____loclib.e13245 = "Вы достигли своего лимита отправления комментариев за период 24 часа"
____loclib.e13246 = "Вы пытаетесь отредактировать чужую публикацию"
____loclib.e13247 = "Вы достигли своего лимита редактирования 5 публикций за 24 часа"
____loclib.e13248 = "Вы можете редактировать публикации или комментарии только один раз для каждого блока в блокчейне. Подождите минутку и попробуйте еще раз"
____loclib.e13249 = "Вы не можете заблокировать себя, к счастью"
____loclib.e13250 = "Вы уже заблокировали этого пользователя"
____loclib.e13251 = "Вы не заблокировали этого пользователя"
____loclib.e13252 = "Транзакция неправильно сформирована"
____loclib.e13253 = "Вы не можете ссылаться на себя"
____loclib.e13254 = "Имя пользователя слишком длинное"
____loclib.e13255 = "Это имя уже используется другим пользователем"
____loclib.e13256 = "Эта публикация слишком длинная, пожалуйста, разбейте её на несколько."
____loclib.e13257 = "Ваша репутация "+appname+" пока не позволяет регистрировать жалобы"
____loclib.e13258 = "Вы достигли лимита жалоб за 24 часа"

____loclib.e13259 = "Вы не можете пожаловаться на свой пост"
____loclib.e13260 = "Вы уже подавали жалобу на этот пост"
____loclib.e13261 = "Сохранить ключ"
____loclib.e13262 = "Позже"
____loclib.e13263 = "Подпишитесь и включите уведомления о новых публикациях от этого пользователя"
____loclib.e13264 = "Подписка без уведомлений"
____loclib.e13265 = "Это имя больше не доступно, выберите другое"
____loclib.e13266 = "Светлая тема"
____loclib.e13267 = "Ночная тема"
____loclib.e13268 = "Coinstake выигрыш"
____loclib.e13269 = "Транзакция получена"
____loclib.e13270 = "Новая оценка"
____loclib.e13271 = "Новый комментарий"
____loclib.e13272 = "Новый ответ на комментарий"
____loclib.e13273 = "Новый подписчик"
____loclib.e13274 = "Освобождённый пользователь"
____loclib.e13275 = "Рейтинг комментария"
____loclib.e13276 = "Показывать встроенные видео"
____loclib.e13277 = "Автовоспроизводить видео"
____loclib.e13278 = "Запускать Покетнет автоматически"
____loclib.e13279 = "Чат"
____loclib.e13280 = "Тэги"
____loclib.e13281 = "Последний помментарии"
____loclib.e13282 = "Токен бота Telegram"
____loclib.e13283 = "Публикация из Telegram-канала"
____loclib.e13284 = "Добавьте бота в чат и выберите"
____loclib.e13285 = "Спросите перед публикацией из Телеграмма"
____loclib.e13286 = "Спрашивать перед отправкой в Telegram"
____loclib.e13287 = "Отправить в телеграм-канал"
____loclib.video = "Видео"
____loclib.e13288 = "Виджеты главной страницы"
____loclib.e13289 = "Интеграция с Telegram"

____loclib.system = "Система"
____loclib.e13290 = "Вы бы хотели подписаться"
____loclib.e13291 = "Вы действительно хотите отправить сообщение в Telegram?"
____loclib.send = "Отправить"
____loclib.e13292 = "У вас уже есть нода на этом хосте"
____loclib.e13293 = "Внутренняя ошибка"
____loclib.e13294 = "Использовать PGSQL база данных"
____loclib.e13295 = "DB Host"
____loclib.e13296 = "DB Port"
____loclib.e13297 = "DB Max"
____loclib.e13298 = "DB Idle Timeout, ms"
____loclib.e13298 = "DB Name"
____loclib.e13300 = "DB User"
____loclib.e13031 = "DB Password"
____loclib.e13302 = "Proxy server on"
____loclib.e13303 = "Proxy https server port"
____loclib.e13304 = "Proxy wss server port"
____loclib.e13305 = "Server SSL Key, pem"
____loclib.e13306 = "Server SSL Cert, pem"
____loclib.e13307 = "Server SSL Passphrase"
____loclib.e13308 = "Firebase admin SDK"
____loclib.e13309 = "Your Crane Address"
____loclib.e13310 = "Captcha Enable"
____loclib.e13311 = "Ip limiter enable"
____loclib.e13312 = "Server"

____loclib.e13313 = "Data Base, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "Other"
____loclib.e13316 = "Enable"
____loclib.e13317 = "Binary path"
____loclib.e13318 = "Config path"
____loclib.e13319 = "Data path"
____loclib.e13320 = "Staking Address"
____loclib.e13321 = "Import the account address to the node for stacking"
____loclib.e13322 = "State"
____loclib.e13323 = "Staking addresses"
____loclib.e13324 = "Last Block"
____loclib.control = "Control"
____loclib.setup = "Setup"
____loclib.e13325 = "Вы действительно хотите отправлять сообщения из Telegram?"
____loclib.e13326 = "Опубликовать"
____loclib.e13327 = "Вы действительно хотите снова использовать прокси?"
____loclib.e13328 = "оценил ваш комментарий!"
____loclib.e13329 = "Новая оценка комментария"
____loclib.e13330 = "поделился вашей публикацией"
____loclib.e13331 = "поделился вашей публикацией"
____loclib.e13332 = "сделал новую публикацию"
____loclib.e13333 = "Входящая транзакция"
____loclib.e13334 = "Вы выиграли"
____loclib.e13335 = "Pocketcoin за ваши последние действия"
____loclib.e13336 = "с сообщением:"
____loclib.e13337 = "прокомментировал вашу публикацию"
____loclib.e13338 = "ответил на ваш комментарий"
____loclib.reply = "Ответить"
____loclib.e13339 = "Вы спасли кого-то из цензурированного интернета. Немного покеткоинов уже в пути!"
____loclib.e13340 = "Поздравляем!"
____loclib.e13341 = "подписался на вас"
// <%=e("process")%> <%=e("e13037").toUpperCase()%> <%=e("")%> self.app.localization.e("e13350")
____loclib.e13342 = "Новый подписчик"
____loclib.e13343 = "оценил вашу публикацию"
____loclib.e13344 = "Новая оценка"
____loclib.e13345 = "прислал вам сообщение"
____loclib.e13346 = "Новые сообщения"
____loclib.e13347 = "Доступны обновления "+appname+". Применить обновления сейчас?"
____loclib.e13348 = "Нет, позже"
____loclib.e13349 = "Доступны обновления "+appname+". Зайти на страницу, чтобы скачать новую версию?"
____loclib.e13350 = "Присоединяйтесь к "+appname+" и зарабатывайте Pocketcoin сейчас"
____loclib.e133512 = "Пожалуйста, напишите кратко о себе для того, чтобы дать понять, почему пользователям следует на вас подписаться"
____loclib.e13351 = "Чат "+appname+""
____loclib.e13352 = "У вас нет привелегий писать в чате"

____loclib.e14001 = "Язык публикации"
____loclib.e14002 = "Вы действительно хотите очистить публикацию?"



____loclib.e14111 = "Возникла проблема с загрузкой изображений"
____loclib.editcomment = "Редактировать"

____loclib.Categories = "Категории"
____loclib.addtagsCategories = "Категории/теги"
____loclib.addcategory = "Добавить категорию"
____loclib.categoryname = "Название категории"
____loclib.entercategoryname = "Введите название категории"
____loclib.categoryfilter = "Состав категории"
____loclib.emptycategoryname = "Пожалуйста, введите имя категории"
____loclib.doublename = "Категория с введённым именем уже существует. Пожалуйста, введите другое имя для категории."

____loclib.showmoreusers = "Показать больше пользователей"
____loclib.zeron = "Ничего не найдено";
____loclib.maxtags = "Допускается не более 5 тегов";

____loclib.videotitle = "Введите заголовок видео";
____loclib.videodesc = "Введите описание к видео";
____loclib.entervideocaption = "Пожалуйста, введите заголовок видео";


____loclib.shareBareLink = "Поделиться Видео";
____loclib.videoCopied = "Ссылка на видео успешно скопирована";

____loclib.period = "Период";
____loclib.periodday = "Один день";
____loclib.period3day = "Три дня";
____loclib.period7day = "Семь дней";
____loclib.period31day = "Один месяц";
____loclib.period182day = "Пол года";

____loclib.editWallpaper = "Изменить Заставку";
____loclib.removeVideo = "Удалить Видео";


____loclib.videoUploadingFinish = "Завершение загрузки..."
____loclib.uploadNewVideo = "Добавить новое видео"
____loclib.selectVideoFile = "Выберите файл"
____loclib.uploadVideoProgress = "Загружено:"


____loclib.pbp_1 = "Бонусная программа "+appname+""
____loclib.pbp_2 = "Критерий получения бонуса:"
____loclib.pbp_3 = "Каждые 10 тысяч просмотров видео + 500 полученных рейтингов"
____loclib.pbp_4 = "PKOIN бонус эквивалентом:"
____loclib.pbp_5 = "1,000 USDT"
____loclib.pbp_6 = "Как увеличить просмотры видео?"
____loclib.pbp_7 = "Встраивайте "+appname+" видео в другие сайты (Нажмите поделиться)"
____loclib.pbp_8 = "Делитесь ссылкой на видео в социальных сетях, с помощью мессенджеров или через почту"
____loclib.pbp_9 = "Делитесь ссылкой на ваш профиль"
____loclib.pbp_10 = "Если вы пригласите блоггера и докажете это, вы получите бонус в размере до 25% от его вознаграждения."
____loclib.pbp_11 = "По вопросам обращайтесь"

____loclib["Top videos"] = "Лучшие видео"
____loclib["More videos by this author"] = "Другие видео от этого автора"

____loclib.goLive = "Начать Трансляцию"
____loclib.streamInfo = "Ключи Трансляции"
____loclib.streamCreating = "Стрим Создается"

____loclib.importFromExternal = "или импортируйте видео из YouTube"

____loclib.peertubeAddVideo = "Загрузить Видео"

____loclib.importHeading = "Импортировать видео из YouTube"
____loclib.importInputPlaceholder = "Вставьте сюда ссылку на видео"
____loclib.importInputLabel = "Ссылка на видео"

____loclib.capitalWarning = "Ограничения по качеству стримов"
____loclib.streamSettingsWarn = "Для корректной работы трансляции используйте настройки изображения не выше, чем следующие: битрейт - 2000 кбит/с, разрешение - 1920х1080 точек. В противном случае ваш стрим может работать нестабильно"

____loclib.donateself = "Вы не можете отправить пожертвование самому себе";
____loclib.donated = "прокомментировал вашу публикацию и пожертвовал"
____loclib.incoins = "Недостаточно средств"
____loclib.yourbalance = "Ваш баланс"
____loclib.sumoftransaction = "Сумма транзакции"
____loclib.failedStreamGeneration = "Невозможно начать стрим."

____loclib.videoBitrateError = "Битрейт видео слишком высокий. Пожалуйста, выберить файл с меньшим разрешением/битрейтом"
____loclib.videoQualityInfo = "Максимальный разрешенный битрейт видео - 8 Мбит/с. Если ваш файл превышает этот лимит, загрузка будет остановлена"
____loclib.videoQualityCaption = "Ограничения по качеству видео"

____loclib.streamLinks = 'Информация о трансляции'
____loclib.linkRTMP = 'Ссылка на RTMP-сервер'
____loclib.linkStreamKey = 'Ключ трансляции'
____loclib.videoCabinet = "Мои Видео";	
____loclib.uploadQuota = "Дневные Лимиты Загрузки";
____loclib.attachVideoToPost = "Создать Пост С Этим Видео";

____loclib.linkToPost = "Перейти к посту";
____loclib.attachVideoToPostShort = "Опубликовать";

____loclib.totalStars = "Средний рейтинг (Количество Оценок)";
____loclib.totalComments = "Количество Комментариев";
____loclib.totalViews = "Просморы Видео";

____loclib.enterVideoName = "Поиск по имени видео";

____loclib.videoTranscoding = "Видео еще обрабатывается, поэтому может работать нестабильно или требовать большие объемы трафика для воспроизведения. Вы все равно хотите его опубликовать?";
____loclib.waitForTranscoding = "Дождаться конца обработки";

____loclib.bonusProgram = "Статистика Бонусной Программы";
____loclib.bonusProgramViews = "Просмотры Видео";
____loclib.bonusProgramRatings = "Количество Рейтингов";

____loclib.sortBy = "Сортировать по:";
____loclib.sortDirection = "Порядок сортировки:";
____loclib.sortDirectionAsc = "Возрастанию";
____loclib.sortDirectionDesc = "Убыванию";
____loclib.sortByName = "Имени";
____loclib.sortByCreatedAt = "Дате Создания";
____loclib.sortByDuration = "Длительности";
____loclib.sortByViews = "Количеству просмотров";

____loclib.unableToAuthorize = "Ошибка авторизации";
____loclib.unableToAuthorizeBody = "К сожалению, у приложения не получилось авторизовать данный аккаунт на видео-сервере. Для того, чтобы получить возможность загрузки видео, необходимо иметь не менее 5 PKOIN или 100 репутации. Если ваш аккаунт соответствует данным требованиям, повторите попытку позже.";

____loclib.downloaded = "Загружено";
____loclib.downloadedEmpty = "Загруженные посты будут показаны здесь";
____loclib.emptyDescription = "Описание отсутствует";
____loclib.transcodingShort = "Обработка";
____loclib.editVideoDescription = "Изменить название/описание видео";
____loclib.errorChangingDescription = "Ошибка изменения видео";
____loclib.downloadVideo = "Скачать видео";
____loclib.selectQuality = "Выберите качество:";

____loclib.enterVideoName = "Введите название видео";
____loclib.enterVideoDescription = "Введите описание видео";

____loclib.doyouwantseepk = "Вы действительно хотите увидедь ваш приватный ключ?";
____loclib.copycode = "Скопировать приватный ключ";
____loclib.privatekeyqr = "Приватный ключ в формате QR кода";
____loclib.saveimage = "Сохранить изображение";
