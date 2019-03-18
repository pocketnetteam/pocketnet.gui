function randomSymbol(symbols) {
  return symbols.substr(Math.random()*symbols.length, 1);
}

function randomString(sample, symbols) {
  return sample.replace(/ /g, function () {
    return randomSymbol(symbols);
  });
}

var SurveyCollection = function()
{
	var self = this,
		serverPath = 'https://pocketnet.app/Shop/AJAXMain.aspx',
		$p,
		survey = null,
		ip,
		email,
		userId = randomString('                        ', 'AaBbCcDdeEfFgGhHoOjJkKlLuUyYvVzZqQwWeE0123456789'),
		surveys = 
		{
			'pocketnetuid' :
			{
				questions :
				[
					{
					 t : 'selectMultple',
					 q : 'Why did you decide to join Pocketnet?',
					 class : 'six',
					 a : [

					 		['To fight the censorship', false],
					      	['To get some Pocketcoin cryptocurrency for posting content', false],
					      	['To sell advertising on my blog for crypto', false],
					      	['Invited by someone', false],
					      	['Curious about blockchain social network', false],
					      	['Other', 1],
					      ],

					 value : null
					},

					{
					 t : 'select',
					 q : 'What do you like most about Pocketnet?',
					 a : [
					 		['Design', false],
				      		['Ease of use', false],
				      		['Peer-to-peer chat', false],
				      		['Making Pocketcoin for posts', false],
				      		['Other', 2],
					      ],
					 value : null
					},




					{
					 t : 'textarea',
					 q : 'What do you like least about Pocketnet?',
					 promt : 'Please tell us what you dislike about the Pocketnet',
					 a : [],
					 value : null,
					},



					{
					 t : 'select',
					 q : 'Name one thing we should add or improve?',
					 a : [
					 		['Add ability to create groups', false],
				      		['Add search engine for content', false],
				      		['Improve design', false],
				      		['Other', 3],
					      ],
					 value : null
					},

					{
					 t : 'select',
					 q : 'Would you be interested in participating in a live test of Pocketnet over skype? You would earn additional 10 Pocketcoin for it.',
					 a : [

					 		['Yes', false, true],
					      	['No', false]
					    ],

					 value : null
					},

					


				],
				questionsAdditional : 
				{

					1 : 
					{
						t : 'textarea',
						q : 'Please elaborate on your interest in Pocketnet',
						promt : '',
						a : [],
						value : null,
						p : 'additional',
					},
					2 : 
					{
						t : 'textarea',
						q : 'Please elaborate on what you like about Pocketnet',
						promt : '',
						a : [],
						value : null,
						p : 'additional',
					},
					
					3 : 
					{
						t : 'textarea',
						promt : '',
						q : 'Please tell us what we should improve or add to the platform',
						a : [],
						value : null,
						p : 'additional',
					}
				}
				
			}
		};

	var take = function(uid)
	{
		return surveys[uid];
	}
	var getIp = function()
	{
		$.getJSON("http://jsonip.com?callback=?", function (data) {
			ip = data.ip;
		})
	}
	var dateUtcNow = function()
	{
		var d = new Date,
			MM = d.getUTCMonth() + 1,
			dd = d.getUTCDate(),
			hh = d.getUTCHours(),
			mm = d.getUTCMinutes(),
			ss = d.getUTCSeconds();

			if(MM < 10) MM = '0' + MM;
			if(dd < 10) dd = '0' + dd;
			if(hh < 10) hh = '0' + hh;
			if(mm < 10) mm = '0' + mm;
			if(ss < 10) ss = '0' + ss;

		return d.getUTCFullYear()+''+MM+''+dd+''+hh+''+mm+''+ss;
	}
	var sendSurvey = function(uid, answers)
	{

		var send = 
		{
			action : 'QUESTIONNAIREANSWER',
			uid : uid,
			userID : userId,
			date : dateUtcNow(),
			ip : ip,
			referrer : '',
			answer : JSON.stringify(answers)
		}

		console.log(send);
		$.ajax({
			type: 'POST',
			url: serverPath,
			data: send,
			dataType: 'json'
		});

		return this;
	}
	self.AllQuestions = function(id){
		var qu = [];

		if(!surveys[id]) return;

		_.each(surveys[id].questions, function(question){
			qu.push(question);

			_.each(question.a, function(ans){
				if(ans[1] && surveys[id].questionsAdditional && surveys[id].questionsAdditional[ans[1]] && !surveys[id].questionsAdditional[ans[1]].added) 
				{
					surveys[id].questionsAdditional[ans[1]].added = true;
					qu.push(surveys[id].questionsAdditional[ans[1]]);
				}
			})
		})

		return qu;
	}
	self.newSurvey = function(uid, params)
	{
		if(!params) params = {};
		if(!params.send) params.send = function(answers, finish){

			console.log(answers, finish)

			sendSurvey(uid, answers); 
			if (finish && answers[4] && answers[4].a == 'Yes'){


				var l = 'https://calendly.com/pocketnet/15min';

				var link = document.createElement('a');
			        link.setAttribute('href', l);
			        link.click();


			}

		}
		
		sdata = take(uid);
		survey = new Survey ($p, params);
		survey.init(sdata, uid);
		return this;
	}
	self.init = function($el)
	{
		var uri = parameters();
			email = uri.email;

		$p = $el;
		return this;
	}

	self.surveys = surveys;
	return self;
}

function parameters(uri, split){
	if(!uri) uri = window.location.search.substr(1);
	else{
		if(split)
			uri = uri.split('?')[1];
	}

	if(/^([A-Za-z0-9]*)$/.test(uri)) return uri || {};

	var r = {};
	uParts = uri.split('&');
	for (p in uParts)
	{	
		uParts[p] = uParts[p].split('=');
		r[uParts[p][0]] = decodeURI(uParts[p][1]);
	}

	return r;
}