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

____loclib.id0 = "Войти в существующий аккаунт";	"Iniciar sesión en su cuenta"
____loclib.id1 = "Если вы уже зарегистрированны в системе, выполните вход";	"Si estas registrado en el sistema, inicie sesión"
____loclib.loadqrcode = "Загрузить QR Код"; "Crear QR código"
____loclib.stay = "Оставаться в системе";  "Quedarse en sistema"
____loclib.signin = "Войти"; "Entrar"
____loclib.orcreate = "Или создать новый аккаунт"; "o crear nueva cuenta"
____loclib.createnew = "Создать новый аккаунт"; "Crear nueva cuenta"
____loclib.staysafe = "Это небезопасно, вы желаете продолжить?"; "No es seguro. ¿Quieres continuar?"

// Register a New Account
____loclib.id71 = "Создать новый аккаунт"; "Crear nueva cuenta"
____loclib.id72 = "Уже имеете аккаунт? Войти"; "¿Ya tienes cuenta?, Entrar"

____loclib.rtip1 = "Обязательно запишите свой приватный ключ!"; "Nesesariamente escribe su clave privada"
____loclib.rtip2 = function(mobile){
	var h = 'Далее будет сгенерирован ваш приватный ключ. Запишите его и сохраните QR код на ' 

	if(mobile){ h += 'вашем устройстве' } else { h+='компьютере' }

	h+=' и не потеряйте их. Мы не храним ваши персональные данные. Приватный ключ не может быть востановлен!'

	return h 
}

____loclib.generatepkey = "Создать приватный ключ"; "Crear clave privada"
____loclib.rtip3 = "Запишите этот ключ для входа и сохраните QR код. Мы не храним ваши персональные данные. Приватный ключ не может быть востановлен! ";
____loclib.saveqrcode = "Сохранить QR код" "Guardar QR código"
____loclib.copyprivkey = "Скопировать приватный ключ" "Copiar la clave privada"
____loclib.rcontinue = "Продолжить" "Continuar"
____loclib.idle = "Задержка на непродолжительное время" Retraso por tiempo corto
____loclib.congratulations = 'Поздравляем! Вы в <span class="pnlabel">POCKETNET</span>'
____loclib.creatingpreloader = 'Аккаунт в процессе создания'
____loclib.removepaste = 'Мы убрали возможность вставки в эту форму.'
____loclib.filedamaged = "Файл поврежден" El archivo está corrupto
____loclib.keysnotmatch = 'Сгенерированный ключ и введенный вами не совпадают'
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
____ loclib.sreps = "Reputación y restricciones";
____ loclib.sdisconnected = "Desconectado al node";
____ loclib.suseractivation = "Activación del usuario";
____ loclib.sprofile = "Perfil";
____ loclib.spc = "Número de publicaciones";
____ loclib.ssc = "Número de estrellas";
____ loclib.ccc = "Número de comentarios";
____ loclib.crc = "Número de valoraciones de comentarios";
____ loclib.stp = "Periodo trial";
____ loclib.srep = "Reputación";




//accounts
____ loclib.aaddedacc = "Cuentas agregadas";
____ loclib.acure = "Actual";
____ loclib.aaddacc = "Agregar cuenta";
____ loclib.ascheduler = "Planificador de tareas";
____ loclib.aused = "Esta dirección ya está en uso en este dispositivo";



//author
____ loclib.sub = "Suscribirse";
____ loclib.unsub = "Cancelar suscripción";
____ loclib.joined = "Se unió a la comunidad";
____ loclib.shares = "PUBLICACIONES";
____ loclib.uposts = "PUBLICACIONES";
____ loclib.myuposts = "MIS PUBLICACIONES";
____ loclib.followers = "SUSCRIBTORES";
____ loclib.following = "SUSCRIPCIONES";
____ loclib.settings = "GESTIÓN";
____ loclib.anofollowers = "Este usuario todavía no tiene suscribtores";
____ loclib.aynofollowers = “Todavía no teneis suscribtores ";
____ loclib.anofollowing = "este usuario no esta suscrito a nadie";
____ loclib.aynofollowing = " No estais suscrito a nadie ";


//lenta
____ loclib.lloadmore = "¡Cargar más publicaciones!";
____ loclib.lloadprev = "Cargar contenido nuevo"
____ loclib.lend = "Fin de la cinta";
____ loclib.zerop = "Este autor aún no tiene publicaciones";
____ loclib.zeroy = "Aún no teneis publicaciones, ¡comparteis algo!";

____ loclib.llogin = ' Antes de continuar, debeis iniciar sesión ';
____ loclib.lcomlaindialog = "¿Estais seguro de que deseais quejarse sobre esta publicación?";
____ loclib.lunsubscribe = "¿Estais seguro de que deseais cancelar la suscripción de este usuario?";
____ loclib.lprivatepublic = "¿Le gustaría hacer una suscripción pública o privada?";
____ loclib.lprivate = "Privado";
____ loclib.lpublic = "Público";


//share
____ loclib.newShare = "Nueva publicación";
____ loclib.scaption = "Título";
____ loclib.whatsnew = "¿Qué hay de nuevo?";
____ loclib.saddlink = "Agregar un enlace en pagina web o en video";
____ loclib.saddimages = "Adjuntar imágenes";
____ loclib.sarticle = "Escribir artículo";
____ loclib.stelegram = "Enviar a Telegram"
____ loclib.stimes = "Eliminar publicación"
____ loclib.snothing = "Nada";
____ loclib.sposttime = "Publicar por hora";
____ loclib.spostnow = "Publicar ahora";
____ loclib.stimenotselected = "Hora no seleccionada";
____ loclib.spost = "Publicar";
____ loclib.sdate = "Fecha";
____ loclib.stime = "Hora";
____ loclib.snotags = "Agregar etiqueta";
____ loclib.expandvideo = "Haga clic para expandir";
____ loclib.emptymessage = "El mensaje está vacío";
____ loclib.emptytags = "Por favor agregue etiquetas";
____ loclib.emptyutxo = "No hay monedas en la dirección";
____ loclib.networkerror = "Error de red";
____ loclib.maximages = "Se permite subir un máximo de 6 imágenes";
____ loclib.sharenow = "¿Quiere publicar este contenido ahora?";
____ loclib.pastdate = 'Se especifica el tiempo transcurrido';
____ loclib.timenotselected = 'Hora no seleccionada';
____ loclib.addtags = 'Agregar etiquetas';
____ loclib.tnews = "noticias";
____ loclib.timages = "imágenes";
____ loclib.tvideos = "video";
____ loclib.tmarket = "tienda";
____ loclib.tsport = "deporte";


//menu
____ loclib.signinmenu = "Iniciar sesión";
____ loclib.signupmenu = "Registrarse";
____ loclib.aboutmenu = "saber más";

//footer
____ loclib.aboutus = "Acerca de nosotros";



// Dialog Box Options
____ loclib.daccept = "Confirmar";
____ loclib.dcancel = "Cancelar";
____ loclib.dyes = "Sí";
____ loclib.dno = "No";
____ loclib.dsa = "No volver a mostrar";


// Messages

_____ loclib.coinbaseSuccess = función (v) {
return "<b> ¡Felicitaciones! </b>" + "Has ganado <b>" + v + "POC </b>"
}
____ loclib.coinbaseSuccesspost = function (v) {
return "Felicidades, recibisteis" + v + "¡Bolsa de criptomonedas por buestras últimas publicaciones!"
}
____ loclib.coinbaseSuccesscomment = function (v) {
volver "Felicitaciones, recibisteis " + v + "¡ Bolsa de criptomonedas por buestras últimas comentarios!"
}
____ loclib.userSent = function (v) {
return "te envió <b>" + v + "POC </b>"
}



____loclib.refferalUserMessage = "Congrats! You rescued someone from the censored web."


____ loclib.subscribeUserMessage = "suscrito a usted"
____ loclib.unsubscribeUserMessage = "anulado su suscripción"
____ loclib.gotoprofileMessage = "ir al perfil"
____ loclib.upvoteShareMessage = "le dio una calificación a vuestra publicación"


// Errors

____ loclib.error = "Error";
____ loclib.checkScoreError = "Debe completar su perfil antes de usar Pocketnet. ¿Le gustaría hacer esto ahora?";
____ loclib.checkScoreErrorLight = "Cuenta no activada";
____ loclib.timestamperror = "El tiempo en la aplicación y en el node no coincide";
____ loclib.postLimitLight = "Ha alcanzado el límite de publicaciones";
____ loclib.scoreLimitLight = "Ha alcanzado su límite de calificación";
____ loclib.doubleLimitLight = "Ya calificó esta publicación";

____ loclib.SelfSubscribeError = "Imposible suscribirme";
____ loclib.DoubleSubscribeError = "Ya estasis  suscrito a esta cuenta. Actualiza la página";
____ loclib.InvalideSubscribeError = "Ocurrió un error al darse de baja de la cuenta. Actualizar la página";
____ loclib.ChangeInfoLimitError = "Ha alcanzado el límite para cambiar información sobre usted. Inténtelo más tarde";
____ loclib.SelfScoreError = "No podeis calificarse";

____ loclib.networkerror = "Surgieron nuevas problemas con la comunicación entre el node y su cuenta";

____ loclib.canSpendError = "No teneis dinero desbloqueado. Para continuar hay que esperar";
____ loclib.noMoneyError = "No teneis dinero";

____ loclib.waitConf = "Espera  porfavor mientras que transacciones anteriores procesan";
____ loclib.postWaitConf = "La publicación está esperando confirmación";


// notifications
____ loclib.ntnow = "Ahora"
____ loclib.ntlasthour = "Hace una hora"
____ loclib.nttoday = "Hoy"
____ loclib.ntmounth = "Este mes"
____ loclib.ntearlier = "Hace tiempo"
____ loclib.nodeWalletAdd = 'Agregar una dirección podéis llevar algún tiempo. ¿Seguir?'
____ loclib.nodeEnableNoteHeader = 'Note'
____ loclib.nodeEnableNote = 'Un node Pocketnet en funcionamiento podéis ocupar hasta 5 GB de RAM. Asegúrese de tener suficiente memoria para esto. ¡Feliz steking!

/// 1301

____ loclib.address = "Dirección"
____ loclib.privatekey = "Clave privada"
____ loclib.qrcode = "Código QR"
____ loclib.addaccount = "Agregar cuenta"
____ loclib.entermnimo = "Introduzca mnemofrase o clave privada"
____ loclib.add = " Añadir "
____ loclib.e13011 = "Ahora procedereis con el registro Después de instalar Pocketnet Desktop".
____ loclib.e13012 = "Si Pocketnet para Windows no comienza a cargarse, haga clic para descargarlo"
____ loclib.e13013 = "Ingrese el título de imagen (opcional)"
____ loclib.e13014 = "El formato de este archivo no no está soportado:"
____ loclib.e13015 = "Este archivo es demasiado grande:"
____ loclib.e13016 = "Insertas su referencia de YouTube, Vimeo y pulse Entrar".
____ loclib.e13017 = "Cargando en blockchain"
____ loclib.e13018 = "¿Está seguro de que desea eliminar este artículo?"
____ loclib.e13019 = "Nuevo"
____ loclib.e13020 = "Escribir artículo nuevo"
____ loclib.youarefollowing = "Estás suscrito"
____ loclib.follow = "Seguir"
____ loclib.blocked = "Bloqueado"
____ loclib.e13021 = "Mostrar más"
____ loclib.blockuser = "Bloquear usuario"
____ loclib.unblockuser = "Desbloquear usuario"
____ loclib.e13022 = "¿Está seguro de que desea cancelar la suscripción de este usuario?"
____ loclib.unfollow = "Dejar de seguir"
____ loclib.unblock = "Desbloquear"
____ loclib.share = "Compartir"
____loclib.info = "Información"
____ loclib.e13023 = "¿Está seguro de que desea desbloquear a este usuario?"
____ loclib.e13024 = "Su clave privada parar entrar"
____ loclib.e13025 = "Crear nueva cuenta"
____ loclib.e13026 = "Únase a Pocketnet: el futuro de la Internet gratuita"

____ loclib.e13027 = "Permanecer en el sistema"
____ loclib.e13028 = "la clave privada no es correcta"
____ loclib.e13029 = "El mensaje está vacío"
____ loclib.e13030 = "Los comentarios podéisn tener hasta 1000 caracteres."
____ loclib.e13031 = "Comparte este comentario"
____ loclib.e13032 = "¿Está seguro de que desea eliminar su comentario?"
____ loclib.e13033 = "Comentario eliminado"
____ loclib.e13034 = "Sí"
____ loclib.e13035 = "No, cancelar"
____ loclib.hide = "Ocultar"
____ loclib.e13036 = "Mostrar comentarios anteriores"
____ loclib.e13037 = "Respuestas"
____ loclib.remove = "Eliminar"
____ loclib.e13038 = "Comentas y ganas la reputación"
____ loclib.e13039 = "Comentas y ganas la reputación"
____ loclib.e13040 = "No tiene permisos para comentar"
____ loclib.complain = "Quejarse"
____loclib.next = "Siguiente"
____loclib.post = "Publicar"
____ loclib.e13041 = "Conectando a Pocketnet"
____ loclib.e13042 = "Servidor proxy Pocketnet"

____ loclib.e13043 = "Node Pocketnet"
____ loclib.e13044 = "Agregar node"
____ loclib.e13045 = "No se encontraron nodes"
____ loclib.e13046 = "Dirección"
____ loclib.e13047 = "WS"
____ loclib.e13048 = "Nombre"
____ loclib.e13049 = "Estado"
____ loclib.e13050 = " Servidor proxy no se ha encontrado"
____ loclib.e13051 = "No usar servidor proxy"
____ loclib.e13052 = "No se podéis conectar al servidor proxy"
____ loclib.e13053 = "No se podéis conectar al node"
____ loclib.e13054 = "Agregar servidor proxy"
____ loclib.e13055 = "Editar servidor proxy"
____loclib.save = "Guardar"
____ loclib.e13056 = "Nodes de host"
____ loclib.close = "Cerrar"
____ loclib.e13057 = "Por favor complete todos los campos"
____ loclib.e13058 = "Ya tiene este proxy en la lista".
____ loclib.delete = "Eliminar"
____ loclib.e13059 = "¿Está seguro de que desea eliminar este proxy de la lista?"
____ loclib.e13060 = "Lista de proxy"
____ loclib.e13061 = "¿Realmente desea dejar de usar el proxy y cambiar a una conexión insegura (conexión HTTP)?"

____ loclib.e13062 = "Editar node"
____ loclib.onproxy = "En memoria proxy"
____ loclib.locally = "En la memoria del dispositivo"
____ loclib.node
host = "Nodes de host"
____ loclib.e13063 = "Puerto RPC"
____ loclib.e13064 = "Puerto WS"
____ loclib.e13065 = "Nombre de node"
____ loclib.e13066 = "Introduzca un nombre de node"
____ loclib.e13067 = "Inicio de sesión de RPC"
____ loclib.e13068 = "Iniciar sesión para autorización de PRC"
____ loclib.e13069 = "Contraseña RPC"
____ loclib.e13070 = "Contraseña para autorización PRC"
____ loclib.e13071 = "Por favor complete todos los campos"

____ loclib.e13072 = "¿Está seguro de que desea eliminar este node de la lista?"
____ loclib.e13073 = "¿Realmente desea detener el proxy y cambiar a una conexión insegura (conexión HTTP)?"
____ loclib.notselected = "No seleccionado"
____ loclib.donation = "Donación"
____ loclib.e13074 = "Fondos pendientes. La dirección será válida"
____ loclib.sminutes = "minutos"
____ loclib.e13075 = "El tiempo de esta operación se termino".
____ loclib.reactivate = "Reactivar"
____ loclib.e13076 = "Escanee este código para enviar"
____ loclib.back = "Atrás"
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

____ loclib.e13088 = "Miembros de Pocketnet que han donado para apoyar a Pocketnet"
____ loclib.thankyou = "¡Gracias!"
____ loclib.e13089 = "Si desea que agreguemos su perfil de Pocketnet a la lista de donantes, envíenos la información de su donación".
____ loclib.e13090 = "Agregarme a la lista de donantes"
____ loclib.e13091 = "O podéis enviarnos un correo electrónico a"
____ loclib.e13092 = "con su dirección y monto"
____ loclib.finish = "Finalizar"
____ loclib.e13093 = "Seleccione un método de donación"
____ loclib.e13094 = "Algo salió mal. Vuelva a cargar la página y vuelva a intentarlo de nuevo (error: 0001)"
____ loclib.e13095 = 'Gracias por apoyar nuestro trabajo por la libertad. Nos aseguraremos de que cada cento estara en cuenta.
____ loclib.e13096 = 'Ingrese el monto de la donación'
____ loclib.e13097 = "Algo salió mal. Vuelva a cargar la página y vuelva a intentarlo (error: 0002)"
____ loclib.e13098 = "Agregar un enlace a la pagina web externa o recurso"
____ loclib.e13099 = "Cargar imágenes"
____ loclib.e13100 = "Haga clic aquí para seleccionar archivos para cargar"
____ loclib.e13101 = "o sueltas en este espacio"
____ loclib.e13102 = "Agregar enlace a un sitio web externo"
____ loclib.e13103 = "URL no es válido"
____ loclib.e13104 = "No se permite cargar más de 6 imágenes"
____ loclib.e13105 = "Gestión de nodes"
____ loclib.e13106 = "Node Pocketnet"
____ loclib.e13107 = "El node se podéis controlar usando una aplicación de escritorio"
____ loclib.e13108 = "No tiene conexión con interfaz proxy Electron"

____ loclib.e13109 = "Ingrese las palabras de la imagen para recibir una bolsa de coinmonedas y continuar con el registro"
____ loclib.e13110 = "Ingresar captcha"
____loclib.next = "Siguiente"
____ loclib.refresh = "Actualizar"
____ loclib.e13111 = "Agregue su dirección de correo electrónico para recibir las últimas actualizaciones de Pocketnet"
____ loclib.e13112 = "Introduzca su dirección de correo electrónico"
____ loclib.e13113 = "Insertar dirección de correo electrónico"
____ loclib.skip = "Saltar"
____ loclib.e13114 = "Hubo una problema con su registro por una actividad extraña en su dirección IP."
____ loclib.e13115 = "Envíenos un correo electrónico a"
____ loclib.e13116 = "para recibir monedas y abrir su cuenta".
____ loclib.e13117 = "Verificar saldo"
____ loclib.joinnow = "Únete ahora"
____ loclib.loading = "Cargando"
____ loclib.e13118 = "Las letras se insertaron incorrectamente"
____ loclib.e13119 = "Agregar correo electrónico y continuar"
____ loclib.e13120 = "Aplicaciones"
____ loclib.e13121 = "No se encontraron imágenes"
____ loclib.e13122 = "últimos comentarios"

____ loclib.e13123 = "Mostrar más publicaciones"
____ loclib.e13124 = "¡Más publicaciones geniales de Pocketnet!"
____loclib.e13125 = "¡La sección de mejores publicaciones está vacía!"
____ loclib.e13126 = "Aquí se mostrarán las publicaciones de las personas que sigues".
____ loclib.e13127 = "Aquí se mostrarán las publicaciones de las personas que sigues".
____ loclib.e13128 = "Aquí se mostrarán las publicaciones de las personas que sigues".
____ loclib.registration = "Registro"
____ loclib.editpost = "Editar publicación"
____ loclib.removepost = "Eliminar publicación"


____ loclib.reportpost = "Publicar repost"
____ loclib.donate = "Donación"
____ loclib.blockuser = "Bloquear usuario"
____ loclib.more = "Más"
____ loclib.showmore = "Mostrar más"
____ loclib.e13129 = "Imágenes adjuntas"
____ loclib.e13130 = "Editado"
____ loclib.e13131 = "Has bloqueado a este usuario"
____ loclib.e13132 = "apreciado"
____ loclib.e13133 = "Compartir esto"
____ loclib.e13134 = "Búsqueda en esta cadena no tiene resultados "
____ loclib.e13135 = "El usuario no tiene clave privada"
____ loclib.e13136 = "Cinta completa"
____ loclib.e13137 = "Su cinta"
____ loclib.e13138 = "Mejor"
____ loclib.e13139 = "BUSCAR EN POCKETNET"
____ loclib.e13140 = "BUSCAR EN"
____ loclib.notifications = "Notificaciones"
____ loclib.showall = "Mostrar todo"
____ loclib.e13141 = "No tienes notificaciones"

____ loclib.recommendations = "Recomendaciones"
____ loclib.e13142 = "Guardé mi clave, no me vuelvas a recordar esto"
____ loclib.e13143 = "¡Importante!"
____ loclib.e13144 = "Copiar"
____ loclib.e13145 = "Guardar clave en el dispositivo"
____ loclib.e13146 = "No hay más publicaciones"
____ loclib.e13147 = "Compartir"
____ loclib.e13148 = "¿Está seguro de que desea denunciar a esta publicación?"
____ loclib.e13149 = "valoraciones de los usuarios"
____ loclib.e13150 = "Calificación de publicación"
____ loclib.e13151 = ' Todavía nadie ha calificado esta publicación'
____ loclib.e13152 = "Calificaciones de usuarios"
____ loclib.e13153 = "Saltar y ir al sitio"
____ loclib.e13154 = "Su información de registro"
____ loclib.e13155 = "Para utilizar Pocketnet, debe generar su propia clave criptográfica privada, que reemplaza el nombre de usuario y la contraseña de las redes sociales centralizadas".
____ loclib.users = "Usuarios"
____ loclib.userstx = "Usuario"
____ loclib.user = "Usuario"
____ loclib.postscount = "Número de publicaciones"
____ loclib.about = "Acerca de nosotros"
____ loclib.e13156 = "Para reducir los resultados"
____ loclib.posts = "Publicaciones"
____ loclib.e13157 = "Buscar por"
____ loclib.e13158 = "no trajo ningún resultado"
____ loclib.e13159 = "La frase de búsqueda está vacía"
____ loclib.repost = "Volver a publicar"
____ loclib.e13160 = "¡Hola Pocketeers!"

____ loclib.e13161 = "Agrega etiquetas para tu publicación"
____ loclib.e13162 = "Podéis ingresar hasta 30 etiquetas"
____ loclib.e13163 = "No se han realizado cambios en esta publicación"
____ loclib.e13164 = "Agrega algunas palabras para decirle a Pocketpeople sobre tu enlace. ¿De qué es eso? ¿Por qué es importante? ¿Cuál es tu opinión?"
____ loclib.e13165 = 'Su enlace de video no es válido. Inténtelo descargar URL de video correcto. '
____ loclib.e13166 = "Guardaste"
____ loclib.e13167 = "persona de internet censurado"
____ loclib.e13168 = "Gana Pocketcoin por cada registro de tu enlace"
____ loclib.e13169 = "Enlace directo"
____ loclib.copy = "Copiar"
____ loclib.e13170 = "Habilitar llamada de registro de Pocketnet"
____ loclib.more = "Más"
____ loclib.e13171 = "Buenas noticias. Me independicé de los monopolios de las redes sociales. Únase a mí en pocketnet.app para que podemos compartir y charlar independientemente de blockchain. Únase a mí aquí".
____ loclib.e13172 = "Quiero compartir esto con usted desde la plataforma blockchain descentralizada de Pocketnet. Espero que le resulte útil y si se registras, nos obtendremos un bono en la criptomoneda Pocketcoin!"
____ loclib.e13173 = "Enviar por correo electrónico"
____ loclib.e13174 = "Compartir en redes sociales"
____ loclib.e13175 = "Etiquetas relevantes"
____ loclib.e13176 = "Tipo de dirección"
____ loclib.e13177 = "Cargar foto"

____ loclib.requiredfields = "campos obligatorios"
____ loclib.e13178 = "No asociado con su perfil"
____ loclib.e13179 = "Lista de transacciones no gastadas"
____ loclib.e13180 = "Su cuenta se ha creado correctamente"
____ loclib.e13181 = "Se produjo un error al crear una oferta"
____ loclib.e13182 = "Explorador de bloques"
____ loclib.e13183 = "Centro de ayuda"
____ loclib.e13184 = "Continuar registro"
____ loclib.e13185 = "Conexión perdida"
____ loclib.e13186 = "Editar perfil"
____ loclib.e13187 = "Contenido"
____ loclib.e13188 = "Guarde su clave criptográfica privada, que reemplaza el nombre de usuario y la contraseña de las redes sociales centralizadas".
____ loclib.e13189 = "¡Cerrar sesión y perder mi clave para siempre!"
____ loclib.e13190 = "Tema de Pocketnet"
____ loclib.e13191 = "Seleccionar tema"
____ loclib.e13192 = "Nivel"
____ loclib.e13193 = "Bono"
____ loclib.e13194 = "Reputación y recompensas"
____ loclib.e13195 = "Restricciones"
____ loclib.e13196 = "Esto podéis tardar"
____ loclib.e13197 = "Consigue Poketcoins"
____loclib.e13198 = "Tiempo estimado de espera"
____ loclib.e13199 = "Únase a Pocketnet ahora"

____ loclib.e13200 = "Regresar a Pocketnet"
____ loclib.e13201 = "Unirse a la prueba beta"
____ loclib.e13202 = "La beta de Pocketnet comenzará el 24 de enero".
____ loclib.e13203 = "Gracias por unirse a la lista de distribución pruebas beta de Pocketnet. Usar Pocketnet no es necesariamente, pero usaremos este correo electrónico para enviar sus encuestas para mejorar la plataforma. Gracias por ayudar en formar el futuro de Internet".
____ loclib.e13204 = "Dirección para recibir Poketcoins"
____ loclib.e13205 = "Opciones"
____ loclib.e13206 = "Monto recibido"
____ loclib.e13207 = "Importe de envío"
____ loclib.e13208 = "Disponible"
____ loclib.e13209 = "Lista de financiación colectiva"
____ loclib.e13210 = "Nuevo contrato"
____ loclib.e13211 = "Copiar enlace y compartir"
____ loclib.amount = "Cantidad"
____ loclib.label = "Firma"
____ loclib.message = "Mensaje"
____ loclib.copylink = "Copiar enlace"
____ loclib.e13211 = "Por favor complete estos campos"
____ loclib.e13212 = "Crear código QR"
____ loclib.e13213 = "Dirección del destinatario"
____ loclib.process = "Proceso"
____ loclib.source = "Fuente"
____ loclib.yourmessage = "Su mensaje"
____ loclib.e13214 = "Número de Poketcoins"
____ loclib.currency = "Moneda"


____ loclib.e13215 = "Seleccionar moneda"
____ loclib.e13216 = "Moneda actual"
____ loclib.e13217 = "Se agotó el tiempo de esta transacción."
____ loclib.e13218 = "Esperando confirmaciones de blockchain"
____ loclib.e13219 = "Enviarle Poketcoins"
____ loclib.e13220 = 'Poketcoins entregados'
____ loclib.errorreload = "Se produjo un error. Vuelva a cargar la página y vuelva a intentarlo".
____ loclib.e13221 = "¿Está seguro de que desea eliminar la información sobre esta transacción? No es posible detener transacción "
____ loclib.e13222 = "Descargar Desktop App -es la forma más resistente a la censura de usar Pocketnet. Incluso si los sitios web están cerrados, la aplicación funcionará directamente a través de nodos ".
____ loclib.e13223 = "Descargar Pocketnet para Windows"
____ loclib.e13224 = "Descargar Pocketnet para Linux"
____ loclib.e13225 = "Node Pocketnet"
____ loclib.e13226 = 'Descargar node'
____ loclib.e13227 = "Descargar el node Pocketnet para Windows"
____ loclib.e13228 = "Descargar el node Pocketnet para Linux"
____ loclib.e13229 = 'Clave privada no válida'
____ loclib.e13230 = 'Error de conexión'

____ loclib.e13231 = "Conexión se cortó "
____ loclib.e13232 = "No se podéis conectar al node"
____ loclib.e13233 = 'Este comentario fue eliminado'
____ loclib.e13234 = 'Opreturn error/41'
____ loclib.e13235 = 'No podéiss estimar el comentario dos veces'
____ loclib.e13236 = 'Este comentario fue eliminado'
____ loclib.e13237 = 'No podéiss calificarse '
____ loclib.e13238 = 'Error al enviar el comentario. Espera y vuelve a intentarlo / 37 '
____ loclib.e13239 = 'Error al enviar comentario / 35'
____ loclib.e13240 = 'El comentario al que estás intentando responder ha sido eliminado por el usuario'
____ loclib.e13241 = 'Este comentario es demasiado largo, porfavor divídalo en varios'
____ loclib.e13242 = "Esta persona te bloqueó, no podéiss comentar sus publicaciones"
____ loclib.e13243 = "Ha alcanzado su límite de calificación para comentarios en el período de 24 horas"
____ loclib.e13244 = "Ha alcanzado el límite de edición los comentarios en 24 horas".
____ loclib.e13245 = "Ha alcanzado el límite de publicación los comentarios en 24 horas".
____ loclib.e13246 = "Estás intentando editar la publicación de otra persona"
____ loclib.e13247 = "Ha alcanzado su límite de edición 5 publicaciones en 24 horas"
____ loclib.e13248 = 'Solo podéis editar publicaciones o comentarios una vez de cada bloque en el blockchain. Espera un minuto y vuelve a intentarlo '
____ loclib.e13249 = 'No podéis encerrarse, afortunadamente'
____ loclib.e13250 = 'Ya bloqueaste a este usuario'
____ loclib.e13251 = 'No ha bloqueado a este usuario'
____ loclib.e13252 = 'Transacción esta mal formada'
____ loclib.e13253 = 'No podéis vincularse a sí mismo'
____ loclib.e13254 = 'El nombre de usuario es demasiado largo'
____ loclib.e13255 = 'Otro usuario ya está usando este nombre'
____ loclib.e13256 = 'Esta publicación es demasiado larga, divídala en varias'.
____ loclib.e13257 = 'Su reputación de Pocketnet aún no le permite registrar quejas'
____ loclib.e13258 = 'Ha alcanzado su límite de quejas en 24 horas'

____ loclib.e13259 = 'No podéis denunciar su publicación'
____ loclib.e13260 = 'Ya ha presentado una queja sobre esta publicación'
____ loclib.e13261 = "Guardar clave"
____ loclib.e13262 = "Más tarde"
____ loclib.e13263 = "Suscríbete y incluyes las notificaciones de nuevas publicaciones de este usuario"
____ loclib.e13264 = "Suscribirse sin notificación"
____ loclib.e13265 = 'Este nombre ya no está disponible, elija otro'
____ loclib.e13266 = "Tema claro"
____ loclib.e13267 = "Tema oscuro"
____ loclib.e13268 = 'Coinstake win'
____ loclib.e13269 = 'Transacción recibida'
____ loclib.e13270 = 'Nueva evaluación'
____ loclib.e13271 = 'Nuevo comentario'
____ loclib.e13272 = 'Nueva respuesta al comentario'
____ loclib.e13273 = 'Nuevo suscriptor'
____ loclib.e13274 = 'Usuario liberado'
____ loclib.e13275 = 'Calificación del comentario'
____ loclib.e13276 = 'Mostrar los videos incrustados'
____ loclib.e13277 = 'Reproducción automática de video'
____ loclib.e13278 = 'Iniciar PocketNet automáticamente'
____ loclib.e13279 = 'Chat'
____ loclib.e13280 = 'Etiquetas'
____ loclib.e13281 = 'Últimos comentarios'
____ loclib.e13282 = "Token de bot de Telegram"
____ loclib.e13283 = "Publicar desde el canal de Telegram"
____ loclib.e13284 = "Agregar bot al chat y seleccionar"
____ loclib.e13285 = 'Preguntalo antes de publicar desde Telegram'
____ loclib.e13286 = 'Preguntar antes de enviar a Telegram'
____ loclib.e13287 = "Enviar al canal de telegramas"
____loclib.video = "Video"
____ loclib.e13288 = "Widgets de la página de inicio"
____ loclib.e13289 = "Integración de Telegram"

____ loclib.system = "Sistema"
____ loclib.e13290 = "Le gustaría suscribirse"
____ loclib.e13291 = "¿Está seguro de que desea enviar un mensaje a Telegram?"
____ loclib.send = "Enviar"
____ loclib.e13292 = "Ya tiene un node en este host"
____ loclib.e13293 = "Error interno"
____ loclib.e13294 = 'Usar la base de datos PGSQL'
____ loclib.e13295 = 'DB Host'
____ loclib.e13296 = 'DB Puerto'
____ loclib.e13297 = 'DB Max'
____ loclib.e13298 = 'DB Idle Timeout, ms'
____ loclib.e13298 = 'DB Nombre'
____ loclib.e13300 = 'DB Usuario'
____ loclib.e13031 = 'DB Contraseña'
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
____ loclib.e13325 = "¿Está seguro de que desea enviar mensajes desde Telegram?"
____ loclib.e13326 = "Publicar"
____ loclib.e13327 = '¿Está seguro de que desea usar el proxy nuevamente?'
____ loclib.e13328 = '¡Apreciamos su comentario!'
____ loclib.e13329 = "Nueva calificación de comentario"
____ loclib.e13330 = "compartió su publicación:"
____ loclib.e13331 = "compartió su publicación:"
____ loclib.e13332 = "hizo una nueva publicación:"
____ loclib.e13333 = "Transacción entrante"
____ loclib.e13334 = "Ganaste"
____ loclib.e13335 = "Pocketcoin para sus últimas acciones"
____ loclib.e13336 = "con el mensaje:"
____ loclib.e13337 = "comentó en su publicación:"
____ loclib.e13338 = "respondió a su comentario:"
____ loclib.reply = "Responder"
____ loclib.e13339 = "Rescataste a alguien del internet censurado. ¡Algunos poketcoins están en camino!"
____ loclib.e13340 = '¡Felicitamos!'
____ loclib.e13341 = "te seguí"
// <%=e('process')%> <%=e('e13037').toUpperCase()%> <%=e('')%> self.app.localization.e('e13350')
____ loclib.e13342 = "Nuevo suscriptor"
____ loclib.e13343 = "calificó su publicación"
____ loclib.e13344 = "Nueva calificación"
____ loclib.e13345 = "te envió un mensaje"
____ loclib.e13346 = "Publicaciones nuevas"
____ loclib.e13347 = "Hay actualizaciones de Pocketnet disponibles. ¿Desea aplicar las actualizaciones ahora?"
____ loclib.e13348 = "No, más tarde"
____ loclib.e13349 = "Hay actualizaciones de Pocketnet disponibles. ¿Ir a la página para descargar una nueva versión?"
____ loclib.e13350 = 'Únase a Pocketnet y gane Pocketcoin ahora'
____ loclib.e13351 = 'Escribe porfavor brevemente sobre ti para hacerles saber a los usuarios que deberían seguirte'
____ loclib.e13351 = 'Charla de Pocketnet'
oclib.e13352 = 'No tienes permiso para chatear'
