$(document).ready(function(){

	$('html').removeClass('no-js');

	(function($) {


		$.fn.columnsToJs = function(options) {
	        var _this = this,
				j_this =  $(_this)
	        //parametry wejściowe
	      	_this = $.extend( {
	         	count: 3,
	         	check: 0,
	         	gap: 20,
	         	fixed: true,
	         	debug: false,
	         	interval: false
	        }, options);

	        if(_this.check < _this.count){
	        	_this.check = _this.count + 2;
	        }

	      	// Możliwosc więcej niż jednej kolumny na stronie
	      	this.each(function() {

				_this.child = j_this.children();

				_this.ifInPostiton = function(left, top, lastPostion){
					var ifPosible = true;
					for (var i = lastPostion.length - 1; i >= 0; i--) {
						// console.log("ifInPostiton i                 : "+i);
						// console.log("ifInPostiton max               : "+max);
						// console.log("ifInPostiton lastPostion.length: "+lastPostion.length);
						if(lastPostion[i][0] == top && lastPostion[i][1] == left){
							return false
						}
					}
					return true
				}


				$(_this.child).css('transition', 'none');
				_this.init = function(){
	      			_this.gapNumber = _this.count - 1;
					_this.parentWidth = j_this.width();
					_this.rowWidth = (_this.parentWidth - _this.gapNumber * _this.gap ) / _this.count;
			        _this.getBest = 0;
					j_this.css({
						'column-count': '1',
						'column-gap': '0',
						'position': 'relative'
					});
					children = j_this.children().filter(":visible");
					if(_this.debug){
						console.log("INIT!!!");
						console.log(_this);
					}
					var landigLeft = 0;
					var lastPostion = [];
					
					var memorycalc = [];

			        children.each(function() {
			        	var element = $(this),
			        		position = [0,0], // TOP, LEFT
			        		index = element.filter(":visible").index();

			        	var elementMemoru = memorycalc[index];



						// Nadaj szerokość css
						// musi być wywołana wcześnie bo ma wpływ na wysokość elementu
			        	element.css({
							width: _this.rowWidth+'px',
						});



			        	if(_this.fixed){
			        		// Ustaw według jak najbardziej optymalnie

			        		// Ustaw pierwszy rząd po staremu
							if(index>_this.count-1) {
								var topPositon = 9999999999999;
								var leftPositon = -50;
				        		// console.log(index);
				        		// position[0] = brotherTop.position().top + brotherTop.outerHeight(true);
				        		if(_this.debug){
				        			children.css('background', '');
				        		}
				        		var check = _this.check;
				        		if(check>index){
				        			check=index;
				        		}
				        		for (var i = index; i >= index - check +1; i--) {

				        			var forI = Math.abs(i-1);
				        			var brother = children.eq(forI);
				        			// console.log("AAAAAAAAAAAA");
				        			if(_this.debug){
				        				console.log(forI+" szukam na poziomie "+index);
				        			}
				        			

				        			var brotherTop = memorycalc[forI].top+brother.outerHeight(true);
				        			var brotherLeft = memorycalc[forI].left;

									// var brotherTop = 0;
				        			// var brotherLeft = 0;

					        		if(_this.debug){
						        		console.log("brotherTop: ", brotherTop);
						        		console.log("brotherLeft: ", brotherLeft);
					        			element.css('background', 'pink');
					        			brother.css('background', 'red');
				        			}
				        			if(brotherTop<=topPositon){
				        				if(_this.ifInPostiton(brotherLeft,brotherTop,lastPostion)){
											if(_this.debug){
					        					console.log("USTAW");
					        					brother.css('background', 'blue');
					        				}
				        					topPositon = brotherTop;
											leftPositon = brotherLeft;
				        				}
				        			}
				        			
				        		}
				        		if(_this.debug){
					        		console.log("topPositon: ", topPositon);
					        		console.log("leftPositon: ", leftPositon);
					        	}
				        		position[0] = topPositon;
				        		position[1] = leftPositon;
				        		lastPostion.push(position);
				        	} else {
				        		position[1] = landigLeft * (_this.rowWidth + _this.gap); 
				        	}
			        	
			        	} else {
			        		// Ustaw według standardowego położenia

				        	// USTAW odstęp od lewej
				        	position[1] = landigLeft * (_this.rowWidth + _this.gap); 

				        	// USTAW odstęp od góry
				        	// NIe ustawiaj pierwszego rzędu
				        	if(index>_this.count-1) {
				        		var brotherTop = children.eq(index-_this.count);
				        		position[0] = memorycalc[index-_this.count].top + brotherTop.outerHeight(true);
				        	} else {
				        		// console.log("N"+index);
				        	}
			        	}


			        	memorycalc[index] = {left: position[1], top: position[0]};


						// Następny rząd
						landigLeft += 1;
						if(landigLeft>=_this.count){
							landigLeft = 0;
						}


			        }); 

					children.each(function() {

			        	var element = $(this),
			        		index = element.filter(":visible").index();

			        	var elementMemoru = memorycalc[index];




			        	// Nadaj pozycje css
						element.css({
							position: 'absolute',
							top: elementMemoru.top+'px',
							left: elementMemoru.left+'px'
						});

						// Ustaw koniec girda
			        	if(element.position().top + element.outerHeight(true) > _this.getBest){
			        		_this.getBest = element.position().top + element.outerHeight(true);
			        	}
			        	// console.log("getBest: ", _this.getBest);
			        	j_this.css('min-height',_this.getBest+'px');

			        }); 
			        $(_this.child).css('transition', '');
				}


				_this.init();
				// $(_this.child).css('transition', 'none');
				// setTimeout(function() {
				// 	$(_this.child).css('transition', '');
				// }, 1000);
				if(_this.interval){
					setInterval(function(){ 
						_this.init();
					}, _this.interval);
				}
				setTimeout(function() {
					_this.init();
				}, 1000);


				_this.off = function(){

					j_this.css({
						'column-count': '',
						'column-gap': '',
						'position': '',
						'min-height': ''
					});
					_this.child.each(function() {
			        	var element = $(this);

						element.css({
							width: '',
							position: '',
							top: '',
							left: ''
						});
			        }); 
				}
				$( window ).resize(function() {
					if(_this.debug){
						console.log("window!!!");
					}
					$(_this.child).css('transition', 'none');
					_this.init();
				});
				// $(_this.child).resize(function() {

				// 	// $(_this.child).css('transition', 'none');
				// 	console.log("elment!!!");
				// 	_this.init();
				// });


				// if(_this.interval){
				// 	$(_this.child).off('transitionend webkitTransitionEnd oTransitionEnd');
				// } else {
				// 	$(_this.child).on('transitionend webkitTransitionEnd oTransitionEnd', function () {
				// 		// $(_this.child).css('transition', 'none');
				// 		_this.init();
				// 	});
				// 	$(window).bind("load", function() {
				// 		$(_this.child).css('transition', 'none');
				// 		_this.init();

				// 	});
				// }




			}); 
			return _this
	    }
	    // $('[data-columnstojs]').each(function() {
	    // 	var el = $(this);
	    // 	var json = el.data('columnstojs');
	    // 	json = json.replace(/'/g , '"');
	    // 	console.log(json);
	    // 	el.columnsToJs(JSON.parse(json));
	    // });
	})(jQuery);
	// data-columnstojs="{'count': '10', 'gap': '5'}"


	// var column1 = $('.colums1').columnsToJs({
	// 	count: 3,
	// 	gap: 20,
	// 	check: 5,
	// 	fixed: true
	// });

	var logo = $('.logo-img').columnsToJs({
		count: 3,
		gap: 5,
		fixed: true,
		interval: 15
	});
	var column0 = $('.colums0').columnsToJs({
		count: 2,
		gap: 20,
		check: 3
	});
	var column1 = $('.colums1').columnsToJs({
		count: 3,
		gap: 20,
		check: 6
	});
		// debug: true
	var column2 = $('.colums2').columnsToJs({
		count: 4,
		gap: 0,
		check: 10
	});
	var column3 = $('.colums3').columnsToJs({
		count: 3,
		gap: 0,
		fixed: false
	});
	var column4 = $('.colums4').columnsToJs({
		count: 3,
		gap: 0
	});
	$('[data-columnstojs]').columnsToJs({
		count: 3,
		gap: 20,
		fixed: true,
		check: 5,
		interval: 200,
		debug: true
	})


	$('.colums1').children().on('click', function(event) {
		var el = $(this);
		el.fadeOut(200, function() {
			el.remove();
			column1.init();
		});
	});
	$('.colums2').children().on('click', function(event) {
		var el = $(this);
		el.fadeOut(200, function() {
			el.remove();
			column2.init();
		});
	});
	$('.colums3').children().on('click', function(event) {
		var el = $(this);
		el.fadeOut(200, function() {
			el.remove();
			column3.init();
		});
	});
	$('.colums4').children().on('click', function(event) {
		var el = $(this);
		el.fadeOut(200, function() {
			el.remove();
			column4.init();
		});
	});


});