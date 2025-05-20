var registration = (function(){

	var self = new nModule();

	var essenses = {};


	var Essense = function(p){

		var primary = deep(p, 'history');

		var el = {}, k = {},  gliperror = false, essenseData, initialParameters, ext = null;

		var addresses = [];
		
		var categoryIcons = [
			{
				"id": "c2",
				"icon": "far fa-smile"
			},
			{
				"id": "c3",
				"icon": "fas fa-landmark"
			},
			{
				"id": "c4",
				"icon": "fab fa-bitcoin"
			},
			{
				"id": "c5",
				"icon": "fas fa-microscope"
			},
			{
				"id": "c55",
				"icon": "fas fa-book"
			},
			{
				"id": "c6",
				"icon": "fas fa-dollar-sign"
			},
			{
				"id": "c73",
				"icon": "fas fa-fist-raised"
			},
			{
				"id": "c72",
				"icon": "fas fa-thermometer"
			},
			{
				"id": "c7",
				"icon": "fas fa-flag-checkered"
			},
			{
				"id": "c8",
				"icon": "fas fa-running"
			},
			{
				"id": "c9",
				"icon": "fas fa-gamepad"
			},
			{
				"id": "c10",
				"icon": "fas fa-space-shuttle"
			},
			{
				"id": "c11",
				"icon": "fas fa-music"
			},
			{
				"id": "c12",
				"icon": "fas fa-newspaper"
			},
			{
				"id": "c13",
				"icon": "fas fa-history"
			},
			{
				"id": "c14",
				"icon": "fas fa-bookmark"
			},
			{
				"id": "c15",
				"icon": "fas fa-film"
			},
			{
				"id": "c16",
				"icon": "fas fa-paw"
			},
			{
				"id": "c17",
				"icon": "fas fa-route"
			},
			{
				"id": "c18",
				"icon": "fas fa-pencil-ruler"
			}
		];

		
		var current = null;
		var regproxy = null;

		var subscribe = []

		var getproxyoptions = function(){

			if(regproxy){
				return {
					proxy : regproxy.id
				}
			}

			return {}
		}

		var getbloggers = function(lang){
			var dict = {
				en : [
					"PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd",
					"PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5",
					"PSv1yz9wmWQsKnRGJAdwLdyeQyYV3Wdgto",
					"P8boyun9yF6QYn1fjGC1WABt4BQUL4STeh",
					"P9sathm4yQJEH6SMvgC2CCLEXSqVWxSHtj",
					"PQDxqrJqKM15weq1mbunEqK2uVNvZy1Z6d",
					"PDUWW57W8DoV1dMTQYsrkwg66xEuaNckbd",
					"PKSV2KXCdEtTtYb8rF3xMMgiiKe1oDstXR",
					"PXXaSczoZcuJEwxYKhaC9pV1JBvwi6UjSw",
					"PLJvEixJkj85C4jHM3mt5u1ATwZE9zgFaA",
					"PXsjQA3fYDGCr1WwmNTNmrs9N7VA18gVuB",
					"PAVjp9nsNtgzUNF1VkUd74YzLaQHpv4g7v",
					"PQzoDW8StdS3skmDuUK4z5L9dMq24n72M4",
					"PVeM9qDAoGY9CYy74iJ4t7Y1KydDAS7i32",
					"PPvPW1sUAA1KPxcwbVKVk2EEp3uWkAKn2U",
					"PXFWhq3Jkn4fMfHcV3pUaAfn9V4j5XP5vj",
					"PL8nRqbUwALzoAxuukpgujZnsvsRdxhDgZ",
					"P9JJkNzEt2AKeWJMfLs3dVSeKv8JhTrEBo",
					"PKiJHawMenkQPm7oW4cCJ1XuZhkvSNtgin",
					"PR73uNkFMJzvL9NtkL66NAZ2ci1GVQuW8E",
					"PUYEkLb6szwxjw3cq6FvLxDPmedbyd3foq",
					"P9D3ntMdwy4HGjBhg1uQDuQD99MXYZTqg3",
					"PPrFUMzLohoC7cufa58Rw1HVzvc26Zcktf",
					"PXg2sYFAxDL5XX9FyGKqMnhCzZ83kuGK87",
					"PKLvDiBvAsTbYDJhC1xNfby2GFnybCQpHn",
					"PCYeapWncohMda9vfrFe26EDEiFa89kDZ1",
					"PKJt3eEw6W5p8uaLmVEGxsSMMdAn8BS5Tm",
					"PDmkhjER14qdCHF7YDd2GHYzescfM7VsvV",
					"PWRx3VnQmMrLbjP4Aqc2wS71gfLVDdanvz",
					"P91TKLkjuJmD8hajLJqzVhn9LBRRqH4Jet",
					"PR54hSnPDbhPePLNQZCP4CU77TRFoMxYqg",
					"P9uXjMpMsfS3rsZcmCPHydFrM1H3wio6HM",
					"PKtbR5wQoMRJZNKdvgWvsQJQ28SpjgUttp",
					"PV3ssKSbhHLoPYTgX2cVqU5Z7KjqsC1Bo2",
					"PBaxqXzgJUAfkzF5a6BVYCLFjBCqRzxhbt",
					"PXen74Rrke5MQ3FrcFYKq8xxGm6y1zSrXF",
					"PEHN5RF4cRdHRwRUi4idwpYZSSudcWRWsK",
					"PLKWgoM6FtPz1RwbAupV3A31hjtPyf2GQU",
					"P8gEMXATRUQUf6ECk4ueR4pHR6yxxTz7F8",
					"PMUxN2Fs8YhUg13QXz2o9Fi2gVVJvC3VPS",
					"PSN1o6LedxzF4uWvfr3uFRVSPpuyFQbsig",
					"PLwWXrGBvVxWfujrDxgGHa7oCVtyw9F3Du",
					"PJ5HX1eCHedY2Zjt4JTUanL1ZLi3NQdy3Q",
					"PSodmnDpeukCaKWwQStkdHJ9C1NFb8ZPTY",
					"PEbLtyM7htjdEvdPvYBdqbsB21LgZJrznX",
					"PWneSfgJsguqqCHhpMwh4GXLwxNQnFqQsg",
					"PJLWmawsMSSTEPfJdzzw3knBKBzNfHcLPy",
					"PK2ETYEuDHiWf2ncGuq3TjGfpXEUdGxuYE",
					"PVgUQGd3LVyshGKikUespSSiVJZaxuHGjM",
					"PTPVArrxr4wZuget8phZ1eSNFsGmdSXXck",
					"PQVDZUdY4tNDP1tssoHj4ubCTmDcrewqpK",
					"PRoEsJWkuh8FBYhJwxQHTbiAUKzhaDgSkv",
					"PGCJVJK8EK2wDd7jn8kDnZ95VSB3GasiyB",
					"PUxdo1FrRN4UXoseAG6WH7igYjWN8qzK5G",
					"PMgywDgaaGA3bDPVwkxnSvNj2YQjgXKrkK",
					"PFvr5EBtN68m9wAe7ffkKPpygpPPYtxmnT",
					"PTp3FuDD2y4pJMzwokdDAR3PFHUXaETVet",
					"PG1Qm7azCwHwbpUtW2Pudumjg4cQNKwksQ",
					"PKXv5WXGzGgQedF5vjKAqBPNjNky6e7LuK",
					"PWffxNdLTED2fw3KjFZY4thCC5NrXjgXxR",
					"PTdrNLoQDWY7JakFcBd2Dp4ddYG2mcysKt",
					"PGuYTV1x7DTuv6JZ3gdH3uEvQS6hm1nirT",
					"PGCNqwGkMuhdS7MqHwRq4qejPaNBMEfRc5",
					"PQQJYdFXpXA25JWZ6cv42biF8ndCxhhwvq",
					"PQbfYfyaapr4TKLPdEHLbqyo6bYAckZTtj",
					"PUmbyuUgsPdkpysD9XKPdhbjG149BM3U8N",
					"PPYGqZa9UccqZxrbqaoXPxSALYJqDzRmJc",
					"PQxvt1DuxxS7PMt4NGzbHMZULacHFSpBii",
					"PWSPQEcWRXhdARDqDdWdPCBERWkZ9Mwzu4",
					"PNEaeyrShshKZmVJa1sb4MQ2jBKsMtFzgc",
					"PKAfYfXX5r5MARwG5RFHTmPfTemQBqt7DJ",
					"PA5AmPe9T4Xt325ympGF7ezyLGgqJsmi5F",
					"PGbViDN9KVCFuV62U4J1kSP7zCqtGyQNxX",
					"PAQL2mjT9J9GQDgNuG6sBSh9e5KtdkrW6o",
					"PJWmitSptX35i95ZWHzCJdop3XczrVnQNk",
					"PENkgaxRLSCEA4snqJVJ3SypWYzngZgSkJ",
					"PVkgUyzc6GzZaJvY4j6ZQ62qKwGL6NFqJn",
					"PCrpUWC3raz2rJa3wUDzWDXhkjkctor4kS",
					"PKbYu8Sib6hAB56xeM1r6qWvqbhNFbrTJX",
					"PD5Me7TLMRVx6cJQSCiys1jdXEM6tYtdUq",
					"PSRTvXVHhAUhzHE9fGi3uNbQE6hmQWxCmS",
					"PPyLoFpBtnXfLou5dkEpZxFnnGtE5PEuhL",
					"PKCCpPherudWjsHEKCsQTgkCVXp9mxdjeY",
					"PKKFPLhbQrHzpcpcesmuRsTpYfhdh2jmXL",
					"PMdbr7f7h8KTkxaYXvDsD1Mp1Z1PvSV2Ps",
					"PNhLC8awCsCi1VVNVtn26yQCvKqFY2os8Q",
					"PGmEQFfaMfJJeryZHm5ipWULnCZyVybMqP",
					"PGQG7eDKonYrjB874cM1yMMQcJnJXjvr3Y",
					"PUS23CKbJYRxrfRmg44p7z8pawQRTa42UE",
					"PGNiQxDeDzXbviw2jJCCmgL8vHxSRqWLjS",
					"PA2mkqDV1CU7ZHtneYVPMkB3u4WdzKz4t7",
					"PVEZHXjc5UgfRLcCHLfLS6CwEAydW3V8tk",
					"P8bbRWJknHBXJRBTDSS88uQJSFvX67iN88",
					"PAQwhNzJYmnLS1wmqC1gh2yWcNXhXf7CK4",
					"PDhmv4TCnTZJyVtr6nuwcvnAn4GpDqsowJ",
					"PTr9PMngM7iaNV5ApLJ5hkkqnXPekQWmpk",
					"PNyouYhkgvErgpNfWhDCmLLn3xTBtpDzk7",
					"PUZfvyHG8qpcTkLmqFi8eMdMrXFffosysX",
					"PVy2rTBn1avrNapV9wfmQVSADNr7Rz5XwV"
				],
				ru : [
					"PSBePd5Tx5KG9vxwAzbaDTfjzDbq1GUTYw",
					"PTcArXMkhsKMUrzQKn2SXmaVZv4Q7sEpBt",
					"PXgYFdVs5W831WpksVLA5hNtXa7XSqUzLB",
					"PCtDTH7XznLBCTHhKFeeg8ezSa7WJtYiMJ",
					"PCjhy4t6B2b5xeqVoJcN51XkhUqAXBuaq4",
					"PTMFZXMXYFjiN1UuSV4ZckepyEFVWMm6Zy",
					"PBrE3RbATwd6bS3Qq9jR4rr66fesEaZiNA",
					"PMABcFZc7fcgPZzstJrHeYoWXJGoP3pd7X",
					"PBGqJGSrdsBrEsLmiAaeH22bxGg8irX3gC",
					"PHqNLuNEwrw8nzj71ELVGp7w1eEp8p2pKA",
					"PQ4X2NQJD1ZA5Hy58ZU9eHcjpRco7ZMgTz",
					"PLTjskW3xi3oaLnyqTAwZQa1iAeQ3PzTuF",
					"PRDXZpyF7rm9cJw3y6DX2nFvK1AYgjpXdF",
					"PVfeMAEsRt5rkaeZVxGFu6yTPBpsy9M1kP",
					"PRH3aKqRb6UWcJE5EnwVvhmHAVGbT5D6nE",
					"PSXmn4k7BDwwtZkTxdgC7yq1Cwh4Di7GLK",
					"PUXG7rfX19Xoco1FXjXBW8qt6NEZpp8maL",
					"PXupozgNg1Ee6Nrbapj8DEfMGCVgWi4GB1",
					"PRu6oMRuV9oNiP1p32LrqZKkJbZHA7DgsD",
					"PC5ZyNr9uMG5ytpTvrCXxgp5Pb6JexqkJ7",
					"P9XDeSpjLMjZPdeEDDBQ94fe4BsTa1b2Gu",
					"PLfHpn9nJe9hKJ7UqvAuPsPUu9RjNpyTrN",
					"PHtxzCKFqNEfn8N8FDAUYhUhqSL2qJJZxY",
					"PWbYmgG6PzqhrNDtuFmWrSaLHTDMwZWc26",
					"PWyjwnA3Rr8Fuc6HQmcYFb3cYXDeaq679j",
					"PARV591XENALBB5ApkR7WcQPhEZtLHfi2A",
					"PSGSnF7Diww2yJdQefuy3ZvuZEoBw8TGTV",
					"PA6biduJbWcQ97n5jz2jUqWHtenLpWTH7s",
					"PR4TYtUrUZuboGh4Mi76F5tPm5je1ss1Kz",
					"PVjvMwapTA29biRTsksXUBuVVf2HVwY7ps",
					"PUom3RVtdmeohTbM2TepAeCH7E8hmAcg9e",
					"PLZATQyqYzM6NLbH8M3LPicSU3cTAqW3SA",
					"PMvQu71tyxeLymLe5f1WWTUBHUqAMb4DA5",
					"PXYhCbTwPaUHrP6spJM5NY84TBpLQJtZi5",
					"PT4fvQ7jMicg6McC52BmFFkL2M6AEWc7vo",
					"P9KXb7sS2JDjV5jnXu4t2WwwbvzYeu6yds",
					"PL1wziiaQj7FLnoktuQQ1MKweYYbdcekRB",
					"PGPqNyxuSSsAkt3m6eb5hyckoDhyy19dW9",
					"PWKzt9TG45VUmAjuoFQQ4bGfZpjaUhxnhH",
					"PTBHcYYBL5NU1okBYXYUTcFY6PE9p2o7gz",
					"PB1EShZbvkTSQgU8NLxEH8MN5UiKw1CBHb",
					"PQJxSJhzMkSYAK7KzgLSQikUCN3TNnYMVj",
					"PUAReaFjwyLwPz7UVfQSXHRzeA9R38guAN",
					"PD4pWxVke4Yz2y5UnNWnSsVHd45Vy6izCr",
					"PCsDDAkkqmZCiE6EzTSUdsN5R9gAwVVAA3",
					"PX7pM9CG9MhMCqJQD52ahLyqSssNK2WxEv",
					"PRtwPBwazZM7U9BZQKFvF9N1uK3Tro5gAC",
					"PEtDfca1HGUoMzCPxwE5u6CnxkDsUodQoN",
					"PVKBpAURkwhZhnSQktndTHQJhnkuNfq2bY",
					"PGD5jUBQ7qNnHDuW85RRBxY1msywEdCm7r",
					"PMsc5knY24db8cPGcf3mQteU58HrRYYDP2",
					"PBvkW9txHLiKtQMX642DG1SmJC2UbBX5wy",
					"PLQ49oTdSwgUjaiouj8A68psJFbxJXHt82",
					"PMeDShhVjaQyh7T2m9HQxizqKpLJdHu9b4",
					"PQ8PDzWy7hDV8gfgSgoP2BCU2CXngMPCvt",
					"PReDbVPWKujZxBDnzhckPJKfjq95tqNKdE",
					"PDPK3oqokf1NwfMV6zPA7rVE6XP5AqUt8u",
					"PTiysXo14thLsJvckTHbqxodnidWEBj8DP",
					"P9UAY62d1tbvvpdJkJTrGwTpYaN6A5MW2Q",
					"PSs2u1WfWjmbUW6hF3sj3unHya4Ke4rF9Z",
					"PR3GMuDVdAz42BtX66fhcFfeR5XRj7FBMm",
					"PTsCJbzqSJCVhDB2LvZvs6uq48oXj7ebL1",
					"PCVt7H4vgjBDxifLz3uokbc1tD3MZwWwQh",
					"PWUb3x7RxMUEwVxWhU6eA9jzJMZsid4u8s",
					"PHsHq6i4RKm9gCqFGhAr3yvF34yDocc5S7",
					"PFNTfuCAJLNXtJXCfn3yoVNVcjHAZbzk9j",
					"PCkX8n2e6aD6Ji37hSpHCJpqvaaJjVWt1m",
					"PHJQQHRoJ1YcuTTT4956KtcjwJGWtPnP4g",
					"PD48kT2ZPX3rY8vLKxKWa6TsGx2HUCrnc7",
					"PLYPuTA1HUD8iXBsqTmLUwNhySbJgYja55",
					"PMyneQ1MY2ihSeYqmiXmdtd9kpawk86Mqt",
					"PDbsi1bVy1LAHVDrUyUirRkTGjh4M8S4UR",
					"PQkz1qRDtQTEMU2i9c1wSR86FNLDhBUFPo",
					"PHnvqSQzg5D3yKo5KgCiXqtFP84bsYyF7G",
					"PQ9zpNSGkrR7kkC86XpX6cuni78GnPqwDW",
					"PQxpMbfovvgsdKZnHqesS8xvxcozHCGNik",
					"PDMTBS4M6dMoTsRRiW5FG6vy9i3mB6Jpv8",
					"PGvrffXKekchqvBMVFq9AVDL2RJPLPmvfq",
					"PSd47DchqhKK3JtNAbKU4FqR7u1S5yHxau",
					"PJw76ZEdMHgp8NfLuvacjF2cP2sGrAGGoe",
					"PQVEaBeqmCRt7gHj3ParvfPcmtxxst9C3q",
					"PNzdAKBDEAQbqpYevaFcmcR6uLQGf6uv6N",
					"PEqZBgw92riGLivcDWJet7RKs3xjZLpVyi",
					"PLpzAiA6H8isp33WeVx2UEuXLfc3SyqkzK",
					"P9pZpxcgrR8tQfpeGE99ZTY7UpT5QwwAoa",
					"PR2hG1etTQxXnAssVrPcMKmAz9zzgfvAQo",
					"PKwc6u5ZFZVJWwZyLPh5bTgbpvADaH74g7",
					"PSfU8Gn7HV4NAT6BxSsYCweMRqHrDQk4ef",
					"P9YzrfNXXc233aDXzfrCZ5VNbbrK3MGTY3",
					"PRLWihKyKo277CZemy9jkco5DpXfikMbfb",
					"PTKDv4A5BDKtdFZMf2PfuoMj9Hw64Wg4pY",
					"PNAez3KW8mcQdaVJDzTdv5WSGddcoDwBH2",
					"P9EvW9wPoGBvnNyYdtjkKR3Z54ULmK7Z8g",
					"PKTwG4HgsMNaoUmXwV1JEFZCTTpQrBk7VG",
					"PWPKkVPGooTF84QCGP8zngVMGPTvqiq6Qa",
					"PHMjVgWj6HMiLeAhiR8eDLzVrXp8nyF2ji",
					"PJtnXwKNPDdEpJhaKH2fbPEyLrcS77oj46",
					"PXkJiHrAwPNk2uKNrN1odK4SDeEdHNGw9j",
					"PGf7dNWLaKUfWCQm3fyyaY6zxPexKYALhF",
				],
				test : [
					'TEgrDd5Arx9fLPk8gcyr1XLL1GU6dkhHLi',
					'TEcigdCKLj47Rb4Ek5CL7N1N3LpkPZh5pu',
					'TQPBvaNUyEWoK9AfY7mUfx3BXZWE2fRXQd',
					'TYWwKVhh9a1A7oUytZkwec1Ab3XXSUkZgJ',
					'TAxEpqgtHtdbiLZWVfSqTarP99P59rFRkj',
					'TGX3NqKceZqqyNyLZw5Q5JwWeKYgnApofn',
					'TCbUs1HhYr9yE7QzL7xgNDWqFySHYKUtAC',
					'TJ7LTvJcgaK7mq8fBPjJwvNRU6q6X3sgAt',
					'TGZLk6hroZEhgAo8SZXtkdggZHX8BWhNkh',
					'TA4CQv7MSga6o3GwQGqarkSLWopADqrAkq',
					'TA4iXZ6DxtygXuwr1syKiydo1NrMAXhsY9',
					'TQKQ6mXfsPA554STX5YPiLyehA8GJPj2tc',
					'TY2NeHUHVGDZquFzzmWo8QNEFvTTMNupGu',
					'THy6Rd8xv35m8VkNwJQZKDwmCwKL6QYtwz',
					'TBBbasLPUPaWgnb8UGxYA5eoBXxdXMDmw8',
					'TJYKMFZKYhSpU7xT55tuR4jD8gpC1dAZ5c',
					
				]
			}

			_.each(window.project_config.regAccounts || [], (a) => {
				_.each(dict, (d, k) => {

					if(k == 'test') return

					dict[k].unshift({
						a : a,
						s : true
					})
				})
			})

			return (self.app.test ? dict.test : (dict[self.app.localization.key] || [])) || []
		
		}

		var steps = {
			settings : {
				id : 'settings',
				nextindex : 'bloggers',

				prev : function(clbk){

					clbk()
			
				},

				render : 'settings',

				after : function(el, pel){

					
				},

				next : true				
			},

			welcome : {

				id : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')

					


					clbk()
				},

				render : 'welcome',

				after : function(el){

					self.app.el.app.removeClass('default-scroll')

					var c = false

					var clbk = function(redirect){

						if(c) return

						c = true
						

						if (!redirect && deep(essenseData, 'successHref') == '_this'){

							var close = deep(initialParameters, 'container.close')

							if (close)
								close();

							if (essenseData.signInClbk)
								essenseData.signInClbk();

						}
						else
						{
						
							self.nav.api.go({
								href : redirect || self.app.platform.sdk.registrations.redirect || 'index',
								history : true,
								open : true
							})	

						}

						try {
							localStorage['regproxy'] = ''
						}
						catch (e) { }

						self.app.platform.sdk.registrations.redirect = null

						/*if (isMobile()){
							self.app.platform.ui.showmykey({
								afterregistration : true
							})
						}
						else{
							self.app.platform.ui.showmykeyfast({
								showsavelabel : true
							})
						}*/
						
					}

					setTimeout(function(){

						clbk()

					}, 6500)

					el.find('.continue').on('click', function(){

						clbk()
						
					})

					el.find('.continueToBarteron').on('click', function(){

						clbk('application?id=barteron.pocketnet.app')
						
					})
					
				}


			},
			
			categories : {

				id : 'categories',
				nextindex : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')


					clbk();
					
				},

				render : 'categories',

				after : function(el){

					var elCategories = el.find('.cat');
					var next = el.find('.next');
					var skip = el.find('.skip');

					self.app.platform.sdk.categories.clear()
					
					var activeCategories = [];

					elCategories.on('click', function(){

						var cat = $(this);
						var id = cat.attr('cat');

						var activeIdx = activeCategories.findIndex(function(c){
							return c === id;
						})

						if (cat.hasClass('active')){

							cat.removeClass('active')
							if (activeIdx > -1){
								activeCategories.splice(activeIdx, 1);
							}

						} else {

							cat.addClass('active')
							if (activeIdx === -1){
								activeCategories.push(id);
							}
						}

						if (activeCategories.length){

							next.addClass('active')

						} else {

							next.removeClass('active')
						}

					})

					var c = false

					var clbk = function(activeCategories){

						if(c) return

						c = true

						for (var catId of activeCategories){
							self.app.platform.sdk.categories.select(catId);
						}

						

						actions.next()
						
					}

					next.on('click', function(){

						if (activeCategories.length){
							clbk(activeCategories)
						}	
						
					})

					
					skip.on('click', function(){

						clbk([])
						
					})
				}


			},
						
			bloggers : {

				id : 'bloggers',
				nextindex : 'welcome',

				prev : function(clbk){

					var bloggers = getbloggers()

					var addresses = _.map(bloggers, (v) => {

						if(_.isObject(v)){

							if(v.s) {
								subscribe.push(v.a)
								subscribe = _.uniq(subscribe)
							}

							return v.a
						}

						return v

					})


					self.sdk.users.get(addresses, function(data){


						steps.bloggers.current = _.shuffle(self.psdk.userInfo.gets(addresses))

						if (steps.bloggers.current.length){

							clbk()
						}
						else{
							actions.to('categories')
						}
						

					}, true)
				},

				render : 'bloggers',

				after : function(el){

					self.app.el.app.addClass('default-scroll')

					var next = el.find('.next');

					el.on('click', '.subscribeButton', events.subscribe);
					el.on('click', '.unsubscribeButton', events.unsubscribe);

					el.on('click', '.user .showMoreAbout', events.showprofile)

					$('body').on('click', events.hideprofiles)

					next.on('click', function(){

						actions.next()
							
					})

					
				}


			},

	

		}

		var arrange = _.map(steps, function(s, i){
			return i;
		})


		var actions = {

			showprofile: function(address){

				self.nav.api.load({
					open : true,
					id : 'channel',
					inWnd : true,
					history : true,

					essenseData : {
						id : address,
						followbutton : true,
					},

					clbk : function(i, p){

						p.el.on('click', '.subscribeButton', function() {actions.subscribe(address, p.container.close)});
						p.el.on('click', '.unsubscribeButton', function(){ actions.unsubscribe(address, p.container.close)});
					}
				})

			},

			unsubscribe : function(address, clbk){

				dialog({
					html : self.app.localization.e('e13022'),
					btn1text : self.app.localization.e('unsub'),
					btn2text :  self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						subscribe = _.filter(subscribe, (a) => {
							return a != address
						})

						el.c.find('.user[address="'+address+'"] .subscribeWrapper').removeClass('following');

						if(clbk) clbk()

					}
				})

				/*dialog({
					html : self.app.localization.e('e13022'),
					btn1text : self.app.localization.e('unsub'),
					btn2text :  self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(address, function(tx, err){

							if(tx){
								el.c.find('.user[address="'+address+'"] .subscribeWrapper').removeClass('following');
							}
							else
							{
								self.app.platform.errorHandler(err, true)	
							}

							if (clbk){
								clbk();
							}
		
						})

					}
				})*/
				
			},
			subscribe : function(address, clbk){

				subscribe.push(address)

				subscribe = _.uniq(subscribe)

				el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')

				if(clbk) clbk()

				/*self.app.platform.api.actions.notificationsTurnOn(address, function(tx, err){

					if(tx){

						el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

					if (clbk){
						clbk();
					}

				})*/
				 
			},

			subscribeList : function(){

				if(!subscribe.length) return

				_.each(subscribe, (address) => {
					self.app.platform.api.actions.notificationsTurnOn(address, function(tx, err){
					})
				})

				subscribe = []
			},

			preloader : function(sh){
				window.rifticker.add(() => {
					if(sh){
						el.c.addClass('loading')
					}
					else{
						el.c.removeClass('loading')
					}
				})
				
			},

			signin : function(clbk){

				self.app.user.setstay(1);

				self.user.signin(k.mnemonicKey, function(state){
					if (clbk)
						clbk()

				})		

			},

			to : function(step, clbk){
				current = step;
				actions.makeStep(clbk)
			},

			redo : function(clbk){
				actions.makeStep(function(){

				})
			},

			next : function(clbk){

				if (current) {
					current = steps[current].nextindex

					if(typeof current == 'function') current = current()
				}
				else{
					current = steps.settings.id

					var me = self.psdk.userInfo.getmy()
					var account = self.app.platform.actions.getCurrentAccount()

					if (me/* && me.relay && (account && !account.unspents.willChange && !account.unspents.value.length)*/){
						
						current = steps.bloggers.id
					}
					else{
						current = steps.settings.id
					}
					
				}

				if(!current) return

				actions.makeStep(function(){

				})
			},

			makeStep : function(clbk){

				var step = steps[current];

				if (step){			

					actions.preloader(true)

					setTimeout(() => {
						step.prev(function(){

							if(!el.c){
	
								return
							}
							window.rifticker.add(() => {
								
							})
	
							renders.step(step, function(_el){

								window.rifticker.add(() => {
									_scrollTop(_el, scrollel)
									actions.preloader(false)
									el.c.attr('step', step.id)
									step.after(_el)
								})

							})
	
						})
					}, 300)

					

				}
				else
				{
				}

					
			},

			testqrcodeandkey : function(hm, clbk){

				var keyPair =  self.app.user.keysFromMnemo(trim(hm))  

				var mk = keyPair.privateKey.toString('hex');

				var qrcode = renders.qrcode(el.c.find('.hiddenqrcode'), mk)

				var src = qrcode._oDrawing._oContext.canvas.toDataURL("image/jpeg");

				grayscaleImage(src, function(image){

					bfqrscanner.q.callback = function(data){

						if(data == 'error decoding QR Code'){

							if(clbk)
								clbk(false)
							
						}
						else
						{
							if(clbk)
								clbk(true)
							
						}
					}

					bfqrscanner.q.decode(image)
					
				})

			},

			generate : function(clbk){

				if(k.mnemonicKey){

					if (clbk)
						clbk()

				}
				else{
					var key = bitcoin.bip39.generateMnemonic();

					k.mnemonicKey = key;

					var keys = self.app.user.keysFromMnemo(k.mnemonicKey)

					k.mainAddress = app.platform.sdk.address.pnetsimple(keys.publicKey).address;

					k.mk = keys.privateKey.toString('hex');

					if (clbk)
						clbk()
				
				}
				
				
			},

			waitgeneration : function(clbk){				

				retry(function(){

					if(k.mnemonicKey || k.mk) return true;

				}, clbk, 40)

				
			}

		}

		var events = {

			showprofile : function(){

				var user = $(this).closest('.user');
				var address = user.attr('address');

				if (isMobile()){

					actions.showprofile(address);

				} else {

					setTimeout(function(){

						user.addClass('showMore')

					}, 0)


				}
			},


			hideprofiles : function(e){

				var user = $(e.target).closest('.user');
				var isShowed = user.hasClass('showMore');
				var address = user.attr('address');

				$(this).find('.user').each(function(i, user){
					
					var user = $(this);

					if (!(isShowed && user.attr('address') === address)){
						user.removeClass('showMore')
					}

				});


			},
			


			unsubscribe : function(){

				var address = $(this).closest('.user').attr('address')

				actions.unsubscribe(address)
			},

			subscribe : function(){
				
				var address = $(this).closest('.user').attr('address');			

				actions.subscribe(address);
			},

	
		}

		var renders = {
			qrcode : function(el, m){

				var qrcode = new QRCode(el[0], {
					text: m,
					width: 256,
					height: 256
				});

				return qrcode

			},

			step : function(step, clbk){

				el.c.find('.step').removeClass('active');

				var _el = el.c.find('.step .stepBody');

				renders[step.render](_el, function(_el){

					if (clbk)
						clbk(_el)
				})

			},

			welcome : function(el, clbk){
				self.shell({

					name :  'welcome',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			bloggers : function(el, clbk){

				self.shell({

					name :  'bloggers',
					el :   el,
					data : {
						addresses: steps.bloggers.current,
						subscribe : subscribe
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			categories : function(el, clbk){

				var k =  self.app.localization.key;

				if(!self.sdk.categories.data.all[k]) k = 'en';

				var categories = self.sdk.categories.data.all[k].filter(function(k){
					return k.id !== 'c71'
				})

				categories = _.map(categories, function(k){
					var withIcon = categoryIcons.find(function(ki){
						return ki.id === k.id;
					})

					if (withIcon){
						k.icon = withIcon.icon;
					}

					return k;
				})

				var username = (self.psdk.userInfo.getmy() || {}).name

				self.shell({

					name :  'categories',
					el :   el,
					data : {
						categories: categories,
						username : username
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			settings : function(_el, clbk){

				self.shell({

					name :  'useroptions',
					el :   _el,
					data : {
					},

					insertimmediately : true

				}, function(_p){

					self.nav.api.load({

						open : true,
						id : 'test',
						el : _p.el.find('.useroptions'),
	
						essenseData : {
							wizard : true,
	
							events : function(events){
								_p.el.find('.elpanel .save').on('click', events.save)
							},
	
							//panel : el.panel,
						
							presave : function(clbk){
	
								actions.generate(function(){
	
									self.app.user.isState(function(state){
	
										self.sdk.registrations.add(k.mainAddress, 1)
	
										if(!state){
	
											actions.signin(function(){
	
												var account = self.app.platform.actions.addAccount(self.app.user.address.value)
													account.setKeys(app.user.keys())
	
												if(clbk) clbk()
											})	
	
										}
										else{

											
	
											if(clbk) clbk()
										}
									})
									
								})
	
							},
	
							relay : function(){
								return k.mainAddress
							},
	
							success : function(userInfo){
	
								k.info = userInfo
	
								self.sdk.registrations.add(k.mainAddress, 2)
	
								state.save()
	
								actions.next()

								try{
									localStorage['needshowkey_' + self.app.user.address.value] = true
								}catch(e){

								}
	
							}
						},
						
						clbk : function(e, p){
	
							ext = p

							setTimeout(() => {
								window.rifticker.add(() => {
									_p.el.find('.elpanel').removeClass('hidden')

									if (clbk)
										clbk(_el);

								})
								
							}, 300);
	
							
	
						}
	
					})


					

				})
				

			}
		}


		var state = {
			save : function(){
				
			},
			load : function(){
				
			}
		}

		var initEvents = function(p){
			
			el.c.find('.gotohasaccount').on('click', function(){
				self.nav.api.loadSameThis('authorization', p)
			})

		}

		var make = function(){
			self.app.user.isState(function(state){

				if(!state){

					/*setTimeout(function(){
						actions.generate(function(){
						})
					}, 300)	*/
					
				}
				else{

					k = {};
					k.mainAddress = self.app.user.address.value
					k.mk = self.app.user.private.value.toString('hex');
				}

				actions.next();
			})
			

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				if (p.state && self.app.platform.psdk.userState.getmy()){
					
					self.app.nav.api.load({
						open : true,
						href : 'index',
						history : true
					})

					return
				}

				gliperror = false;

				k = {}

				subscribe = []

				essenseData = deep(p, 'settings.essenseData') || {}

				current = null;

				var data = {
					steps : steps,
					inauth : deep(p, 'settings.essenseData.inauth') || false
				};

				//regproxy = self.app.api.get.byid('pocketnet.app:8899:8099')

				try {
					if (localStorage['regproxy']){
						regproxy = self.app.api.get.byid(localStorage['regproxy'])
					}
				}
				catch (e) { }


				self.app.api.get.proxywithwallet().then(r => {

					if(r && !regproxy) {
						regproxy = r
					}

					if (regproxy){
						try {
							localStorage['regproxy'] = regproxy.id
						}
						catch (e) { }
						
					}

					clbk(data);
				}).catch(e => {
					clbk(data);
				})

			},

			destroy : function(){
				//window.removeEventListener('resize', events.width)

				actions.subscribeList()

				self.app.el.app.removeClass('default-scroll')

				delete self.app.errors.clbks.registration

				if (ext) 
					ext.destroy()

				ext = null

				gliperror = false;

				k = {}

				if(el.c) el.c.empty()

				el = {};

				essenseData = {}

				//self.app.platform.ui.showkeyafterregistration()

			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				//el.panel = el.c.find('.panelWrapper')

				initialParameters = p;

				scrollel = el.c.closest('.wndcontent')

				if(!scrollel.length) scrollel = null;

				initEvents(p);
				
				make();

				self.app.Logger.info({
					actionId: 'USER_STARTED_REGISTRATION',
				});

				p.clbk(null, p);

			
			},
			wnd : {
				class : 'withoutButtons regwindow normalizedmobile maxheight'
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = registration;
}
else{

	app.modules.registration = {};
	app.modules.registration.module = registration;

}