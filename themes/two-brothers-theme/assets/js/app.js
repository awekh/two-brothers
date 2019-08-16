(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _hamburger = require('./modules/hamburger');

var _hamburger2 = _interopRequireDefault(_hamburger);

var _sticky = require('./modules/sticky');

var _sticky2 = _interopRequireDefault(_sticky);

var _accordion = require('./modules/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _showForm = require('./modules/showForm');

var _showForm2 = _interopRequireDefault(_showForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
  // When DOM is ready
  $(function () {
    _sticky2.default.handler();
    _hamburger2.default.handler();
    _accordion2.default.handler();
    _showForm2.default.handler();
  });
})(jQuery);

},{"./modules/accordion":2,"./modules/hamburger":3,"./modules/showForm":4,"./modules/sticky":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var accordion = {
  handler: function handler() {
    function clickTitle() {
      $('.title-sm').on('click', function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $(this).siblings('.descr-sm').slideUp(200);
        } else {
          $('.title-sm').removeClass('active');
          $(this).addClass('active');
          $('.descr-sm').slideUp(200);
          $(this).siblings('.descr-sm').slideDown(200);
        }
      });
    }
    return {
      init: clickTitle()
    };
  }
};

exports.default = accordion;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hamburger = {
  handler: function handler() {
    var $body = $('body');
    var $btn = $('.menu-toggler');
    var $menu = $('.header-container');
    var OPENED_CLASS = 'opened';
    var OVERLAY_CLASS = 'overlay';

    function hamburgerToggle() {
      $btn.on('click', function switcher() {
        $(this).toggleClass(OPENED_CLASS);
        $menu.toggleClass(OPENED_CLASS);
        $body.toggleClass(OVERLAY_CLASS);
      });
    }

    function init() {
      if (!$btn.length) return;
      hamburgerToggle();
    }
    return {
      init: init()
    };
  }
};

exports.default = hamburger;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var showForm = {
  handler: function handler() {
    var $button = $('.show-form');
    var $form = $('#order-form');
    function show() {
      $button.on('click', function () {
        $button.fadeOut();
        $form.fadeIn();
      });
    }
    return {
      init: show()
    };
  }
};

exports.default = showForm;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var stickyHeader = {
  handler: function handler() {
    var $window = $(window);
    var $header = $('.header');
    var $sticky = 10;

    function onScroll() {
      $window.on('scroll', function () {
        if ($window.scrollTop() > $sticky) {
          $header.addClass('sticky');
        } else {
          $header.removeClass('sticky');
        }
      });
    }
    return {
      init: onScroll()
    };
  }
};

exports.default = stickyHeader;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9hcHAuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9tb2R1bGVzL2FjY29yZGlvbi5qcyIsInRoZW1lcy90d28tYnJvdGhlcnMtdGhlbWUvc3JjL2pzL21vZHVsZXMvaGFtYnVyZ2VyLmpzIiwidGhlbWVzL3R3by1icm90aGVycy10aGVtZS9zcmMvanMvbW9kdWxlcy9zaG93Rm9ybS5qcyIsInRoZW1lcy90d28tYnJvdGhlcnMtdGhlbWUvc3JjL2pzL21vZHVsZXMvc3RpY2t5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsQ0FBQyxVQUFDLENBQUQsRUFBTztBQUNOO0FBQ0EsSUFBRSxZQUFNO0FBQ04scUJBQWEsT0FBYjtBQUNBLHdCQUFVLE9BQVY7QUFDQSx3QkFBVSxPQUFWO0FBQ0EsdUJBQVMsT0FBVDtBQUNELEdBTEQ7QUFNRCxDQVJELEVBUUcsTUFSSDs7Ozs7Ozs7QUNMQSxJQUFNLFlBQVk7QUFDaEIsU0FEZ0IscUJBQ047QUFDUixhQUFTLFVBQVQsR0FBc0I7QUFDcEIsUUFBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixZQUFZO0FBQ3JDLFlBQUksRUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixRQUFqQixDQUFKLEVBQWdDO0FBQzlCLFlBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsUUFBcEI7QUFDQSxZQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFdBQWpCLEVBQThCLE9BQTlCLENBQXNDLEdBQXRDO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsWUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixRQUEzQjtBQUNBLFlBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsUUFBakI7QUFDQSxZQUFFLFdBQUYsRUFBZSxPQUFmLENBQXVCLEdBQXZCO0FBQ0EsWUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixXQUFqQixFQUE4QixTQUE5QixDQUF3QyxHQUF4QztBQUNEO0FBQ0YsT0FWRDtBQVdEO0FBQ0QsV0FBTztBQUNMLFlBQU07QUFERCxLQUFQO0FBR0Q7QUFsQmUsQ0FBbEI7O2tCQXFCZSxTOzs7Ozs7OztBQ3JCZixJQUFNLFlBQVk7QUFDaEIsU0FEZ0IscUJBQ047QUFDUixRQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFDQSxRQUFNLE9BQU8sRUFBRSxlQUFGLENBQWI7QUFDQSxRQUFNLFFBQVEsRUFBRSxtQkFBRixDQUFkO0FBQ0EsUUFBTSxlQUFlLFFBQXJCO0FBQ0EsUUFBTSxnQkFBZ0IsU0FBdEI7O0FBRUEsYUFBUyxlQUFULEdBQTJCO0FBQ3pCLFdBQUssRUFBTCxDQUFRLE9BQVIsRUFBaUIsU0FBUyxRQUFULEdBQW9CO0FBQ25DLFVBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsWUFBcEI7QUFDQSxjQUFNLFdBQU4sQ0FBa0IsWUFBbEI7QUFDQSxjQUFNLFdBQU4sQ0FBa0IsYUFBbEI7QUFDRCxPQUpEO0FBS0Q7O0FBRUQsYUFBUyxJQUFULEdBQWdCO0FBQ2QsVUFBSSxDQUFDLEtBQUssTUFBVixFQUFrQjtBQUNsQjtBQUNEO0FBQ0QsV0FBTztBQUNMLFlBQU07QUFERCxLQUFQO0FBR0Q7QUF2QmUsQ0FBbEI7O2tCQTBCZSxTOzs7Ozs7OztBQzFCZixJQUFNLFdBQVc7QUFDZixTQURlLHFCQUNMO0FBQ1IsUUFBTSxVQUFVLEVBQUUsWUFBRixDQUFoQjtBQUNBLFFBQU0sUUFBUSxFQUFFLGFBQUYsQ0FBZDtBQUNBLGFBQVMsSUFBVCxHQUFnQjtBQUNkLGNBQVEsRUFBUixDQUFXLE9BQVgsRUFBb0IsWUFBTTtBQUN4QixnQkFBUSxPQUFSO0FBQ0EsY0FBTSxNQUFOO0FBQ0QsT0FIRDtBQUlEO0FBQ0QsV0FBTztBQUNMLFlBQU07QUFERCxLQUFQO0FBR0Q7QUFiYyxDQUFqQjs7a0JBZ0JlLFE7Ozs7Ozs7O0FDaEJmLElBQU0sZUFBZTtBQUNuQixTQURtQixxQkFDVDtBQUNSLFFBQU0sVUFBVSxFQUFFLE1BQUYsQ0FBaEI7QUFDQSxRQUFNLFVBQVUsRUFBRSxTQUFGLENBQWhCO0FBQ0EsUUFBTSxVQUFVLEVBQWhCOztBQUVBLGFBQVMsUUFBVCxHQUFvQjtBQUNsQixjQUFRLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQU07QUFDekIsWUFBSSxRQUFRLFNBQVIsS0FBc0IsT0FBMUIsRUFBbUM7QUFDakMsa0JBQVEsUUFBUixDQUFpQixRQUFqQjtBQUNELFNBRkQsTUFFTztBQUNMLGtCQUFRLFdBQVIsQ0FBb0IsUUFBcEI7QUFDRDtBQUNGLE9BTkQ7QUFPRDtBQUNELFdBQU87QUFDTCxZQUFNO0FBREQsS0FBUDtBQUdEO0FBbEJrQixDQUFyQjs7a0JBcUJlLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgaGFtYnVyZ2VyIGZyb20gJy4vbW9kdWxlcy9oYW1idXJnZXInO1xuaW1wb3J0IHN0aWNreUhlYWRlciBmcm9tICcuL21vZHVsZXMvc3RpY2t5JztcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9tb2R1bGVzL2FjY29yZGlvbic7XG5pbXBvcnQgc2hvd0Zvcm0gZnJvbSAnLi9tb2R1bGVzL3Nob3dGb3JtJztcblxuKCgkKSA9PiB7XG4gIC8vIFdoZW4gRE9NIGlzIHJlYWR5XG4gICQoKCkgPT4ge1xuICAgIHN0aWNreUhlYWRlci5oYW5kbGVyKCk7XG4gICAgaGFtYnVyZ2VyLmhhbmRsZXIoKTtcbiAgICBhY2NvcmRpb24uaGFuZGxlcigpO1xuICAgIHNob3dGb3JtLmhhbmRsZXIoKTtcbiAgfSk7XG59KShqUXVlcnkpO1xuIiwiY29uc3QgYWNjb3JkaW9uID0ge1xuICBoYW5kbGVyKCkge1xuICAgIGZ1bmN0aW9uIGNsaWNrVGl0bGUoKSB7XG4gICAgICAkKCcudGl0bGUtc20nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQodGhpcykuc2libGluZ3MoJy5kZXNjci1zbScpLnNsaWRlVXAoMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcudGl0bGUtc20nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJCgnLmRlc2NyLXNtJykuc2xpZGVVcCgyMDApO1xuICAgICAgICAgICQodGhpcykuc2libGluZ3MoJy5kZXNjci1zbScpLnNsaWRlRG93bigyMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXQ6IGNsaWNrVGl0bGUoKSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWNjb3JkaW9uO1xuIiwiY29uc3QgaGFtYnVyZ2VyID0ge1xuICBoYW5kbGVyKCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgIGNvbnN0ICRidG4gPSAkKCcubWVudS10b2dnbGVyJyk7XG4gICAgY29uc3QgJG1lbnUgPSAkKCcuaGVhZGVyLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IE9QRU5FRF9DTEFTUyA9ICdvcGVuZWQnO1xuICAgIGNvbnN0IE9WRVJMQVlfQ0xBU1MgPSAnb3ZlcmxheSc7XG5cbiAgICBmdW5jdGlvbiBoYW1idXJnZXJUb2dnbGUoKSB7XG4gICAgICAkYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uIHN3aXRjaGVyKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKE9QRU5FRF9DTEFTUyk7XG4gICAgICAgICRtZW51LnRvZ2dsZUNsYXNzKE9QRU5FRF9DTEFTUyk7XG4gICAgICAgICRib2R5LnRvZ2dsZUNsYXNzKE9WRVJMQVlfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmICghJGJ0bi5sZW5ndGgpIHJldHVybjtcbiAgICAgIGhhbWJ1cmdlclRvZ2dsZSgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW1idXJnZXI7XG4iLCJjb25zdCBzaG93Rm9ybSA9IHtcbiAgaGFuZGxlcigpIHtcbiAgICBjb25zdCAkYnV0dG9uID0gJCgnLnNob3ctZm9ybScpO1xuICAgIGNvbnN0ICRmb3JtID0gJCgnI29yZGVyLWZvcm0nKTtcbiAgICBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgJGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICRidXR0b24uZmFkZU91dCgpO1xuICAgICAgICAkZm9ybS5mYWRlSW4oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogc2hvdygpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzaG93Rm9ybTtcbiIsImNvbnN0IHN0aWNreUhlYWRlciA9IHtcbiAgaGFuZGxlcigpIHtcbiAgICBjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG4gICAgY29uc3QgJHN0aWNreSA9IDEwO1xuXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgICAkd2luZG93Lm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIGlmICgkd2luZG93LnNjcm9sbFRvcCgpID4gJHN0aWNreSkge1xuICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXQ6IG9uU2Nyb2xsKCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN0aWNreUhlYWRlcjtcbiJdfQ==
