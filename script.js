var hours, minutes, to, past, nbsp;
var progress;
var chars = 'abcdefghijklmnopqrstuvwxyz';

// Function: Changed
// Functions Used:
// Description: Creates new date object, rounds hours and minutes.
//  			Uses a hash table to select the html hours and minutes
// 				selecectors; then adds the 'on' class to them.
var changed = function() {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var offset;
	var next;

	hour = hour % 12;
	minute = minute - minute % 5;

	for (var i in minutes) {
		minutes[i].removeClass('on');
	}
	for (var i in hours) {
		hours[i].removeClass('on');
	}
	to.removeClass('on');
	past.removeClass('on');

	if (minute > 30) {
		hours[(hour + 1) % 12].addClass('on');
		to.addClass('on');
	} else {
		hours[hour].addClass('on');
		if (minute !== 0) {
			past.addClass('on');
		}
	}

	offset = (minute > 30)?(60-minute):minute;

	if (offset in minutes) {
		minutes[offset].addClass('on');
	} else if (offset === 25) {
		minutes[20].addClass('on');
		minutes[5].addClass('on');
	}

	now.setTime(Date.now());
	next = new Date(now.getTime());
	next.setMinutes(minute + 5);
	next.setSeconds(0);
	next.setMilliseconds(0);
	console.log((next - now) / 1000);
	setTimeout(changed, next - now);
}

// Function: adjustProgress
// Functions used:
// Description:
var adjustProgress = function() {
	var now = new Date();
	var passed = (now.getMinutes() % 5) * 60 + now.getSeconds();
	var percent = passed / (5 * 60) * 100;

	progress.width(percent+'%')
	.css('transition', 'width 1s linear');

	if (percent < .5) {
		progress.hide();
		setTimeout(function() {
			progress.fadeIn();
		}, 500);
	}

	setTimeout(adjustProgress, 1000);
};

// Function: first
// Functions Used:
// Description: put a random letter in the nbsps selectors
var first = function() {
	nbsps.each(function() {
		var c = chars.charAt(Math.floor(Math.random() * chars.length));
		$(this).text(c);
	});

	setTimeout(function() {
		progress.fadeIn();
	}, 1000);
};

// Function: Anonymous function expression
// Functions Used: changed(); adjustProgress(); first();
// Description: calls itself and runs the functions used
//      		to generate the clock page
$(function() {
	minutes = {
		0: $('#clock #m_0'),
		5: $('#clock #m_5'),
		10: $('#clock #m_10'),
		15: $('#clock #m_15'),
		20: $('#clock #m_20'),
		30: $('#clock #m_30'),
	};

	hours = {
		0: $('#clock #h_0'),
		1: $('#clock #h_1'),
		2: $('#clock #h_2'),
		3: $('#clock #h_3'),
		4: $('#clock #h_4'),
		5: $('#clock #h_5'),
		6: $('#clock #h_6'),
		7: $('#clock #h_7'),
		8: $('#clock #h_8'),
		9: $('#clock #h_9'),
		10: $('#clock #h_10'),
		11: $('#clock #h_11'),
	};

	to = $('#clock #to');
	past = $('#clock #past');

	nbsps = $('#clock .nbsp');

	progress = $('#progressbar');

	changed();
	adjustProgress();

	first();
});