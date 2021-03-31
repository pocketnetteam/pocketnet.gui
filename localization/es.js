if(typeof loclib == 'undefined' || !loclib)
	loclib = {};

	loclib.ru = {};

var ____loclib = loclib.ru;

//time

____loclib.fewseconds = "Hace unos segundos"	
____loclib.oneminute = "Hace un minuto"

____loclib.minutes = function(v){
return v + " hace un minuto"
}

____loclib.tenminutes = "Hace diez minutos"
____loclib.halfanhour = "Hace una hora antes"
____loclib.anhour = "Hace una hora antes"
____loclib.today = "Hoy a las"

//authorization

____loclib.id0 = "Iniciar sesión en su cuenta"
____loclib.id1 = "Si estas registrado en el sistema, inicie sesión"
____loclib.loadqrcode = "Crear QR código"
____loclib.stay = "Quedarse en sistema"
____loclib.signin = "Entrar"
____loclib.orcreate = "O crear nueva cuenta"
____loclib.createnew = "Crear nueva cuenta"
____loclib.staysafe = "No es seguro. ¿Quieres continuar?"

// Register a New Account
____loclib.id71 = "Crear nueva cuenta"
____loclib.id72 = "¿Ya tienes cuenta?, Entrar"

____loclib.rtip1 = "Nesesariamente escribe su clave privada"
____loclib.rtip2 = function(mobile){
	var h = 'A continuación, se generará su clave privada. Escríbalo y guarde el código QR en su dispositivo y no lo pierda. No almacenamos sus datos personales. ¡La clave privada no se puede restaurar!'

	return h 
}

____loclib.generatepkey = "Crear clave privada"
____loclib.rtip3 = "Anote esta clave de inicio de sesión y guarde el código QR. No almacenamos sus datos personales. ¡La clave privada no se puede restaurar!"
____loclib.saveqrcode = "Guardar QR código"
____loclib.copyprivkey = "Copiar la clave privada"
____loclib.rcontinue = "Continuar"
____loclib.idle = "Retraso por tiempo corto"
____loclib.congratulations = '¡Felicidades! Estás en <span class="pnlabel">POCKETNET</span>'
____loclib.creatingpreloader = 'Cuenta en proceso de creación'
____loclib.removepaste = 'Eliminamos la capacidad de copiar a este formulario.'
____loclib.filedamaged = "El archivo está corrupto"
____loclib.keysnotmatch = 'La clave generada y la que ingresó no coinciden'
____loclib.confirmkey = 'Впечатайте ваш приватный ключ здесь'
____loclib.successfullycopied = "Ключ был скопирован в буфер обмена" La clave fue copiado en el portapapeles 
____loclib.urlsuccesscopied = "Ссылка была успешно скопирована" "Enlace se copió correctamente"
____loclib.confirmkeyLabel = "Подтвердите свой приватный ключ. Впечатайте ключ в поле или <b>загрузите QR код</b>" "Confirme su clave privada. Escriba la clave en el campo o <b> cargue el código QR </b>"
____loclib.repeatetocreate = "Вернуться к созданию ключа" "Volver a crear la clave"
____loclib.confirmcreate = "Создать аккаунт" "Crear cuenta"

//user activation

____loclib.useractivation = "Активация пользователя";	"Activación del usuario"
____loclib.wesentmoney = "Мы отослали вам несколько коинов для продолжения процесса регистрации, подождите пока они будет зачислены";"Le hemos enviado unas criptomonedas para continuar con registración, espere hasta que sean acreditados"	
____loclib.wesentmoneym = "Мы уже вам несколько коинов для регистрации"; "Ya hemos enviado unas criptomonedas para registración"


____loclib.wesentmoneydelay = "Процесс занимает больше времени чем обычно, подождите еще";	"El proceso está tardando más tiempo de lo habitual, espere más"
____loclib.funetworkproblems = "Возникли некоторые проблемы с соединением. Пожалуйста, повторите позднее"; "Hay algunos problemas de conexión. Vuelva a intentarlo más tarde"


____loclib.pleasewait = "Пожалуйста подождите";	"Por favor espere";
____loclib.next = "Siguiente";
____ loclib.welcometopocketnet = "Bienvenido a POCKETNET";
____ loclib.continue = "Continuar";


//user page

____ loclib.rstate = "Estado";
____ loclib.rprofile = "Perfil";
____ loclib.rsettings = "Configuración";
____ loclib.rwallet = 'Monedero';
____ loclib.raccounts = 'Cuentas';
____ loclib.rsystem = 'Sistema';
____ loclib.rconnection = 'Conexión';
____ loclib.pnetAddress = 'Dirección POCKETNET';
____ loclib.profile = 'Perfil';
____ loclib.signout = 'Cerrar sesión';

//send



//send

____loclib.postlabel = "Пожертвование связанное с публикацией";	"Donación por vuestra publicacion" 
____loclib.donationlabel = "Пожертвование";	"Donación"
____ loclib.donationwel = "Si desea agradecer al autor de la publicación, puede utilizar la transacción Pocketnet";
____ loclib.donationwela = "Enviar por Pocketnet";
____ loclib.donationwelan = "También se pueden utilizar otros sistemas de criptomonedas";
____ loclib.successfullycopiedaddress = "La dirección se copió correctamente";


//wallet

____ loclib.wrecieve = "Recibir criptomonedas a la dirección";
____ loclib.wcopyshare = "Copiar y compartir la dirección";
____ loclib.wqrcode = "Código QR";
____ loclib.wcopeaddress = "Copiar dirección";
____ loclib.wcreatelink = "O crear un enlace para hacer el pago";
____ loclib.required = "Requerido";
____ loclib.wgetlink = "Recibir enlace";
____ loclib.waddresses = "Direcciones";
____ loclib.waddress = "Dirección";
____ loclib.wbalance = "Billetera";
____ loclib.wpercente = "Porcentaje";
____ loclib.waddaddress = "Abrir nueva dirección";
____ loclib.wrecieve = "Recibir";
____ loclib.wrecieveon = "Recibir en";
____ loclib.wcopyshareorcreate = "Copia y comparte la dirección o crea un enlace para el pago";
____ loclib.wdgetlink = "Obtener enlace";
____ loclib.wdqrcode = "Código QR";
____ loclib.wdcopyaddress = "Copiar dirección";
____ loclib.wdpleasefill = "Por favor complete los campos requeridos";
____ loclib.wduseqr = "Utilice este código QR para recibir criptomonedas en esta dirección";
____ loclib.wdaddress = "Dirección";
____ loclib.wdamount = "Cantidad";
____ loclib.wdlabel = "Etiqueta";
____ loclib.wdmessage = "Mensaje";
____ loclib.wsend = "Enviar";
____ loclib.calcfeesandsend = "Calcular comisión y enviar";
____ loclib.wstrfees = "Сomisión de transacción";
____ loclib.wsfees = "Comisión";

____ loclib.wssendto = "ENVIAR CRIPTOMONEDAS A";
____ loclib.wssendb = "ENVIAR";

____ loclib.tacaddress = 'Dirección de cuenta';
____ loclib.twallet = "Monedero";
____ loclib.twalletaddresses = "Direccione del monedero";
____ loclib.tTotal = "Total";
____ loclib.wsselect = " Seleccionar fuente";
____ loclib.wsenter = "Ingresa una dirección o selecciona";
____ loclib.wsreciever = "Dirección del destinatario";
____ loclib.wsamount = "Cantidad";
____ loclib.wsamountof = " Cantidad de transacción ";
____ loclib.wsincludefees = "Incluir comisión en la cantidad";
____ loclib.wsrecieverpay = 'Paga el remitente';
____ loclib.wssenderpay = 'El beneficiario paga';
____ loclib.wdselectfrom = "Seleccionar";

____ loclib.wdenteramount = "Ingresa la cantidad";
____ loclib.wdmessageplaceholder = "¿Para qué es esta transacción?";
____ loclib.wrenteraddress = 'Introduzca la dirección';
____ loclib.wrenteraddressselect = "Ingrese una dirección o seleccione";
____ loclib.wreturntoeallet = "VOLVER A BILLETERA";
____ loclib.linkCreated = 'ENLACE CREADO';
____ loclib.waddresswascop = "La dirección se copió en el portapapeles";
____ loclib.wqrcodecreated = 'CÓDIGO QR CREADO';
____ loclib.wlinkcreating = 'CREAR UN ENLACE';
____ loclib.wqrcodecreating = 'CREAR CÓDIGO QR';
____ loclib.wdoptions = 'configuración';
____ loclib.wssuccessfully = "La transacción se envió correctamente";
____ loclib.wscalculatefees = 'CALCULAR COMISIÓN';
____ loclib.wsaddressnotv = "La dirección fue introducida incorrecto";


//user profile
____ loclib.uaddaddressdona = " Añadir la dirección para donaciones";
____ loclib.uaddaddressdonaplace = "Introduzca la dirección";
____ loclib.uchangeicon = "Cambiar icono de usuario";
____ loclib.utip1 = "Debeis introducir el nombre de usuario y establecer icono antes de usar POCKETNET";
____ loclib.utip2 = "Queda el último paso";
____ loclib.upicset = "Establecer icono de usuario";
____ loclib.upic = "Icono de usuario";
____ loclib.uuserinfo = "Información del usuario";
____ loclib.usave = "Guardar";
____ loclib.ucancel = "Cancelar";
____loclib.
____ loclib.uwaitb = "Esperando confirmación para guardar información";
____ loclib.uchanges = " No habeis introducido ningún cambio";
____ loclib.uchangesvalid = "Debeis introducir el nombre de usuario y establecer el icono";
____ loclib.uname = "Nombre";
____ loclib.unickname = "Apellido";
____ loclib.ulanguage = "Idioma";
____ loclib.uabout = "Acerca de mí";
____ loclib.uwebsite = "Página web";
____ loclib.uaddresesd = "Dirección de donación";
____ loclib.usavechanges = "¿Quieres guardar sus cambios?";


//ustate
____loclib.sreps = "Репутация и ограничения";
____loclib.sdisconnected = "Отсоединен от ноды";
____loclib.suseractivation = "Активация пользователя";
____loclib.sprofile = "Профиль";
____loclib.spc = "Количество постов";
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
____loclib.stimes = "Удалить пост"
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
____loclib.coinbaseSuccesspost = function(v){
	return "Поздравляем, вы получили " + v + " Покеткоинов за ваши последние посты!"
}
____loclib.coinbaseSuccesscomment = function(v){
	return "Поздравляем, вы получили " + v + " Покеткоинов за ваши последние комментарии!"
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

// notifications
____loclib.ntnow = "Сейчас"
____loclib.ntlasthour = "Час назад"
____loclib.nttoday = "Сегодня"
____loclib.ntmounth = "В этом месяце"
____loclib.ntearlier = "Давно"
____loclib.nodeWalletAdd = 'Добавление адреса может занять некоторое время. Продолжить?'
____loclib.nodeEnableNoteHeader = 'Note'
____loclib.nodeEnableNote = 'Функционирующая Нода Pocketnet может занимать до 5 GB оперативной памяти. Будьте уверены, что вам хватит памяти для этого. Счастливого стейкинга!'

/// 1301

____loclib.address = "Адрес"
____loclib.privatekey = "Приватный ключ"
____loclib.qrcode = "QR Код"
____loclib.addaccount = "Добавить аккаунт"
____loclib.entermnimo = "Введите мнемофразу или приватный ключ"
____loclib.add = "Добавить"
____loclib.e13011 = "Теперь вы продолжите регистрацию после установки Pocketnet Desktop."
____loclib.e13012 = "Если Pocketnet для Windows не начал загружаться, нажмите, чтобы загрузить его"
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
____loclib.e13026 = "Присоединяйтесь к Pocketnet - будущее свободного Интернета"

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
____loclib.e13038 = "Комментируйте и зарабатывайте репутацию"
____loclib.e13039 = "Комментируйте и зарабатывайте репутацию"
____loclib.e13040 = "У вас нет прав на комментирование"
____loclib.complain = "Пожаловаться"
____loclib.next = "Далее"
____loclib.post = "Опубликовать"
____loclib.e13041 = "Подключение к Pocketnet"
____loclib.e13042 = "Pocketnet Прокси Сервера"

____loclib.e13043 = "Pocketnet Ноды"
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
____loclib.e13079 = "We have spent 14+ months in spare time from full time jobs bringing Pocketnet to people. In addition to time and effort, we have put in our own money to help launch the platform. Now we need the community to step up and help us with growth."
____loclib.e13080 = "How will the funds be used?"
____loclib.e13081 = "Funds will be used to purchase advertising and hire some specific subject matter experts to make Pocketnet even more secure. Current development team will not get any of these donations. Wherever possible, we will post here how we used the funds. "
____loclib.e13082 = "What you will get for your donation besides knowing you supported freedom:"
____loclib.e13083 = "As a sign of our gratitude for donation, you will receive a gift in some amount of Pocketcoin"
____loclib.e13084 = "Also, when we build group chat, you will be a member of a special group of donors that will have direct access to Pocketnet team, even as the platform grows"
____loclib.e13085 = "Link to your Pocketnet profile will be listed below driving more people to your posts (unless you ask us to not do that)"
____loclib.e13086 = "Support Decentralized Web Now"
____loclib.e13087 = "Bitcoin, Litecoin, Monero"

____loclib.e13088 = "Члены Pocketnet, которые сделали пожертвования в поддержку Pocketnet"
____loclib.thankyou = "Спасибо!"
____loclib.e13089 = "Если вы хотите, чтобы мы включили ваш профиль в Pocketnet в список благотворителей, пришлите нам информацию о вашем пожертвовании."
____loclib.e13090 = "Добавить меня в список благотворителей"
____loclib.e13091 = "Или вы можете отправить нам электронное письмо по адресу"
____loclib.e13092 = "с вашим адресом и суммой"
____loclib.finish = "Завершить"
____loclib.e13093 = "Пожалуйста, выберите способ пожертвования"
____loclib.e13094 = "Что-то пошло не так. Пожалуйста, перезагрузите страницу и попробуйте еще раз (error: 0001)"
____loclib.e13095 = 'Спасибо за поддержку нашей работы за свободу. Мы позаботимся о том, чтобы каждая копейка была на счету.'
____loclib.e13096 = 'Введите сумму пожертвования'
____loclib.e13097 = "Что-то пошло не так. Пожалуйста, перезагрузите страницу и попробуйте еще раз (error: 0002)"
____loclib.e13098 = "Добавить ссылку на внешний сайт или ресурс"
____loclib.e13099 = "Загрузить изображения"
____loclib.e13100 = "Щелкните здесь, чтобы выбрать файлы для загрузки"
____loclib.e13101 = "или перетащите в это пространство"
____loclib.e13102 = "Добавить ссылку на внешний сайт"
____loclib.e13103 = "URL недействителен"
____loclib.e13104 = "Допускается загружать не более 6 изображений"
____loclib.e13105 = "Управление нодой"
____loclib.e13106 = "Pocketnet Нода"
____loclib.e13107 = "Управление нодой может осуществляться с помощью десктопного приложения"
____loclib.e13108 = "Нет связи с интерфейсом прокси Electron"

____loclib.e13109 = "Пожалуйста, введите слова с картинки, чтобы получить покеткоины и продолжить регистрацию"
____loclib.e13110 = "Введите капчу"
____loclib.next = "Далее"
____loclib.refresh = "Обновить"
____loclib.e13111 = "Добавьте свой адрес электронной почты, чтобы получать последние обновления Pocketnet"
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
____loclib.e13124 = "Больше замечательных публикаций Pocketnet!"
____loclib.e13125 = "Раздел лучших публикаций пуст!"
____loclib.e13126 = "Здесь будут отображаться сообщения людей, на которых вы подписаны."
____loclib.e13127 = "Здесь будут отображаться сообщения людей, на которых вы подписаны."
____loclib.e13128 = "Здесь будут отображаться сообщения людей, на которых вы подписаны."
____loclib.registration = "Регистрация"
____loclib.editpost = "Редактировать публикацию"
____loclib.removepost = "Удалить публикацию"


____loclib.reportpost = "Репост публикации"
____loclib.donate = "Пожертвование"
____loclib.blockuser = "Заблокировать пользователя"
____loclib.more = "Больше"
____loclib.showmore = "Показать больше"
____loclib.e13129 = "Прикрепленные изображения"
____loclib.e13130 = "Редактировано"
____loclib.e13131 = "Вы заблокировали этого пользователя"
____loclib.e13132 = "оценили"
____loclib.e13133 = "Поделиться этим"
____loclib.e13134 = "По этой строке поиска нет результатов"
____loclib.e13135 = "У пользователя нет закрытого ключа"
____loclib.e13136 = "Вся лента"
____loclib.e13137 = "Ваша лента"
____loclib.e13138 = "Лучшее"
____loclib.e13139 = "ИСКАТЬ В POCKETNET"
____loclib.e13140 = "ИСКАТЬ В"
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
____loclib.e13151 = 'Никто ещё не оценил эту публикацию'
____loclib.e13152 = "Оценки пользователей"
____loclib.e13153 = "Пропустить и перейти на сайт"
____loclib.e13154 = "Ваша регистрационная информация"
____loclib.e13155 = "Чтобы использовать Pocketnet, вам необходимо сгенерировать свой приватный криптографический ключ, который заменяет логин и пароль централизованных социальных сетей."
____loclib.users = "Пользователи"
____loclib.userstx = "Пользователя"
____loclib.user = "Пользователь"
____loclib.postscount = "Количество публикаций"
____loclib.about = "О нас"
____loclib.e13156 = "К слюдующим результатам"
____loclib.posts = "Публикации"
____loclib.e13157 = "Поиск по"
____loclib.e13158 = "не принёс ни одного результата"
____loclib.e13159 = "Поисковая фраза пуста"
____loclib.repost = "Репост"
____loclib.e13160 = "Привет, Pocketeers!"

____loclib.e13161 = "Добавить теги для вашей публикации"
____loclib.e13162 = "Вы можете ввести не более 30 тегов"
____loclib.e13163 = "В публикацию не внесено изменений"
____loclib.e13164 = "Добавьте несколько слов, чтобы сообщить Pocketpeople о вашей ссылке. О чем это? Почему это важно? Каково ваше мнение?"
____loclib.e13165 = 'Ваша ссылка на видео недействительна. Попробуйте загрузить валидный URL-адрес видео.'
____loclib.e13166 = "Вы спасли"
____loclib.e13167 = "человек из цензурированного интернета"
____loclib.e13168 = "Зарабатывайте Pocketcoin за каждую регистрацию по вашей ссылке"
____loclib.e13169 = "Прямая ссылка"
____loclib.copy = "Копировать"
____loclib.e13170 = "Включить призыв к регистрации в Pocketnet"
____loclib.more = "Больше"
____loclib.e13171 = "Отличные новости. Я получил независимость от монополий в социальных сетях. Присоединяйтесь ко мне на pocketnet.app, чтобы мы могли делиться информацией и общаться в чате независимо от блокчейна. Присоединяйся ко мне здесь"
____loclib.e13172 = "Я хочу поделиться с вами этим из децентрализованной блокчейн-платформы Pocketnet. Надеюсь, вы найдете это полезным, и если вы зарегистрируетесь, мы оба получим бонус в криптовалюте Pocketcoin!"
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
____loclib.e13190 = "Pocketnet тема"
____loclib.e13191 = "Выбор темы"
____loclib.e13192 = "Уровень"
____loclib.e13193 = "Бонус"
____loclib.e13194 = "Репутация и вознаграждения"
____loclib.e13195 = "Ограничения"
____loclib.e13196 = "Это может занять"
____loclib.e13197 = "Получить покеткоины"
____loclib.e13198 = "Примерное время ожидания"
____loclib.e13199 = "Присоединиться к Pocketnet сейчас"

____loclib.e13200 = "Вернуться в Pocketnet"
____loclib.e13201 = "Присоединиться к бета-тесту"
____loclib.e13202 = "Бета-тест Pocketnet начнется 24 января."
____loclib.e13203 = "Спасибо, что присоединились к списку рассылки бета-тестирования Pocketnet. Использование Pocketnet не обязательно, однако мы будем использовать это электронное письмо для отправки ваших опросов с целью улучшения платформы. Спасибо за помощь в формировании будущего Интернета."
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
____loclib.e13220 = 'Покеткоины доставлены'
____loclib.errorreload = "Что-то пошло не так. Пожалуйста, перезагрузите страницу и попробуйте еще раз"
____loclib.e13221 = "Вы действительно хотите удалить информацию об этой сделке? Сделку остановить не возможно"
____loclib.e13222 = "Скачать Desktop App - это наиболее устойчивый к цензуре способ использования Pocketnet. Даже если веб-сайты закрыты, приложение все равно будет работать напрямую через узлы."
____loclib.e13223 = "Скачать Покетнет for Windows"
____loclib.e13224 = "Скачать Покетнет for Linux"
____loclib.e13225 = "Pocketnet Нода"
____loclib.e13226 = 'Скачать Ноду'
____loclib.e13227 = "Скачать Pocketnet ноду для Windows"
____loclib.e13228 = "Скачать Pocketnet ноду для Linux"
____loclib.e13229 = 'Не верный приватный ключ'
____loclib.e13230 = 'Неопределенная ошибка подключения'

____loclib.e13231 = "Соединение потеряно"
____loclib.e13232 = "Невозможно подключиться к ноде"
____loclib.e13233 = 'Этот комментарий был удален'
____loclib.e13234 = 'Opreturn error/41'
____loclib.e13235 = 'Вы не можете оценить комментарий дважды'
____loclib.e13236 = 'Этот комментарий был удален'
____loclib.e13237 = 'Вы не можете оценить себя'
____loclib.e13238 = 'Ошибка отправки комментария. Подождите и попробуйте еще раз / 37'
____loclib.e13239 = 'Ошибка отправки комментария / 35'
____loclib.e13240 = 'Комментарий, на который вы пытаетесь ответить, был удален пользователем'
____loclib.e13241 = 'Этот комментарий слишком длинный, пожалуйста, разбейте его на несколько'
____loclib.e13242 = "Вы были заблокированы этим человеком, вы не можете комментировать его сообщения"
____loclib.e13243 = "Вы достигли своего лимита выставления оценок за комментарии за период 24 часа"
____loclib.e13244 = "Вы достигли своего лимита редактирования комментариев за период 24 часа"
____loclib.e13245 = "Вы достигли своего лимита отправления комментариев за период 24 часа"
____loclib.e13246 = "Вы пытаетесь отредактировать чужую публикацию"
____loclib.e13247 = "Вы достигли своего лимита редактирования 5 публикций за 24 часа"
____loclib.e13248 = 'Вы можете редактировать публикации или комментарии только один раз для каждого блока в блокчейне. Подождите минутку и попробуйте еще раз'
____loclib.e13249 = 'Вы не можете заблокировать себя, к счастью'
____loclib.e13250 = 'Вы уже заблокировали этого пользователя'
____loclib.e13251 = 'Вы не заблокировали этого пользователя'
____loclib.e13252 = 'Транзакция неправильно сформирована'
____loclib.e13253 = 'Вы не можете ссылаться на себя'
____loclib.e13254 = 'Имя пользователя слишком длинное'
____loclib.e13255 = 'Это имя уже используется другим пользователем'
____loclib.e13256 = 'Эта публикация слишком длинная, пожалуйста, разбейте её на несколько.'
____loclib.e13257 = 'Ваша репутация Pocketnet пока не позволяет регистрировать жалобы'
____loclib.e13258 = 'Вы достигли лимита жалоб за 24 часа'

____loclib.e13259 = 'Вы не можете пожаловаться на свой пост'
____loclib.e13260 = 'Вы уже подавали жалобу на этот пост'
____loclib.e13261 = "Сохранить ключ"
____loclib.e13262 = "Позже"
____loclib.e13263 = "Подпишитесь и включите уведомления о новых публикациях от этого пользователя"
____loclib.e13264 = "Подписка без уведомлений"
____loclib.e13265 = 'Это имя больше не доступно, выберите другое'
____loclib.e13266 = "Светлая тема"
____loclib.e13267 = "Ночная тема"
____loclib.e13268 = 'Coinstake выигрыш'
____loclib.e13269 = 'Транзакция получена'
____loclib.e13270 = 'Новая оценка'
____loclib.e13271 = 'Новый комментарий'
____loclib.e13272 = 'Новый ответ на комментарий'
____loclib.e13273 = 'Новый подписчик'
____loclib.e13274 = 'Освобождённый пользователь'
____loclib.e13275 = 'Рейтинг комментария'
____loclib.e13276 = 'Показывать встроенные видео'
____loclib.e13277 = 'Автовоспроизводить видео'
____loclib.e13278 = 'Запускать Покетнет автоматически'
____loclib.e13279 = 'Чат'
____loclib.e13280 = 'Тэги'
____loclib.e13281 = 'Последний помментарии'
____loclib.e13282 = "Токен бота Telegram"
____loclib.e13283 = "Публикация из Telegram-канала"
____loclib.e13284 = "Добавьте бота в чат и выберите"
____loclib.e13285 = 'Спросите перед публикацией из Телеграмма'
____loclib.e13286 = 'Спрашивать перед отправкой в Telegram'
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
____loclib.e13294 = 'Использовать PGSQL база данных'
____loclib.e13295 = 'DB Host'
____loclib.e13296 = 'DB Port'
____loclib.e13297 = 'DB Max'
____loclib.e13298 = 'DB Idle Timeout, ms'
____loclib.e13298 = 'DB Name'
____loclib.e13300 = 'DB User'
____loclib.e13031 = 'DB Password'
____loclib.e13302 = 'Proxy server on'
____loclib.e13303 = 'Proxy https server port'
____loclib.e13304 = 'Proxy wss server port'
____loclib.e13305 = 'Server SSL Key, pem'
____loclib.e13306 = 'Server SSL Cert, pem'
____loclib.e13307 = 'Server SSL Passphrase'
____loclib.e13308 = 'Firebase admin SDK'
____loclib.e13309 = 'Your Crane Address'
____loclib.e13310 = 'Captcha Enable'
____loclib.e13311 = 'Ip limiter enable'
____loclib.e13312 = "Server"

____loclib.e13313 = "Data Base, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "Other"
____loclib.e13316 = 'Enable'
____loclib.e13317 = 'Binary path'
____loclib.e13318 = 'Config path'
____loclib.e13319 = 'Data path'
____loclib.e13320 = 'Staking Address'
____loclib.e13321 = 'Import the account address to the node for stacking'
____loclib.e13322 = 'State'
____loclib.e13323 = 'Staking addresses'
____loclib.e13324 = 'Last Block'
____loclib.control = "Control"
____loclib.setup = "Setup"
____loclib.e13325 = "Вы действительно хотите отправлять сообщения из Telegram?"
____loclib.e13326 = "Опубликовать"
____loclib.e13327 = 'Вы действительно хотите снова использовать прокси?'
____loclib.e13328 = 'оценил ваш комментарий!'
____loclib.e13329 = "Новая оценка комментария"
____loclib.e13330 = "поделился вашей публикацией:"
____loclib.e13331 = "поделился вашей публикацией:"
____loclib.e13332 = "сделал новую публикацию:"
____loclib.e13333 = "Входящая транзакция"
____loclib.e13334 = "Вы выиграли"
____loclib.e13335 = "Pocketcoin за ваши последние действия"
____loclib.e13336 = "с сообщением:"
____loclib.e13337 = "прокомментировал вашу публикацию:"
____loclib.e13338 = "ответил на ваш комментарий:"
____loclib.reply = "Ответить"
____loclib.e13339 = "Вы спасли кого-то из цензурированного интернета. Немного покеткоинов уже в пути!"
____loclib.e13340 = 'Поздравляем!'
____loclib.e13341 = "подписался на вас"
// <%=e('process')%> <%=e('e13037').toUpperCase()%> <%=e('')%> self.app.localization.e('e13350')
____loclib.e13342 = "Новый подписчик"
____loclib.e13343 = "оценил вашу публикацию"
____loclib.e13344 = "Новая оценка"
____loclib.e13345 = "прислал вам сообщение"
____loclib.e13346 = "Новые сообщения"
____loclib.e13347 = "Доступны обновления Pocketnet. Применить обновления сейчас?"
____loclib.e13348 = "Нет, позже"
____loclib.e13349 = "Доступны обновления Pocketnet. Зайти на страницу, чтобы скачать новую версию?"
____loclib.e13350 = 'Присоединяйтесь к Pocketnet и зарабатывайте Pocketcoin сейчас'
____loclib.e13351 = 'Пожалуйста, напишите кратко о себе для того, чтобы дать понять, почему пользователям следует на вас подписаться'
____loclib.e13351 = 'Чат Pocketnet'
____loclib.e13352 = 'У вас нет привелегий писать в чате'