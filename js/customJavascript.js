//controls the navbar size as you scroll down. this is disabled when
//the width is less than 768px
$(window).scroll(function(){
	var $nav = $('nav');
	var $elsa = $('.navbar-header img');
	var $sideNav = $('#navLinkPositioning');
	var pos = ($window.scrollTop()/2);
	var width = $(window).width();

	if (width > 768){
		if ($window.scrollTop() == 0){
			$nav.css({height:'75px'});
			$elsa.css({height:'100px'});
      $sideNav.css({paddingTop:'30px'});	
    } else if ($window.scrollTop() > 0 && $window.scrollTop() < 75){
     $nav.css({height:75-pos/1.5});
     $elsa.css({height:100-pos/1.6});	
     $sideNav.css({paddingTop:30-pos/1.6});	
   } else {
     $nav.css({height:'50px'});
     $elsa.css({height:'75px'});
     $sideNav.css({paddingTop:'5px'});	
   }
 }
 else
 {
  $nav.css({height:'50px'});
  //$elsa.css({marginTop:'-23px'});
  //$elsa.css({marginBottom:'-2px'});
  $sideNav.css({paddingTop:'5px'}); 
}
});

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

//goofy hover shift
$(document).ready(function($){
            $(".cube").mousemove(function(e){
                var mouseX = e.pageX - $('.cube').offset().left;
                var mouseY = e.pageY - $('.cube').offset().top;
                var totalX = $('.cube').width();
                var totalY = $('.cube').height();
                var centerX = totalX / 2;
                var centerY = totalY / 2;
                var shiftX = centerX - mouseX;
                var shiftY = centerY - mouseY;

                /*var startX = ($('.cube').width() / 2) - ($('.center').width()/2);
                var startY = ($('.cube').height() / 2) - ($('.center').height()/2);*/

                $('.cube').css({ 'left': (shiftX/10) + 'px', 'top': (shiftY/10) + 'px' });
                //$('.cube').css({ 'left': mouseX + 'px', 'top': mouseY + 'px' });


                /*$('#image1').css('z-index') ;
                $('#image1').css({ 'left': startX + (shiftX/10) + 'px', 'top': startY + (shiftY/10) + 'px' });
                $('#image2').css({ 'left': startX + 220 + (shiftX/8) + 'px', 'top': startY + 50 + (shiftY/8) + 'px' });
                $('#image3').css({ 'left': startX + 370 + (shiftX/6) + 'px', 'top': startY + 60 + (shiftY/6) + 'px' });
                $('#image4').css({ 'left': startX - 100 + (shiftX/8) + 'px', 'top': startY + 50 + (shiftY/8) + 'px' });
                $('#image5').css({ 'left': startX - 150 + (shiftX/6) + 'px', 'top': startY + 60 + (shiftY/6) + 'px' });*/
            });
        });


//scrolling effect for links pointing to inner sections
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 50
				}, 500);
				return false;
			}
		}
	});
});

/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
 (function ($) {
  var inviewObjects = {}, viewportSize, viewportOffset,
  d = document, w = window, documentElement = d.documentElement, expando = $.expando;

  $.event.special.inview = {
    add: function(data) {
      inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };
    },

    remove: function(data) {
      try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch(e) {}
    }
  };

  function getViewportSize() {
    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };

    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight/clientWidth (which has the wrong value).
    if (!size.height) {
      mode = d.compatMode;
      if (mode || !$.support.boxModel) { // IE, Gecko
        domObject = mode === 'CSS1Compat' ?
          documentElement : // Standards
          d.body; // Quirks
          size = {
            height: domObject.clientHeight,
            width:  domObject.clientWidth
          };
        }
      }

      return size;
    }

    function getViewportOffset() {
      return {
        top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
        left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
      };
    }

    function checkInView() {
      var $elements = $(), elementsLength, i = 0;

      $.each(inviewObjects, function(i, inviewObject) {
        var selector  = inviewObject.data.selector,
        $element  = inviewObject.$element;
        $elements = $elements.add(selector ? $element.find(selector) : $element);
      });

      elementsLength = $elements.length;
      if (elementsLength) {
        viewportSize   = viewportSize   || getViewportSize();
        viewportOffset = viewportOffset || getViewportOffset();

        for (; i<elementsLength; i++) {
        // Ignore elements that are not in the DOM tree
        if (!$.contains(documentElement, $elements[i])) {
          continue;
        }

        var $element      = $($elements[i]),
        elementSize   = { height: $element.height(), width: $element.width() },
        elementOffset = $element.offset(),
        inView        = $element.data('inview'),
        visiblePartX,
        visiblePartY,
        visiblePartsMerged;
        
        // Don't ask me why because I haven't figured out yet:
        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
        // Even though it sounds weird:
        // It seems that the execution of this function is interferred by the onresize/onscroll event
        // where viewportOffset and viewportSize are unset
        if (!viewportOffset || !viewportSize) {
          return;
        }
        
        if (elementOffset.top + elementSize.height > viewportOffset.top &&
          elementOffset.top < viewportOffset.top + viewportSize.height &&
          elementOffset.left + elementSize.width > viewportOffset.left &&
          elementOffset.left < viewportOffset.left + viewportSize.width) {
          visiblePartX = (viewportOffset.left > elementOffset.left ?
            'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
            'left' : 'both');
        visiblePartY = (viewportOffset.top > elementOffset.top ?
          'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
          'top' : 'both');
        visiblePartsMerged = visiblePartX + "-" + visiblePartY;
        if (!inView || inView !== visiblePartsMerged) {
          $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
        }
      } else if (inView) {
        $element.data('inview', false).trigger('inview', [false]);
      }
    }
  }
}

$(w).bind("scroll resize", function() {
  viewportSize = viewportOffset = null;
});

  // IE < 9 scrolls to focused elements without firing the "scroll" event
  if (!documentElement.addEventListener && documentElement.attachEvent) {
    documentElement.attachEvent("onfocusin", function() {
      viewportOffset = null;
    });
  }

  // Use setInterval in order to also make sure this captures elements within
  // "overflow:scroll" elements or elements that appeared in the dom tree due to
  // dom manipulation and reflow
  // old: $(window).scroll(checkInView);
  //
  // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
  // intervals while the user scrolls. Therefore the inview event might fire a bit late there
  setInterval(checkInView, 250);
})(jQuery);