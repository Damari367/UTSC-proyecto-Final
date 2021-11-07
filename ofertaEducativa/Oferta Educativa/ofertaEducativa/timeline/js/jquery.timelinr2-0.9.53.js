/* ----------------------------------
jQuery Timelinr 0.9.53
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
---------------------------------- */

jQuery.fn.timelinr2 = function(options){
	// default plugin settings
	settings = jQuery.extend({
		orientation: 				'horizontal',		// value: horizontal | vertical, default to horizontal
		containerDiv: 				'#timeline',		// value: any HTML tag or #id, default to #timeline
		containerDiv2: 				'#timeline2',		// value: any HTML tag or #id, default to #timeline
		containerDiv3: 				'#timeline3',		// value: any HTML tag or #id, default to #timeline
		datesDiv: 					'#dates',			// value: any HTML tag or #id, default to #dates
		datesDiv2: 					'#dates2',			// value: any HTML tag or #id, default to #dates
		datesDiv3: 					'#dates3',			// value: any HTML tag or #id, default to #dates
		datesSelectedClass: 		'selected',			// value: any class, default to selected
		datesSpeed: 				'normal',			// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
		issuesDiv: 					'#issues',			// value: any HTML tag or #id, default to #issues
		issuesDiv2: 				'#issues2',			// value: any HTML tag or #id, default to #issues
		issuesDiv3: 				'#issues3',			// value: any HTML tag or #id, default to #issues
		issuesSelectedClass: 		'selected',			// value: any class, default to selected
		issuesSpeed: 				'fast',				// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
		issuesTransparency: 		0.2,				// value: integer between 0 and 1 (recommended), default to 0.2
		issuesTransparencySpeed: 	500,				// value: integer between 100 and 1000 (recommended), default to 500 (normal)
		prevButton: 				'#prev',			// value: any HTML tag or #id, default to #prev
		prevButton2: 				'#prev2',			// value: any HTML tag or #id, default to #prev
		prevButton3: 				'#prev3',			// value: any HTML tag or #id, default to #prev
		nextButton: 				'#next',			// value: any HTML tag or #id, default to #next
		nextButton2: 				'#next2',			// value: any HTML tag or #id, default to #next
		nextButton3: 				'#next3',			// value: any HTML tag or #id, default to #next
		arrowKeys: 					'false',			// value: true | false, default to false
		startAt: 					1,					// value: integer, default to 1 (first)
		autoPlay: 					'false',			// value: true | false, default to false
		autoPlayDirection: 			'forward',			// value: forward | backward, default to forward
		autoPlayPause: 				2000				// value: integer (1000 = 1 seg), default to 2000 (2segs)
	}, options);
	
	$(function(){
		// setting variables... many of them
		var howManyDates3 = $(settings.datesDiv3+' li').length;
		var howManyIssues3 = $(settings.issuesDiv3+' li').length;
		var currentDate3 = $(settings.datesDiv3).find('a.'+settings.datesSelectedClass);
		var currentIssue3 = $(settings.issuesDiv3).find('li.'+settings.issuesSelectedClass);
		var widthContainer3 = $(settings.containerDiv3).width();
		var heightContainer3 = $(settings.containerDiv3).height();
		var widthIssue3s3 = $(settings.issuesDiv3).width();
		var heightIssue3s3 = $(settings.issuesDiv3).height();
		var widthIssue3 = $(settings.issuesDiv3+' li').width();
		var heightIssue3 = $(settings.issuesDiv3+' li').height();
		var widthDate3s3 = $(settings.datesDiv3).width();
		var heightDate3s3 = $(settings.datesDiv3).height();
		var widthDate3 = $(settings.datesDiv3+' li').width();
		var heightDate3 = $(settings.datesDiv3+' li').height();
		// set positions!
		if(settings.orientation == 'horizontal') {	
			$(settings.issuesDiv3).width(widthIssue3*howManyIssues3);
			$(settings.datesDiv3).width(widthDate3*howManyDates3).css('marginLeft',widthContainer3/2-widthDate3/2);
			var defaultPositionDates3 = parseInt($(settings.datesDiv3).css('marginLeft').substring(0,$(settings.datesDiv3).css('marginLeft').indexOf('px')));
		} else if(settings.orientation == 'vertical') {
			$(settings.issuesDiv3).height(heightIssue3*howManyIssues3);
			$(settings.datesDiv3).height(heightDate3*howManyDates3).css('marginTop',heightContainer3/2-heightDate3/2);
			var defaultPositionDates3 = parseInt($(settings.datesDiv3).css('marginTop').substring(0,$(settings.datesDiv3).css('marginTop').indexOf('px')));
		}
		
		$(settings.datesDiv3+' a').click(function(event){
			event.preventDefault();
			// first vars
			var whichIssue3 = $(this).text();
			var currentIndex3 = $(this).parent().prevAll().length;
			// moving the elements
			if(settings.orientation == 'horizontal') {
				$(settings.issuesDiv3).animate({'marginLeft':-widthIssue3*currentIndex3},{queue:false, duration:settings.issuesSpeed});
			} else if(settings.orientation == 'vertical') {
				$(settings.issuesDiv3).animate({'marginTop':-heightIssue3*currentIndex3},{queue:false, duration:settings.issuesSpeed});
			}
			$(settings.issuesDiv3+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed}).removeClass(settings.issuesSelectedClass).eq(currentIndex3).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
			if(howManyDates3 == 1) {
				$(settings.prevButton3+','+settings.nextButton3).fadeOut('fast');
			} else if(howManyDates3 == 2) {
				if($(settings.issuesDiv3+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton3).fadeOut('fast');
				 	$(settings.nextButton3).fadeIn('fast');
				} 
				else if($(settings.issuesDiv3+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton3).fadeOut('fast');
					$(settings.prevButton3).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv3+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton3).fadeIn('fast');
					$(settings.prevButton3).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv3+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton3).fadeIn('fast');
					$(settings.nextButton3).fadeOut('fast');
				}
				else {
					$(settings.nextButton3+','+settings.prevButton3).fadeIn('slow');
				}	
			}
			// now moving the dates
			$(settings.datesDiv3+' a').removeClass(settings.datesSelectedClass);
			$(this).addClass(settings.datesSelectedClass);
			if(settings.orientation == 'horizontal') {
				$(settings.datesDiv3).animate({'marginLeft':defaultPositionDates3-(widthDate3*currentIndex3)},{queue:false, duration:'settings.datesSpeed'});
			} else if(settings.orientation == 'vertical') {
				$(settings.datesDiv3).animate({'marginTop':defaultPositionDates3-(heightDate3*currentIndex3)},{queue:false, duration:'settings.datesSpeed'});
			}
		});

		$(settings.nextButton3).bind('click', function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues3 = parseInt($(settings.issuesDiv3).css('marginLeft').substring(0,$(settings.issuesDiv3).css('marginLeft').indexOf('px')));
				var currentIssue3Index3 = currentPositionIssues3/widthIssue3;
				var currentPositionDates3 = parseInt($(settings.datesDiv2).css('marginLeft').substring(0,$(settings.datesDiv3).css('marginLeft').indexOf('px')));
				var currentIssue3Date3 = currentPositionDates3-widthDate3;
				if(currentPositionIssues3 <= -(widthIssue3*howManyIssues3-(widthIssue3))) {
					$(settings.issuesDiv3).stop();
					$(settings.datesDiv3+' li:last-child a').click();
				} else {
					if (!$(settings.issuesDiv3).is(':animated')) {
						$(settings.issuesDiv3).animate({'marginLeft':currentPositionIssues3-widthIssue3},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).next().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv3).animate({'marginLeft':currentIssue3Date3},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv3+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().next().children().addClass(settings.datesSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues3 = parseInt($(settings.issuesDiv3).css('marginTop').substring(0,$(settings.issuesDiv3).css('marginTop').indexOf('px')));
				var currentIssue3Index3 = currentPositionIssues3/heightIssue3;
				var currentPositionDates3 = parseInt($(settings.datesDiv3).css('marginTop').substring(0,$(settings.datesDiv3).css('marginTop').indexOf('px')));
				var currentIssue3Date3 = currentPositionDates3-heightDate3;
				if(currentPositionIssues3 <= -(heightIssue3*howManyIssues3-(heightIssue3))) {
					$(settings.issuesDiv3).stop();
					$(settings.datesDiv3+' li:last-child a').click();
				} else {
					if (!$(settings.issuesDiv3).is(':animated')) {
						$(settings.issuesDiv3).animate({'marginTop':currentPositionIssues3-heightIssue3},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).next().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv3).animate({'marginTop':currentIssue3Date3},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv3+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().next().children().addClass(settings.datesSelectedClass);
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates3 == 1) {
				$(settings.prevButton3+','+settings.nextButton3).fadeOut('fast');
			} else if(howManyDates3 == 2) {
				if($(settings.issuesDiv3+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton3).fadeOut('fast');
				 	$(settings.nextButton3).fadeIn('fast');
				} 
				else if($(settings.issuesDiv3+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton3).fadeOut('fast');
					$(settings.prevButton3).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv3+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton3).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv3+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton3).fadeOut('fast');
				}
				else {
					$(settings.nextButton3+','+settings.prevButton3).fadeIn('slow');
				}	
			}
		});

		$(settings.prevButton3).click(function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues3 = parseInt($(settings.issuesDiv3).css('marginLeft').substring(0,$(settings.issuesDiv3).css('marginLeft').indexOf('px')));
				var currentIssue3Index3 = currentPositionIssues3/widthIssue3;
				var currentPositionDates3 = parseInt($(settings.datesDiv3).css('marginLeft').substring(0,$(settings.datesDiv3).css('marginLeft').indexOf('px')));
				var currentIssue3Date3 = currentPositionDates3+widthDate3;
				if(currentPositionIssues3 >= 0) {
					$(settings.issuesDiv3).stop();
					$(settings.datesDiv3+' li:first-child a').click();
				} else {
					if (!$(settings.issuesDiv3).is(':animated')) {
						$(settings.issuesDiv3).animate({'marginLeft':currentPositionIssues3+widthIssue3},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).prev().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv3).animate({'marginLeft':currentIssue3Date3},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv3+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().prev().children().addClass(settings.datesSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues3 = parseInt($(settings.issuesDiv3).css('marginTop').substring(0,$(settings.issuesDiv3).css('marginTop').indexOf('px')));
				var currentIssue3Index3 = currentPositionIssues3/heightIssue3;
				var currentPositionDates3 = parseInt($(settings.datesDiv3).css('marginTop').substring(0,$(settings.datesDiv3).css('marginTop').indexOf('px')));
				var currentIssue3Date3 = currentPositionDates3+heightDate3;
				if(currentPositionIssues3 >= 0) {
					$(settings.issuesDiv3).stop();
					$(settings.datesDiv3+' li:first-child a').click();
				} else {
					if (!$(settings.issuesDiv3).is(':animated')) {
						$(settings.issuesDiv3).animate({'marginTop':currentPositionIssues3+heightIssue3},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv3+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).prev().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv3).animate({'marginTop':currentIssue3Date3},{queue:false, duration:'settings.datesSpeed'},{queue:false, duration:settings.issuesSpeed});
						$(settings.datesDiv3+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().prev().children().addClass(settings.datesSelectedClass);
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates3 == 1) {
				$(settings.prevButton3+','+settings.nextButton3).fadeOut('fast');
			} else if(howManyDates3 == 2) {
				if($(settings.issuesDiv3+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton3).fadeOut('fast');
				 	$(settings.nextButton3).fadeIn('fast');
				} 
				else if($(settings.issuesDiv3+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton3).fadeOut('fast');
					$(settings.prevButton3).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv3+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton3).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv3+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton3).fadeOut('fast');
				}
				else {
					$(settings.nextButton3+','+settings.prevButton3).fadeIn('slow');
				}	
			}
		});
		// keyboard navigation, added since 0.9.1
		/*if(settings.arrowKeys=='true') {
			if(settings.orientation=='horizontal') {
				$(document).keydown(function(event){
					if (event.keyCode == 39) { 
				       $(settings.nextButton2).click();
				    }
					if (event.keyCode == 37) { 
				       $(settings.prevButton2).click();
				    }
				});
			} else if(settings.orientation=='vertical') {
				$(document).keydown(function(event){
					if (event.keyCode == 40) { 
				       $(settings.nextButton2).click();
				    }
					if (event.keyCode == 38) { 
				       $(settings.prevButton2).click();
				    }
				});
			}
		}*/
		// default position startAt, added since 0.9.3
		$(settings.datesDiv3+' li').eq(settings.startAt-1).find('a').trigger('click');
		// autoPlay, added since 0.9.4
		if(settings.autoPlay == 'true') { 
			setInterval("autoPlay()", settings.autoPlayPause);
		}
	});

	$(function(){
		// setting variables... many of them
		var howManyDates2 = $(settings.datesDiv2+' li').length;
		var howManyIssues2 = $(settings.issuesDiv2+' li').length;
		var currentDate2 = $(settings.datesDiv2).find('a.'+settings.datesSelectedClass);
		var currentIssue2 = $(settings.issuesDiv2).find('li.'+settings.issuesSelectedClass);
		var widthContainer2 = $(settings.containerDiv2).width();
		var heightContainer2 = $(settings.containerDiv2).height();
		var widthIssue2s2 = $(settings.issuesDiv2).width();
		var heightIssue2s2 = $(settings.issuesDiv2).height();
		var widthIssue2 = $(settings.issuesDiv2+' li').width();
		var heightIssue2 = $(settings.issuesDiv2+' li').height();
		var widthDate2s2 = $(settings.datesDiv2).width();
		var heightDate2s2 = $(settings.datesDiv2).height();
		var widthDate2 = $(settings.datesDiv2+' li').width();
		var heightDate2 = $(settings.datesDiv2+' li').height();
		// set positions!
		if(settings.orientation == 'horizontal') {	
			$(settings.issuesDiv2).width(widthIssue2*howManyIssues2);
			$(settings.datesDiv2).width(widthDate2*howManyDates2).css('marginLeft',widthContainer2/2-widthDate2/2);
			var defaultPositionDates2 = parseInt($(settings.datesDiv2).css('marginLeft').substring(0,$(settings.datesDiv2).css('marginLeft').indexOf('px')));
		} else if(settings.orientation == 'vertical') {
			$(settings.issuesDiv2).height(heightIssue2*howManyIssues2);
			$(settings.datesDiv2).height(heightDate2*howManyDates2).css('marginTop',heightContainer2/2-heightDate2/2);
			var defaultPositionDates2 = parseInt($(settings.datesDiv2).css('marginTop').substring(0,$(settings.datesDiv2).css('marginTop').indexOf('px')));
		}
		
		$(settings.datesDiv2+' a').click(function(event){
			event.preventDefault();
			// first vars
			var whichIssue2 = $(this).text();
			var currentIndex2 = $(this).parent().prevAll().length;
			// moving the elements
			if(settings.orientation == 'horizontal') {
				$(settings.issuesDiv2).animate({'marginLeft':-widthIssue2*currentIndex2},{queue:false, duration:settings.issuesSpeed});
			} else if(settings.orientation == 'vertical') {
				$(settings.issuesDiv2).animate({'marginTop':-heightIssue2*currentIndex2},{queue:false, duration:settings.issuesSpeed});
			}
			$(settings.issuesDiv2+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed}).removeClass(settings.issuesSelectedClass).eq(currentIndex2).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
			if(howManyDates2 == 1) {
				$(settings.prevButton2+','+settings.nextButton2).fadeOut('fast');
			} else if(howManyDates2 == 2) {
				if($(settings.issuesDiv2+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton2).fadeOut('fast');
				 	$(settings.nextButton2).fadeIn('fast');
				} 
				else if($(settings.issuesDiv2+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton2).fadeOut('fast');
					$(settings.prevButton2).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv2+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton2).fadeIn('fast');
					$(settings.prevButton2).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv2+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton2).fadeIn('fast');
					$(settings.nextButton2).fadeOut('fast');
				}
				else {
					$(settings.nextButton2+','+settings.prevButton2).fadeIn('slow');
				}	
			}
			// now moving the dates
			$(settings.datesDiv2+' a').removeClass(settings.datesSelectedClass);
			$(this).addClass(settings.datesSelectedClass);
			if(settings.orientation == 'horizontal') {
				$(settings.datesDiv2).animate({'marginLeft':defaultPositionDates2-(widthDate2*currentIndex2)},{queue:false, duration:'settings.datesSpeed'});
			} else if(settings.orientation == 'vertical') {
				$(settings.datesDiv2).animate({'marginTop':defaultPositionDates2-(heightDate2*currentIndex2)},{queue:false, duration:'settings.datesSpeed'});
			}
		});

		$(settings.nextButton2).bind('click', function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues2 = parseInt($(settings.issuesDiv2).css('marginLeft').substring(0,$(settings.issuesDiv2).css('marginLeft').indexOf('px')));
				var currentIssue2Index2 = currentPositionIssues2/widthIssue2;
				var currentPositionDates2 = parseInt($(settings.datesDiv2).css('marginLeft').substring(0,$(settings.datesDiv2).css('marginLeft').indexOf('px')));
				var currentIssue2Date2 = currentPositionDates2-widthDate2;
				if(currentPositionIssues2 <= -(widthIssue2*howManyIssues2-(widthIssue2))) {
					$(settings.issuesDiv2).stop();
					$(settings.datesDiv2+' li:last-child a').click();
				} else {
					if (!$(settings.issuesDiv2).is(':animated')) {
						$(settings.issuesDiv2).animate({'marginLeft':currentPositionIssues2-widthIssue2},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).next().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv2).animate({'marginLeft':currentIssue2Date2},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv2+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().next().children().addClass(settings.datesSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues2 = parseInt($(settings.issuesDiv2).css('marginTop').substring(0,$(settings.issuesDiv2).css('marginTop').indexOf('px')));
				var currentIssue2Index2 = currentPositionIssues2/heightIssue2;
				var currentPositionDates2 = parseInt($(settings.datesDiv2).css('marginTop').substring(0,$(settings.datesDiv2).css('marginTop').indexOf('px')));
				var currentIssue2Date2 = currentPositionDates2-heightDate2;
				if(currentPositionIssues2 <= -(heightIssue2*howManyIssues2-(heightIssue2))) {
					$(settings.issuesDiv2).stop();
					$(settings.datesDiv2+' li:last-child a').click();
				} else {
					if (!$(settings.issuesDiv2).is(':animated')) {
						$(settings.issuesDiv2).animate({'marginTop':currentPositionIssues2-heightIssue2},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).next().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv2).animate({'marginTop':currentIssue2Date2},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv2+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().next().children().addClass(settings.datesSelectedClass);
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates2 == 1) {
				$(settings.prevButton2+','+settings.nextButton2).fadeOut('fast');
			} else if(howManyDates2 == 2) {
				if($(settings.issuesDiv2+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton2).fadeOut('fast');
				 	$(settings.nextButton2).fadeIn('fast');
				} 
				else if($(settings.issuesDiv2+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton2).fadeOut('fast');
					$(settings.prevButton2).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv2+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton2).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv2+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton2).fadeOut('fast');
				}
				else {
					$(settings.nextButton2+','+settings.prevButton2).fadeIn('slow');
				}	
			}
		});

		$(settings.prevButton2).click(function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues2 = parseInt($(settings.issuesDiv2).css('marginLeft').substring(0,$(settings.issuesDiv2).css('marginLeft').indexOf('px')));
				var currentIssue2Index2 = currentPositionIssues2/widthIssue2;
				var currentPositionDates2 = parseInt($(settings.datesDiv2).css('marginLeft').substring(0,$(settings.datesDiv2).css('marginLeft').indexOf('px')));
				var currentIssue2Date2 = currentPositionDates2+widthDate2;
				if(currentPositionIssues2 >= 0) {
					$(settings.issuesDiv2).stop();
					$(settings.datesDiv2+' li:first-child a').click();
				} else {
					if (!$(settings.issuesDiv2).is(':animated')) {
						$(settings.issuesDiv2).animate({'marginLeft':currentPositionIssues2+widthIssue2},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).prev().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv2).animate({'marginLeft':currentIssue2Date2},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv2+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().prev().children().addClass(settings.datesSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues2 = parseInt($(settings.issuesDiv2).css('marginTop').substring(0,$(settings.issuesDiv2).css('marginTop').indexOf('px')));
				var currentIssue2Index2 = currentPositionIssues2/heightIssue2;
				var currentPositionDates2 = parseInt($(settings.datesDiv2).css('marginTop').substring(0,$(settings.datesDiv2).css('marginTop').indexOf('px')));
				var currentIssue2Date2 = currentPositionDates2+heightDate2;
				if(currentPositionIssues2 >= 0) {
					$(settings.issuesDiv2).stop();
					$(settings.datesDiv2+' li:first-child a').click();
				} else {
					if (!$(settings.issuesDiv2).is(':animated')) {
						$(settings.issuesDiv2).animate({'marginTop':currentPositionIssues2+heightIssue2},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv2+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).prev().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv2).animate({'marginTop':currentIssue2Date2},{queue:false, duration:'settings.datesSpeed'},{queue:false, duration:settings.issuesSpeed});
						$(settings.datesDiv2+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().prev().children().addClass(settings.datesSelectedClass);
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates2 == 1) {
				$(settings.prevButton2+','+settings.nextButton2).fadeOut('fast');
			} else if(howManyDates2 == 2) {
				if($(settings.issuesDiv2+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton2).fadeOut('fast');
				 	$(settings.nextButton2).fadeIn('fast');
				} 
				else if($(settings.issuesDiv2+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton2).fadeOut('fast');
					$(settings.prevButton2).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv2+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton2).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv2+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton2).fadeOut('fast');
				}
				else {
					$(settings.nextButton2+','+settings.prevButton2).fadeIn('slow');
				}	
			}
		});
		// keyboard navigation, added since 0.9.1
		/*if(settings.arrowKeys=='true') {
			if(settings.orientation=='horizontal') {
				$(document).keydown(function(event){
					if (event.keyCode == 39) { 
				       $(settings.nextButton2).click();
				    }
					if (event.keyCode == 37) { 
				       $(settings.prevButton2).click();
				    }
				});
			} else if(settings.orientation=='vertical') {
				$(document).keydown(function(event){
					if (event.keyCode == 40) { 
				       $(settings.nextButton2).click();
				    }
					if (event.keyCode == 38) { 
				       $(settings.prevButton2).click();
				    }
				});
			}
		}*/
		// default position startAt, added since 0.9.3
		$(settings.datesDiv2+' li').eq(settings.startAt-1).find('a').trigger('click');
		// autoPlay, added since 0.9.4
		if(settings.autoPlay == 'true') { 
			setInterval("autoPlay()", settings.autoPlayPause);
		}
	});
	
	$(function(){
		// setting variables... many of them
		var howManyDates = $(settings.datesDiv+' li').length;
		var howManyIssues = $(settings.issuesDiv+' li').length;
		var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
		var currentIssue = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass);
		var widthContainer = $(settings.containerDiv).width();
		var heightContainer = $(settings.containerDiv).height();
		var widthIssues = $(settings.issuesDiv).width();
		var heightIssues = $(settings.issuesDiv).height();
		var widthIssue = $(settings.issuesDiv+' li').width();
		var heightIssue = $(settings.issuesDiv+' li').height();
		var widthDates = $(settings.datesDiv).width();
		var heightDates = $(settings.datesDiv).height();
		var widthDate = $(settings.datesDiv+' li').width();
		var heightDate = $(settings.datesDiv+' li').height();
		// set positions!
		if(settings.orientation == 'horizontal') {	
			$(settings.issuesDiv).width(widthIssue*howManyIssues);
			$(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
			var defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
		} else if(settings.orientation == 'vertical') {
			$(settings.issuesDiv).height(heightIssue*howManyIssues);
			$(settings.datesDiv).height(heightDate*howManyDates).css('marginTop',heightContainer/2-heightDate/2);
			var defaultPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
		}
		
		$(settings.datesDiv+' a').click(function(event){
			event.preventDefault();
			// first vars
			var whichIssue = $(this).text();
			var currentIndex = $(this).parent().prevAll().length;
			// moving the elements
			if(settings.orientation == 'horizontal') {
				$(settings.issuesDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
			} else if(settings.orientation == 'vertical') {
				$(settings.issuesDiv).animate({'marginTop':-heightIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
			}
			$(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed}).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
			if(howManyDates == 1) {
				$(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');
				} 
				else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton).fadeIn('fast');
					$(settings.prevButton).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton).fadeIn('fast');
					$(settings.nextButton).fadeOut('fast');
				}
				else {
					$(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
			// now moving the dates
			$(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);
			$(this).addClass(settings.datesSelectedClass);
			if(settings.orientation == 'horizontal') {
				$(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
			} else if(settings.orientation == 'vertical') {
				$(settings.datesDiv).animate({'marginTop':defaultPositionDates-(heightDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
			}
		});

		$(settings.nextButton).bind('click', function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/widthIssue;
				var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
				var currentIssueDate = currentPositionDates-widthDate;
				if(currentPositionIssues <= -(widthIssue*howManyIssues-(widthIssue))) {
					$(settings.issuesDiv).stop();
					$(settings.datesDiv+' li:last-child a').click();
				} else {
					if (!$(settings.issuesDiv).is(':animated')) {
						$(settings.issuesDiv).animate({'marginLeft':currentPositionIssues-widthIssue},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).next().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv).animate({'marginLeft':currentIssueDate},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().next().children().addClass(settings.datesSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/heightIssue;
				var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
				var currentIssueDate = currentPositionDates-heightDate;
				if(currentPositionIssues <= -(heightIssue*howManyIssues-(heightIssue))) {
					$(settings.issuesDiv).stop();
					$(settings.datesDiv+' li:last-child a').click();
				} else {
					if (!$(settings.issuesDiv).is(':animated')) {
						$(settings.issuesDiv).animate({'marginTop':currentPositionIssues-heightIssue},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).next().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv).animate({'marginTop':currentIssueDate},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().next().children().addClass(settings.datesSelectedClass);
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates == 1) {
				$(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');
				} 
				else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton).fadeOut('fast');
				}
				else {
					$(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
		});

		$(settings.prevButton).click(function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/widthIssue;
				var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
				var currentIssueDate = currentPositionDates+widthDate;
				if(currentPositionIssues >= 0) {
					$(settings.issuesDiv).stop();
					$(settings.datesDiv+' li:first-child a').click();
				} else {
					if (!$(settings.issuesDiv).is(':animated')) {
						$(settings.issuesDiv).animate({'marginLeft':currentPositionIssues+widthIssue},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).prev().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv).animate({'marginLeft':currentIssueDate},{queue:false, duration:'settings.datesSpeed'});
						$(settings.datesDiv+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().prev().children().addClass(settings.datesSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/heightIssue;
				var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
				var currentIssueDate = currentPositionDates+heightDate;
				if(currentPositionIssues >= 0) {
					$(settings.issuesDiv).stop();
					$(settings.datesDiv+' li:first-child a').click();
				} else {
					if (!$(settings.issuesDiv).is(':animated')) {
						$(settings.issuesDiv).animate({'marginTop':currentPositionIssues+heightIssue},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
						$(settings.issuesDiv+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).prev().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
						$(settings.datesDiv).animate({'marginTop':currentIssueDate},{queue:false, duration:'settings.datesSpeed'},{queue:false, duration:settings.issuesSpeed});
						$(settings.datesDiv+' a.'+settings.datesSelectedClass).removeClass(settings.datesSelectedClass).parent().prev().children().addClass(settings.datesSelectedClass);
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates == 1) {
				$(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');
				} 
				else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.prevButton).fadeOut('fast');
				} 
				else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					$(settings.nextButton).fadeOut('fast');
				}
				else {
					$(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
		});
		// keyboard navigation, added since 0.9.1
		/*if(settings.arrowKeys=='true') {
			if(settings.orientation=='horizontal') {
				$(document).keydown(function(event){
					if (event.keyCode == 39) { 
				       $(settings.nextButton).click();
				    }
					if (event.keyCode == 37) { 
				       $(settings.prevButton).click();
				    }
				});
			} else if(settings.orientation=='vertical') {
				$(document).keydown(function(event){
					if (event.keyCode == 40) { 
				       $(settings.nextButton).click();
				    }
					if (event.keyCode == 38) { 
				       $(settings.prevButton).click();
				    }
				});
			}
		}*/
		// default position startAt, added since 0.9.3
		$(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click');
		// autoPlay, added since 0.9.4
		if(settings.autoPlay == 'true') { 
			setInterval("autoPlay()", settings.autoPlayPause);
		}
	});
};

// autoPlay, added since 0.9.4
function autoPlay(){
	var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
	if(settings.autoPlayDirection == 'forward') {
		if(currentDate.parent().is('li:last-child')) {
			$(settings.datesDiv+' li:first-child').find('a').trigger('click');
		} else {
			currentDate.parent().next().find('a').trigger('click');
		}
	} else if(settings.autoPlayDirection == 'backward') {
		if(currentDate.parent().is('li:first-child')) {
			$(settings.datesDiv+' li:last-child').find('a').trigger('click');
		} else {
			currentDate.parent().prev().find('a').trigger('click');
		}
	}
}

// autoPlay, added since 0.9.4
function autoPlay(){
	var currentDate2 = $(settings.datesDiv2).find('a.'+settings.datesSelectedClass);
	if(settings.autoPlayDirection == 'forward') {
		if(currentDate2.parent().is('li:last-child')) {
			$(settings.datesDiv2+' li:first-child').find('a').trigger('click');
		} else {
			currentDate2.parent().next().find('a').trigger('click');
		}
	} else if(settings.autoPlayDirection == 'backward') {
		if(currentDate2.parent().is('li:first-child')) {
			$(settings.datesDiv2+' li:last-child').find('a').trigger('click');
		} else {
			currentDate2.parent().prev().find('a').trigger('click');
		}
	}
}

// autoPlay, added since 0.9.4
function autoPlay(){
	var currentDate3 = $(settings.datesDiv3).find('a.'+settings.datesSelectedClass);
	if(settings.autoPlayDirection == 'forward') {
		if(currentDate3.parent().is('li:last-child')) {
			$(settings.datesDiv3+' li:first-child').find('a').trigger('click');
		} else {
			currentDate3.parent().next().find('a').trigger('click');
		}
	} else if(settings.autoPlayDirection == 'backward') {
		if(currentDate3.parent().is('li:first-child')) {
			$(settings.datesDiv3+' li:last-child').find('a').trigger('click');
		} else {
			currentDate3.parent().prev().find('a').trigger('click');
		}
	}
}