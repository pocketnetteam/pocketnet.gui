var registration = (function(){

	var self = new nModule();

	var essenses = {};


	var Essense = function(p){

		var primary = deep(p, 'history');

		var el = {}, k = {}, needcaptcha = false, gliperror = false, essenseData, initialParameters, ext = null;

		var addresses = [
			{
				"hash": "ea9b879c472873c50fc4c1a50d3957e200e736ca7fb697fed0d8f2b72c7c1880",
				"address": "P8boyun9yF6QYn1fjGC1WABt4BQUL4STeh",
				"id": 1329587,
				"name": "INFOWARS_OFFICIAL",
				"i": "https://i.imgur.com/Am5PPeX.jpg",
				"b": "[]",
				"r": "",
				"postcnt": 5055,
				"dltdcnt": 2,
				"reputation": 6391.8,
				"subscribes_count": 2,
				"subscribers_count": 975,
				"blockings_count": 0,
				"likers_count": 334,
				"k": "037faa6b82d0a917e5ddb091c7f58c06c22d5851e2bc20a056f7029e4130b3b700,03bf1a6d707deba8ae8ade767fae5b7d8d4dd1794b8b1407d41e90ddd19f6e2dcc,031f77fd00d7d5b3a6251684cc4ae5fab26fc2562d4c071d14ea62a490ab77fa3b,022d5c501068159b86e13d8859bb9c20eba6e2a854f2170d3c29f6cf8f20d646ba,0306ee2209acbcbafd8413a9380be346a9cd64dbc3e9b745e16fa7999ea6a57bab,0399da34d5b2f5b6f351aea7ce0ba7bbedcb5dee383efd814537a11bc30981678e,023ae6c5342fc7d467eaf7fc28a97175cb845c1f61fa86944083b951867e840110,03022af56138fa1f863842b11a1095fd6682cf4eb7610492d3b45db245e32d483d,029c0596b636b0a76946bdd8e20c930ba1e13bf0dec36caaef833f02f0e13db014,02d95283d4ca5c4054ed84357847f2a9cf3e0d6d1821d9b3646c65d89dbe80bc8e,025c08e96050b89eb90577e5ddaf4c4d01e1fdfe41fb3a4a48ed7d58c454209a02,02a7e16554460101f245ca7696c6cc563ba7181f8a89fa9d7c2f6df94d8c6daec8",
				"a": "OFFICIAL%20INFOWARS%20-%20Home%20of%20the%20most%20banned%20information%20network%20on%20the%20internet!",
				"l": "en",
				"s": "FreeWorldNews.TV",
				"update": 1625785772,
				"regdate": 1622833581,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "7ce20cfe08bc44efad01222cac11d39b9b582a3eb80287921fd69d2b8e32fb88",
				"address": "P9eLPo3gXUqBr7wgxDSSLNfyNMyeDua7cn",
				"id": 4400025,
				"name": "SGTreport",
				"i": "https://i.imgur.com/MNChXgo.jpg",
				"b": "[\"[]\"]",
				"r": "",
				"postcnt": 68,
				"dltdcnt": 0,
				"reputation": 1034.8,
				"subscribes_count": 0,
				"subscribers_count": 846,
				"blockings_count": 0,
				"likers_count": 118,
				"k": "02f2e2595215181c662945ebd5a97ef4cd20a3803c3e0e275d0f2011f06539053c,03a5b1c20bb386026489570639be2069f2211ac7a08108f201a2ba9ba35d90329a,02d63292cc52d183b2b0a47d41a614588c91a85d0102d69d00d8bc186454f5c9c7,036185856eb3406b73a084955db150901cc24c29240f5c41d5982c58f8c8e8ff0b,033ea89456d11e4dc8491bff5e5e0c98d49c7a991d0a99f4f3a0ca8ddb6def456e,0379ff92b92559f26081a3135d192c7613471b2f9a5dcaf9fd5118cc69a9541f08,02e89d998707b246bf13d3af3faa1865e57be9b243e777418039807630a12c7a5d,03a54f5da63b64ffdccf4fa0ddca290247dfa3cb4486130ac08cf69074055d7367,039ed3807111b10f8511726d96c713fbac64f85d8e7084496e5215d992e61cc9a7,023abcfdf9ed106edc5d1aced76e474004f08aa9ed983ffb64be5ba40a8a71e77a,02e3c9df9456fe748081f1bb8f1d83507fae3649e8c591f9585a491159f62a8b5f,038cad3953689332848133a57612a61adb0d314869c39f34dc7bb2a5310704cf9c",
				"a": "SGT%20Report%20is%20the%20antidote%20to%20corporate%20propaganda%20and%20mockingbird%20mainstream%20media%20lies%2C%20founded%20by%20Sean%20(SGT)%20in%202010.",
				"l": "en",
				"s": "https%3A%2F%2Fwww.sgtreport.com%2F",
				"update": 1648061950,
				"regdate": 1648060003,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "a3dba4baae5346cbbba0643f70f5704ddbadeb426b35d45884aa0ee9d80a45ac",
				"address": "PAVjp9nsNtgzUNF1VkUd74YzLaQHpv4g7v",
				"id": 5034746,
				"name": "ivoryhecker",
				"i": "https://i.imgur.com/tvBzyEY.jpg",
				"b": "[{\"currency\":\"btc\",\"address\":\"3FkgCcpV3s8RemCpwEAPUgPSBDeTQSesUP\"}]",
				"r": "",
				"postcnt": 27,
				"dltdcnt": 0,
				"reputation": 206,
				"subscribes_count": 3,
				"subscribers_count": 84,
				"blockings_count": 0,
				"likers_count": 50,
				"k": "0228bdd032dfe8ced9fdfc13af22504b14d7e419b501a558e60f9046f56b9608c4,03a460d4fb6281967df9a5f0c427fd012a9649bd50490aedac3a228b682a8c063d,0326d32f1595d793a920f76aea432aef5c366a0056946f9a37eaf41d238938cd26,026421643bc75a8b37522a4ceb60a15d2894013b92668e16f62bd1266972656b90,0267ac973f9d32a52b9216f95211145f314c22aab48e469d78efae3c1a018021de,02f0c271636e1f1e753e77f0bf13f258df0d84b835f363444e1e552ff30e077e0b,02031629653ca036b889dc5a8f7d8d1f9bdfc274c237cf1b97df9fbab80606b451,02d887da081894db2aaa9d044f433c59cd1358fada4ce194f96d7c3bfef4d1ec01,02bed47727422ab76b76735685b39e8275d156a3bf65d352cbcf3d10b86dfba452,026b7074cc360ad4ea050f1862806c565d0ff9f70daa7492d2c8c23649cd1bc5b0,03737deb3e8f92b74b37564a70764234fb6947a303ba8b7701a52ee0ab9f96a964,02cfb3014a563d13a1654c42a2512ccd08a11b9f34430d588eb88f65867952443c",
				"a": "Information%20is%20power.%20Societies%20that%20want%20to%20subvert%20freedom%20must%20first%20subvert%20the%20free%20press.",
				"l": "en",
				"s": "ivoryhecker.com",
				"update": 1651511976,
				"regdate": 1651509646,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "3420dcb63119cea3bfc4e15ab3cc0d9a9c88075f64efb21fee3ada4bcee3505a",
				"address": "PGQh5JW5c1shJTpi3iC2dkvov1pUqs1SqX",
				"id": 208333,
				"name": "Nanook",
				"i": "https://i.imgur.com/CuP0YCh.jpg",
				"b": "[]",
				"r": "",
				"postcnt": 5267,
				"dltdcnt": 1,
				"reputation": 13426.7,
				"subscribes_count": 22,
				"subscribers_count": 291,
				"blockings_count": 450,
				"likers_count": 755,
				"k": "02babb6766a47d61dc0c717ffb3bf7db544384d5872528c6c0ebb5df8457f7501c,028241907b341a40a0f8f31e2ca15b93ec2d0a4a84ce67514fbaf38ef451dda5e4,025330fee59d17a4b3bf1871e7593290e6a93137fc4f4c6e66e5a13256792372a6,0334db8848acbfa3f89b41086ca222c3360de70288db46262cad9093b206e9dfdb,020215996a204c29f5739721f7486bbabe67091aa383b178bae4ec493449d86340,03a41066b530ce99321abddc5633ee6dc3142e365ebc0b45398f1b563c4fb1e9ed,02ae174c316ef4841906e35710a581133b449a87b07b18261737676eaa8d0a79cc,0226421dfd34543ce4f6cd53bb8f8a99dfd2668cec36c78d78bf6bd30aa5b19e18,03001c64c305873fd5ecc7ea748011afdf44ead674a6d5bcc36559618d8194ec11,03e1bbe3b62f49128a1a8713b9650e330e3cc1b44c23b35a333a19d32a1728d3a5,030d92b1e52e84a820ef444030bf53e40dc75557042221ceee59883a0dc9e4c157,03f809c2af12d511445f3f179198956421271f36e4d06b6b22cd102d139ae7ff99",
				"a": "Owner%20of%20Eskimo%20North%20Linux%20Shells%20and%20Internet%20Hosting%2C%20friendica.eskimo.com%20friendica%20node.",
				"l": "en",
				"s": "https%3A%2F%2Fwww.eskimo.com%2F",
				"update": 1628721996,
				"regdate": 1573266979,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "dd867068895e2cdf55dcaa84f759fd3bcdab721248251a4a9827a86c193951b0",
				"address": "PKSV2KXCdEtTtYb8rF3xMMgiiKe1oDstXR",
				"id": 1350115,
				"name": "SarahWestall",
				"i": "https://i.imgur.com/EFNuHiI.jpg",
				"b": "[]",
				"r": "",
				"postcnt": 60,
				"dltdcnt": 11,
				"reputation": 424.3,
				"subscribes_count": 0,
				"subscribers_count": 780,
				"blockings_count": 0,
				"likers_count": 91,
				"k": "03ebd04c25a1cb8ffc98891745b2812cb3cfc981b7f737ee6e4516af4814ade663,03e6ff6fb3cc9c9ff6fa7bab9cca5dfdda2aad1048baa34ab95e928f67e63350da,0360b69d04876bf745c78c957df68df632dc2212030a51e497366c2ad31426bb88,030a7e1f2e8a2b688551d1e978e029bf971ff53c1fa5b6aed4860c26e26aff96b3,025b29c1bb9cb12a83458ce1e4933a66c05e1a32e329e6a4f1d1955a31ebf638d4,02ae3f26d426e91ee15e48624069ecd6eff8af8d1b8cc5b4c754c1d744bfa67940,023c6a7006fa47072c857155a46625e2a10d80a3bb4c53b0db4493f0f70e525d09,02d76265b410041080ff8ea57c069c24771861ba09fb6b7228b953283514939c32,028ea241a90b9022eea98346f6cbcabaf49fab022c6897388d9f0ea3495c4b81f7,037b3c19c918fe2c206625b3aa27140c78299dd5a87ce7515c36bd057e0684a146,0388e626af2dfee0068bf02d06585c0b8a0fddf252f6444e32b3eae87b67e05636,02d7588062bf59805022bfa880bee55bb8d7de5f476d5a8f72e01c3d7aa1975ab6",
				"a": "Independent%20Journalism%0ACourageous%20coverage%20of%20topics%20that%20matter",
				"l": "en",
				"s": "sarahwestall.com",
				"update": 1644415647,
				"regdate": 1623348030,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "2084fde439f284d93e7117e4b2738234ee049698039d7bcadfbf7a0b5e2cce26",
				"address": "PLJvEixJkj85C4jHM3mt5u1ATwZE9zgFaA",
				"id": 1258,
				"name": "Dani",
				"i": "https://i.imgur.com/plGLrTG.jpg",
				"b": "[]",
				"r": "",
				"postcnt": 2827,
				"dltdcnt": 1,
				"reputation": 35219.1,
				"subscribes_count": 246,
				"subscribers_count": 1542,
				"blockings_count": 1,
				"likers_count": 1145,
				"k": "037fad364b565a171438dfb777d61e04468cda2821a3fec02f4c49a67c2e193902,030c9ce2e84ca8ba66b881f6ad00c546c9d2cb81cfc2133e080849735c8bb4b287,02d4ad679c2342233bf2678f68f5f5dd521e3b6b5c372a58697d7d0cac5aee0af3,029823b466d18093a778a11da4104935caf7078be7c14c9e9b6fef744121e848ed,02098909d4ca22fc9d8a88e5441010fde015dad6f3d01e45dcc6afdd029c2a4bdf,032f4d83e58e62135960ec65ae4585f48c8262dcfdf1a3bf7a750b82d5ed0d9878,03a87c35109becfe2b1f6eb47501ffe67d1306d719c1687c8131f3023bedcdaa0c,02f8093c1202ff2da70329f21cfb984b4dddc12c0ad49228f7cc2ce6153939ae6b,035bafe92be03fd81a03ae12d9aef69f3aabc04f3106be91d138f584acb409c879,03790462f32f0e7799f66b662ad0021b4d06f5e604df103c791d6d9b4122e6d319,037d65565c2d4e25bdffcfcea2038f13a686a3442468f3b4878eccb552620efbdb,02f4ae16c373d8d005dc6ed6b5d5ce2e9f5ea2dcfb157626b33366d200bc11b694",
				"a": "Independent%20journalist%2C%20researcher%20and%20caffeine%20addict",
				"l": "en",
				"s": "www.rts.earth%0Awww.unfuckersunite.com%0Awww.gaeasgarden.com",
				"update": 1628697382,
				"regdate": 1553193578,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "6a6fe4b4f360d712140bc491cb881ebf56ff452d4e1c10339ea6bce3734e863c",
				"address": "PVpSK2qQXmG1SjAMJVMAMRLUkrzMjsJouL",
				"id": 1325317,
				"name": "Jerm",
				"i": "https://i.imgur.com/w6tDlzD.jpg",
				"b": "[{\"currency\":\"btc\",\"address\":\"bc1q9a9hjpwxx0rc532uczt8cmkqy9udkqz8lt5n66\"}]",
				"r": "",
				"postcnt": 439,
				"dltdcnt": 7,
				"reputation": 1643,
				"subscribes_count": 6,
				"subscribers_count": 1138,
				"blockings_count": 6,
				"likers_count": 241,
				"k": "0315b831d15b7d2367c1d7d4cb3174cf419700e9a9c1d08f143447eb10be1adb3e,0273f5eeeb51e1d7df8efb0a2b72710bad3e6c892a5b350b007b1991c31b914bcd,0251a1e25f76243e03133079a3f22cd0fecb4aaa638be9b2950b280a8fd171d4bd,02f9393b843c35c22259eeadee53fe02a10c5aace10036ebbe02499c5b5c428c80,0257d71c593f7778da8d4f4c84d054e2ed0e45bbdee022b792f3c93d9562d72837,0201b13cd621782473970ebbb49f69962e4f74e16ba49bbd3b860e8ad251cb5493,023acd46a8458d1537c6606ce092aa537fa50c04678060c96a0603c2361416f39b,02b31ae9dc4a0c0f61bbe1b7a5514fe85a0a89bed9bb033752720348ab3925441c,02d30d84be5f652f5f2f7a03c9039394dd576ff68d6579f4f54ed3701dafa6bb04,03c92b491a53965018007b9e2c2e6f6701cfee959478cb414b18fa73bfa0cf1660,0255d4f52e001779d9378da1f0cb61d61e4f90e496f27bb2236d7c862df0f40e4b,0313fdb07c6ecf47c61fa524d73cb6a7280aeae986487e82eeb917bb16b5f656a7",
				"a": "Cartoonist%20and%20podcast%20host",
				"l": "en",
				"s": "https%3A%2F%2Fjermwarfare.com",
				"update": 1638108852,
				"regdate": 1622729041,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "8b47da78320860bff928d12bfeccc9b57d5d3da9f13d704d6aed21b4753c56cd",
				"address": "PWvS62zsRm96Bw63qo9Adif97U18mLCpfN",
				"id": 398847,
				"name": "HolisticHealth",
				"i": "https://i.imgur.com/KTzSFNa.jpg",
				"b": "[\"[\\\"[]\\\"]\"]",
				"r": "",
				"postcnt": 10068,
				"dltdcnt": 0,
				"reputation": 25117.5,
				"subscribes_count": 4726,
				"subscribers_count": 1321,
				"blockings_count": 5,
				"likers_count": 807,
				"k": "03997454b69053517f76204ad4949a65a4dd8c0dfaf8c25b1434b0491987d7e1ec,03b050cc77cb815cdfe75c47b44c01dc73f00810e451649b1f0a5727b60decf5cd,02176f69d185db274ad922b5fc027e7fa8dbf53f7a62af9b39203058c36565f55f,02b3e216f5511f3caf80fe957f7c7419a137da6ef12338e91e3418e6efb2a07b7e,03a2446d678470ac80eabc8c18109fbc081c238ac1be2525d57570443043e280d8,03e6dc28769d016c73b9550fbe6851d3b21b5ce0772f7656d7138ffac9d0a41f14,03edd447222ea501dd18f71eaf2804f2a49c29dcd0bf20443727f736a4661906d6,02b773d4bd459b1747f0c21330e30e239a12137c17e7417c1dc9991faad621530c,0290fa48e2bf51252a382fe9ccb254877b9a4c139ab08fcc673264082128ede0c4,0217b7787cd382e4b6a3d43eb7c915b2ddaafe08e0b2fb1e5454380e365f3f07d1,0320184cfe578d52c3db332cc5f8e0ef53fd37610dad2fb3746a03d1ab16077add,03b18e1134056020db89781a0d35c25fee3894b7dd604c504fe8c86cce61099256",
				"a": "https%3A%2F%2FBerkeyWaterFilter.us%2F%20Buy%20American%20and%20support%20Veterans!%20Holistic%20Health%20Alternative%20Medicine%20Natural%20Healing%20Fitness%2C%20Medic%2C%20Free%20Thinker%2C%20Truth%20Seeker%2C%20Christian%2C%20Unvaxxed%20Pureblood%2C%20Constitutionalist%2C%20USMC%20Veteran%2C%20Self%20Sovereign%2C%20Prepper%2C%20Open%20Minded%2C%20FE%2C%20Peace%2C%20Love%2C%20Light%2C%20Kindness%2C%20Helping%20Others%2C%20Animal%20Lover%2C%20Metaphysics%2C%20Spirituality%2C%20Sowing%20the%20Seeds%20of%20Harmony%20for%20a%20Better%20World%20for%20All%20of%20US.",
				"l": "en",
				"s": "https%3A%2F%2Femfprotection.one%2F",
				"update": 1653497723,
				"regdate": 1585672465,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "c61c60e07b2a8c198a27b2555c3428777aab95e3b25a7e93d736e329d7225d21",
				"address": "PXXaSczoZcuJEwxYKhaC9pV1JBvwi6UjSw",
				"id": 466,
				"name": "DanDicksPFT",
				"i": "https://i.imgur.com/U7tLlvN.jpg",
				"b": "[\"[{\\\"currency\\\":\\\"btc\\\",\\\"address\\\":\\\" 13oNiHUNGn9vdfv7MT5kjwe7np9bwf5ccv\\\"},{\\\"currency\\\":\\\"ltc\\\",\\\"address\\\":\\\"LVVaVCfNN25AuU1Ex2s4tX2Ze3iCig2kRo\\\"}]\"]",
				"r": "",
				"postcnt": 380,
				"dltdcnt": 0,
				"reputation": 5427.4,
				"subscribes_count": 1,
				"subscribers_count": 1707,
				"blockings_count": 0,
				"likers_count": 540,
				"k": "03b6feb1895bd5ab0f9cfe582ae7a999496e1816aa41b0b0f5503f827fa8127523,03fe60448a0290dc58754cd0838c8d9169e6951d3fd5f6bb3f057e8b1e64ef5fbe,03e0df281585e4029af9518c87c8136fad825c52b582e3a5bd653c1e8329acebcc,029bacaa630be6bb1599b59e92b28bd92c79e8c7fa3896970c5255ae918e436c3b,02bec573b7f34274a5efaca30c9e5053015ca5b624529884ae817520e836018e78,03146abb84300b22be9318a6b7b9e2dcf555a80fa3ad72ec7c86c04f3542842233,03e249901d5f4b408f200dae741921eea29d58c8568a6145b5ec37646b59e96154,0348cae3dc52abf3ee64cd50d24a244dcdcb4af7ee7029effa5f0c7d1a958a2854,03b622567b392b8cffb6d6a0d4482838b8e987e62b1c131f1480fab02ada32bda6,03e95c69cb1e239a58e1fc6eeab5992a6831274d407eae693e080a7b9eeeba80c7,031d8459bfd01cd4b962bc26329291d9fcbdb7f548f989366a1fc34c7e56d8047e,023f692e000d9e16251072758a207e4419b4e36c7f7cff22e061efdccff0f46e4d",
				"a": "PRESS%20FOR%20TRUTH%3A%0A%0ADan%20Dicks%20is%20an%20investigative%20journalist%20and%20award%20winning%20documentary%20film%20maker.%20He%20is%20also%20the%20founder%20of%20an%20independent%20media%20outlet%20known%20as%20Press%20For%20Truth%20which%20produces%20videos%20and%20films%20that%20directly%20challenges%20the%20mainstream%20media's%20narratives%20of%20events%20that%20shape%20our%20world.%20Dan%20frequently%20travels%20the%20world%20covering%20stories%20and%20events%20that%20the%20mainstream%20media%20is%20not%20willing%20to%20touch%20or%20puts%20their%20heavily%20biased%20spin%20on.%20He%20is%20also%20a%20musician%20and%20wrote%20and%20performed%20the%20music%20for%20all%20five%20of%20his%20films.%20As%20founder%20and%20owner%20of%20Press%20For%20Truth%20Dan%20continues%20to%20create%20thought%20provoking%20videos%20and%20documentary%20films%20for%20his%20website%20pressfortruth.ca.",
				"l": "en",
				"s": "httpspressfortruth.ca",
				"update": 1633479417,
				"regdate": 1551461160,
				"flags": {},
				"firstFlags": {}
			},
			{
				"hash": "54e6c1c1c3a558a110bf3cd2deb72233485932b09e3a115cc3d7603fc7fd7eca",
				"address": "PXsjQA3fYDGCr1WwmNTNmrs9N7VA18gVuB",
				"id": 135765,
				"name": "GunsAndGirls",
				"i": "https://i.imgur.com/1kajfXV.jpg",
				"b": "[]",
				"r": "",
				"postcnt": 873,
				"dltdcnt": 0,
				"reputation": 17880.4,
				"subscribes_count": 243,
				"subscribers_count": 561,
				"blockings_count": 94,
				"likers_count": 546,
				"k": "022e82ae08276ba0bf118fa21516785102b3eba4f5dfd76aa62b059e5d2b774789,02f4add4fc776b1b1172b16af782cfaba072516da538f83bd129c2821d470dbbd3,036110e10c200954532e5fa0d5c2cfc13bbcecec38098796940277f7f58bb4692f,02c80256cab1bf6f1accf437107460974a7b751e62609087e9a36345bcddb0475a,02649446be78cefbed26f994a3b8c6f131aec5f04f1016f2a5b0be002a44b5de57,0292f0dc7588db6c3edb4125ac85823ce91e609aa5840f73f799d95f4b0c6521f0,03b54cda88b594c63275e57c883aae7df1b65f6cd1cd4e15c9bed91e3fdc9e3b29,02d16b05413a19cc3f71fd4a77d4c66f5a28aba08c6ee26bc53ba5884c995213df,022fdb2d5961a3ef4b20faac4b4ad83cbaf4267043beb906cc1baa8b07a1d7f082,02818ba70c93cdc23ede5d340b9c7d5ab1a24f02e798c3f4c0ad29c07585502dd9,03510ac9c9b1d65bd9ff75cdd6f6c638a91fdeb72d894221abfb75dde9a2e5f7a9,02656c33e4a1f6ca44f5746a4fc49b12390098d0a28dc819b44a5277fb83814f63",
				"a": "Because%20when%20SHTF%2C%20you%20want%20a%20good%20one%20of%20each%20at%20your%20side.",
				"l": "en",
				"update": 1628618718,
				"regdate": 1568928883,
				"flags": {},
				"firstFlags": {}
			}
		];

		var prodBloggers = [];
		
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

		var getproxyoptions = function(){

			if(regproxy){
				return {
					proxy : regproxy.id
				}
			}

			return {}
		}

		var steps = {
			settings : {
				id : 'settings',
				nextindex : 'captcha',

				prev : function(clbk){

					clbk()
			
				},

				render : 'settings',

				after : function(el, pel){

					
				},

				next : true				
			},

			captcha : {
				id : 'captcha',
				render : 'captcha',
				nextindex : function(){
					if(self.app.curation()){
						return 'welcome'
					}

					
					var bloggersEn = [
						'PKSV2KXCdEtTtYb8rF3xMMgiiKe1oDstXR', 
						'PXXaSczoZcuJEwxYKhaC9pV1JBvwi6UjSw', 
						'P9eLPo3gXUqBr7wgxDSSLNfyNMyeDua7cn',
						'PVpSK2qQXmG1SjAMJVMAMRLUkrzMjsJouL',
						'PLJvEixJkj85C4jHM3mt5u1ATwZE9zgFaA',
						'P8boyun9yF6QYn1fjGC1WABt4BQUL4STeh',
						'PAVjp9nsNtgzUNF1VkUd74YzLaQHpv4g7v',
						'PWvS62zsRm96Bw63qo9Adif97U18mLCpfN',
						'PGQh5JW5c1shJTpi3iC2dkvov1pUqs1SqX',
						'PXsjQA3fYDGCr1WwmNTNmrs9N7VA18gVuB',
						"PQkNpRfXbCGXJ2o1mRfsJMvMtsvq3uvZU9",
						'PUhvX53ueD2Sxa3q7av83vNcEHuS8M7kRS',
						'PCfvhqHEYG3zdWXvLJrjPPDVK2H8qwwXn5',
						'PGegspsgRqvMiZCP8PGufKMYBk3yekDaEE',
						'PB8wu7hQwo5xMsVG4F4HshrW39t2Y4eN37',
						'PKYwaiikhUoPWmpWmYec4Xf3TPWwJQCqUt',
						'PSBhEi8AUasemizUHyJ64t6xXonsxwp73y',
						'PLZsQmsRUDMJGc61pGMLdDQ58UuqQ8kU5Z',
						'PQDxqrJqKM15weq1mbunEqK2uVNvZy1Z6d',
						'PDUWW57W8DoV1dMTQYsrkwg66xEuaNckbd',
						'PRH3aKqRb6UWcJE5EnwVvhmHAVGbT5D6nE',
						'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd',
					];

					var bloggersRu = [
						'PX7pM9CG9MhMCqJQD52ahLyqSssNK2WxEv',
						'PA6biduJbWcQ97n5jz2jUqWHtenLpWTH7s',
						'PCjhy4t6B2b5xeqVoJcN51XkhUqAXBuaq4',
						'PXupozgNg1Ee6Nrbapj8DEfMGCVgWi4GB1',
						'P9KXb7sS2JDjV5jnXu4t2WwwbvzYeu6yds',
						'PUXG7rfX19Xoco1FXjXBW8qt6NEZpp8maL',
						'PKwa3jVZXHpaVgG89WvnM8vBfpp745GGNN',
						'PLTjskW3xi3oaLnyqTAwZQa1iAeQ3PzTuF',
						'PDXGoy43t5RSqJY1UJBgswBu6phtW8Knwa',
						'PSBePd5Tx5KG9vxwAzbaDTfjzDbq1GUTYw',
						'PTft97ycE3N6ZKgvixdpbYj8qPxzCe2CxG',
						'PJuW8LKT7LZY88fP7WM35NJURh3rAaeU3o',
						'PBGqJGSrdsBrEsLmiAaeH22bxGg8irX3gC',
						'PVjvMwapTA29biRTsksXUBuVVf2HVwY7ps',
						'PTMFZXMXYFjiN1UuSV4ZckepyEFVWMm6Zy',
						'PWbYmgG6PzqhrNDtuFmWrSaLHTDMwZWc26',
						'P9VXZPHxop1ya7oP1kypubWwGvfYw8QQNK',
						'PQUj7dS2QpamP9vapARCYaJaSqjXpcZk8p',
						'PLfHpn9nJe9hKJ7UqvAuPsPUu9RjNpyTrN',
						'PARV591XENALBB5ApkR7WcQPhEZtLHfi2A',
						'PBvkW9txHLiKtQMX642DG1SmJC2UbBX5wy',
						'P9N7jrhdsotZDz6r56ADxwxwP295HcF9QQ',
						'PJuHmJS2iw9boRhy1Y4DSbe9uNQCBedBze',
						'PMVvs8kvbskq6eVV8Q3oyjotbox9tBfvnp',
						'PTcArXMkhsKMUrzQKn2SXmaVZv4Q7sEpBt',
						'PQ4X2NQJD1ZA5Hy58ZU9eHcjpRco7ZMgTz',
						'PHtxzCKFqNEfn8N8FDAUYhUhqSL2qJJZxY',
						'PWyjwnA3Rr8Fuc6HQmcYFb3cYXDeaq679j',
						'PEnqXhQU2MxZc4bFQJ4TSaCCT3f5wbqHJZ',
						'PFCdnHww9UQLf2WQHPF8vtABgNuK4uaiXY',
						'PSXmn4k7BDwwtZkTxdgC7yq1Cwh4Di7GLK'
					]

					if (self.app.localization.key === 'en'){
						prodBloggers = bloggersEn;
						return 'bloggers';
					}

					
					if (self.app.localization.key === 'ru'){
						prodBloggers = bloggersRu;
						return 'bloggers';
					}
					
					return 'categories'
				},  

				prev : function(clbk){

					var address = self.sdk.address.pnet().address;

					var requested = self.app.settings.get(address, 'request') || "";

					if (requested){

						var regs = app.platform.sdk.registrations.storage[address];

						if (regs && (regs == 2)) {
							self.sdk.registrations.add(address, 3)
						}
						
						actions.next()

						return
					}


					balance.check(function(result){

						if (result){

							var regs = app.platform.sdk.registrations.storage[address];

							if (regs && (regs == 2)) {
								self.sdk.registrations.add(address, 3)
							}
							
							actions.next()
						}
						else
						{

						
							self.sdk.captcha[regproxy.hasHexCaptcha() ? 'getHex' : 'get'](function(captcha, error){

								if (error){

									actions.to('network')

									return
								}

								
								if (captcha.done){

									actions.preloader(true)

									balance.request(function(r){

										actions.preloader(false)

										if(r){
											actions.next()
										}

									})

								}
								else{

									steps.captcha.current = captcha

									clbk()
								}

							}, true, getproxyoptions())
						}

					}, true)

				},

				after : function(el, pel){
					/*Create canvas*/

					var hc = null

					if (regproxy.hasHexCaptcha()) {
						hc = new HexCaptcha({
							styleSheet: [
								'js/vendor/hex-captcha/css/captcha.css'
							],
							holder: '.captchaImage',
							data: {
								frames: steps.captcha.current?.frames,
								overlay: steps.captcha.current?.overlay,
								duration: 250
							}
						})
					}
					
					var input = el.find('.ucaptchainput');
					var redo = el.find('.redo')
					var save = el.find('.addCaptcha')
					var text = '';

						input.focus()

					var validate = function(v){

						if(/^[a-zA-Z0-9]{4,}$/.test(v)){
							return true;
						}
						else
						{
							return false;
						}
					}

					input.on('keyup', function(){
						text = $(this).val()

						if(validate(text)){
							save.removeClass('disabled')
						}
						else
						{
							save.addClass('disabled')
						}
					})

					input.on('focus', function(){

						if (self.app.mobileview) setTimeout(function(){
							
							if(el.c)
								_scrollTo(input, el.c.closest('.customscroll')
							
						), 200})

					})

					save.on('click', function(){


						var text = input.val()

						if (validate(text)){
							
							self.sdk.captcha.make(text, hc ? hc.angles : null, function(error, captcha){

								if (error == 'captchashots'){

									sitemessage(self.app.localization.e('e13118'))

									actions.redo()

									return
								}

								if (error == 'captchanotequal_angles'){

									sitemessage(self.app.localization.e('captchanotequal_angles'))

									return
								}

								if (error){
									sitemessage(self.app.localization.e('e13118'))

									return
								}
							
								if (captcha.done){
									
									actions.preloader(true)
									
									balance.request(function(r){

										actions.preloader(false)

										if(r){
											actions.next()
										}

									})
								}
						
							}, getproxyoptions())

						}
					})

					redo.one('click', function(){

						actions.redo()
					})
				}
			},	

			welcome : {

				id : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')

					if (essenseData.welcomepart)
						essenseData.welcomepart()

					clbk()
				},

				render : 'welcome',

				after : function(el){

					var c = false

					var clbk = function(){

						if(c) return

						c = true

						if (deep(essenseData, 'successHref') == '_this'){

							var close = deep(initialParameters, 'container.close')

							if (close)
								close();

							if (essenseData.signInClbk)
								essenseData.signInClbk();

						}
						else
						{

						
							self.nav.api.go({
								href : self.app.platform.sdk.registrations.redirect || 'index',
								history : true,
								open : true
							})	

						}

						localStorage['regproxy'] = ''

						self.app.platform.sdk.registrations.redirect = null

						if (isMobile()){
							self.app.platform.ui.showmykey({
								afterregistration : true
							})
						}
						else{
							self.app.platform.ui.showmykeyfast({
								showsavelabel : true
							})
						}
						
					}

					setTimeout(function(){

						clbk()

					}, 1500)

					el.find('.welcome').on('click', function(){

						clbk()
						
					})
				}


			},

			
			categories : {

				id : 'categories',
				nextindex : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')

					if (essenseData.welcomepart)
						essenseData.welcomepart()

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

					//self.app.platform.sdk.theme.set('black')

					if (essenseData.welcomepart)
						essenseData.welcomepart()

					var testBloggers = [
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
						'TJYKMFZKYhSpU7xT55tuR4jD8gpC1dAZ5c'
					];

					var bloggers = _.shuffle(self.app.test ? testBloggers : prodBloggers);


					self.sdk.users.get(bloggers, function(data){

						if (data && data.length){
							addresses = data;
						}
		
						clbk()

					}, true)
				},

				render : 'bloggers',

				after : function(el){

					var next = el.find('.next');

					el.on('click', '.subscribeButton', events.subscribe);
					el.on('click', '.unsubscribeButton', events.unsubscribe);

					el.on('click', '.user .iconWrapper', events.showprofile)

					next.on('click', function(){

						actions.next()
							
					})

					
				}


			},

			network : {

				id : 'network',

				prev : function(clbk){

					clbk()
				},

				render : 'network',

				after : function(el){


					self.app.errors.clbks.registration = function(){

						if(app.errors.state.proxy || app.errors.state.proxymain)  return

						if (current == 'network' && !self.app.platform.loadingWithErrors){
							actions.to('captcha')
						}

						delete self.app.errors.clbks.registration
					}
				}


			},

			moneyfail : {

				id : 'moneyfail',
	
				prev : function(clbk){
	
					clbk()
				},
	
				render : 'moneyfail',
	
				after : function(el){

					var address = self.sdk.address.pnet().address;

					var b = function(){
						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
							
							el.find('.balance').html('Balance: ' + self.app.platform.mp.coin(amount) + " PKOIN")
						
							if(amount > 0){

								var regs = app.platform.sdk.registrations.storage[address];

                                if (regs && (regs == 2)) {
                                    self.sdk.registrations.add(address, 3)
                                }
	
								if (current == 'moneyfail'){
									setTimeout(function(){
										actions.to('welcome');	
									}, 100)
									

								}
									
	
								delete self.app.platform.sdk.node.transactions.clbks.moneyfail
							}
						})
					}

					var ch = function(){

						globalpreloader(true)


						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
							
							topPreloader(100);

							setTimeout(() => {
								globalpreloader(false)
							}, 500)

							
	
							b()
							
	
						}, true)
					}
					
					b()

					el.find('.tryagain').on('click', function(){

						globalpreloader(true)

						balance.request(function(r){

							globalpreloader(false)

							if(r){
								actions.next()
							}

						})
					})
	
					el.find('.check').on('click', function(){
						ch()
					})

					self.app.platform.sdk.node.transactions.clbks.moneyfail = b
				}
	
			}

		}

		var arrange = _.map(steps, function(s, i){
			return i;
		})

		var getindex = function(current){
			return _.findIndex(arrange, function(s){
				return s == current
			})
		}

		var balance = {

			request : function(clbk){


				self.sdk.users.requestFreeMoney(function(res, err){


					var address = self.sdk.address.pnet().address;

					var requested = self.app.settings.get(address, 'request') || "";
				

					if(!res && !requested){

						if (err == 'captcha'){

							needcaptcha = true;

							if (current == 'money' || current == 'captcha'){
								actions.to('captcha')
							}

						}


						if (err == 'error' || err == 'iplimit'){

							gliperror = true

							if (current == 'money' || current == 'captcha'){
								actions.to('moneyfail')
							}

						}

						if(_.isEmpty(err)){
							actions.to('moneyfail')
						}

						if (clbk)
							clbk(false, 'err')
						
					}	
					
					else{

						self.app.settings.set(address, 'request', 'true')

						self.sdk.registrations.add(address, 3)

						//balance.follow()

						if (clbk)
							clbk(true)
					}
					
				}, getproxyoptions())	
			},

			check : function(clbk, update){

				self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

					if (clbk)
						clbk(amount > 0)
					
				}, update)

			},

			follow : function(){
				self.app.platform.sdk.node.transactions.clbks.filluser || (
				self.app.platform.sdk.node.transactions.clbks.filluser = function(){

					delete self.app.platform.sdk.node.transactions.clbks.filluser

					balance.check(function(result){

						if (result){							

							if(current == 'money'){				
								actions.next()
							}

						}	
						
						else{

							balance.follow()

						}

					})
					
				})
			}

		}

		var actions = {

			showprofile: function(address){

				if (isMobile()){

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
				}

			},

			unsubscribe : function(address, clbk){

				dialog({
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
				})

				
			},
			subscribe : function(address, clbk){

				self.app.platform.api.actions.notificationsTurnOn(address, function(tx, err){

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

				})
				 

				// self.app.platform.api.actions.subscribeWithDialog(address, function(tx, err){

				// 	if(tx){

				// 		el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')
				// 	}
				// 	else
				// 	{
				// 		self.app.platform.errorHandler(err, true)
				// 	}

				// })
			},

			preloader : function(sh){
				if(sh){
					el.c.addClass('loading')
				}
				else{
					el.c.removeClass('loading')
				}
			},

			signin : function(clbk){
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

					var me = deep(app, 'platform.sdk.user.storage.me');

					if (me && me.relay){
						current = steps.captcha.id
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

					step.prev(function(){

						if(!el.c){

							return
						}

						

						el.c.attr('step', step.id)

						renders.panel(step, function(pel){
							renders.step(step, function(el){

								actions.preloader(false)

								_scrollTop(el, scrollel)

								pel.find('.elpanel').addClass('active')
							
								step.after(el, pel)

							})

						})

					})

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

					qrscanner.q.callback = function(data){

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

					qrscanner.q.decode(image)
					
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
				var address = $(this).closest('.user').attr('address');

				actions.showprofile(address)
			},

			unsubscribe : function(){

				var address = $(this).closest('.user').attr('address')

				actions.unsubscribe(address)
			},

			subscribe : function(){
				
				var address = $(this).closest('.user').attr('address');			

				actions.subscribe(address);
			},

			width : function(){


				if(!current) return

				var activestep = steps[current]

				var _el = el.c.find('.step[step="'+activestep.id+'"] .stepBody');
				var s = _el.closest('.step');
				var line = el.c.find('.stepsWrapperLine');

				var w = s.closest('.stepsWrapper').width()

				el.c.find('.step').width(w)




				line.css('margin-left', '-' + ((getindex(current)) * w) + 'px')

				line.width(w * _.toArray(steps).length)
			
			}
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

				var _el = el.c.find('.step[step="'+step.id+'"] .stepBody');
				var s = _el.closest('.step');
				var line = el.c.find('.stepsWrapperLine');

				renders[step.render](_el, function(_el){

					var w = s.closest('.stepsWrapper').width()

					el.c.find('.step').width(w)

					
					line.width(w * _.toArray(steps).length)


					var m = '-' + (getindex(current) * w) + 'px'

					line.css('margin-left', m)
					

					s.closest('.step').addClass('active')


					if (clbk)
						clbk(_el)
				})

			},

			panel : function(step, clbk){
				self.shell({

					name :  'panel',
					el :   el.panel,
					data : {
						step : step
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			captcha : function(el, clbk){
				self.shell({

					name :  'captcha',
					el :   el,
					data : {
						captcha : steps.captcha.current,
						hexCaptcha: regproxy.hasHexCaptcha()
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			email : function(el, clbk){
				self.shell({

					name :  'email',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

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
						addresses: addresses
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

				var username = deep(app, 'platform.sdk.user.storage.me.name');

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

			moneyfail : function(el, clbk){
				self.shell({

					name :  'moneyfail',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			network : function(el, clbk){

				self.shell({

					name :  'network',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			money : function(el, clbk){


				self.shell({

					name :  'money',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			

			settings : function(_el, clbk){


				self.nav.api.load({

					open : true,
					id : 'test',
					el : _el,

					essenseData : {
						wizard : true,
						panel : el.panel,
						prepresave : function(){

						},
						presave : function(clbk){

								actions.waitgeneration(function(){


									self.app.user.isState(function(state){
	
										self.sdk.registrations.add(k.mainAddress, 1)
	
	
										if(!state){
	
											actions.signin(function(){
												if(clbk) clbk()
											})	
	
										}
										else{
											self.sdk.registrations.add(k.mainAddress, 1)
	
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
						}
					},
					
					clbk : function(e, p){

						ext = p

						if (clbk)
							clbk(_el);

					}

				})

			}
		}


		var state = {
			save : function(){
				
			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			window.addEventListener('resize', events.width)

			el.c.find('.gotohasaccount').on('click', function(){

				if (essenseData.close) essenseData.close()

				self.nav.api.go({
					href : 'authorization',
					history : true,
					open : true
				})
			})

		}

		var make = function(){
			self.app.user.isState(function(state){

				if(!state){
					setTimeout(function(){
						actions.generate(function(){
						})
					}, 1000)	
					

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

				if (p.state && !self.user.validateVay()){
					
					self.app.nav.api.load({
						open : true,
						href : 'index',
						history : true
					})

					return
				}

				needcaptcha = false;
				gliperror = false;

				k = {}

				essenseData = deep(p, 'settings.essenseData') || {}

				current = null;

				var data = {
					steps : steps,
					inauth : deep(p, 'settings.essenseData.inauth') || false
				};

				regproxy = self.app.api.get.byid('1.pocketnet.app:8899:8099')

				if (localStorage['regproxy']){
					regproxy = self.app.api.get.byid(localStorage['regproxy'])
				}

				self.app.api.get.proxywithwallet().then(r => {
					//const isHex = (p) => p?.info?.captcha?.hexCaptcha;

					console.log('regproxy', regproxy)

					if(r && !regproxy) {
						regproxy = r
					}

					if (regproxy){
						localStorage['regproxy'] = regproxy.id
						
						/*regproxy.get.info().then(p => {
							// self.sdk.captcha.hexCaptcha = isHex()
						})*/
					}

					/*if (location.href.includes('pre.pocketnet.app')) {
						self.sdk.captcha.hexCaptcha = isHex()
					}*/

					clbk(data);
				})

			},

			destroy : function(){
				window.removeEventListener('resize', events.width)

				delete self.app.platform.sdk.node.transactions.clbks.moneyfail
				delete self.app.errors.clbks.registration
				delete self.app.platform.sdk.node.transactions.clbks.filluser

				if (ext) 
					ext.destroy()

				ext = null

				needcaptcha = false;
				gliperror = false;

				k = {}

				if(el.c) el.c.empty()

				el = {};

				essenseData = {}
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.panel = el.c.find('.panelWrapper')

				initialParameters = p;

				scrollel = el.c.closest('.wndcontent')

				if(!scrollel.length) scrollel = null;

				initEvents();

				make();

				self.app.Logger.info({
					actionId: 'USER_STARTED_REGISTRATION',
				});

				p.clbk(null, p);

			
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.requestAnimationFrame(() => {
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