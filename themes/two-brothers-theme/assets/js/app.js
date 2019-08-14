(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _hamburger = require('./modules/hamburger');

var _hamburger2 = _interopRequireDefault(_hamburger);

var _sticky = require('./modules/sticky');

var _sticky2 = _interopRequireDefault(_sticky);

var _accordion = require('./modules/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
  // When DOM is ready
  $(function () {
    _sticky2.default.handler();
    _hamburger2.default.handler();
    _accordion2.default.handler();
  });
})(jQuery);

},{"./modules/accordion":2,"./modules/hamburger":3,"./modules/sticky":4}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9hcHAuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9tb2R1bGVzL2FjY29yZGlvbi5qcyIsInRoZW1lcy90d28tYnJvdGhlcnMtdGhlbWUvc3JjL2pzL21vZHVsZXMvaGFtYnVyZ2VyLmpzIiwidGhlbWVzL3R3by1icm90aGVycy10aGVtZS9zcmMvanMvbW9kdWxlcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsQ0FBQyxVQUFDLENBQUQsRUFBTztBQUNOO0FBQ0EsSUFBRSxZQUFNO0FBQ04scUJBQWEsT0FBYjtBQUNBLHdCQUFVLE9BQVY7QUFDQSx3QkFBVSxPQUFWO0FBQ0QsR0FKRDtBQUtELENBUEQsRUFPRyxNQVBIOzs7Ozs7OztBQ0pBLElBQU0sWUFBWTtBQUNoQixTQURnQixxQkFDTjtBQUNSLGFBQVMsVUFBVCxHQUFzQjtBQUNwQixRQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFlBQVk7QUFDckMsWUFBSSxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFFBQWpCLENBQUosRUFBZ0M7QUFDOUIsWUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixRQUFwQjtBQUNBLFlBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsV0FBakIsRUFBOEIsT0FBOUIsQ0FBc0MsR0FBdEM7QUFDRCxTQUhELE1BR087QUFDTCxZQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFFBQTNCO0FBQ0EsWUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixRQUFqQjtBQUNBLFlBQUUsV0FBRixFQUFlLE9BQWYsQ0FBdUIsR0FBdkI7QUFDQSxZQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFdBQWpCLEVBQThCLFNBQTlCLENBQXdDLEdBQXhDO0FBQ0Q7QUFDRixPQVZEO0FBV0Q7QUFDRCxXQUFPO0FBQ0wsWUFBTTtBQURELEtBQVA7QUFHRDtBQWxCZSxDQUFsQjs7a0JBcUJlLFM7Ozs7Ozs7O0FDckJmLElBQU0sWUFBWTtBQUNoQixXQURnQixxQkFDTjtBQUNSLFlBQU0sUUFBUSxFQUFFLE1BQUYsQ0FBZDtBQUNBLFlBQU0sT0FBTyxFQUFFLGVBQUYsQ0FBYjtBQUNBLFlBQU0sUUFBUSxFQUFFLG1CQUFGLENBQWQ7QUFDQSxZQUFNLGVBQWUsUUFBckI7QUFDQSxZQUFNLGdCQUFnQixTQUF0Qjs7QUFFQSxpQkFBUyxlQUFULEdBQTJCO0FBQ3pCLGlCQUFLLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLFNBQVMsUUFBVCxHQUFvQjtBQUNqQyxrQkFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixZQUFwQjtBQUNBLHNCQUFNLFdBQU4sQ0FBa0IsWUFBbEI7QUFDQSxzQkFBTSxXQUFOLENBQWtCLGFBQWxCO0FBQ0QsYUFKSDtBQUtEOztBQUVELGlCQUFTLElBQVQsR0FBZ0I7QUFDWixnQkFBSSxDQUFDLEtBQUssTUFBVixFQUFrQjtBQUNsQjtBQUNIO0FBQ0QsZUFBTztBQUNILGtCQUFNO0FBREgsU0FBUDtBQUdEO0FBdkJlLENBQWxCOztrQkEwQmUsUzs7Ozs7Ozs7QUMxQmYsSUFBTSxlQUFlO0FBQ25CLFNBRG1CLHFCQUNUO0FBQ1IsUUFBTSxVQUFVLEVBQUUsTUFBRixDQUFoQjtBQUNBLFFBQU0sVUFBVSxFQUFFLFNBQUYsQ0FBaEI7QUFDQSxRQUFNLFVBQVUsRUFBaEI7O0FBRUEsYUFBUyxRQUFULEdBQW9CO0FBQ2xCLGNBQVEsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBTTtBQUN6QixZQUFJLFFBQVEsU0FBUixLQUFzQixPQUExQixFQUFtQztBQUNqQyxrQkFBUSxRQUFSLENBQWlCLFFBQWpCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsa0JBQVEsV0FBUixDQUFvQixRQUFwQjtBQUNEO0FBQ0YsT0FORDtBQU9EO0FBQ0QsV0FBTztBQUNMLFlBQU07QUFERCxLQUFQO0FBR0Q7QUFsQmtCLENBQXJCOztrQkFxQmUsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBoYW1idXJnZXIgZnJvbSAnLi9tb2R1bGVzL2hhbWJ1cmdlcic7XHJcbmltcG9ydCBzdGlja3lIZWFkZXIgZnJvbSAnLi9tb2R1bGVzL3N0aWNreSc7XHJcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9tb2R1bGVzL2FjY29yZGlvbic7XHJcblxyXG4oKCQpID0+IHtcclxuICAvLyBXaGVuIERPTSBpcyByZWFkeVxyXG4gICQoKCkgPT4ge1xyXG4gICAgc3RpY2t5SGVhZGVyLmhhbmRsZXIoKTtcclxuICAgIGhhbWJ1cmdlci5oYW5kbGVyKCk7XHJcbiAgICBhY2NvcmRpb24uaGFuZGxlcigpO1xyXG4gIH0pO1xyXG59KShqUXVlcnkpO1xyXG4iLCJjb25zdCBhY2NvcmRpb24gPSB7XHJcbiAgaGFuZGxlcigpIHtcclxuICAgIGZ1bmN0aW9uIGNsaWNrVGl0bGUoKSB7XHJcbiAgICAgICQoJy50aXRsZS1zbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmRlc2NyLXNtJykuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKCcudGl0bGUtc20nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICQoJy5kZXNjci1zbScpLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICQodGhpcykuc2libGluZ3MoJy5kZXNjci1zbScpLnNsaWRlRG93bigyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbml0OiBjbGlja1RpdGxlKCksXHJcbiAgICB9O1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY2NvcmRpb247XHJcbiIsImNvbnN0IGhhbWJ1cmdlciA9IHtcclxuICBoYW5kbGVyKCkge1xyXG4gICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBjb25zdCAkYnRuID0gJCgnLm1lbnUtdG9nZ2xlcicpO1xyXG4gICAgY29uc3QgJG1lbnUgPSAkKCcuaGVhZGVyLWNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgT1BFTkVEX0NMQVNTID0gJ29wZW5lZCc7XHJcbiAgICBjb25zdCBPVkVSTEFZX0NMQVNTID0gJ292ZXJsYXknO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbWJ1cmdlclRvZ2dsZSgpIHtcclxuICAgICAgJGJ0bi5vbignY2xpY2snLCBmdW5jdGlvbiBzd2l0Y2hlcigpIHtcclxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoT1BFTkVEX0NMQVNTKTtcclxuICAgICAgICAgICRtZW51LnRvZ2dsZUNsYXNzKE9QRU5FRF9DTEFTUyk7XHJcbiAgICAgICAgICAkYm9keS50b2dnbGVDbGFzcyhPVkVSTEFZX0NMQVNTKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIGlmICghJGJ0bi5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICBoYW1idXJnZXJUb2dnbGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogaW5pdCgpLFxyXG4gICAgfTtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFtYnVyZ2VyOyIsImNvbnN0IHN0aWNreUhlYWRlciA9IHtcclxuICBoYW5kbGVyKCkge1xyXG4gICAgY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcclxuICAgIGNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCAkc3RpY2t5ID0gMTA7XHJcblxyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBpZiAoJHdpbmRvdy5zY3JvbGxUb3AoKSA+ICRzdGlja3kpIHtcclxuICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5pdDogb25TY3JvbGwoKSxcclxuICAgIH07XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0aWNreUhlYWRlcjtcclxuIl19
