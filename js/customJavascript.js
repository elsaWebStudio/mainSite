//parallax effect for jumbotron
$(document).ready(function(){
	$window = $(window);
	$('div[data-type="background"]').each(function(){
		var $bgobj = $(this);
		$(window).scroll(function() {			
			var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
			var coords = yPos + 'px';
			$bgobj.css({ backgroundPosition: coords });
		});
	});	
}); 

//scrolling effect for links pointing to sections on loaded page
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top +10
				}, 500);
				return false;
			}
		}
	});
});