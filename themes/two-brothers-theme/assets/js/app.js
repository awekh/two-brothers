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
})(jQuery); // You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import {NAME} from './modules/...';

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
    var $btn = $('.hamburger');
    var $menu = $('.menu');
    var $submenu = $('.submenu');
    var $submenuLink = $('.menu__link--submenu');
    var $submenuClose = $('.submenu__item--static');
    var OPENED_CLASS = 'opened';
    var OVERLAY_CLASS = 'overlay';
    function hamburgerToggle() {
      $btn.on('click', function switcher() {
        $(this).toggleClass(OPENED_CLASS);
        $menu.toggleClass(OPENED_CLASS);
        $body.toggleClass(OVERLAY_CLASS);
        $submenu.removeClass(OPENED_CLASS);
      });
    }
    function submenuToggle() {
      $submenuLink.on('click', function (event) {
        event.preventDefault();
        $submenu.toggleClass(OPENED_CLASS);
      });
      $submenuClose.on('click', function (event) {
        event.preventDefault();
        $submenu.toggleClass(OPENED_CLASS);
      });
    }
    function init() {
      if (!$btn.length) return;
      hamburgerToggle();
      if (!$submenu.length) return;
      submenuToggle();
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
          console.log('123');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9hcHAuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9tb2R1bGVzL2FjY29yZGlvbi5qcyIsInRoZW1lcy90d28tYnJvdGhlcnMtdGhlbWUvc3JjL2pzL21vZHVsZXMvaGFtYnVyZ2VyLmpzIiwidGhlbWVzL3R3by1icm90aGVycy10aGVtZS9zcmMvanMvbW9kdWxlcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ01BOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsQ0FBQyxVQUFDLENBQUQsRUFBTztBQUNOO0FBQ0EsSUFBRSxZQUFNO0FBQ04scUJBQWEsT0FBYjtBQUNBLHdCQUFVLE9BQVY7QUFDQSx3QkFBVSxPQUFWO0FBQ0QsR0FKRDtBQUtELENBUEQsRUFPRyxNQVBILEUsQ0FWQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNMQSxJQUFNLFlBQVk7QUFDaEIsU0FEZ0IscUJBQ047QUFDUixhQUFTLFVBQVQsR0FBc0I7QUFDcEIsUUFBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixZQUFZO0FBQ3JDLFlBQUksRUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixRQUFqQixDQUFKLEVBQWdDO0FBQzlCLFlBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsUUFBcEI7QUFDQSxZQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFdBQWpCLEVBQThCLE9BQTlCLENBQXNDLEdBQXRDO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsWUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixRQUEzQjtBQUNBLFlBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsUUFBakI7QUFDQSxZQUFFLFdBQUYsRUFBZSxPQUFmLENBQXVCLEdBQXZCO0FBQ0EsWUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixXQUFqQixFQUE4QixTQUE5QixDQUF3QyxHQUF4QztBQUNEO0FBQ0YsT0FWRDtBQVdEO0FBQ0QsV0FBTztBQUNMLFlBQU07QUFERCxLQUFQO0FBR0Q7QUFsQmUsQ0FBbEI7O2tCQXFCZSxTOzs7Ozs7OztBQ3JCZixJQUFNLFlBQVk7QUFDaEIsU0FEZ0IscUJBQ047QUFDUixRQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFDQSxRQUFNLE9BQU8sRUFBRSxZQUFGLENBQWI7QUFDQSxRQUFNLFFBQVEsRUFBRSxPQUFGLENBQWQ7QUFDQSxRQUFNLFdBQVcsRUFBRSxVQUFGLENBQWpCO0FBQ0EsUUFBTSxlQUFlLEVBQUUsc0JBQUYsQ0FBckI7QUFDQSxRQUFNLGdCQUFnQixFQUFFLHdCQUFGLENBQXRCO0FBQ0EsUUFBTSxlQUFlLFFBQXJCO0FBQ0EsUUFBTSxnQkFBZ0IsU0FBdEI7QUFDQSxhQUFTLGVBQVQsR0FBMkI7QUFDekIsV0FBSyxFQUFMLENBQVEsT0FBUixFQUFpQixTQUFTLFFBQVQsR0FBb0I7QUFDbkMsVUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixZQUFwQjtBQUNBLGNBQU0sV0FBTixDQUFrQixZQUFsQjtBQUNBLGNBQU0sV0FBTixDQUFrQixhQUFsQjtBQUNBLGlCQUFTLFdBQVQsQ0FBcUIsWUFBckI7QUFDRCxPQUxEO0FBTUQ7QUFDRCxhQUFTLGFBQVQsR0FBeUI7QUFDdkIsbUJBQWEsRUFBYixDQUFnQixPQUFoQixFQUF5QixVQUFDLEtBQUQsRUFBVztBQUNsQyxjQUFNLGNBQU47QUFDQSxpQkFBUyxXQUFULENBQXFCLFlBQXJCO0FBQ0QsT0FIRDtBQUlBLG9CQUFjLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsVUFBQyxLQUFELEVBQVc7QUFDbkMsY0FBTSxjQUFOO0FBQ0EsaUJBQVMsV0FBVCxDQUFxQixZQUFyQjtBQUNELE9BSEQ7QUFJRDtBQUNELGFBQVMsSUFBVCxHQUFnQjtBQUNkLFVBQUksQ0FBQyxLQUFLLE1BQVYsRUFBa0I7QUFDbEI7QUFDQSxVQUFJLENBQUMsU0FBUyxNQUFkLEVBQXNCO0FBQ3RCO0FBQ0Q7QUFDRCxXQUFPO0FBQ0wsWUFBTTtBQURELEtBQVA7QUFHRDtBQXJDZSxDQUFsQjs7a0JBd0NlLFM7Ozs7Ozs7O0FDeENmLElBQU0sZUFBZTtBQUNuQixTQURtQixxQkFDVDtBQUNSLFFBQU0sVUFBVSxFQUFFLE1BQUYsQ0FBaEI7QUFDQSxRQUFNLFVBQVUsRUFBRSxTQUFGLENBQWhCO0FBQ0EsUUFBTSxVQUFVLEVBQWhCOztBQUVBLGFBQVMsUUFBVCxHQUFvQjtBQUNsQixjQUFRLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQU07QUFDekIsWUFBSSxRQUFRLFNBQVIsS0FBc0IsT0FBMUIsRUFBbUM7QUFDakMsa0JBQVEsUUFBUixDQUFpQixRQUFqQjtBQUNBLGtCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsa0JBQVEsV0FBUixDQUFvQixRQUFwQjtBQUNEO0FBQ0YsT0FQRDtBQVFEO0FBQ0QsV0FBTztBQUNMLFlBQU07QUFERCxLQUFQO0FBR0Q7QUFuQmtCLENBQXJCOztrQkFzQmUsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFlvdSBjYW4gd3JpdGUgYSBjYWxsIGFuZCBpbXBvcnQgeW91ciBmdW5jdGlvbnMgaW4gdGhpcyBmaWxlLlxuLy9cbi8vIFRoaXMgZmlsZSB3aWxsIGJlIGNvbXBpbGVkIGludG8gYXBwLmpzIGFuZCB3aWxsIG5vdCBiZSBtaW5pZmllZC5cbi8vIEZlZWwgZnJlZSB3aXRoIHVzaW5nIEVTNiBoZXJlLlxuXG4vLyBpbXBvcnQge05BTUV9IGZyb20gJy4vbW9kdWxlcy8uLi4nO1xuaW1wb3J0IGhhbWJ1cmdlciBmcm9tICcuL21vZHVsZXMvaGFtYnVyZ2VyJztcbmltcG9ydCBzdGlja3lIZWFkZXIgZnJvbSAnLi9tb2R1bGVzL3N0aWNreSc7XG5pbXBvcnQgYWNjb3JkaW9uIGZyb20gJy4vbW9kdWxlcy9hY2NvcmRpb24nO1xuXG4oKCQpID0+IHtcbiAgLy8gV2hlbiBET00gaXMgcmVhZHlcbiAgJCgoKSA9PiB7XG4gICAgc3RpY2t5SGVhZGVyLmhhbmRsZXIoKTtcbiAgICBoYW1idXJnZXIuaGFuZGxlcigpO1xuICAgIGFjY29yZGlvbi5oYW5kbGVyKCk7XG4gIH0pO1xufSkoalF1ZXJ5KTtcbiIsImNvbnN0IGFjY29yZGlvbiA9IHtcbiAgaGFuZGxlcigpIHtcbiAgICBmdW5jdGlvbiBjbGlja1RpdGxlKCkge1xuICAgICAgJCgnLnRpdGxlLXNtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZGVzY3Itc20nKS5zbGlkZVVwKDIwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLnRpdGxlLXNtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQoJy5kZXNjci1zbScpLnNsaWRlVXAoMjAwKTtcbiAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZGVzY3Itc20nKS5zbGlkZURvd24oMjAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBjbGlja1RpdGxlKCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbjtcbiIsImNvbnN0IGhhbWJ1cmdlciA9IHtcbiAgaGFuZGxlcigpIHtcbiAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICBjb25zdCAkYnRuID0gJCgnLmhhbWJ1cmdlcicpO1xuICAgIGNvbnN0ICRtZW51ID0gJCgnLm1lbnUnKTtcbiAgICBjb25zdCAkc3VibWVudSA9ICQoJy5zdWJtZW51Jyk7XG4gICAgY29uc3QgJHN1Ym1lbnVMaW5rID0gJCgnLm1lbnVfX2xpbmstLXN1Ym1lbnUnKTtcbiAgICBjb25zdCAkc3VibWVudUNsb3NlID0gJCgnLnN1Ym1lbnVfX2l0ZW0tLXN0YXRpYycpO1xuICAgIGNvbnN0IE9QRU5FRF9DTEFTUyA9ICdvcGVuZWQnO1xuICAgIGNvbnN0IE9WRVJMQVlfQ0xBU1MgPSAnb3ZlcmxheSc7XG4gICAgZnVuY3Rpb24gaGFtYnVyZ2VyVG9nZ2xlKCkge1xuICAgICAgJGJ0bi5vbignY2xpY2snLCBmdW5jdGlvbiBzd2l0Y2hlcigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhPUEVORURfQ0xBU1MpO1xuICAgICAgICAkbWVudS50b2dnbGVDbGFzcyhPUEVORURfQ0xBU1MpO1xuICAgICAgICAkYm9keS50b2dnbGVDbGFzcyhPVkVSTEFZX0NMQVNTKTtcbiAgICAgICAgJHN1Ym1lbnUucmVtb3ZlQ2xhc3MoT1BFTkVEX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJtZW51VG9nZ2xlKCkge1xuICAgICAgJHN1Ym1lbnVMaW5rLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkc3VibWVudS50b2dnbGVDbGFzcyhPUEVORURfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgICAkc3VibWVudUNsb3NlLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkc3VibWVudS50b2dnbGVDbGFzcyhPUEVORURfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBpZiAoISRidG4ubGVuZ3RoKSByZXR1cm47XG4gICAgICBoYW1idXJnZXJUb2dnbGUoKTtcbiAgICAgIGlmICghJHN1Ym1lbnUubGVuZ3RoKSByZXR1cm47XG4gICAgICBzdWJtZW51VG9nZ2xlKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhhbWJ1cmdlcjtcbiIsImNvbnN0IHN0aWNreUhlYWRlciA9IHtcbiAgaGFuZGxlcigpIHtcbiAgICBjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG4gICAgY29uc3QgJHN0aWNreSA9IDEwO1xuXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgICAkd2luZG93Lm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIGlmICgkd2luZG93LnNjcm9sbFRvcCgpID4gJHN0aWNreSkge1xuICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCcxMjMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBvblNjcm9sbCgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdGlja3lIZWFkZXI7XG4iXX0=
