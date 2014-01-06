//controls the navbar size as you scroll down. this is disabled when
//the width is less than 768px
/*$(window).scroll(function(){
	var $nav = $('.navbar-default');
  var height = $('.jumbotron').height()-100;

	var pos = ($window.scrollTop());
	var width = $(window).width();

	if (width > 768){
		if ($window.scrollTop() < height){
			$nav.css({top:'-100px'});
    } else if ($window.scrollTop() > height && $window.scrollTop() < height+100){
     $nav.css({top:-100+(pos-height)});
   } else {
     $nav.css({top:'0px'});
   }
 }
 else
 {
  $nav.css({top:'0px'});
}
});*/

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

/**This is the 'in view' loader. fades in when the user has the object in view/on screen. helper script needs
 *to exist in the html (currently on home.html)
 *
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