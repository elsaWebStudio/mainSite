$(function(){
		$('#nav').data('size','big');
});

$(window).scroll(function(){
	var $nav = $('#nav');
	var $elsa = $('.elsa');
	var $sideNav = $('#rightSideNav');
	var pos = ($window.scrollTop()/2);
		
		
	if ($window.scrollTop() == 0){
		$nav.css({height:'100px'});
		$elsa.css({fontSize:'70px'});
		$sideNav.css({paddingTop:'81px'});		
	} else if ($window.scrollTop() > 0 && $window.scrollTop() < 100){
		$nav.css({height:100-pos});
		$elsa.css({fontSize:70-pos/1.4});	
		$sideNav.css({paddingTop:81-pos});	
	
	} else {
		$nav.css({height:'50px'});
		$elsa.css({fontSize:'35px'});
		$sideNav.css({paddingTop:'31px'});	
	}

});

$(document).ready(function(){
	// Cache the Window object
	$window = $(window);
                
   $('section[data-type="background"]').each(function(){
     var $bgobj = $(this); // assigning the object
                    
      $(window).scroll(function() {
                    
		// Scroll the background at var speed
		// the yPos is a negative value because we're scrolling it UP!								
		var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
		
		// Put together our final background position
		var coords = yPos + 'px';

		// Move the background
		$bgobj.css({ backgroundPosition: coords });
		
}); // window scroll Ends

 });	

}); 