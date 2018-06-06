$(document).ready(function(){

	$('html').removeClass('no-js');

	// data-columnstojs="{'count': '10', 'gap': '5'}"


	// var column1 = $('.colums1').columnsToJs({
	// 	count: 3,
	// 	gap: 20,
	// 	check: 5,
	// 	fixed: true
	// });


	setTimeout(function() {
		var logo = $('.logo-img').columnsToJs({
			count: 3,
			gap: 5,
			fixed: true,
			interval: 15
		});
	}, 1000);
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
		check: "all"
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
	// $('[data-columnstojs]').columnsToJs({
	// 	count: 3,
	// 	gap: 20,
	// 	fixed: true,
	// 	check: 5,
	// 	interval: 200,
	// 	debug: true
	// })


	$('.colums1').children().on('click', function(event) {
		var el = $(this);
		el.fadeOut(500, function() {
			el.remove();
			column1.init();
		});
	});
	$('.colums2').on('click', 'div', function(event) {
		var el = $(this);
		el.fadeOut(500, function() {
			el.remove();
			column2.init();
		});
	});
	$('.colums3').children().on('click', function(event) {
		var el = $(this);
		el.fadeOut(500, function() {
			el.remove();
			column3.init();
		});
	});
	$('.colums4').children().on('click', function(event) {
		var el = $(this);
		el.fadeOut(500, function() {
			el.remove();
			column4.init();
		});
	});

	$('.articleHidder').on('click', function(event) {
		column2.init();
		setTimeout(function() {
			column2.init();
		}, 100);

	});

	$('[data-loadmore]').on('click', function(event) {
		event.preventDefault();
		var el = $($(this).data('loadmore'));
		// el.children().css('transition', 'none');
		var html = el.html();
		$(".colums2").append(html);
		column2.init();
		setTimeout(function() {
			// $(".colums2").children().css('transition', '');
			column2.init();

		}, 100);
	});



});