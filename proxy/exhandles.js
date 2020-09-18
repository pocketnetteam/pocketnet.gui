var fs = 		require('fs');
var Joi = require("joi");

var Firebasetoken = require("./objects/firebasetoken");

var Giftcoin = require("./objects/giftcoin");
var Refcoin = require("./objects/refcoin");
var Bonus = require("./objects/bonus");


var svgCaptcha = require('svg-captcha');

var Any = require("./objects/any");
var addingAddresses = {};
var addingRefAddresses = {};

var captchas = {};
var captchasip = {};
//var addedAddressesip = {};
//var addedAddressesipRef = {};
/*
var fonts = [
	'seguihis.ttf'
]*/

//svgCaptcha.loadFont(  'fonts/' + fonts[0])

var schemas = {
	firebaseToken : {
		token : Joi.string().required(),
		address : Joi.string().required(),
		device : Joi.string().required()
	},

	device : {
		device : Joi.string().required()
	},

	devicecaptcha1 : {
		device : Joi.string().required(),
		captcha: Joi.string(),
		system : Joi.string(),
		fingerPrint :  Joi.string(),
		node : Joi.string()
	},

	devicecaptcha2 : {
		device : Joi.string().required(),
		captcha: Joi.string().required(),
		text: Joi.string().required(),
		system : Joi.string(),
		fingerPrint :  Joi.string(),
		node : Joi.string()
	},

	freeMoney : {
		address : Joi.string().required(),
		system : Joi.string(),
		fingerPrint :  Joi.string(),
		Token :  Joi.string(),
		node : Joi.string(),
		captcha: Joi.string().required()
	}
}

var exhandles = function(handles, p){
	if(!p) p = {};
	
	if (p.db){

		handles.makecaptcha = {
			action : function(connect){

				

				var captcha = captchas[connect.parameters.captcha];

				if(!captcha){
					p.response(500, 'captchanotexist', connect)

					return
				}

				if (captcha.done){
					p.response(null, {
						id : captcha.id,
						done : true

					}, connect)

					return
				}

				console.log("CAPc", captcha.text, connect.parameters.text.toLocaleLowerCase())

				if (captcha.text == connect.parameters.text.toLocaleLowerCase()){

					captcha.done = true

					delete captchasip[connect.ip] ++
					
					

					p.response(null, {

						id : captcha.id,
						done : true

					}, connect)
				}

				else{

					captcha.shot || (captcha.shot = 0)
					captcha.shot++;

					var currentTime = new Date()

					if (captcha.shot >= 5 || captcha.time.addMinutes(2) < currentTime || captcha.time.addSeconds(2) > currentTime){

						delete captchas[connect.parameters.captcha];

						p.response(500, 'captchashots', connect)

						return
					}
					
					p.response(500, 'captchanotequal', connect)
					
					
				}
							
			},
			schema : p.schemas.devicecaptcha2,
			authorization : false,
			private : false,
		}

		handles.captcha = {
			action : function(connect){

				

				if (connect.parameters.captcha && captchas[connect.parameters.captcha] && captchas[connect.parameters.captcha].done){

					p.response(null, {
						id : captchas[connect.parameters.captcha].id,
						done : true,
						result : captchas[connect.parameters.captcha].text

					}, connect)

					return
				}

				captchasip[connect.ip] || (captchasip[connect.ip] = 0);
				captchasip[connect.ip] ++
				
				var c = 4;

				var captcha = svgCaptcha.create({
					size : c,
					noise : 12,
					color : false,
					ignoreChars: '0o1liy',
					width : 250
				});
				
				captcha.id = makeid();

				captchas[captcha.id] = {
					text : captcha.text.toLocaleLowerCase(),
					id : captcha.id,
					done : false,

					time : new Date()
				}


				p.response(null, {

					id : captcha.id,
					img : captcha.data,
					result : captcha.text,
					done : false

				}, connect)
							
			},
			schema : p.schemas.devicecaptcha1,
			authorization : false,
			private : false,
		}

		handles.freeMoney = {
			action : function(connect){


				if( (typeof p.captcha == 'undefined' || p.captcha) && (!connect.parameters.captcha || !captchas[connect.parameters.captcha] || !captchas[connect.parameters.captcha].done)){

					p.response(500, 'captcha', connect)

					return
				}

				var giftcoin = new Giftcoin({}, connect)

				giftcoin.check.all(connect.parameters.address, connect.ip, function(result){

					if(!result){
						p.response(500, 'error', connect)

						return
					}

					delete captchas[connect.parameters.captcha];

					var key = '';

					try{

						if(connect.refkey){
							key = connect.refkey
						}
						else{	

							if (connect.kran)
								key = fs.readFileSync(connect.kran);
						}

						
					}

					catch(e){

					}

					if(!key){
						p.response(500, 'no key', connect)
					}
					else
					{	

						key = key.toString().split(" / ")

						if (key.length){
							var mnemonic = key[1]

							var node = 1;

							if(typeof connect.parameters.node != 'undefined') node = connect.parameters.node;


							connect.app.platform.nodeid = node


							if(addingAddresses[connect.parameters.address]){

								retry(function(){

									return !addingAddresses[connect.parameters.address]

								}, function(){

									p.response(null, 'adding', connect)

								}, 100)


								return

							}

							addingAddresses[connect.parameters.address] = true

							connect.app.platform.sdk.users.giveFreeMoney(connect.parameters.address, mnemonic, function(err, txid, amount){

								addingAddresses[connect.parameters.address] = false

								if(!err){

									var giftcoinins = new Giftcoin({
										address : connect.parameters.address,
										amount : amount * 100000000,
										ip : connect.ip
									}, connect)

									giftcoinins.create(txid, function(){
										p.response(null, txid, connect)
									})
									
								}
								else
								{
									p.response(500, err, connect)
								}
							})
						}
						else
						{
							p.response(500, 'no key', connect)
						}
					}

				})

				
							
			},
			schema : p.schemas.freeMoney,
			authorization : false,
			private : false,
		}

		handles.freeUsers = {
			action : function(connect){

				var giftcoin = new Giftcoin({} ,connect)

					giftcoin.all(function(error, res){
						var addedAddresses = _.map(res, function(r){
							return r.address
						})

						p.response(null, {
							addedAddresses : addedAddresses
						}, connect)		
					})

									
			},
			schema : p.schemas.empty,
			authorization : false,
			private : false,
		}

		if(p.firebase){

			handles.firebase = {
				set : {
					action : function(connect){

						connect.firebase.addToken(connect.parameters, function(err, tkn){

							if(err){
								p.response(500, err, connect)
							}
							else{
								p.response(null, tkn, connect)
							}	
							
						})
						
						
					},
					schema : schemas.firebaseToken,
					authorization : false,
					private : false,
				},

				revokedevice : {
					action : function(connect){

						connect.firebase.revokeDevice(connect.parameters, function(err, tkn){

							if(err){
								p.response(500, err, connect)
							}
							else{
								p.response(null, tkn, connect)
							}	
							
						})
						
						
					},
					schema : schemas.device,
					authorization : false,
					private : false,
				}
			}

		}

		if(p.processes){

			handles.processes = {
				action : function(connect){

					p.response(null, {
						info : connect.processes.info()
					}, connect)		

				},
				schema : p.schemas.empty,
				authorization : false,
				private : false,
			}

		}

		handles.checkgift = {
			action : function(connect){

				var bonus = new Bonus({} ,connect)

				console.log('connect.parameters.address', connect.parameters.address)

				bonus.get.address(connect.parameters.address, function(err, res){

					p.response(null, {
						gifts : res || []
					}, connect)		

				})

			},
			schema : p.schemas.address,
			authorization : false,
			private : false,
		}

		handles.initdb = {
			action : function(connect){

				var objects = [
					{name : 'bonus', tname : "bonuses"},	
					{name : 'giftcoin', tname : "giftcoins"},
					{name : 'refcoin', tname : "refcoins"},
					{name : 'firebasetoken', tname : "firebasetokens"},
					{name : 'node', tname : "nodes"},
				];

				var err = null;

				lazyEach({
					array  : objects,
					action : function(_p){

						var p = {};
					
						p.name = _p.item.name;
						p.tname = _p.item.tname;	
						
						var any = new Any(p, connect);

						any.sql.table.create(
							(err, results) => {

								if(!err){
									console.log("success", p.name)
									_p.success();
								}
								else
								{
									console.log(err)
									console.log("fail", p.name)
									err = err;
									_p.fail();
								}

							}
						)
					},
					all : {
						after : function(){

							p.response(err, null, connect)
						}
					}
				})

				

			},
			private : false,
			authorization : false,
		} 

	}
	
	
    
}

exports.exhandles = exhandles;