//controls the navbar size as you scroll down. this is disabled when
//the width is less than 768px
$(window).scroll(function(){
	var $nav = $('nav');
	var $elsa = $('.navbar-header img');
	var $sideNav = $('#navLinkPositioning');
  var $logoBack = $('#logoBackground');
	var pos = ($window.scrollTop()/2);
	var width = $(window).width();

	if (width > 768){
		if ($window.scrollTop() == 0){
			$nav.css({height:'75px'});
			$elsa.css({height:'100px'});
      $sideNav.css({paddingTop:'30px'});
      $logoBack.css({height:'75px'}); 
      $logoBack.css({width:'225px'});  	
    } else if ($window.scrollTop() > 0 && $window.scrollTop() < 75){
     $nav.css({height:75-pos/1.5});
     $elsa.css({height:100-pos/1.6});	
     $sideNav.css({paddingTop:30-pos/1.6});	
     $logoBack.css({height:75-pos/1.6});
     $logoBack.css({ width:225-pos*1.2});    
   } else {
     $nav.css({height:'50px'});
     $elsa.css({height:'75px'});
     $sideNav.css({paddingTop:'5px'});	
     $logoBack.css({height:'55px'});
     $logoBack.css({width:'170px'});    
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

<<<<<<< HEAD
//cube magic
$(window).on('mousemove', function(event) {
  var width = $(window).width();
  var mouseX = event.pageX - (width * 0.5);
  var height = $(window).height();
  var mouseY = event.pageY - (height * 0.5);
  var xAngle = (mouseY / height) * 90;
  var yAngle = (mouseX / width) * 90;

  $('.cube')[0].style.webkitTransform = "rotateX("+((xAngle/2)+45)+"deg) rotateY("+yAngle/5+"deg)";
  
});

function resize(event) {
  var y = ($(window).height() - 240) * 0.5;
  $('.cube').css('margin-top', y+'px');
}

$(window).on('resize', resize);
$(document).ready(resize);


=======
>>>>>>> e29c7b911783d4d0af82764413339a2482559d02
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