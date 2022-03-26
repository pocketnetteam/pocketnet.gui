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
____loclib.id1 = "Если вы уже зарегистрированны в системе";
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
____loclib.rtip3 = "Запишите этот ключ для входа. Мы не храним ваши персональные данные. Приватный ключ не может быть востановлен! ";
____loclib.saveqrcode = "Сохранить QR код"
____loclib.copyprivkey = "Скопировать приватный ключ"
____loclib.rcontinue = "Продолжить"
____loclib.idle = "Задержка не непродолжительное время"
____loclib.congratulations = "Поздравляем! Вы в <span class='pnlabel'>"+appname+"</span>"
____loclib.creatingpreloader = "Аккаунт находится в процессе создания"
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
____loclib.welcome = "Добро пожаловать";
____loclib.welcometopocketnet = "Приветствуем вас в "+appname+"";
____loclib.continue = "Продолжить";

____loclib.chooseThemes = "Выберите темы, которые Вам интересны";
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
____loclib.donationwela = "Отправлено с помощью "+appname+"";
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
____loclib.wsrecieverpay = "Получатель платит";
____loclib.wssenderpay = "Отправитель платит";
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
____loclib.utip1 = "Вы должны ввести имя пользователя прежде чем пользоваться "+appname+"";
____loclib.utip2 = "Остался последний шаг";
____loclib.upicset = "Установить иконку пользователя";
____loclib.upic = "Иконка пользователя";
____loclib.uuserinfo = "Информация о пользователе";
____loclib.usave = "Сохранить";
____loclib.ucancel = "Отмена";
____loclib.uwaitb = "Ожидание подтверждений для сохранения информации";
____loclib.uchanges = "Вы не ввели изменений";
____loclib.uchangesvalid = "Вы должны ввести имя пользователя";
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

____loclib.stp = "Начинающий";
____loclib.stpg = "Топ";
____loclib.stpreal = "Верифицированный";
____loclib.stpdev = "Разработчик Bastyon";

____loclib.trialreputationtip = "Чтобы стать топовым пользователем необходимо набрать валидную репутацию. По крайней мере 100 топовых пользователей сети должны положительно оценить ваш контент (После трёх месяцев это требование смягчается до 30 пользователей). Кроме этого ваша репутация должна быть выше 100";

____loclib.trialreputationtipaction = "Узнать больше о репутации"

____loclib.stpreal = "Известная личность";

____loclib.srep = "Репутация";
____loclib.ccpl = "Количество жалоб";


//accounts
____loclib.aaddedacc = "Сменить аккаунт";
____loclib.acure = "Текущий";
____loclib.aaddacc = "Добавить аккаунт";
____loclib.ascheduler = "Планировщик задач";
____loclib.aused = "Этот адрес уже используется на этом устройстве";

____loclib.accfailedkeypair = "Неверный приватный ключ";
____loclib.acchasinthispack = "Этот адрес уже добавлен";
____loclib.acchasinanotherpack = "Этот адрес уже используется на этом устройстве";

//author
____loclib.sub = "Подписаться";
____loclib.subi = "Вы подписаны";
____loclib.unsub = "Отписаться";
____loclib.joined = "Зарегистрировался";
____loclib.shares = "ПУБЛИКАЦИИ";
____loclib.uposts = "ПУБЛИКАЦИИ";
____loclib.myuposts = "МОИ ПУБЛИКАЦИИ";
____loclib.followers = "ПОДПИСЧИКИ";
____loclib.followers2 = "Подписчики";
____loclib.following = "ПОДПИСКИ";
____loclib.following2 = "Подписки";
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
____loclib.lcomlaindialog = "Вы действительно хотите пожаловаться на данную публикацию?";
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
____loclib.stimes = "Очистить публикацию"
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
____loclib.emptytags = "Пожалуйста, добавьте теги";
____loclib.emptyutxo = "На адресе нет коинов";
____loclib.networkerror = "Ошибка сети";
____loclib.maximages = "Разрешено загружать максимум 10 изображений";
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
____loclib.dcode = "Код"
____loclib.dcopyToClipboard = "Копировать в буфер обмена"
____loclib.dwarning = "Внимание"
____loclib.dyesclose = "Да, закрыть"

// Messages

____loclib.transactionCome = "Входящая транзакция";

____loclib.coinbaseSuccess = function(v){
	return "<b>Поздравляем!</b> " + " Вы выиграли <b>" + v + " PKOIN</b>"
}
____loclib.coinbaseSuccesspost = function(v){
	return "Поздравляем, вы получили " + v + " Покеткоинов за ваши последние публикации!"
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
____loclib.upvoteShareMessage = "поставил оценку вашей публикации"

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
____loclib.postWaitConf = "Публикация ожидает подтверждения";
____loclib.actionWaitConf = "Действие ожидает подтверждения в блокчейне";

// notifications
____loclib.ntnow = "Сейчас"
____loclib.ntlasthour = "В течение последнего часа"
____loclib.nttoday = "Сегодня"
____loclib.ntyesterday = "Вчера"
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
____loclib.e13021 = "Показать полностью"
____loclib.blockuser = "Заблокировать пользователя"
____loclib.unblockuser = "Разблокировать пользователя"
____loclib.e13022 = "Вы действительно хотите отписаться от пользователя?"
____loclib.unfollow = "Отписаться"
____loclib.unblock = "Разблокировать"
____loclib.share = "Поделиться"
____loclib.info = "Информация"
____loclib.copyLink = "Скопировать ссылку"
____loclib.sendMessenger = "Отправить в чат"
____loclib.includeRefLink = "Сделать ссылку реферальной"
____loclib.shareVia = "Поделиться"

____loclib.embedding = "Встраивание кода"
____loclib.copyEmbeddingCode = "Скопировать код"
____loclib.showCode = "Показать код"
____loclib.embeddingSettings = "Настройки"
____loclib.blackTheme = "Черная тема"
____loclib.inclueComments = "Комментарии"
____loclib.showOnlyLast = "Показать только последний комментарий"
____loclib.showAll = "Показать все комментарии"
____loclib.dontShow = "Не показывать комментарии"
____loclib.removeDescription = "Удалить описание"
____loclib.preview = "Предварительный просмотр"
____loclib.autoplayVideo = "Автовоспроизведение видео"
____loclib.onlyVideo = "Только видео"

____loclib.e13023 = "Вы действительно хотите разблокировать пользователя?"
____loclib.e13024 = "Ваш приватный ключ для входа"
____loclib.e13025 = "Создать новый аккаунт"
____loclib.e13026 = "Регистрация в "+appname+""

____loclib.e13027 = "Оставаться в системе"
____loclib.e13028 = "Вы ввели неверный приватный ключ"
____loclib.e13029 = "Сообщение пустое"
____loclib.e13030 = "Комментарии могут содержать не более 1000 символов."
____loclib.e13031 = "Поделиться этим комментарием"
____loclib.e13032 = "Вы действительно хотите удалить свой комментарий?"
____loclib.e13033 = "Комментарий удален"
____loclib.postRemoved = "Публикация удалена"
____loclib.postNotFound = "Публикация не найдена"
____loclib.e13034 = "Да"
____loclib.e13035 = "Нет, отменить"
____loclib.hide = "Скрыть"
____loclib.e13036 = "Показать комментарии"
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
____loclib.e13118 = "Символы введены неверно"
____loclib.e13119 = "Добавить email и продолжить"
____loclib.e13120 = "Скачать приложение"
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
____loclib.removePostDialog = "Вы действительно хотите удалить публикацию?"
____loclib.opennewwindow = "Открыть публикацию в новом окне"
____loclib.opennew = "Открыть публикацию"
____loclib.pin = "Закрепить публикацию"
____loclib.pinned = "закреплённая публикация"
____loclib.pinPostDialog = "Вы действительно хотите закрепить эту публикацию?"
____loclib.unpin = "Открепить публикацию"
____loclib.unpinPostDialog = "Вы действительно хотите открепить эту публикацию?"

____loclib.unsubscribe = "Отписаться"
____loclib.startchat = "Чат"
____loclib.reportpost = "Пожаловаться"
____loclib.reportuser = "Пожаловаться"
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
____loclib.e13136 = "Лента"
____loclib.e13137 = "Подписки"
____loclib.e13138 = "Лучшее"
____loclib["Top Posts Over"] = "Лучшее за время"
____loclib.bestFirst = "Сначала лучшее"
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
____loclib.e13148 = "Вы действительно хотите пожаловаться на эту публикацию?"
____loclib.e13149 = "оценки пользователей"
____loclib.e13150 = "Рейтинг публикации"
____loclib.totalLikes = "Всего оценок"
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
____loclib.disablePreview = "Отключить предварительный просмотр ссылок"
____loclib.e13157 = "Поиск по"
____loclib.e13158 = "не принёс ни одного результата"
____loclib.e13159 = "Поисковая фраза пуста"
____loclib.repost = "Сделать репост"
____loclib.reposted = "Репост"
____loclib.e13160 = "Привет, Pocketeers!"

____loclib.e13161 = "Добавить теги для вашей публикации"
____loclib.e13162 = "Вы можете ввести не более 5 тегов"
____loclib.e13163 = "В публикацию не внесено изменений"
____loclib.e13164 = "Добавьте несколько слов (30 символов), чтобы сообщить о вашей ссылке. О чем это? Почему это важно? Каково ваше мнение?"
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
____loclib.e13182 = "Обозреватель блокчейна"
____loclib.e13183 = "Центр помощи"
____loclib.e13184 = "Продолжить регистрацию"
____loclib.e13185 = "Соединение потеряно"
____loclib.e13186 = "Редактировать профиль"
____loclib.e13187 = "Содержание"
____loclib.e13188 = "Сохраните свой приватный криптографический ключ, который заменяет логин и пароль централизованных социальных сетей."
____loclib.e13189 = "Выйти и потерять мой ключ навсегда!"
____loclib.e13190 = ""+appname+" тема"
____loclib.e13191 = "Выбор темы"
____loclib.uiScaleSetting = "Масштаб интерфейса"
____loclib.uiScaleSettingTitle = "Выбор масштаба"
____loclib.e13192 = "Уровень"
____loclib.e13193 = "Бонус"
____loclib.e13194 = "Репутация и статус"
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
____loclib.e13222 = "Скачать Desktop приложение - это наиболее устойчивый к цензуре способ использования "+appname+". Даже если веб-сайты закрыты, приложение все равно будет работать напрямую через узлы."
____loclib.e13223 = "Скачать "+appname+" для Windows"
____loclib.e132232 = "Скачать "+appname+" для macOS"
____loclib.e13224 = "Скачать "+appname+" для Linux"
____loclib.e132233 = "Скачать "+appname+" для Android"

____loclib.e132221 = "Скачать Мобильное Приложение. Это наиболее удобный способ использования "+appname+"."


____loclib.e13225 = ""+appname+" Нода"
____loclib.e13226 = "Скачать Ноду"
____loclib.e13227 = "Скачать "+appname+" ноду для Windows"
____loclib.e13228 = "Скачать "+appname+" ноду для Linux"
____loclib.e13229 = "Неверный приватный ключ"
____loclib.e13230 = "Неопределенная ошибка подключения"

____loclib.e13231 = "Соединение потеряно"
____loclib.e13232 = "Невозможно подключиться к ноде"
____loclib.e13233 = "Этот комментарий был удален"
____loclib.e13234 = "Opreturn error/41"
____loclib.e13235 = "Вы не можете оценить комментарий дважды"
____loclib.e13236 = "Этот комментарий был удален"
____loclib.e13237 = "Вы не можете оценить себя"
____loclib.e13238 = "Ошибка отправки комментария. Подождите и попробуйте еще раз / 37"
____loclib.e13239 = "Ошибка отправки комментария. Комментарий на который вы пытаетесь ответить, удалён"
____loclib.e13240 = "Комментарий, на который вы пытаетесь ответить, был удален пользователем"
____loclib.e13241 = "Этот комментарий слишком длинный, пожалуйста, разбейте его на несколько"
____loclib.e13242 = "Вы были заблокированы этим человеком, вы не можете комментировать его сообщения"
____loclib.e13243 = "Вы достигли своего лимита выставления оценок за комментарии за период 24 часа"
____loclib.e13244 = "Вы достигли своего лимита редактирования комментариев за период 24 часа"
____loclib.e13245 = "Вы достигли своего лимита отправления комментариев за период 24 часа"
____loclib.e13246 = "Вы пытаетесь отредактировать чужую публикацию"
____loclib.e13247 = "Вы достигли своего лимита редактирования 5 публикций за 24 часа"
____loclib.saveSettingsLimit = "Вы достигли своего лимита сохранения настроек за 24 часа"
____loclib.e13248 = "Вы можете редактировать публикации или комментарии только один раз для каждого блока в блокчейне. Подождите минутку и попробуйте еще раз"
____loclib.e13249 = "Вы не можете заблокировать себя, к счастью"
____loclib.e13250 = "Вы уже заблокировали этого пользователя"
____loclib.e13251 = "Вы не заблокировали этого пользователя"
____loclib.e13252 = "Транзакция неправильно сформирована"
____loclib.e13253 = "Вы не можете ссылаться на себя"
____loclib.e13254 = "Имя пользователя слишком длинное"
____loclib.e13255 = "Это имя уже используется другим пользователем"
____loclib.e13256 = "Эта публикация слишком длинная, пожалуйста, разбейте её на несколько."
____loclib.e13257 = "Ваша репутация "+appname+" пока не позволяет регистрировать жалобы в блокчейн"
____loclib.e13257_1 = "Ваша репутация "+appname+" пока не позволяет ставить отрицательные оценки публикациям"

____loclib.e13258 = "Вы достигли лимита жалоб за 24 часа"
____loclib.e2000 = "Проблемы с соединением, попробуйте еще раз"


____loclib.e13259 = "Вы не можете пожаловаться на свою публикацию"
____loclib.e13260 = "Вы уже подавали жалобу на эту публикацию"
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
____loclib.e13278 = "Запускать "+appname+" автоматически"
____loclib.e13279 = "Чат"
____loclib.e13280 = "Тэги"
____loclib.e13281 = "Последние комментарии"
____loclib.e132812 = "Комментарии"
____loclib.e13282 = "Токен бота Telegram"
____loclib.e13283 = "Публикация из Telegram-канала"
____loclib.e13284 = "Добавьте бота в чат и выберите"
____loclib.e13285 = "Спросите перед публикацией из Телеграмма"
____loclib.e13286 = "Спрашивать перед отправкой в Telegram"
____loclib.e13287 = "Отправить в телеграм-канал"
____loclib.video = "Видео"
____loclib.e13288 = "Виджеты главной страницы"
____loclib.e13289 = "Интеграция с Telegram"

____loclib.sound = "Звук"
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


____loclib.e14109 = "Где я могу скачать приложение для Android?"

____loclib.e14111 = "Возникла проблема с загрузкой изображений"
____loclib.editcomment = "Редактировать"

____loclib.Categories = "Категории"
____loclib.addtagsCategories = "Категории и теги"
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


____loclib.videoTranscodingError = "Произошла ошибка при обработке вашего видео"
____loclib.videoUploadingFinish = "Завершение загрузки..."
____loclib.uploadNewVideo = "Добавить новое видео"
____loclib.selectVideoFile = "Выберите файл"
____loclib.uploadVideoProgress_binaries = "Подготовка библиотек:";
____loclib.uploadVideoProgress_processing = "Обработка видео:"
____loclib.uploadVideoProgress_uploading = "Загрузка видео:"



____loclib.pbp_1 = "Бонусная программа Bastyon"
____loclib.pbp_2 = "Критерии для получения бонуса за оригинальный контент:"
____loclib.pbp_3 = "Каждые: 15 тысяч просмотров видео + 1250 пятизвёздочных рейтингов от уникальных пользователей + 1500 реферальных пользователей"

____loclib.pbp_4 = "Бонус в PKOIN или Bitcoin:"
____loclib.pbp_5 = "1,000 USDT"
____loclib.pbp_6 = "Как ускорить получение бонуса?"
____loclib.pbp_7 = "Делитесь ссылкой на видео в социальных сетях, с помощью мессенджеров или через почту. Выставляйте эксклюзивные материалы для подписчиков в Бастионе (это делается при создании поста, выбрать Для Подписчиков). Эксклюзивные материалы увеличат количество реферальных подписок. Делитесь ссылкой на ваш профиль. "
____loclib.pbp_8 = "Всегда выбирайте 'Реферальная Ссылка', когда делитесь ссылкой на Бастион (на видео или профиль)."
____loclib.pbp_9 = ""
____loclib.pbp_10 = "Если вы пригласите блоггера и докажете это, вы получите бонус в размере до 25% от первых 4 бонусов."
____loclib.pbp_11 = "По вопросам обращайтесь"

/*
____loclib.pbp_6_1 = "Реферальные пользователи"
____loclib.pbp_6_2 = "1000"
____loclib.pbp_6_3 = ''*/


____loclib["Top videos"] = "Популярные видео"
____loclib["More videos by this author"] = "Другие видео от этого автора"

____loclib.goLive = "Начать Трансляцию"
____loclib.streamInfo = "Ключи Трансляции"
____loclib.streamCreating = "Трансляция Создается"

____loclib.importFromExternal = "или импортируйте видео из YouTube"

____loclib.peertubeAddVideo = "Загрузить Видео"



____loclib.shareviagroupemail = "Электронная почта"
____loclib.shareviagroupmessenger = "Мессенджеры"
____loclib.shareviagroupsocial = "Социальные сети"
____loclib.shareviagroupblog = "Блоги"


____loclib.importHeading = "Импортировать видео из YouTube"
____loclib.importInputPlaceholder = "Вставьте сюда ссылку на видео"
____loclib.importInputLabel = "Ссылка на видео"

____loclib.capitalWarning = "Ограничения по качеству трансляций"
____loclib.streamSettingsWarn = "Для корректной работы трансляции используйте настройки изображения не выше, чем следующие: битрейт - 2000 кбит/с, разрешение - 1920х1080 точек. В противном случае ваша трансляция может работать нестабильно"

____loclib.donateself = "Вы не можете отправить пожертвование самому себе";
____loclib.donated = "прокомментировал вашу публикацию и пожертвовал"
____loclib.incoins = "Недостаточно средств"
____loclib.yourbalance = "Ваш баланс"
____loclib.sumoftransaction = "Сумма транзакции"
____loclib.failedStreamGeneration = "Невозможно начать трансляцию."

____loclib.videoBitrateError = "Битрейт видео слишком высокий. Пожалуйста, выберить файл с меньшим разрешением/битрейтом"
____loclib.videoQualityInfo = "Максимальный разрешенный битрейт видео - 8 Мбит/с. Если ваш файл превышает этот лимит, загрузка будет остановлена. Максимальное рекомендуемое разрешение - 720p. <br/> Рекомендуемые битрейты: <br/> <b>1080p:</b> 5081 Kbps <br/> <b>720p:</b>  2680 Kbps <br/> <b>480p:</b>  1300 Kbps <br/> <b>360p:</b>  700 Kbps"
____loclib.videoQualityCaption = "Ограничения по качеству видео"
____loclib.videoFormats = "Cписок поддерживаемых видеоформатов: .mp4, .mkv, .mov, .avi, .wmv, .flv, .f4v, .3g2, .3gp, .mts, .m2ts, .mxf, .nut"
____loclib.videoSizeError = "Видео имеет слишком большой размер. Максимальный размер загружаемого файла - 4Gb"
____loclib.videoSizeAtt = "Возможна загрузка файлов размером до 4Gb."

____loclib.streamLinks = 'Информация о трансляции'
____loclib.linkRTMP = 'Ссылка на RTMP-сервер'
____loclib.linkStreamKey = 'Ключ трансляции'
____loclib.videoCabinet = "Мои Видео";
____loclib.uploadQuota = "Дневные Лимиты Загрузки";
____loclib.attachVideoToPost = "Создать Публикацию С Этим Видео";

____loclib.linkToPost = "Перейти к публикации";
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
____loclib.unableToAuthorizeBody = "К сожалению, у приложения не получилось авторизовать данный аккаунт на видео-сервере. Для того, чтобы получить возможность загрузки видео, необходимо иметь не менее 5 PKOIN или 50 репутации.";


____loclib.unableToAuthorizeConnection = "Ошибка авторизации";
____loclib.unableToAuthorizeConnectionBody = "К сожалению, у приложения не получилось авторизовать данный аккаунт на видео-сервере. Повторите попытку позже.";

____loclib.download = "Загрузить";
____loclib.downloaded = "Сохранённые";
____loclib.downloadedEmpty = "Сохранённые публикации будут показаны здесь";
____loclib.emptyDescription = "Описание отсутствует";
____loclib.transcodingShort = "Обработка";
____loclib.editVideoDescription = "Изменить название/описание видео";
____loclib.errorChangingDescription = "Ошибка изменения видео";
____loclib.downloadVideo = "Скачать видео";
____loclib.deleteSavedVideo = "Удалить сохраненное видео";
____loclib.selectQuality = "Выберите качество загружаемого видео";
____loclib.downloadedVideos = "Сохранённые видео";
____loclib.deleteAllDownloadedVideos = "Удалить все сохранённые видео";
____loclib.deleteVideoDialog = "Удалить сохранённое видео";
____loclib.deleteAllVideoDialog = "Вы уверены, что хотите удалить все видео?";
____loclib.videosDeleted = "Видео удалено!";

____loclib.enterVideoName = "Введите название видео";
____loclib.enterVideoDescription = "Введите описание видео";

____loclib.doyouwantseepk = "Вы действительно хотите увидедь ваш приватный ключ?";
____loclib.copycode = "Скопировать приватный ключ";
____loclib.privatekeyqr = "Приватный ключ в формате QR кода";
____loclib.saveimage = "Сохранить изображение";

____loclib.showAllButton = "Подробнее";
____loclib.hideAllButton = "Скрыть";

____loclib.UniqueUsers = "Уникальные Пользователи";
____loclib.ErrorLoadingRates = "Ошибка Загрузки";
____loclib.noDownloadedVideos = "Нет сохранённых видео";

____loclib.bastyonhelperTitle1 = "Покетнет переехал",
____loclib.bastyonhelperTitle2 = "Бастион Свободы Слова";
____loclib.bastyonhelperSubtitle1 = "Теперь Pocketnet - это";
____loclib.bastyonhelperSubtitle2 = "Пожалуйста, перейдите по ссылке ниже";

____loclib.videotranscodingwait = "В данный момент видео еще обрабатывается. Как только процесс завершится вы сможете сделать публикацию.";
____loclib.views = "Просмотры";
____loclib.saveshare = "Добавить видео в сохраненные";
____loclib.successdownloaded = "Видео сохранено";

____loclib.logoutaccount = "Выйти из своей учетной записи";
____loclib.closeapplication = "Выйти из приложения";

____loclib.attachVideoLenta = "Прикрепить";
____loclib.attachVideoLentaShort = "Прикрепить видео к публикации";

____loclib.linkToPostLenta = "Уже опубликовано"
____loclib.ReferralUsers = "Реферальные пользователи. Всего/c 01.11.2021"
____loclib.lockedaccount = "Ваш аккаунт заблокирован по причине падения репутации ниже чем -30"
____loclib.lockedaccounta = "Аккаунт автора заблокирован по причине падения репутации ниже чем -30"

____loclib.lockedaccountacomment = "Аккаунт автора комментария заблокирован по причине падения репутации ниже чем -30"
____loclib.hiddenCommentLabel = "Комментарий скрыт из-за низкой оценки"

____loclib.blockedbymeHiddenCommentLabel = "Комментарий скрыт из-за того, что вы заблокировали пользователя"
____loclib.hiddenCommentsLabel = "Комментарий скрыт из-за низких оценок комментариев автора"

____loclib.showhiddenComment = "Показать"


____loclib.visibletoeveryone = 'Видно всем'
____loclib.visibleonlytosubscribers = 'Видно только подписчикам'
____loclib.visibleonlytoregistered = 'Видно только зарегистрированным пользователям'

____loclib.sharevisibility_sub = 'Для подписчиков'
____loclib.sharevisibility_reg = 'Для пользователей Bastyon'


____loclib.sharevisibilitylabel_sub_post = 'Автор решил сделать эту <b>публикацию</b> видимой только подписчикам'
____loclib.sharevisibilitylabel_reg_post = 'Автор решил сделать эту <b>публикацию</b> видимой только для зарегистрированных пользователей Bastyon'
____loclib.sharevisibilitylabel_sub_article = 'Автор решил сделать эту <b>статью</b> видимой только подписчикам'
____loclib.sharevisibilitylabel_reg_article = 'Автор решил сделать эту <b>статью</b> видимой только для зарегистрированных пользователей Bastyon'
____loclib.sharevisibilitylabel_sub_video = 'Автор решил сделать это <b>видео</b> видимым только подписчикам'
____loclib.sharevisibilitylabel_reg_video = 'Автор решил сделать это <b>видео</b> видимым только для зарегистрированных пользователей Bastyon'

____loclib.buy = 'Купить';
____loclib.pkoin_commerce_tag_share_error = 'Тэг "pkoin_commerce" может использоваться только как отдельный тэг'
____loclib.pkoin_commerce_info = 'Из рук в руки PKOIN транзакции не модерируются, пользователи несут все  риски'

____loclib.topAuthors = 'Рекомендуемые авторы'
____loclib.recommendedPosts = 'Рекомендуемые публикации';
____loclib.rating = 'Рейтинг';
____loclib.setupVideoNodeGuide = 'Настроить ноду для видео'
____loclib.subscribers3 = 'подписчиков';

____loclib.buyforcrypto = 'Купить за криптовалюту'
____loclib.buywithcreditcard = 'Купить с карты'
____loclib.buylogo = 'Купить Pocketcoin (PKOIN)'
____loclib.buypeertopeer = 'Купить Peer-to-Peer'


____loclib.aboutServices = 'БЕЗ ЦЕНЗУРЫ';

____loclib.aboutServices1 = 'Устойчив к цензуре';
____loclib.aboutServices2 = 'Bastyon работает на децентрализованных узловых компьютерах по всему миру, управляемых пользователями. Каждый узловой компьютер работает по одному и тому же прозрачному набору правил, что не позволяет кому-либо произвольно запрещать контент.';
____loclib.aboutServices3 = 'Даже разработчики Bastyon не могут никого забанить, платформа модерируется пользователями';

____loclib.aboutServices4 = 'Биткоин социальных медиа';
____loclib.aboutServices5 = 'Bastyon работает на блокчейне и не зависит от какого-либо сайта или домена. Пока где-то в мире работает несколько узлов, сеть может функционировать, и авторы и их читатели будут иметь доступ к подписчикам, а пользователи - к контенту. ';
____loclib.aboutServices6 = 'Bastyon - это "Bitcoin социальных медиа"';

____loclib.aboutServices7 = 'Защита конфиденциальности';
____loclib.aboutServices8 = 'Аккаунт Bastyon не привязан к вашей личности или номеру телефона, требуется только проверка электронной почты. Для защиты вашей конфиденциальности разрешается использовать несколько учетных записей. Никакие личные данные не собираются и не хранятся. В Bastyon встроен мессенджер со сквозным шифрованием';
____loclib.aboutServices9 = 'Ваша конфиденциальность - главная цель Bastyon. Ваш приватный ключ известен только вам и не может быть восстановлен даже разработчиками.';
____loclib.aboutServices10 = 'Кроме того, хакеры не смогут проникнуть в ваш аккаунт и изменить пароль.';

____loclib.aboutServices11 = 'Зарабатывайте с Bastyon';
____loclib.aboutServices12 = 'Вы можете получить 1 000 USD';
____loclib.aboutServices13 = 'Существует множество способов монетизации вашего контента с помощью Pocketcoin (PKOIN). Вы зарабатываете PKOIN за популярный контент, пользователи могут прикреплять PKOIN к комментариям. В январе 2022 года планируется выпуск децентрализованного рекламного маркетплейса, 100% дохода которого будут поступать блогерам.  ';

____loclib.aboutServices14 = 'Загружайте свои видео';
____loclib.aboutServices15 = 'Bastyon позволяет вам';
____loclib.aboutServices16 = 'делиться своими постами и видео';
____loclib.aboutServices17 = ', Загружайте их безопасно, импортируйте их с YouTube (свяжитесь с нами, чтобы мы могли помочь!), убедитесь, что они видны всем. Навсегда. Никто не сможет удалить или запретить их.';


____loclib.aboutServices18 = 'Open Source';
____loclib.aboutServices19 = 'Мы верим, что';
____loclib.aboutServices20 = 'конфиденциальность и безопасность';
____loclib.aboutServices21 = 'должны проходить через Open Source проекты. Весь проект доступен на GitHub, чтобы вы могли убедиться, что в нем нет бэкдоров, и что Bastyon не хранит никаких личных данных.';


____loclib.aboutNewBlock = 'Как зарабатывать с Bastyon';
____loclib.aboutNewBlock1 = 'Популярный контент и лучшие комментарии';
____loclib.aboutNewBlock2 = 'Вы зарабатываете PKOIN за голоса от активных пользователей. Таким образом, если вы привлечете свою аудиторию, вы будете защищены от цензуры, зарабатывая при этом за их взаимодействие с вашим контентом. Ваши подписчики также могут добавлять PKOIN к своим комментариям, чтобы опубликовать их под вашим постом, 100% выручки идет вам, потому что нет корпоративной структуры.';
____loclib.aboutNewBlock3 = 'Бонусная программа';
____loclib.aboutNewBlock4 = 'Bastyon предлагает ограниченную по времени бонусную программу для видеоблогеров с заработком 1 000 USD за каждые 15 тысяч просмотров видео, 1000 приглашенных пользователей и 1 250 взаимодействий. Бонус выплачивается в Bitcoin или PKOIN, в зависимости от предпочтений блогера. Это ограниченная по времени программа.';
____loclib.aboutNewBlock5 = 'Децентрализованная реклама ';
____loclib.aboutNewBlock6 = 'Децентрализованная рекламная площадка, релиз которой запланирован на январь 2022 года, позволит рекламодателям создавать посты и предлагать их блогерам. Блогер может изучить рекламный пост и сделать репост, если он подходит. Все взаимодействия на канале блоггеров будут поступать непосредственно в кошелек блоггера, 100% выручки от рекламы.';


____loclib.aboutOpen = 'Откройте для себя Bastyon';
____loclib.aboutOpen1 = 'Вы можете использовать Bastyon через браузер или загрузить мобильное и десктопное приложение';
____loclib.aboutOpen2 = 'Официальный сайт';
____loclib.aboutOpen3 = 'Свяжитесь с нами';
____loclib.aboutOpen4 = 'Отправьте нам сообщение, если вам нужна помощь или если вы создатель контента, блогер, инфлюенсер и хотите разблокировать свой бонус и верифицировать свой профиль!';
____loclib.aboutOpen5 = 'Исходный код';
____loclib.aboutOpen5_1 = 'Пишите на электронную почту:';

____loclib.createnewcontinue = "Продолжить создание аккаунта";

/////////////aboutYoutube
____loclib.aboutMainBoard = 'Bastyon - лучшая альтернатива YouTube';
____loclib.aboutYoutubeMainDescription1 = 'Некоторые люди спрашивают нас:';
____loclib.aboutYoutubeMainDescription2 = "Почему я должен использовать Bastyon?";
____loclib.aboutYoutubeMainDescription3 = 'Настоящий вопрос:';
____loclib.aboutYoutubeMainDescription4 = '"Почему вы должны использовать YouTube?!"';
____loclib.aboutYoutubeMainDescription5 = 'YOUTUBE БАНИТ И ДЕМОНЕТИЗИРУЕТ ТЫСЯЧИ АККАУНТОВ';
____loclib.aboutYoutubeMainDescription6 = 'ЛЮДИ С СОТНЯМИ ТЫСЯЧ ПОДПИСЧИКОВ';
____loclib.aboutYoutubeMainDescription7 = 'ДАЖЕ ЕСЛИ АВТОРЫ НЕ ЗАБАНЕНЫ, ОНИ СКРЫТЫ ИЛИ ДЕМОНЕТИЗИРОВАНЫ';

____loclib.aboutYoutubeThreeColumn1 = 'Представьте себе: в один прекрасный день у вас на канале YouTube 20k, 100k или даже 1M подписчиков.';
____loclib.aboutYoutubeThreeColumn2 = 'На следующий день ваш аккаунт больше не существует.';
____loclib.aboutYoutubeThreeColumn3 = 'Забанен навсегда. Нет возможности подать апелляцию.';
____loclib.aboutYoutubeThreeColumn4 = 'Вы знаете, вы не только потеряли своих подписчиков';
____loclib.aboutYoutubeThreeColumn5 = 'Вы потеряли постоянный пассивный доход, создаваемый рекламой под вашими видео.';
____loclib.aboutYoutubeThreeColumn6 = 'Вы потеряли тысячи людей, которые раньше следили за вами и делились вашими видео';
____loclib.aboutYoutubeThreeColumn7 = 'Вы потеряли доступ к своим видео, если у вас не было резервной копии.';
____loclib.aboutYoutubeThreeColumn8 = 'Хуже всего то, что решения YouTube произвольны и, как правило, окончательны';
____loclib.aboutYoutubeThreeColumn9 = 'Самое страшное: решения YouTube, как правило, окончательные';
____loclib.aboutYoutubeThreeColumn10 = 'У вас нет никакой возможности вернуть свой канал, подписчиков и деньги. Они пропали навсегда';
____loclib.aboutYoutubeThreeColumn11 = ' Переходите в Bastyon, пока не поздно. Мы можем импортировать ваши видео без усилий, а вам заплатят 1,000 $ за каждые 15,000 просмотров! (плюс 1,250 взаимодействий и 1000 приглашенных пользователей на ваш канал)';
____loclib.aboutYoutubeThreeColumn12 = 'Чего вы ждете?!';

____loclib.aboutYoutubeH3Section = 'Создание сообщества подписчиков на YouTube - это как строительство дома на земле, которая вам не принадлежит';

____loclib.aboutYoutubeImgAndText1 = 'ЗАРАБАТЫВАЙТЕ С BASTYON БЕЗ ДЕМОНЕТИЗАЦИИ';
____loclib.aboutYoutubeImgAndText2 = 'Bastyon платит вам за размещение видео и за каждое взаимодействие (лайк/комментарий), которое вы получаете. Сейчас у Bastyon есть бонусная программа, которая дает вам 1 000 $ (в криптовалюте) за каждые 15 000 просмотров + 1 250 взаимодействий + 1 000 приглашенных пользователей на ваш канал';
____loclib.aboutYoutubeImgAndText3 = 'И вы можете говорить на "деликатные" темы. Вы никогда не будете заблокированы или демонизированы, если не будете размещать порнографию или незаконный контент, который будет модерироваться сообществом. Кроме того, если вы приводите своих подписчиков, вы тоже получаете рефералов.'
____loclib.aboutYoutubeImgAndText4 = 'Зона свободного слова - модерируется сообществом ';
____loclib.aboutYoutubeImgAndText5 = 'На Bastyon можно говорить на острые темы (а их с каждым днем становится все больше): COVID, политика, изменение климата, первая и вторая поправки. Сообщество пользователей модерирует Bastyon, и единственные темы, которые блокируются, - это порнография и незаконный контент.';
____loclib.aboutYoutubeImgAndText6 = 'Мы верим в настоящую свободу слова, и сообщество пользователей не запрещает и не модерирует контент на основании несогласия мнений. Кроме того, Bastyon не принадлежит корпорации и не зависит от банковской системы.';
____loclib.aboutYoutubeImgAndText7 = 'ПРИВАТНЫЙ И БЕЗОПАСНЫЙ';
____loclib.aboutYoutubeImgAndText8 = 'Bastyon не собирает никакой личной информации. Ни имена, ни номера телефона, ни IP-адреса, ни вашу личность. Ваш вход в аккаунт Bastyon - это ваш приватный ключ, только вы имеете над ним контроль, даже разработчики не смогут получить доступ или восстановить его, если потеряют.';
____loclib.aboutYoutubeImgAndText9 = 'БЕЗ ЦЕНЗУРЫ';
____loclib.aboutYoutubeImgAndText10 = 'Bastyon не будет цензурировать ваши видео. Даже администраторы не смогут заблокировать ваш аккаунт и забанить вас. Ваш аккаунт - это ВАШ аккаунт, и ваши подписчики всегда смогут свободно следить за вами.';
____loclib.aboutYoutubeImgAndText11 = 'Bastyon основан на блокчейне: нет никакого способа удалить аккаунты и видео';
____loclib.aboutYoutubeImgAndText12 = 'Каждое видео регистрируется в блокчейне и, в силу своей природы, не может быть удалено. Кем угодно.';
____loclib.aboutYoutubeImgAndText13 = 'Каждое опубликованное вами видео останется там навсегда. Никто, правда, не может подвергнуть их цензуре. Никто не может удалить ваши видео, подписчиков и аккаунт.';
____loclib.aboutYoutubeImgAndText14 = 'Сопротивление цензуре ';
____loclib.aboutYoutubeImgAndText15 = 'Bastyon работает в сети узлов на машинах пользователей. Даже если главный сайт Bastyon.com заблокирован, платформа продолжает нормально работать через приложение для настольных компьютеров. Поскольку нет корпорации, никто не может наложить на Bastyon цензуру, которой не желают пользователи.';
____loclib.aboutYoutubeImgAndText16 = 'Bastyon - это протокол, а не компания или социальная сеть';
____loclib.aboutYoutubeImgAndText17 = 'В отличие от Facebook и других социальных сетей, за Bastyon не стоит компания. Это проект с открытым исходным кодом. Это означает, что нет компании, которая могла бы контролировать контент, размещенный на Bastyon';

____loclib.aboutYoutubeSecondBoard1 = 'Bastyon - лучшая альтернатива YouTube';
____loclib.aboutYoutubeSecondBoard2 = 'Ваши личные данные не продаются сторонним компаниям';
____loclib.aboutYoutubeSecondBoard3 = 'Никто не может заблокировать ваш аккаунт или удалить ваши видео и подписчиков';
____loclib.aboutYoutubeSecondBoard4 = 'Никакой личной информации от пользователей';
____loclib.aboutYoutubeSecondBoard5 = 'Доступ из любой страны и региона мира, даже если домен недоступен.';
____loclib.aboutYoutubeSecondBoard6 = 'Сохраните своих подписчиков навсегда, они ваши';
____loclib.aboutYoutubeSecondBoard7 = 'Bastyon не удалит ваших подписчиков, видео и деньги!';
____loclib.aboutYoutubeSecondBoard8 = 'Вы никогда не будете ДЕМОНЕТИЗИРОВАНЫ и сохраните 100% доходов от рекламы. Свобода слова - это реально.';
____loclib.aboutYoutubeSecondBoard9 = 'Вы будете зарабатывать БОЛЬШЕ за размещение своих видео!';


____loclib.aboutYoutubeThirdBoard1 = 'Владение аккаунтом';
____loclib.aboutYoutubeThirdBoard2 = 'Собственность YouTube.';
____loclib.aboutYoutubeThirdBoard3 = 'Ваш закрытый ключ принадлежит вам';
____loclib.aboutYoutubeThirdBoard4 = 'Цензура';
____loclib.aboutYoutubeThirdBoard5 = 'Да, избирательная и произвольная цензура';
____loclib.aboutYoutubeThirdBoard6 = 'Сообщество модерирует контент, модерируются лишь некоторые темы, такие как порнография и незаконный контент';
____loclib.aboutYoutubeThirdBoard7 = 'Открытый код';
____loclib.aboutYoutubeThirdBoard8 = 'НЕТ';
____loclib.aboutYoutubeThirdBoard9 = 'Да, открыт для всех';
____loclib.aboutYoutubeThirdBoard10 = 'Одни и те же правила для всех';
____loclib.aboutYoutubeThirdBoard11 = 'Да, основан на открытом исходном коде';
____loclib.aboutYoutubeThirdBoard12 = 'Монетизация';
____loclib.aboutYoutubeThirdBoard13 = 'YouTube делится тем, чем хочет';
____loclib.aboutYoutubeThirdBoard14 = '100% блогеру';
____loclib.aboutYoutubeThirdBoard15 = 'Что делать, если домен заблокирован в какой-то стране?';
____loclib.aboutYoutubeThirdBoard16 = 'YouTube недоступен';
____loclib.aboutYoutubeThirdBoard17 = 'Bastyon работает напрямую с узлами';
____loclib.aboutYoutubeThirdBoard18 = 'Внутренняя криптовалюта для монетизации и платежей';
____loclib.aboutYoutubeThirdBoard19 = 'Нет';
____loclib.aboutYoutubeThirdBoard20 = 'Да';
____loclib.aboutYoutubeThirdBoard21 = 'Возможность отправлять криптовалюту в сообщениях чата';
____loclib.aboutYoutubeThirdBoard22 = 'Нет';
____loclib.aboutYoutubeThirdBoard23 = 'Да';
____loclib.aboutYoutubeThirdBoard24 = 'Личная информация';
____loclib.aboutYoutubeThirdBoard25 = 'Имя, номер телефона';
____loclib.aboutYoutubeThirdBoard26 = 'Нет';





____loclib.aboutYoutubeThirdBoard18 = 'Жалобы на видео';
____loclib.aboutYoutubeThirdBoard19 = 'ДА, алгоритмы YouTube анализируют видео и автоматически удаляют или блокируют их, если считают, что они противоречат политике. Кроме того, YouTube может удалять сообщения и запрещать пользователей по своему усмотрению.';
____loclib.aboutYoutubeThirdBoard20 = 'ДА, однако только пользователи с высокой репутацией могут сообщать о постах, и пост становится "невидимым" на странице ленты (но остается доступным на странице профиля пользователя), только если о нем сообщит несколько десятков пользователей с высокой репутацией (сообщения могут быть сделаны только в отношении расизма, языка вражды и порнографии).';
____loclib.aboutYoutubeThirdBoard21 = 'Хэштеги для классификации видео';
____loclib.aboutYoutubeThirdBoard22 = 'Видео можно распространять на нескольких платформах';
____loclib.aboutYoutubeThirdBoard23 = 'Диктатура запретов';
____loclib.aboutYoutubeThirdBoard24 = 'Слишком много!';
____loclib.aboutYoutubeThirdBoard25 = 'Bastyon платит вам гораздо больше, чем YouTube!';
____loclib.aboutYoutubeThirdBoard26 = 'Вы можете зарабатывать деньги с Bastyon.';
____loclib.aboutYoutubeThirdBoard27 = 'Bastyon использует собственную криптовалюту:';
____loclib.aboutYoutubeThirdBoard28 = 'Каждый раз, когда ваши посты и видео получают комментарии и лайки, вы получаете PKOIN.';
____loclib.aboutYoutubeThirdBoard29 = 'Каждый раз, когда одно из ваших видео набирает 15k просмотров, плюс 1250 реакций и 1000 реферальных пользователей, вы получаете 1,000 $ в PKOIN (вы можете конвертировать их в USD!). ЭТО ПРЕДЛОЖЕНИЕ ОГРАНИЧЕНО ПО ВРЕМЕНИ!!!';
____loclib.aboutYoutubeThirdBoard30 = 'Каждый раз, когда кто-то присоединяется к Bastyon по вашей реферальной ссылке, вы получаете PKOIN.';
____loclib.aboutYoutubeThirdBoard31 = "Свяжитесь с нами, чтобы узнать больше и активировать свой аккаунт как 'CREATOR', чтобы вы могли размещать неограниченное количество видео и получать деньги!";

____loclib.aboutYoutubeOpenBoard1 = 'Откройте для себя Bastyon';
____loclib.aboutYoutubeOpenBoard2 = 'Вы можете использовать Bastyon через браузер или загрузить мобильное и десктопное приложение';
____loclib.aboutYoutubeOpenBoard3 = 'Официальный сайт';

____loclib.sourceCode = 'Исходный код';

____loclib.aboutYoutubeDiscover1 = 'Присоединяйтесь к Bastyon сегодня и станьте владельцем своей судьбы!';
____loclib.aboutYoutubeDiscover2 = 'Отправьте нам сообщение, если вам нужна помощь или если вы создатель контента, блогер, инфлюенсер и хотите разблокировать свой бонус и проверить свой профиль!';
////////////////////////////////////////////////////Twitter
____loclib.aboutMainBoard = 'Bastyon, Лучшая альтернатива Twitter. Оставьте в прошлом запреты и блокировки';
____loclib.aboutMainBoard1 = 'Бесплатная, частная и безопасная социальная сеть';

____loclib.aboutTwitterMainDescriptionText1 = 'Некоторые люди спрашивают нас:';
____loclib.aboutTwitterMainDescriptionText2 = "Почему я должен использовать Bastyon?";
____loclib.aboutTwitterMainDescriptionText3 = 'На самом деле вопрос заключается в следующем:';
____loclib.aboutTwitterMainDescriptionText4 = '"Почему вы должны использовать Twitter?!"';
____loclib.aboutTwitterMainDescriptionText5 = 'TWITTER ДЕЙСТВУЕТ КАК ДИКТАТОРСКОЕ ГОСУДАРСТВО';
____loclib.aboutTwitterMainDescriptionText6 = 'Да, мы знаем, что это сильное заявление';
____loclib.aboutTwitterMainDescriptionText7 = 'Но, к сожалению, именно это и происходит в Twitter.';

____loclib.aboutTwitterThreeColumn1 = 'За последние несколько лет было забанено много, слишком много аккаунтов. Некоторые из них без всякой причины';
____loclib.aboutTwitterThreeColumn2 = 'Другие просто потому, что они принадлежали к определенной политической стороне (консервативной)';
____loclib.aboutTwitterThreeColumn3 = 'Здесь ниже вы найдете краткий список аккаунтов, которые были забанены или приостановлены Twitter, вместе с причиной.';
____loclib.aboutTwitterThreeColumn4 = 'Вы можете сделать свои собственные выводы: вы можете легко понять, как Twitter банил людей по нескольким неопределенным причинам, за простое высказывание о том, что лидер талибов был сторонником шариата, за поддержку движения "Оккупай" без нарушения какой-либо политики.';
____loclib.aboutTwitterThreeColumn5 = 'Это тот вид цензуры, который мы не хотим видеть на Bastyon, и именно поэтому протокол был создан в первую очередь';

____loclib.aboutTitterBannedAcc1 = 'Создание сообщества в Twitter - это как строительство дома на земле, которая вам не принадлежит';
____loclib.aboutTitterBannedAcc2 = 'Нажмите здесь, чтобы увидеть список аккаунтов, запрещенных Twitter в 2019 году';
____loclib.aboutTitterBannedAcc3 = 'Аккаунт';
____loclib.aboutTitterBannedAcc4 = 'Wikipedia';
____loclib.aboutTitterBannedAcc5 = 'Человек/аккаунт';
____loclib.aboutTitterBannedAcc6 = 'Описание';
____loclib.aboutTitterBannedAcc7 = 'Дата';
____loclib.aboutTitterBannedAcc8 = 'Продолжительность';
____loclib.aboutTitterBannedAcc9 = 'Причина приостановки';
____loclib.aboutTitterBannedAcc10 = 'Подписчики на момент приостановки';
____loclib.aboutTitterBannedAcc11 = 'Даррен Миллс';
____loclib.aboutTitterBannedAcc12 = 'Связанный с Россией аккаунт';
____loclib.aboutTitterBannedAcc13 = '43285';
____loclib.aboutTitterBannedAcc14 = 'Постоянно';
____loclib.aboutTitterBannedAcc15 = 'Разоблачен как вымышленное лицо, управляемое российской фабрикой троллей.';

____loclib.aboutTitterH3Section1 = 'Почему Bastyon?';
____loclib.aboutTitterH3Section2 = 'Нет правительственного контроля';
____loclib.aboutTitterH3Section3 = 'Bastyon работает на сети узлов, которые ни одно правительство не может заблокировать или ограничить. Даже если главный сайт Bastyon.com становится недоступным или взламывается, платформа продолжает работать нормально. Правительство не может навязать Bastyon свою цензуру или ограничения';
____loclib.aboutTitterH3Section4 = 'ПРИВАТНЫЙ И БЕЗОПАСНЫЙ';
____loclib.aboutTitterH3Section5 = 'Bastyon не собирает никакой личной информации. Ни IP-адрес, ни электронная почта, ни номер телефона. Мы верим в реальную защиту конфиденциальности и безопасность данных.';

____loclib.aboutTitterImgAndText1 = 'БЕЗ ЦЕНЗУРЫ';
____loclib.aboutTitterImgAndText2 = 'Bastyon не будет подвергать цензуре ваши сообщения и видео. Даже администраторы не смогут заблокировать ваш аккаунт и забанить вас.';
____loclib.aboutTitterImgAndText3 = 'В отличие от Twitter, Bastyon не применяет диктаторский метод удаления контента и пользователей. Существует длинный список людей, которые были временно или навсегда забанены Твиттером по мелким причинам или вообще без видимых причин.';
____loclib.aboutTitterImgAndText4 = 'На Bastyon баны просто невозможны: он основан на блокчейне, и никто не в силах отменить блок из него. Каждый пост всегда останется там. Даже если администратор или пользователь захочет запретить ваши посты, он никогда не сможет этого сделать.';
____loclib.aboutTitterImgAndText5 = 'Цензура запрещена самой технологией. Даже если однажды создатели Bastyon захотят закрыть платформу, посты всегда будут там, и социальная сеть может быть создана заново с той же точки, с которой она была оставлена.';
____loclib.aboutTitterImgAndText6 = 'ЗА BASTYON НЕ СТОИТ КОМПАНИЯ';
____loclib.aboutTitterImgAndText7 = 'В отличие от Twitter и основных социальных сетей, за Bastyon не стоит никакой компании. Это проект с открытым исходным кодом. Это означает, что нет компании, которая могла бы контролировать содержимое, размещенное на Bastyon. Никаких запретов, никакой цензуры.';
____loclib.aboutTitterImgAndText8 = 'В отличие от Twitter...';
____loclib.aboutTitterImgAndText9 = 'Вы никогда не будете заблокированы или забанены за то, что просто поддерживаете свои идеи, религии, движения, не причиняя вреда другим людям';
____loclib.aboutTitterImgAndText10 = 'Никто не может заблокировать ваш аккаунт или удалить ваши сообщения';
____loclib.aboutTitterImgAndText11 = 'Конфиденциальность полная и гарантированная';
____loclib.aboutTitterImgAndText12 = 'Доступ всегда возможен из любой страны и региона мира';
____loclib.aboutTitterImgAndText13 = 'Сеансы чата полностью приватны и зашифрованы, и даже Bastyon не может получить к ним доступ. Даже с судебным ордером.';
____loclib.aboutTitterImgAndText14 = 'Ваши сообщения могут быть длиннее';


____loclib.aboutTitterTable1 = 'TWITTER';
____loclib.aboutTitterTable2 = 'BASTYON';
____loclib.aboutTitterTable3 = 'Владение аккаунтом';
____loclib.aboutTitterTable4 = 'Собственность Twitter';
____loclib.aboutTitterTable5 = 'Ваш закрытый ключ принадлежит вам';
____loclib.aboutTitterTable6 = 'Ваш доступ к вашей аудитории';
____loclib.aboutTitterTable7 = 'Не все ваши подписчики видят ваше сообщение, Facebook контролирует долю аудитории, которая его видит';
____loclib.aboutTitterTable8 = 'Каждый ваш подписчик видит ваш пост';
____loclib.aboutTitterTable9 = 'Цензура';
____loclib.aboutTitterTable10 = 'Да, выборочная и произвольная цензура, много теневых банов';
____loclib.aboutTitterTable11 = 'Сообщество модерирует контент, модерируются лишь некоторые темы, такие как порнография и незаконный контент';
____loclib.aboutTitterTable12 = 'Открытый код';
____loclib.aboutTitterTable13 = 'Нет';
____loclib.aboutTitterTable14 = 'Да, открыто для всех';
____loclib.aboutTitterTable15 = 'Одинаковые правила для всех';
____loclib.aboutTitterTable16 = 'Нет';
____loclib.aboutTitterTable17 = 'Да, на основе открытого кода';
____loclib.aboutTitterTable18 = 'Монетизация';
____loclib.aboutTitterTable19 = 'Twitter делится тем, чем хочет';
____loclib.aboutTitterTable20 = '100% блогеру через PKOIN';
____loclib.aboutTitterTable21 = 'Что делать, если домен заблокирован в какой-то стране?';
____loclib.aboutTitterTable22 = 'Twiter недоступен';
____loclib.aboutTitterTable23 = 'Bastyon работает напрямую с узлами';
____loclib.aboutTitterTable24 = 'Личные сообщения';
____loclib.aboutTitterTable25 = 'Twitter может прочитать каждое сообщение';
____loclib.aboutTitterTable26 = 'Bastyon использует одноранговое шифрование для личных чатов, никто не может их прочитать';
____loclib.aboutTitterTable27 = 'Внутреннее шифрование для монетизации и платежей';
____loclib.aboutTitterTable28 = 'Нет';
____loclib.aboutTitterTable29 = 'Да';
____loclib.aboutTitterTable30 = 'Возможность отправлять криптовалюту в сообщениях чата';
____loclib.aboutTitterTable31 = 'Нет';
____loclib.aboutTitterTable32 = 'Да';
____loclib.aboutTitterTable33 = 'Личная информация';
____loclib.aboutTitterTable34 = 'Имя, номер телефона';
____loclib.aboutTitterTable35 = 'Нет';



____loclib.aboutTitterMainBoard31 = 'И это еще не все! Bastyon платит вам.';
____loclib.aboutTitterMainBoard32 = 'Вы можете зарабатывать деньги с Bastyon.';
____loclib.aboutTitterMainBoard33 = 'Bastyon использует собственную криптовалюту:';
____loclib.aboutTitterMainBoard34 = 'Каждый раз, когда ваши посты и видео получают комментарии и лайки, вы получаете PKOIN.';
____loclib.aboutTitterMainBoard35 = 'Каждый раз, когда одно из ваших видео набирает 15 000 просмотров + 1 250 реакций, вы получаете 1 000 $ в PKOIN (вы можете конвертировать их в USD!). ЭТО ПРЕДЛОЖЕНИЕ ОГРАНИЧЕНО ПО ВРЕМЕНИ!!!';
____loclib.aboutTitterMainBoard36 = 'Каждый раз, когда кто-то присоединяется к Bastyon по вашей реферальной ссылке, вы получаете PKOIN.';
____loclib.aboutTitterMainBoard37 = "Свяжитесь с нами, чтобы узнать больше и активировать свой аккаунт как 'CREATOR', чтобы вы могли размещать неограниченное количество видео и получать деньги!";


____loclib.aboutTitterOpen1 = 'Откройте для себя Bastyon';
____loclib.aboutTitterOpen2 = 'Вы можете использовать Bastyon через браузер или загрузить приложение для мобильных и настольных компьютеров';
____loclib.aboutTitterOpen3 = 'Официальный сайт';
____loclib.aboutTitterOpen4 = 'Исходный код';
____loclib.aboutTitterOpen5 = 'Свяжитесь с нами';
____loclib.aboutTitterOpen6 = 'Отправьте нам сообщение, если вам нужна помощь или если вы создатель контента, блоггер, инфлюенсер и хотите разблокировать свой бонус и верифицировать свой профиль!';


/////////////aboutFacebook
____loclib.aboutFbMainBoard = 'Bastyon - лучшая альтернатива Facebook';
____loclib.aboutFbMainBoard1 = 'Социальный и финансовый протокол';

____loclib.aboutFbMainDesc = 'Bastyon не является альтернативой Facebook';
____loclib.aboutFbMainDesc1 = 'Bastyon - это анти-Facebook';
____loclib.aboutFbMainDesc2 = '-- Джон Мильтон';


____loclib.aboutFbH3Section = 'Почему именно Bastyon?';
____loclib.aboutFbH3Section1 = 'Нет правительственного контроля';
____loclib.aboutFbH3Section2 = 'Bastyon работает на сети узлов, которые ни одно правительство не может заблокировать или ограничить. Даже если главный сайт Bastyon.com становится недоступным или взламывается, платформа продолжает работать нормально. Правительство не может навязать Bastyon свою цензуру или ограничения';
____loclib.aboutFbH3Section3 = 'ПРИВАТНЫЙ И БЕЗОПАСНЫЙ';
____loclib.aboutFbH3Section4 = 'Bastyon не собирает никакой личной информации. Ни IP-адрес, ни электронная почта, ни номер телефона. Мы верим в реальную защиту конфиденциальности и безопасность данных.';



____loclib.aboutFbImgAndText = 'БЕЗ ЦЕНЗУРЫ';
____loclib.aboutFbImgAndText2 = 'Bastyon не будет подвергать цензуре ваши сообщения и видео. Даже администраторы не смогут заблокировать ваш аккаунт и забанить вас.';
____loclib.aboutFbImgAndText3 = 'Bastyon основан на блокчейне: здесь вообще нет возможности удалять посты. Каждый пост регистрируется в блокчейне и, в силу своей природы, не может быть удален. Никто';
____loclib.aboutFbImgAndText4 = 'ЗА BASTYON НЕ СТОИТ КОМПАНИЯ';
____loclib.aboutFbImgAndText5 = 'В отличие от Facebook и других социальных сетей, за Bastyon не стоит компания. Это проект с открытым исходным кодом. Это означает, что нет компании, которая могла бы контролировать содержимое, размещенное на Bastyon. Никаких запретов, никакой цензуры.';
____loclib.aboutFbImgAndText6 = 'В отличие от Facebook...';
____loclib.aboutFbImgAndText7 = 'Ваши личные данные не продаются сторонним компаниям';
____loclib.aboutFbImgAndText8 = 'Нет произвольной цензуры';
____loclib.aboutFbImgAndText9 = 'Не собирает личную информацию';
____loclib.aboutFbImgAndText10 = 'За ним не стоит корпорация';
____loclib.aboutFbImgAndText11 = 'Сеансы чата полностью приватны и зашифрованы, и даже Bastyon не может получить к ним доступ';
____loclib.aboutFbImgAndText12 = 'Марк Цукерберг вас не побеспокоит!';



____loclib.aboutFbTable = 'FACEBOOK';
____loclib.aboutFbTable1 = 'BASTYON';
____loclib.aboutFbTable2 = 'Владение аккаунтом';
____loclib.aboutFbTable3 = 'Собственность Facebook';
____loclib.aboutFbTable4 = 'Ваш закрытый ключ принадлежит вам';
____loclib.aboutFbTable5 = 'Ваш доступ к вашей аудитории';
____loclib.aboutFbTable6 = 'Не все ваши подписчики видят ваш пост, Facebook контролирует долю аудитории, которая его видит';
____loclib.aboutFbTable7 = 'Каждый ваш подписчик видит ваш пост';
____loclib.aboutFbTable8 = 'Цензура';
____loclib.aboutFbTable9 = 'Да, выборочная и произвольная цензура';
____loclib.aboutFbTable10 = 'Сообщество модерирует контент, модерируются лишь некоторые темы, такие как порнография и незаконный контент';
____loclib.aboutFbTable11 = 'Открытый код';
____loclib.aboutFbTable12 = 'Нет';
____loclib.aboutFbTable13 = 'Да, открыт для всех';
____loclib.aboutFbTable14 = 'Одинаковые правила для всех';
____loclib.aboutFbTable15 = 'Нет';
____loclib.aboutFbTable16 = 'Да, основан на открытом исходном коде';
____loclib.aboutFbTable17 = 'Монетизация';
____loclib.aboutFbTable18 = 'Facebook делится тем, чем хочет';
____loclib.aboutFbTable19 = '100% блогеру через PKOIN';
____loclib.aboutFbTable20 = 'Что делать, если домен заблокирован в какой-то стране?';
____loclib.aboutFbTable21 = 'Facebook недоступен';
____loclib.aboutFbTable22 = 'Bastyon работает напрямую с узлами';
____loclib.aboutFbTable23 = 'Личные сообщения';
____loclib.aboutFbTable24 = 'Facebook может прочитать каждое сообщение';
____loclib.aboutFbTable25 = 'Bastyon использует одноранговое шифрование для личных чатов , никто не может их прочитать';
____loclib.aboutFbTable26 = 'Марк Цукерберг';
____loclib.aboutFbTable27 = 'Всегда рядом с вами';
____loclib.aboutFbTable28 = 'НЕТ!';
____loclib.aboutFbTable29 = 'Внутренняя криптовалюта для монетизации и платежей';
____loclib.aboutFbTable30 = 'Нет';
____loclib.aboutFbTable31 = 'Да';
____loclib.aboutFbTable32 = 'Возможность отправлять криптовалюту в сообщениях чата';
____loclib.aboutFbTable33 = 'Нет';
____loclib.aboutFbTable34 = 'Да';
____loclib.aboutFbTable35 = 'Личная информация';
____loclib.aboutFbTable36 = 'Имя, номер телефона';
____loclib.aboutFbTable37 = 'Нет';



____loclib.aboutFbMainBoard3 = 'И это еще не все! Bastyon платит вам.';
____loclib.aboutFbMainBoard31 = 'Вы можете зарабатывать деньги с Bastyon.';
____loclib.aboutFbMainBoard32 = 'Bastyon использует свою собственную криптовалюту: ';
____loclib.aboutFbMainBoard33 = 'Каждый раз, когда ваши посты и видео получают комментарии и лайки, вы получаете PKOIN.';
____loclib.aboutFbMainBoard34 = 'Каждый раз, когда одно из ваших видео набирает 15 000 просмотров + 1 250 реакций, вы получаете 1 000 $ в PKOIN (вы можете конвертировать их в USD!). ЭТО ПРЕДЛОЖЕНИЕ ОГРАНИЧЕНО ПО ВРЕМЕНИ!!!';
____loclib.aboutFbMainBoard34 = 'Каждый раз, когда кто-то присоединяется к Bastyon по вашей реферальной ссылке, вы получаете PKOIN.';
____loclib.aboutFbMainBoard35 = "Свяжитесь с нами, чтобы узнать больше и активировать свой аккаунт 'АВТОРА', чтобы вы могли размещать неограниченное количество видео и получать деньги!";


____loclib.aboutFbOpen = 'Откройте для себя Bastyon';
____loclib.aboutFbOpen1 = 'Вы можете использовать Bastyon через браузер или загрузить мобильное и десктопное приложение';
____loclib.aboutFbOpen2 = 'Официальный сайт';
____loclib.aboutFbOpen3 = 'Исходный код';
____loclib.aboutFbOpen4 = 'Свяжитесь с нами';
____loclib.aboutFbOpen5 = 'Отправьте нам сообщение, если вам нужна помощь или если вы создатель контента, блогер, инфлюенсер и хотели бы разблокировать свой бонус и верифицировать свой профиль!';


/////aboutHIW

____loclib.aboutHowItWMainBoard = 'КАК BASTYON ПРОТИВОСТОИТ ЦЕНЗУРЕ?';
____loclib.aboutHowItWMainBoard1 = 'БЕСПЛАТНО, ПРИВАТНО, БЕЗОПАСНО И БЕЗ КОРПОРАТИВНОГО КОНТРОЛЯ';
____loclib.aboutHowItWMainBoard2 = 'ДЫШИТЕ ГЛУБЖЕ С BASTYON.';



____loclib.aboutHowItWMD = 'Bastyon - это Биткойн социальных сетей';



____loclib.aboutHowItWImgAndText = 'На базе блокчейна';
____loclib.aboutHowItWImgAndText1 = 'Что такое блокчейн?';
____loclib.aboutHowItWImgAndText2 = 'Как говорится в Википедии, "блокчейн - это растущий список записей, называемых блоками, которые связаны между собой с помощью криптографии"';
____loclib.aboutHowItWImgAndText3 = 'Он также описывается как "бездоверительное и полностью децентрализованное одноранговое неизменяемое хранилище данных", которое распространяется по сети участников, часто называемых узлами. Каждый блок содержит криптографический хэш предыдущего блока, временную метку и данные о транзакции.';
____loclib.aboutHowItWImgAndText4 = 'Временная метка доказывает, что данные транзакции существовали в момент публикации блока, чтобы попасть в его хэш.';
____loclib.aboutHowItWImgAndText5 = 'Поскольку каждый блок содержит информацию о предыдущем блоке, они образуют цепочку, причем каждый дополнительный блок усиливает предыдущие.';
____loclib.aboutHowItWImgAndText6 = 'Поэтому блокчейн устойчив к модификации своих данных, так как после записи данные в любом блоке не могут быть изменены задним числом без изменения всех последующих блоков.';
____loclib.aboutHowItWImgAndText7 = 'Итак, как блокчейн защищает от цензуры?';
____loclib.aboutHowItWImgAndText8 = 'От Биткойн до Bastyonа.';
____loclib.aboutHowItWImgAndText9 = 'Блокчейн - это технология, лежащая в основе всех криптовалют. Биткоины, Ethereum, Dogecoins и так далее - все они работают на основе блокчейна.';
____loclib.aboutHowItWImgAndText10 = 'Принцип прост: то, что происходит на блокчейне, остается на блокчейне. Навсегда.';
____loclib.aboutHowItWImgAndText11 = 'Все существующие блоки блокчейна неизменяемы и постоянны. ';
____loclib.aboutHowItWImgAndText12 = 'Подумайте о криптовалюте: когда вы отправляете кому-то Биткойн, транзакция регистрируется в блокчейне.';
____loclib.aboutHowItWImgAndText13 = 'С этого момента транзакция не может быть отменена, модифицирована, изменена, удалена, приостановлена, отредактирована в любой своей части. Она есть и остается там навсегда. И вы можете исследовать блоки на блокчейне, чтобы увидеть все транзакции.';
____loclib.aboutHowItWImgAndText14 = 'Bastyon работает ТОЧНО так же. Каждый пост, каждый аккаунт, каждое видео связывается с блокчейном. И, попав туда, оно не может быть удалено.';
____loclib.aboutHowItWImgAndText15 = 'Действительно, Bastyon работает на форке оригинального блокчейна Bitcoin.';
____loclib.aboutHowItWImgAndText16 = 'Устойчив к цензуре';
____loclib.aboutHowItWImgAndText17 = 'Не только блокчейн.';
____loclib.aboutHowItWImgAndText18 = 'Bastyon не принадлежит корпорации';
____loclib.aboutHowItWImgAndText19 = 'Bastyon - проект с открытым исходным кодом';
____loclib.aboutHowItWImgAndText20 = 'Bastyon работает в сети децентрализованных узлов, если вы используете настольное приложение Bastyon, оно напрямую обращается к узлам по всему миру';
____loclib.aboutHowItWImgAndText21 = 'Кроме того, даже если правительство захочет удалить пост, это технически невозможно';
____loclib.aboutHowItWImgAndText22 = 'Аналогично, поскольку он работает на сети узлов, нет возможности ограничить доступ к Bastyon. Даже в случае, если правительство заблокирует доступ к сайту https://bastyon.com, вы всегда сможете получить доступ к нему с помощью мобильного или настольного приложения, которое подключается непосредственно к узлам.';
____loclib.aboutHowItWImgAndText23 = 'Защита конфиденциальности,';
____loclib.aboutHowItWImgAndText24 = 'для вашей безопасности';
____loclib.aboutHowItWImgAndText25 = 'Bastyon не знает, кто вы';
____loclib.aboutHowItWImgAndText26 = 'Bastyon НЕ собирает никакой личной информации';
____loclib.aboutHowItWImgAndText27 = 'Вы можете  оставить свою электронную почту для получения уведомительной рассылки, но она никак не связана с вашим аккаунтом.';
____loclib.aboutHowItWImgAndText28 = 'Bastyon не запрашивает ваше настоящее имя для защиты инакомыслия';
____loclib.aboutHowItWImgAndText29 = 'Bastyon не собирает IP-адреса и не отслеживает вас';
____loclib.aboutHowItWImgAndText291 = 'Bastyon позволяет использовать несколько аккаунтов для разных целей';
____loclib.aboutHowItWImgAndText30 = 'Bastyon никогда не узнает, кто вы, если вы явно не поделитесь своими личными данными';
____loclib.aboutHowItWImgAndText31 = 'Если вы не поделитесь своими данными, никто, ни компания, ни правительство, не смогут узнать, кто вы такой';


____loclib.aboutHowItWImgAndText51 = 'Почему криптовалюта нужна для свободы?';
____loclib.aboutHowItWImgAndText52 = 'Некоторые люди считают, что цифровая валюта - это инструмент для порабощения. Как ни странно, многие из этих людей носят в карманах банковские карты с микрочипом. Банковские карты, которые отслеживают каждую покупку и привязаны непосредственно к вашей личности. Причина, по которой криптовалюта нужна для свободы, заключается в том, что она не привязана к вашей личности. Как в Bitcoin, так и в Pocketcoin каждый пользователь может создавать миллионы адресов и менять их столько, сколько нужно.';



____loclib.HIVTable1 = 'Кредитные карты';
____loclib.HIVTable2 = 'Наличные';
____loclib.HIVTable3 = 'Криптовалюта';
____loclib.HIVTable4 = 'Привязаны к вашей личности';
____loclib.HIVTable5 = 'Да';
____loclib.HIVTable6 = 'Нет';
____loclib.HIVTable7 = 'Нет';
____loclib.HIVTable8 = 'Правительство контролирует денежную массу';
____loclib.HIVTable9 = 'Да';
____loclib.HIVTable10 = 'Да';
____loclib.HIVTable11 = 'Нет';
____loclib.HIVTable12 = 'Анонимность';
____loclib.HIVTable13 = 'Неанонимно';
____loclib.HIVTable14 = 'Анонимно';
____loclib.HIVTable15 = 'Псевдонимно';
____loclib.HIVTable16 = 'Легко платить на больших расстояниях';
____loclib.HIVTable17 = 'Да';
____loclib.HIVTable18 = 'Нет';
____loclib.HIVTable19 = 'Да';
____loclib.HIVTable20 = 'Прозрачный, открытый для общественности';
____loclib.HIVTable21 = 'Нет';
____loclib.HIVTable22 = 'Нет';
____loclib.HIVTable23 = 'Да';
____loclib.HIVTable24 = 'Имеются в виду децентрализованные криптовалюты, такие как Биткойн или Покеткойн';





____loclib.aboutHowItWImgAndText32 = 'И это еще не все!';
____loclib.aboutHowItWImgAndText33 = 'Bastyon платит вам';
____loclib.aboutHowItWImgAndText34 = 'Вы можете зарабатывать деньги с Bastyon.';
____loclib.aboutHowItWImgAndText35 = 'Bastyon использует собственную криптовалюту:';
____loclib.aboutHowItWImgAndText36 = 'Каждый раз, когда ваши посты получают комментарии и лайки, вы получаете PKOIN.';
____loclib.aboutHowItWImgAndText37 = "Каждый раз, когда ваше видео набирает 15 000 просмотров + 750 реакций '5 звезд', вы получаете 1 000 $ в PKOIN (вы можете конвертировать их в USD!). ЭТО ПРЕДЛОЖЕНИЕ ОГРАНИЧЕНО ПО ВРЕМЕНИ!!! ";
____loclib.aboutHowItWImgAndText38 = 'Каждый раз, когда кто-то присоединяется к Bastyon по вашей реферальной ссылке, вы получаете PKOIN.';
____loclib.aboutHowItWImgAndText39 = "Свяжитесь с нами, чтобы узнать больше и активировать свой аккаунт как 'CREATOR', чтобы вы могли размещать неограниченное количество видео и получать деньги!";
____loclib.aboutHowItWImgAndText40 = 'Следующий шаг: свяжитесь с нами, чтобы подтвердить свой аккаунт в Bastyon и получить доступ к бонусной программе';
____loclib.aboutHowItWImgAndText41 = 'Свяжитесь с нами сейчас';


____loclib.aboutHowItWOpen = 'Откройте для себя Bastyon';
____loclib.aboutHowItWOpen1 = 'Вы можете использовать Bastyon через браузер или загрузить мобильное и настольное приложение';
____loclib.aboutHowItWOpen2 = 'Официальный сайт';
____loclib.aboutHowItWOpen3 = 'Исходный код';
____loclib.aboutHowItWOpen4 = 'Свяжитесь с нами';
____loclib.aboutHowItWOpen5 = 'Отправьте нам сообщение, если вам нужна помощь или если вы создатель контента, блогер,  инфлюенсер и хотели бы разблокировать свой бонус и верифицировать свой профиль!';

//aboutContentCreator

____loclib.ContentCreatorsMainBoard = 'Отличная бонусная программа для создателей контента';
____loclib.ContentCreatorsMainBoard1 = 'Есть много способов заработать деньги с Bastyon...';


____loclib.ContentCreatorsImgAndText = 'Размещайте свои видео';
____loclib.ContentCreatorsImgAndText1 = 'Размещайте свои видео на Bastyon';
____loclib.ContentCreatorsImgAndText2 = '15 000 видео, 1500 пятизвездочных рейтингов от уникальных пользователей и 1500 приглашенных пользователей на ваш канал';
____loclib.ContentCreatorsImgAndText3 = 'Принесут вам $1,000 в Bitcoin или PKOIN';
____loclib.ContentCreatorsImgAndText4 = 'Следующий шаг: свяжитесь с нами, чтобы верифицировать ваш аккаунт Bastyon и получить доступ к бонусной программе.';
____loclib.ContentCreatorsImgAndText5 = 'Свяжитесь с нами сейчас ';
____loclib.ContentCreatorsImgAndText6 = 'Пригласите своих подписчиков';
____loclib.ContentCreatorsImgAndText7 = 'Поделитесь своей личной реферальной ссылкой';
____loclib.ContentCreatorsImgAndText8 = 'Приглашайте своих подписчиков с других платформ (Youtube, Instagram, Facebook, Twitter...)';
____loclib.ContentCreatorsImgAndText9 = 'Зарабатывайте на постах своих подписчиков!';
____loclib.ContentCreatorsImgAndText10 = "Следующий шаг: свяжитесь с нами, чтобы получить значок 'Проверенный' и доступ к бонусной программе.";
____loclib.ContentCreatorsImgAndText11 = 'Свяжитесь с нами сейчас ';
____loclib.ContentCreatorsImgAndText12 = 'Зарабатывайте с каждого поста';
____loclib.ContentCreatorsImgAndText13 = 'Каждый раз, когда ваше сообщение получает лайк или комментарий, вы получаете небольшое вознаграждение';
____loclib.ContentCreatorsImgAndText14 = 'Чем больше вы публикуете, тем больше зарабатываете';
____loclib.ContentCreatorsImgAndText15 = 'Чем больше у вас подписчиков, тем больше вы зарабатываете';
____loclib.ContentCreatorsImgAndText16 = "Следующий шаг: свяжитесь с нами, чтобы получить значок 'Проверенный' и доступ к бонусной программе";
____loclib.ContentCreatorsImgAndText17 = 'Свяжитесь с нами сейчас';
____loclib.ContentCreatorsImgAndText18 = 'Зарабатывайте с помощью децентрализованной рекламы';
____loclib.ContentCreatorsImgAndText19 = 'Объявления приходят к вам через Bastyon Ad Marketplace';
____loclib.ContentCreatorsImgAndText20 = 'Вы можете выбирать, какие объявления репостить на свой канал';
____loclib.ContentCreatorsImgAndText21 = '100% доходов от рекламы, полученных в результате взаимодействия, поступают на ваш кошелек';
____loclib.ContentCreatorsImgAndText22 = "Следующий шаг: свяжитесь с нами, чтобы получить значок 'Проверенный' и доступ к бонусной программе";
____loclib.ContentCreatorsImgAndText23 = 'Свяжитесь с нами сейчас';
____loclib.ContentCreatorsImgAndText24 = 'Зарабатывайте на комментариях';
____loclib.ContentCreatorsImgAndText25 = 'Ваши подписчики могут прикреплять PKOIN к комментариям';
____loclib.ContentCreatorsImgAndText26 = 'Комментарии с PKOIN поднимаются выше';
____loclib.ContentCreatorsImgAndText27 = 'Вы можете упоминать комментарии в эфире, призывающие пользователей добавлять PKOIN';
____loclib.ContentCreatorsImgAndText28 = "Следующий шаг: свяжитесь с нами, чтобы получить значок 'Проверенный' и доступ к бонусной программе";
____loclib.ContentCreatorsImgAndText29 = 'Свяжитесь с нами сейчас';


____loclib.ContentCreatorsOpen = 'Откройте для себя Bastyon';
____loclib.ContentCreatorsOpen1 = 'Вы можете использовать Bastyon через браузер или загрузить мобильное и десктопное приложение';
____loclib.ContentCreatorsOpen2 = 'Официальный сайт';
____loclib.ContentCreatorsOpen3 = 'Исходный код';
____loclib.ContentCreatorsOpen4 = 'Свяжитесь с нами';
____loclib.ContentCreatorsOpen5 = 'Отправьте нам сообщение, если вам нужна помощь или если вы создатель контента, блогер, инфлюенсер и хотите разблокировать свой бонус и верифицировать свой профиль!';





____loclib.MainBoard = 'Боритесь с цензурой и';
____loclib.MainBoard1 = 'обретите финансовую независимость';
____loclib.MainBoard2 = 'Первый протокол социальной сети, устойчивый к цензуре';
____loclib.MainBoard3 = 'Основанный на технологии блокчейн, децентрализованный и безопасный';
____loclib.MainBoard4 = 'Без корпораций, без централизованных серверов, модерируется сообществом';
____loclib.MainBoard5 = 'Работает на Pocketcoin (PKOIN) для вознаграждения создателей и участников';
____loclib.MainBoard55 = 'Открытый исходный код и прозрачные правила, одинаковые для всех';
____loclib.MainBoard6 = 'Подключайтесь';
____loclib.MainBoard7 = 'Google Play';
____loclib.MainBoard8 = 'Скачать для';


____loclib.works = 'Мы верим в свободу';
____loclib.works1 = 'Bastyon - это инновационная сеть, которая может обойти распространенные тактики цензуры, такие как блокировка доменов и запрет блогеров за инакомыслие';
____loclib.works2 = 'Bastyon это платформа для обмена видео где не банят за отличие во мнениях, а модерация производится сообществом на основе прозрачные правил. Bastyon не требует ваших персональных данных, таких как имя или номер телефона.';
____loclib.works3 = 'Bastyon также является приватной и ориентированной на свободу финансовой системой на базе Pocketcoin (PKOIN), которая используется для продвижения контента и товаров';
____loclib.works4 = 'Нами движет СВОБОДА';
____loclib.works5 = 'Не зависит от корпораций';
____loclib.works6 = 'Не зависит от банковской системы';
____loclib.works7 = 'Не зависит от доменов или сайтов, которые могут быть легко заблокированы';

____loclib.contentCreators = 'Для создателей контента';
____loclib.howItWorks = 'Как это работает';
____loclib.insteadOf = 'Вместо';
____loclib.alternativeTo = 'Альтернатива...';

____loclib.comment = 'Комментарий';
____loclib.sendToAuthor = 'Поощрить автора';
____loclib.pkoinComment = 'PKOIN комментарий';
____loclib.liftUpThePost = 'Поднять пост';
____loclib.comments_interesting = 'Сначала интересные'
____loclib.comments_timeup = 'Сначала новые'
____loclib.comments_time = 'Сначала старые'
____loclib.comments_next = 'Показать следующие'

____loclib.create = 'Создать'
____loclib.drafts = 'Черновики'

____loclib.repostyourown = 'Вы не можете сделать репост своей собственной публикации'

____loclib.reachedlimits = 'Вы достигли лимита в некоторых действиях. Чтобы увеличить лимиты, вы должны иметь как минимум 50 PKOIN на счету своего аккаунта или иметь валидную репутацию'

____loclib.closestreachedlimits = 'Вы близки к достижению лимита в некоторых действиях. Чтобы увеличить лимиты, вы должны иметь как минимум 50 PKOIN на счету своего аккаунта или иметь валидную репутацию'


____loclib.sendUserStatistics = 'Отправлять отчеты об ошибках команде разработчиков Bastyon'
____loclib.captionUserStats = 'Статистика'

____loclib.editarticledraft = 'Редактировать черновик статьи'
____loclib.deletearticledraft = 'Удалить черновик статьи'
____loclib.previewarticledraft = 'Просмотр статьи'
____loclib.deletedraftquestion = 'Вы действительно хотите удалить черновик статьи? Восстановление невозможно'
____loclib.publishquestion = 'Вы действительно хотите опубликовать эту статью?'

____loclib.etc = 'И так далее...'
____loclib.openlinkssettings = 'Не открывать ссылки в приложении'






____loclib.nametaken = 'Это имя пользователя уже занято в Bastyon'
____loclib.accountnotfound = 'Не удалось найти ваш аккаунт в блокчейне. Возможно процесс регистрации не был завершен, или отсутствует соединени с интернетом'


____loclib.photohassizegreater = function(v){

	return "Ваша фотография имеет размер больше чем " + v +"MB. Пожалуйста загрузите фотографию размером меньше чем " + v + "MB"

}

____loclib.invalidformat = "Неверный формат картинки. Разрешено только png, jpeg."
____loclib.downloadDesctApp = "Загрузить Bastyon для персонального компьютера"
____loclib.downloadMobileApp = "Установить мобильное приложение"


____loclib.easyNode_e10000 = "Нода"
____loclib.easyNode_e10001 = "Скачать и установить ноду"
____loclib.easyNode_e10002 = "Bastyon нода"
____loclib.easyNode_e10003 = "Загрузка"
____loclib.easyNode_e10004 = "Нода устанавливается"
____loclib.easyNode_e10005 = "Нода удаляется"
____loclib.easyNode_e10006 = "Системные требования"
____loclib.easyNode_e10007 = "Управление нодой недоступно для вашей операционной системы"
____loclib.easyNode_e10008 = "Синхронизация"
____loclib.easyNode_e10009 = "Конфигурация"
____loclib.easyNode_e10010 = "Включено"
____loclib.easyNode_e10011 = "Путь к каталогу ноды"
____loclib.easyNode_e10012 = "Путь к каталогу данных"
____loclib.easyNode_e10013 = "Установить каталог по умолчанию"
____loclib.easyNode_e10014 = "По умолчанию"
____loclib.easyNode_e10015 = "Обновить ноду"
____loclib.easyNode_e10016 = "Нет доступных обновлений"
____loclib.easyNode_e10017 = "Удалить"
____loclib.easyNode_e10018 = "Удалить ноду"
____loclib.easyNode_e10019 = "Удалить ноду и данные"
____loclib.easyNode_e10020 = "Кошелек"
____loclib.easyNode_e10021 = "Статус"
____loclib.easyNode_e10022 = "Запрос данных..."
____loclib.easyNode_e10023 = "Стейкинг"
____loclib.easyNode_e10024 = "Нода не может cейчас выигрывать койны через стейкинг. Добавьте минимум 50 Покеткойнов и подожите 60 минут"
____loclib.easyNode_e10025 = "Баланс"
____loclib.easyNode_e10026 = "Управление"
____loclib.easyNode_e10027 = "Внести"
____loclib.easyNode_e10028 = "Вывести"
____loclib.easyNode_e10029 = "Экспортировать кошелек"
____loclib.easyNode_e10030 = "Импортировать кошелек"
____loclib.easyNode_e10031 = "Активен"
____loclib.easyNode_e10032 = "Версия"
____loclib.easyNode_e10033 = "Блокчейн"
____loclib.easyNode_e10034 = "Описание"
____loclib.easyNode_e10035 = "Высота"
____loclib.easyNode_e10036 = "Осталось меньше часа"
____loclib.easyNode_e10037 = function(v) { return `Осталось менее ${v}ч` }
____loclib.easyNode_e10038 = "Хэш блока"
____loclib.easyNode_e10039 = "Выключить ноду"
____loclib.easyNode_e10040 = "Включить ноду"
____loclib.easyNode_e10041 = "Ваш кошелек сохранен в"
____loclib.easyNode_e10042 = "Ваш кошелек импортирован"
____loclib.easyNode_e10043 = "Ваш новый адрес ноды"
____loclib.easyNode_e10044 = "Введите адрес и сумму для перевода"
____loclib.easyNode_e10045 = "Адрес получателя"
____loclib.easyNode_e10046 = "Сумма"
____loclib.easyNode_e10047 = "Некорректные аргументы"
____loclib.easyNode_e10048 = "Некорректный адрес получателя"
____loclib.easyNode_e10049 = "Некорректная сумма"
____loclib.easyNode_e10050 = "Создана транзакция"
____loclib.easyNode_e10051 = "Вы действительно хотите остановить ноду и обновить его?"
____loclib.easyNode_e10052 = "Убедитесь, что вы сделали резервную копию кошелька. Вы действительно хотите удалить ноду и данные?"
____loclib.easyNode_e10053 = "Вы действительно хотите удалить ноду?"
____loclib.easyNode_e10054 = "Вы действительно хотите установить ноду?"
____loclib.easyNode_e10055 = "Вы действительно хотите установить каталог данных по умолчанию?"
____loclib.easyNode_e10056 = "ГБ свободной оперативной памяти"
____loclib.easyNode_e10058 = "ГБ свободного пространства на жестком диске"
____loclib.easyNode_e10059 = "Мбит/с скорость интернет"
____loclib.easyNode_e10060 = "SSD диск"
____loclib.easyNode_e10061 = "Ваша нода запущена. Все равно закрыть приложение?"
____loclib.easyNode_e10062 = "Доступно обновление Ноды. Загрузить новую версию?"
____loclib.easyNode_e10063 = "Нода успешно обновлена"

____loclib.IHave = "У меня";
____loclib.downloadNode = "Скачать ноду для Windows";
____loclib.months = "месяцев";
____loclib.year = "год";
____loclib.stakingCalculator = "Калькулятор стейкинга - расчитайте, сколько вы можете заработать, используя Покеткоин (PKOIN) внутри ноды";


____loclib.easyNode_e2000 = "Защищайте Свободу Слова и ";
____loclib.easyNode_e2000_1 = "Зарабатывайте ";
____loclib.easyNode_e2000_2 = "Криптовалюту";
____loclib.easyNode_e2001 = "Что же такое Покеткойн? Покеткойн это криптовалюта встроенная в децентрализованную соцсеть Бастион. Покеткойн используется для выплат блогерам и держателям нод, для рекламы в Бастионе, а также даёт дополнительный функционал пользователям, у которых есть Покеткойн.";
____loclib.easyNode_e2002 = "А что такое нода? Нода это компьютер любого пользователя, который поддерживает сеть Бастион и ";
____loclib.easyNode_e2002_1 = " получает ";
____loclib.easyNode_e2002_2 = "за это Покеткойны. Вы можете быть владельцем такого компьютера, если у вас компьютер где есть 50 гигабайт ССД памяти и хорошее интернет соединение.";
____loclib.easyNode_e2002_2_1 = " Заработок ";
____loclib.easyNode_e2002_2_2 = " Покеткойна будет пропорционален количеству Покеткойнов, которое вы положите в свою ноду. В криптовалютах такой алгоритм называется стейкинг.";

____loclib.minPkoin = function (p){
	return `Минимум ${String(p)} PKOIN`
}

____loclib.maxPkoin = function (p){
	return `Максимум ${String(p)} PKOIN`
}

____loclib.topPosts = "Популярные посты";
____loclib.videop2psettings = "Использовать p2p при просмотре видео"

____loclib.art_validatetags = "Пожалуйста добавьте теги к вашей статье"
____loclib.art_validatecover = "Пожалуйста добавьте обложку к вашей статье"
____loclib.art_validatecaption = "Пожалуйста добавьте заголовок к вашей статье"
____loclib.art_validatecontent = "Пожалуйста добавьте текст вашей статьи"
____loclib.art_nothingchange = "Изменений не произведено"

____loclib.art_newarticle = "Новая статья"
____loclib.art_myarticles = "Мои статьи"
____loclib.art_changecover = "Загрузить Обложку"
____loclib.art_removecover = "Удалить Обложку"
____loclib.art_publish = "Опубликовать"
____loclib.art_editing = "Редактирование"


____loclib.art_draftsaved = "Черновик сохранён"
____loclib.art_gotolastdraft = "Вернуться к последнему черновику"
____loclib.art_categoriestags = "Категории и теги"
____loclib.art_preview = "Предварительный просмотр"
____loclib.art_caption = "Заголовок новой статьи"
____loclib.art_placeholder = "Давайте напишем здесь замечательную историю!"
____loclib.art_newarticlecreation = "Создание новой статьи"
____loclib.art_editingsh = "Редактирование опубликованной статьи"
____loclib.art_saveedited = "Сохранить"

____loclib.art_wordscount = "Количество слов"
____loclib.art_volumepercent = "Ограничение объёма статьи"
____loclib.art_goback = "Вернуться назад"

____loclib.downloadingUpdate = "Скачивание обновления"
____loclib.hasnotupdates = "Нет доступных обновлений"
____loclib.cantmanageupdate = "Невозможно управлять обновлением"

____loclib.updateapplication = "Обновить приложение"
____loclib.applicationversion = "Версия приложения"
____loclib.installedusinggps = "Приложение было установлено не через Google Play."

____loclib.empty = "Пусто";

____loclib.reputation = "Репутация";
____loclib.subscriptions = "Подписки";
____loclib.tothetop = "Наверх"
____loclib.menu = "Меню"


____loclib.donotshowagain = "Не показывать больше"

____loclib.postby = "Публикация от"
____loclib.continueon = "Продолжить на"
____loclib.bestwishes = "С наилучшеми пожеланиями"

____loclib.ratings123 = "Только пользователи с высокой репутацией и с наличием не менее 10 публикаций в ленте могут ставить 1, 2, 3 звезды, оставлять комментарии, ставить негативные оценки комментариям. Это сделано для защиты авторов, потому что в Бастионе личные данные НЕ требуются."

____loclib.ratingss3 = "Только пользователи с высокой репутацией могут ставить 1, 2, 3 звезды. Это сделано для защиты авторов, потому что в Бастионе личные данные НЕ требуются."

____loclib.clearcategories = "Вы действительно хотите очистить фильтр по категориям?"

____loclib.cleartags = "Вы действительно хотите очистить фильтр по тэгам?"
____loclib.fromsh = "От"

____loclib.hodoiearnmore = "Как я могу заработать больше коинов?"

____loclib.removeaddress = "Вы действительно хотите удалить этот адрес из памяти устройства?"
____loclib.wanttoseekey = "Вы действительно хотите увидеть приватный ключ?"
____loclib.seeprivatekey = "Увидеть приватный ключ"
____loclib.max5acc = "Вы достигли лимита в 5 аккаунтов. Невозможно добавить больше."

____loclib.e404e = "Страница не найдена. Нажмите, чтобы вернуться на главную страницу";


____loclib.e14100 = "Центр помощи"
____loclib.e14101 = "Обозреватель блокчейна"
____loclib.e14102 = "F.A.Q."
____loclib.e14103 = "Карта развития"
____loclib.e14104 = "Установка узла"
____loclib.e14105 = "Видео"
____loclib.e14106 = "Приложения"
____loclib.e14107 = "Проверка обновления"
____loclib.e14108 = "Поделиться ответом"

____loclib.longreads = "Статьи"
____loclib.readarticle = "Читать статью"

____loclib.filters = "Фильтры"
____loclib.dataenteredincorrectly = "Данные введены неверно"

____loclib.lloadprevwithtags = "Обновить ленту публикаций"

____loclib.newRepost = "Сделать репост"

____loclib.whatsnewrepost = "Ваш комментарий к публикации"


____loclib.art_goback = "Вернуться назад"


____loclib.writesupport = "Написать в поддержку"
____loclib.submitapplication = "Отправить заявку"

____loclib.submitapplicationVideo = "Запросить PKOIN для Загрузки Видео"
____loclib.submitapplicationVideoSmall = "Послать и запросить PKOIN"

____loclib.videobloggerRequest = "Если вы блогер с существующей аудиторией то вы можете запросить PKOIN, чтобы грузить видео. Нажмите кнопку ниже, чтобы запросить PKOIN для загрузки видео:"


____loclib.videobloggerRequest_pl1 = "Ссылка на существующий канал 1"
____loclib.videobloggerRequest_pl2 = "Ссылка на существующий канал 2"
____loclib.videobloggerRequest_pl3 = "Ссылка на существующий канал 3"

____loclib.videobloggerRequest_pl_notes = "Комментарий: любая дополнительная информация"
____loclib.videobloggerRequest_pl_email = "Электронная почта для связи"

____loclib.videobloggerRequest_caption = "Заполните эту форму, чтобы запросить PKOIN для загрузки видео"

____loclib.videobloggerRequest_er_link = "Укажите по крайней мере одну ссылку на существующий канал"
____loclib.videobloggerRequest_er_info = "Дополнительная информация не заполнена"
____loclib.videobloggerRequest_er_email = "Оставьте электронную почту для обратной связи"

____loclib.videobloggerRequest_submitted = "Спасибо за обращение, мы рассмотрим вашу заявку"


____loclib.canuseipsetting = "Позволять соединение через ip по http напрямую. Небезопасно"
____loclib.optimizationtip = function(v){
    return v + ' скрытых просмотренных публикаций'
}

____loclib.optimizationtip_show = "Показать"
