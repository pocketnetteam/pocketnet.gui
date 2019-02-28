var ProgressBar = function()
{
	var self = this;
	var id = "progressBar",
		$elem,
		activeStep = 0,
		saveProgress = 0;
		$parent = $("body");

	var action = null;

	var steps = [];
	var htmlSteps ='<div class="pbPerc">%PRC%\
					</div>\
					<div class="pbLineContainer">\
						<div class="pbLine">\
						</div>\
					</div>\
					<div class="pbText"><div>%TXT%</div>\
					</div>'

	var updatePbSteps = function()
	{
		for(i in steps)
		{
			var progressStep = steps[i].progress / steps[i].parts * 100;
			if(saveProgress > i) progressStep = 100;
			
			steps[i].$line.css("display", 'block');
			progressStep += '%';
			steps[i].$line.width(progressStep);
			
			if(i!=activeStep)
			{
				steps[i].$el.removeClass ("process");
			}
			if(i < saveProgress)
			{
				if(!steps[i].$el.hasClass("complete"))
					steps[i].$el.addClass("complete");
			}
			else
			{
				steps[i].$el.removeClass("complete");
			}
		}

		if(activeStep < steps.length && !steps[activeStep].$el.hasClass("process"))
		{
			steps[activeStep].$el.addClass ("process");
		}
		return this;
	}
	var createStepInDom = function(step, stepBefore)
	{
		step.$el =  $("<div>",
							{
							   "class" : "pbSteps",
							   "data-step" : i
						    });

		if(stepBefore)  stepBefore.$el.after(step.$el);
		else 			$elem.find('.prContainer').append(step.$el);

		step.$el.width(step.percent+"%")
			 		.attr("data-percent", step.percent)
			 		.html( htmlSteps.replace(/%PRC%/g, step.step)
			 			.replace(/%TXT%/g, step.text)
			 			);
		step.$line = step.$el.find(".pbLine");


		

	/*	step.$el.on("click", function(){
			self.navigation($(this).data("step"));
		});*/
		return this;
	}
	var checkStepsWidth = function()
	{
		var allWidth = 0,
			allWidthNeed = 100,
			c = 1;
		for(i in steps)
		{
			allWidth += steps[i].percent;
		}
		if(allWidth!=allWidthNeed)
		{
			c = allWidth / allWidthNeed;
			for(i in steps)
			{
				steps[i].percent = steps[i].percent / c;
				steps[i].$el.width(steps[i].percent+"%");
			}
		}
		return this;
	}
	var createSteps =function(num)
	{
		var p = 100 / num;
		for(i = 0; i < num; i++)
		{
			var step = {'$el': null, 'percent': p, 'parts' : 1, 'progress' : 0, 'step' : i + 1, 'text' : ''};
			steps.push(step);
		}
		return this;
	}
	var finish = function()
	{
		$elem.find('.prFinish').addClass('complete');
	}
	self.unfreeze = function()
	{
		$elem.removeClass("freeze");
		return this;
	}
	self.init = function(num)
	{
		if(num ) createSteps(num);

		$elem =	$("<div>",
				{
					"class" : "freeze",
					"id" : id
			    });
		$parent.append($elem);
		$elem.html('<div class="prFinish"><i class="fa fa-check-circle-o"></i></div><div class="prContainer"></div>');
		for(i in steps)
		{
			createStepInDom(steps[i]);
		}
		updatePbSteps();

		checkStepsWidth();
		return this;
	}
	self.navigation = function(step)
							{
		if(steps[step].act === false && action == null) return false;

		action(steps[step].bnxS);
		return this;
		}
	self.updStep = function(index, data)
	{
		for (attr in data)
		{
			steps[index][attr] = data[attr];
		}
	}
	self.setAction = function(f)
	{
		action = f;
		return this;
	}

	self.goFinish = function(){
		activeStep = steps.length;
		saveProgress = activeStep
		
		updatePbSteps();
		finish();
	}

	self.goNext = function(limit)
	{

		if(limit && limit <= activeStep) return false;
		if(activeStep < steps.length)
		{
			activeStep++;
			if(activeStep > saveProgress) saveProgress = activeStep;
			updatePbSteps();
			
			if(activeStep == steps.length) finish();
		}
		return this;
	}
	self.goTo = function(step)
	{
		activeStep = step;
		if(activeStep > saveProgress) saveProgress = activeStep;
			updatePbSteps();

		return this;
	}
	self.goBack = function(limit)
	{
		if(limit && limit >= activeStep) return false;

		activeStep--;
		updatePbSteps();
		return this;
	}
	self.goSmall = function(limit, step)
	{
		if(step && step != activeStep) return false;
		if(limit && steps[activeStep].progress >= limit) return false;

		pr = steps[activeStep].parts - steps[activeStep].progress;
		if(pr > 0)
		{
			steps[activeStep].progress++;
			if(pr == 1 && !limit)
			{
				self.goNext();
			}
			else
			{
				updatePbSteps();
			}
		}
		return this;
	}
	self.pushStep = function (step, index)
	{
		steps.splice(index, 0 ,step);		
		if(index>0)
		{
			createStepInDom(step, steps[index-1]);
		}
		else
		{
			createStepInDom(step);
		}
		activeStep = saveProgress = index-1;
		checkStepsWidth();
		updatePbSteps();
		return this;
	}
	self.deleteStep = function (index)
	{
		steps[index].$el.remove();
		steps.splice(index, 1);
		activeStep = saveProgress = index-1;
		checkStepsWidth();
		updatePbSteps();
		return this;
	}
	self.failed = function (step)
	{
		if(step)
			steps[step].$el.addClass('failed');
		else
			$elem.addClass('failed');
	}
	self.warning = function (step)
	{
		if(step)
			steps[step].$el.addClass('warning');
		else
			$elem.addClass('warning');
	}

	return self;
}