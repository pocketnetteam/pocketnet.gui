if(typeof loclib == "undefined" || !loclib)
	loclib = {};

	loclib.es = {};

	var appname = ((window.projects_meta || {})[window.pocketnetproject || "Bastyon"] || {}).fullname || 'Bastyon'


var _l = loclib.es;

//time

_l.fewseconds = "Hace unos segundos"
_l.oneminute = "Hace un minuto"

_l.minutes = function(v){
return v + " hace un minuto"
}

_l.tenminutes = "Hace diez minutos"
_l.halfanhour = "Hace una hora antes"
_l.anhour = "Hace una hora antes"
_l.today = "Hoy a las"

//authorization

_l.id0 = "Iniciar sesión en su cuenta";
_l.id1 = "Si estas registrado en el sistema, inicie sesión"
_l.loadqrcode = "Crear QR código"
_l.stay = "Quedarse en sistema"
_l.signin = "Entrar"
_l.orcreate = "o crear nueva cuenta"
_l.createnew = "Crear nueva cuenta"
_l.staysafe = "No es seguro. ¿Quieres continuar?"
_l.or = "o";

// Register a New Account
_l.id71 = "Crear nueva cuenta"
_l.id72 = "¿Ya tienes cuenta?, Entrar"

_l.rtip1 = "Nesesariamente escribe su clave privada"
_l.rtip2 = function(){
	var h = "A continuación, se generará su clave privada. Grabarlo y guardar el código QR en su dispositivo. Y no los pierdas. No almacenamos sus datos personales. ¡La clave privada no se puede recuperar!"
	return h
}

_l.generatepkey = "Crear clave privada"
_l.rtip3 = "Anote esta clave de Inicio de sesión y guarde el código QR. No almacenamos sus datos personales. ¡La clave privada no se puede recuperar!";
_l.saveqrcode = "Guardar QR código"
_l.copyprivkey = "Copiar la clave privada"
_l.rcontinue = "Continuar"
_l.idle = "Retraso por tiempo corto"
_l.congratulations = "¡Felicidades! Usted <span class='pnlabel'>"+appname+"</span>"
_l.creatingpreloader = "Cuenta en proceso de creación"
_l.removepaste = "Hemos eliminado la posibilidad de insertar en este formulario."
_l.filedamaged = "El archivo está corrupto"
_l.keysnotmatch = "La clave generada y la que ingresó no coinciden"
_l.confirmkey = "Imprima su clave privada aquí"
_l.successfullycopied = "La clave fue copiado en el portapapeles"
_l.urlsuccesscopied = "Enlace se copió correctamente"
_l.confirmkeyLabel = "Confirme su clave privada. Escriba la clave en el campo o <b> cargue el código QR </b>"
_l.repeatetocreate = "Volver a crear la clave"
_l.confirmcreate = "Crear cuenta"

//user activation

_l.useractivation = "Activación del usuario"
_l.wesentmoney = "Le hemos enviado unas criptomonedas para continuar con registración, espere hasta que sean acreditados"
_l.wesentmoneym = "Ya hemos enviado unas criptomonedas para registración"


_l.wesentmoneydelay = "El proceso está tardando más tiempo de lo habitual, espere más"
_l.funetworkproblems = "Hay algunos problemas de conexión. Vuelva a intentarlo más tarde"


_l.pleasewait = "Por favor espere";
_l.next = "Siguiente";
_l.welcometopocketnet = "Bienvenido a "+appname+"";
_l.continue = "Continuar";


//user page

_l.rstate = "Estado";
_l.rprofile = "Perfil";
_l.rsettings = "Configuración";
_l.rwallet = "Monedero";
_l.raccounts = "Cuentas";
_l.rsystem = "Sistema";
_l.rconnection = "Conexión";
_l.pnetAddress = "Dirección "+appname+"";
_l.profile = "Perfil";
_l.signout = "Cerrar sesión";

//send



//send

_l.postlabel = "Donación por vuestra publicacion"
_l.donationlabel = "Donación"
_l.donationwel = "Si desea agradecer al autor de la publicación, puede utilizar la transacción "+appname+"";
_l.donationwela = "Enviar por "+appname+"";
_l.donationwelan = "También se pueden utilizar otros sistemas de criptomonedas";
_l.successfullycopiedaddress = "La dirección se copió correctamente";


//wallet

_l.wrecieve = "Recibir criptomonedas a la dirección";
_l.wcopyshare = "Copiar y compartir la dirección";
_l.wqrcode = "Código QR";
_l.wcopeaddress = "Copiar dirección";
_l.wcreatelink = "O crear un enlace para hacer el pago";
_l.required = "Requerido";
_l.wgetlink = "Recibir enlace";
_l.waddresses = "Direcciones";
_l.waddress = "Dirección";
_l.wbalance = "Billetera";
_l.wpercente = "Porcentaje";
_l.waddaddress = "Abrir nueva dirección";
_l.wrecieve = "Recibir";
_l.wrecieveon = "Recibir en";
_l.wcopyshareorcreate = "Copia y comparte la dirección o crea un enlace para el pago";
_l.wdgetlink = "Obtener enlace";
_l.wdqrcode = "Código QR";
_l.wdcopyaddress = "Copiar dirección";
_l.wdpleasefill = "Por favor complete los campos requeridos";
_l.wduseqr = "Utilice este código QR para recibir criptomonedas en esta dirección";
_l.wdaddress = "Dirección";
_l.wdamount = "Cantidad";
_l.wdlabel = "Etiqueta";
_l.wdmessage = "Mensaje";
_l.wsend = "Enviar";
_l.calcfeesandsend = "Calcular comisión y enviar";
_l.wstrfees = "Сomisión de transacción";
_l.wsfees = "Comisión";

_l.wssendto = "ENVIAR CRIPTOMONEDAS A";
_l.wssendb = "ENVIAR";

_l.tacaddress = "Dirección de cuenta";
_l.twallet = "Monedero";
_l.twalletaddresses = "Direccione del monedero";
_l.tTotal = "Total";
_l.wsselect = " Seleccionar fuente";
_l.wsenter = "Ingresa una dirección o selecciona";
_l.wsreciever = "Dirección del destinatario";
_l.wsamount = "Cantidad";
_l.wsamountof = " Cantidad de transacción ";
_l.wsincludefees = "Incluir comisión en la cantidad";
_l.wsrecieverpay = "Paga el remitente";
_l.wssenderpay = "El beneficiario paga";
_l.wdselectfrom = "Seleccionar";

_l.wdenteramount = "Ingresa la cantidad";
_l.wdmessageplaceholder = "¿Para qué es esta transacción?";
_l.wrenteraddress = "Introduzca la dirección";
_l.wrenteraddressselect = "Ingrese una dirección o seleccione";
_l.wreturntoeallet = "VOLVER A BILLETERA";
_l.linkCreated = "ENLACE CREADO";
_l.waddresswascop = "La dirección se copió en el portapapeles";
_l.wqrcodecreated = "CÓDIGO QR CREADO";
_l.wlinkcreating = "CREAR UN ENLACE";
_l.wqrcodecreating = "CREAR CÓDIGO QR";
_l.wdoptions = "configuración";
_l.wssuccessfully = "La transacción se envió correctamente";
_l.wscalculatefees = "CALCULAR COMISIÓN";
_l.wsaddressnotv = "La dirección fue introducida incorrecto";


//user profile
_l.uaddaddressdona = " Añadir la dirección para donaciones";
_l.uaddaddressdonaplace = "Introduzca la dirección";
_l.uchangeicon = "Cambiar icono de usuario";
_l.utip1 = "Debeis introducir el nombre de usuario antes de usar "+appname+"";
_l.utip2 = "Queda el último paso";
_l.upicset = "Establecer icono de usuario";
_l.upic = "Icono de usuario";
_l.uuserinfo = "Información del usuario";
_l.usave = "Guardar";
_l.ucancel = "Cancelar";
_l.uwaitb = "Esperando confirmación para guardar información";
_l.uchanges = " No habeis introducido ningún cambio";
_l.uchangesvalid = "Debeis introducir el nombre de usuario";
_l.uname = "Nombre";
_l.unickname = "Apellido";
_l.ulanguage = "Idioma";
_l.uabout = "Acerca de mí";
_l.uwebsite = "Página web";
_l.uaddresesd = "Dirección de donación";
_l.usavechanges = "¿Quieres guardar sus cambios?";


//ustate

_l.sreps = "Reputación y restricciones";
_l.sdisconnected = "Desconectado al node";
_l.suseractivation = "Activación del usuario";
_l.sprofile = "Perfil";
_l.spc = "Número de publicaciones";
_l.ssc = "Número de estrellas";
_l.ccc = "Número de comentarios";
_l.crc = "Número de valoraciones de comentarios";
_l.artc = "Recuento de artículos";


_l.stp = "Periodo trial";
_l.srep = "Reputación";

//accounts
_l.aaddedacc = "Cuentas agregadas";
_l.acure = "Actual";
_l.aaddacc = "Agregar cuenta";
_l.ascheduler = "Planificador de tareas";
_l.aused = "Esta dirección ya está en uso en este dispositivo";



//author
_l.sub = "Suscribirse";
_l.unsub = "Cancelar suscripción";
_l.joined = "Se unió a la comunidad";
_l.shares = "PUBLICACIONES";
_l.uposts = "PUBLICACIONES";
_l.myuposts = "MIS PUBLICACIONES";
_l.followers = "SUSCRIBTORES";
_l.following = "SUSCRIPCIONES";
_l.settings = "GESTIÓN";
_l.anofollowers = "Este usuario todavía no tiene suscribtores";
_l.aynofollowers = "Todavía no teneis suscribtores";
_l.anofollowing = "este usuario no esta suscrito a nadie";
_l.aynofollowing = " No estais suscrito a nadie ";
//lenta
_l.lloadmore = "¡Cargar más publicaciones!";
_l.lloadprev = "Cargar contenido nuevo"
_l.lend = "Fin de la cinta";
_l.zerop = "Este autor aún no tiene publicaciones";
_l.zeroy = "Aún no teneis publicaciones, ¡comparteis algo!";
_l.llogin = " Antes de continuar, debeis iniciar sesión ";
_l.lcomlaindialog = "¿Estais seguro de que deseais quejarse sobre esta publicación?";
_l.lunsubscribe = "¿Estais seguro de que deseais cancelar la suscripción de este usuario?";
_l.lprivatepublic = "¿Le gustaría hacer una suscripción pública o privada?";
_l.lprivate = "Privado";
_l.lpublic = "Público";

//inviteComment
_l.commentBannerTitle = "Deja un comentario para el autor";
_l.commentBannerDescription = "Comentar te desbloquea nuevas funciones en Bastyon y te ayuda a encontrar amigos 😀";
_l.dontShowAgain = 'No mostrar más';

//share
_l.newShare = "Nueva publicación";
_l.scaption = "Título";
_l.whatsnew = "¿Qué hay de nuevo?";
_l.saddlink = "Agregar un enlace en pagina web o en video";
_l.saddimages = "Adjuntar imágenes";
_l.sarticle = "Escribir artículo";
_l.stelegram = "Enviar a Telegram"
_l.stimes = "Eliminar publicación"
_l.snothing = "Nada";
_l.sposttime = "Publicar por hora";
_l.spostnow = "Publicar ahora";
_l.stimenotselected = "Hora no seleccionada";
_l.spost = "Publicar";
_l.sdate = "Fecha";
_l.stime = "Hora";
_l.snotags = "Agregar etiqueta";
_l.expandvideo = "Haga clic para expandir";
_l.emptymessage = "El mensaje está vacío";
_l.emptytags = "Por favor agregue etiquetas";
_l.emptyutxo = "No hay monedas en la dirección";
_l.networkerror = "Error de red";
_l.maximages = "Se permite subir un máximo de 10 imágenes";
_l.sharenow = "¿Quiere publicar este contenido ahora?";
_l.pastdate = "Se especifica el tiempo transcurrido";
_l.timenotselected = "Hora no seleccionada";
_l.addtags = "Agregar etiquetas";
_l.tnews = "noticias";
_l.timages = "imágenes";
_l.tvideos = "video";
_l.tmarket = "tienda";
_l.tsport = "deporte";


//menu
_l.signinmenu = "Iniciar sesión";
_l.signupmenu = "Registrarse";
_l.aboutmenu = "saber más";

//footer
_l.aboutus = "Acerca de nosotros";



// Dialog Box Options
_l.daccept = "Confirmar";
_l.dcancel = "Cancelar";
_l.dyes = "Sí";
_l.dno = "No";
_l.dsa = "No volver a mostrar";


// Messages

_l.coinbaseSuccess = function (v) {
return "<b> ¡Felicitaciones! </b>" + "Has ganado <b>" + v + "POC </b>"
}
_l.coinbaseSuccesspost = function (v) {
return "Felicidades, recibisteis" + v + "¡Bolsa de criptomonedas por buestras últimas publicaciones!"
}
_l.coinbaseSuccesscomment = function (v) {
return "Felicitaciones, recibisteis " + v + "¡ Bolsa de criptomonedas por buestras últimas comentarios!"
}
_l.userSent = function (v) {
return "te envió <b>" + v + "POC </b>"
}



_l.refferalUserMessage = "Felicidades! Rescataste a alguien de la red censurada."


_l.subscribeUserMessage = "suscrito a usted"
_l.unsubscribeUserMessage = "anulado su suscripción"
_l.gotoprofileMessage = "ir al perfil"
_l.upvoteShareMessage = "le dio una calificación a vuestra publicación"


// Errors

_l.error = "Error";
_l.checkScoreError = "Debe completar su perfil antes de usar "+appname+". ¿Le gustaría hacer esto ahora?";
_l.checkScoreErrorLight = "Cuenta no activada";
_l.timestamperror = "El tiempo en la aplicación y en el node no coincide";
_l.postLimitLight = "Ha alcanzado el límite de publicaciones";
_l.scoreLimitLight = "Ha alcanzado su límite de calificación";
_l.doubleLimitLight = "Ya calificó esta publicación";

_l.SelfSubscribeError = "Imposible suscribirme";
_l.DoubleSubscribeError = "Ya estasis  suscrito a esta cuenta. Actualiza la página";
_l.InvalideSubscribeError = "Ocurrió un error al darse de baja de la cuenta. Actualizar la página";
_l.ChangeInfoLimitError = "Ha alcanzado el límite para cambiar información sobre usted. Inténtelo más tarde";
_l.SelfScoreError = "No podeis calificarse";

_l.networkerror = "Surgieron nuevas problemas con la comunicación entre el node y su cuenta";

_l.canSpendError = "No teneis dinero desbloqueado. Para continuar hay que esperar";
_l.noMoneyError = "No teneis dinero";

_l.waitConf = "Espera  porfavor mientras que transacciones anteriores procesan";
_l.postWaitConf = "La publicación está esperando confirmación";


// notifications
_l.ntnow = "Ahora"
_l.ntlasthour = "Hace una hora"
_l.nttoday = "Hoy"
_l.ntmounth = "Este mes"
_l.ntearlier = "Hace tiempo"
_l.nodeWalletAdd = "Agregar una dirección podéis llevar algún tiempo. ¿Seguir?"
_l.nodeEnableNoteHeader = "Note"
_l.nodeEnableNote = "Un node "+appname+" en funcionamiento podéis ocupar hasta 5 GB de RAM. Asegúrese de tener suficiente memoria para esto. ¡Feliz steking!"
/// 1301
_l.address = "Dirección"
_l.privatekey = "Clave privada"
_l.qrcode = "Código QR"
_l.addaccount = "Agregar cuenta"
_l.entermnimo = "Introduzca mnemofrase o clave privada"
_l.add = " Añadir "
_l.e13011 = "Ahora procedereis con el registro Después de instalar "+appname+" Desktop"
_l.e13012 = "Si "+appname+" no comienza a cargarse, haga clic para descargarlo"
_l.e13013 = "Ingrese el título de imagen (opcional)"
_l.e13014 = "El formato de este archivo no no está soportado:"
_l.e13015 = "Este archivo es demasiado grande:"
_l.e13016 = "Insertas su referencia de YouTube, Vimeo y pulse Entrar"
_l.e13017 = "Cargando en blockchain"
_l.e13018 = "¿Está seguro de que desea eliminar este artículo?"
_l.e13019 = "Nuevo"
_l.e13020 = "Escribir artículo nuevo"
_l.youarefollowing = "Estás suscrito"
_l.follow = "Seguir"
_l.blocked = "Bloqueado"
_l.e13021 = "Mostrar más"
_l.block = "Bloquear"
_l.blockuser = "Bloquear usuario"
_l.unblockuser = "Desbloquear usuario"
_l.e13022 = "¿Está seguro de que desea cancelar la suscripción de este usuario?"
_l.unfollow = "Dejar de seguir"
_l.unblock = "Desbloquear"
_l.share = "Compartir"
_l.info = "Información"
_l.signToComment = "Para ver o publicar comentarios, debe iniciar sesión o registrarse"
_l.e13023 = "¿Está seguro de que desea desbloquear a este usuario?"
_l.e13024 = "Su clave privada parar entrar"
_l.e13025 = "Crear nueva cuenta"
_l.e13026 = "Únase a "+appname+""
_l.e13027 = "Permanecer en el sistema"
_l.e13028 = "la clave privada no es correcta"
_l.e13029 = "El mensaje está vacío"
_l.e13030 = "Los comentarios podéisn tener hasta 1000 caracteres."
_l.e13031 = "Comparte este comentario"
_l.e13032 = "¿Está seguro de que desea eliminar su comentario?"
_l.e13033 = "Comentario eliminado"
_l.e13034 = "Sí"
_l.e13035 = "No, cancelar"
_l.hide = "Ocultar"
_l.e13036 = "Mostrar comentarios anteriores"
_l.e13037 = "Respuestas"
_l.remove = "Eliminar"
_l.e13038 = "Comentas y ganas la reputación"
_l.e13039 = "Comentas y ganas la reputación"
_l.e13040 = "No tiene permisos para comentar"
_l.complain = "Quejarse"
_l.complain_success = "Su queja ha sido enviada con éxito"
_l.next = "Siguiente"
_l.post = "Publicar"
_l.e13041 = "Conectando a "+appname+""
_l.e13042 = "Servidor proxy "+appname+""
_l.e13043 = "Node "+appname+""
_l.e13044 = "Agregar node"
_l.e13045 = "No se encontraron nodes"
_l.e13046 = "Dirección"
_l.e13047 = "WS"
_l.e13048 = "Nombre"
_l.e13049 = "Estado"
_l.e13050 = " Servidor proxy no se ha encontrado"
_l.e13051 = "No usar servidor proxy"
_l.e13052 = "No se podéis conectar al servidor proxy"
_l.e13053 = "No se podéis conectar al node"
_l.e13054 = "Agregar servidor proxy"
_l.e13055 = "Editar servidor proxy"
_l.save = "Guardar"
_l.e13056 = "Nodes de host"
_l.close = "Cerrar"
_l.e13057 = "Por favor complete todos los campos"
_l.e13058 = "Ya tiene este proxy en la lista"
_l.delete = "Eliminar"
_l.e13059 = "¿Está seguro de que desea eliminar este proxy de la lista?"
_l.e13060 = "Lista de proxy"
_l.e13061 = "¿Realmente desea dejar de usar el proxy y cambiar a una conexión insegura (conexión HTTP)?"
_l.e13062 = "Editar node"
_l.onproxy = "En memoria proxy"
_l.locally = "En la memoria del dispositivo"
_l.node
host = "Nodes de host"
_l.e13063 = "Puerto RPC"
_l.e13064 = "Puerto WS"
_l.e13065 = "Nombre de node"
_l.e13066 = "Introduzca un nombre de node"
_l.e13067 = "Inicio de sesión de RPC"
_l.e13068 = "Iniciar sesión para autorización de PRC"
_l.e13069 = "Contraseña RPC"
_l.e13070 = "Contraseña para autorización PRC"
_l.e13071 = "Por favor complete todos los campos"
_l.e13072 = "¿Está seguro de que desea eliminar este node de la lista?"
_l.e13073 = "¿Realmente desea detener el proxy y cambiar a una conexión insegura (conexión HTTP)?"
_l.notselected = "No seleccionado"
_l.donation = "Donación"
_l.e13074 = "Fondos pendientes. La dirección será válida"
_l.sminutes = "minutos"
_l.e13075 = "El tiempo de esta operación se termino"
_l.reactivate = "Reactivar"
_l.e13076 = "Escanee este código para enviar"
_l.back = "Atrás"
_l.e13077 = "Agregue su perfil a la lista de donantes"
_l.e13078 = "¿Por qué pedimos donaciones?"
_l.e13079 = "Hemos pasado más de 14 meses en tiempo libre de trabajos de tiempo completo llevando "+appname+" a la gente. Además de tiempo y esfuerzo, hemos puesto nuestro propio dinero para ayudar a lanzar la plataforma. Ahora necesitamos que la comunidad dé un paso adelante y nos ayude con el crecimiento."
_l.e13080 = "¿Cómo se utilizarán los fondos?"
_l.e13081 = "Los fondos se utilizarán para comprar publicidad y contratar a algunos expertos en temas específicos para hacer que "+appname+" sea aún más seguro. El equipo de desarrollo actual no recibirá ninguna de estas donaciones. Siempre que sea posible, publicaremos aquí cómo usamos los fondos."
_l.e13082 = "Lo que obtendrás por tu donación además de saber que apoyaste la libertad:"
_l.e13083 = "Como muestra de nuestra gratitud por la donación, recibirá un regalo en cierta cantidad de Pocketcoin"
_l.e13084 = "Además, cuando construimos chat grupal, usted será miembro de un grupo especial de donantes que tendrán acceso directo al equipo de "+appname+", incluso a medida que la plataforma crezca"
_l.e13085 = "El enlace a su perfil de "+appname+" se enumerará a continuación, llevando a más personas a sus publicaciones (a menos que nos pida que no lo hagamos)"
_l.e13086 = "Soporte Web Descentralizado Ahora"
_l.e13087 = "Bitcoin, Litecoin, Monero"
_l.e13088 = "Miembros de "+appname+" que han donado para apoyar a "+appname+""
_l.thankyou = "¡Gracias!"
_l.e13089 = "Si desea que agreguemos su perfil de "+appname+" a la lista de donantes, envíenos la información de su donación"
_l.e13090 = "Agregarme a la lista de donantes"
_l.e13091 = "O podéis enviarnos un correo electrónico a"
_l.e13092 = "con su dirección y monto"
_l.finish = "Finalizar"
_l.e13093 = "Seleccione un método de donación"
_l.e13094 = "Algo salió mal. Vuelva a cargar la página y vuelva a intentarlo de nuevo (error: 0001)"
_l.e13095 = "Gracias por apoyar nuestro trabajo por la libertad. Nos aseguraremos de que cada cento estara en cuenta."
_l.e13096 = "Ingrese el monto de la donación"
_l.e13097 = "Algo salió mal. Vuelva a cargar la página y vuelva a intentarlo (error: 0002)"
_l.e13098 = "Agregar un enlace a la pagina web externa o recurso"
_l.e13099 = "Cargar imágenes"
_l.e13100 = "Haga clic aquí para seleccionar archivos para cargar"
_l.e13101 = "o sueltas en este espacio"
_l.e13102 = "Agregar enlace a un sitio web externo"
_l.e13103 = "URL no es válido"
_l.e13104 = "No se permite cargar más de 6 imágenes"
_l.e13105 = "Gestión de nodes"
_l.e13106 = "Node "+appname+""
_l.e13107 = "El node se podéis controlar usando una aplicación de escritorio"
_l.e13108 = "No tiene conexión con interfaz proxy Electron"

_l.e13109 = "Ingrese las palabras de la imagen para recibir una bolsa de coinmonedas y continuar con el registro"
_l.e13110 = "Ingresar captcha"
_l.next = "Siguiente"
_l.refresh = "Actualizar"
_l.e13111 = "Agregue su dirección de correo electrónico para recibir las últimas actualizaciones de "+appname+""
_l.e13112 = "Introduzca su dirección de correo electrónico"
_l.e13113 = "Insertar dirección de correo electrónico"
_l.skip = "Saltar"
_l.e13114 = "Hubo una problema con su registro por una actividad extraña en su dirección IP."
_l.e13115 = "Envíenos un correo electrónico a"
_l.e13116 = "para recibir monedas y abrir su cuenta"
_l.e13117 = "Verificar saldo"
_l.joinnow = "Únete ahora"
_l.loading = "Cargando"
_l.e13118 = "Las letras se insertaron incorrectamente"
_l.e13119 = "Agregar correo electrónico y continuar"
_l.e13120 = "Aplicaciones"
_l.e13121 = "No se encontraron imágenes"
_l.e13122 = "últimos comentarios"

_l.e13123 = "Mostrar más publicaciones"
_l.e13124 = "¡Más publicaciones geniales de "+appname+"!"
_l.e13125 = "¡La sección de mejores publicaciones está vacía!"
_l.e13126 = "Aquí se mostrarán las publicaciones de las personas que sigues"
_l.e13127 = "Aquí se mostrarán las publicaciones de las personas que sigues"
_l.e13128 = "Aquí se mostrarán las publicaciones de las personas que sigues"
_l.registration = "Registro"
_l.editpost = "Editar publicación"
_l.removepost = "Eliminar publicación"


_l.reportpost = "Publicar repost"
_l.donate = "Donación"
_l.blockuser = "Bloquear usuario"
_l.more = "Más"
_l.showmore = "Mostrar más"
_l.e13129 = "Imágenes adjuntas"
_l.e13130 = "Editado"
_l.e13131 = "Has bloqueado a este usuario"
_l.e13132 = "apreciado"
_l.e13133 = "Compartir esto"
_l.e13134 = "Búsqueda en esta cadena no tiene resultados "
_l.e13135 = "El usuario no tiene clave privada"
_l.e13136 = "Cinta completa"
_l.e13137 = "Su cinta"
_l.e13138 = "Mejor"
_l.discussed = "Lo Más Discutido"
_l["Most Discussed Over"] = "En el espacio"
_l.e13139 = "BUSCAR EN "+appname+""
_l.e13140 = "BUSCAR EN"
_l.notifications = "Notificaciones"
_l.showall = "Mostrar todo"
_l.e13141 = "No tienes notificaciones"

_l.recommendations = "Recomendaciones"
_l.e13142 = "Guardé mi clave, no me vuelvas a recordar esto"
_l.e13143 = "¡Importante!"
_l.e13144 = "Copiar"
_l.e13145 = "Guardar clave en el dispositivo"
_l.e13146 = "No hay más publicaciones"
_l.e13147 = "Compartir"
_l.e13148 = "¿Está seguro de que desea denunciar a esta publicación?"
_l.e13149 = "valoraciones de los usuarios"
_l.e13150 = "Calificación de publicación"
_l.e13151 = " Todavía nadie ha calificado esta publicación"
_l.e13152 = "Calificaciones de usuarios"
_l.e13153 = "Saltar y ir al sitio"
_l.e13154 = "Su información de registro"
_l.e13155 = "Para utilizar "+appname+", debe generar su propia clave criptográfica privada, que reemplaza el nombre de usuario y la contraseña de las redes sociales centralizadas"
_l.users = "Usuarios"
_l.userstx = "Usuario"
_l.user = "Usuario"
_l.postscount = "Número de publicaciones"
_l.about = "Acerca de nosotros"
_l.e13156 = "Para reducir los resultados"
_l.posts = "Publicaciones"
_l.e13157 = "Buscar por"
_l.e13158 = "no trajo ningún resultado"
_l.e13159 = "La frase de búsqueda está vacía"
_l.repost = "Volver a publicar"
_l.e13160 = "¡Hola Pocketeers!"

_l.e13161 = "Agrega etiquetas para tu publicación"
_l.e13162 = "Podéis ingresar hasta 15 etiquetas"
_l.e13163 = "No se han realizado cambios en esta publicación"
_l.e13164 = "Agrega algunas palabras para decirle a Pocketpeople sobre tu enlace. ¿De qué es eso? ¿Por qué es importante? ¿Cuál es tu opinión?"
_l.e13165 = "Su enlace de video no es válido. Inténtelo descargar URL de video correcto."
_l.e13166 = "Guardaste"
_l.e13167 = "persona de internet censurado"
_l.e13168 = "Gana Pocketcoin por cada registro de tu enlace"
_l.e13169 = "Enlace directo"
_l.copy = "Copiar"
_l.e13170 = "Habilitar llamada de registro de "+appname+""
_l.more = "Más"
_l.e13171 = "Buenas noticias. Me independicé de los monopolios de las redes sociales. Únase a mí en pocketnet.app para que podemos compartir y charlar independientemente de blockchain. Únase a mí aquí"
_l.e13172 = "Quiero compartir esto con usted desde la plataforma blockchain descentralizada de "+appname+". Espero que le resulte útil y si se registras, nos obtendremos un bono en la criptomoneda Pocketcoin!"
_l.e13173 = "Enviar por correo electrónico"
_l.e13174 = "Compartir en redes sociales"
_l.e13175 = "Etiquetas relevantes"
_l.e13176 = "Tipo de dirección"
_l.e13177 = "Cargar foto"

_l.requiredfields = "campos obligatorios"
_l.e13178 = "No asociado con su perfil"
_l.e13179 = "Lista de transacciones no gastadas"
_l.e13180 = "Su cuenta se ha creado correctamente"
_l.e13181 = "Se produjo un error al crear una oferta"
_l.e13182 = "Explorador de bloques"
_l.e13183 = "Centro de ayuda"
_l.e13184 = "Continuar registro"
_l.e13185 = "Conexión perdida"
_l.e13186 = "Editar perfil"
_l.e13187 = "Contenido"
_l.e13188 = "Guarde su clave criptográfica privada, que reemplaza el nombre de usuario y la contraseña de las redes sociales centralizadas"
_l.e13189 = "¡Cerrar sesión y perder mi clave para siempre!"
_l.e13190 = "Tema de "+appname+""
_l.e13191 = "Seleccionar tema"
_l.uiScaleSetting = "Escala de la interfaz"
_l.uiScaleSettingTitle = "Seleccionar escala"
_l.e13192 = "Nivel"
_l.e13193 = "Bono"
_l.e13194 = "Reputación y recompensas"
_l.e13195 = "Restricciones"
_l.e13196 = "Esto podéis tardar"
_l.e13197 = "Consigue Poketcoins"
_l.e13198 = "Tiempo estimado de espera"
_l.e13199 = "Únase a "+appname+" ahora"

_l.e13200 = "Regresar a "+appname+""
_l.e13201 = "Unirse a la prueba beta"
_l.e13202 = "La beta de "+appname+" comenzará el 24 de enero."
_l.e13203 = "Gracias por unirse a la lista de distribución pruebas beta de "+appname+". Usar "+appname+" no es necesariamente, pero usaremos este correo electrónico para enviar sus encuestas para mejorar la plataforma. Gracias por ayudar en formar el futuro de Internet."
_l.e13204 = "Dirección para recibir Poketcoins"
_l.e13205 = "Opciones"
_l.e13206 = "Monto recibido"
_l.e13207 = "Importe de envío"
_l.e13208 = "Disponible"
_l.e13209 = "Lista de financiación colectiva"
_l.e13210 = "Nuevo contrato"
_l.e13211 = "Copiar enlace y compartir"
_l.amount = "Cantidad"
_l.label = "Firma"
_l.message = "Mensaje"
_l.copylink = "Copiar enlace"
_l.e13211 = "Por favor complete estos campos"
_l.e13212 = "Crear código QR"
_l.e13213 = "Dirección del destinatario"
_l.process = "Proceso"
_l.source = "Fuente"
_l.yourmessage = "Su mensaje"
_l.e13214 = "Número de Poketcoins"
_l.currency = "Moneda"


_l.e13215 = "Seleccionar moneda"
_l.e13216 = "Moneda actual"
_l.e13217 = "Se agotó el tiempo de esta transacción."
_l.e13218 = "Esperando confirmaciones de blockchain"
_l.e13219 = "Enviarle Poketcoins"
_l.e13220 = "Poketcoins entregados"
_l.errorreload = "Se produjo un error. Vuelva a cargar la página y vuelva a intentarlo"
_l.e13221 = "¿Está seguro de que desea eliminar la información sobre esta transacción? No es posible detener transacción "
_l.e13222 = "Descargar Desktop App -es la forma más resistente a la censura de usar "+appname+". Incluso si los sitios web están cerrados, la aplicación funcionará directamente a través de nodos "
_l.e13223 = "Descargar "+appname+" para Windows"
_l.e132232 = "Descargar "+appname+" para macOS"
_l.e13224 = "Descargar "+appname+" para Linux"
_l.e13225 = "Node "+appname+""
_l.e13226 = "Descargar node"
_l.e13227 = "Descargar el node "+appname+" para Windows"
_l.e13228 = "Descargar el node "+appname+" para Linux"
_l.e13229 = "Clave privada no válida"
_l.e13230 = "Error de conexión"

_l.e13231 = "Conexión se cortó "
_l.e13232 = "No se podéis conectar al node"
_l.e13233 = "Este comentario fue eliminado"
_l.e13234 = "Opreturn error/41"
_l.e13235 = "No podéiss estimar el comentario dos veces"
_l.e13236 = "Este comentario fue eliminado"
_l.e13237 = "No podéiss calificarse "
_l.e13238 = "Error al enviar el comentario. Espera y vuelve a intentarlo / 37 "
_l.e13239 = "Error al enviar comentario / 35"
_l.e13240 = "El comentario al que estás intentando responder ha sido eliminado por el usuario"
_l.e13241 = "Este comentario es demasiado largo, porfavor divídalo en varios"
_l.e13242 = "Esta persona te bloqueó, no podéiss comentar sus publicaciones"
_l.e13243 = "Ha alcanzado su límite de calificación para comentarios en el período de 24 horas"
_l.e13244 = "Ha alcanzado el límite de edición los comentarios en 24 horas"
_l.e13245 = "Ha alcanzado el límite de publicación los comentarios en 24 horas"
_l.e13246 = "Estás intentando editar la publicación de otra persona"
_l.e13247 = "Ha alcanzado su límite de edición 5 publicaciones en 24 horas"
_l.e13248 = "Solo podéis editar publicaciones o comentarios una vez de cada bloque en el blockchain. Espera un minuto y vuelve a intentarlo "
_l.e13249 = "No podéis encerrarse, afortunadamente"
_l.e13250 = "Ya bloqueaste a este usuario"
_l.e13251 = "No ha bloqueado a este usuario"
_l.e13252 = "Transacción esta mal formada"
_l.e13253 = "No podéis vincularse a sí mismo"
_l.e13254 = "El nombre de usuario es demasiado largo"
_l.e13255 = "Otro usuario ya está usando este nombre"
_l.e13256 = "Esta publicación es demasiado larga, divídala en varias."
_l.e13257 = "Su reputación de "+appname+" aún no le permite registrar quejas"
_l.e13258 = "Ha alcanzado su límite de quejas en 24 horas"

_l.e13259 = "No podéis denunciar su publicación"
_l.e13260 = "Ya ha presentado una queja contra este usuario."
_l.e13261 = "Guardar clave"
_l.e13262 = "Más tarde"
_l.e13263 = "Suscríbete y incluyes las notificaciones de nuevas publicaciones de este usuario"
_l.e13264 = "Suscribirse sin notificación"
_l.e13265 = "Este nombre ya no está disponible, elija otro"
_l.e13266 = "Tema claro"
_l.e13267 = "Tema oscuro"
_l.e13268 = "Coinstake win"
_l.e13269 = "Transacción recibida"
_l.e13270 = "Nueva evaluación"
_l.e13271 = "Nuevo comentario"
_l.downvote = "Valoración negativa"
_l.e13272 = "Nueva respuesta al comentario"
_l.e13273 = "Nuevo suscriptor"
_l.e13274 = "Usuario liberado"
_l.e13275 = "Calificación del comentario"
_l.e13276 = "Mostrar los videos incrustados"
_l.e13277 = "Reproducción automática de video"
_l.e13278 = "Iniciar PocketNet automáticamente"
_l.e13279 = "Chat"
_l.e13280 = "Etiquetas"
_l.e13281 = "Últimos comentarios"
_l.e13282 = "Token de bot de Telegram"
_l.e13283 = "Publicar desde el canal de Telegram"
_l.e13284 = "Agregar bot al chat y seleccionar"
_l.e13285 = "Preguntalo antes de publicar desde Telegram"
_l.e13286 = "Preguntar antes de enviar a Telegram"
_l.e13287 = "Enviar al canal de telegramas"
_l.video = "Video"
_l.audio = "Audio"
_l.e13288 = "Widgets de la página de inicio"
_l.e13289 = "Integración de Telegram"

_l.system = "Sistema"
_l.e13290 = "Le gustaría suscribirse"
_l.e13291 = "¿Está seguro de que desea enviar un mensaje a Telegram?"
_l.send = "Enviar"
_l.e13292 = "Ya tiene un node en este host"
_l.e13293 = "Error interno"
_l.e13294 = "Usar la base de datos PGSQL"
_l.e13295 = "DB Host"
_l.e13296 = "DB Puerto"
_l.e13297 = "DB Max"
_l.e13298 = "DB Idle Timeout, ms"
_l.e13298 = "DB Nombre"
_l.e13300 = "DB Usuario"
_l.e13031 = "DB Contraseña"
_l.e13302 = "Servidor Proxy en"
_l.e13303 = "Puerto del servidor proxy https"
_l.e13304 = "Puerto de servidor proxy wss"
_l.e13305 = "Servidor SSL Key, pem"
_l.e13306 = "Servidor SSL Cert, pem"
_l.e13307 = "Servidor SSL Frase"
_l.e13308 = "Firebase admin SDK"
_l.e13309 = "Su Dirección de Grúa"
_l.e13310 = "Captcha Habilitar"
_l.e13311 = "Ip limiter enable"
_l.e13312 = "Servidor"
_l.e13313 = "Data Base, PG sql"
_l.e13314 = "Firebase"
_l.e13315 = "Other"
_l.e13316 = "Permitir"
_l.e13317 = "Ruta binaria"
_l.e13318 = "Ruta de configuración"
_l.e13319 = "Ruta de datos"
_l.e13320 = "Dirección de Apuesta"
_l.e13321 = "Importar la dirección de la cuenta al nodo para el apilamiento"
_l.e13322 = "Estado"
_l.e13323 = "Direcciones de apuestas"
_l.e13324 = "Último Bloque"
_l.control = "Control"
_l.setup = "Configuración"
_l.e13325 = "¿Está seguro de que desea enviar mensajes desde Telegram?"
_l.e13326 = "Publicar"
_l.e13327 = "¿Está seguro de que desea usar el proxy nuevamente?"
_l.e13328 = "¡Apreciamos su comentario!"
_l.e13329 = "Nueva calificación de comentario"
_l.e13330 = "compartió su publicación:"
_l.e13331 = "compartió su publicación:"
_l.e13332 = "hizo una nueva publicación:"
_l.e13333 = "Transacción entrante"
_l.e13334 = "Ganaste"
_l.e13335 = "Pocketcoin para sus últimas acciones"
_l.e13336 = "con el mensaje:"
_l.e13337 = "comentó en su publicación:"
_l.e13338 = "respondió a su comentario:"
_l.reply = "Responder"
_l.e13339 = "Rescataste a alguien del internet censurado. ¡Algunos poketcoins están en camino!"
_l.e13340 = "¡Felicitamos!"
_l.e13341 = "te seguí"
// <%=e("process")%> <%=e("e13037").toUpperCase()%> <%=e("")%> self.app.localization.e("e13350")
_l.e13342 = "Nuevo suscriptor"
_l.e13343 = "calificó su publicación"
_l.e13344 = "Nueva calificación"
_l.e13345 = "te envió un mensaje"
_l.e13346 = "Publicaciones nuevas"
_l.e13347 = "Hay actualizaciones de "+appname+" disponibles. ¿Desea aplicar las actualizaciones ahora?"
_l.e13348 = "No, más tarde"
_l.e13349 = "Hay actualizaciones de "+appname+" disponibles. ¿Ir a la página para descargar una nueva versión?"
_l.e13350 = "Únase a "+appname+" y gane Pocketcoin ahora"
_l.e13351 = "Escribe porfavor brevemente sobre ti para hacerles saber a los usuarios que deberían seguirte"
_l.e13351 = "Charla de "+appname+""
_l.e13352 = "No tienes permiso para chatear"

_l.downloaded = "Descargado";
_l.downloadedEmpty = "Los mensajes descargados se mostrarán aquí";
_l.downloadVideo = "Descargar vídeo";
_l.selectQuality = "Seleccione la calidad:";
_l.downloadedVideos = "Vídeos descargados";
_l.deleteAllDownloadedVideos = "Eliminar todos los vídeos descargados";
_l.deleteVideoDialog = "Estás seguro de que quieres borrar este vídeo?";
_l.deleteAllVideoDialog = "Estás seguro de que quieres borrar todos los vídeos?";
_l.videosDeleted = "Vídeos eliminados!";
_l.noDownloadedVideos = "No hay vídeos descargados";

_l.buy = 'Comprar';

// Uploadpeertube component
_l.settingsTranscoding = "Al subir el video lo transcodifico en mi dispositivo"
_l.videoTranscodingNotOptimal = "El resultado del procesador no es óptimo. Continuando con el video original"
_l.videoTranscodingError = "Se ha producido un error al procesar su vídeo"
_l.videoUploadingFinish = "Terminando de subir el archivo..."
_l.uploadNewVideo = "Subir un nuevo Pocketvídeo"
_l.selectVideoFile = "Seleccione el archivo de vídeo"
_l.uploadVideoProgress_binaries = "Preparando las bibliotecas:"
_l.uploadVideoProgress_processing = "Procesando el video:"
_l.uploadVideoProgress_uploading = "Cargando el video:"
_l.uploadCanceled = "Carga cancelada"

_l.pleaseTryAgain = "Algo está incorrecto. Por favor, inténtelo de nuevo"

_l.buy = 'Comprar';

_l.usetor = "Conexión a través de la red Tor"

_l.lowstar1 = "El equipo de Bastyon está implementando una moratoria temporal en las calificaciones de 1 y 2 estrellas, excepto el contenido prohibido. El contenido prohibido es:"
_l.lowstar_reason_1 = "Erótico/Porno"
_l.lowstar_reason_2 = "Explotación de menores"
_l.lowstar_reason_3 = "Amenaza directa de violencia"
_l.lowstar_reason_4 = "Drogas ilegales"
_l.lowstar2 = "Por favor, no use calificaciones de 1 y 2 estrellas por otras razones. Después de que se publique la nueva moderación a mediados. Puede que pueda usar calificaciones bajas por otras razones"
_l.lowstaragree = "Confirmo que esta publicación contiene uno de los cuatro tipos de contenido prohibido"

_l.androidPopupTitle = "Obtenga información sin censura en la aplicación móvil Bastyon"
_l.androidPopupAgree = "Cambiar a la aplicación"
_l.androidPopupDisagree = "Ahora no"

_l.desktopPopupTitle = "Obtenga información sin censura en la aplicación de escritorio Bastyon"
_l.desktopPopupAgree = "Descargar la aplicación"
_l.desktopPopupDisagree = "Ahora no"


_l.profanity_tag = 'blasfemia'

_l.saved = "Guardado"
_l.savePost = "Guardar puesto"
_l.postsaved = "Puesto guardado"
_l.deleteSavedPost = "Borrar post guardado"
_l.doYouDownloadVideo = "Quieres descargar el vídeo en tu dispositivo?"
_l.gotosaved2 = "Ir a guardado"
_l.yes = "Sí"
_l.no = "No"