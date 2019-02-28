window.app = (function(){

	var self = this,
		serverPath = 'https://pocketnet.app/Shop/AJAXMain.aspx',
		c1a = -1,
		userId,
		uid = 'pocketnetuid',
		questions,
		ip,
		srv,
		el = {};

	

	var template = function(answer, i, date, referrer){
		var h = '';
			h += '<tr class="answerr1">';

			h += '<td>';
			h += i;
			h += '</td>';

			h += '<td>';
			h += date.substring(6,8) + "/" + date.substring(4,6) +" "+ date.substring(8,10) + ":"+ date.substring(10,12) + ":"+ date.substring(12,14);
			h += '</td>';

			h += '<td >';
			h += referrer;
			h += '</td>';

			_.each(questions, function(question, i){			

				var q = _.find(answer, function(aq){
					if(aq.q == question.q) return true;
				})

				var cnt = "";

				if(q)
				{
					if(_.isArray(q.a)){
						_.each(q.a, function(answer){
							if(answer != null)
								cnt += "<div class='manswer'>"+answer+"</div>";
						})
					}
					else{
						if(q.a != null)
							cnt = q.a
						else cnt = "&mdash;";
					}
				}
				else
				{
					cnt = "&mdash;";
				}
				

				var qhtml = "<td>";
					qhtml += cnt;
					qhtml += "</td>";

				h += qhtml;
			})

			h += '</tr>';

	    return h;
	}

	var templates = function(sr){
		var h = '<tr><td>SUM</td><td></td>';
		_.each(sr, function(s){
			
				_.each(s, function(ch){
					h += '<td>';
					h += ch;
					h += '</td>';
				})
		})

		h += '<td colspan=2>&nbsp</td></tr>';

		return h;
	}

	var csum = function(r){
		var sr = {};
		_.each(r, function(_r,i){
			if(i>c1a)
			{
				_.each(_r.Answer, function(answer,n){
					if(answer.ch)
					{
						if(!sr[n]) {
							sr[n] = {};
							sr[n].v0 = 0;
							sr[n].v1 = 0;
						}

						sr[n].v0 += answer.ch[0].value;
						sr[n].v1 += answer.ch[1].value;
					}
				})
			}
		})

		return sr;
	}

	var render = function(r)
	{
		var html = '';
		r = r.root.Answers;

		console.log(r)

		r = _.sortBy(r, function(e){
			return e.Date
		})

		_.each(r, function(d,i){
			if(i>c1a)
			{
				d.Answer = JSON.parse(d.Answer);
				html += template(d.Answer, i - c1a, d.Date, d.Referrer);
			}
			
		})

		
		el.stable.html(html);
	}

	var createTable = function(){
		var thead = "<tr><td width='5%'>&nbsp;</td><td width='5%'>Date/Time</td><td width='10%'>email</td>";

		_.each(questions, function(question, i){
			var qhtml = "<td>";
				qhtml += (i + 1);
				qhtml += "</td>";

			thead += qhtml;

			var qhtml = "<div class='item'>";
				qhtml += (i + 1) +". "+question.q;
				qhtml += "</div>";

			el.description.append(qhtml);
		})

		thead += "</tr>";

		el.htable.html(thead);
	}

	var blya = function(){
		var sendt = 
		{
			action : 'GETQUESTIONNAIREANSWERS',
			uid : uid
		}
		$.ajax({
			type: 'POST',
			url: serverPath,
			data: sendt,
			dataType: 'json',
			success: render
		});
	}

	var initEvents = function(){

		el.submit.on('click', function(){
			getData();
			sendSurvey(systems);

			el.c.addClass('finish');
		});
	}

	var init = function(){

		srv = new SurveyCollection();
		questions = srv.AllQuestions(uid);

		
		el.c = $("#content");
		el.htable = el.c.find("table thead");
		el.stable = el.c.find("table tbody");
		el.description = el.c.find(".description");
		createTable();
		blya();
	}

	init();

})();	
