if(typeof loclib == "undefined" || !loclib)
	loclib = {};

	loclib.es = {};

	var appname = window.pocketnetproject || "Pocketnet"

var ____loclib = loclib.es;

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

____loclib.id0 = "Iniciar sesión en su cuenta";
____loclib.id1 = "Si estas registrado en el sistema, inicie sesión"
____loclib.loadqrcode = "Crear QR código"
____loclib.stay = "Quedarse en sistema"
____loclib.signin = "Entrar"
____loclib.orcreate = "o crear nueva cuenta"
____loclib.createnew = "Crear nueva cuenta"
____loclib.staysafe = "No es seguro. ¿Quieres continuar?"
____loclib.or = "o";

// Register a New Account
____loclib.id71 = "Crear nueva cuenta"
____loclib.id72 = "¿Ya tienes cuenta?, Entrar"

____loclib.rtip1 = "Nesesariamente escribe su clave privada"
____loclib.rtip2 = function(){
	var h = "A continuación, se generará su clave privada. Grabarlo y guardar el código QR en su dispositivo. Y no los pierdas. No almacenamos sus datos personales. ¡La clave privada no se puede recuperar!"
	return h
}

____loclib.generatepkey = "Crear clave privada"
____loclib.rtip3 = "Anote esta clave de Inicio de sesión y guarde el código QR. No almacenamos sus datos personales. ¡La clave privada no se puede recuperar!";
____loclib.saveqrcode = "Guardar QR código"
____loclib.copyprivkey = "Copiar la clave privada"
____loclib.rcontinue = "Continuar"
____loclib.idle = "Retraso por tiempo corto"
____loclib.congratulations = "¡Felicidades! Usted <span class='pnlabel'>"+appname+"</span>"
____loclib.creatingpreloader = "Cuenta en proceso de creación"
____loclib.removepaste = "Hemos eliminado la posibilidad de insertar en este formulario."
____loclib.filedamaged = "El archivo está corrupto"
____loclib.keysnotmatch = "La clave generada y la que ingresó no coinciden"
____loclib.confirmkey = "Imprima su clave privada aquí"
____loclib.successfullycopied = "La clave fue copiado en el portapapeles"
____loclib.urlsuccesscopied = "Enlace se copió correctamente"
____loclib.confirmkeyLabel = "Confirme su clave privada. Escriba la clave en el campo o <b> cargue el código QR </b>"
____loclib.repeatetocreate = "Volver a crear la clave"
____loclib.confirmcreate = "Crear cuenta"

//user activation

____loclib.useractivation = "Activación del usuario"
____loclib.wesentmoney = "Le hemos enviado unas criptomonedas para continuar con registración, espere hasta que sean acreditados"
____loclib.wesentmoneym = "Ya hemos enviado unas criptomonedas para registración"


____loclib.wesentmoneydelay = "El proceso está tardando más tiempo de lo habitual, espere más"
____loclib.funetworkproblems = "Hay algunos problemas de conexión. Vuelva a intentarlo más tarde"


____loclib.pleasewait = "Por favor espere";
____loclib.next = "Siguiente";
____loclib.welcometopocketnet = "Bienvenido a "+appname+"";
____loclib.continue = "Continuar";


//user page

____loclib.rstate = "Estado";
____loclib.rprofile = "Perfil";
____loclib.rsettings = "Configuración";
____loclib.rwallet = "Monedero";
____loclib.raccounts = "Cuentas";
____loclib.rsystem = "Sistema";
____loclib.rconnection = "Conexión";
____loclib.pnetAddress = "Dirección "+appname+"";
____loclib.profile = "Perfil";
____loclib.signout = "Cerrar sesión";

//send



//send

____loclib.postlabel = "Donación por vuestra publicacion"
____loclib.donationlabel = "Donación"
____loclib.donationwel = "Si desea agradecer al autor de la publicación, puede utilizar la transacción "+appname+"";
____loclib.donationwela = "Enviar por "+appname+"";
____loclib.donationwelan = "También se pueden utilizar otros sistemas de criptomonedas";
____loclib.successfullycopiedaddress = "La dirección se copió correctamente";


//wallet

____loclib.wrecieve = "Recibir criptomonedas a la dirección";
____loclib.wcopyshare = "Copiar y compartir la dirección";
____loclib.wqrcode = "Código QR";
____loclib.wcopeaddress = "Copiar dirección";
____loclib.wcreatelink = "O crear un enlace para hacer el pago";
____loclib.required = "Requerido";
____loclib.wgetlink = "Recibir enlace";
____loclib.waddresses = "Direcciones";
____loclib.waddress = "Dirección";
____loclib.wbalance = "Billetera";
____loclib.wpercente = "Porcentaje";
____loclib.waddaddress = "Abrir nueva dirección";
____loclib.wrecieve = "Recibir";
____loclib.wrecieveon = "Recibir en";
____loclib.wcopyshareorcreate = "Copia y comparte la dirección o crea un enlace para el pago";
____loclib.wdgetlink = "Obtener enlace";
____loclib.wdqrcode = "Código QR";
____loclib.wdcopyaddress = "Copiar dirección";
____loclib.wdpleasefill = "Por favor complete los campos requeridos";
____loclib.wduseqr = "Utilice este código QR para recibir criptomonedas en esta dirección";
____loclib.wdaddress = "Dirección";
____loclib.wdamount = "Cantidad";
____loclib.wdlabel = "Etiqueta";
____loclib.wdmessage = "Mensaje";
____loclib.wsend = "Enviar";
____loclib.calcfeesandsend = "Calcular comisión y enviar";
____loclib.wstrfees = "Сomisión de transacción";
____loclib.wsfees = "Comisión";

____loclib.wssendto = "ENVIAR CRIPTOMONEDAS A";
____loclib.wssendb = "ENVIAR";

____loclib.tacaddress = "Dirección de cuenta";
____loclib.twallet = "Monedero";
____loclib.twalletaddresses = "Direccione del monedero";
____loclib.tTotal = "Total";
____loclib.wsselect = " Seleccionar fuente";
____loclib.wsenter = "Ingresa una dirección o selecciona";
____loclib.wsreciever = "Dirección del destinatario";
____loclib.wsamount = "Cantidad";
____loclib.wsamountof = " Cantidad de transacción ";
____loclib.wsincludefees = "Incluir comisión en la cantidad";
____loclib.wsrecieverpay = "Paga el remitente";
____loclib.wssenderpay = "El beneficiario paga";
____loclib.wdselectfrom = "Seleccionar";

____loclib.wdenteramount = "Ingresa la cantidad";
____loclib.wdmessageplaceholder = "¿Para qué es esta transacción?";
____loclib.wrenteraddress = "Introduzca la dirección";
____loclib.wrenteraddressselect = "Ingrese una dirección o seleccione";
____loclib.wreturntoeallet = "VOLVER A BILLETERA";
____loclib.linkCreated = "ENLACE CREADO";
____loclib.waddresswascop = "La dirección se copió en el portapapeles";
____loclib.wqrcodecreated = "CÓDIGO QR CREADO";
____loclib.wlinkcreating = "CREAR UN ENLACE";
____loclib.wqrcodecreating = "CREAR CÓDIGO QR";
____loclib.wdoptions = "configuración";
____loclib.wssuccessfully = "La transacción se envió correctamente";
____loclib.wscalculatefees = "CALCULAR COMISIÓN";
____loclib.wsaddressnotv = "La dirección fue introducida incorrecto";


//user profile
____loclib.uaddaddressdona = " Añadir la dirección para donaciones";
____loclib.uaddaddressdonaplace = "Introduzca la dirección";
____loclib.uchangeicon = "Cambiar icono de usuario";
____loclib.utip1 = "Debeis introducir el nombre de usuario antes de usar "+appname+"";
____loclib.utip2 = "Queda el último paso";
____loclib.upicset = "Establecer icono de usuario";
____loclib.upic = "Icono de usuario";
____loclib.uuserinfo = "Información del usuario";
____loclib.usave = "Guardar";
____loclib.ucancel = "Cancelar";
____loclib.uwaitb = "Esperando confirmación para guardar información";
____loclib.uchanges = " No habeis introducido ningún cambio";
____loclib.uchangesvalid = "Debeis introducir el nombre de usuario";
____loclib.uname = "Nombre";
____loclib.unickname = "Apellido";
____loclib.ulanguage = "Idioma";
____loclib.uabout = "Acerca de mí";
____loclib.uwebsite = "Página web";
____loclib.uaddresesd = "Dirección de donación";
____loclib.usavechanges = "¿Quieres guardar sus cambios?";


//ustate
____loclib.sreps = "Reputación y restricciones";
____loclib.sdisconnected = "Desconectado al node";
____loclib.suseractivation = "Activación del usuario";
____loclib.sprofile = "Perfil";
____loclib.spc = "Número de publicaciones";
____loclib.ssc = "Número de estrellas";
____loclib.ccc = "Número de comentarios";
____loclib.crc = "Número de valoraciones de comentarios";
____loclib.stp = "Periodo trial";
____loclib.srep = "Reputación";




//accounts
____loclib.aaddedacc = "Cuentas agregadas";
____loclib.acure = "Actual";
____loclib.aaddacc = "Agregar cuenta";
____loclib.ascheduler = "Planificador de tareas";
____loclib.aused = "Esta dirección ya está en uso en este dispositivo";



//author
____loclib.sub = "Suscribirse";
____loclib.unsub = "Cancelar suscripción";
____loclib.joined = "Se unió a la comunidad";
____loclib.shares = "PUBLICACIONES";
____loclib.uposts = "PUBLICACIONES";
____loclib.myuposts = "MIS PUBLICACIONES";
____loclib.followers = "SUSCRIBTORES";
____loclib.following = "SUSCRIPCIONES";
____loclib.settings = "GESTIÓN";
____loclib.anofollowers = "Este usuario todavía no tiene suscribtores";
____loclib.aynofollowers = "Todavía no teneis suscribtores";
____loclib.anofollowing = "este usuario no esta suscrito a nadie";
____loclib.aynofollowing = " No estais suscrito a nadie ";
//lenta
____loclib.lloadmore = "¡Cargar más publicaciones!";
____loclib.lloadprev = "Cargar contenido nuevo"
____loclib.lend = "Fin de la cinta";
____loclib.zerop = "Este autor aún no tiene publicaciones";
____loclib.zeroy = "Aún no teneis publicaciones, ¡comparteis algo!";
____loclib.llogin = " Antes de continuar, debeis iniciar sesión ";
____loclib.lcomlaindialog = "¿Estais seguro de que deseais quejarse sobre esta publicación?";
____loclib.lunsubscribe = "¿Estais seguro de que deseais cancelar la suscripción de este usuario?";
____loclib.lprivatepublic = "¿Le gustaría hacer una suscripción pública o privada?";
____loclib.lprivate = "Privado";
____loclib.lpublic = "Público";
//share
____loclib.newShare = "Nueva publicación";
____loclib.scaption = "Título";
____loclib.whatsnew = "¿Qué hay de nuevo?";
____loclib.saddlink = "Agregar un enlace en pagina web o en video";
____loclib.saddimages = "Adjuntar imágenes";
____loclib.sarticle = "Escribir artículo";
____loclib.stelegram = "Enviar a Telegram"
____loclib.stimes = "Eliminar publicación"
____loclib.snothing = "Nada";
____loclib.sposttime = "Publicar por hora";
____loclib.spostnow = "Publicar ahora";
____loclib.stimenotselected = "Hora no seleccionada";
____loclib.spost = "Publicar";
____loclib.sdate = "Fecha";
____loclib.stime = "Hora";
____loclib.snotags = "Agregar etiqueta";
____loclib.expandvideo = "Haga clic para expandir";
____loclib.emptymessage = "El mensaje está vacío";
____loclib.emptytags = "Por favor agregue etiquetas";
____loclib.emptyutxo = "No hay monedas en la dirección";
____loclib.networkerror = "Error de red";
____loclib.maximages = "Se permite subir un máximo de 10 imágenes";
____loclib.sharenow = "¿Quiere publicar este contenido ahora?";
____loclib.pastdate = "Se especifica el tiempo transcurrido";
____loclib.timenotselected = "Hora no seleccionada";
____loclib.addtags = "Agregar etiquetas";
____loclib.tnews = "noticias";
____loclib.timages = "imágenes";
____loclib.tvideos = "video";
____loclib.tmarket = "tienda";
____loclib.tsport = "deporte";


//menu
____loclib.signinmenu = "Iniciar sesión";
____loclib.signupmenu = "Registrarse";
____loclib.aboutmenu = "saber más";

//footer
____loclib.aboutus = "Acerca de nosotros";



// Dialog Box Options
____loclib.daccept = "Confirmar";
____loclib.dcancel = "Cancelar";
____loclib.dyes = "Sí";
____loclib.dno = "No";
____loclib.dsa = "No volver a mostrar";


// Messages

____loclib.coinbaseSuccess = function (v) {
return "<b> ¡Felicitaciones! </b>" + "Has ganado <b>" + v + "POC </b>"
}
____loclib.coinbaseSuccesspost = function (v) {
return "Felicidades, recibisteis" + v + "¡Bolsa de criptomonedas por buestras últimas publicaciones!"
}
____loclib.coinbaseSuccesscomment = function (v) {
return "Felicitaciones, recibisteis " + v + "¡ Bolsa de criptomonedas por buestras últimas comentarios!"
}
____loclib.userSent = function (v) {
return "te envió <b>" + v + "POC </b>"
}



____loclib.refferalUserMessage = "Felicidades! Rescataste a alguien de la red censurada."


____loclib.subscribeUserMessage = "suscrito a usted"
____loclib.unsubscribeUserMessage = "anulado su suscripción"
____loclib.gotoprofileMessage = "ir al perfil"
____loclib.upvoteShareMessage = "le dio una calificación a vuestra publicación"


// Errors

____loclib.error = "Error";
____loclib.checkScoreError = "Debe completar su perfil antes de usar "+appname+". ¿Le gustaría hacer esto ahora?";
____loclib.checkScoreErrorLight = "Cuenta no activada";
____loclib.timestamperror = "El tiempo en la aplicación y en el node no coincide";
____loclib.postLimitLight = "Ha alcanzado el límite de publicaciones";
____loclib.scoreLimitLight = "Ha alcanzado su límite de calificación";
____loclib.doubleLimitLight = "Ya calificó esta publicación";

____loclib.SelfSubscribeError = "Imposible suscribirme";
____loclib.DoubleSubscribeError = "Ya estasis  suscrito a esta cuenta. Actualiza la página";
____loclib.InvalideSubscribeError = "Ocurrió un error al darse de baja de la cuenta. Actualizar la página";
____loclib.ChangeInfoLimitError = "Ha alcanzado el límite para cambiar información sobre usted. Inténtelo más tarde";
____loclib.SelfScoreError = "No podeis calificarse";

____loclib.networkerror = "Surgieron nuevas problemas con la comunicación entre el node y su cuenta";

____loclib.canSpendError = "No teneis dinero desbloqueado. Para continuar hay que esperar";
____loclib.noMoneyError = "No teneis dinero";

____loclib.waitConf = "Espera  porfavor mientras que transacciones anteriores procesan";
____loclib.postWaitConf = "La publicación está esperando confirmación";


// notifications
____loclib.ntnow = "Ahora"
____loclib.ntlasthour = "Hace una hora"
____loclib.nttoday = "Hoy"
____loclib.ntmounth = "Este mes"
____loclib.ntearlier = "Hace tiempo"
____loclib.nodeWalletAdd = "Agregar una dirección podéis llevar algún tiempo. ¿Seguir?"
____loclib.nodeEnableNoteHeader = "Note"
____loclib.nodeEnableNote = "Un node "+appname+" en funcionamiento podéis ocupar hasta 5 GB de RAM. Asegúrese de tener suficiente memoria para esto. ¡Feliz steking!"
/// 1301
____loclib.address = "Dirección"
____loclib.privatekey = "Clave privada"
____loclib.qrcode = "Código QR"
____loclib.addaccount = "Agregar cuenta"
____loclib.entermnimo = "Introduzca mnemofrase o clave privada"
____loclib.add = " Añadir "
____loclib.e13011 = "Ahora procedereis con el registro Después de instalar "+appname+" Desktop"
____loclib.e13012 = "Si "+appname+" no comienza a cargarse, haga clic para descargarlo"
____loclib.e13013 = "Ingrese el título de imagen (opcional)"
____loclib.e13014 = "El formato de este archivo no no está soportado:"
____loclib.e13015 = "Este archivo es demasiado grande:"
____loclib.e13016 = "Insertas su referencia de YouTube, Vimeo y pulse Entrar"
____loclib.e13017 = "Cargando en blockchain"
____loclib.e13018 = "¿Está seguro de que desea eliminar este artículo?"
____loclib.e13019 = "Nuevo"
____loclib.e13020 = "Escribir artículo nuevo"
____loclib.youarefollowing = "Estás suscrito"
____loclib.follow = "Seguir"
____loclib.blocked = "Bloqueado"
____loclib.e13021 = "Mostrar más"
____loclib.blockuser = "Bloquear usuario"
____loclib.unblockuser = "Desbloquear usuario"
____loclib.e13022 = "¿Está seguro de que desea cancelar la suscripción de este usuario?"
____loclib.unfollow = "Dejar de seguir"
____loclib.unblock = "Desbloquear"
____loclib.share = "Compartir"
____loclib.info = "Información"
____loclib.e13023 = "¿Está seguro de que desea desbloquear a este usuario?"
____loclib.e13024 = "Su clave privada parar entrar"
____loclib.e13025 = "Crear nueva cuenta"
____loclib.e13026 = "Únase a "+appname+""
____loclib.e13027 = "Permanecer en el sistema"
____loclib.e13028 = "la clave privada no es correcta"
____loclib.e13029 = "El mensaje está vacío"
____loclib.e13030 = "Los comentarios podéisn tener hasta 1000 caracteres."
____loclib.e13031 = "Comparte este comentario"
____loclib.e13032 = "¿Está seguro de que desea eliminar su comentario?"
____loclib.e13033 = "Comentario eliminado"
____loclib.e13034 = "Sí"
____loclib.e13035 = "No, cancelar"
____loclib.hide = "Ocultar"
____loclib.e13036 = "Mostrar comentarios anteriores"
____loclib.e13037 = "Respuestas"
____loclib.remove = "Eliminar"
____loclib.e13038 = "Comentas y ganas la reputación"
____loclib.e13039 = "Comentas y ganas la reputación"
____loclib.e13040 = "No tiene permisos para comentar"
____loclib.complain = "Quejarse"
____loclib.next = "Siguiente"
____loclib.post = "Publicar"
____loclib.e13041 = "Conectando a "+appname+""
____loclib.e13042 = "Servidor proxy "+appname+""
____loclib.e13043 = "Node "+appname+""
____loclib.e13044 = "Agregar node"
____loclib.e13045 = "No se encontraron nodes"
____loclib.e13046 = "Dirección"
____loclib.e13047 = "WS"
____loclib.e13048 = "Nombre"
____loclib.e13049 = "Estado"
____loclib.e13050 = " Servidor proxy no se ha encontrado"
____loclib.e13051 = "No usar servidor proxy"
____loclib.e13052 = "No se podéis conectar al servidor proxy"
____loclib.e13053 = "No se podéis conectar al node"
____loclib.e13054 = "Agregar servidor proxy"
____loclib.e13055 = "Editar servidor proxy"
____loclib.save = "Guardar"
____loclib.e13056 = "Nodes de host"
____loclib.close = "Cerrar"
____loclib.e13057 = "Por favor complete todos los campos"
____loclib.e13058 = "Ya tiene este proxy en la lista"
____loclib.delete = "Eliminar"
____loclib.e13059 = "¿Está seguro de que desea eliminar este proxy de la lista?"
____loclib.e13060 = "Lista de proxy"
____loclib.e13061 = "¿Realmente desea dejar de usar el proxy y cambiar a una conexión insegura (conexión HTTP)?"
____loclib.e13062 = "Editar node"
____loclib.onproxy = "En memoria proxy"
____loclib.locally = "En la memoria del dispositivo"
____loclib.node
host = "Nodes de host"
____loclib.e13063 = "Puerto RPC"
____loclib.e13064 = "Puerto WS"
____loclib.e13065 = "Nombre de node"
____loclib.e13066 = "Introduzca un nombre de node"
____loclib.e13067 = "Inicio de sesión de RPC"
____loclib.e13068 = "Iniciar sesión para autorización de PRC"
____loclib.e13069 = "Contraseña RPC"
____loclib.e13070 = "Contraseña para autorización PRC"
____loclib.e13071 = "Por favor complete todos los campos"
____loclib.e13072 = "¿Está seguro de que desea eliminar este node de la lista?"
____loclib.e13073 = "¿Realmente desea detener el proxy y cambiar a una conexión insegura (conexión HTTP)?"
____loclib.notselected = "No seleccionado"
____loclib.donation = "Donación"
____loclib.e13074 = "Fondos pendientes. La dirección será válida"
____loclib.sminutes = "minutos"
____loclib.e13075 = "El tiempo de esta operación se termino"
____loclib.reactivate = "Reactivar"
____loclib.e13076 = "Escanee este código para enviar"
____loclib.back = "Atrás"
____loclib.e13077 = "Agregue su perfil a la lista de donantes"
____loclib.e13078 = "¿Por qué pedimos donaciones?"
____loclib.e13079 = "Hemos pasado más de 14 meses en tiempo libre de trabajos de tiempo completo llevando "+appname+" a la gente. Además de tiempo y esfuerzo, hemos puesto nuestro propio dinero para ayudar a lanzar la plataforma. Ahora necesitamos que la comunidad dé un paso adelante y nos ayude con el crecimiento."
____loclib.e13080 = "¿Cómo se utilizarán los fondos?"
____loclib.e13081 = "Los fondos se utilizarán para comprar publicidad y contratar a algunos expertos en temas específicos para hacer que "+appname+" sea aún más seguro. El equipo de desarrollo actual no recibirá ninguna de estas donaciones. Siempre que sea posible, publicaremos aquí cómo usamos los fondos."
____loclib.e13082 = "Lo que obtendrás por tu donación además de saber que apoyaste la libertad:"
____loclib.e13083 = "Como muestra de nuestra gratitud por la donación, recibirá un regalo en cierta cantidad de Pocketcoin"
____loclib.e13084 = "Además, cuando construimos chat grupal, usted será miembro de un grupo especial de donantes que tendrán acceso directo al equipo de "+appname+", incluso a medida que la plataforma crezca"
____loclib.e13085 = "El enlace a su perfil de "+appname+" se enumerará a continuación, llevando a más personas a sus publicaciones (a menos que nos pida que no lo hagamos)"
____loclib.e13086 = "Soporte Web Descentralizado Ahora"
____loclib.e13087 = "Bitcoin, Litecoin, Monero"
____loclib.e13088 = "Miembros de "+appname+" que han donado para apoyar a "+appname+""
____loclib.thankyou = "¡Gracias!"
____loclib.e13089 = "Si desea que agreguemos su perfil de "+appname+" a la lista de donantes, envíenos la información de su donación"
____loclib.e13090 = "Agregarme a la lista de donantes"
____loclib.e13091 = "O podéis enviarnos un correo electrónico a"
____loclib.e13092 = "con su dirección y monto"
____loclib.finish = "Finalizar"
____loclib.e13093 = "Seleccione un método de donación"
____loclib.e13094 = "Algo salió mal. Vuelva a cargar la página y vuelva a intentarlo de nuevo (error: 0001)"
____loclib.e13095 = "Gracias por apoyar nuestro trabajo por la libertad. Nos aseguraremos de que cada cento estara en cuenta."
____loclib.e13096 = "Ingrese el monto de la donación"
____loclib.e13097 = "Algo salió mal. Vuelva a cargar la página y vuelva a intentarlo (error: 0002)"
____loclib.e13098 = "Agregar un enlace a la pagina web externa o recurso"
____loclib.e13099 = "Cargar imágenes"
____loclib.e13100 = "Haga clic aquí para seleccionar archivos para cargar"
____loclib.e13101 = "o sueltas en este espacio"
____loclib.e13102 = "Agregar enlace a un sitio web externo"
____loclib.e13103 = "URL no es válido"
____loclib.e13104 = "No se permite cargar más de 6 imágenes"
____loclib.e13105 = "Gestión de nodes"
____loclib.e13106 = "Node "+appname+""
____loclib.e13107 = "El node se podéis controlar usando una aplicación de escritorio"
____loclib.e13108 = "No tiene conexión con interfaz proxy Electron"

____loclib.e13109 = "Ingrese las palabras de la imagen para recibir una bolsa de coinmonedas y continuar con el registro"
____loclib.e13110 = "Ingresar captcha"
____loclib.next = "Siguiente"
____loclib.refresh = "Actualizar"
____loclib.e13111 = "Agregue su dirección de correo electrónico para recibir las últimas actualizaciones de "+appname+""
____loclib.e13112 = "Introduzca su dirección de correo electrónico"
____loclib.e13113 = "Insertar dirección de correo electrónico"
____loclib.skip = "Saltar"
____loclib.e13114 = "Hubo una problema con su registro por una actividad extraña en su dirección IP."
____loclib.e13115 = "Envíenos un correo electrónico a"
____loclib.e13116 = "para recibir monedas y abrir su cuenta"
____loclib.e13117 = "Verificar saldo"
____loclib.joinnow = "Únete ahora"
____loclib.loading = "Cargando"
____loclib.e13118 = "Las letras se insertaron incorrectamente"
____loclib.e13119 = "Agregar correo electrónico y continuar"
____loclib.e13120 = "Aplicaciones"
____loclib.e13121 = "No se encontraron imágenes"
____loclib.e13122 = "últimos comentarios"

____loclib.e13123 = "Mostrar más publicaciones"
____loclib.e13124 = "¡Más publicaciones geniales de "+appname+"!"
____loclib.e13125 = "¡La sección de mejores publicaciones está vacía!"
____loclib.e13126 = "Aquí se mostrarán las publicaciones de las personas que sigues"
____loclib.e13127 = "Aquí se mostrarán las publicaciones de las personas que sigues"
____loclib.e13128 = "Aquí se mostrarán las publicaciones de las personas que sigues"
____loclib.registration = "Registro"
____loclib.editpost = "Editar publicación"
____loclib.removepost = "Eliminar publicación"


____loclib.reportpost = "Publicar repost"
____loclib.donate = "Donación"
____loclib.blockuser = "Bloquear usuario"
____loclib.more = "Más"
____loclib.showmore = "Mostrar más"
____loclib.e13129 = "Imágenes adjuntas"
____loclib.e13130 = "Editado"
____loclib.e13131 = "Has bloqueado a este usuario"
____loclib.e13132 = "apreciado"
____loclib.e13133 = "Compartir esto"
____loclib.e13134 = "Búsqueda en esta cadena no tiene resultados "
____loclib.e13135 = "El usuario no tiene clave privada"
____loclib.e13136 = "Cinta completa"
____loclib.e13137 = "Su cinta"
____loclib.e13138 = "Mejor"
____loclib.e13139 = "BUSCAR EN "+appname+""
____loclib.e13140 = "BUSCAR EN"
____loclib.notifications = "Notificaciones"
____loclib.showall = "Mostrar todo"
____loclib.e13141 = "No tienes notificaciones"

____loclib.recommendations = "Recomendaciones"
____loclib.e13142 = "Guardé mi clave, no me vuelvas a recordar esto"
____loclib.e13143 = "¡Importante!"
____loclib.e13144 = "Copiar"
____loclib.e13145 = "Guardar clave en el dispositivo"
____loclib.e13146 = "No hay más publicaciones"
____loclib.e13147 = "Compartir"
____loclib.e13148 = "¿Está seguro de que desea denunciar a esta publicación?"
____loclib.e13149 = "valoraciones de los usuarios"
____loclib.e13150 = "Calificación de publicación"
____loclib.e13151 = " Todavía nadie ha calificado esta publicación"
____loclib.e13152 = "Calificaciones de usuarios"
____loclib.e13153 = "Saltar y ir al sitio"
____loclib.e13154 = "Su información de registro"
____loclib.e13155 = "Para utilizar "+appname+", debe generar su propia clave criptográfica privada, que reemplaza el nombre de usuario y la contraseña de las redes sociales centralizadas"
____loclib.users = "Usuarios"
____loclib.userstx = "Usuario"
____loclib.user = "Usuario"
____loclib.postscount = "Número de publicaciones"
____loclib.about = "Acerca de nosotros"
____loclib.e13156 = "Para reducir los resultados"
____loclib.posts = "Publicaciones"
____loclib.e13157 = "Buscar por"
____loclib.e13158 = "no trajo ningún resultado"
____loclib.e13159 = "La frase de búsqueda está vacía"
____loclib.repost = "Volver a publicar"
____loclib.e13160 = "¡Hola Pocketeers!"

____loclib.e13161 = "Agrega etiquetas para tu publicación"
____loclib.e13162 = "Podéis ingresar hasta 5 etiquetas"
____loclib.e13163 = "No se han realizado cambios en esta publicación"
____loclib.e13164 = "Agrega algunas palabras para decirle a Pocketpeople sobre tu enlace. ¿De qué es eso? ¿Por qué es importante? ¿Cuál es tu opinión?"
____loclib.e13165 = "Su enlace de video no es válido. Inténtelo descargar URL de video correcto."
____loclib.e13166 = "Guardaste"
____loclib.e13167 = "persona de internet censurado"
____loclib.e13168 = "Gana Pocketcoin por cada registro de tu enlace"
____loclib.e13169 = "Enlace directo"
____loclib.copy = "Copiar"
____loclib.e13170 = "Habilitar llamada de registro de "+appname+""
____loclib.more = "Más"
____loclib.e13171 = "Buenas noticias. Me independicé de los monopolios de las redes sociales. Únase a mí en pocketnet.app para que podemos compartir y charlar independientemente de blockchain. Únase a mí aquí"
____loclib.e13172 = "Quiero compartir esto con usted desde la plataforma blockchain descentralizada de "+appname+". Espero que le resulte útil y si se registras, nos obtendremos un bono en la criptomoneda Pocketcoin!"
____loclib.e13173 = "Enviar por correo electrónico"
____loclib.e13174 = "Compartir en redes sociales"
____loclib.e13175 = "Etiquetas relevantes"
____loclib.e13176 = "Tipo de dirección"
____loclib.e13177 = "Cargar foto"

____loclib.requiredfields = "campos obligatorios"
____loclib.e13178 = "No asociado con su perfil"
____loclib.e13179 = "Lista de transacciones no gastadas"
____loclib.e13180 = "Su cuenta se ha creado correctamente"
____loclib.e13181 = "Se produjo un error al crear una oferta"
____loclib.e13182 = "Explorador de bloques"
____loclib.e13183 = "Centro de ayuda"
____loclib.e13184 = "Continuar registro"
____loclib.e13185 = "Conexión perdida"
____loclib.e13186 = "Editar perfil"
____loclib.e13187 = "Contenido"
____loclib.e13188 = "Guarde su clave criptográfica privada, que reemplaza el nombre de usuario y la contraseña de las redes sociales centralizadas"
____loclib.e13189 = "¡Cerrar sesión y perder mi clave para siempre!"
____loclib.e13190 = "Tema de "+appname+""
____loclib.e13191 = "Seleccionar tema"
____loclib.uiScaleSetting = "Escala de la interfaz"
____loclib.uiScaleSettingTitle = "Seleccionar escala"
____loclib.e13192 = "Nivel"
____loclib.e13193 = "Bono"
____loclib.e13194 = "Reputación y recompensas"
____loclib.e13195 = "Restricciones"
____loclib.e13196 = "Esto podéis tardar"
____loclib.e13197 = "Consigue Poketcoins"
____loclib.e13198 = "Tiempo estimado de espera"
____loclib.e13199 = "Únase a "+appname+" ahora"

____loclib.e13200 = "Regresar a "+appname+""
____loclib.e13201 = "Unirse a la prueba beta"
____loclib.e13202 = "La beta de "+appname+" comenzará el 24 de enero."
____loclib.e13203 = "Gracias por unirse a la lista de distribución pruebas beta de "+appname+". Usar "+appname+" no es necesariamente, pero usaremos este correo electrónico para enviar sus encuestas para mejorar la plataforma. Gracias por ayudar en formar el futuro de Internet."
____loclib.e13204 = "Dirección para recibir Poketcoins"
____loclib.e13205 = "Opciones"
____loclib.e13206 = "Monto recibido"
____loclib.e13207 = "Importe de envío"
____loclib.e13208 = "Disponible"
____loclib.e13209 = "Lista de financiación colectiva"
____loclib.e13210 = "Nuevo contrato"
____loclib.e13211 = "Copiar enlace y compartir"
____loclib.amount = "Cantidad"
____loclib.label = "Firma"
____loclib.message = "Mensaje"
____loclib.copylink = "Copiar enlace"
____loclib.e13211 = "Por favor complete estos campos"
____loclib.e13212 = "Crear código QR"
____loclib.e13213 = "Dirección del destinatario"
____loclib.process = "Proceso"
____loclib.source = "Fuente"
____loclib.yourmessage = "Su mensaje"
____loclib.e13214 = "Número de Poketcoins"
____loclib.currency = "Moneda"


____loclib.e13215 = "Seleccionar moneda"
____loclib.e13216 = "Moneda actual"
____loclib.e13217 = "Se agotó el tiempo de esta transacción."
____loclib.e13218 = "Esperando confirmaciones de blockchain"
____loclib.e13219 = "Enviarle Poketcoins"
____loclib.e13220 = "Poketcoins entregados"
____loclib.errorreload = "Se produjo un error. Vuelva a cargar la página y vuelva a intentarlo"
____loclib.e13221 = "¿Está seguro de que desea eliminar la información sobre esta transacción? No es posible detener transacción "
____loclib.e13222 = "Descargar Desktop App -es la forma más resistente a la censura de usar "+appname+". Incluso si los sitios web están cerrados, la aplicación funcionará directamente a través de nodos "
____loclib.e13223 = "Descargar "+appname+" para Windows"
____loclib.e132232 = "Descargar "+appname+" para macOS"
____loclib.e13224 = "Descargar "+appname+" para Linux"
____loclib.e13225 = "Node "+appname+""
____loclib.e13226 = "Descargar node"
____loclib.e13227 = "Descargar el node "+appname+" para Windows"
____loclib.e13228 = "Descargar el node "+appname+" para Linux"
____loclib.e13229 = "Clave privada no válida"
____loclib.e13230 = "Error de conexión"

____loclib.e13231 = "Conexión se cortó "
____loclib.e13232 = "No se podéis conectar al node"
____loclib.e13233 = "Este comentario fue eliminado"
____loclib.e13234 = "Opreturn error/41"
____loclib.e13235 = "No podéiss estimar el comentario dos veces"
____loclib.e13236 = "Este comentario fue eliminado"
____loclib.e13237 = "No podéiss calificarse "
____loclib.e13238 = "Error al enviar el comentario. Espera y vuelve a intentarlo / 37 "
____loclib.e13239 = "Error al enviar comentario / 35"
____loclib.e13240 = "El comentario al que estás intentando responder ha sido eliminado por el usuario"
____loclib.e13241 = "Este comentario es demasiado largo, porfavor divídalo en varios"
____loclib.e13242 = "Esta persona te bloqueó, no podéiss comentar sus publicaciones"
____loclib.e13243 = "Ha alcanzado su límite de calificación para comentarios en el período de 24 horas"
____loclib.e13244 = "Ha alcanzado el límite de edición los comentarios en 24 horas"
____loclib.e13245 = "Ha alcanzado el límite de publicación los comentarios en 24 horas"
____loclib.e13246 = "Estás intentando editar la publicación de otra persona"
____loclib.e13247 = "Ha alcanzado su límite de edición 5 publicaciones en 24 horas"
____loclib.e13248 = "Solo podéis editar publicaciones o comentarios una vez de cada bloque en el blockchain. Espera un minuto y vuelve a intentarlo "
____loclib.e13249 = "No podéis encerrarse, afortunadamente"
____loclib.e13250 = "Ya bloqueaste a este usuario"
____loclib.e13251 = "No ha bloqueado a este usuario"
____loclib.e13252 = "Transacción esta mal formada"
____loclib.e13253 = "No podéis vincularse a sí mismo"
____loclib.e13254 = "El nombre de usuario es demasiado largo"
____loclib.e13255 = "Otro usuario ya está usando este nombre"
____loclib.e13256 = "Esta publicación es demasiado larga, divídala en varias."
____loclib.e13257 = "Su reputación de "+appname+" aún no le permite registrar quejas"
____loclib.e13258 = "Ha alcanzado su límite de quejas en 24 horas"

____loclib.e13259 = "No podéis denunciar su publicación"
____loclib.e13260 = "Ya ha presentado una queja sobre esta publicación"
____loclib.e13261 = "Guardar clave"
____loclib.e13262 = "Más tarde"
____loclib.e13263 = "Suscríbete y incluyes las notificaciones de nuevas publicaciones de este usuario"
____loclib.e13264 = "Suscribirse sin notificación"
____loclib.e13265 = "Este nombre ya no está disponible, elija otro"
____loclib.e13266 = "Tema claro"
____loclib.e13267 = "Tema oscuro"
____loclib.e13268 = "Coinstake win"
____loclib.e13269 = "Transacción recibida"
____loclib.e13270 = "Nueva evaluación"
____loclib.e13271 = "Nuevo comentario"
____loclib.e13272 = "Nueva respuesta al comentario"
____loclib.e13273 = "Nuevo suscriptor"
____loclib.e13274 = "Usuario liberado"
____loclib.e13275 = "Calificación del comentario"
____loclib.e13276 = "Mostrar los videos incrustados"
____loclib.e13277 = "Reproducción automática de video"
____loclib.e13278 = "Iniciar PocketNet automáticamente"
____loclib.e13279 = "Chat"
____loclib.e13280 = "Etiquetas"
____loclib.e13281 = "Últimos comentarios"
____loclib.e13282 = "Token de bot de Telegram"
____loclib.e13283 = "Publicar desde el canal de Telegram"
____loclib.e13284 = "Agregar bot al chat y seleccionar"
____loclib.e13285 = "Preguntalo antes de publicar desde Telegram"
____loclib.e13286 = "Preguntar antes de enviar a Telegram"
____loclib.e13287 = "Enviar al canal de telegramas"
____loclib.video = "Video"
____loclib.e13288 = "Widgets de la página de inicio"
____loclib.e13289 = "Integración de Telegram"

____loclib.system = "Sistema"
____loclib.e13290 = "Le gustaría suscribirse"
____loclib.e13291 = "¿Está seguro de que desea enviar un mensaje a Telegram?"
____loclib.send = "Enviar"
____loclib.e13292 = "Ya tiene un node en este host"
____loclib.e13293 = "Error interno"
____loclib.e13294 = "Usar la base de datos PGSQL"
____loclib.e13295 = "DB Host"
____loclib.e13296 = "DB Puerto"
____loclib.e13297 = "DB Max"
____loclib.e13298 = "DB Idle Timeout, ms"
____loclib.e13298 = "DB Nombre"
____loclib.e13300 = "DB Usuario"
____loclib.e13031 = "DB Contraseña"
____loclib.e13302 = "Servidor Proxy en"
____loclib.e13303 = "Puerto del servidor proxy https"
____loclib.e13304 = "Puerto de servidor proxy wss"
____loclib.e13305 = "Servidor SSL Key, pem"
____loclib.e13306 = "Servidor SSL Cert, pem"
____loclib.e13307 = "Servidor SSL Frase"
____loclib.e13308 = "Firebase admin SDK"
____loclib.e13309 = "Su Dirección de Grúa"
____loclib.e13310 = "Captcha Habilitar"
____loclib.e13311 = "Ip limiter enable"
____loclib.e13312 = "Servidor"
____loclib.e13313 = "Data Base, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "Other"
____loclib.e13316 = "Permitir"
____loclib.e13317 = "Ruta binaria"
____loclib.e13318 = "Ruta de configuración"
____loclib.e13319 = "Ruta de datos"
____loclib.e13320 = "Dirección de Apuesta"
____loclib.e13321 = "Importar la dirección de la cuenta al nodo para el apilamiento"
____loclib.e13322 = "Estado"
____loclib.e13323 = "Direcciones de apuestas"
____loclib.e13324 = "Último Bloque"
____loclib.control = "Control"
____loclib.setup = "Configuración"
____loclib.e13325 = "¿Está seguro de que desea enviar mensajes desde Telegram?"
____loclib.e13326 = "Publicar"
____loclib.e13327 = "¿Está seguro de que desea usar el proxy nuevamente?"
____loclib.e13328 = "¡Apreciamos su comentario!"
____loclib.e13329 = "Nueva calificación de comentario"
____loclib.e13330 = "compartió su publicación:"
____loclib.e13331 = "compartió su publicación:"
____loclib.e13332 = "hizo una nueva publicación:"
____loclib.e13333 = "Transacción entrante"
____loclib.e13334 = "Ganaste"
____loclib.e13335 = "Pocketcoin para sus últimas acciones"
____loclib.e13336 = "con el mensaje:"
____loclib.e13337 = "comentó en su publicación:"
____loclib.e13338 = "respondió a su comentario:"
____loclib.reply = "Responder"
____loclib.e13339 = "Rescataste a alguien del internet censurado. ¡Algunos poketcoins están en camino!"
____loclib.e13340 = "¡Felicitamos!"
____loclib.e13341 = "te seguí"
// <%=e("process")%> <%=e("e13037").toUpperCase()%> <%=e("")%> self.app.localization.e("e13350")
____loclib.e13342 = "Nuevo suscriptor"
____loclib.e13343 = "calificó su publicación"
____loclib.e13344 = "Nueva calificación"
____loclib.e13345 = "te envió un mensaje"
____loclib.e13346 = "Publicaciones nuevas"
____loclib.e13347 = "Hay actualizaciones de "+appname+" disponibles. ¿Desea aplicar las actualizaciones ahora?"
____loclib.e13348 = "No, más tarde"
____loclib.e13349 = "Hay actualizaciones de "+appname+" disponibles. ¿Ir a la página para descargar una nueva versión?"
____loclib.e13350 = "Únase a "+appname+" y gane Pocketcoin ahora"
____loclib.e13351 = "Escribe porfavor brevemente sobre ti para hacerles saber a los usuarios que deberían seguirte"
____loclib.e13351 = "Charla de "+appname+""
____loclib.e13352 = "No tienes permiso para chatear"

____loclib.downloaded = "Descargado";
____loclib.downloadedEmpty = "Los mensajes descargados se mostrarán aquí";
____loclib.downloadVideo = "Descargar vídeo";
____loclib.selectQuality = "Seleccione la calidad:";
____loclib.downloadedVideos = "Vídeos descargados";
____loclib.deleteAllDownloadedVideos = "Eliminar todos los vídeos descargados";
____loclib.deleteVideoDialog = "Estás seguro de que quieres borrar este vídeo?";
____loclib.deleteAllVideoDialog = "Estás seguro de que quieres borrar todos los vídeos?";
____loclib.videosDeleted = "Vídeos eliminados!";
____loclib.noDownloadedVideos = "No hay vídeos descargados";

____loclib.buy = 'Comprar';

// Uploadpeertube component
____loclib.videoTranscodingError = "Se ha producido un error al procesar su vídeo"
____loclib.videoUploadingFinish = "Terminando de subir el archivo..."
____loclib.uploadNewVideo = "Subir un nuevo Pocketvídeo"
____loclib.selectVideoFile = "Seleccione el archivo de vídeo"
____loclib.uploadVideoProgress_binaries = "Preparando las bibliotecas:"
____loclib.uploadVideoProgress_processing = "Procesando el video:"
____loclib.uploadVideoProgress_uploading = "Cargando el video:"

____loclib.buy = 'Comprar';
