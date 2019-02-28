Validation = function(p)
{
	var form = p.form,
		inputs,
		_inputs = [],
		self = this,
		pwdDiff,
		validationFail,

		errorPath = p.errorPath || '',
		errorPathKey = p.errorPathKey || 'after',

		regularActions = {
			rpass : function(el){
				if(form.find('.password').val() != $(el).val())
				{
					return false;
				}
				else 
					return true;
			},
			freeemaillist : function(value){
				var r = true;
				var d = '@' + value.split('@')[1];
				if(FreeEmails.indexOf(d) > -1) r = false;

				return r;
			},
			checked : function(el){


				return el.is(":checked")
			}	
		},

		errors = {
			'0001' : 'Fill in this field please',
			'0002' : 'The email address for the recipient is invalid',
			'0003' : 'Password must be minimum of 6 characters, with at least one number',
			'0004' : 'Passwords do not match',
			'0005' : 'The Name is invalid',
			'0006' : 'The Name of Bank is invalid',
			'0007' : 'The Phone Number Format is (XXX) XXX-XXXX',
			'0008' : 'Please enter your work email',
			'0011' : 'Please agree with it'
		},

		regular = 	{
						'email'	: 	{ 	
										'r' : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
										'f' : '0002'
						},
						'pass'	: 	{
										'r' : /((?=.*\d)(?=.*[a-zA-Z]).{6,})/,
										'f' : '0003', 
						},
						'rpass'	: 	{
										'r' : /((?=.*\d)(?=.*[a-zA-Z]).{6,})/,
										'f' : '0003',
										'a' : regularActions.rpass,
										'fa': '0004'
						},
						'name'	: 	{
										'r' : /^[a-zA-Zа-яА-Я0-9 .\-_@#&]{1,30}$/,
										'f' : '0005'
						},
						'bank'	: 	{
										'r' : /^[a-zA-Z .,&]{3,30}$/,
										'f' : '0006'
						},
						'phone'	: 	{
										'r' : /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
										'f' : '0007'
						},
						'date'	: 	{
										'r' : 'empty',
										'f' : '0001'				
						},
						'time'	: 	{
										'r' : 'empty',
										'f' : '0001'				
						},
						'number'	: 	{ 	
										'r' : /[0-9]+/,
										'f' : '0009',
						},
						'vendorcode'	: 	{ 	
										'r' : /[0-9]{14}/,
										'f' : '0010',
						},
						'empty' : {
										'r' : 'empty',
										'f' : '0001'				
						},
						checkbox : {
							
							fa : '0011',
							a : regularActions.checked
						}
						
					},

		initInput = function(){

			if ($(this).val())
			{
				$(this).addClass("initedInput")
			}

		},
		check = function()
		{
			for(var i = 0; i <= this.nmbr; i++)
			{
				_inputs[i] = true;
			}

			if(validationForm()) 	success();
			else 					fail();
		},
		addListeners = function()
		{
			inputs.each(function() {
				if (this.addEventListener) {
					this.addEventListener("blur",  check, false);
					this.addEventListener("change",  check, false);
					this.addEventListener("change",  initInput, false);
					this.addEventListener("keyup",  relax, false);
					this.addEventListener("change",  relax, false);
					
					if($(this).hasClass('password'))
					{
						$(this).on("keyup", checkPassword)
					}
				}
				else 
				{
					 this.onfocusout = check;
				}
			});
		},
		relax = function()
		{
			for(var i = 0; i <= this.nmbr; i++)
			{
				_inputs[i] = true;
			}
			
			if($(this).closest(".inputLabel").hasClass('novalidate'))
			{
				this.addEventListener("keyup",  check, false);
			}
			else
			{
				this.removeEventListener("keyup",  check);
			}

			if(this.getAttribute("norelax")) validationForm("noshow");
		},
		success = p.success || function(){},
		fail = p.fail || function(){},
		showRez = function(r, err, errEl)
		{
			vclear();

			if(r == false)
			{
				if(errEl && (errEl.hasClass('initedInput') || errEl.val() != ''))

					vfail(err, errEl);
			}
			else
			{
				success();
			}
		},
		vfail = function(err, errEl){
			if(validationFail) return;

			validationFail = $("<div>",
				{
					"text" : errors[err],
				   	"class" : "validationFail",
			    }
			);

			if (errEl){

				if(errorPath) errEl = errorPath(errEl);

				errEl[errorPathKey](validationFail);
			}
		},
		vclear = function(){
			if(validationFail) 
			{
				validationFail.remove();
				validationFail = null;
			}
		},
		validationForm = function(key, _p)
		{
			if(!_p) _p = {};

			var rez,
				count,
				success,
				count = 0,
				success = 0,
				err = '',
				errEl;

			inputs.each(function(i) {
				count++;

				if(key != "all" && _inputs[i] == false) return;

				$(this).closest(".inputLabel").removeClass('validate');
				$(this).closest(".inputLabel").removeClass('novalidate');

				
				r = inputValidation($(this));

				if(r[0] == true)
				{
					success++;
					$(this).closest(".inputLabel").addClass('validate');
				}
				else
				{
					if(err == '') 
					{
						$(this).closest(".inputLabel").addClass('novalidate');
						err = r[1];
						errEl = $(this);

						
					}
				}
			});

			if(success != count)	rez = false;
			else					rez =  true;

			if(p.afterEach) p.afterEach(success);

			if(key!="noshow" && !_p.noerrors) showRez(rez, err, errEl);

			return rez;
		},
		inputValidation = function(input)
		{
			
			var vay = 		input.data('validate') || 'name',
				value = 	input.val(),
				validate = 	true,
				error = 	'0000';

			if(input.attr('type')=='hidden') return;

			if(value!='' || input.attr('type') == 'checkbox')
			{
				if(vay)
				{
					if(vay in regular)
					{

						if(validate == true)
						{
							if('r' in regular[vay])
								if(regular[vay]['r']=='empty'){
									if(value === '') {
										validate = 	false;
										error    = 	regular[vay]['f'];
									}
									else{
										validate = 	true;
									}
								}
								else{
									if(regular[vay]['r'].test(value))
									{
										validate = 	true;
									}
									else
									{
										validate = 	false;
										error    = 	regular[vay]['f'];
									}
								}

							if(validate === true)
							if('fu' in regular[vay]){
								if (regular[vay].fu(value) === true){
									validate = 	true;
								}else{
									validate = 	false;
									error    = 	regular[vay]['fuerror'];
								}
							}

						}
						if(validate == true && 'a' in regular[vay])
						{
							if(!regular[vay]['a'](input))
							{
								validate = 	false;
								error    = 	regular[vay]['fa'];
							}
						}
					}
				}
			}
			else 
			{
				validate = 	false;
				error    =  '0001';
			}

			return [validate, error];
		},
		checkPassword = function() {
		    var password = $(this).val(); // Получаем пароль из формы
		    var s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
		    var b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
		    var digits = "0123456789"; // Цифры
		    var specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; // Спецсимволы
		    var is_s = false; // Есть ли в пароле буквы в нижнем регистре
		    var is_b = false; // Есть ли в пароле буквы в верхнем регистре
		    var is_d = false; // Есть ли в пароле цифры
		    var is_sp = false; // Есть ли в пароле спецсимволы
		    for (var i = 0; i < password.length; i++) {
		      /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
			    if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
			    else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
			    else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
			    else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
		    }
		    var rating = 0;
		    var cl = "";
		    if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
		    if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
		    if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
		    if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
		    /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
		    if (password.length < 6 && rating < 3) cl = "simple";
		    if (password.length < 6 && rating >= 3) cl = "medium";
		    if (password.length >= 8 && rating < 3) cl = "medium";
		    if (password.length >= 8 && rating >= 3) cl = "strong";
		    if (password.length >= 6 && rating == 1) cl = "simple";
		    if (password.length >= 6 && rating > 1 && rating < 4) cl = "medium";
		    if (password.length >= 6 && rating == 4) cl = "strong";
		    if (password.length >= 8 && rating == 4) cl = "super";

		    if(password.length==0) cl='';

		    pwdDiff.find('div').removeClass().addClass(cl); // Выводим итоговую сложность пароля
	  	};
	
	self.init = function()
	{
		if(!form) return;

		if(p.inputsSelector)
			inputs = form.find(p.inputsSelector);
		else
			inputs = form.find('input[type!="hidden"][data-validate!="none"]');

		inputs.each(function(i) {
			this.nmbr = i;
			_inputs[i] = false;
		})

		
		pwdDiff = $("<div>",
			{
			   "class" : "pwdDiff",
			   "html"  : "<div class='indicator'></div>"
		    }
		);
		
		form.find('.password').after(pwdDiff);

		addListeners();
	}

	self.validation = function(_p)
	{
		return validationForm("all", _p);
	}

	self.inputValidation = inputValidation;

	self.init();

	return self;
}

if(typeof module != "undefined")
{
	module.exports = Validation;
}