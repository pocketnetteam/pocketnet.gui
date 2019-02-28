var Survey = function(p, params)
{
	var $p = $(p),
		$bl,
		$bn,
		$fin,
		$bgn,
		uid  = null,
		pBar = null,
		addq = 0,
		questions =[],
		questionsAdditional = {},
		self = this,
		email,
		timeoutHack,

		template =  '<div class="slContentContainer">\
	                        <div class="slContent">\
	                            <div class="question">\
	                            %QUESTION%\
	                            </div>\
	                            <div class="prompt"></div>\
	                            <div class="answers">\
	                            %ANSWERS%\
	                            </div>\
	                        </div>\
	                    </div>',
    	templateB =  '<div class="slContentContainer">\
                        <div class="slContent">\
                        	<div class="begin">\
                        		%BEGIN%\
                        	</div>\
                        </div>\
                    </div>',                
	    templateF =  '<div class="slContentContainer">\
	                        <div class="slContent">\
	                        	<div class="finish">\
	                        		%FINISH%\
	                        	</div>\
	                        </div>\
	                    </div>',
	    templateA = '<div class="answer select">\
	    				<div class="answerContainer" value="%VALUE%">\
	    				 	%ANSWER%\
	    				</div>\
	                </div>',
	    templateI = '<div class="answer input">\
	    				<div class="answerContainer">\
	    				 	<input type="text" placeholder="Enter Number">\
	    				</div>\
	                </div>',
	    templateTI = '<div class="answer input">\
	    				<div class="answerContainer">\
	    				 	<input type="text" placeholder="Enter Name">\
	    				</div>\
	                </div>',
	    templateT = '<div class="answer textarea">\
	    				<div class="answerContainer">\
	    				 	<textarea placeholder="Please specify"></textarea>\
	    				</div>\
	                </div>',

	    options = {
			begin : -1,
			progressBar : true,
			send : hsa
		};

	if (typeof params === 'object') 
	{
		for (option in params) 
		{			
			options[option] = params[option];
		}
	}

	var message = function(message, func){
		$("<div/>", {
	      "class": "message remove_now",
		  "style": "opacity:0",
	      text: message
		  }).appendTo("body")
		    .animate({ opacity: 1 }, 200);
		
		setTimeout(function() { 
			$('.remove_now').animate({ opacity: 0 }, 500);

			if (typeof func === 'function')
				func();
			setTimeout(function() { 
				$('.remove_now').detach(); }
			, 500)
		}, 2200)
	}


	var currentQuestion = options.begin;
	var hsa = function(answers)
	{
		console.log(answers);
	}
	var additionalCount = function()
	{
		var c = 0;
		for (qs in questions)
		{
			if (questions[qs].p && questions[qs].p == 'additional') c++;
			if (qs == currentQuestion) return c;
		}
		return c;
	}
	var addAdditionalQuestion = function(num, ans)
	{
		var index = currentQuestion + 1;

		for(var i = index; i < questions.length; i++){
			var qu = questions[i];
			index = i + 1;

			console.log("index", index);

			if(qu.p !="additional") {
				index--;
				break;
			}

			if(qu.num > num) {
				index--;
				break;
			}
		}

		questionsAdditional[num].num = num;		
		questionsAdditional[num].added = ans;

		questions.splice(index, 0, questionsAdditional[num]);
		addQ(questions[index], index, num);
		
		if(pBar)
		{
			step = {'$el': null, 'percent': 20, 'parts' : 1, 'progress' : 0, 'step' : currentQuestion + 1 - additionalCount() +"+", 'text' : ''};
			pBar.pushStep(step, index);
		}

	}
	var removeAdditionalQuestion = function(num)
	{
		var qu = _.find(questions, function(question){
			if(question.p == "additional" && question.num == num) return true;
		})

		var index = _.indexOf(questions, qu);

		qu.$e.remove();
		qu.added = null;
		questions.splice(index, 1);

		if(pBar)
		{
			pBar.deleteStep(index);
		} 
	}
	var safeBlur = function()
	{
		if(currentQuestion < 0 || currentQuestion >= questions.length) return; 
		if(questions[currentQuestion]&&(questions[currentQuestion].t == "input" || questions[currentQuestion].t == "inputt")) 	questions[currentQuestion].$e.find('input').blur();
		if(questions[currentQuestion]&&questions[currentQuestion].t == "textarea") 	questions[currentQuestion].$e.find('textarea').blur();
	}

	var safeFocus = function()
	{
		if(currentQuestion < 0 || currentQuestion >= questions.length) return; 

		timeoutHack = setTimeout(function() { 

			if(questions[currentQuestion]&&(questions[currentQuestion].t == "input" || questions[currentQuestion].t == "inputt")) 	questions[currentQuestion].$e.find('input').focus();
			if(questions[currentQuestion]&&questions[currentQuestion].t == "textarea") 	questions[currentQuestion].$e.find('textarea').focus();
		} , 800);
	}
	var finish = function(){
		$('.slide').removeClass('active');
		$fin.addClass('active');

		currentQuestion = questions.length;

		checkButtons();

		if(pBar) pBar.goFinish();

		sendReply();

	}
	var next = function()
	{
		clearTimeout(timeoutHack);

		if (questions[currentQuestion] && questions[currentQuestion].validate && 
			!questions[currentQuestion].validate(questions[currentQuestion].value))
		{
			
			error(questions[currentQuestion].error)

			return;
		}
		else
		{
			error();
		}

		if(currentQuestion < questions.length)
		{
			safeBlur();
			$(this).removeClass('light');
			$('.slide').removeClass('active');
			currentQuestion++;

				if(currentQuestion == questions.length) 
				{
					$fin.addClass('active');
				}
				else
				{
					questions[currentQuestion].$e.addClass('active');
					safeFocus();
				}


			checkButtons();

			if(pBar && currentQuestion > 0) pBar.goNext(currentQuestion);
			if(pBar && currentQuestion == 0) pBar.unfreeze();

			sendReply();
		}
	}

	var error = function(text){
		if(!text)
		{

		}
		else
		{
			message(text)
		}
	}

	var back = function()
	{
		$bn.removeClass('light');
		$('.slide').removeClass('active');

		if(currentQuestion > 0)
		{

			currentQuestion--;

				questions[currentQuestion].$e.addClass('active');
				checkButtons();
				safeFocus();
				safeBlur();

		} 
	}
	var addButtons = function()
	{
		$bl = $("<div/>",	{"class" : "qunav bl", "html" : '<i class="fa fa-long-arrow-left"></i>'});
		$bn = $("<div/>",	{"class" : "qunav bn", "html" : '<i class="fa fa-long-arrow-right"></i>'});

		$p.append($bl)
		  .append($bn);
	}
	var checkButtons = function()
	{
		if(currentQuestion>0 && currentQuestion != questions.length)
		{
			$bl.fadeIn(200);
		}
		else
		{
			$bl.css('display', 'none');
		}

		if(currentQuestion < questions.length && currentQuestion != -1)
		{
			$bn.fadeIn(200);
		}
		else
		{
			$bn.css('display', 'none');
		}
	}
	var grid = function(q)
	{
		var hq = q.$e.find('.question').height() / q.$e.height() * 50;
		var rows = 2;
			l = q.a.length;



		/*if (l <= 4) rows = 2; else
		if (l <= 9) rows = 3; else
		if (l <= 16) rows = 4; else
		if (l <= 32) rows = 5;*/

		

		if(l == 7) rows = 3

		if(l == 10) rows = 2

		if(l == 6) rows = 3




		if($('html').hasClass('mobile'))
		{
			rows = q.a.length
		}

		q.$e.find('.slContent').css('top', (100 / rows - hq) + "%")
										  .css('height', (100 - (100 / rows - hq)) + "%");


		if(!$('html').hasClass('mobile')){
			rows--;
		}								 
		

		var widthItem = Math.ceil(q.a.length / rows);	
			widthItem = 100 / widthItem;


		q.$e.find('.answer').each(function (i) {

			if(l > 8){
				$(this).css('padding', "5px");
				$(this).css('height', "50px");
			}
			$(this).css('width', widthItem + "%");

		})
	}
	var addFinish = function()
	{


		var finishText = "<div>Thank you for taking the survey and for helping us build Pocketnet!</div>\
			<div class='endsurvey'>\
				Finish\
			</div>";
		var html = templateF.replace(/%FINISH%/, finishText)
		$fin = $("<div/>",	{"class" : "slide", 'html': html});
		$p.prepend($fin);

		$fin.find('.endsurvey').on('click', function(){
			window.postMessage({message : "endsurvey"}, "*");
		})
	}
	var addBegin = function()
	{
		var beginText = "\
			<div class='caption'>\
				Congrats on your first post on Pocketnet blockchain! Please help us improve the Pocketnet by taking a quick anonymous survey:\
			</div>\
			<div class='go'>\
				Get started\
			</div>\
		"

		var html = templateB.replace(/%BEGIN%/, beginText)
		$bgn = $("<div/>",	{"class" : "slide active", 'html': html});
		$p.prepend($bgn);
		$bgn.find('.go').on('click', next);
	}
	var addQ = function(q, n, num)
	{
		if(currentQuestion == n)
			active = 'active';
		else
			active = '';

		var answers='';
		if (q.t != 'input' && q.t != 'textarea' && q.t != 'inputt')
		for(a in q.a)
		{
			answers += templateA.replace(/%ANSWER%/, q.a[a][0])
								.replace(/%VALUE%/, a);
		}
		else
		{
			if(q.t == 'inputt')		answers = templateTI;
			if(q.t == 'input')		answers = templateI;
			if(q.t == 'textarea')	answers = templateT;
		}
		if(num) n += "_"+num;
		q.$e = $("<div/>",	{"class" : "slide slide" + n + " " + active +  " " + q.class || ""});
		$p.prepend(q.$e);

		var html = template.replace(/%QUESTION%/, q.q)
						   .replace(/%ANSWERS%/, answers);
		q.$e.append(html);
		grid(q);
		renewEvents();

		if(q.t == "selectMultple")
		{
			q.$e.find('.prompt').html('Select <b>ALL</b> that apply and press arrow on right when done');
		}

		if(q.promt)
		{
			q.$e.find('.prompt').html(q.promt);
		}
	}
	var renewEvents = function()
	{
		$('.answerContainer').off("click", reply);
		$('.answerContainer').on("click", reply);

		$('.answerContainer textarea').off("keyup");
		$('.answerContainer textarea').on("keyup", replyText);

		$('.answerContainer input').off("keyup");
		$('.answerContainer input').on("keyup", replyText);
	}
	var addEvents = function()
	{
		$('.bn').on("click", next);
		$('.bl').on("click", back);
	}
	var sendReply = function()
	{
		var answers = [];
		for(i in questions)
		{
			answers[i] = 
			{
				q : questions[i].q,
				a : null
			}

			if(questions[i].t == 'selectMultple')
			{
				answers[i].a = [];
				for(val in questions[i].value)
				{
					if(questions[i].value[val]) 
						answers[i].a[val] = questions[i].a[val][0];
				}
			}
			else
			{	
				if(questions[i].t == 'select' && questions[i].value != null)	
					answers[i].a = questions[i].a[questions[i].value][0];
				else 							
					answers[i].a = questions[i].value;
			}
		}
		options.send(answers);
	}
	var replyText = function()
	{
		
		q = questions[currentQuestion];
		var a = $(this).val();
		q.value = a;

		if(a.length > 30) $bn.addClass("light");
	}
	var reply = function()
	{	
		var a = $(this).attr("value");
		q = questions[currentQuestion];
		if(q.t == 'select')
		{

			if($(this).hasClass('answered'))
			{
				$(this).removeClass('answered');
				q.value = null;
				if(q.a[a][1]) removeAdditionalQuestion(q.a[a][1]);
			}
			else
			{
				if(q.a[a][1] && !questionsAdditional[q.a[a][1]].added) addAdditionalQuestion(q.a[a][1], a);

				q.$e.find('.answerContainer').removeClass('answered');
				$(this).addClass('answered');
				q.value = a;

				if(q.a[a][2] == true)
				{
					finish();
				}
					
				else
					next();
			}

		}
		if(q.t == 'selectMultple')
		{
				
			if (q.value == null)
				q.value = {};

			if (q.value[a] == true)
			{
				$(this).removeClass('answered');
				q.value[a] = false;
			}
			else
			{	
				$bn.addClass("light");
				$(this).addClass('answered');
				q.value[a] = true;
			}

			if(q.a[a][1]) 
			{
				var answ = _.reduce(q.value, function(sum, qs, ai){
					if(qs == true && q.a[ai][1] && q.a[ai][1] == q.a[a][1]) return sum + qs;
					else return sum;
				},0);

				if (answ == 0)
					removeAdditionalQuestion(q.a[a][1]);
				else
					if (questionsAdditional[q.a[a][1]].added == null)
						addAdditionalQuestion(q.a[a][1], a);
			}
		}
	}
	self.remove = function()
	{

	}
	self.setData = function(data, id)
	{
		questions = data.questions;
		questionsAdditional = data.questionsAdditional;
		uid = id;
	}
	self.init = function(data, id)
	{
		addBegin();
		addFinish();
		if(data && id) self.setData(data, id);

		for(q in questions)
		{	
			addQ(questions[q], q);	
		}
		if(options.progressBar)
		{
			pBar = new ProgressBar;
			pBar.init(questions.length);
		}
		addButtons();
		addEvents();
		checkButtons();

		return self;
	}

	return self;
}

