var schemas = {
	

	firebasetoken : {
		columns : {
			id : {
				constraints : ['NOT NULL'],
				type : 'serial',
				name : "ID",
				export : true
			},

			date : {
				type : 'timestamptz',
				name : "Date",
				default : "now()",
				export : true
			},

			token : {
				type : 'varchar',
				size : 250,
				name : "Firebase token",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			device : {
				type : 'varchar',
				size : 100,
				name : "User Device",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			address : {
				type : 'varchar',
				size : 100,
				name : "User Address",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},
			
			deleted : {
				type : 'bool',
				constraints : ['NOT NULL'],
				default : false
			},
			
			status : {
				type : 'bit',
				size : 8,
				default : "B'00000000'",
				name : "Status",

				export : true
			}
		},
		settings : {
			export : ['columns'],
			values : ['id' , 'device', 'address']
		}
		
	},

	bonus : {
		columns : {
			id : {
				constraints : ['NOT NULL'],
				type : 'serial',
				name : "ID",
				export : true
			},

			date : {
				type : 'timestamptz',
				name : "Date",
				default : "now()",
				export : true
			},

			address : {
				type : 'varchar',
				size : 100,
				name : "User Address",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			txid : {
				type : 'varchar',
				size : 100,
				name : "Pay transaction id",
				constraints : ['NOT NULL'],
				export : true
			},

			amount : {
				type : 'bigint',
				name : "Bonus Amount in POC",
				constraints : ['NOT NULL'],
				export : true
			},
			
			level : {
				type : 'integer',
				name : "Bonus Level",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			reputation : {
				type : 'integer',
				name : "User reputation on pay moment",
				constraints : ['NOT NULL'],
				export : true
			},
			
			status : {
				type : 'bit',
				size : 8,
				default : "B'00000000'",
				name : "Status",

				export : true
			}
		},
		settings : {
			export : ['columns'],
			values : ['id' , 'device', 'level']
		}
		
	},

	refbonus : {
		columns : {
			id : {
				constraints : ['NOT NULL'],
				type : 'serial',
				name : "ID",
				export : true
			},

			date : {
				type : 'timestamptz',
				name : "Date",
				default : "now()",
				export : true
			},

			address : {
				type : 'varchar',
				size : 100,
				name : "User Address",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			referrer : {
				type : 'varchar',
				size : 100,
				name : "Referrer Address",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			txid : {
				type : 'varchar',
				size : 100,
				name : "Pay transaction id",
				constraints : ['NOT NULL'],
				export : true
			},

			amount : {
				type : 'bigint',
				name : "Bonus Amount in POC",
				constraints : ['NOT NULL']
			},
			
			level : {
				type : 'integer',
				name : "Bonus Level",
				constraints : ['PRIMARY KEY', 'NOT NULL']
			},

			reputation : {
				type : 'integer',
				name : "User reputation on pay moment",
				constraints : ['NOT NULL']
			},
			
			status : {
				type : 'bit',
				size : 8,
				default : "B'00000000'",
				name : "Status",

				export : true
			}
		},
		settings : {
			export : ['columns'],
			values : ['id' , 'device', 'level']
		}
		
	},
	
	giftcoin : {
		columns : {
			id : {
				constraints : ['NOT NULL'],
				type : 'serial',
				name : "ID",
				export : true
			},

			date : {
				type : 'timestamptz',
				name : "Date",
				default : "now()",
				export : true
			},

			address : {
				type : 'varchar',
				size : 100,
				name : "User Address",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			txid : {
				type : 'varchar',
				size : 100,
				name : "Pay transaction id",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			amount : {
				type : 'bigint',
				name : "Gift amount",
				constraints : ['NOT NULL']
			},
			
			ip : {
				type : 'varchar',
				size : 30,
				name : "User ip",
				constraints : ['NOT NULL'],
				export : true
			},
		
			status : {
				type : 'bit',
				size : 8,
				default : "B'00000000'",
				name : "Status",

				export : true
			}
		},
		settings : {
			export : ['columns'],
			values : ['id' , 'device', 'level']
		}
		
	},

	refcoin : {
		columns : {
			id : {
				constraints : ['NOT NULL'],
				type : 'serial',
				name : "ID",
				export : true
			},

			date : {
				type : 'timestamptz',
				name : "Date",
				default : "now()",
				export : true
			},

			address : {
				type : 'varchar',
				size : 100,
				name : "User Address",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			referrer : {
				type : 'varchar',
				size : 100,
				name : "Referrer Address",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			txid : {
				type : 'varchar',
				size : 100,
				name : "Pay transaction id",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			amount : {
				type : 'bigint',
				name : "Gift Amount",
				constraints : ['NOT NULL']
			},
			
			ip : {
				type : 'varchar',
				size : 30,
				name : "User ip",
				constraints : ['NOT NULL'],
				export : true
			},
		
			status : {
				type : 'bit',
				size : 8,
				default : "B'00000000'",
				name : "Status",

				export : true
			}
		},
		settings : {
			export : ['columns'],
			values : ['id' , 'device', 'level']
		}
		
	},

	node : {
		columns : {

			id : {
				constraints : ['NOT NULL'],
				type : 'serial',
				name : "ID",
				export : true
			},

			date : {
				type : 'timestamptz',
				name : "Date",
				default : "now()",
				export : true
			},

			host : {
				type : 'varchar',
				size : 30,
				name : "Host",
				constraints : ['PRIMARY KEY', 'NOT NULL'],
				export : true
			},

			port : {
				type : 'varchar',
				size : 6,
				name : "Rpc port",
				constraints : ['NOT NULL'],
				export : true
			},

			ws : {
				type : 'varchar',
				size : 6,
				name : "Websocket port",
				constraints : ['NOT NULL'],
				export : true
			},

			path : {
				type : 'varchar',
				size : 10,
				name : "Path",
				export : true
			},
			
			nodename : {
				type : 'varchar',
				size : 30,
				name : "Node name",
				constraints : ['NOT NULL'],
				export : true
			},

			addedby : {
				type : 'varchar',
				size : 50,
				name : "Added By",
				constraints : ['NOT NULL'],
				export : true
			},

			/*rpcuser : {
				type : 'varchar',
				size : 50,
				name : "Rpc user",
				export : true
			},

			rpcpwd : {
				type : 'varchar',
				size : 50,
				name : "Rpc password",
				export : true
			},*/

			deleted : {
				type : 'bool',
				constraints : ['NOT NULL'],
				default : false
			},
		
			status : {
				type : 'bit',
				size : 8,
				default : "B'00000000'",
				name : "Status",

				export : true
			}
		},
		settings : {
			export : ['columns'],
			values : ['id' , 'device', 'level']
		}
		
	}
}

module.exports = schemas;