$(document).ready(function(){
        $('<div id="backTop"><a href="#top"><span></span></a></div>').appendTo('#visual-portal-wrapper-container');
    	// hide #backTop first
	$("#backTop").hide();
	
	// fade in #backTop
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 400) {
				$('#backTop').fadeIn();
			} else {
				$('#backTop').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#backTop a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
});
